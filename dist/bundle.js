/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/css-loader/dist/cjs.js!./templates/common.css":
/*!********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./templates/common.css ***!
  \********************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/getUrl.js */ \"./node_modules/css-loader/dist/runtime/getUrl.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);\n// Imports\n\n\n\nvar ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ./search_button.png */ \"./templates/search_button.png\"), __webpack_require__.b);\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\nvar ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \"* {\\n  box-sizing: border-box !important;\\n}\\n\\nbody {\\n  font-size: 14px;\\n  background-color: #222222;\\n  color: #fff;\\n}\\n\\na {\\n  color: inherit;\\n  text-decoration: none;\\n}\\n\\nbutton {\\n  cursor: pointer;\\n}\\n\\n#app {\\n  padding-bottom: 48px;\\n}\\n\\n*:focus {\\n  outline: none;\\n}\\n.item-view,\\n.item-test {\\n  width: 100%;\\n}\\n\\n.item-view {\\n  display: flex;\\n  flex-direction: column;\\n  justify-content: center;\\n  align-items: center;\\n  max-width: 1200px;\\n  min-width: 386px;\\n  margin: 0 auto;\\n}\\n\\n.item-view h2 {\\n  width: 1200px;\\n  font-size: 2rem;\\n  font-weight: bold;\\n  user-select: none;\\n}\\n\\n@media screen and (max-width: 1239px) {\\n  .item-view h2 {\\n    width: 960px;\\n  }\\n}\\n\\n@media screen and (max-width: 992px) {\\n  .item-view h2 {\\n    width: 620px;\\n  }\\n}\\n\\n@media screen and (max-width: 672px) {\\n  .item-view h2 {\\n    width: 370px;\\n  }\\n}\\n\\n/* https://andrew.hedges.name/experiments/aspect_ratio/ */\\n\\n.item-list,\\n.skeleton-cards {\\n  display: grid;\\n\\n  grid-template-columns: repeat(4, 1fr);\\n  grid-row-gap: 48px;\\n  grid-column-gap: 160px;\\n\\n  margin: 48px 0;\\n}\\n\\n@media screen and (max-width: 1239px) {\\n  .item-view h2,\\n  .item-list,\\n  .skeleton-cards {\\n    padding: 0 16px;\\n  }\\n\\n  .item-list,\\n  .skeleton-cards {\\n    grid-template-columns: repeat(4, 1fr);\\n    grid-column-gap: 80px;\\n  }\\n}\\n\\n@media screen and (max-width: 992px) {\\n  .item-list,\\n  .skeleton-cards {\\n    grid-template-columns: repeat(3, 1fr);\\n    grid-column-gap: 40px;\\n  }\\n}\\n\\n@media screen and (max-width: 672px) {\\n  .item-list,\\n  .skeleton-cards {\\n    grid-template-columns: repeat(2, 1fr);\\n    grid-column-gap: 10px;\\n\\n    padding: 0 8px;\\n  }\\n}\\n\\n.skeleton-cards {\\n  margin-top: -48px;\\n}\\n\\n.hidden {\\n  display: none;\\n}\\n\\n.item {\\n  width: 180px;\\n}\\n\\n.item-card {\\n  display: flex;\\n  flex-direction: column;\\n\\n  transition: transform 0.2s ease-in-out;\\n}\\n\\n.item-card:hover {\\n  transform: scale(1.05);\\n}\\n\\n.item-thumbnail {\\n  border-radius: 8px;\\n  width: 180px;\\n  height: 270px;\\n  background-size: contain;\\n}\\n\\n.item-title {\\n  margin-top: 16px;\\n  font-size: 1.2rem;\\n  font-weight: bold;\\n}\\n\\n.item-score {\\n  margin-top: 16px;\\n  font-size: 1.2rem;\\n}\\n\\n.item-score::after {\\n  margin-left: 8px;\\n}\\n\\n.item-title.skeleton::after,\\n.item-score.skeleton::after {\\n  font-size: 0;\\n  content: 'loading';\\n}\\n\\n.full-width {\\n  width: 100%;\\n}\\n\\n.last-item {\\n  margin-top: 48px;\\n}\\n\\nbutton.btn {\\n  border: 0;\\n  border-radius: 8px;\\n  height: 30px;\\n  color: #fff;\\n}\\n\\nbutton.primary {\\n  background: #f33f3f;\\n}\\n\\n.hidden {\\n  display: none;\\n}\\n\\n.item-card .skeleton {\\n  background: linear-gradient(-90deg, #aaa, #f0f0f0, #aaa, #f0f0f0);\\n  background-size: 400%;\\n  animation: skeleton-animation 5s infinite ease-out;\\n  border-radius: 8px;\\n  width: 180px;\\n}\\n\\n@keyframes skeleton-animation {\\n  0% {\\n    background-position: 0% 50%;\\n  }\\n  50% {\\n    background-position: 100% 50%;\\n  }\\n  100% {\\n    background-position: 0% 50%;\\n  }\\n}\\nheader {\\n  width: 100%;\\n  height: 72px;\\n  background-color: #222;\\n  display: flex;\\n  justify-content: space-between;\\n  align-items: center;\\n  padding: 0 20px;\\n  border-bottom: 1px solid white;\\n  margin-bottom: 48px;\\n}\\n\\nheader h1 {\\n  cursor: pointer;\\n  user-select: none;\\n  font-size: 2rem;\\n  font-weight: bold;\\n  letter-spacing: -0.1rem;\\n  color: #f33f3f;\\n}\\n\\nheader > .search-box {\\n  background: #fff;\\n  padding: 8px 10px;\\n  border-radius: 4px;\\n}\\n\\nheader .search-box > input {\\n  border: 0;\\n}\\n\\n@media screen and (max-width: 390px) {\\n  header .search-box > input:not(:focus) {\\n    position: absolute;\\n    width: 16px;\\n\\n    opacity: 0;\\n    cursor: pointer;\\n  }\\n\\n  header > .search-box:has(input:focus) {\\n    width: 100%;\\n  }\\n\\n  header:has(input:focus) > h1 {\\n    display: none;\\n  }\\n\\n  header .search-box > input:focus {\\n    width: calc(100% - 18px);\\n  }\\n}\\n\\nheader .search-box > .search-button {\\n  width: 14px;\\n  border: 0;\\n  text-indent: -1000rem;\\n  background: url(\" + ___CSS_LOADER_URL_REPLACEMENT_0___ + \") transparent no-repeat 0 1px;\\n  background-size: contain;\\n}\\n\\n.no-image {\\n  display: flex;\\n  justify-content: center;\\n  align-items: center;\\n\\n  background-color: white;\\n\\n  color: black;\\n  font-weight: 600;\\n  font-size: 24px;\\n}\\n\\n.movie-detail {\\n  position: fixed;\\n  background-color: #212122;\\n\\n  width: 826px;\\n  height: 577px;\\n\\n  border-radius: 8px;\\n\\n  z-index: 100;\\n}\\n\\n@media screen and (min-width: 827px) {\\n  .movie-detail {\\n    left: 50%;\\n    top: 50%;\\n    transform: translate(-50%, -50%);\\n  }\\n}\\n\\n@media screen and (max-width: 826px) {\\n  .movie-detail {\\n    width: 100%;\\n    bottom: 0;\\n  }\\n}\\n\\n.movie-detail-modal-background {\\n  position: fixed;\\n  top: 0;\\n  left: 0;\\n\\n  width: 100vw;\\n  height: 100vh;\\n  background-color: rgba(0, 0, 0, 0.6);\\n}\\n\\n.movie-detail-top {\\n  position: relative;\\n  border-bottom: 1px solid rgba(241, 241, 241, 0.25);\\n}\\n\\n.movie-detail-top-title {\\n  display: flex;\\n  align-items: center;\\n  justify-content: center;\\n\\n  font-size: 20px;\\n  font-weight: 600;\\n\\n  padding: 18px 32px;\\n}\\n\\n.movie-detail-close-button {\\n  position: absolute;\\n\\n  width: 30px;\\n  height: 30px;\\n\\n  right: 25px;\\n  top: 15px;\\n\\n  border-radius: 50%;\\n  font-weight: 900;\\n  border: none;\\n}\\n\\n.movie-detail-content-box {\\n  display: flex;\\n\\n  padding: 36px 32px 48px 32px;\\n}\\n\\n.movie-detail-content {\\n  height: inherit;\\n\\n  display: flex;\\n  flex-direction: column;\\n  justify-content: space-between;\\n\\n  margin-left: 32px;\\n}\\n\\n.movie-detail-genres-vote {\\n  display: flex;\\n  align-items: center;\\n\\n  margin-bottom: 16px;\\n}\\n\\n.movie-detail-vote img {\\n  margin-right: 6px;\\n}\\n\\n.movie-detail-genres {\\n  margin-right: 18px;\\n}\\n\\n.movie-detail-vote {\\n  display: flex;\\n  align-items: center;\\n}\\n\\n.movie-detail-overview {\\n  line-height: 24px;\\n  width: 90%;\\n}\\n\\n.movie-detail-content-top {\\n  display: flex;\\n}\\n\\n.movie-detail-thumbnail {\\n  width: 260px;\\n  height: 400px;\\n}\\n\\n@media screen and (max-width: 826px) {\\n  .movie-detail-thumbnail {\\n    display: none;\\n  }\\n\\n  .movie-detail-content-box {\\n    height: 400px;\\n  }\\n\\n  .movie-detail-content {\\n    margin-left: 0;\\n    width: 100%;\\n  }\\n\\n  .movie-detail-overview {\\n    width: 100%;\\n  }\\n}\\n\\n.movie-assessment {\\n  display: flex;\\n  align-items: center;\\n  justify-content: center;\\n\\n  width: 100%;\\n  height: 64px;\\n\\n  padding: 0 16px;\\n\\n  background-color: #383839;\\n  border-radius: 16px;\\n\\n  color: #f1f1f1;\\n}\\n\\n.movie-assessment > div:first-child {\\n  font-weight: 700;\\n}\\n\\n.movie-assessment > div:nth-child(2) {\\n  margin: 0 15px;\\n}\\n\\n.star {\\n  cursor: pointer;\\n}\\n\\n.nothing-found {\\n  position: absolute;\\n  left: 10%;\\n\\n  width: 100%;\\n\\n  font-size: 28px;\\n  opacity: 0.6;\\n}\\n\\n.review-message {\\n  margin-left: 12px;\\n}\\n\\n@media screen and (max-width: 826px) {\\n  .review-message {\\n    display: none;\\n  }\\n}\\n\\n.error-message {\\n  position: absolute;\\n  left: 30px;\\n\\n  font-size: 28px;\\n  font-weight: 600;\\n\\n  opacity: 0.6;\\n}\\n\", \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://javascript-movie-review/./templates/common.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./templates/reset.css":
