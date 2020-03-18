/* eslint no-extend-native: 0 */
import "@babel/polyfill";
// import "url-polyfill";
// core-js comes with Next.js. So, you can import it like below
import includes from "core-js/library/fn/string/virtual/includes";
import repeat from "core-js/library/fn/string/virtual/repeat";
import "core-js/es6/map";
import "core-js/es6/set";

require("es6-promise").polyfill();
require("isomorphic-unfetch");
// if (!window.Promise) {
//   window.Promise = require("core-js/es6/promise");
// }

// Add your polyfills
// This files runs at the very beginning (even before React and Next.js core)
// console.log("loaded polyfills success.");

String.prototype.includes = includes;
String.prototype.repeat = repeat;
