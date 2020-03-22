"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _postcss = require("postcss");

var _postcss2 = _interopRequireDefault(_postcss);

var _adaptive = require("./adaptive");

var _adaptive2 = _interopRequireDefault(_adaptive);

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

exports.default = _postcss2.default.plugin("postcss-adaptive-my", function(options) {
  return function(css, result) {
    var adaptiveIns = new _adaptive2.default(options);
    var output = adaptiveIns.parse(css.toString());
    result.root = _postcss2.default.parse(output);
  };
});