/*!*******************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./templates/reset.css ***!
  \*******************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/noSourceMaps.js */ \"./node_modules/css-loader/dist/runtime/noSourceMaps.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ \"./node_modules/css-loader/dist/runtime/api.js\");\n/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);\n// Imports\n\n\nvar ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));\n// Module\n___CSS_LOADER_EXPORT___.push([module.id, \"/* http://meyerweb.com/eric/tools/css/reset/\\n   v2.0 | 20110126\\n   License: none (public domain)\\n*/\\n\\nhtml,\\nbody,\\ndiv,\\nspan,\\napplet,\\nobject,\\niframe,\\nh1,\\nh2,\\nh3,\\nh4,\\nh5,\\nh6,\\np,\\nblockquote,\\npre,\\na,\\nabbr,\\nacronym,\\naddress,\\nbig,\\ncite,\\ncode,\\ndel,\\ndfn,\\nem,\\nimg,\\nins,\\nkbd,\\nq,\\ns,\\nsamp,\\nsmall,\\nstrike,\\nstrong,\\nsub,\\nsup,\\ntt,\\nvar,\\nb,\\nu,\\ni,\\ncenter,\\ndl,\\ndt,\\ndd,\\nol,\\nul,\\nli,\\nfieldset,\\nform,\\nlabel,\\nlegend,\\ntable,\\ncaption,\\ntbody,\\ntfoot,\\nthead,\\ntr,\\nth,\\ntd,\\narticle,\\naside,\\ncanvas,\\ndetails,\\nembed,\\nfigure,\\nfigcaption,\\nfooter,\\nheader,\\nhgroup,\\nmenu,\\nnav,\\noutput,\\nruby,\\nsection,\\nsummary,\\ntime,\\nmark,\\naudio,\\nvideo {\\n  margin: 0;\\n  padding: 0;\\n  border: 0;\\n  font-size: 100%;\\n  font: inherit;\\n  vertical-align: baseline;\\n}\\n/* HTML5 display-role reset for older browsers */\\narticle,\\naside,\\ndetails,\\nfigcaption,\\nfigure,\\nfooter,\\nheader,\\nhgroup,\\nmenu,\\nnav,\\nsection {\\n  display: block;\\n}\\nbody {\\n  line-height: 1;\\n}\\nol,\\nul {\\n  list-style: none;\\n}\\nblockquote,\\nq {\\n  quotes: none;\\n}\\nblockquote:before,\\nblockquote:after,\\nq:before,\\nq:after {\\n  content: \\\"\\\";\\n  content: none;\\n}\\ntable {\\n  border-collapse: collapse;\\n  border-spacing: 0;\\n}\\n\", \"\"]);\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);\n\n\n//# sourceURL=webpack://javascript-movie-review/./templates/reset.css?./node_modules/css-loader/dist/cjs.js");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {

eval("\n\n/*\n  MIT License http://www.opensource.org/licenses/mit-license.php\n  Author Tobias Koppers @sokra\n*/\nmodule.exports = function (cssWithMappingToString) {\n  var list = [];\n\n  // return the list of modules as css string\n  list.toString = function toString() {\n    return this.map(function (item) {\n      var content = \"\";\n      var needLayer = typeof item[5] !== \"undefined\";\n      if (item[4]) {\n        content += \"@supports (\".concat(item[4], \") {\");\n      }\n      if (item[2]) {\n        content += \"@media \".concat(item[2], \" {\");\n      }\n      if (needLayer) {\n        content += \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\");\n      }\n      content += cssWithMappingToString(item);\n      if (needLayer) {\n        content += \"}\";\n      }\n      if (item[2]) {\n        content += \"}\";\n      }\n      if (item[4]) {\n        content += \"}\";\n      }\n      return content;\n    }).join(\"\");\n  };\n\n  // import a list of modules into the list\n  list.i = function i(modules, media, dedupe, supports, layer) {\n    if (typeof modules === \"string\") {\n      modules = [[null, modules, undefined]];\n    }\n    var alreadyImportedModules = {};\n    if (dedupe) {\n      for (var k = 0; k < this.length; k++) {\n        var id = this[k][0];\n        if (id != null) {\n          alreadyImportedModules[id] = true;\n        }\n      }\n    }\n    for (var _k = 0; _k < modules.length; _k++) {\n      var item = [].concat(modules[_k]);\n      if (dedupe && alreadyImportedModules[item[0]]) {\n        continue;\n      }\n      if (typeof layer !== \"undefined\") {\n        if (typeof item[5] === \"undefined\") {\n          item[5] = layer;\n        } else {\n          item[1] = \"@layer\".concat(item[5].length > 0 ? \" \".concat(item[5]) : \"\", \" {\").concat(item[1], \"}\");\n          item[5] = layer;\n        }\n      }\n      if (media) {\n        if (!item[2]) {\n          item[2] = media;\n        } else {\n          item[1] = \"@media \".concat(item[2], \" {\").concat(item[1], \"}\");\n          item[2] = media;\n        }\n      }\n      if (supports) {\n        if (!item[4]) {\n          item[4] = \"\".concat(supports);\n        } else {\n          item[1] = \"@supports (\".concat(item[4], \") {\").concat(item[1], \"}\");\n          item[4] = supports;\n        }\n      }\n      list.push(item);\n    }\n  };\n  return list;\n};\n\n//# sourceURL=webpack://javascript-movie-review/./node_modules/css-loader/dist/runtime/api.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = function (url, options) {\n  if (!options) {\n    options = {};\n  }\n  if (!url) {\n    return url;\n  }\n  url = String(url.__esModule ? url.default : url);\n\n  // If url is already wrapped in quotes, remove them\n  if (/^['\"].*['\"]$/.test(url)) {\n    url = url.slice(1, -1);\n  }\n  if (options.hash) {\n    url += options.hash;\n  }\n\n  // Should url be wrapped?\n  // See https://drafts.csswg.org/css-values-3/#urls\n  if (/[\"'() \\t\\n]|(%20)/.test(url) || options.needQuotes) {\n    return \"\\\"\".concat(url.replace(/\"/g, '\\\\\"').replace(/\\n/g, \"\\\\n\"), \"\\\"\");\n  }\n  return url;\n};\n\n//# sourceURL=webpack://javascript-movie-review/./node_modules/css-loader/dist/runtime/getUrl.js?");

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/noSourceMaps.js":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/noSourceMaps.js ***!
  \**************************************************************/
/***/ ((module) => {

eval("\n\nmodule.exports = function (i) {\n  return i[1];\n};\n\n//# sourceURL=webpack://javascript-movie-review/./node_modules/css-loader/dist/runtime/noSourceMaps.js?");

/***/ }),

/***/ "./templates/common.css":
/*!******************************!*\
  !*** ./templates/common.css ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_common_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./common.css */ \"./node_modules/css-loader/dist/cjs.js!./templates/common.css\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\n\n      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\n    \noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_common_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_common_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_common_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_common_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://javascript-movie-review/./templates/common.css?");

