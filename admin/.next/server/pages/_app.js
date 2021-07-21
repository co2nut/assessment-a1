module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./pages/_app.js":
/*!***********************!*\
  !*** ./pages/_app.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _styles_antd_less__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/antd.less */ \"./styles/antd.less\");\n/* harmony import */ var _styles_antd_less__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_antd_less__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _store_store__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../store/store */ \"./store/store.js\");\nvar _jsxFileName = \"/Users/soonsionglim/Development/policystreet/admin/pages/_app.js\";\n\nvar __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;\n\nfunction _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }\n\n\n\n\nconst WrappedApp = ({\n  Component,\n  pageProps\n}) => {\n  return __jsx(Component, _extends({}, pageProps, {\n    __self: undefined,\n    __source: {\n      fileName: _jsxFileName,\n      lineNumber: 5,\n      columnNumber: 10\n    }\n  }));\n};\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (_store_store__WEBPACK_IMPORTED_MODULE_2__[\"wrapper\"].withRedux(WrappedApp));//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wYWdlcy9fYXBwLmpzP2Q1MzAiXSwibmFtZXMiOlsiV3JhcHBlZEFwcCIsIkNvbXBvbmVudCIsInBhZ2VQcm9wcyIsIndyYXBwZXIiLCJ3aXRoUmVkdXgiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7O0FBRUEsTUFBTUEsVUFBVSxHQUFHLENBQUM7QUFBRUMsV0FBRjtBQUFhQztBQUFiLENBQUQsS0FBOEI7QUFDL0MsU0FBTyxNQUFDLFNBQUQsZUFBZUEsU0FBZjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBQVA7QUFDRCxDQUZEOztBQUllQyxtSEFBTyxDQUFDQyxTQUFSLENBQWtCSixVQUFsQixDQUFmIiwiZmlsZSI6Ii4vcGFnZXMvX2FwcC5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBcIi4uL3N0eWxlcy9hbnRkLmxlc3NcIjtcbmltcG9ydCB7IHdyYXBwZXIgfSBmcm9tICcuLi9zdG9yZS9zdG9yZSdcblxuY29uc3QgV3JhcHBlZEFwcCA9ICh7IENvbXBvbmVudCwgcGFnZVByb3BzIH0pID0+IHtcbiAgcmV0dXJuIDxDb21wb25lbnQgey4uLnBhZ2VQcm9wc30gLz5cbn1cblxuZXhwb3J0IGRlZmF1bHQgd3JhcHBlci53aXRoUmVkdXgoV3JhcHBlZEFwcClcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./pages/_app.js\n");

/***/ }),

/***/ "./store/count/action.js":
/*!*******************************!*\
  !*** ./store/count/action.js ***!
  \*******************************/
/*! exports provided: countActionTypes, addCount */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"countActionTypes\", function() { return countActionTypes; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"addCount\", function() { return addCount; });\nconst countActionTypes = {\n  ADD: 'ADD'\n};\nconst addCount = () => dispatch => {\n  return dispatch({\n    type: countActionTypes.ADD\n  });\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zdG9yZS9jb3VudC9hY3Rpb24uanM/NTYzNCJdLCJuYW1lcyI6WyJjb3VudEFjdGlvblR5cGVzIiwiQUREIiwiYWRkQ291bnQiLCJkaXNwYXRjaCIsInR5cGUiXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFPLE1BQU1BLGdCQUFnQixHQUFHO0FBQzlCQyxLQUFHLEVBQUU7QUFEeUIsQ0FBekI7QUFJQSxNQUFNQyxRQUFRLEdBQUcsTUFBT0MsUUFBRCxJQUFjO0FBQzFDLFNBQU9BLFFBQVEsQ0FBQztBQUFFQyxRQUFJLEVBQUVKLGdCQUFnQixDQUFDQztBQUF6QixHQUFELENBQWY7QUFDRCxDQUZNIiwiZmlsZSI6Ii4vc3RvcmUvY291bnQvYWN0aW9uLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNvbnN0IGNvdW50QWN0aW9uVHlwZXMgPSB7XG4gIEFERDogJ0FERCcsXG59XG5cbmV4cG9ydCBjb25zdCBhZGRDb3VudCA9ICgpID0+IChkaXNwYXRjaCkgPT4ge1xuICByZXR1cm4gZGlzcGF0Y2goeyB0eXBlOiBjb3VudEFjdGlvblR5cGVzLkFERCB9KVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./store/count/action.js\n");

