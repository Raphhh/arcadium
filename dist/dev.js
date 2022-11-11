/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(self, function() {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/ts/Arcadium.ts":
/*!****************************!*\
  !*** ./src/ts/Arcadium.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"arca\": () => (/* binding */ arca),\n/* harmony export */   \"Arcadium\": () => (/* binding */ Arcadium)\n/* harmony export */ });\n/* harmony import */ var _Display_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Display/index */ \"./src/ts/Display/index.ts\");\n/* harmony import */ var _Geom_Rectangle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Geom/Rectangle */ \"./src/ts/Geom/Rectangle.ts\");\n/* harmony import */ var _Rendering_HtmlCanvas__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Rendering/HtmlCanvas */ \"./src/ts/Rendering/HtmlCanvas.ts\");\n/* harmony import */ var _Global_Services__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Global/Services */ \"./src/ts/Global/Services.ts\");\n\r\n\r\n\r\n\r\nfunction arca(canvas, contextDimension = '2d') {\r\n    return new Arcadium(canvas, contextDimension);\r\n}\r\nclass Arcadium {\r\n    constructor(canvas, contextDimension = '2d', services) {\r\n        this.isDebugMode = false;\r\n        this.services = services || new _Global_Services__WEBPACK_IMPORTED_MODULE_3__.Services(new _Rendering_HtmlCanvas__WEBPACK_IMPORTED_MODULE_2__.HtmlCanvas(canvas, contextDimension), window);\r\n        this.stage = new _Display_index__WEBPACK_IMPORTED_MODULE_0__.Sprite(null, new _Geom_Rectangle__WEBPACK_IMPORTED_MODULE_1__.Rectangle({\r\n            x: 0,\r\n            y: 0,\r\n            width: canvas.width,\r\n            height: canvas.height\r\n        }));\r\n        this.rendering = this.services.renderingFactory.create(this.services.htmlCanvas);\r\n    }\r\n    display() {\r\n        this.clear();\r\n        this.rendering.renderSprite(this.services.htmlCanvas.context, this.stage, this.isDebugMode);\r\n    }\r\n    clear() {\r\n        this.rendering.clear(this.services.htmlCanvas.context, this.stage);\r\n    }\r\n    setup(callback) {\r\n        callback(this);\r\n        this.display();\r\n        return this;\r\n    }\r\n    loop(callback) {\r\n        this.services.motion.onFrame(() => {\r\n            this.setup(callback);\r\n        });\r\n        this.services.motion.start();\r\n        return this.services.motion;\r\n    }\r\n    on(eventName, callback) {\r\n        this.services.eventListener.on(eventName, callback);\r\n    }\r\n    get ui() {\r\n        return {\r\n            mouse: this.services.mouse\r\n        };\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://arcadium/./src/ts/Arcadium.ts?");

/***/ }),

/***/ "./src/ts/Core/Motion.ts":
/*!*******************************!*\
  !*** ./src/ts/Core/Motion.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Motion\": () => (/* binding */ Motion)\n/* harmony export */ });\n/* harmony import */ var _MotionState__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MotionState */ \"./src/ts/Core/MotionState.ts\");\n/* harmony import */ var _MotionEvents__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MotionEvents */ \"./src/ts/Core/MotionEvents.ts\");\n\r\n\r\nclass Motion {\r\n    constructor(animationFrameProvider, eventListener) {\r\n        this.animationId = 0;\r\n        this.animationFrameProvider = animationFrameProvider;\r\n        this.eventListener = eventListener;\r\n        this.state = _MotionState__WEBPACK_IMPORTED_MODULE_0__.MotionState.Stop;\r\n    }\r\n    isRunning() {\r\n        return this.state === _MotionState__WEBPACK_IMPORTED_MODULE_0__.MotionState.Start;\r\n    }\r\n    onFrame(callback) {\r\n        this.eventListener.on(_MotionEvents__WEBPACK_IMPORTED_MODULE_1__.MotionEvents.FRAME, callback);\r\n    }\r\n    start() {\r\n        this.state = _MotionState__WEBPACK_IMPORTED_MODULE_0__.MotionState.Start;\r\n        this.frame = 0;\r\n        this.play();\r\n    }\r\n    pause() {\r\n        this.state = _MotionState__WEBPACK_IMPORTED_MODULE_0__.MotionState.Pause;\r\n    }\r\n    stop() {\r\n        this.state = _MotionState__WEBPACK_IMPORTED_MODULE_0__.MotionState.Stop;\r\n        this.animationFrameProvider.cancelAnimationFrame(this.animationId);\r\n    }\r\n    play() {\r\n        if (this.isRunning()) {\r\n            ++this.frame;\r\n            this.eventListener.fire(_MotionEvents__WEBPACK_IMPORTED_MODULE_1__.MotionEvents.FRAME, this.frame);\r\n        }\r\n        this.animationId = this.animationFrameProvider.requestAnimationFrame(() => {\r\n            this.play();\r\n            //todo https://developer.mozilla.org/fr/docs/Games/Anatomy#construire_une_boucle_principale_encore_plus_optimis%C3%A9e_en_javascript\r\n        });\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://arcadium/./src/ts/Core/Motion.ts?");

/***/ }),

/***/ "./src/ts/Core/MotionEvents.ts":
/*!*************************************!*\
  !*** ./src/ts/Core/MotionEvents.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"MotionEvents\": () => (/* binding */ MotionEvents)\n/* harmony export */ });\nvar MotionEvents;\r\n(function (MotionEvents) {\r\n    MotionEvents[\"FRAME\"] = \"frame\";\r\n})(MotionEvents || (MotionEvents = {}));\r\n\n\n//# sourceURL=webpack://arcadium/./src/ts/Core/MotionEvents.ts?");

/***/ }),

/***/ "./src/ts/Core/MotionState.ts":
/*!************************************!*\
  !*** ./src/ts/Core/MotionState.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"MotionState\": () => (/* binding */ MotionState)\n/* harmony export */ });\nvar MotionState;\r\n(function (MotionState) {\r\n    MotionState[MotionState[\"Start\"] = 0] = \"Start\";\r\n    MotionState[MotionState[\"Pause\"] = 1] = \"Pause\";\r\n    MotionState[MotionState[\"Stop\"] = 2] = \"Stop\";\r\n})(MotionState || (MotionState = {}));\r\n\n\n//# sourceURL=webpack://arcadium/./src/ts/Core/MotionState.ts?");

/***/ }),

/***/ "./src/ts/Core/index.ts":
/*!******************************!*\
  !*** ./src/ts/Core/index.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Motion\": () => (/* reexport safe */ _Motion__WEBPACK_IMPORTED_MODULE_0__.Motion),\n/* harmony export */   \"MotionEvents\": () => (/* reexport safe */ _MotionEvents__WEBPACK_IMPORTED_MODULE_1__.MotionEvents),\n/* harmony export */   \"MotionState\": () => (/* reexport safe */ _MotionState__WEBPACK_IMPORTED_MODULE_2__.MotionState)\n/* harmony export */ });\n/* harmony import */ var _Motion__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Motion */ \"./src/ts/Core/Motion.ts\");\n/* harmony import */ var _MotionEvents__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MotionEvents */ \"./src/ts/Core/MotionEvents.ts\");\n/* harmony import */ var _MotionState__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MotionState */ \"./src/ts/Core/MotionState.ts\");\n\r\n\r\n\r\n\n\n//# sourceURL=webpack://arcadium/./src/ts/Core/index.ts?");

/***/ }),

/***/ "./src/ts/Display/Image.ts":
/*!*********************************!*\
  !*** ./src/ts/Display/Image.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Image\": () => (/* binding */ Image)\n/* harmony export */ });\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ \"./src/ts/Display/index.ts\");\n/* harmony import */ var _Rendering_Canvas2DRendering_SpriteImageRendering__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Rendering/Canvas2DRendering/SpriteImageRendering */ \"./src/ts/Rendering/Canvas2DRendering/SpriteImageRendering.ts\");\n\r\n\r\nclass Image extends _index__WEBPACK_IMPORTED_MODULE_0__.Sprite {\r\n    constructor(source, parent, rectangle, rendering) {\r\n        super(parent, rectangle, rendering || new _Rendering_Canvas2DRendering_SpriteImageRendering__WEBPACK_IMPORTED_MODULE_1__.SpriteImageRendering());\r\n        this.source = source;\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://arcadium/./src/ts/Display/Image.ts?");

/***/ }),

/***/ "./src/ts/Display/Shadow.ts":
/*!**********************************!*\
  !*** ./src/ts/Display/Shadow.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Shadow\": () => (/* binding */ Shadow)\n/* harmony export */ });\nclass Shadow {\r\n    constructor() {\r\n        this.blur = 0;\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://arcadium/./src/ts/Display/Shadow.ts?");

/***/ }),

/***/ "./src/ts/Display/Shape.ts":
/*!*********************************!*\
  !*** ./src/ts/Display/Shape.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Shape\": () => (/* binding */ Shape)\n/* harmony export */ });\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ \"./src/ts/Display/index.ts\");\n\r\nclass Shape extends _index__WEBPACK_IMPORTED_MODULE_0__.Sprite {\r\n    constructor() {\r\n        super(...arguments);\r\n        this.lineCap = 'butt';\r\n        this.lineDashOffset = 0.0;\r\n        this.lineJoin = 'miter';\r\n        this.lineWidth = 1;\r\n        this.miterLimit = 10.0;\r\n        this.lineDash = [];\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://arcadium/./src/ts/Display/Shape.ts?");

/***/ }),