/***/ }),

/***/ "./templates/reset.css":
/*!*****************************!*\
  !*** ./templates/reset.css ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ \"./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ \"./node_modules/style-loader/dist/runtime/styleDomAPI.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ \"./node_modules/style-loader/dist/runtime/insertBySelector.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ \"./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ \"./node_modules/style-loader/dist/runtime/insertStyleElement.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ \"./node_modules/style-loader/dist/runtime/styleTagTransform.js\");\n/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var _node_modules_css_loader_dist_cjs_js_reset_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./reset.css */ \"./node_modules/css-loader/dist/cjs.js!./templates/reset.css\");\n\n      \n      \n      \n      \n      \n      \n      \n      \n      \n\nvar options = {};\n\noptions.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());\noptions.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());\n\n      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, \"head\");\n    \noptions.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());\noptions.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());\n\nvar update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_reset_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"], options);\n\n\n\n\n       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_reset_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"] && _node_modules_css_loader_dist_cjs_js_reset_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals ? _node_modules_css_loader_dist_cjs_js_reset_css__WEBPACK_IMPORTED_MODULE_6__[\"default\"].locals : undefined);\n\n\n//# sourceURL=webpack://javascript-movie-review/./templates/reset.css?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {

eval("\n\nvar stylesInDOM = [];\nfunction getIndexByIdentifier(identifier) {\n  var result = -1;\n  for (var i = 0; i < stylesInDOM.length; i++) {\n    if (stylesInDOM[i].identifier === identifier) {\n      result = i;\n      break;\n    }\n  }\n  return result;\n}\nfunction modulesToDom(list, options) {\n  var idCountMap = {};\n  var identifiers = [];\n  for (var i = 0; i < list.length; i++) {\n    var item = list[i];\n    var id = options.base ? item[0] + options.base : item[0];\n    var count = idCountMap[id] || 0;\n    var identifier = \"\".concat(id, \" \").concat(count);\n    idCountMap[id] = count + 1;\n    var indexByIdentifier = getIndexByIdentifier(identifier);\n    var obj = {\n      css: item[1],\n      media: item[2],\n      sourceMap: item[3],\n      supports: item[4],\n      layer: item[5]\n    };\n    if (indexByIdentifier !== -1) {\n      stylesInDOM[indexByIdentifier].references++;\n      stylesInDOM[indexByIdentifier].updater(obj);\n    } else {\n      var updater = addElementStyle(obj, options);\n      options.byIndex = i;\n      stylesInDOM.splice(i, 0, {\n        identifier: identifier,\n        updater: updater,\n        references: 1\n      });\n    }\n    identifiers.push(identifier);\n  }\n  return identifiers;\n}\nfunction addElementStyle(obj, options) {\n  var api = options.domAPI(options);\n  api.update(obj);\n  var updater = function updater(newObj) {\n    if (newObj) {\n      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {\n        return;\n      }\n      api.update(obj = newObj);\n    } else {\n      api.remove();\n    }\n  };\n  return updater;\n}\nmodule.exports = function (list, options) {\n  options = options || {};\n  list = list || [];\n  var lastIdentifiers = modulesToDom(list, options);\n  return function update(newList) {\n    newList = newList || [];\n    for (var i = 0; i < lastIdentifiers.length; i++) {\n      var identifier = lastIdentifiers[i];\n      var index = getIndexByIdentifier(identifier);\n      stylesInDOM[index].references--;\n    }\n    var newLastIdentifiers = modulesToDom(newList, options);\n    for (var _i = 0; _i < lastIdentifiers.length; _i++) {\n      var _identifier = lastIdentifiers[_i];\n      var _index = getIndexByIdentifier(_identifier);\n      if (stylesInDOM[_index].references === 0) {\n        stylesInDOM[_index].updater();\n        stylesInDOM.splice(_index, 1);\n      }\n    }\n    lastIdentifiers = newLastIdentifiers;\n  };\n};\n\n//# sourceURL=webpack://javascript-movie-review/./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {

eval("\n\nvar memo = {};\n\n/* istanbul ignore next  */\nfunction getTarget(target) {\n  if (typeof memo[target] === \"undefined\") {\n    var styleTarget = document.querySelector(target);\n\n    // Special case to return head of iframe instead of iframe itself\n    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {\n      try {\n        // This will throw an exception if access to iframe is blocked\n        // due to cross-origin restrictions\n        styleTarget = styleTarget.contentDocument.head;\n      } catch (e) {\n        // istanbul ignore next\n        styleTarget = null;\n      }\n    }\n    memo[target] = styleTarget;\n  }\n  return memo[target];\n}\n\n/* istanbul ignore next  */\nfunction insertBySelector(insert, style) {\n  var target = getTarget(insert);\n  if (!target) {\n    throw new Error(\"Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.\");\n  }\n  target.appendChild(style);\n}\nmodule.exports = insertBySelector;\n\n//# sourceURL=webpack://javascript-movie-review/./node_modules/style-loader/dist/runtime/insertBySelector.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction insertStyleElement(options) {\n  var element = document.createElement(\"style\");\n  options.setAttributes(element, options.attributes);\n  options.insert(element, options.options);\n  return element;\n}\nmodule.exports = insertStyleElement;\n\n//# sourceURL=webpack://javascript-movie-review/./node_modules/style-loader/dist/runtime/insertStyleElement.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("\n\n/* istanbul ignore next  */\nfunction setAttributesWithoutAttributes(styleElement) {\n  var nonce =  true ? __webpack_require__.nc : 0;\n  if (nonce) {\n    styleElement.setAttribute(\"nonce\", nonce);\n  }\n}\nmodule.exports = setAttributesWithoutAttributes;\n\n//# sourceURL=webpack://javascript-movie-review/./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction apply(styleElement, options, obj) {\n  var css = \"\";\n  if (obj.supports) {\n    css += \"@supports (\".concat(obj.supports, \") {\");\n  }\n  if (obj.media) {\n    css += \"@media \".concat(obj.media, \" {\");\n  }\n  var needLayer = typeof obj.layer !== \"undefined\";\n  if (needLayer) {\n    css += \"@layer\".concat(obj.layer.length > 0 ? \" \".concat(obj.layer) : \"\", \" {\");\n  }\n  css += obj.css;\n  if (needLayer) {\n    css += \"}\";\n  }\n  if (obj.media) {\n    css += \"}\";\n  }\n  if (obj.supports) {\n    css += \"}\";\n  }\n  var sourceMap = obj.sourceMap;\n  if (sourceMap && typeof btoa !== \"undefined\") {\n    css += \"\\n/*# sourceMappingURL=data:application/json;base64,\".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), \" */\");\n  }\n\n  // For old IE\n  /* istanbul ignore if  */\n  options.styleTagTransform(css, styleElement, options.options);\n}\nfunction removeStyleElement(styleElement) {\n  // istanbul ignore if\n  if (styleElement.parentNode === null) {\n    return false;\n  }\n  styleElement.parentNode.removeChild(styleElement);\n}\n\n/* istanbul ignore next  */\nfunction domAPI(options) {\n  if (typeof document === \"undefined\") {\n    return {\n      update: function update() {},\n      remove: function remove() {}\n    };\n  }\n  var styleElement = options.insertStyleElement(options);\n  return {\n    update: function update(obj) {\n      apply(styleElement, options, obj);\n    },\n    remove: function remove() {\n      removeStyleElement(styleElement);\n    }\n  };\n}\nmodule.exports = domAPI;\n\n//# sourceURL=webpack://javascript-movie-review/./node_modules/style-loader/dist/runtime/styleDomAPI.js?");

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {

eval("\n\n/* istanbul ignore next  */\nfunction styleTagTransform(css, styleElement) {\n  if (styleElement.styleSheet) {\n    styleElement.styleSheet.cssText = css;\n  } else {\n    while (styleElement.firstChild) {\n      styleElement.removeChild(styleElement.firstChild);\n    }\n    styleElement.appendChild(document.createTextNode(css));\n  }\n}\nmodule.exports = styleTagTransform;\n\n//# sourceURL=webpack://javascript-movie-review/./node_modules/style-loader/dist/runtime/styleTagTransform.js?");

/***/ }),

/***/ "./src/App.js":
/*!********************!*\
  !*** ./src/App.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _domain_Movie__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./domain/Movie */ \"./src/domain/Movie.ts\");\n/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components */ \"./src/components/index.js\");\n/* harmony import */ var _statusCode__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./statusCode */ \"./src/statusCode.js\");\n/* harmony import */ var _utils_localStorage__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/localStorage */ \"./src/utils/localStorage.js\");\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./constants */ \"./src/constants/index.js\");\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\n\n\n\n\n\nconst pageCounter = (firstPage) => {\n    let page = firstPage;\n    return () => (page += 1);\n};\nclass App {\n    constructor($target) {\n        this.$main = document.createElement('main');\n        this.page = pageCounter(0);\n        this.query = null;\n        this.isLoading = false;\n        this.isError = false;\n        this.init($target);\n        this.render($target);\n        this.bindEvent();\n    }\n    init($target) {\n        this.movie = new _domain_Movie__WEBPACK_IMPORTED_MODULE_0__[\"default\"]();\n        new _components__WEBPACK_IMPORTED_MODULE_1__.Header($target);\n        this.movieView = new _components__WEBPACK_IMPORTED_MODULE_1__.MovieView(this.$main);\n        this.movieDetail = new _components__WEBPACK_IMPORTED_MODULE_1__.MovieDetail($target);\n        this.reviewScore = _utils_localStorage__WEBPACK_IMPORTED_MODULE_3__[\"default\"].getLocalStorage(_constants__WEBPACK_IMPORTED_MODULE_4__.LOCAL_STORAGE_KEY.APP) || {};\n        this.updateMovieView();\n    }\n    render($target) {\n        $target.insertAdjacentElement('beforeend', this.$main);\n    }\n    bindEvent() {\n        document.addEventListener(_constants__WEBPACK_IMPORTED_MODULE_4__.CUSTOM_EVENT.RENDER_MOVIES, ({ detail: { query } }) => {\n            this.query = query;\n            this.page = pageCounter(0);\n            this.updateMovieView();\n        });\n        document.addEventListener(_constants__WEBPACK_IMPORTED_MODULE_4__.CUSTOM_EVENT.RENDER_MORE_MOVIES, () => {\n            this.updateMovieView();\n        });\n        document.addEventListener(_constants__WEBPACK_IMPORTED_MODULE_4__.CUSTOM_EVENT.SHOW_MOVIE_DETAIL, ({ detail: { id } }) => __awaiter(this, void 0, void 0, function* () {\n            if (this.isLoading)\n                return;\n            if (this.isError)\n                this.removeErrorMessage();\n            this.isLoading = true;\n            const { data, isError } = yield this.movie.getMovieById(id);\n            if (isError) {\n                this.displayErrorMessage(data);\n            }\n            const reviewScore = this.reviewScore[data.id] || 0;\n            this.movieDetail.open(Object.assign(Object.assign({}, data), { reviewScore }));\n            this.isLoading = false;\n        }));\n        document.addEventListener(_constants__WEBPACK_IMPORTED_MODULE_4__.CUSTOM_EVENT.UPDATE_REVIEW_SCORE, ({ detail: { movieId, score } }) => {\n            this.reviewScore[movieId] = score;\n            _utils_localStorage__WEBPACK_IMPORTED_MODULE_3__[\"default\"].setLocalStorage(_constants__WEBPACK_IMPORTED_MODULE_4__.LOCAL_STORAGE_KEY.APP, this.reviewScore);\n        });\n    }\n    updateMovieView() {\n        return __awaiter(this, void 0, void 0, function* () {\n            if (this.isLoading)\n                return;\n            if (this.isError)\n                this.removeErrorMessage();\n            this.isLoading = true;\n            this.movieView.showSkeleton();\n            const { isError, data } = yield this.movie.getMovies(this.query, this.page());\n            if (isError) {\n                this.displayErrorMessage(data);\n            }\n            else {\n                document.dispatchEvent(new CustomEvent(_constants__WEBPACK_IMPORTED_MODULE_4__.CUSTOM_EVENT.UPDATE_MOVIE_LIST_TITLE, { detail: { query: this.query } }));\n                this.movieView.addMovies(data);\n            }\n            this.movieView.hideSkeleton();\n            this.isLoading = false;\n        });\n    }\n    displayErrorMessage({ status_code }) {\n        this.isError = true;\n        this.$main.classList.add('hidden');\n        this.$main.insertAdjacentHTML('beforebegin', this.getErrorMessageTemplate(status_code));\n    }\n    removeErrorMessage() {\n        this.isError = false;\n        this.$main.classList.remove('hidden');\n        document.querySelector('.error-message').remove();\n    }\n    getErrorMessageTemplate(status_code) {\n        const errorDiv = `<div class=\"error-message\">\n      <p>${(0,_statusCode__WEBPACK_IMPORTED_MODULE_2__.statusCodeToErrorMessage)(status_code)}</p>\n    </div>`;\n        return errorDiv;\n    }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (App);\n\n\n//# sourceURL=webpack://javascript-movie-review/./src/App.js?");

/***/ }),

