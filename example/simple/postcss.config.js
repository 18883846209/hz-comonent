const autoprefixer = require("autoprefixer");
const cssvariables = require("postcss-css-variables");
const pxtorem = require("postcss-pxtorem");

const myAdaptive = require("./utils/postcss-adaptive");

module.exports = {
  plugins: [
    pxtorem({
      rootValue: 75,
      propList: ["*", "!font*", "!letter-spacing"],
      selectorBlackList: [],
      // replace: true,
      mediaQuery: false,
      minPixelValue: 1.1,
      exclude: /node_modules/i
    }),
    // 为了解决 hairlines 问题
    myAdaptive({
      baseDpr: 1
    }),
    autoprefixer({
      overrideBrowserslist: ["last 2 versions", "Firefox ESR", "> 1%", "ie >= 8", "iOS >= 8", "Android >= 4"]
    }),
    cssvariables()
  ]
};