/***/ }),

/***/ "./store/count/reducer.js":
/*!********************************!*\
  !*** ./store/count/reducer.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return reducer; });\n/* harmony import */ var _action__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./action */ \"./store/count/action.js\");\n\nconst countInitialState = {\n  count: 0\n};\nfunction reducer(state = countInitialState, action) {\n  switch (action.type) {\n    case _action__WEBPACK_IMPORTED_MODULE_0__[\"countActionTypes\"].ADD:\n      return Object.assign({}, state, {\n        count: state.count + 1\n      });\n\n    default:\n      return state;\n  }\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zdG9yZS9jb3VudC9yZWR1Y2VyLmpzPzNlZjkiXSwibmFtZXMiOlsiY291bnRJbml0aWFsU3RhdGUiLCJjb3VudCIsInJlZHVjZXIiLCJzdGF0ZSIsImFjdGlvbiIsInR5cGUiLCJjb3VudEFjdGlvblR5cGVzIiwiQUREIiwiT2JqZWN0IiwiYXNzaWduIl0sIm1hcHBpbmdzIjoiQUFBQTtBQUFBO0FBQUE7QUFBQTtBQUVBLE1BQU1BLGlCQUFpQixHQUFHO0FBQ3hCQyxPQUFLLEVBQUU7QUFEaUIsQ0FBMUI7QUFJZSxTQUFTQyxPQUFULENBQWlCQyxLQUFLLEdBQUdILGlCQUF6QixFQUE0Q0ksTUFBNUMsRUFBb0Q7QUFDakUsVUFBUUEsTUFBTSxDQUFDQyxJQUFmO0FBQ0UsU0FBS0Msd0RBQWdCLENBQUNDLEdBQXRCO0FBQ0UsYUFBT0MsTUFBTSxDQUFDQyxNQUFQLENBQWMsRUFBZCxFQUFrQk4sS0FBbEIsRUFBeUI7QUFDOUJGLGFBQUssRUFBRUUsS0FBSyxDQUFDRixLQUFOLEdBQWM7QUFEUyxPQUF6QixDQUFQOztBQUdGO0FBQ0UsYUFBT0UsS0FBUDtBQU5KO0FBUUQiLCJmaWxlIjoiLi9zdG9yZS9jb3VudC9yZWR1Y2VyLmpzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY291bnRBY3Rpb25UeXBlcyB9IGZyb20gJy4vYWN0aW9uJ1xuXG5jb25zdCBjb3VudEluaXRpYWxTdGF0ZSA9IHtcbiAgY291bnQ6IDAsXG59XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIHJlZHVjZXIoc3RhdGUgPSBjb3VudEluaXRpYWxTdGF0ZSwgYWN0aW9uKSB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlIGNvdW50QWN0aW9uVHlwZXMuQUREOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIGNvdW50OiBzdGF0ZS5jb3VudCArIDEsXG4gICAgICB9KVxuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4gc3RhdGVcbiAgfVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./store/count/reducer.js\n");

/***/ }),

/***/ "./store/store.js":
/*!************************!*\
  !*** ./store/store.js ***!
  \************************/