/***/ "./src/components/Header.js":
/*!**********************************!*\
  !*** ./src/components/Header.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _templates_logo_png__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../templates/logo.png */ \"./templates/logo.png\");\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants */ \"./src/constants/index.js\");\n\n\nclass Header {\n    constructor($target) {\n        this.$header = document.createElement('header');\n        this.init();\n        this.render($target);\n        this.bindEvent();\n    }\n    init() {\n        this.$header.innerHTML = this.getTemplate();\n    }\n    render($target) {\n        $target.insertAdjacentElement('afterbegin', this.$header);\n    }\n    bindEvent() {\n        this.$header.addEventListener('click', ({ target }) => {\n            if (target.id !== 'logo')\n                return;\n            this.clearQuery();\n            document.dispatchEvent(new CustomEvent(_constants__WEBPACK_IMPORTED_MODULE_1__.CUSTOM_EVENT.RENDER_MOVIES, { detail: { query: null } }));\n        });\n        this.$header.addEventListener('submit', (e) => {\n            e.preventDefault();\n            const { value: query } = document.querySelector('.search-input');\n            document.dispatchEvent(new CustomEvent(_constants__WEBPACK_IMPORTED_MODULE_1__.CUSTOM_EVENT.RENDER_MOVIES, { detail: { query } }));\n        });\n    }\n    clearQuery() {\n        const $input = document.querySelector('.search-input');\n        $input.value = '';\n    }\n    getTemplate() {\n        const template = `\n      <h1><img id=\"logo\" src=${_templates_logo_png__WEBPACK_IMPORTED_MODULE_0__} alt=\"MovieList 로고\" /></h1>\n      <form class=\"search-box\">\n        <input class=\"search-input\" type=\"text\" placeholder=\"검색\" />\n        <button class=\"search-button\">검색</button>\n      </form>\n      `;\n        return template;\n    }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Header);\n\n\n//# sourceURL=webpack://javascript-movie-review/./src/components/Header.js?");

