// 打包处理 /src/assets/*/* 资源文件

const baseUrl = "static/";
const publicPath = "/_next";

const path = require("path");

module.exports = (nextConfig = {}) => {
  return Object.assign({}, nextConfig, {
    webpack(config, options) {
      // assets 图片 /images/
      config.module.rules.push({
        test: /\.(jpe?g|png|gif|svg)$/,
        include: path.resolve(__dirname, "..", "src", "assets", "images"),
        loaders: [
          {
            loader: "url-loader",
            options: {
              limit: 1024,
              name: `${baseUrl}[path][name].[hash:7].[ext]`,
              publicPath
            }
          }
        ]
      });

      // // node_modules 下的
      // config.module.rules.push({
      //   test: /\.(jpe?g|png|gif|svg)$/,
      //   include: path.resolve(__dirname, "..", "node_modules"),
      //   loaders: [
      //     {
      //       loader: "url-loader",
      //       options: {
      //         limit: 1024,
      //         name: `${baseUrl}assets/node_modules/[path][name].[hash:7].[ext]`,
      //         publicPath
      //       }
      //     }
      //   ]
      // });

      if (typeof nextConfig.webpack === "function") {
        return nextConfig.webpack(config, options);
      }

      return config;
    }
  });
};