/***/ "./src/ts/Display/Sprite.ts":
/*!**********************************!*\
  !*** ./src/ts/Display/Sprite.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Sprite\": () => (/* binding */ Sprite)\n/* harmony export */ });\n/* harmony import */ var _Geom_Rectangle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Geom/Rectangle */ \"./src/ts/Geom/Rectangle.ts\");\n/* harmony import */ var _Geom_Angle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Geom/Angle */ \"./src/ts/Geom/Angle.ts\");\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index */ \"./src/ts/Display/index.ts\");\n/* harmony import */ var _Rendering_Canvas2DRendering_SpriteRenderingFunctionAdapter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Rendering/Canvas2DRendering/SpriteRenderingFunctionAdapter */ \"./src/ts/Rendering/Canvas2DRendering/SpriteRenderingFunctionAdapter.ts\");\n\r\n\r\n\r\n\r\n\r\n\r\nvar relativeX;\r\n(function (relativeX) {\r\n    relativeX[\"left\"] = \"left\";\r\n    relativeX[\"right\"] = \"right\";\r\n    relativeX[\"center\"] = \"center\";\r\n})(relativeX || (relativeX = {}));\r\nvar relativeY;\r\n(function (relativeY) {\r\n    relativeY[\"top\"] = \"top\";\r\n    relativeY[\"bottom\"] = \"bottom\";\r\n    relativeY[\"center\"] = \"center\";\r\n})(relativeY || (relativeY = {}));\r\nclass Sprite {\r\n    constructor(parent, rectangle, rendering) {\r\n        this.children = [];\r\n        this._rendering = null;\r\n        this.isVisible = true;\r\n        this.alpha = 1;\r\n        this.rotation = new _Geom_Angle__WEBPACK_IMPORTED_MODULE_1__.Angle(0);\r\n        this._scale = null;\r\n        this._translation = null;\r\n        this._transformation = null;\r\n        this.shadow = null;\r\n        this.blendMode = ''; //see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation\r\n        this.rendering = rendering;\r\n        this.parent = parent;\r\n        if (this.parent) {\r\n            this.parent.children.push(this);\r\n        }\r\n        if (!rectangle) {\r\n            if (this.parent && this.parent.rectangle) {\r\n                this.rectangle = this.parent.rectangle;\r\n            }\r\n            else {\r\n                throw new Error('no base rectangle defined');\r\n            }\r\n        }\r\n        else if (!(rectangle instanceof _Geom_Rectangle__WEBPACK_IMPORTED_MODULE_0__.Rectangle)) {\r\n            this.rectangle = new _Geom_Rectangle__WEBPACK_IMPORTED_MODULE_0__.Rectangle({ x: 0, y: 0, width: 0, height: 0 });\r\n            if (!this.parent) {\r\n                throw new Error('relative rectangle of sprite needs a parent');\r\n            }\r\n            if (!rectangle.width) {\r\n                this.rectangle.width = this.parent.rectangle.width;\r\n            }\r\n            else if (typeof rectangle.width === 'string') {\r\n                //todo\r\n                throw new Error('sorry, not implemented');\r\n            }\r\n            else {\r\n                this.rectangle.width = rectangle.width;\r\n            }\r\n            if (!rectangle.height) {\r\n                this.rectangle.height = this.parent.rectangle.height;\r\n            }\r\n            else if (typeof rectangle.height === 'string') {\r\n                //todo\r\n                throw new Error('sorry, not implemented');\r\n            }\r\n            else {\r\n                this.rectangle.height = rectangle.height;\r\n            }\r\n            if (!rectangle.x) {\r\n                this.rectangle.x = 0;\r\n            }\r\n            else if (typeof rectangle.x === 'string') {\r\n                switch (rectangle.x) {\r\n                    case relativeX.left:\r\n                        this.rectangle.x = 0;\r\n                        break;\r\n                    case relativeX.center:\r\n                        this.rectangle.x = this.parent.rectangle.center.x - (rectangle.width / 2);\r\n                        break;\r\n                    case relativeX.right:\r\n                        this.rectangle.x = this.parent.rectangle.right - rectangle.width;\r\n                        break;\r\n                }\r\n            }\r\n            else {\r\n                this.rectangle.x = rectangle.x;\r\n            }\r\n            if (!rectangle.y) {\r\n                this.rectangle.y = 0;\r\n            }\r\n            else if (typeof rectangle.y === 'string') {\r\n                switch (rectangle.y) {\r\n                    case 'top':\r\n                        this.rectangle.y = 0;\r\n                        break;\r\n                    case 'center':\r\n                        this.rectangle.y = this.parent.rectangle.center.y - (rectangle.height / 2);\r\n                        break;\r\n                    case 'bottom':\r\n                        this.rectangle.y = this.parent.rectangle.bottom - rectangle.height;\r\n                        break;\r\n                }\r\n            }\r\n            else {\r\n                this.rectangle.y = rectangle.y;\r\n            }\r\n        }\r\n        else {\r\n            this.rectangle = rectangle;\r\n        }\r\n    }\r\n    set rendering(rendering) {\r\n        if (rendering instanceof Function) {\r\n            rendering = new _Rendering_Canvas2DRendering_SpriteRenderingFunctionAdapter__WEBPACK_IMPORTED_MODULE_3__.SpriteRenderingFunctionAdapter(rendering);\r\n        }\r\n        this._rendering = rendering;\r\n    }\r\n    get rendering() {\r\n        return this._rendering;\r\n    }\r\n    get x() {\r\n        return this.rectangle.x;\r\n    }\r\n    set x(x) {\r\n        this.rectangle.x = x;\r\n    }\r\n    get y() {\r\n        return this.rectangle.y;\r\n    }\r\n    set y(y) {\r\n        this.rectangle.y = y;\r\n    }\r\n    get width() {\r\n        return this.rectangle.width;\r\n    }\r\n    set width(width) {\r\n        this.rectangle.width = width;\r\n    }\r\n    get height() {\r\n        return this.rectangle.height;\r\n    }\r\n    set height(height) {\r\n        this.rectangle.height = height;\r\n    }\r\n    get scale() {\r\n        return this._scale;\r\n    }\r\n    set scale(scale) {\r\n        this._scale = scale;\r\n    }\r\n    get translation() {\r\n        return this._translation;\r\n    }\r\n    set translation(translation) {\r\n        this._translation = translation;\r\n    }\r\n    get transformation() {\r\n        return this._transformation;\r\n    }\r\n    set transformation(transformation) {\r\n        this._transformation = transformation;\r\n    }\r\n    get absoluteRectangle() {\r\n        if (!this.parent) {\r\n            return new _Geom_Rectangle__WEBPACK_IMPORTED_MODULE_0__.Rectangle(this.rectangle);\r\n        }\r\n        return this.parent.absoluteRectangle.add(this.rectangle);\r\n    }\r\n    addSprite(rectangle, rendering) {\r\n        return new Sprite(this, rectangle, rendering);\r\n    }\r\n    addImage(image, rectangle, rendering) {\r\n        return new _index__WEBPACK_IMPORTED_MODULE_2__.Image(image, this, rectangle, rendering);\r\n    }\r\n    addText(text, rectangle, rendering) {\r\n        return new _index__WEBPACK_IMPORTED_MODULE_2__.Text(text, this, rectangle, rendering);\r\n    }\r\n    addShape(rectangle, rendering) {\r\n        return new _index__WEBPACK_IMPORTED_MODULE_2__.Shape(this, rectangle, rendering);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://arcadium/./src/ts/Display/Sprite.ts?");

/***/ }),

/***/ "./src/ts/Display/Text.ts":
/*!********************************!*\
  !*** ./src/ts/Display/Text.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Text\": () => (/* binding */ Text)\n/* harmony export */ });\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ \"./src/ts/Display/index.ts\");\n/* harmony import */ var _Rendering_Canvas2DRendering_SpriteTextRendering__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Rendering/Canvas2DRendering/SpriteTextRendering */ \"./src/ts/Rendering/Canvas2DRendering/SpriteTextRendering.ts\");\n\r\n\r\nclass Text extends _index__WEBPACK_IMPORTED_MODULE_0__.Sprite {\r\n    constructor(text, parent, rectangle, rendering) {\r\n        super(parent, rectangle, rendering || new _Rendering_Canvas2DRendering_SpriteTextRendering__WEBPACK_IMPORTED_MODULE_1__.SpriteTextRendering());\r\n        this.adjustToWidth = false;\r\n        this.lineHeight = 15;\r\n        this.text = text;\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://arcadium/./src/ts/Display/Text.ts?");

/***/ }),

/***/ "./src/ts/Display/index.ts":
/*!*********************************!*\
  !*** ./src/ts/Display/index.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Sprite\": () => (/* reexport safe */ _Sprite__WEBPACK_IMPORTED_MODULE_0__.Sprite),\n/* harmony export */   \"Image\": () => (/* reexport safe */ _Image__WEBPACK_IMPORTED_MODULE_1__.Image),\n/* harmony export */   \"Shape\": () => (/* reexport safe */ _Shape__WEBPACK_IMPORTED_MODULE_2__.Shape),\n/* harmony export */   \"Text\": () => (/* reexport safe */ _Text__WEBPACK_IMPORTED_MODULE_3__.Text),\n/* harmony export */   \"Shadow\": () => (/* reexport safe */ _Shadow__WEBPACK_IMPORTED_MODULE_4__.Shadow)\n/* harmony export */ });\n/* harmony import */ var _Sprite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Sprite */ \"./src/ts/Display/Sprite.ts\");\n/* harmony import */ var _Image__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Image */ \"./src/ts/Display/Image.ts\");\n/* harmony import */ var _Shape__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Shape */ \"./src/ts/Display/Shape.ts\");\n/* harmony import */ var _Text__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Text */ \"./src/ts/Display/Text.ts\");\n/* harmony import */ var _Shadow__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Shadow */ \"./src/ts/Display/Shadow.ts\");\n//avoid circular dependencies issues\r\n\r\n\r\n\r\n\r\n//normal export\r\n\r\n\n\n//# sourceURL=webpack://arcadium/./src/ts/Display/index.ts?");