/***/ }),

/***/ "./src/components/MovieDetail.js":
/*!***************************************!*\
  !*** ./src/components/MovieDetail.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _templates_star_filled_png__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../templates/star_filled.png */ \"./templates/star_filled.png\");\n/* harmony import */ var _templates_star_empty_png__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../templates/star_empty.png */ \"./templates/star_empty.png\");\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../constants */ \"./src/constants/index.js\");\n\n\n\nclass MovieDetail {\n    constructor($target) {\n        this.$modal = document.createElement('div');\n        this.init();\n        this.render($target);\n        this.bindEvent();\n    }\n    init() {\n        this.$modal.classList = 'movie-detail-modal hidden';\n    }\n    render($target) {\n        $target.insertAdjacentElement('afterbegin', this.$modal);\n    }\n    bindEvent() {\n        window.onkeyup = ({ keyCode }) => {\n            if (keyCode === 27 || keyCode === 8) {\n                this.close();\n            }\n        };\n        this.$modal.addEventListener('click', ({ target: { className } }) => {\n            if (className === 'movie-detail-close-button' ||\n                className === 'movie-detail-modal-background') {\n                this.close();\n            }\n        });\n        this.$modal.addEventListener('click', ({ target }) => {\n            const { id, className } = target;\n            if (className !== 'star')\n                return;\n            const $stars = document.querySelectorAll(`.${className}`);\n            [...$stars].forEach(($star, index) => {\n                if (index < Number(id)) {\n                    $star.src = _templates_star_filled_png__WEBPACK_IMPORTED_MODULE_0__;\n                    $star.alt = _templates_star_filled_png__WEBPACK_IMPORTED_MODULE_0__;\n                }\n                else {\n                    $star.src = _templates_star_empty_png__WEBPACK_IMPORTED_MODULE_1__;\n                    $star.alt = _templates_star_empty_png__WEBPACK_IMPORTED_MODULE_1__;\n                }\n            });\n            document.querySelector('.review-score').innerText = id * 2;\n            document.querySelector('.review-message').innerText = _constants__WEBPACK_IMPORTED_MODULE_2__.REVIEW_SCORE_MESSAGE[id * 2] || '';\n            const movieId = this.$modal.id;\n            document.dispatchEvent(new CustomEvent(_constants__WEBPACK_IMPORTED_MODULE_2__.CUSTOM_EVENT.UPDATE_REVIEW_SCORE, { detail: { movieId, score: id * 2 } }));\n        });\n    }\n    open(movie) {\n        this.$modal.id = movie.id;\n        this.$modal.classList.remove('hidden');\n        this.$modal.innerHTML = this.getTemplate(movie);\n    }\n    close() {\n        this.$modal.classList.add('hidden');\n    }\n    getTemplate({ genres, title, overview, poster_path, vote_average, reviewScore }) {\n        const template = `\n      <div class=\"movie-detail\">\n        <div class=\"movie-detail-top\">\n          <h2 class=\"movie-detail-top-title\">${title}</h2>\n          <button class=\"movie-detail-close-button\">X</button>\n        </div>\n        <div class=\"movie-detail-content-box\">\n        ${poster_path\n            ? `<img\n              class=\"movie-detail-thumbnail skeleton\"\n              src=\"https://image.tmdb.org/t/p/w500/${poster_path}\"\n              loading=\"lazy\"\n              alt=\"${title}\"\n            />`\n            : `<div class=\"movie-detail-thumbnail no-image\">\n              <span>No Image</span>\n            </div>`}\n          <div class=\"movie-detail-content\">\n            <div>\n              <div class=\"movie-detail-genres-vote\">\n                <div class=\"movie-detail-genres\">${genres\n            .map((genres) => genres.name)\n            .join(', ')}</div>\n                <div class=\"movie-detail-vote\">\n                  <img src=${_templates_star_filled_png__WEBPACK_IMPORTED_MODULE_0__} alt=${_templates_star_filled_png__WEBPACK_IMPORTED_MODULE_0__}/>\n                  <span>${vote_average.toFixed(1)}</span>\n                </div>\n              </div>\n              <p class=\"movie-detail-overview\">${overview}</p>\n            </div>\n            <div class=\"movie-assessment\">\n              <div>\n                <span>내 별점</span>\n              </div>\n              <div>\n                ${Array.from({ length: 5 }).reduce((starImages, _, index) => {\n            const id = index + 1;\n            const starImg = id <= reviewScore / 2\n                ? `<img id=${id} class=\"star\" src=${_templates_star_filled_png__WEBPACK_IMPORTED_MODULE_0__} alt=${_templates_star_filled_png__WEBPACK_IMPORTED_MODULE_0__}/>`\n                : `<img id=${id} class=\"star\" src=${_templates_star_empty_png__WEBPACK_IMPORTED_MODULE_1__} alt=${_templates_star_empty_png__WEBPACK_IMPORTED_MODULE_1__}/>`;\n            return starImages + starImg;\n        }, '')}\n              </div>\n              <div>\n                <span class=\"review-score\">${reviewScore}</span>\n                <span class=\"review-message\">${_constants__WEBPACK_IMPORTED_MODULE_2__.REVIEW_SCORE_MESSAGE[reviewScore] || ''}</span>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n      <div class=\"movie-detail-modal-background\"></div>`;\n        return template;\n    }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MovieDetail);\n\n\n//# sourceURL=webpack://javascript-movie-review/./src/components/MovieDetail.js?");

