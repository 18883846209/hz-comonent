const withLess = require("@zeit/next-less");
const withCSS = require("@zeit/next-css");
const withSourceMaps = require("@zeit/next-source-maps");
const path = require("path");
const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");
const { WebpackBundleSizeAnalyzerPlugin } = require("webpack-bundle-size-analyzer");
const loaderUtils = require("loader-utils");
const NpmImportPlugin = require("less-plugin-npm-import");

const envConfig = require("./config/evn/client");
const serverConfig = require("./config/evn/server");
const withAssets = require("./utils/with-assets");
const withCssChunkConfig = require("./utils/with-css-chunk");

// 根目录下的文件
function resolveCwd(...args) {
  args.unshift(process.cwd());
  return path.join(...args);
}

const polyfillsFile = "./src/utils/polyfills.js";

const alias = {
  "@": path.join(__dirname, "src"),
  '@styles':path.join(__dirname,'src/styles')
};

const nextConfig = {
  distDir: "./build/www",

  assetPrefix: envConfig.cdn,

  cssModules: true,

  cssLoaderOptions: {
    alias,
    importLoaders: 1,
    localIdentName: "[local]___[hash:base64:5]",
    context: path.join(__dirname, "src"),
    getLocalIdent: (context, localIdentName, localName, options) => {
      if (context.resourcePath.includes("node_modules") || localName === "hairlines") {
        return localName;
      }
      const match = context.resourcePath.match(/src(.*)/);
      if (match && match[1]) {
        if (!options.context) {
          options.context =
            context.options && typeof context.options.context === "string" ? context.options.context : context.context;
        }
        const request = path.relative(options.context, context.resourcePath);
        options.content = `${options.hashPrefix}${request}+${localName}`;
        localIdentName = localIdentName.replace(/\[local\]/gi, localName);
        const hash = loaderUtils.interpolateName(context, localIdentName, options);
        return hash.replace(new RegExp("[^a-zA-Z0-9\\-_\u00A0-\uFFFF]", "g"), "-").replace(/^((-?[0-9])|--)/, "_$1");
      }
      return localName;
    }
  },

  lessLoaderOptions: {
    javascriptEnabled: true,
    modifyVars: {
      hack: `true; @import "${resolveCwd("src/styles/themes/default.less")}";`
    },
    plugins: [new NpmImportPlugin({ prefix: "~" })]
  },

  serverRuntimeConfig: serverConfig,
  publicRuntimeConfig: {
    ...envConfig,
    env: process.env.NODE_ENV || "development",
    version: process.env.APP_VERSION || envConfig.version || "local"
  },

  generateBuildId: async () => {
    return `${Date.now()}`;
  },

  webpack: (config, { dev, isServer }) => {
    if (isServer) {
      const antStyles = /antd-mobile\/.*?\/style.*?/;
      const origExternals = [...config.externals];
      config.externals = [
        (context, request, callback) => {
          if (request.match(antStyles)) return callback();
          // 忽略 nextjs 内部把三方库强制使用 commonjs
          // if (request.match(/@hz-design\/base/)) return callback();
          if (typeof origExternals[0] === "function") {
            origExternals[0](context, request, callback);
          } else {
            callback();
          }
        },
        ...(typeof origExternals[0] === "function" ? [] : origExternals)
      ];

      config.module.rules.unshift({
        test: antStyles,
        use: "null-loader"
      });
    }

    switch (process.env.ANALYZE) {
      case "BUNDLES":
        config.plugins.push(
          new BundleAnalyzerPlugin({
            analyzerMode: "server",
            analyzerPort: isServer ? 8888 : 8889, // 8888是SSR资源 、 8889是SPA资源
            openAnalyzer: true
          })
        );
        break;
      case "SIZE":
        config.plugins.push(new WebpackBundleSizeAnalyzerPlugin("stats.txt"));
        break;
      default:
        break;
    }

    const originalEntry = config.entry;
    config.entry = async () => {
      const entries = await originalEntry();
      if (entries["main.js"] && !entries["main.js"].includes(polyfillsFile)) {
        entries["main.js"].unshift(polyfillsFile);
      }
      return entries;
    };

    config.resolve.extensions = [".js", ".jsx", ".json"];

    config.resolve.alias = {
      ...config.resolve.alias,
      ...alias
    };

    if (dev) {
      config.devtool = "cheap-module-source-map";
    }

    return config;
  }
};

module.exports = withLess(withCSS(withSourceMaps(withAssets(withCssChunkConfig(nextConfig)))));