/***/ }),

/***/ "./src/ts/Event/EventListener.ts":
/*!***************************************!*\
  !*** ./src/ts/Event/EventListener.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"EventListener\": () => (/* binding */ EventListener)\n/* harmony export */ });\nclass EventListener {\r\n    constructor() {\r\n        this.callbacks = {};\r\n    }\r\n    on(eventName, callback) {\r\n        if (!(eventName in this.callbacks)) {\r\n            this.callbacks[eventName] = [];\r\n        }\r\n        this.callbacks[eventName].push(callback);\r\n    }\r\n    fire(eventName, data) {\r\n        if (eventName in this.callbacks) {\r\n            for (let callback of this.callbacks[eventName]) {\r\n                callback(data);\r\n            }\r\n        }\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://arcadium/./src/ts/Event/EventListener.ts?");

/***/ }),

/***/ "./src/ts/Event/EventListenerInterface.ts":
/*!************************************************!*\
  !*** ./src/ts/Event/EventListenerInterface.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\r\n\n\n//# sourceURL=webpack://arcadium/./src/ts/Event/EventListenerInterface.ts?");

/***/ }),

/***/ "./src/ts/Event/index.ts":
/*!*******************************!*\
  !*** ./src/ts/Event/index.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"EventListener\": () => (/* reexport safe */ _EventListener__WEBPACK_IMPORTED_MODULE_0__.EventListener)\n/* harmony export */ });\n/* harmony import */ var _EventListener__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EventListener */ \"./src/ts/Event/EventListener.ts\");\n/* harmony import */ var _EventListenerInterface__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EventListenerInterface */ \"./src/ts/Event/EventListenerInterface.ts\");\n\r\n\r\n\n\n//# sourceURL=webpack://arcadium/./src/ts/Event/index.ts?");

/***/ }),

/***/ "./src/ts/Geom/Angle.ts":
/*!******************************!*\
  !*** ./src/ts/Geom/Angle.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Angle\": () => (/* binding */ Angle)\n/* harmony export */ });\nclass Angle {\r\n    constructor(degrees) {\r\n        this.value = 0;\r\n        this.degrees = degrees;\r\n    }\r\n    get degrees() {\r\n        return this.value;\r\n    }\r\n    set degrees(degrees) {\r\n        this.value = degrees;\r\n    }\r\n    get radians() {\r\n        return this.degrees * (Math.PI / 180);\r\n    }\r\n    set radians(radians) {\r\n        this.degrees = radians * (180 / Math.PI);\r\n    }\r\n    add(angle) {\r\n        this.degrees += angle.degrees;\r\n    }\r\n    subtract(angle) {\r\n        this.degrees -= angle.degrees;\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://arcadium/./src/ts/Geom/Angle.ts?");

/***/ }),

/***/ "./src/ts/Geom/Point.ts":
/*!******************************!*\
  !*** ./src/ts/Geom/Point.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Point\": () => (/* binding */ Point)\n/* harmony export */ });\nclass Point {\r\n    constructor(point) {\r\n        this.x = point.x;\r\n        this.y = point.y;\r\n    }\r\n    add(point) {\r\n        return new Point({\r\n            x: this.x + point.x,\r\n            y: this.y + point.y\r\n        });\r\n    }\r\n    subtract(point) {\r\n        return new Point({\r\n            x: this.x - point.x,\r\n            y: this.y - point.y\r\n        });\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://arcadium/./src/ts/Geom/Point.ts?");

/***/ }),

/***/ "./src/ts/Geom/PointInterface.ts":
/*!***************************************!*\
  !*** ./src/ts/Geom/PointInterface.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\r\n\n\n//# sourceURL=webpack://arcadium/./src/ts/Geom/PointInterface.ts?");

/***/ }),

/***/ "./src/ts/Geom/Rectangle.ts":
/*!**********************************!*\
  !*** ./src/ts/Geom/Rectangle.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Rectangle\": () => (/* binding */ Rectangle)\n/* harmony export */ });\n/* harmony import */ var _Point__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Point */ \"./src/ts/Geom/Point.ts\");\n/* harmony import */ var _Vector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Vector */ \"./src/ts/Geom/Vector.ts\");\n\r\n\r\nclass Rectangle {\r\n    constructor(rectangle) {\r\n        if (rectangle.coordinates) {\r\n            this.coordinates = rectangle.coordinates;\r\n        }\r\n        else {\r\n            this.coordinates = {\r\n                x: rectangle.x,\r\n                y: rectangle.y\r\n            };\r\n        }\r\n        if (rectangle.size) {\r\n            this.size = rectangle.size;\r\n        }\r\n        else {\r\n            this.size = {\r\n                x: rectangle.width,\r\n                y: rectangle.height\r\n            };\r\n        }\r\n    }\r\n    get coordinates() {\r\n        return this._coordinates;\r\n    }\r\n    set coordinates(coordinates) {\r\n        this._coordinates = new _Point__WEBPACK_IMPORTED_MODULE_0__.Point(coordinates);\r\n    }\r\n    get size() {\r\n        return this._size;\r\n    }\r\n    set size(size) {\r\n        this._size = new _Point__WEBPACK_IMPORTED_MODULE_0__.Point(size);\r\n    }\r\n    get x() {\r\n        return this.coordinates.x;\r\n    }\r\n    get y() {\r\n        return this.coordinates.y;\r\n    }\r\n    get width() {\r\n        return this.size.x;\r\n    }\r\n    get height() {\r\n        return this.size.y;\r\n    }\r\n    set x(x) {\r\n        this.coordinates.x = x;\r\n    }\r\n    set y(y) {\r\n        this.coordinates.y = y;\r\n    }\r\n    set width(width) {\r\n        this.size.x = width;\r\n    }\r\n    set height(height) {\r\n        this.size.y = height;\r\n    }\r\n    get left() {\r\n        return this.x;\r\n    }\r\n    get right() {\r\n        return this.x + this.width;\r\n    }\r\n    get top() {\r\n        return this.y;\r\n    }\r\n    get bottom() {\r\n        return this.y + this.height;\r\n    }\r\n    get topLeft() {\r\n        return new _Point__WEBPACK_IMPORTED_MODULE_0__.Point({\r\n            x: this.left,\r\n            y: this.top\r\n        });\r\n    }\r\n    get topRight() {\r\n        return new _Point__WEBPACK_IMPORTED_MODULE_0__.Point({\r\n            x: this.right,\r\n            y: this.top\r\n        });\r\n    }\r\n    get bottomLeft() {\r\n        return new _Point__WEBPACK_IMPORTED_MODULE_0__.Point({\r\n            x: this.left,\r\n            y: this.bottom\r\n        });\r\n    }\r\n    get bottomRight() {\r\n        return new _Point__WEBPACK_IMPORTED_MODULE_0__.Point({\r\n            x: this.right,\r\n            y: this.bottom\r\n        });\r\n    }\r\n    get center() {\r\n        return new _Point__WEBPACK_IMPORTED_MODULE_0__.Point({\r\n            x: this.x + (this.width / 2),\r\n            y: this.y + (this.height / 2)\r\n        });\r\n    }\r\n    add(rect) {\r\n        const rectangle = new Rectangle(rect);\r\n        return new Rectangle({\r\n            coordinates: this.coordinates.add(rectangle.coordinates),\r\n            size: this.size.add(rectangle.size),\r\n        });\r\n    }\r\n    contains(point) {\r\n        if (point.x < this.left) {\r\n            return false;\r\n        }\r\n        if (point.x > this.right) {\r\n            return false;\r\n        }\r\n        if (point.y < this.top) {\r\n            return false;\r\n        }\r\n        if (point.y > this.bottom) {\r\n            return false;\r\n        }\r\n        return true;\r\n    }\r\n    calculateAverageDistance(rect) {\r\n        const rectangle = new Rectangle(rect);\r\n        return new _Vector__WEBPACK_IMPORTED_MODULE_1__.Vector(this.center, rectangle.center);\r\n    }\r\n    calculateIntersection(toIntersect) {\r\n        const rectangle = new Rectangle(toIntersect);\r\n        let topLeft = this.calculateIntersectionTopLeft(rectangle);\r\n        if (!topLeft) {\r\n            return null;\r\n        }\r\n        let topRight = this.calculateIntersectionTopRight(rectangle);\r\n        if (!topLeft) {\r\n            return null;\r\n        }\r\n        let bottomLeft = this.calculateIntersectionBottomLeft(rectangle);\r\n        if (!topLeft) {\r\n            return null;\r\n        }\r\n        function fromAngle(topLeft, topRight, bottomLeft) {\r\n            if (topLeft.y != topRight.y || topLeft.x != bottomLeft.x) {\r\n                throw new Error('rectangle coordinates not valid');\r\n            }\r\n            return new Rectangle({\r\n                x: topLeft.x,\r\n                y: topLeft.y,\r\n                width: topRight.x - topLeft.x,\r\n                height: bottomLeft.y - topLeft.y\r\n            });\r\n        }\r\n        return fromAngle(topLeft, topRight, bottomLeft);\r\n    }\r\n    calculateIntersectionTopLeft(rectangle) {\r\n        if (this.contains(rectangle.topLeft)) {\r\n            return rectangle.topLeft;\r\n        }\r\n        if (rectangle.contains(this.topLeft)) {\r\n            return this.topLeft;\r\n        }\r\n        return null;\r\n    }\r\n    calculateIntersectionTopRight(rectangle) {\r\n        if (this.contains(rectangle.topRight)) {\r\n            return rectangle.topRight;\r\n        }\r\n        if (rectangle.contains(this.topRight)) {\r\n            return this.topRight;\r\n        }\r\n        return null;\r\n    }\r\n    calculateIntersectionBottomLeft(rectangle) {\r\n        if (this.contains(rectangle.bottomLeft)) {\r\n            return rectangle.bottomLeft;\r\n        }\r\n        if (rectangle.contains(this.bottomLeft)) {\r\n            return this.bottomLeft;\r\n        }\r\n        return null;\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://arcadium/./src/ts/Geom/Rectangle.ts?");