/***/ }),

/***/ "./src/components/MovieList.js":
/*!*************************************!*\
  !*** ./src/components/MovieList.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _templates_star_filled_png__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../templates/star_filled.png */ \"./templates/star_filled.png\");\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../constants */ \"./src/constants/index.js\");\n\n\nclass MovieList {\n    constructor($target) {\n        this.$ul = document.createElement('ul');\n        this.init();\n        this.render($target);\n        this.bindEvent();\n    }\n    init() {\n        this.$ul.classList = 'item-list';\n    }\n    render($target) {\n        $target.insertAdjacentElement('beforeend', this.$ul);\n    }\n    bindEvent() {\n        this.$ul.addEventListener('click', ({ target }) => {\n            if (!target.closest('.item'))\n                return;\n            const { id } = target.closest('.item');\n            document.dispatchEvent(new CustomEvent(_constants__WEBPACK_IMPORTED_MODULE_1__.CUSTOM_EVENT.SHOW_MOVIE_DETAIL, { detail: { id } }));\n        });\n    }\n    insertMovies(movies) {\n        const movieLi = this.getMovieLi(movies);\n        this.$ul.insertAdjacentHTML('beforeend', movieLi);\n    }\n    nothingFound() {\n        this.$ul.innerHTML = '<p class=\"nothing-found\">해당하는 영화를 찾을 수 없습니다</p>';\n    }\n    switchMovies(movies) {\n        const movieLi = this.getMovieLi(movies);\n        this.$ul.innerHTML = movieLi;\n    }\n    getMovieLi(movies) {\n        const movieLi = movies.reduce((li, movie) => {\n            return li + this.getMovieItemTemplate(movie);\n        }, '');\n        return movieLi;\n    }\n    getMovieItemTemplate({ id, title, vote_average, poster_path }) {\n        const template = `\n      <li id=${id} class=\"item\">\n        <a href=\"#${id}\">\n          <div class=\"item-card\">\n            ${poster_path\n            ? `<img\n                  class=\"item-thumbnail skeleton\"\n                  src=\"https://image.tmdb.org/t/p/w500/${poster_path}\"\n                  loading=\"lazy\"\n                  alt=\"${title}\"\n                />`\n            : `<div class=\"item-thumbnail no-image\">\n                  <span>No Image</span>\n                </div>`}\n            <p class=\"item-title\">${title}</p>\n            <p class=\"item-score\"><img src=\"${_templates_star_filled_png__WEBPACK_IMPORTED_MODULE_0__}\" alt=\"별점\" /> ${vote_average === null || vote_average === void 0 ? void 0 : vote_average.toFixed(1)}</p>\n          </div>\n        </a>\n      </li>`;\n        return template;\n    }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MovieList);\n\n\n//# sourceURL=webpack://javascript-movie-review/./src/components/MovieList.js?");

/***/ }),

