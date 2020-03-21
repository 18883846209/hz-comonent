const autoprefixer = require("autoprefixer");
const adaptive = require("postcss-adaptive");
const cssvariables = require("postcss-css-variables");

module.exports = {
  plugins: [
    autoprefixer({
      overrideBrowserslist: ["last 2 versions", "Firefox ESR", "> 1%", "ie >= 8", "iOS >= 8", "Android >= 4"]
    }),
    adaptive({
      remUnit: 75,
      autoRem: true
    }),
    cssvariables()
  ]
};