/***/ }),

/***/ "./src/ts/Geom/RectangleInterface.ts":
/*!*******************************************!*\
  !*** ./src/ts/Geom/RectangleInterface.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\r\n\n\n//# sourceURL=webpack://arcadium/./src/ts/Geom/RectangleInterface.ts?");

/***/ }),

/***/ "./src/ts/Geom/Transformation.ts":
/*!***************************************!*\
  !*** ./src/ts/Geom/Transformation.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Transformation\": () => (/* binding */ Transformation)\n/* harmony export */ });\nclass Transformation {\r\n    constructor(a, b, c, d, e, f) {\r\n        this.a = a;\r\n        this.b = b;\r\n        this.c = c;\r\n        this.d = d;\r\n        this.e = e;\r\n        this.f = f;\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://arcadium/./src/ts/Geom/Transformation.ts?");

/***/ }),

/***/ "./src/ts/Geom/TransformationInterface.ts":
/*!************************************************!*\
  !*** ./src/ts/Geom/TransformationInterface.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\r\n\n\n//# sourceURL=webpack://arcadium/./src/ts/Geom/TransformationInterface.ts?");

/***/ }),

/***/ "./src/ts/Geom/Vector.ts":
/*!*******************************!*\
  !*** ./src/ts/Geom/Vector.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Vector\": () => (/* binding */ Vector)\n/* harmony export */ });\n/* harmony import */ var _Point__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Point */ \"./src/ts/Geom/Point.ts\");\n\r\nclass Vector {\r\n    constructor(a, b) {\r\n        this.a = a;\r\n        this.b = b;\r\n    }\r\n    get length() {\r\n        return Math.sqrt(Math.pow(this.b.x - this.a.x, 2)\r\n            + Math.pow(this.b.y - this.a.y, 2));\r\n    }\r\n    toPoint() {\r\n        return new _Point__WEBPACK_IMPORTED_MODULE_0__.Point({\r\n            x: this.b.x - this.a.x,\r\n            y: this.b.y - this.a.y,\r\n        });\r\n    }\r\n    add(vector) {\r\n        return this.toPoint().add(vector.toPoint());\r\n    }\r\n    subtract(vector) {\r\n        return this.toPoint().subtract(vector.toPoint());\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://arcadium/./src/ts/Geom/Vector.ts?");

/***/ }),

/***/ "./src/ts/Geom/index.ts":
/*!******************************!*\
  !*** ./src/ts/Geom/index.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Angle\": () => (/* reexport safe */ _Angle__WEBPACK_IMPORTED_MODULE_0__.Angle),\n/* harmony export */   \"Point\": () => (/* reexport safe */ _Point__WEBPACK_IMPORTED_MODULE_1__.Point),\n/* harmony export */   \"Rectangle\": () => (/* reexport safe */ _Rectangle__WEBPACK_IMPORTED_MODULE_3__.Rectangle),\n/* harmony export */   \"Transformation\": () => (/* reexport safe */ _Transformation__WEBPACK_IMPORTED_MODULE_5__.Transformation),\n/* harmony export */   \"Vector\": () => (/* reexport safe */ _Vector__WEBPACK_IMPORTED_MODULE_7__.Vector)\n/* harmony export */ });\n/* harmony import */ var _Angle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Angle */ \"./src/ts/Geom/Angle.ts\");\n/* harmony import */ var _Point__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Point */ \"./src/ts/Geom/Point.ts\");\n/* harmony import */ var _PointInterface__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PointInterface */ \"./src/ts/Geom/PointInterface.ts\");\n/* harmony import */ var _Rectangle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Rectangle */ \"./src/ts/Geom/Rectangle.ts\");\n/* harmony import */ var _RectangleInterface__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./RectangleInterface */ \"./src/ts/Geom/RectangleInterface.ts\");\n/* harmony import */ var _Transformation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Transformation */ \"./src/ts/Geom/Transformation.ts\");\n/* harmony import */ var _TransformationInterface__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./TransformationInterface */ \"./src/ts/Geom/TransformationInterface.ts\");\n/* harmony import */ var _Vector__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Vector */ \"./src/ts/Geom/Vector.ts\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack://arcadium/./src/ts/Geom/index.ts?");

/***/ }),

/***/ "./src/ts/Global/Services.ts":
/*!***********************************!*\
  !*** ./src/ts/Global/Services.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Services\": () => (/* binding */ Services)\n/* harmony export */ });\n/* harmony import */ var _Rendering_RenderingFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Rendering/RenderingFactory */ \"./src/ts/Rendering/RenderingFactory.ts\");\n/* harmony import */ var _Rendering_Canvas2DRendering_Canvas2DRendering__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Rendering/Canvas2DRendering/Canvas2DRendering */ \"./src/ts/Rendering/Canvas2DRendering/Canvas2DRendering.ts\");\n/* harmony import */ var _Rendering_Canvas2DRendering_BaseSpriteRendering__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Rendering/Canvas2DRendering/BaseSpriteRendering */ \"./src/ts/Rendering/Canvas2DRendering/BaseSpriteRendering.ts\");\n/* harmony import */ var _Event_EventListener__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Event/EventListener */ \"./src/ts/Event/EventListener.ts\");\n/* harmony import */ var _Core_Motion__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Core/Motion */ \"./src/ts/Core/Motion.ts\");\n/* harmony import */ var _Rendering_Canvas2DRendering_SpriteBoundariesRendering__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Rendering/Canvas2DRendering/SpriteBoundariesRendering */ \"./src/ts/Rendering/Canvas2DRendering/SpriteBoundariesRendering.ts\");\n/* harmony import */ var _Ui__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Ui */ \"./src/ts/Ui/index.ts\");\n/* harmony import */ var _Rendering_Canvas2DRendering_SpriteBaseShapeRendering__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Rendering/Canvas2DRendering/SpriteBaseShapeRendering */ \"./src/ts/Rendering/Canvas2DRendering/SpriteBaseShapeRendering.ts\");\n/* harmony import */ var _Rendering_Canvas2DRendering_SpriteTriangleShapeRendering__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../Rendering/Canvas2DRendering/SpriteTriangleShapeRendering */ \"./src/ts/Rendering/Canvas2DRendering/SpriteTriangleShapeRendering.ts\");\n/* harmony import */ var _Rendering_Canvas2DRendering_SpriteRectangleShapeRendering__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../Rendering/Canvas2DRendering/SpriteRectangleShapeRendering */ \"./src/ts/Rendering/Canvas2DRendering/SpriteRectangleShapeRendering.ts\");\n/* harmony import */ var _Rendering_Canvas2DRendering_SpriteCircleShapeRendering__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../Rendering/Canvas2DRendering/SpriteCircleShapeRendering */ \"./src/ts/Rendering/Canvas2DRendering/SpriteCircleShapeRendering.ts\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nclass Services {\r\n    constructor(canvas, globalObject) {\r\n        this.services = {};\r\n        this.htmlCanvas = canvas;\r\n        this.animationFrameProvider = globalObject;\r\n    }\r\n    get(serviceId, init) {\r\n        if (!this.services[serviceId]) {\r\n            this.services[serviceId] = init();\r\n        }\r\n        return this.services[serviceId];\r\n    }\r\n    get renderingFactory() {\r\n        return this.get('RenderingFactory', () => {\r\n            return new _Rendering_RenderingFactory__WEBPACK_IMPORTED_MODULE_0__.RenderingFactory(this.canvas2DRendering);\r\n        });\r\n    }\r\n    get canvas2DRendering() {\r\n        return this.get('Canvas2DRendering', () => {\r\n            return new _Rendering_Canvas2DRendering_Canvas2DRendering__WEBPACK_IMPORTED_MODULE_1__.Canvas2DRendering(this.baseSpriteRendering, this.spriteBoundariesRendering);\r\n        });\r\n    }\r\n    get baseSpriteRendering() {\r\n        return this.get('BaseSpriteRendering', () => {\r\n            return new _Rendering_Canvas2DRendering_BaseSpriteRendering__WEBPACK_IMPORTED_MODULE_2__.BaseSpriteRendering();\r\n        });\r\n    }\r\n    get spriteBoundariesRendering() {\r\n        return this.get('SpriteBoundariesRendering', () => {\r\n            return new _Rendering_Canvas2DRendering_SpriteBoundariesRendering__WEBPACK_IMPORTED_MODULE_5__.SpriteBoundariesRendering();\r\n        });\r\n    }\r\n    get eventListener() {\r\n        return this.get('EventListener', () => {\r\n            return new _Event_EventListener__WEBPACK_IMPORTED_MODULE_3__.EventListener();\r\n        });\r\n    }\r\n    get motion() {\r\n        return this.get('Motion', () => {\r\n            return new _Core_Motion__WEBPACK_IMPORTED_MODULE_4__.Motion(this.animationFrameProvider, this.eventListener);\r\n        });\r\n    }\r\n    get mouse() {\r\n        return this.get('Mouse', () => {\r\n            return new _Ui__WEBPACK_IMPORTED_MODULE_6__.Mouse(this.htmlCanvas.htmlCanvasElement);\r\n        });\r\n    }\r\n    get spriteBaseShapeRendering() {\r\n        return this.get('SpriteBaseShapeRendering', () => {\r\n            return new _Rendering_Canvas2DRendering_SpriteBaseShapeRendering__WEBPACK_IMPORTED_MODULE_7__.SpriteBaseShapeRendering();\r\n        });\r\n    }\r\n    get spriteTriangleShapeRendering() {\r\n        return this.get('SpriteTriangleShapeRendering', () => {\r\n            return new _Rendering_Canvas2DRendering_SpriteTriangleShapeRendering__WEBPACK_IMPORTED_MODULE_8__.SpriteTriangleShapeRendering();\r\n        });\r\n    }\r\n    get spriteRectangleShapeRendering() {\r\n        return this.get('SpriteRectangleShapeRendering', () => {\r\n            return new _Rendering_Canvas2DRendering_SpriteRectangleShapeRendering__WEBPACK_IMPORTED_MODULE_9__.SpriteRectangleShapeRendering();\r\n        });\r\n    }\r\n    get spriteCircleShapeRendering() {\r\n        return this.get('SpriteCircleShapeRendering', () => {\r\n            return new _Rendering_Canvas2DRendering_SpriteCircleShapeRendering__WEBPACK_IMPORTED_MODULE_10__.SpriteCircleShapeRendering();\r\n        });\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://arcadium/./src/ts/Global/Services.ts?");