/***/ "./src/components/MovieListTitle.js":
/*!******************************************!*\
  !*** ./src/components/MovieListTitle.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ \"./src/constants/index.js\");\n\nclass MovieListTitle {\n    constructor($target) {\n        this.$movieListTitle = document.createElement('h2');\n        this.init();\n        this.render($target);\n        this.bindEvent();\n    }\n    init() {\n        this.$movieListTitle.innerText = '지금 인기 있는 영화';\n    }\n    render($target) {\n        $target.insertAdjacentElement('afterbegin', this.$movieListTitle);\n    }\n    bindEvent() {\n        document.addEventListener(_constants__WEBPACK_IMPORTED_MODULE_0__.CUSTOM_EVENT.UPDATE_MOVIE_LIST_TITLE, ({ detail: { query } }) => {\n            if (query) {\n                return this.changeInnerText(`\"${query}\" 검색 결과`);\n            }\n            this.changeInnerText('지금 인기 있는 영화');\n        });\n    }\n    changeInnerText(listTitle) {\n        this.$movieListTitle.innerText = listTitle;\n    }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MovieListTitle);\n\n\n//# sourceURL=webpack://javascript-movie-review/./src/components/MovieListTitle.js?");

/***/ }),

/***/ "./src/components/MovieView.js":
/*!*************************************!*\
  !*** ./src/components/MovieView.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _constants__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../constants */ \"./src/constants/index.js\");\n/* harmony import */ var ___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ */ \"./src/components/index.js\");\n\n\nclass MovieView {\n    constructor($target) {\n        this.$itemView = document.createElement('section');\n        this.init();\n        this.render($target);\n        this.bindEvent();\n    }\n    init() {\n        this.$itemView.classList = 'item-view';\n        new ___WEBPACK_IMPORTED_MODULE_1__.MovieListTitle(this.$itemView);\n        this.movieList = new ___WEBPACK_IMPORTED_MODULE_1__.MovieList(this.$itemView);\n        this.skeletonCards = new ___WEBPACK_IMPORTED_MODULE_1__.SkeletonCards(this.$itemView);\n    }\n    render($target) {\n        $target.insertAdjacentElement('afterbegin', this.$itemView);\n    }\n    bindEvent() {\n        window.addEventListener('scroll', this.onScrollHandler);\n    }\n    onScrollHandler() {\n        const { scrollTop, scrollHeight, clientHeight } = document.documentElement;\n        if (clientHeight < Math.round(scrollHeight - scrollTop))\n            return;\n        document.dispatchEvent(new CustomEvent(_constants__WEBPACK_IMPORTED_MODULE_0__.CUSTOM_EVENT.RENDER_MORE_MOVIES));\n    }\n    addMovies({ page, results: movies }) {\n        if (movies.length === 0) {\n            return this.movieList.nothingFound();\n        }\n        if (page === 1) {\n            return this.movieList.switchMovies(movies);\n        }\n        this.movieList.insertMovies(movies);\n    }\n    showSkeleton() {\n        this.skeletonCards.show();\n    }\n    hideSkeleton() {\n        this.skeletonCards.hide();\n    }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MovieView);\n\n\n//# sourceURL=webpack://javascript-movie-review/./src/components/MovieView.js?");

/***/ }),

/***/ "./src/components/SkeletonCards.js":
/*!*****************************************!*\
  !*** ./src/components/SkeletonCards.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass SkeletonCards {\n    constructor($target) {\n        this.$ul = document.createElement('ul');\n        this.init();\n        this.render($target);\n    }\n    init() {\n        this.$ul.classList = 'skeleton-cards';\n        this.$ul.innerHTML = this.getTemplate();\n    }\n    render($target) {\n        $target.insertAdjacentElement('afterend', this.$ul);\n    }\n    getTemplate() {\n        const skeleton = `\n      <li>\n        <a href=\"#\"> \n          <div class=\"item-card\"> \n            <div class=\"item-thumbnail skeleton\"></div> \n            <div class=\"item-title skeleton\"></div> \n            <div class=\"item-score skeleton\"></div> \n          </div> \n        </a> \n      </li>`.repeat(20);\n        return skeleton;\n    }\n    show() {\n        this.$ul.classList.remove('hidden');\n    }\n    hide() {\n        this.$ul.classList.add('hidden');\n    }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (SkeletonCards);\n\n\n//# sourceURL=webpack://javascript-movie-review/./src/components/SkeletonCards.js?");

/***/ }),

/***/ "./src/components/index.js":
/*!*********************************!*\
  !*** ./src/components/index.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Header\": () => (/* reexport safe */ _Header__WEBPACK_IMPORTED_MODULE_0__[\"default\"]),\n/* harmony export */   \"MovieDetail\": () => (/* reexport safe */ _MovieDetail__WEBPACK_IMPORTED_MODULE_5__[\"default\"]),\n/* harmony export */   \"MovieList\": () => (/* reexport safe */ _MovieList__WEBPACK_IMPORTED_MODULE_3__[\"default\"]),\n/* harmony export */   \"MovieListTitle\": () => (/* reexport safe */ _MovieListTitle__WEBPACK_IMPORTED_MODULE_2__[\"default\"]),\n/* harmony export */   \"MovieView\": () => (/* reexport safe */ _MovieView__WEBPACK_IMPORTED_MODULE_1__[\"default\"]),\n/* harmony export */   \"SkeletonCards\": () => (/* reexport safe */ _SkeletonCards__WEBPACK_IMPORTED_MODULE_4__[\"default\"])\n/* harmony export */ });\n/* harmony import */ var _Header__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Header */ \"./src/components/Header.js\");\n/* harmony import */ var _MovieView__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MovieView */ \"./src/components/MovieView.js\");\n/* harmony import */ var _MovieListTitle__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MovieListTitle */ \"./src/components/MovieListTitle.js\");\n/* harmony import */ var _MovieList__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./MovieList */ \"./src/components/MovieList.js\");\n/* harmony import */ var _SkeletonCards__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./SkeletonCards */ \"./src/components/SkeletonCards.js\");\n/* harmony import */ var _MovieDetail__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./MovieDetail */ \"./src/components/MovieDetail.js\");\n\n\n\n\n\n\n\n\n\n//# sourceURL=webpack://javascript-movie-review/./src/components/index.js?");

/***/ }),

/***/ "./src/constants/index.js":
/*!********************************!*\
  !*** ./src/constants/index.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"CUSTOM_EVENT\": () => (/* binding */ CUSTOM_EVENT),\n/* harmony export */   \"LOCAL_STORAGE_KEY\": () => (/* binding */ LOCAL_STORAGE_KEY),\n/* harmony export */   \"REVIEW_SCORE_MESSAGE\": () => (/* binding */ REVIEW_SCORE_MESSAGE)\n/* harmony export */ });\nconst LOCAL_STORAGE_KEY = {\n    APP: 'woowa_movie-review-app',\n};\nconst CUSTOM_EVENT = {\n    RENDER_MOVIES: 'renderMovies',\n    UPDATE_MOVIE_LIST_TITLE: 'updateMovieListTitle',\n    UPDATE_REVIEW_SCORE: 'updateReviewScore',\n    SHOW_MOVIE_DETAIL: 'showMovieDetail',\n    RENDER_MORE_MOVIES: 'renderMoreMovies',\n};\nconst REVIEW_SCORE_MESSAGE = {\n    2: '최악이에요',\n    4: '별로예요',\n    6: '보통이에요',\n    8: '재미있어요',\n    10: '명작이에요',\n};\n\n\n\n//# sourceURL=webpack://javascript-movie-review/./src/constants/index.js?");