/*! exports provided: wrapper */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"wrapper\", function() { return wrapper; });\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! redux */ \"redux\");\n/* harmony import */ var redux__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(redux__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_redux_wrapper__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-redux-wrapper */ \"next-redux-wrapper\");\n/* harmony import */ var next_redux_wrapper__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_redux_wrapper__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var redux_thunk__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! redux-thunk */ \"redux-thunk\");\n/* harmony import */ var redux_thunk__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(redux_thunk__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _count_reducer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./count/reducer */ \"./store/count/reducer.js\");\n/* harmony import */ var _tick_reducer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./tick/reducer */ \"./store/tick/reducer.js\");\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\n\n\n\n\n\n\nconst bindMiddleware = middleware => {\n  if (true) {\n    const {\n      composeWithDevTools\n    } = __webpack_require__(/*! redux-devtools-extension */ \"redux-devtools-extension\");\n\n    return composeWithDevTools(Object(redux__WEBPACK_IMPORTED_MODULE_0__[\"applyMiddleware\"])(...middleware));\n  }\n\n  return Object(redux__WEBPACK_IMPORTED_MODULE_0__[\"applyMiddleware\"])(...middleware);\n};\n\nconst combinedReducer = Object(redux__WEBPACK_IMPORTED_MODULE_0__[\"combineReducers\"])({\n  count: _count_reducer__WEBPACK_IMPORTED_MODULE_3__[\"default\"],\n  tick: _tick_reducer__WEBPACK_IMPORTED_MODULE_4__[\"default\"]\n});\n\nconst reducer = (state, action) => {\n  if (action.type === next_redux_wrapper__WEBPACK_IMPORTED_MODULE_1__[\"HYDRATE\"]) {\n    const nextState = _objectSpread(_objectSpread({}, state), action.payload);\n\n    if (state.count.count) nextState.count.count = state.count.count; // preserve count value on client side navigation\n\n    return nextState;\n  } else {\n    return combinedReducer(state, action);\n  }\n};\n\nconst initStore = () => {\n  return Object(redux__WEBPACK_IMPORTED_MODULE_0__[\"createStore\"])(reducer, bindMiddleware([redux_thunk__WEBPACK_IMPORTED_MODULE_2___default.a]));\n};\n\nconst wrapper = Object(next_redux_wrapper__WEBPACK_IMPORTED_MODULE_1__[\"createWrapper\"])(initStore);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zdG9yZS9zdG9yZS5qcz80MmEyIl0sIm5hbWVzIjpbImJpbmRNaWRkbGV3YXJlIiwibWlkZGxld2FyZSIsImNvbXBvc2VXaXRoRGV2VG9vbHMiLCJyZXF1aXJlIiwiYXBwbHlNaWRkbGV3YXJlIiwiY29tYmluZWRSZWR1Y2VyIiwiY29tYmluZVJlZHVjZXJzIiwiY291bnQiLCJ0aWNrIiwicmVkdWNlciIsInN0YXRlIiwiYWN0aW9uIiwidHlwZSIsIkhZRFJBVEUiLCJuZXh0U3RhdGUiLCJwYXlsb2FkIiwiaW5pdFN0b3JlIiwiY3JlYXRlU3RvcmUiLCJ0aHVua01pZGRsZXdhcmUiLCJ3cmFwcGVyIiwiY3JlYXRlV3JhcHBlciJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsTUFBTUEsY0FBYyxHQUFJQyxVQUFELElBQWdCO0FBQ3JDLFlBQTJDO0FBQ3pDLFVBQU07QUFBRUM7QUFBRixRQUEwQkMsbUJBQU8sQ0FBQywwREFBRCxDQUF2Qzs7QUFDQSxXQUFPRCxtQkFBbUIsQ0FBQ0UsNkRBQWUsQ0FBQyxHQUFHSCxVQUFKLENBQWhCLENBQTFCO0FBQ0Q7O0FBQ0QsU0FBT0csNkRBQWUsQ0FBQyxHQUFHSCxVQUFKLENBQXRCO0FBQ0QsQ0FORDs7QUFRQSxNQUFNSSxlQUFlLEdBQUdDLDZEQUFlLENBQUM7QUFDdENDLCtEQURzQztBQUV0Q0MsNkRBQUlBO0FBRmtDLENBQUQsQ0FBdkM7O0FBS0EsTUFBTUMsT0FBTyxHQUFHLENBQUNDLEtBQUQsRUFBUUMsTUFBUixLQUFtQjtBQUNqQyxNQUFJQSxNQUFNLENBQUNDLElBQVAsS0FBZ0JDLDBEQUFwQixFQUE2QjtBQUMzQixVQUFNQyxTQUFTLG1DQUNWSixLQURVLEdBRVZDLE1BQU0sQ0FBQ0ksT0FGRyxDQUFmOztBQUlBLFFBQUlMLEtBQUssQ0FBQ0gsS0FBTixDQUFZQSxLQUFoQixFQUF1Qk8sU0FBUyxDQUFDUCxLQUFWLENBQWdCQSxLQUFoQixHQUF3QkcsS0FBSyxDQUFDSCxLQUFOLENBQVlBLEtBQXBDLENBTEksQ0FLc0M7O0FBQ2pFLFdBQU9PLFNBQVA7QUFDRCxHQVBELE1BT087QUFDTCxXQUFPVCxlQUFlLENBQUNLLEtBQUQsRUFBUUMsTUFBUixDQUF0QjtBQUNEO0FBQ0YsQ0FYRDs7QUFhQSxNQUFNSyxTQUFTLEdBQUcsTUFBTTtBQUN0QixTQUFPQyx5REFBVyxDQUFDUixPQUFELEVBQVVULGNBQWMsQ0FBQyxDQUFDa0Isa0RBQUQsQ0FBRCxDQUF4QixDQUFsQjtBQUNELENBRkQ7O0FBSU8sTUFBTUMsT0FBTyxHQUFHQyx3RUFBYSxDQUFDSixTQUFELENBQTdCIiwiZmlsZSI6Ii4vc3RvcmUvc3RvcmUuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjcmVhdGVTdG9yZSwgYXBwbHlNaWRkbGV3YXJlLCBjb21iaW5lUmVkdWNlcnMgfSBmcm9tICdyZWR1eCdcbmltcG9ydCB7IEhZRFJBVEUsIGNyZWF0ZVdyYXBwZXIgfSBmcm9tICduZXh0LXJlZHV4LXdyYXBwZXInXG5pbXBvcnQgdGh1bmtNaWRkbGV3YXJlIGZyb20gJ3JlZHV4LXRodW5rJ1xuaW1wb3J0IGNvdW50IGZyb20gJy4vY291bnQvcmVkdWNlcidcbmltcG9ydCB0aWNrIGZyb20gJy4vdGljay9yZWR1Y2VyJ1xuXG5jb25zdCBiaW5kTWlkZGxld2FyZSA9IChtaWRkbGV3YXJlKSA9PiB7XG4gIGlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gJ3Byb2R1Y3Rpb24nKSB7XG4gICAgY29uc3QgeyBjb21wb3NlV2l0aERldlRvb2xzIH0gPSByZXF1aXJlKCdyZWR1eC1kZXZ0b29scy1leHRlbnNpb24nKVxuICAgIHJldHVybiBjb21wb3NlV2l0aERldlRvb2xzKGFwcGx5TWlkZGxld2FyZSguLi5taWRkbGV3YXJlKSlcbiAgfVxuICByZXR1cm4gYXBwbHlNaWRkbGV3YXJlKC4uLm1pZGRsZXdhcmUpXG59XG5cbmNvbnN0IGNvbWJpbmVkUmVkdWNlciA9IGNvbWJpbmVSZWR1Y2Vycyh7XG4gIGNvdW50LFxuICB0aWNrLFxufSlcblxuY29uc3QgcmVkdWNlciA9IChzdGF0ZSwgYWN0aW9uKSA9PiB7XG4gIGlmIChhY3Rpb24udHlwZSA9PT0gSFlEUkFURSkge1xuICAgIGNvbnN0IG5leHRTdGF0ZSA9IHtcbiAgICAgIC4uLnN0YXRlLCAvLyB1c2UgcHJldmlvdXMgc3RhdGVcbiAgICAgIC4uLmFjdGlvbi5wYXlsb2FkLCAvLyBhcHBseSBkZWx0YSBmcm9tIGh5ZHJhdGlvblxuICAgIH1cbiAgICBpZiAoc3RhdGUuY291bnQuY291bnQpIG5leHRTdGF0ZS5jb3VudC5jb3VudCA9IHN0YXRlLmNvdW50LmNvdW50IC8vIHByZXNlcnZlIGNvdW50IHZhbHVlIG9uIGNsaWVudCBzaWRlIG5hdmlnYXRpb25cbiAgICByZXR1cm4gbmV4dFN0YXRlXG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGNvbWJpbmVkUmVkdWNlcihzdGF0ZSwgYWN0aW9uKVxuICB9XG59XG5cbmNvbnN0IGluaXRTdG9yZSA9ICgpID0+IHtcbiAgcmV0dXJuIGNyZWF0ZVN0b3JlKHJlZHVjZXIsIGJpbmRNaWRkbGV3YXJlKFt0aHVua01pZGRsZXdhcmVdKSlcbn1cblxuZXhwb3J0IGNvbnN0IHdyYXBwZXIgPSBjcmVhdGVXcmFwcGVyKGluaXRTdG9yZSlcbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./store/store.js\n");