/***/ }),

/***/ "./src/ts/Global/index.ts":
/*!********************************!*\
  !*** ./src/ts/Global/index.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Services\": () => (/* reexport safe */ _Services__WEBPACK_IMPORTED_MODULE_0__.Services)\n/* harmony export */ });\n/* harmony import */ var _Services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Services */ \"./src/ts/Global/Services.ts\");\n\r\n\n\n//# sourceURL=webpack://arcadium/./src/ts/Global/index.ts?");

/***/ }),

/***/ "./src/ts/Rendering/Canvas2DRendering/BaseSpriteRendering.ts":
/*!*******************************************************************!*\
  !*** ./src/ts/Rendering/Canvas2DRendering/BaseSpriteRendering.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"BaseSpriteRendering\": () => (/* binding */ BaseSpriteRendering)\n/* harmony export */ });\nclass BaseSpriteRendering {\r\n    render(sprite, context) {\r\n        context.globalAlpha = sprite.alpha;\r\n        if (sprite.translation) {\r\n            context.translate(sprite.translation.x, sprite.translation.y);\r\n        }\r\n        if (sprite.scale) {\r\n            //todo est-ce qu'il faut rendre la scale fixe lors d'une rotation? voir https://gist.github.com/rodrigopedra/fcf8e84ec6dc80f3572b97ae26e2924d\r\n            context.translate(sprite.absoluteRectangle.center.x, sprite.absoluteRectangle.center.y);\r\n            context.scale(sprite.scale.x, sprite.scale.y);\r\n            context.translate(-sprite.absoluteRectangle.center.x, -sprite.absoluteRectangle.center.y);\r\n        }\r\n        if (sprite.rotation) {\r\n            context.translate(sprite.absoluteRectangle.center.x, sprite.absoluteRectangle.center.y);\r\n            context.rotate(sprite.rotation.radians);\r\n            context.translate(-sprite.absoluteRectangle.center.x, -sprite.absoluteRectangle.center.y);\r\n        }\r\n        if (sprite.transformation) {\r\n            context.translate(sprite.absoluteRectangle.center.x, sprite.absoluteRectangle.center.y);\r\n            context.setTransform(sprite.transformation.a, sprite.transformation.b, sprite.transformation.c, sprite.transformation.d, sprite.transformation.e, sprite.transformation.f);\r\n            //Todo ceci ne marche pas!\r\n            console.error('sprite.transformation not implemented');\r\n            context.translate(-sprite.absoluteRectangle.center.x, -sprite.absoluteRectangle.center.y);\r\n        }\r\n        if (sprite.shadow) {\r\n            context.shadowBlur = sprite.shadow.blur;\r\n            if (sprite.shadow.color) {\r\n                context.shadowColor = sprite.shadow.color;\r\n            }\r\n            if (sprite.shadow.offset) {\r\n                context.shadowOffsetX = sprite.shadow.offset.x;\r\n                context.shadowOffsetY = sprite.shadow.offset.y;\r\n            }\r\n        }\r\n        if (sprite.blendMode) {\r\n            context.globalCompositeOperation = sprite.blendMode;\r\n        }\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://arcadium/./src/ts/Rendering/Canvas2DRendering/BaseSpriteRendering.ts?");

/***/ }),

/***/ "./src/ts/Rendering/Canvas2DRendering/Canvas2DRendering.ts":
/*!*****************************************************************!*\
  !*** ./src/ts/Rendering/Canvas2DRendering/Canvas2DRendering.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Canvas2DRendering\": () => (/* binding */ Canvas2DRendering)\n/* harmony export */ });\n/* harmony import */ var _Display_Shape__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Display/Shape */ \"./src/ts/Display/Shape.ts\");\n\r\nclass Canvas2DRendering {\r\n    constructor(baseSpriteRendering, spriteBoundariesRendering) {\r\n        this.baseSpriteRendering = baseSpriteRendering;\r\n        this.spriteBoundariesRendering = spriteBoundariesRendering;\r\n    }\r\n    clear(context, sprite) {\r\n        let rectangle = sprite.absoluteRectangle;\r\n        context.clearRect(rectangle.left, rectangle.top, rectangle.right, rectangle.bottom);\r\n    }\r\n    renderSprite(context, sprite, isDebugMode) {\r\n        this.renderSingleSprite(context, sprite, isDebugMode);\r\n        for (const child of sprite.children) {\r\n            this.renderSprite(context, child, isDebugMode);\r\n        }\r\n    }\r\n    renderSingleSprite(context, sprite, isDebugMode) {\r\n        context.save();\r\n        if (sprite.isVisible) {\r\n            this.baseSpriteRendering.render(sprite, context);\r\n            if (sprite.rendering) {\r\n                sprite.rendering.render(sprite, context);\r\n            }\r\n        }\r\n        if (isDebugMode) {\r\n            this.renderBoundaries(context, sprite, '#ccc');\r\n            context.restore();\r\n            this.renderBoundaries(context, sprite, '#0000ff');\r\n        }\r\n        context.restore();\r\n    }\r\n    renderBoundaries(context, sprite, color) {\r\n        if (!sprite.parent) {\r\n            //avoid to debug the stage\r\n            return;\r\n        }\r\n        let shape = new _Display_Shape__WEBPACK_IMPORTED_MODULE_0__.Shape(null, sprite.rectangle);\r\n        shape.strokeStyle = color;\r\n        this.spriteBoundariesRendering.render(shape, context);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://arcadium/./src/ts/Rendering/Canvas2DRendering/Canvas2DRendering.ts?");

/***/ }),

/***/ "./src/ts/Rendering/Canvas2DRendering/SpriteBaseShapeRendering.ts":
/*!************************************************************************!*\
  !*** ./src/ts/Rendering/Canvas2DRendering/SpriteBaseShapeRendering.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"SpriteBaseShapeRendering\": () => (/* binding */ SpriteBaseShapeRendering)\n/* harmony export */ });\nclass SpriteBaseShapeRendering {\r\n    render(sprite, context) {\r\n        if (sprite.lineCap !== undefined) {\r\n            context.lineCap = sprite.lineCap;\r\n        }\r\n        if (sprite.lineDashOffset !== undefined) {\r\n            context.lineDashOffset = sprite.lineDashOffset;\r\n        }\r\n        if (sprite.lineJoin !== undefined) {\r\n            context.lineJoin = sprite.lineJoin;\r\n        }\r\n        if (sprite.lineWidth !== undefined) {\r\n            context.lineWidth = sprite.lineWidth;\r\n        }\r\n        if (sprite.miterLimit !== undefined) {\r\n            context.miterLimit = sprite.miterLimit;\r\n        }\r\n        if (sprite.lineDash !== undefined) {\r\n            context.setLineDash(sprite.lineDash);\r\n        }\r\n        // the fill color\r\n        if (sprite.fillStyle !== undefined) {\r\n            context.fillStyle = sprite.fillStyle;\r\n            context.fill();\r\n        }\r\n        //the outline\r\n        if (sprite.strokeStyle !== undefined) {\r\n            context.strokeStyle = sprite.strokeStyle;\r\n            context.stroke();\r\n        }\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://arcadium/./src/ts/Rendering/Canvas2DRendering/SpriteBaseShapeRendering.ts?");

/***/ }),

/***/ "./src/ts/Rendering/Canvas2DRendering/SpriteBoundariesRendering.ts":
/*!*************************************************************************!*\
  !*** ./src/ts/Rendering/Canvas2DRendering/SpriteBoundariesRendering.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"SpriteBoundariesRendering\": () => (/* binding */ SpriteBoundariesRendering)\n/* harmony export */ });\nclass SpriteBoundariesRendering {\r\n    render(sprite, context) {\r\n        let rectangle = sprite.absoluteRectangle;\r\n        // the rectangle\r\n        context.beginPath();\r\n        context.rect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);\r\n        context.closePath();\r\n        //the outline\r\n        context.lineWidth = sprite.lineWidth;\r\n        context.strokeStyle = sprite.strokeStyle;\r\n        context.stroke();\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://arcadium/./src/ts/Rendering/Canvas2DRendering/SpriteBoundariesRendering.ts?");

/***/ }),