/***/ }),

/***/ "./src/domain/Movie.ts":
/*!*****************************!*\
  !*** ./src/domain/Movie.ts ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../http */ \"./src/http.js\");\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\n\nconst BASE_URL = 'https://api.themoviedb.org/3/';\nclass Movie {\n    getMovies(query, page) {\n        return __awaiter(this, void 0, void 0, function* () {\n            try {\n                if (query) {\n                    return yield this.getFoundMovies(query, page);\n                }\n                return yield this.getPopularMovies(page);\n            }\n            catch (e) {\n                return e;\n            }\n        });\n    }\n    getPopularMovies(page) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const movieList = yield (0,_http__WEBPACK_IMPORTED_MODULE_0__.fetchData)(`${BASE_URL}/movie/popular?api_key=${\"c2f4c6739f939415d302ea7425537908\"}&language=ko-KR&page=${page}`);\n            return movieList;\n        });\n    }\n    getFoundMovies(query, page) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const foundedMovies = yield (0,_http__WEBPACK_IMPORTED_MODULE_0__.fetchData)(`${BASE_URL}/search/movie?api_key=${\"c2f4c6739f939415d302ea7425537908\"}&language=ko-KR&query=${query}&page=${page}`);\n            return foundedMovies;\n        });\n    }\n    getMovieById(id) {\n        return __awaiter(this, void 0, void 0, function* () {\n            const detail = yield (0,_http__WEBPACK_IMPORTED_MODULE_0__.fetchData)(`${BASE_URL}/movie/${id}?api_key=${\"c2f4c6739f939415d302ea7425537908\"}&language=ko-KR`);\n            return detail;\n        });\n    }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Movie);\n\n\n//# sourceURL=webpack://javascript-movie-review/./src/domain/Movie.ts?");

/***/ }),

/***/ "./src/http.js":
/*!*********************!*\
  !*** ./src/http.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"fetchData\": () => (/* binding */ fetchData)\n/* harmony export */ });\nvar __awaiter = (undefined && undefined.__awaiter) || function (thisArg, _arguments, P, generator) {\n    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }\n    return new (P || (P = Promise))(function (resolve, reject) {\n        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }\n        function rejected(value) { try { step(generator[\"throw\"](value)); } catch (e) { reject(e); } }\n        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }\n        step((generator = generator.apply(thisArg, _arguments || [])).next());\n    });\n};\nconst fetchData = (url) => __awaiter(void 0, void 0, void 0, function* () {\n    const response = yield fetch(url);\n    const data = yield response.json();\n    if (!response.ok) {\n        throw {\n            isError: true,\n            data,\n        };\n    }\n    return {\n        isError: false,\n        data,\n    };\n});\n\n\n//# sourceURL=webpack://javascript-movie-review/./src/http.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _templates_reset_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../templates/reset.css */ \"./templates/reset.css\");\n/* harmony import */ var _templates_common_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../templates/common.css */ \"./templates/common.css\");\n/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./App */ \"./src/App.js\");\n\n\n\nconst $app = document.querySelector('#app');\nnew _App__WEBPACK_IMPORTED_MODULE_2__[\"default\"]($app);\n\n\n//# sourceURL=webpack://javascript-movie-review/./src/index.js?");

/***/ }),

/***/ "./src/statusCode.js":
/*!***************************!*\
  !*** ./src/statusCode.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"statusCodeToErrorMessage\": () => (/* binding */ statusCodeToErrorMessage)\n/* harmony export */ });\nconst MESSAGE = {\n    SESSION_EXPIRE: '세션이 만료되었습니다.',\n    SERVICE_OFFLINE: '서비스는 일시적으로 오프라인 상태입니다.',\n    SERVER_PROBLEM: '서버에 문제가 발생했습니다.',\n    OVER_REQUEST_TIME: '요청시간이 초과되었습니다.',\n    UNKNOWN: '알 수 없는 오류입니다.',\n};\nconst errorMessage = {\n    9: MESSAGE.SERVICE_OFFLINE,\n    24: MESSAGE.OVER_REQUEST_TIME,\n    17: MESSAGE.SESSION_EXPIRE,\n    37: MESSAGE.SESSION_EXPIRE,\n    43: MESSAGE.SERVER_PROBLEM,\n};\nconst statusCodeToErrorMessage = (status_code) => {\n    return errorMessage[status_code] || MESSAGE.UNKNOWN;\n};\n\n\n//# sourceURL=webpack://javascript-movie-review/./src/statusCode.js?");

/***/ }),

/***/ "./src/utils/localStorage.js":
/*!***********************************!*\
  !*** ./src/utils/localStorage.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__),\n/* harmony export */   \"getLocalStorage\": () => (/* binding */ getLocalStorage),\n/* harmony export */   \"setLocalStorage\": () => (/* binding */ setLocalStorage)\n/* harmony export */ });\nconst setLocalStorage = (key, item) => { };\nconst getLocalStorage = (key) => {\n    const data = localStorage.getItem(key);\n};\nconst store = {\n    setLocalStorage(key, item) {\n        localStorage.setItem(key, JSON.stringify(item));\n    },\n    getLocalStorage(key) {\n        const data = localStorage.getItem(key);\n        if (data) {\n            return JSON.parse(data);\n        }\n    },\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (store);\n\n\n//# sourceURL=webpack://javascript-movie-review/./src/utils/localStorage.js?");

/***/ }),

/***/ "./templates/logo.png":
/*!****************************!*\
  !*** ./templates/logo.png ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"2e162b4fefb34cd7ed8d.png\";\n\n//# sourceURL=webpack://javascript-movie-review/./templates/logo.png?");

/***/ }),

/***/ "./templates/search_button.png":
/*!*************************************!*\
  !*** ./templates/search_button.png ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"f1bd4269f4446ceae306.png\";\n\n//# sourceURL=webpack://javascript-movie-review/./templates/search_button.png?");

/***/ }),

/***/ "./templates/star_empty.png":
/*!**********************************!*\
  !*** ./templates/star_empty.png ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"6c9611deedf4b85849c9.png\";\n\n//# sourceURL=webpack://javascript-movie-review/./templates/star_empty.png?");

/***/ }),

/***/ "./templates/star_filled.png":
/*!***********************************!*\
  !*** ./templates/star_filled.png ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("module.exports = __webpack_require__.p + \"6328741810b732410eec.png\";\n\n//# sourceURL=webpack://javascript-movie-review/./templates/star_filled.png?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"main": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;