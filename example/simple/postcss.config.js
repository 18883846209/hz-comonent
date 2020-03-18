const autoprefixer = require("autoprefixer");
const pxtorem = require("postcss-pxtorem");
const cssvariables = require("postcss-css-variables");

module.exports = {
  plugins: [
    autoprefixer({
      browsers: ["last 2 versions", "Firefox ESR", "> 1%", "ie >= 8", "iOS >= 8", "Android >= 4"]
    }),
    pxtorem({
      rootValue: 50,
      propWhiteList: []
    }),
    cssvariables()
  ]
};