/***/ "./src/ts/Rendering/Canvas2DRendering/SpriteCircleShapeRendering.ts":
/*!**************************************************************************!*\
  !*** ./src/ts/Rendering/Canvas2DRendering/SpriteCircleShapeRendering.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"SpriteCircleShapeRendering\": () => (/* binding */ SpriteCircleShapeRendering)\n/* harmony export */ });\n/* harmony import */ var _SpriteBaseShapeRendering__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SpriteBaseShapeRendering */ \"./src/ts/Rendering/Canvas2DRendering/SpriteBaseShapeRendering.ts\");\n\r\nclass SpriteCircleShapeRendering extends _SpriteBaseShapeRendering__WEBPACK_IMPORTED_MODULE_0__.SpriteBaseShapeRendering {\r\n    render(sprite, context) {\r\n        context.beginPath();\r\n        context.arc(sprite.absoluteRectangle.x + sprite.rectangle.width / 2, sprite.absoluteRectangle.y + sprite.rectangle.height / 2, sprite.rectangle.width / 2, 0, Math.PI * 2, false);\r\n        context.closePath();\r\n        super.render(sprite, context);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://arcadium/./src/ts/Rendering/Canvas2DRendering/SpriteCircleShapeRendering.ts?");

/***/ }),

/***/ "./src/ts/Rendering/Canvas2DRendering/SpriteImageRendering.ts":
/*!********************************************************************!*\
  !*** ./src/ts/Rendering/Canvas2DRendering/SpriteImageRendering.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"SpriteImageRendering\": () => (/* binding */ SpriteImageRendering)\n/* harmony export */ });\nclass SpriteImageRendering {\r\n    render(sprite, context) {\r\n        context.drawImage(sprite.source, 0, 0, sprite.source.width, sprite.source.height, sprite.absoluteRectangle.x, sprite.absoluteRectangle.y, sprite.rectangle.width, sprite.rectangle.height);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://arcadium/./src/ts/Rendering/Canvas2DRendering/SpriteImageRendering.ts?");

/***/ }),

/***/ "./src/ts/Rendering/Canvas2DRendering/SpriteRectangleShapeRendering.ts":
/*!*****************************************************************************!*\
  !*** ./src/ts/Rendering/Canvas2DRendering/SpriteRectangleShapeRendering.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"SpriteRectangleShapeRendering\": () => (/* binding */ SpriteRectangleShapeRendering)\n/* harmony export */ });\n/* harmony import */ var _SpriteBaseShapeRendering__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SpriteBaseShapeRendering */ \"./src/ts/Rendering/Canvas2DRendering/SpriteBaseShapeRendering.ts\");\n\r\nclass SpriteRectangleShapeRendering extends _SpriteBaseShapeRendering__WEBPACK_IMPORTED_MODULE_0__.SpriteBaseShapeRendering {\r\n    render(sprite, context) {\r\n        context.beginPath();\r\n        context.rect(sprite.absoluteRectangle.x, sprite.absoluteRectangle.y, sprite.rectangle.width, sprite.rectangle.height);\r\n        context.closePath();\r\n        super.render(sprite, context);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://arcadium/./src/ts/Rendering/Canvas2DRendering/SpriteRectangleShapeRendering.ts?");

/***/ }),

/***/ "./src/ts/Rendering/Canvas2DRendering/SpriteRenderingFunctionAdapter.ts":
/*!******************************************************************************!*\
  !*** ./src/ts/Rendering/Canvas2DRendering/SpriteRenderingFunctionAdapter.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"SpriteRenderingFunctionAdapter\": () => (/* binding */ SpriteRenderingFunctionAdapter)\n/* harmony export */ });\nclass SpriteRenderingFunctionAdapter {\r\n    constructor(callback) {\r\n        this.callback = callback;\r\n    }\r\n    render(sprite, context) {\r\n        this.callback(sprite, context);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://arcadium/./src/ts/Rendering/Canvas2DRendering/SpriteRenderingFunctionAdapter.ts?");

/***/ }),

/***/ "./src/ts/Rendering/Canvas2DRendering/SpriteRenderingInterface.ts":
/*!************************************************************************!*\
  !*** ./src/ts/Rendering/Canvas2DRendering/SpriteRenderingInterface.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\r\n\n\n//# sourceURL=webpack://arcadium/./src/ts/Rendering/Canvas2DRendering/SpriteRenderingInterface.ts?");

/***/ }),

/***/ "./src/ts/Rendering/Canvas2DRendering/SpriteTextRendering.ts":
/*!*******************************************************************!*\
  !*** ./src/ts/Rendering/Canvas2DRendering/SpriteTextRendering.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"SpriteTextRendering\": () => (/* binding */ SpriteTextRendering)\n/* harmony export */ });\nclass SpriteTextRendering {\r\n    render(sprite, context) {\r\n        context.direction = sprite.direction;\r\n        context.font = sprite.font;\r\n        context.textAlign = sprite.textAlign;\r\n        context.textBaseline = sprite.textBaseline;\r\n        const lines = sprite.text.split('\\n');\r\n        for (let i = 0; i < lines.length; ++i) {\r\n            context.fillText(lines[i], sprite.absoluteRectangle.x, sprite.absoluteRectangle.y + (sprite.lineHeight * (i + 1)), sprite.adjustToWidth ? sprite.rectangle.width : undefined);\r\n        }\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://arcadium/./src/ts/Rendering/Canvas2DRendering/SpriteTextRendering.ts?");

/***/ }),

/***/ "./src/ts/Rendering/Canvas2DRendering/SpriteTriangleShapeRendering.ts":
/*!****************************************************************************!*\
  !*** ./src/ts/Rendering/Canvas2DRendering/SpriteTriangleShapeRendering.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"SpriteTriangleShapeRendering\": () => (/* binding */ SpriteTriangleShapeRendering)\n/* harmony export */ });\n/* harmony import */ var _SpriteBaseShapeRendering__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SpriteBaseShapeRendering */ \"./src/ts/Rendering/Canvas2DRendering/SpriteBaseShapeRendering.ts\");\n\r\nclass SpriteTriangleShapeRendering extends _SpriteBaseShapeRendering__WEBPACK_IMPORTED_MODULE_0__.SpriteBaseShapeRendering {\r\n    render(sprite, context) {\r\n        context.beginPath();\r\n        context.moveTo(sprite.absoluteRectangle.x + (sprite.rectangle.width / 2), sprite.absoluteRectangle.y);\r\n        context.lineTo(sprite.absoluteRectangle.x, sprite.absoluteRectangle.y + sprite.rectangle.height);\r\n        context.lineTo(sprite.absoluteRectangle.x + sprite.rectangle.width, sprite.absoluteRectangle.y + sprite.rectangle.height);\r\n        context.closePath();\r\n        super.render(sprite, context);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://arcadium/./src/ts/Rendering/Canvas2DRendering/SpriteTriangleShapeRendering.ts?");

/***/ }),

/***/ "./src/ts/Rendering/Canvas2DRendering/index.ts":
/*!*****************************************************!*\
  !*** ./src/ts/Rendering/Canvas2DRendering/index.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"BaseSpriteRendering\": () => (/* reexport safe */ _BaseSpriteRendering__WEBPACK_IMPORTED_MODULE_0__.BaseSpriteRendering),\n/* harmony export */   \"Canvas2DRendering\": () => (/* reexport safe */ _Canvas2DRendering__WEBPACK_IMPORTED_MODULE_1__.Canvas2DRendering),\n/* harmony export */   \"SpriteBaseShapeRendering\": () => (/* reexport safe */ _SpriteBaseShapeRendering__WEBPACK_IMPORTED_MODULE_2__.SpriteBaseShapeRendering),\n/* harmony export */   \"SpriteBoundariesRendering\": () => (/* reexport safe */ _SpriteBoundariesRendering__WEBPACK_IMPORTED_MODULE_3__.SpriteBoundariesRendering),\n/* harmony export */   \"SpriteCircleShapeRendering\": () => (/* reexport safe */ _SpriteCircleShapeRendering__WEBPACK_IMPORTED_MODULE_4__.SpriteCircleShapeRendering),\n/* harmony export */   \"SpriteImageRendering\": () => (/* reexport safe */ _SpriteImageRendering__WEBPACK_IMPORTED_MODULE_5__.SpriteImageRendering),\n/* harmony export */   \"SpriteRectangleShapeRendering\": () => (/* reexport safe */ _SpriteRectangleShapeRendering__WEBPACK_IMPORTED_MODULE_6__.SpriteRectangleShapeRendering),\n/* harmony export */   \"SpriteRenderingFunctionAdapter\": () => (/* reexport safe */ _SpriteRenderingFunctionAdapter__WEBPACK_IMPORTED_MODULE_7__.SpriteRenderingFunctionAdapter),\n/* harmony export */   \"SpriteTextRendering\": () => (/* reexport safe */ _SpriteTextRendering__WEBPACK_IMPORTED_MODULE_9__.SpriteTextRendering),\n/* harmony export */   \"SpriteTriangleShapeRendering\": () => (/* reexport safe */ _SpriteTriangleShapeRendering__WEBPACK_IMPORTED_MODULE_10__.SpriteTriangleShapeRendering)\n/* harmony export */ });\n/* harmony import */ var _BaseSpriteRendering__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseSpriteRendering */ \"./src/ts/Rendering/Canvas2DRendering/BaseSpriteRendering.ts\");\n/* harmony import */ var _Canvas2DRendering__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Canvas2DRendering */ \"./src/ts/Rendering/Canvas2DRendering/Canvas2DRendering.ts\");\n/* harmony import */ var _SpriteBaseShapeRendering__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SpriteBaseShapeRendering */ \"./src/ts/Rendering/Canvas2DRendering/SpriteBaseShapeRendering.ts\");\n/* harmony import */ var _SpriteBoundariesRendering__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SpriteBoundariesRendering */ \"./src/ts/Rendering/Canvas2DRendering/SpriteBoundariesRendering.ts\");\n/* harmony import */ var _SpriteCircleShapeRendering__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./SpriteCircleShapeRendering */ \"./src/ts/Rendering/Canvas2DRendering/SpriteCircleShapeRendering.ts\");\n/* harmony import */ var _SpriteImageRendering__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./SpriteImageRendering */ \"./src/ts/Rendering/Canvas2DRendering/SpriteImageRendering.ts\");\n/* harmony import */ var _SpriteRectangleShapeRendering__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./SpriteRectangleShapeRendering */ \"./src/ts/Rendering/Canvas2DRendering/SpriteRectangleShapeRendering.ts\");\n/* harmony import */ var _SpriteRenderingFunctionAdapter__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./SpriteRenderingFunctionAdapter */ \"./src/ts/Rendering/Canvas2DRendering/SpriteRenderingFunctionAdapter.ts\");\n/* harmony import */ var _SpriteRenderingInterface__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./SpriteRenderingInterface */ \"./src/ts/Rendering/Canvas2DRendering/SpriteRenderingInterface.ts\");\n/* harmony import */ var _SpriteTextRendering__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./SpriteTextRendering */ \"./src/ts/Rendering/Canvas2DRendering/SpriteTextRendering.ts\");\n/* harmony import */ var _SpriteTriangleShapeRendering__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./SpriteTriangleShapeRendering */ \"./src/ts/Rendering/Canvas2DRendering/SpriteTriangleShapeRendering.ts\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack://arcadium/./src/ts/Rendering/Canvas2DRendering/index.ts?");