/***/ }),

/***/ "./store/tick/action.js":
/*!******************************!*\
  !*** ./store/tick/action.js ***!
  \******************************/
/*! exports provided: tickActionTypes, serverRenderClock, startClock */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"tickActionTypes\", function() { return tickActionTypes; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"serverRenderClock\", function() { return serverRenderClock; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"startClock\", function() { return startClock; });\nconst tickActionTypes = {\n  TICK: 'TICK'\n};\nconst serverRenderClock = isServer => dispatch => {\n  return dispatch({\n    type: tickActionTypes.TICK,\n    light: !isServer,\n    ts: Date.now()\n  });\n};\nconst startClock = () => dispatch => {\n  return setInterval(() => dispatch({\n    type: tickActionTypes.TICK,\n    light: true,\n    ts: Date.now()\n  }), 1000);\n};//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zdG9yZS90aWNrL2FjdGlvbi5qcz8wYzZiIl0sIm5hbWVzIjpbInRpY2tBY3Rpb25UeXBlcyIsIlRJQ0siLCJzZXJ2ZXJSZW5kZXJDbG9jayIsImlzU2VydmVyIiwiZGlzcGF0Y2giLCJ0eXBlIiwibGlnaHQiLCJ0cyIsIkRhdGUiLCJub3ciLCJzdGFydENsb2NrIiwic2V0SW50ZXJ2YWwiXSwibWFwcGluZ3MiOiJBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQU8sTUFBTUEsZUFBZSxHQUFHO0FBQzdCQyxNQUFJLEVBQUU7QUFEdUIsQ0FBeEI7QUFJQSxNQUFNQyxpQkFBaUIsR0FBSUMsUUFBRCxJQUFlQyxRQUFELElBQWM7QUFDM0QsU0FBT0EsUUFBUSxDQUFDO0FBQ2RDLFFBQUksRUFBRUwsZUFBZSxDQUFDQyxJQURSO0FBRWRLLFNBQUssRUFBRSxDQUFDSCxRQUZNO0FBR2RJLE1BQUUsRUFBRUMsSUFBSSxDQUFDQyxHQUFMO0FBSFUsR0FBRCxDQUFmO0FBS0QsQ0FOTTtBQVFBLE1BQU1DLFVBQVUsR0FBRyxNQUFPTixRQUFELElBQWM7QUFDNUMsU0FBT08sV0FBVyxDQUNoQixNQUFNUCxRQUFRLENBQUM7QUFBRUMsUUFBSSxFQUFFTCxlQUFlLENBQUNDLElBQXhCO0FBQThCSyxTQUFLLEVBQUUsSUFBckM7QUFBMkNDLE1BQUUsRUFBRUMsSUFBSSxDQUFDQyxHQUFMO0FBQS9DLEdBQUQsQ0FERSxFQUVoQixJQUZnQixDQUFsQjtBQUlELENBTE0iLCJmaWxlIjoiLi9zdG9yZS90aWNrL2FjdGlvbi5qcy5qcyIsInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBjb25zdCB0aWNrQWN0aW9uVHlwZXMgPSB7XG4gIFRJQ0s6ICdUSUNLJyxcbn1cblxuZXhwb3J0IGNvbnN0IHNlcnZlclJlbmRlckNsb2NrID0gKGlzU2VydmVyKSA9PiAoZGlzcGF0Y2gpID0+IHtcbiAgcmV0dXJuIGRpc3BhdGNoKHtcbiAgICB0eXBlOiB0aWNrQWN0aW9uVHlwZXMuVElDSyxcbiAgICBsaWdodDogIWlzU2VydmVyLFxuICAgIHRzOiBEYXRlLm5vdygpLFxuICB9KVxufVxuXG5leHBvcnQgY29uc3Qgc3RhcnRDbG9jayA9ICgpID0+IChkaXNwYXRjaCkgPT4ge1xuICByZXR1cm4gc2V0SW50ZXJ2YWwoXG4gICAgKCkgPT4gZGlzcGF0Y2goeyB0eXBlOiB0aWNrQWN0aW9uVHlwZXMuVElDSywgbGlnaHQ6IHRydWUsIHRzOiBEYXRlLm5vdygpIH0pLFxuICAgIDEwMDBcbiAgKVxufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./store/tick/action.js\n");