/***/ }),

/***/ "./src/ts/Rendering/HtmlCanvas.ts":
/*!****************************************!*\
  !*** ./src/ts/Rendering/HtmlCanvas.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"HtmlCanvas\": () => (/* binding */ HtmlCanvas)\n/* harmony export */ });\nclass HtmlCanvas {\r\n    constructor(htmlCanvasElement, contextDimension = '2d', contextOptions) {\r\n        this.htmlCanvasElement = htmlCanvasElement;\r\n        this.contextDimension = contextDimension;\r\n        this.contextOptions = contextOptions;\r\n    }\r\n    get context() {\r\n        return this.htmlCanvasElement.getContext(this.contextDimension, this.contextOptions);\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://arcadium/./src/ts/Rendering/HtmlCanvas.ts?");

/***/ }),

/***/ "./src/ts/Rendering/RenderingFactory.ts":
/*!**********************************************!*\
  !*** ./src/ts/Rendering/RenderingFactory.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"RenderingFactory\": () => (/* binding */ RenderingFactory)\n/* harmony export */ });\nclass RenderingFactory {\r\n    constructor(canvas2DRendering) {\r\n        this.canvas2DRendering = canvas2DRendering;\r\n    }\r\n    create(htmlCanvas) {\r\n        if (htmlCanvas.contextDimension === '2d') {\r\n            return this.canvas2DRendering;\r\n        }\r\n        throw new Error('canvas context not implemented');\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://arcadium/./src/ts/Rendering/RenderingFactory.ts?");

/***/ }),

/***/ "./src/ts/Rendering/index.ts":
/*!***********************************!*\
  !*** ./src/ts/Rendering/index.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"BaseSpriteRendering\": () => (/* reexport safe */ _Canvas2DRendering__WEBPACK_IMPORTED_MODULE_0__.BaseSpriteRendering),\n/* harmony export */   \"Canvas2DRendering\": () => (/* reexport safe */ _Canvas2DRendering__WEBPACK_IMPORTED_MODULE_0__.Canvas2DRendering),\n/* harmony export */   \"SpriteBaseShapeRendering\": () => (/* reexport safe */ _Canvas2DRendering__WEBPACK_IMPORTED_MODULE_0__.SpriteBaseShapeRendering),\n/* harmony export */   \"SpriteBoundariesRendering\": () => (/* reexport safe */ _Canvas2DRendering__WEBPACK_IMPORTED_MODULE_0__.SpriteBoundariesRendering),\n/* harmony export */   \"SpriteCircleShapeRendering\": () => (/* reexport safe */ _Canvas2DRendering__WEBPACK_IMPORTED_MODULE_0__.SpriteCircleShapeRendering),\n/* harmony export */   \"SpriteImageRendering\": () => (/* reexport safe */ _Canvas2DRendering__WEBPACK_IMPORTED_MODULE_0__.SpriteImageRendering),\n/* harmony export */   \"SpriteRectangleShapeRendering\": () => (/* reexport safe */ _Canvas2DRendering__WEBPACK_IMPORTED_MODULE_0__.SpriteRectangleShapeRendering),\n/* harmony export */   \"SpriteRenderingFunctionAdapter\": () => (/* reexport safe */ _Canvas2DRendering__WEBPACK_IMPORTED_MODULE_0__.SpriteRenderingFunctionAdapter),\n/* harmony export */   \"SpriteTextRendering\": () => (/* reexport safe */ _Canvas2DRendering__WEBPACK_IMPORTED_MODULE_0__.SpriteTextRendering),\n/* harmony export */   \"SpriteTriangleShapeRendering\": () => (/* reexport safe */ _Canvas2DRendering__WEBPACK_IMPORTED_MODULE_0__.SpriteTriangleShapeRendering),\n/* harmony export */   \"HtmlCanvas\": () => (/* reexport safe */ _HtmlCanvas__WEBPACK_IMPORTED_MODULE_1__.HtmlCanvas),\n/* harmony export */   \"RenderingFactory\": () => (/* reexport safe */ _RenderingFactory__WEBPACK_IMPORTED_MODULE_2__.RenderingFactory)\n/* harmony export */ });\n/* harmony import */ var _Canvas2DRendering__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Canvas2DRendering */ \"./src/ts/Rendering/Canvas2DRendering/index.ts\");\n/* harmony import */ var _HtmlCanvas__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./HtmlCanvas */ \"./src/ts/Rendering/HtmlCanvas.ts\");\n/* harmony import */ var _RenderingFactory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./RenderingFactory */ \"./src/ts/Rendering/RenderingFactory.ts\");\n\r\n\r\n\r\n\n\n//# sourceURL=webpack://arcadium/./src/ts/Rendering/index.ts?");

/***/ }),

/***/ "./src/ts/Ui/Mouse.ts":
/*!****************************!*\
  !*** ./src/ts/Ui/Mouse.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Mouse\": () => (/* binding */ Mouse)\n/* harmony export */ });\n/* harmony import */ var _MouseEvents__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MouseEvents */ \"./src/ts/Ui/MouseEvents.ts\");\n/* harmony import */ var _Geom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Geom */ \"./src/ts/Geom/index.ts\");\n\r\n\r\nclass Mouse {\r\n    constructor(canvas) {\r\n        this.canvas = canvas;\r\n        this.canvas.addEventListener('mousemove', (evt) => {\r\n            this._x = evt.offsetX;\r\n            this._y = evt.offsetY;\r\n        });\r\n    }\r\n    get x() {\r\n        return this._x;\r\n    }\r\n    get y() {\r\n        return this._y;\r\n    }\r\n    isOver(sprite) {\r\n        return sprite.absoluteRectangle.contains({ x: this.x, y: this.y });\r\n    }\r\n    on(eventName, listener, options) {\r\n        this.canvas.addEventListener(eventName, listener);\r\n    }\r\n    track(sprite, eventName, callback) {\r\n        switch (eventName) {\r\n            case _MouseEvents__WEBPACK_IMPORTED_MODULE_0__.MouseEvents.MOUSE_OVER:\r\n                this.onOver(sprite, callback);\r\n                break;\r\n            case _MouseEvents__WEBPACK_IMPORTED_MODULE_0__.MouseEvents.MOUSE_OUT:\r\n                this.onOut(sprite, callback);\r\n                break;\r\n            case _MouseEvents__WEBPACK_IMPORTED_MODULE_0__.MouseEvents.CLICK:\r\n            case _MouseEvents__WEBPACK_IMPORTED_MODULE_0__.MouseEvents.MOUSE_DOWN:\r\n            case _MouseEvents__WEBPACK_IMPORTED_MODULE_0__.MouseEvents.MOUSE_UP:\r\n                this.onClickableEvent(sprite, eventName, callback);\r\n                break;\r\n            default:\r\n                throw new Error('event not managed');\r\n        }\r\n    }\r\n    unTrack() {\r\n        //todo\r\n    }\r\n    onOver(sprite, callback) {\r\n        this.on('mousemove', (evt) => {\r\n            if (this.isOver(sprite)) {\r\n                //todo faire un vrai event en arg.\r\n                callback(evt, sprite, _MouseEvents__WEBPACK_IMPORTED_MODULE_0__.MouseEvents.MOUSE_OVER);\r\n            }\r\n        });\r\n    }\r\n    onOut(sprite, callback) {\r\n        this.on('mousemove', (evt) => {\r\n            if (!this.isOver(sprite)) {\r\n                callback(evt, sprite, _MouseEvents__WEBPACK_IMPORTED_MODULE_0__.MouseEvents.MOUSE_OUT);\r\n            }\r\n        });\r\n    }\r\n    onClick(sprite, callback) {\r\n        this.onClickableEvent(sprite, _MouseEvents__WEBPACK_IMPORTED_MODULE_0__.MouseEvents.CLICK, callback);\r\n    }\r\n    onDrag(sprite, onDrag, onDrop) {\r\n        console.warn('this function is experimental');\r\n        let originalDistance = null;\r\n        this.onClickableEvent(sprite, _MouseEvents__WEBPACK_IMPORTED_MODULE_0__.MouseEvents.MOUSE_UP, () => {\r\n            originalDistance = null;\r\n            onDrop();\r\n        });\r\n        this.onClickableEvent(sprite, _MouseEvents__WEBPACK_IMPORTED_MODULE_0__.MouseEvents.MOUSE_DOWN, () => {\r\n            originalDistance = new _Geom__WEBPACK_IMPORTED_MODULE_1__.Vector(new _Geom__WEBPACK_IMPORTED_MODULE_1__.Point(sprite.absoluteRectangle), new _Geom__WEBPACK_IMPORTED_MODULE_1__.Point(this));\r\n        });\r\n        this.on('mousemove', (evt) => {\r\n            if (!originalDistance) {\r\n                return;\r\n            }\r\n            sprite.rectangle.coordinates = sprite.rectangle.coordinates.subtract(originalDistance.subtract(new _Geom__WEBPACK_IMPORTED_MODULE_1__.Vector(sprite.absoluteRectangle, this)));\r\n            onDrag();\r\n        });\r\n    }\r\n    setCursorAsPoint(sprite) {\r\n        this.onOver(sprite, () => {\r\n            this.canvas.style.cursor = 'pointer';\r\n        });\r\n        this.onOut(sprite, () => {\r\n            this.canvas.style.cursor = 'default';\r\n        });\r\n    }\r\n    onClickableEvent(sprite, eventName, callback) {\r\n        this.setCursorAsPoint(sprite);\r\n        this.on(eventName, (evt) => {\r\n            if (this.isOver(sprite)) {\r\n                callback(evt, sprite, eventName);\r\n            }\r\n        });\r\n    }\r\n}\r\n\n\n//# sourceURL=webpack://arcadium/./src/ts/Ui/Mouse.ts?");