/***/ }),

/***/ "./store/tick/reducer.js":
/*!*******************************!*\
  !*** ./store/tick/reducer.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return reducer; });\n/* harmony import */ var _action__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./action */ \"./store/tick/action.js\");\n\nconst tickInitialState = {\n  lastUpdate: 0,\n  light: false\n};\nfunction reducer(state = tickInitialState, action) {\n  switch (action.type) {\n    case _action__WEBPACK_IMPORTED_MODULE_0__[\"tickActionTypes\"].TICK:\n      return Object.assign({}, state, {\n        lastUpdate: action.ts,\n        light: !!action.light\n      });\n\n    default:\n      return state;\n  }\n}//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zdG9yZS90aWNrL3JlZHVjZXIuanM/YzcyZCJdLCJuYW1lcyI6WyJ0aWNrSW5pdGlhbFN0YXRlIiwibGFzdFVwZGF0ZSIsImxpZ2h0IiwicmVkdWNlciIsInN0YXRlIiwiYWN0aW9uIiwidHlwZSIsInRpY2tBY3Rpb25UeXBlcyIsIlRJQ0siLCJPYmplY3QiLCJhc3NpZ24iLCJ0cyJdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFFQSxNQUFNQSxnQkFBZ0IsR0FBRztBQUN2QkMsWUFBVSxFQUFFLENBRFc7QUFFdkJDLE9BQUssRUFBRTtBQUZnQixDQUF6QjtBQUtlLFNBQVNDLE9BQVQsQ0FBaUJDLEtBQUssR0FBR0osZ0JBQXpCLEVBQTJDSyxNQUEzQyxFQUFtRDtBQUNoRSxVQUFRQSxNQUFNLENBQUNDLElBQWY7QUFDRSxTQUFLQyx1REFBZSxDQUFDQyxJQUFyQjtBQUNFLGFBQU9DLE1BQU0sQ0FBQ0MsTUFBUCxDQUFjLEVBQWQsRUFBa0JOLEtBQWxCLEVBQXlCO0FBQzlCSCxrQkFBVSxFQUFFSSxNQUFNLENBQUNNLEVBRFc7QUFFOUJULGFBQUssRUFBRSxDQUFDLENBQUNHLE1BQU0sQ0FBQ0g7QUFGYyxPQUF6QixDQUFQOztBQUlGO0FBQ0UsYUFBT0UsS0FBUDtBQVBKO0FBU0QiLCJmaWxlIjoiLi9zdG9yZS90aWNrL3JlZHVjZXIuanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB0aWNrQWN0aW9uVHlwZXMgfSBmcm9tICcuL2FjdGlvbidcblxuY29uc3QgdGlja0luaXRpYWxTdGF0ZSA9IHtcbiAgbGFzdFVwZGF0ZTogMCxcbiAgbGlnaHQ6IGZhbHNlLFxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiByZWR1Y2VyKHN0YXRlID0gdGlja0luaXRpYWxTdGF0ZSwgYWN0aW9uKSB7XG4gIHN3aXRjaCAoYWN0aW9uLnR5cGUpIHtcbiAgICBjYXNlIHRpY2tBY3Rpb25UeXBlcy5USUNLOlxuICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHN0YXRlLCB7XG4gICAgICAgIGxhc3RVcGRhdGU6IGFjdGlvbi50cyxcbiAgICAgICAgbGlnaHQ6ICEhYWN0aW9uLmxpZ2h0LFxuICAgICAgfSlcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHN0YXRlXG4gIH1cbn1cbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./store/tick/reducer.js\n");