/***/ }),

/***/ "./src/ts/Ui/MouseEvents.ts":
/*!**********************************!*\
  !*** ./src/ts/Ui/MouseEvents.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"MouseEvents\": () => (/* binding */ MouseEvents)\n/* harmony export */ });\nvar MouseEvents;\r\n(function (MouseEvents) {\r\n    MouseEvents[\"MOUSE_OVER\"] = \"mouseover\";\r\n    MouseEvents[\"MOUSE_OUT\"] = \"mouseout\";\r\n    MouseEvents[\"CLICK\"] = \"click\";\r\n    MouseEvents[\"MOUSE_DOWN\"] = \"mousedown\";\r\n    MouseEvents[\"MOUSE_UP\"] = \"mouseup\";\r\n})(MouseEvents || (MouseEvents = {}));\r\n\n\n//# sourceURL=webpack://arcadium/./src/ts/Ui/MouseEvents.ts?");

/***/ }),

/***/ "./src/ts/Ui/index.ts":
/*!****************************!*\
  !*** ./src/ts/Ui/index.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Mouse\": () => (/* reexport safe */ _Mouse__WEBPACK_IMPORTED_MODULE_0__.Mouse),\n/* harmony export */   \"MouseEvents\": () => (/* reexport safe */ _MouseEvents__WEBPACK_IMPORTED_MODULE_1__.MouseEvents)\n/* harmony export */ });\n/* harmony import */ var _Mouse__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Mouse */ \"./src/ts/Ui/Mouse.ts\");\n/* harmony import */ var _MouseEvents__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MouseEvents */ \"./src/ts/Ui/MouseEvents.ts\");\n\r\n\r\n\n\n//# sourceURL=webpack://arcadium/./src/ts/Ui/index.ts?");

/***/ }),

/***/ "./src/ts/index.ts":
/*!*************************!*\
  !*** ./src/ts/index.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Motion\": () => (/* reexport safe */ _Core__WEBPACK_IMPORTED_MODULE_0__.Motion),\n/* harmony export */   \"MotionEvents\": () => (/* reexport safe */ _Core__WEBPACK_IMPORTED_MODULE_0__.MotionEvents),\n/* harmony export */   \"MotionState\": () => (/* reexport safe */ _Core__WEBPACK_IMPORTED_MODULE_0__.MotionState),\n/* harmony export */   \"Image\": () => (/* reexport safe */ _Display__WEBPACK_IMPORTED_MODULE_1__.Image),\n/* harmony export */   \"Shadow\": () => (/* reexport safe */ _Display__WEBPACK_IMPORTED_MODULE_1__.Shadow),\n/* harmony export */   \"Shape\": () => (/* reexport safe */ _Display__WEBPACK_IMPORTED_MODULE_1__.Shape),\n/* harmony export */   \"Sprite\": () => (/* reexport safe */ _Display__WEBPACK_IMPORTED_MODULE_1__.Sprite),\n/* harmony export */   \"Text\": () => (/* reexport safe */ _Display__WEBPACK_IMPORTED_MODULE_1__.Text),\n/* harmony export */   \"EventListener\": () => (/* reexport safe */ _Event__WEBPACK_IMPORTED_MODULE_2__.EventListener),\n/* harmony export */   \"Angle\": () => (/* reexport safe */ _Geom__WEBPACK_IMPORTED_MODULE_3__.Angle),\n/* harmony export */   \"Point\": () => (/* reexport safe */ _Geom__WEBPACK_IMPORTED_MODULE_3__.Point),\n/* harmony export */   \"Rectangle\": () => (/* reexport safe */ _Geom__WEBPACK_IMPORTED_MODULE_3__.Rectangle),\n/* harmony export */   \"Transformation\": () => (/* reexport safe */ _Geom__WEBPACK_IMPORTED_MODULE_3__.Transformation),\n/* harmony export */   \"Vector\": () => (/* reexport safe */ _Geom__WEBPACK_IMPORTED_MODULE_3__.Vector),\n/* harmony export */   \"Services\": () => (/* reexport safe */ _Global__WEBPACK_IMPORTED_MODULE_4__.Services),\n/* harmony export */   \"Mouse\": () => (/* reexport safe */ _Ui__WEBPACK_IMPORTED_MODULE_5__.Mouse),\n/* harmony export */   \"MouseEvents\": () => (/* reexport safe */ _Ui__WEBPACK_IMPORTED_MODULE_5__.MouseEvents),\n/* harmony export */   \"BaseSpriteRendering\": () => (/* reexport safe */ _Rendering__WEBPACK_IMPORTED_MODULE_6__.BaseSpriteRendering),\n/* harmony export */   \"Canvas2DRendering\": () => (/* reexport safe */ _Rendering__WEBPACK_IMPORTED_MODULE_6__.Canvas2DRendering),\n/* harmony export */   \"HtmlCanvas\": () => (/* reexport safe */ _Rendering__WEBPACK_IMPORTED_MODULE_6__.HtmlCanvas),\n/* harmony export */   \"RenderingFactory\": () => (/* reexport safe */ _Rendering__WEBPACK_IMPORTED_MODULE_6__.RenderingFactory),\n/* harmony export */   \"SpriteBaseShapeRendering\": () => (/* reexport safe */ _Rendering__WEBPACK_IMPORTED_MODULE_6__.SpriteBaseShapeRendering),\n/* harmony export */   \"SpriteBoundariesRendering\": () => (/* reexport safe */ _Rendering__WEBPACK_IMPORTED_MODULE_6__.SpriteBoundariesRendering),\n/* harmony export */   \"SpriteCircleShapeRendering\": () => (/* reexport safe */ _Rendering__WEBPACK_IMPORTED_MODULE_6__.SpriteCircleShapeRendering),\n/* harmony export */   \"SpriteImageRendering\": () => (/* reexport safe */ _Rendering__WEBPACK_IMPORTED_MODULE_6__.SpriteImageRendering),\n/* harmony export */   \"SpriteRectangleShapeRendering\": () => (/* reexport safe */ _Rendering__WEBPACK_IMPORTED_MODULE_6__.SpriteRectangleShapeRendering),\n/* harmony export */   \"SpriteRenderingFunctionAdapter\": () => (/* reexport safe */ _Rendering__WEBPACK_IMPORTED_MODULE_6__.SpriteRenderingFunctionAdapter),\n/* harmony export */   \"SpriteTextRendering\": () => (/* reexport safe */ _Rendering__WEBPACK_IMPORTED_MODULE_6__.SpriteTextRendering),\n/* harmony export */   \"SpriteTriangleShapeRendering\": () => (/* reexport safe */ _Rendering__WEBPACK_IMPORTED_MODULE_6__.SpriteTriangleShapeRendering),\n/* harmony export */   \"Arcadium\": () => (/* reexport safe */ _Arcadium__WEBPACK_IMPORTED_MODULE_7__.Arcadium),\n/* harmony export */   \"arca\": () => (/* reexport safe */ _Arcadium__WEBPACK_IMPORTED_MODULE_7__.arca)\n/* harmony export */ });\n/* harmony import */ var _Core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Core */ \"./src/ts/Core/index.ts\");\n/* harmony import */ var _Display__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Display */ \"./src/ts/Display/index.ts\");\n/* harmony import */ var _Event__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Event */ \"./src/ts/Event/index.ts\");\n/* harmony import */ var _Geom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Geom */ \"./src/ts/Geom/index.ts\");\n/* harmony import */ var _Global__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Global */ \"./src/ts/Global/index.ts\");\n/* harmony import */ var _Ui__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Ui */ \"./src/ts/Ui/index.ts\");\n/* harmony import */ var _Rendering__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Rendering */ \"./src/ts/Rendering/index.ts\");\n/* harmony import */ var _Arcadium__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Arcadium */ \"./src/ts/Arcadium.ts\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\n\n//# sourceURL=webpack://arcadium/./src/ts/index.ts?");

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
/******/ 			// no module.id needed
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
/************************************************************************/
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
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/ts/index.ts");
/******/ 	
/******/ 	return __webpack_exports__;
/******/ })()
;
});