/***/ }),

/***/ "./styles/antd.less":
/*!**************************!*\
  !*** ./styles/antd.less ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiIuL3N0eWxlcy9hbnRkLmxlc3MuanMiLCJzb3VyY2VzQ29udGVudCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./styles/antd.less\n");

/***/ }),

/***/ 0:
/*!****************************************!*\
  !*** multi private-next-pages/_app.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! private-next-pages/_app.js */"./pages/_app.js");


/***/ }),

/***/ "next-redux-wrapper":
/*!*************************************!*\
  !*** external "next-redux-wrapper" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"next-redux-wrapper\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJuZXh0LXJlZHV4LXdyYXBwZXJcIj8wMWMyIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6Im5leHQtcmVkdXgtd3JhcHBlci5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIm5leHQtcmVkdXgtd3JhcHBlclwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///next-redux-wrapper\n");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWFjdFwiPzU4OGUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoicmVhY3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWFjdFwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///react\n");

/***/ }),

/***/ "redux":
/*!************************!*\
  !*** external "redux" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"redux\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWR1eFwiP2QzMjUiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoicmVkdXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWR1eFwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///redux\n");

/***/ }),

/***/ "redux-devtools-extension":
/*!*******************************************!*\
  !*** external "redux-devtools-extension" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"redux-devtools-extension\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWR1eC1kZXZ0b29scy1leHRlbnNpb25cIj81YWE5Il0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBIiwiZmlsZSI6InJlZHV4LWRldnRvb2xzLWV4dGVuc2lvbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInJlZHV4LWRldnRvb2xzLWV4dGVuc2lvblwiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///redux-devtools-extension\n");

/***/ }),

/***/ "redux-thunk":
/*!******************************!*\
  !*** external "redux-thunk" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"redux-thunk\");//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJyZWR1eC10aHVua1wiPzg4MDgiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEiLCJmaWxlIjoicmVkdXgtdGh1bmsuanMiLCJzb3VyY2VzQ29udGVudCI6WyJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJyZWR1eC10aHVua1wiKTsiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///redux-thunk\n");

/***/ })

/******/ });