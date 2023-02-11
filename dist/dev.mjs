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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"arca\": () => (/* binding */ arca),\n/* harmony export */   \"Arcadium\": () => (/* binding */ Arcadium)\n/* harmony export */ });\n/* harmony import */ var _Display_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Display/index */ \"./src/ts/Display/index.ts\");\n/* harmony import */ var _Geom_Rectangle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Geom/Rectangle */ \"./src/ts/Geom/Rectangle.ts\");\n/* harmony import */ var _Rendering_HtmlCanvas__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Rendering/HtmlCanvas */ \"./src/ts/Rendering/HtmlCanvas.ts\");\n/* harmony import */ var _Global_Services__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Global/Services */ \"./src/ts/Global/Services.ts\");\n\n\n\n\nfunction arca(canvas, contextDimension = '2d') {\n    return new Arcadium(canvas, contextDimension);\n}\nclass Arcadium {\n    constructor(canvas, contextDimension = '2d', services) {\n        this.isDebugMode = false;\n        this.services = services || new _Global_Services__WEBPACK_IMPORTED_MODULE_3__.Services(new _Rendering_HtmlCanvas__WEBPACK_IMPORTED_MODULE_2__.HtmlCanvas(canvas, contextDimension), window);\n        this.stage = new _Display_index__WEBPACK_IMPORTED_MODULE_0__.Sprite(null, new _Geom_Rectangle__WEBPACK_IMPORTED_MODULE_1__.Rectangle({\n            x: 0,\n            y: 0,\n            width: canvas.width,\n            height: canvas.height\n        }));\n        this.rendering = this.services.renderingFactory.create(this.services.htmlCanvas);\n    }\n    display() {\n        this.clear();\n        this.rendering.renderSprite(this.services.htmlCanvas.context, this.stage, this.isDebugMode);\n    }\n    clear() {\n        this.rendering.clear(this.services.htmlCanvas.context, this.stage);\n    }\n    setup(callback) {\n        callback(this);\n        this.display();\n        return this;\n    }\n    loop(callback) {\n        this.services.motion.onFrame(() => {\n            this.setup(callback);\n        });\n        this.services.motion.start();\n        return this.services.motion;\n    }\n    on(eventName, callback) {\n        this.services.eventListener.on(eventName, callback);\n    }\n    get ui() {\n        return {\n            mouse: this.services.mouse\n        };\n    }\n}\n\n\n//# sourceURL=webpack://arcadium/./src/ts/Arcadium.ts?");

/***/ }),

/***/ "./src/ts/Core/Motion.ts":
/*!*******************************!*\
  !*** ./src/ts/Core/Motion.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Motion\": () => (/* binding */ Motion)\n/* harmony export */ });\n/* harmony import */ var _MotionState__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MotionState */ \"./src/ts/Core/MotionState.ts\");\n/* harmony import */ var _MotionEvents__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MotionEvents */ \"./src/ts/Core/MotionEvents.ts\");\n\n\nclass Motion {\n    constructor(animationFrameProvider, eventListener) {\n        this.animationId = 0;\n        this.animationFrameProvider = animationFrameProvider;\n        this.eventListener = eventListener;\n        this.state = _MotionState__WEBPACK_IMPORTED_MODULE_0__.MotionState.Stop;\n    }\n    isRunning() {\n        return this.state === _MotionState__WEBPACK_IMPORTED_MODULE_0__.MotionState.Start;\n    }\n    onFrame(callback) {\n        this.eventListener.on(_MotionEvents__WEBPACK_IMPORTED_MODULE_1__.MotionEvents.FRAME, callback);\n    }\n    start() {\n        this.state = _MotionState__WEBPACK_IMPORTED_MODULE_0__.MotionState.Start;\n        this.frame = 0;\n        this.play();\n    }\n    pause() {\n        this.state = _MotionState__WEBPACK_IMPORTED_MODULE_0__.MotionState.Pause;\n    }\n    stop() {\n        this.state = _MotionState__WEBPACK_IMPORTED_MODULE_0__.MotionState.Stop;\n        this.animationFrameProvider.cancelAnimationFrame(this.animationId);\n    }\n    play() {\n        //doc https://developer.mozilla.org/fr/docs/Games/Anatomy#construire_une_boucle_principale_encore_plus_optimis%C3%A9e_en_javascript\n        this.animationId = this.animationFrameProvider.requestAnimationFrame(() => {\n            this.play();\n        });\n        if (this.isRunning()) {\n            ++this.frame;\n            this.eventListener.fire(_MotionEvents__WEBPACK_IMPORTED_MODULE_1__.MotionEvents.FRAME, this.frame);\n        }\n    }\n}\n\n\n//# sourceURL=webpack://arcadium/./src/ts/Core/Motion.ts?");

/***/ }),

/***/ "./src/ts/Core/MotionEvents.ts":
/*!*************************************!*\
  !*** ./src/ts/Core/MotionEvents.ts ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"MotionEvents\": () => (/* binding */ MotionEvents)\n/* harmony export */ });\nvar MotionEvents;\n(function (MotionEvents) {\n    MotionEvents[\"FRAME\"] = \"frame\";\n})(MotionEvents || (MotionEvents = {}));\n\n\n//# sourceURL=webpack://arcadium/./src/ts/Core/MotionEvents.ts?");

/***/ }),

/***/ "./src/ts/Core/MotionState.ts":
/*!************************************!*\
  !*** ./src/ts/Core/MotionState.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"MotionState\": () => (/* binding */ MotionState)\n/* harmony export */ });\nvar MotionState;\n(function (MotionState) {\n    MotionState[MotionState[\"Start\"] = 0] = \"Start\";\n    MotionState[MotionState[\"Pause\"] = 1] = \"Pause\";\n    MotionState[MotionState[\"Stop\"] = 2] = \"Stop\";\n})(MotionState || (MotionState = {}));\n\n\n//# sourceURL=webpack://arcadium/./src/ts/Core/MotionState.ts?");

/***/ }),

/***/ "./src/ts/Core/index.ts":
/*!******************************!*\
  !*** ./src/ts/Core/index.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Motion\": () => (/* reexport safe */ _Motion__WEBPACK_IMPORTED_MODULE_0__.Motion),\n/* harmony export */   \"MotionEvents\": () => (/* reexport safe */ _MotionEvents__WEBPACK_IMPORTED_MODULE_1__.MotionEvents),\n/* harmony export */   \"MotionState\": () => (/* reexport safe */ _MotionState__WEBPACK_IMPORTED_MODULE_2__.MotionState)\n/* harmony export */ });\n/* harmony import */ var _Motion__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Motion */ \"./src/ts/Core/Motion.ts\");\n/* harmony import */ var _MotionEvents__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MotionEvents */ \"./src/ts/Core/MotionEvents.ts\");\n/* harmony import */ var _MotionState__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MotionState */ \"./src/ts/Core/MotionState.ts\");\n\n\n\n\n\n//# sourceURL=webpack://arcadium/./src/ts/Core/index.ts?");

/***/ }),

/***/ "./src/ts/Display/Image.ts":
/*!*********************************!*\
  !*** ./src/ts/Display/Image.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Image\": () => (/* binding */ Image)\n/* harmony export */ });\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ \"./src/ts/Display/index.ts\");\n/* harmony import */ var _Rendering_Canvas2DRendering_SpriteImageRendering__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Rendering/Canvas2DRendering/SpriteImageRendering */ \"./src/ts/Rendering/Canvas2DRendering/SpriteImageRendering.ts\");\n\n\nclass Image extends _index__WEBPACK_IMPORTED_MODULE_0__.Sprite {\n    constructor(source, parent, rectangle, rendering) {\n        super(parent, rectangle, rendering || new _Rendering_Canvas2DRendering_SpriteImageRendering__WEBPACK_IMPORTED_MODULE_1__.SpriteImageRendering());\n        this.source = source;\n    }\n}\n\n\n//# sourceURL=webpack://arcadium/./src/ts/Display/Image.ts?");

/***/ }),

/***/ "./src/ts/Display/Shadow.ts":
/*!**********************************!*\
  !*** ./src/ts/Display/Shadow.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Shadow\": () => (/* binding */ Shadow)\n/* harmony export */ });\nclass Shadow {\n    constructor() {\n        this.blur = 0;\n    }\n}\n\n\n//# sourceURL=webpack://arcadium/./src/ts/Display/Shadow.ts?");

/***/ }),

/***/ "./src/ts/Display/Shape.ts":
/*!*********************************!*\
  !*** ./src/ts/Display/Shape.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Shape\": () => (/* binding */ Shape)\n/* harmony export */ });\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ \"./src/ts/Display/index.ts\");\n\nclass Shape extends _index__WEBPACK_IMPORTED_MODULE_0__.Sprite {\n    constructor() {\n        super(...arguments);\n        this.lineCap = 'butt';\n        this.lineDashOffset = 0.0;\n        this.lineJoin = 'miter';\n        this.lineWidth = 1;\n        this.miterLimit = 10.0;\n        this.lineDash = [];\n    }\n}\n\n\n//# sourceURL=webpack://arcadium/./src/ts/Display/Shape.ts?");

/***/ }),

/***/ "./src/ts/Display/Sprite.ts":
/*!**********************************!*\
  !*** ./src/ts/Display/Sprite.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Sprite\": () => (/* binding */ Sprite)\n/* harmony export */ });\n/* harmony import */ var _Geom_Rectangle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Geom/Rectangle */ \"./src/ts/Geom/Rectangle.ts\");\n/* harmony import */ var _Geom_Angle__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Geom/Angle */ \"./src/ts/Geom/Angle.ts\");\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./index */ \"./src/ts/Display/index.ts\");\n/* harmony import */ var _Rendering_Canvas2DRendering_SpriteRenderingFunctionAdapter__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Rendering/Canvas2DRendering/SpriteRenderingFunctionAdapter */ \"./src/ts/Rendering/Canvas2DRendering/SpriteRenderingFunctionAdapter.ts\");\n\n\n\n\n\n\nvar relativeX;\n(function (relativeX) {\n    relativeX[\"left\"] = \"left\";\n    relativeX[\"right\"] = \"right\";\n    relativeX[\"center\"] = \"center\";\n})(relativeX || (relativeX = {}));\nvar relativeY;\n(function (relativeY) {\n    relativeY[\"top\"] = \"top\";\n    relativeY[\"bottom\"] = \"bottom\";\n    relativeY[\"center\"] = \"center\";\n})(relativeY || (relativeY = {}));\nclass Sprite {\n    constructor(parent, rectangle, rendering) {\n        this.children = [];\n        this._rendering = null;\n        this.isVisible = true;\n        this.alpha = 1;\n        this.rotation = new _Geom_Angle__WEBPACK_IMPORTED_MODULE_1__.Angle(0);\n        this._scale = null;\n        this._translation = null;\n        this._transformation = null;\n        this.shadow = null;\n        this.blendMode = ''; //see https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/globalCompositeOperation\n        this.rendering = rendering;\n        this.parent = parent;\n        if (this.parent) {\n            this.parent.children.push(this);\n        }\n        if (!rectangle) {\n            if (this.parent && this.parent.rectangle) {\n                this.rectangle = this.parent.rectangle;\n            }\n            else {\n                throw new Error('no base rectangle defined');\n            }\n        }\n        else if (!(rectangle instanceof _Geom_Rectangle__WEBPACK_IMPORTED_MODULE_0__.Rectangle)) {\n            this.rectangle = new _Geom_Rectangle__WEBPACK_IMPORTED_MODULE_0__.Rectangle({ x: 0, y: 0, width: 0, height: 0 });\n            if (!this.parent) {\n                throw new Error('relative rectangle of sprite needs a parent');\n            }\n            if (!rectangle.width) {\n                this.rectangle.width = this.parent.rectangle.width;\n            }\n            else if (typeof rectangle.width === 'string') {\n                //todo\n                throw new Error('sorry, not implemented');\n            }\n            else {\n                this.rectangle.width = rectangle.width;\n            }\n            if (!rectangle.height) {\n                this.rectangle.height = this.parent.rectangle.height;\n            }\n            else if (typeof rectangle.height === 'string') {\n                //todo\n                throw new Error('sorry, not implemented');\n            }\n            else {\n                this.rectangle.height = rectangle.height;\n            }\n            if (!rectangle.x) {\n                this.rectangle.x = 0;\n            }\n            else if (typeof rectangle.x === 'string') {\n                switch (rectangle.x) {\n                    case relativeX.left:\n                        this.rectangle.x = 0;\n                        break;\n                    case relativeX.center:\n                        this.rectangle.x = this.parent.rectangle.center.x - (rectangle.width / 2);\n                        break;\n                    case relativeX.right:\n                        this.rectangle.x = this.parent.rectangle.right - rectangle.width;\n                        break;\n                }\n            }\n            else {\n                this.rectangle.x = rectangle.x;\n            }\n            if (!rectangle.y) {\n                this.rectangle.y = 0;\n            }\n            else if (typeof rectangle.y === 'string') {\n                switch (rectangle.y) {\n                    case 'top':\n                        this.rectangle.y = 0;\n                        break;\n                    case 'center':\n                        this.rectangle.y = this.parent.rectangle.center.y - (rectangle.height / 2);\n                        break;\n                    case 'bottom':\n                        this.rectangle.y = this.parent.rectangle.bottom - rectangle.height;\n                        break;\n                }\n            }\n            else {\n                this.rectangle.y = rectangle.y;\n            }\n        }\n        else {\n            this.rectangle = rectangle;\n        }\n    }\n    set rendering(rendering) {\n        if (rendering instanceof Function) {\n            rendering = new _Rendering_Canvas2DRendering_SpriteRenderingFunctionAdapter__WEBPACK_IMPORTED_MODULE_3__.SpriteRenderingFunctionAdapter(rendering);\n        }\n        this._rendering = rendering;\n    }\n    get rendering() {\n        return this._rendering;\n    }\n    get x() {\n        return this.rectangle.x;\n    }\n    set x(x) {\n        this.rectangle.x = x;\n    }\n    get y() {\n        return this.rectangle.y;\n    }\n    set y(y) {\n        this.rectangle.y = y;\n    }\n    get width() {\n        return this.rectangle.width;\n    }\n    set width(width) {\n        this.rectangle.width = width;\n    }\n    get height() {\n        return this.rectangle.height;\n    }\n    set height(height) {\n        this.rectangle.height = height;\n    }\n    get scale() {\n        return this._scale;\n    }\n    set scale(scale) {\n        this._scale = scale;\n    }\n    get translation() {\n        return this._translation;\n    }\n    set translation(translation) {\n        this._translation = translation;\n    }\n    get transformation() {\n        return this._transformation;\n    }\n    set transformation(transformation) {\n        this._transformation = transformation;\n    }\n    get absoluteRectangle() {\n        if (!this.parent) {\n            return new _Geom_Rectangle__WEBPACK_IMPORTED_MODULE_0__.Rectangle(this.rectangle);\n        }\n        return this.parent.absoluteRectangle.add(this.rectangle);\n    }\n    addSprite(rectangle, rendering) {\n        return new Sprite(this, rectangle, rendering);\n    }\n    addImage(image, rectangle, rendering) {\n        return new _index__WEBPACK_IMPORTED_MODULE_2__.Image(image, this, rectangle, rendering);\n    }\n    addText(text, rectangle, rendering) {\n        return new _index__WEBPACK_IMPORTED_MODULE_2__.Text(text, this, rectangle, rendering);\n    }\n    addShape(rectangle, rendering) {\n        return new _index__WEBPACK_IMPORTED_MODULE_2__.Shape(this, rectangle, rendering);\n    }\n}\n\n\n//# sourceURL=webpack://arcadium/./src/ts/Display/Sprite.ts?");

/***/ }),

/***/ "./src/ts/Display/Text.ts":
/*!********************************!*\
  !*** ./src/ts/Display/Text.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Text\": () => (/* binding */ Text)\n/* harmony export */ });\n/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./index */ \"./src/ts/Display/index.ts\");\n/* harmony import */ var _Rendering_Canvas2DRendering_SpriteTextRendering__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Rendering/Canvas2DRendering/SpriteTextRendering */ \"./src/ts/Rendering/Canvas2DRendering/SpriteTextRendering.ts\");\n\n\nclass Text extends _index__WEBPACK_IMPORTED_MODULE_0__.Sprite {\n    constructor(text, parent, rectangle, rendering) {\n        super(parent, rectangle, rendering || new _Rendering_Canvas2DRendering_SpriteTextRendering__WEBPACK_IMPORTED_MODULE_1__.SpriteTextRendering());\n        this.adjustToWidth = false;\n        this.lineHeight = 15;\n        this.text = text;\n    }\n}\n\n\n//# sourceURL=webpack://arcadium/./src/ts/Display/Text.ts?");

/***/ }),

/***/ "./src/ts/Display/index.ts":
/*!*********************************!*\
  !*** ./src/ts/Display/index.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Sprite\": () => (/* reexport safe */ _Sprite__WEBPACK_IMPORTED_MODULE_0__.Sprite),\n/* harmony export */   \"Image\": () => (/* reexport safe */ _Image__WEBPACK_IMPORTED_MODULE_1__.Image),\n/* harmony export */   \"Shape\": () => (/* reexport safe */ _Shape__WEBPACK_IMPORTED_MODULE_2__.Shape),\n/* harmony export */   \"Text\": () => (/* reexport safe */ _Text__WEBPACK_IMPORTED_MODULE_3__.Text),\n/* harmony export */   \"Shadow\": () => (/* reexport safe */ _Shadow__WEBPACK_IMPORTED_MODULE_4__.Shadow)\n/* harmony export */ });\n/* harmony import */ var _Sprite__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Sprite */ \"./src/ts/Display/Sprite.ts\");\n/* harmony import */ var _Image__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Image */ \"./src/ts/Display/Image.ts\");\n/* harmony import */ var _Shape__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Shape */ \"./src/ts/Display/Shape.ts\");\n/* harmony import */ var _Text__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Text */ \"./src/ts/Display/Text.ts\");\n/* harmony import */ var _Shadow__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Shadow */ \"./src/ts/Display/Shadow.ts\");\n//avoid circular dependencies issues\n\n\n\n\n//normal export\n\n\n\n//# sourceURL=webpack://arcadium/./src/ts/Display/index.ts?");

/***/ }),

/***/ "./src/ts/Event/EventListener.ts":
/*!***************************************!*\
  !*** ./src/ts/Event/EventListener.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"EventListener\": () => (/* binding */ EventListener)\n/* harmony export */ });\nclass EventListener {\n    constructor() {\n        this.callbacks = {};\n    }\n    on(eventName, callback) {\n        if (!(eventName in this.callbacks)) {\n            this.callbacks[eventName] = [];\n        }\n        this.callbacks[eventName].push(callback);\n    }\n    fire(eventName, data) {\n        if (eventName in this.callbacks) {\n            for (let callback of this.callbacks[eventName]) {\n                callback(data);\n            }\n        }\n    }\n}\n\n\n//# sourceURL=webpack://arcadium/./src/ts/Event/EventListener.ts?");

/***/ }),

/***/ "./src/ts/Event/EventListenerInterface.ts":
/*!************************************************!*\
  !*** ./src/ts/Event/EventListenerInterface.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n\n//# sourceURL=webpack://arcadium/./src/ts/Event/EventListenerInterface.ts?");

/***/ }),

/***/ "./src/ts/Event/index.ts":
/*!*******************************!*\
  !*** ./src/ts/Event/index.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"EventListener\": () => (/* reexport safe */ _EventListener__WEBPACK_IMPORTED_MODULE_0__.EventListener)\n/* harmony export */ });\n/* harmony import */ var _EventListener__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./EventListener */ \"./src/ts/Event/EventListener.ts\");\n/* harmony import */ var _EventListenerInterface__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./EventListenerInterface */ \"./src/ts/Event/EventListenerInterface.ts\");\n\n\n\n\n//# sourceURL=webpack://arcadium/./src/ts/Event/index.ts?");

/***/ }),

/***/ "./src/ts/Geom/Angle.ts":
/*!******************************!*\
  !*** ./src/ts/Geom/Angle.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Angle\": () => (/* binding */ Angle)\n/* harmony export */ });\nclass Angle {\n    constructor(degrees) {\n        this.value = 0;\n        this.degrees = degrees;\n    }\n    get degrees() {\n        return this.value;\n    }\n    set degrees(degrees) {\n        this.value = degrees;\n    }\n    get radians() {\n        return this.degrees * (Math.PI / 180);\n    }\n    set radians(radians) {\n        this.degrees = radians * (180 / Math.PI);\n    }\n    add(angle) {\n        this.degrees += angle.degrees;\n    }\n    subtract(angle) {\n        this.degrees -= angle.degrees;\n    }\n}\n\n\n//# sourceURL=webpack://arcadium/./src/ts/Geom/Angle.ts?");

/***/ }),

/***/ "./src/ts/Geom/Point.ts":
/*!******************************!*\
  !*** ./src/ts/Geom/Point.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Point\": () => (/* binding */ Point)\n/* harmony export */ });\nclass Point {\n    constructor(point) {\n        this.x = point.x;\n        this.y = point.y;\n    }\n    add(point) {\n        return new Point({\n            x: this.x + point.x,\n            y: this.y + point.y\n        });\n    }\n    subtract(point) {\n        return new Point({\n            x: this.x - point.x,\n            y: this.y - point.y\n        });\n    }\n    isOver(sprite) {\n        return sprite.absoluteRectangle.contains(this);\n    }\n}\n\n\n//# sourceURL=webpack://arcadium/./src/ts/Geom/Point.ts?");

/***/ }),

/***/ "./src/ts/Geom/PointInterface.ts":
/*!***************************************!*\
  !*** ./src/ts/Geom/PointInterface.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n\n//# sourceURL=webpack://arcadium/./src/ts/Geom/PointInterface.ts?");

/***/ }),

/***/ "./src/ts/Geom/Rectangle.ts":
/*!**********************************!*\
  !*** ./src/ts/Geom/Rectangle.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Rectangle\": () => (/* binding */ Rectangle)\n/* harmony export */ });\n/* harmony import */ var _Point__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Point */ \"./src/ts/Geom/Point.ts\");\n/* harmony import */ var _Vector__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Vector */ \"./src/ts/Geom/Vector.ts\");\n\n\nclass Rectangle {\n    constructor(rectangle) {\n        if (rectangle.coordinates) {\n            this.coordinates = rectangle.coordinates;\n        }\n        else {\n            this.coordinates = {\n                x: rectangle.x,\n                y: rectangle.y\n            };\n        }\n        if (rectangle.size) {\n            this.size = rectangle.size;\n        }\n        else {\n            this.size = {\n                x: rectangle.width,\n                y: rectangle.height\n            };\n        }\n    }\n    get coordinates() {\n        return this._coordinates;\n    }\n    set coordinates(coordinates) {\n        this._coordinates = new _Point__WEBPACK_IMPORTED_MODULE_0__.Point(coordinates);\n    }\n    get size() {\n        return this._size;\n    }\n    set size(size) {\n        this._size = new _Point__WEBPACK_IMPORTED_MODULE_0__.Point(size);\n    }\n    get x() {\n        return this.coordinates.x;\n    }\n    get y() {\n        return this.coordinates.y;\n    }\n    get width() {\n        return this.size.x;\n    }\n    get height() {\n        return this.size.y;\n    }\n    set x(x) {\n        this.coordinates.x = x;\n    }\n    set y(y) {\n        this.coordinates.y = y;\n    }\n    set width(width) {\n        this.size.x = width;\n    }\n    set height(height) {\n        this.size.y = height;\n    }\n    get left() {\n        return this.x;\n    }\n    get right() {\n        return this.x + this.width;\n    }\n    get top() {\n        return this.y;\n    }\n    get bottom() {\n        return this.y + this.height;\n    }\n    get topLeft() {\n        return new _Point__WEBPACK_IMPORTED_MODULE_0__.Point({\n            x: this.left,\n            y: this.top\n        });\n    }\n    get topRight() {\n        return new _Point__WEBPACK_IMPORTED_MODULE_0__.Point({\n            x: this.right,\n            y: this.top\n        });\n    }\n    get bottomLeft() {\n        return new _Point__WEBPACK_IMPORTED_MODULE_0__.Point({\n            x: this.left,\n            y: this.bottom\n        });\n    }\n    get bottomRight() {\n        return new _Point__WEBPACK_IMPORTED_MODULE_0__.Point({\n            x: this.right,\n            y: this.bottom\n        });\n    }\n    get center() {\n        return new _Point__WEBPACK_IMPORTED_MODULE_0__.Point({\n            x: this.x + (this.width / 2),\n            y: this.y + (this.height / 2)\n        });\n    }\n    add(rect) {\n        const rectangle = new Rectangle(rect);\n        return new Rectangle({\n            coordinates: this.coordinates.add(rectangle.coordinates),\n            size: rectangle.size, // do not add size!\n        });\n    }\n    contains(point) {\n        if (point.x < this.left) {\n            return false;\n        }\n        if (point.x > this.right) {\n            return false;\n        }\n        if (point.y < this.top) {\n            return false;\n        }\n        if (point.y > this.bottom) {\n            return false;\n        }\n        return true;\n    }\n    calculateAverageDistance(rect) {\n        const rectangle = new Rectangle(rect);\n        return new _Vector__WEBPACK_IMPORTED_MODULE_1__.Vector(this.center, rectangle.center);\n    }\n    calculateIntersection(toIntersect) {\n        const rectangle = new Rectangle(toIntersect);\n        let topLeft = this.calculateIntersectionTopLeft(rectangle);\n        if (!topLeft) {\n            return null;\n        }\n        let topRight = this.calculateIntersectionTopRight(rectangle);\n        if (!topLeft) {\n            return null;\n        }\n        let bottomLeft = this.calculateIntersectionBottomLeft(rectangle);\n        if (!topLeft) {\n            return null;\n        }\n        function fromAngle(topLeft, topRight, bottomLeft) {\n            if (topLeft.y != topRight.y || topLeft.x != bottomLeft.x) {\n                throw new Error('rectangle coordinates not valid');\n            }\n            return new Rectangle({\n                x: topLeft.x,\n                y: topLeft.y,\n                width: topRight.x - topLeft.x,\n                height: bottomLeft.y - topLeft.y\n            });\n        }\n        return fromAngle(topLeft, topRight, bottomLeft);\n    }\n    calculateIntersectionTopLeft(rectangle) {\n        if (this.contains(rectangle.topLeft)) {\n            return rectangle.topLeft;\n        }\n        if (rectangle.contains(this.topLeft)) {\n            return this.topLeft;\n        }\n        return null;\n    }\n    calculateIntersectionTopRight(rectangle) {\n        if (this.contains(rectangle.topRight)) {\n            return rectangle.topRight;\n        }\n        if (rectangle.contains(this.topRight)) {\n            return this.topRight;\n        }\n        return null;\n    }\n    calculateIntersectionBottomLeft(rectangle) {\n        if (this.contains(rectangle.bottomLeft)) {\n            return rectangle.bottomLeft;\n        }\n        if (rectangle.contains(this.bottomLeft)) {\n            return this.bottomLeft;\n        }\n        return null;\n    }\n}\n\n\n//# sourceURL=webpack://arcadium/./src/ts/Geom/Rectangle.ts?");

/***/ }),

/***/ "./src/ts/Geom/RectangleInterface.ts":
/*!*******************************************!*\
  !*** ./src/ts/Geom/RectangleInterface.ts ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n\n//# sourceURL=webpack://arcadium/./src/ts/Geom/RectangleInterface.ts?");

/***/ }),

/***/ "./src/ts/Geom/Transformation.ts":
/*!***************************************!*\
  !*** ./src/ts/Geom/Transformation.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Transformation\": () => (/* binding */ Transformation)\n/* harmony export */ });\nclass Transformation {\n    constructor(a, b, c, d, e, f) {\n        this.a = a;\n        this.b = b;\n        this.c = c;\n        this.d = d;\n        this.e = e;\n        this.f = f;\n    }\n}\n\n\n//# sourceURL=webpack://arcadium/./src/ts/Geom/Transformation.ts?");

/***/ }),

/***/ "./src/ts/Geom/TransformationInterface.ts":
/*!************************************************!*\
  !*** ./src/ts/Geom/TransformationInterface.ts ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n\n//# sourceURL=webpack://arcadium/./src/ts/Geom/TransformationInterface.ts?");

/***/ }),

/***/ "./src/ts/Geom/Vector.ts":
/*!*******************************!*\
  !*** ./src/ts/Geom/Vector.ts ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Vector\": () => (/* binding */ Vector)\n/* harmony export */ });\n/* harmony import */ var _Point__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Point */ \"./src/ts/Geom/Point.ts\");\n\nclass Vector {\n    constructor(a, b) {\n        this.a = a;\n        this.b = b;\n    }\n    get length() {\n        return Math.sqrt(Math.pow(this.b.x - this.a.x, 2)\n            + Math.pow(this.b.y - this.a.y, 2));\n    }\n    toPoint() {\n        return new _Point__WEBPACK_IMPORTED_MODULE_0__.Point({\n            x: this.b.x - this.a.x,\n            y: this.b.y - this.a.y,\n        });\n    }\n    add(vector) {\n        return this.toPoint().add(vector.toPoint());\n    }\n    subtract(vector) {\n        return this.toPoint().subtract(vector.toPoint());\n    }\n}\n\n\n//# sourceURL=webpack://arcadium/./src/ts/Geom/Vector.ts?");

/***/ }),

/***/ "./src/ts/Geom/index.ts":
/*!******************************!*\
  !*** ./src/ts/Geom/index.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Angle\": () => (/* reexport safe */ _Angle__WEBPACK_IMPORTED_MODULE_0__.Angle),\n/* harmony export */   \"Point\": () => (/* reexport safe */ _Point__WEBPACK_IMPORTED_MODULE_1__.Point),\n/* harmony export */   \"Rectangle\": () => (/* reexport safe */ _Rectangle__WEBPACK_IMPORTED_MODULE_3__.Rectangle),\n/* harmony export */   \"Transformation\": () => (/* reexport safe */ _Transformation__WEBPACK_IMPORTED_MODULE_5__.Transformation),\n/* harmony export */   \"Vector\": () => (/* reexport safe */ _Vector__WEBPACK_IMPORTED_MODULE_7__.Vector)\n/* harmony export */ });\n/* harmony import */ var _Angle__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Angle */ \"./src/ts/Geom/Angle.ts\");\n/* harmony import */ var _Point__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Point */ \"./src/ts/Geom/Point.ts\");\n/* harmony import */ var _PointInterface__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./PointInterface */ \"./src/ts/Geom/PointInterface.ts\");\n/* harmony import */ var _Rectangle__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Rectangle */ \"./src/ts/Geom/Rectangle.ts\");\n/* harmony import */ var _RectangleInterface__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./RectangleInterface */ \"./src/ts/Geom/RectangleInterface.ts\");\n/* harmony import */ var _Transformation__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Transformation */ \"./src/ts/Geom/Transformation.ts\");\n/* harmony import */ var _TransformationInterface__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./TransformationInterface */ \"./src/ts/Geom/TransformationInterface.ts\");\n/* harmony import */ var _Vector__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Vector */ \"./src/ts/Geom/Vector.ts\");\n\n\n\n\n\n\n\n\n\n\n//# sourceURL=webpack://arcadium/./src/ts/Geom/index.ts?");

/***/ }),

/***/ "./src/ts/Global/Services.ts":
/*!***********************************!*\
  !*** ./src/ts/Global/Services.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Services\": () => (/* binding */ Services)\n/* harmony export */ });\n/* harmony import */ var _Rendering_RenderingFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Rendering/RenderingFactory */ \"./src/ts/Rendering/RenderingFactory.ts\");\n/* harmony import */ var _Rendering_Canvas2DRendering_Canvas2DRendering__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../Rendering/Canvas2DRendering/Canvas2DRendering */ \"./src/ts/Rendering/Canvas2DRendering/Canvas2DRendering.ts\");\n/* harmony import */ var _Rendering_Canvas2DRendering_BaseSpriteRendering__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Rendering/Canvas2DRendering/BaseSpriteRendering */ \"./src/ts/Rendering/Canvas2DRendering/BaseSpriteRendering.ts\");\n/* harmony import */ var _Event_EventListener__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../Event/EventListener */ \"./src/ts/Event/EventListener.ts\");\n/* harmony import */ var _Core_Motion__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../Core/Motion */ \"./src/ts/Core/Motion.ts\");\n/* harmony import */ var _Rendering_Canvas2DRendering_SpriteBoundariesRendering__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../Rendering/Canvas2DRendering/SpriteBoundariesRendering */ \"./src/ts/Rendering/Canvas2DRendering/SpriteBoundariesRendering.ts\");\n/* harmony import */ var _Ui__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../Ui */ \"./src/ts/Ui/index.ts\");\n/* harmony import */ var _Rendering_Canvas2DRendering_SpriteBaseShapeRendering__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../Rendering/Canvas2DRendering/SpriteBaseShapeRendering */ \"./src/ts/Rendering/Canvas2DRendering/SpriteBaseShapeRendering.ts\");\n/* harmony import */ var _Rendering_Canvas2DRendering_SpriteTriangleShapeRendering__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../Rendering/Canvas2DRendering/SpriteTriangleShapeRendering */ \"./src/ts/Rendering/Canvas2DRendering/SpriteTriangleShapeRendering.ts\");\n/* harmony import */ var _Rendering_Canvas2DRendering_SpriteRectangleShapeRendering__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../Rendering/Canvas2DRendering/SpriteRectangleShapeRendering */ \"./src/ts/Rendering/Canvas2DRendering/SpriteRectangleShapeRendering.ts\");\n/* harmony import */ var _Rendering_Canvas2DRendering_SpriteCircleShapeRendering__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../Rendering/Canvas2DRendering/SpriteCircleShapeRendering */ \"./src/ts/Rendering/Canvas2DRendering/SpriteCircleShapeRendering.ts\");\n\n\n\n\n\n\n\n\n\n\n\nclass Services {\n    constructor(canvas, globalObject) {\n        this.services = {};\n        this.htmlCanvas = canvas;\n        this.animationFrameProvider = globalObject;\n    }\n    get(serviceId, init) {\n        if (!this.services[serviceId]) {\n            this.services[serviceId] = init();\n        }\n        return this.services[serviceId];\n    }\n    get renderingFactory() {\n        return this.get('RenderingFactory', () => {\n            return new _Rendering_RenderingFactory__WEBPACK_IMPORTED_MODULE_0__.RenderingFactory(this.canvas2DRendering);\n        });\n    }\n    get canvas2DRendering() {\n        return this.get('Canvas2DRendering', () => {\n            return new _Rendering_Canvas2DRendering_Canvas2DRendering__WEBPACK_IMPORTED_MODULE_1__.Canvas2DRendering(this.baseSpriteRendering, this.spriteBoundariesRendering);\n        });\n    }\n    get baseSpriteRendering() {\n        return this.get('BaseSpriteRendering', () => {\n            return new _Rendering_Canvas2DRendering_BaseSpriteRendering__WEBPACK_IMPORTED_MODULE_2__.BaseSpriteRendering();\n        });\n    }\n    get spriteBoundariesRendering() {\n        return this.get('SpriteBoundariesRendering', () => {\n            return new _Rendering_Canvas2DRendering_SpriteBoundariesRendering__WEBPACK_IMPORTED_MODULE_5__.SpriteBoundariesRendering();\n        });\n    }\n    get eventListener() {\n        return this.get('EventListener', () => {\n            return new _Event_EventListener__WEBPACK_IMPORTED_MODULE_3__.EventListener();\n        });\n    }\n    get motion() {\n        return this.get('Motion', () => {\n            return new _Core_Motion__WEBPACK_IMPORTED_MODULE_4__.Motion(this.animationFrameProvider, this.eventListener);\n        });\n    }\n    get mouse() {\n        return this.get('Mouse', () => {\n            return new _Ui__WEBPACK_IMPORTED_MODULE_6__.Mouse(this.htmlCanvas.htmlCanvasElement);\n        });\n    }\n    get spriteBaseShapeRendering() {\n        return this.get('SpriteBaseShapeRendering', () => {\n            return new _Rendering_Canvas2DRendering_SpriteBaseShapeRendering__WEBPACK_IMPORTED_MODULE_7__.SpriteBaseShapeRendering();\n        });\n    }\n    get spriteTriangleShapeRendering() {\n        return this.get('SpriteTriangleShapeRendering', () => {\n            return new _Rendering_Canvas2DRendering_SpriteTriangleShapeRendering__WEBPACK_IMPORTED_MODULE_8__.SpriteTriangleShapeRendering();\n        });\n    }\n    get spriteRectangleShapeRendering() {\n        return this.get('SpriteRectangleShapeRendering', () => {\n            return new _Rendering_Canvas2DRendering_SpriteRectangleShapeRendering__WEBPACK_IMPORTED_MODULE_9__.SpriteRectangleShapeRendering();\n        });\n    }\n    get spriteCircleShapeRendering() {\n        return this.get('SpriteCircleShapeRendering', () => {\n            return new _Rendering_Canvas2DRendering_SpriteCircleShapeRendering__WEBPACK_IMPORTED_MODULE_10__.SpriteCircleShapeRendering();\n        });\n    }\n}\n\n\n//# sourceURL=webpack://arcadium/./src/ts/Global/Services.ts?");

/***/ }),

/***/ "./src/ts/Global/index.ts":
/*!********************************!*\
  !*** ./src/ts/Global/index.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Services\": () => (/* reexport safe */ _Services__WEBPACK_IMPORTED_MODULE_0__.Services)\n/* harmony export */ });\n/* harmony import */ var _Services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Services */ \"./src/ts/Global/Services.ts\");\n\n\n\n//# sourceURL=webpack://arcadium/./src/ts/Global/index.ts?");

/***/ }),

/***/ "./src/ts/Rendering/Canvas2DRendering/BaseSpriteRendering.ts":
/*!*******************************************************************!*\
  !*** ./src/ts/Rendering/Canvas2DRendering/BaseSpriteRendering.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"BaseSpriteRendering\": () => (/* binding */ BaseSpriteRendering)\n/* harmony export */ });\nclass BaseSpriteRendering {\n    render(sprite, context) {\n        context.globalAlpha = sprite.alpha;\n        if (sprite.translation) {\n            context.translate(sprite.translation.x, sprite.translation.y);\n        }\n        if (sprite.scale) {\n            //todo est-ce qu'il faut rendre la scale fixe lors d'une rotation? voir https://gist.github.com/rodrigopedra/fcf8e84ec6dc80f3572b97ae26e2924d\n            context.translate(sprite.absoluteRectangle.center.x, sprite.absoluteRectangle.center.y);\n            context.scale(sprite.scale.x, sprite.scale.y);\n            context.translate(-sprite.absoluteRectangle.center.x, -sprite.absoluteRectangle.center.y);\n        }\n        if (sprite.rotation) {\n            context.translate(sprite.absoluteRectangle.center.x, sprite.absoluteRectangle.center.y);\n            context.rotate(sprite.rotation.radians);\n            context.translate(-sprite.absoluteRectangle.center.x, -sprite.absoluteRectangle.center.y);\n        }\n        if (sprite.transformation) {\n            context.translate(sprite.absoluteRectangle.center.x, sprite.absoluteRectangle.center.y);\n            context.setTransform(sprite.transformation.a, sprite.transformation.b, sprite.transformation.c, sprite.transformation.d, sprite.transformation.e, sprite.transformation.f);\n            //Todo ceci ne marche pas!\n            console.error('sprite.transformation not implemented');\n            context.translate(-sprite.absoluteRectangle.center.x, -sprite.absoluteRectangle.center.y);\n        }\n        if (sprite.shadow) {\n            context.shadowBlur = sprite.shadow.blur;\n            if (sprite.shadow.color) {\n                context.shadowColor = sprite.shadow.color;\n            }\n            if (sprite.shadow.offset) {\n                context.shadowOffsetX = sprite.shadow.offset.x;\n                context.shadowOffsetY = sprite.shadow.offset.y;\n            }\n        }\n        if (sprite.blendMode) {\n            context.globalCompositeOperation = sprite.blendMode;\n        }\n    }\n}\n\n\n//# sourceURL=webpack://arcadium/./src/ts/Rendering/Canvas2DRendering/BaseSpriteRendering.ts?");

/***/ }),

/***/ "./src/ts/Rendering/Canvas2DRendering/Canvas2DRendering.ts":
/*!*****************************************************************!*\
  !*** ./src/ts/Rendering/Canvas2DRendering/Canvas2DRendering.ts ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Canvas2DRendering\": () => (/* binding */ Canvas2DRendering)\n/* harmony export */ });\n/* harmony import */ var _Display_Shape__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../Display/Shape */ \"./src/ts/Display/Shape.ts\");\n\nclass Canvas2DRendering {\n    constructor(baseSpriteRendering, spriteBoundariesRendering) {\n        this.baseSpriteRendering = baseSpriteRendering;\n        this.spriteBoundariesRendering = spriteBoundariesRendering;\n    }\n    clear(context, sprite) {\n        let rectangle = sprite.absoluteRectangle;\n        context.clearRect(rectangle.left, rectangle.top, rectangle.right, rectangle.bottom);\n    }\n    renderSprite(context, sprite, isDebugMode) {\n        this.renderSingleSprite(context, sprite, isDebugMode);\n        for (const child of sprite.children) {\n            this.renderSprite(context, child, isDebugMode);\n        }\n    }\n    renderSingleSprite(context, sprite, isDebugMode) {\n        context.save();\n        if (sprite.isVisible) {\n            this.baseSpriteRendering.render(sprite, context);\n            if (sprite.rendering) {\n                sprite.rendering.render(sprite, context);\n            }\n        }\n        if (isDebugMode) {\n            this.renderBoundaries(context, sprite, '#ccc');\n            context.restore();\n            this.renderBoundaries(context, sprite, '#0000ff');\n        }\n        context.restore();\n    }\n    renderBoundaries(context, sprite, color) {\n        if (!sprite.parent) {\n            //avoid to debug the stage\n            return;\n        }\n        let shape = new _Display_Shape__WEBPACK_IMPORTED_MODULE_0__.Shape(null, sprite.rectangle);\n        shape.strokeStyle = color;\n        this.spriteBoundariesRendering.render(shape, context);\n    }\n}\n\n\n//# sourceURL=webpack://arcadium/./src/ts/Rendering/Canvas2DRendering/Canvas2DRendering.ts?");

/***/ }),

/***/ "./src/ts/Rendering/Canvas2DRendering/SpriteBaseShapeRendering.ts":
/*!************************************************************************!*\
  !*** ./src/ts/Rendering/Canvas2DRendering/SpriteBaseShapeRendering.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"SpriteBaseShapeRendering\": () => (/* binding */ SpriteBaseShapeRendering)\n/* harmony export */ });\nclass SpriteBaseShapeRendering {\n    render(sprite, context) {\n        if (sprite.lineCap !== undefined) {\n            context.lineCap = sprite.lineCap;\n        }\n        if (sprite.lineDashOffset !== undefined) {\n            context.lineDashOffset = sprite.lineDashOffset;\n        }\n        if (sprite.lineJoin !== undefined) {\n            context.lineJoin = sprite.lineJoin;\n        }\n        if (sprite.lineWidth !== undefined) {\n            context.lineWidth = sprite.lineWidth;\n        }\n        if (sprite.miterLimit !== undefined) {\n            context.miterLimit = sprite.miterLimit;\n        }\n        if (sprite.lineDash !== undefined) {\n            context.setLineDash(sprite.lineDash);\n        }\n        // the fill color\n        if (sprite.fillStyle !== undefined) {\n            context.fillStyle = sprite.fillStyle;\n            context.fill();\n        }\n        //the outline\n        if (sprite.strokeStyle !== undefined) {\n            context.strokeStyle = sprite.strokeStyle;\n            context.stroke();\n        }\n    }\n}\n\n\n//# sourceURL=webpack://arcadium/./src/ts/Rendering/Canvas2DRendering/SpriteBaseShapeRendering.ts?");

/***/ }),

/***/ "./src/ts/Rendering/Canvas2DRendering/SpriteBoundariesRendering.ts":
/*!*************************************************************************!*\
  !*** ./src/ts/Rendering/Canvas2DRendering/SpriteBoundariesRendering.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"SpriteBoundariesRendering\": () => (/* binding */ SpriteBoundariesRendering)\n/* harmony export */ });\nclass SpriteBoundariesRendering {\n    render(sprite, context) {\n        let rectangle = sprite.absoluteRectangle;\n        // the rectangle\n        context.beginPath();\n        context.rect(rectangle.x, rectangle.y, rectangle.width, rectangle.height);\n        context.closePath();\n        //the outline\n        context.lineWidth = sprite.lineWidth;\n        context.strokeStyle = sprite.strokeStyle;\n        context.stroke();\n    }\n}\n\n\n//# sourceURL=webpack://arcadium/./src/ts/Rendering/Canvas2DRendering/SpriteBoundariesRendering.ts?");

/***/ }),

/***/ "./src/ts/Rendering/Canvas2DRendering/SpriteCircleShapeRendering.ts":
/*!**************************************************************************!*\
  !*** ./src/ts/Rendering/Canvas2DRendering/SpriteCircleShapeRendering.ts ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"SpriteCircleShapeRendering\": () => (/* binding */ SpriteCircleShapeRendering)\n/* harmony export */ });\n/* harmony import */ var _SpriteBaseShapeRendering__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SpriteBaseShapeRendering */ \"./src/ts/Rendering/Canvas2DRendering/SpriteBaseShapeRendering.ts\");\n\nclass SpriteCircleShapeRendering extends _SpriteBaseShapeRendering__WEBPACK_IMPORTED_MODULE_0__.SpriteBaseShapeRendering {\n    render(sprite, context) {\n        context.beginPath();\n        context.arc(sprite.absoluteRectangle.x + sprite.rectangle.width / 2, sprite.absoluteRectangle.y + sprite.rectangle.height / 2, sprite.rectangle.width / 2, 0, Math.PI * 2, false);\n        context.closePath();\n        super.render(sprite, context);\n    }\n}\n\n\n//# sourceURL=webpack://arcadium/./src/ts/Rendering/Canvas2DRendering/SpriteCircleShapeRendering.ts?");

/***/ }),

/***/ "./src/ts/Rendering/Canvas2DRendering/SpriteImageRendering.ts":
/*!********************************************************************!*\
  !*** ./src/ts/Rendering/Canvas2DRendering/SpriteImageRendering.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"SpriteImageRendering\": () => (/* binding */ SpriteImageRendering)\n/* harmony export */ });\nclass SpriteImageRendering {\n    render(sprite, context) {\n        context.drawImage(sprite.source, 0, 0, sprite.source.width, sprite.source.height, sprite.absoluteRectangle.x, sprite.absoluteRectangle.y, sprite.rectangle.width, sprite.rectangle.height);\n    }\n}\n\n\n//# sourceURL=webpack://arcadium/./src/ts/Rendering/Canvas2DRendering/SpriteImageRendering.ts?");

/***/ }),

/***/ "./src/ts/Rendering/Canvas2DRendering/SpriteRectangleShapeRendering.ts":
/*!*****************************************************************************!*\
  !*** ./src/ts/Rendering/Canvas2DRendering/SpriteRectangleShapeRendering.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"SpriteRectangleShapeRendering\": () => (/* binding */ SpriteRectangleShapeRendering)\n/* harmony export */ });\n/* harmony import */ var _SpriteBaseShapeRendering__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SpriteBaseShapeRendering */ \"./src/ts/Rendering/Canvas2DRendering/SpriteBaseShapeRendering.ts\");\n\nclass SpriteRectangleShapeRendering extends _SpriteBaseShapeRendering__WEBPACK_IMPORTED_MODULE_0__.SpriteBaseShapeRendering {\n    render(sprite, context) {\n        context.beginPath();\n        context.rect(sprite.absoluteRectangle.x, sprite.absoluteRectangle.y, sprite.rectangle.width, sprite.rectangle.height);\n        context.closePath();\n        super.render(sprite, context);\n    }\n}\n\n\n//# sourceURL=webpack://arcadium/./src/ts/Rendering/Canvas2DRendering/SpriteRectangleShapeRendering.ts?");

/***/ }),

/***/ "./src/ts/Rendering/Canvas2DRendering/SpriteRenderingFunctionAdapter.ts":
/*!******************************************************************************!*\
  !*** ./src/ts/Rendering/Canvas2DRendering/SpriteRenderingFunctionAdapter.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"SpriteRenderingFunctionAdapter\": () => (/* binding */ SpriteRenderingFunctionAdapter)\n/* harmony export */ });\nclass SpriteRenderingFunctionAdapter {\n    constructor(callback) {\n        this.callback = callback;\n    }\n    render(sprite, context) {\n        this.callback(sprite, context);\n    }\n}\n\n\n//# sourceURL=webpack://arcadium/./src/ts/Rendering/Canvas2DRendering/SpriteRenderingFunctionAdapter.ts?");

/***/ }),

/***/ "./src/ts/Rendering/Canvas2DRendering/SpriteRenderingInterface.ts":
/*!************************************************************************!*\
  !*** ./src/ts/Rendering/Canvas2DRendering/SpriteRenderingInterface.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n\n\n\n//# sourceURL=webpack://arcadium/./src/ts/Rendering/Canvas2DRendering/SpriteRenderingInterface.ts?");

/***/ }),

/***/ "./src/ts/Rendering/Canvas2DRendering/SpriteTextRendering.ts":
/*!*******************************************************************!*\
  !*** ./src/ts/Rendering/Canvas2DRendering/SpriteTextRendering.ts ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"SpriteTextRendering\": () => (/* binding */ SpriteTextRendering)\n/* harmony export */ });\nclass SpriteTextRendering {\n    render(sprite, context) {\n        context.direction = sprite.direction;\n        context.font = sprite.font;\n        context.textAlign = sprite.textAlign;\n        context.textBaseline = sprite.textBaseline;\n        const lines = sprite.text.split('\\n');\n        for (let i = 0; i < lines.length; ++i) {\n            context.fillText(lines[i], sprite.absoluteRectangle.x, sprite.absoluteRectangle.y + (sprite.lineHeight * (i + 1)), sprite.adjustToWidth ? sprite.rectangle.width : undefined);\n        }\n    }\n}\n\n\n//# sourceURL=webpack://arcadium/./src/ts/Rendering/Canvas2DRendering/SpriteTextRendering.ts?");

/***/ }),

/***/ "./src/ts/Rendering/Canvas2DRendering/SpriteTriangleShapeRendering.ts":
/*!****************************************************************************!*\
  !*** ./src/ts/Rendering/Canvas2DRendering/SpriteTriangleShapeRendering.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"SpriteTriangleShapeRendering\": () => (/* binding */ SpriteTriangleShapeRendering)\n/* harmony export */ });\n/* harmony import */ var _SpriteBaseShapeRendering__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SpriteBaseShapeRendering */ \"./src/ts/Rendering/Canvas2DRendering/SpriteBaseShapeRendering.ts\");\n\nclass SpriteTriangleShapeRendering extends _SpriteBaseShapeRendering__WEBPACK_IMPORTED_MODULE_0__.SpriteBaseShapeRendering {\n    render(sprite, context) {\n        context.beginPath();\n        context.moveTo(sprite.absoluteRectangle.x + (sprite.rectangle.width / 2), sprite.absoluteRectangle.y);\n        context.lineTo(sprite.absoluteRectangle.x, sprite.absoluteRectangle.y + sprite.rectangle.height);\n        context.lineTo(sprite.absoluteRectangle.x + sprite.rectangle.width, sprite.absoluteRectangle.y + sprite.rectangle.height);\n        context.closePath();\n        super.render(sprite, context);\n    }\n}\n\n\n//# sourceURL=webpack://arcadium/./src/ts/Rendering/Canvas2DRendering/SpriteTriangleShapeRendering.ts?");

/***/ }),

/***/ "./src/ts/Rendering/Canvas2DRendering/index.ts":
/*!*****************************************************!*\
  !*** ./src/ts/Rendering/Canvas2DRendering/index.ts ***!
  \*****************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"BaseSpriteRendering\": () => (/* reexport safe */ _BaseSpriteRendering__WEBPACK_IMPORTED_MODULE_0__.BaseSpriteRendering),\n/* harmony export */   \"Canvas2DRendering\": () => (/* reexport safe */ _Canvas2DRendering__WEBPACK_IMPORTED_MODULE_1__.Canvas2DRendering),\n/* harmony export */   \"SpriteBaseShapeRendering\": () => (/* reexport safe */ _SpriteBaseShapeRendering__WEBPACK_IMPORTED_MODULE_2__.SpriteBaseShapeRendering),\n/* harmony export */   \"SpriteBoundariesRendering\": () => (/* reexport safe */ _SpriteBoundariesRendering__WEBPACK_IMPORTED_MODULE_3__.SpriteBoundariesRendering),\n/* harmony export */   \"SpriteCircleShapeRendering\": () => (/* reexport safe */ _SpriteCircleShapeRendering__WEBPACK_IMPORTED_MODULE_4__.SpriteCircleShapeRendering),\n/* harmony export */   \"SpriteImageRendering\": () => (/* reexport safe */ _SpriteImageRendering__WEBPACK_IMPORTED_MODULE_5__.SpriteImageRendering),\n/* harmony export */   \"SpriteRectangleShapeRendering\": () => (/* reexport safe */ _SpriteRectangleShapeRendering__WEBPACK_IMPORTED_MODULE_6__.SpriteRectangleShapeRendering),\n/* harmony export */   \"SpriteRenderingFunctionAdapter\": () => (/* reexport safe */ _SpriteRenderingFunctionAdapter__WEBPACK_IMPORTED_MODULE_7__.SpriteRenderingFunctionAdapter),\n/* harmony export */   \"SpriteTextRendering\": () => (/* reexport safe */ _SpriteTextRendering__WEBPACK_IMPORTED_MODULE_9__.SpriteTextRendering),\n/* harmony export */   \"SpriteTriangleShapeRendering\": () => (/* reexport safe */ _SpriteTriangleShapeRendering__WEBPACK_IMPORTED_MODULE_10__.SpriteTriangleShapeRendering)\n/* harmony export */ });\n/* harmony import */ var _BaseSpriteRendering__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BaseSpriteRendering */ \"./src/ts/Rendering/Canvas2DRendering/BaseSpriteRendering.ts\");\n/* harmony import */ var _Canvas2DRendering__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Canvas2DRendering */ \"./src/ts/Rendering/Canvas2DRendering/Canvas2DRendering.ts\");\n/* harmony import */ var _SpriteBaseShapeRendering__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./SpriteBaseShapeRendering */ \"./src/ts/Rendering/Canvas2DRendering/SpriteBaseShapeRendering.ts\");\n/* harmony import */ var _SpriteBoundariesRendering__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./SpriteBoundariesRendering */ \"./src/ts/Rendering/Canvas2DRendering/SpriteBoundariesRendering.ts\");\n/* harmony import */ var _SpriteCircleShapeRendering__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./SpriteCircleShapeRendering */ \"./src/ts/Rendering/Canvas2DRendering/SpriteCircleShapeRendering.ts\");\n/* harmony import */ var _SpriteImageRendering__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./SpriteImageRendering */ \"./src/ts/Rendering/Canvas2DRendering/SpriteImageRendering.ts\");\n/* harmony import */ var _SpriteRectangleShapeRendering__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./SpriteRectangleShapeRendering */ \"./src/ts/Rendering/Canvas2DRendering/SpriteRectangleShapeRendering.ts\");\n/* harmony import */ var _SpriteRenderingFunctionAdapter__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./SpriteRenderingFunctionAdapter */ \"./src/ts/Rendering/Canvas2DRendering/SpriteRenderingFunctionAdapter.ts\");\n/* harmony import */ var _SpriteRenderingInterface__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./SpriteRenderingInterface */ \"./src/ts/Rendering/Canvas2DRendering/SpriteRenderingInterface.ts\");\n/* harmony import */ var _SpriteTextRendering__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./SpriteTextRendering */ \"./src/ts/Rendering/Canvas2DRendering/SpriteTextRendering.ts\");\n/* harmony import */ var _SpriteTriangleShapeRendering__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./SpriteTriangleShapeRendering */ \"./src/ts/Rendering/Canvas2DRendering/SpriteTriangleShapeRendering.ts\");\n\n\n\n\n\n\n\n\n\n\n\n\n\n//# sourceURL=webpack://arcadium/./src/ts/Rendering/Canvas2DRendering/index.ts?");

/***/ }),

/***/ "./src/ts/Rendering/HtmlCanvas.ts":
/*!****************************************!*\
  !*** ./src/ts/Rendering/HtmlCanvas.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"HtmlCanvas\": () => (/* binding */ HtmlCanvas)\n/* harmony export */ });\nclass HtmlCanvas {\n    constructor(htmlCanvasElement, contextDimension = '2d', contextOptions) {\n        this.htmlCanvasElement = htmlCanvasElement;\n        this.contextDimension = contextDimension;\n        this.contextOptions = contextOptions;\n    }\n    get context() {\n        return this.htmlCanvasElement.getContext(this.contextDimension, this.contextOptions);\n    }\n}\n\n\n//# sourceURL=webpack://arcadium/./src/ts/Rendering/HtmlCanvas.ts?");

/***/ }),

/***/ "./src/ts/Rendering/RenderingFactory.ts":
/*!**********************************************!*\
  !*** ./src/ts/Rendering/RenderingFactory.ts ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"RenderingFactory\": () => (/* binding */ RenderingFactory)\n/* harmony export */ });\nclass RenderingFactory {\n    constructor(canvas2DRendering) {\n        this.canvas2DRendering = canvas2DRendering;\n    }\n    create(htmlCanvas) {\n        if (htmlCanvas.contextDimension === '2d') {\n            return this.canvas2DRendering;\n        }\n        throw new Error('canvas context not implemented');\n    }\n}\n\n\n//# sourceURL=webpack://arcadium/./src/ts/Rendering/RenderingFactory.ts?");

/***/ }),

/***/ "./src/ts/Rendering/index.ts":
/*!***********************************!*\
  !*** ./src/ts/Rendering/index.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"BaseSpriteRendering\": () => (/* reexport safe */ _Canvas2DRendering__WEBPACK_IMPORTED_MODULE_0__.BaseSpriteRendering),\n/* harmony export */   \"Canvas2DRendering\": () => (/* reexport safe */ _Canvas2DRendering__WEBPACK_IMPORTED_MODULE_0__.Canvas2DRendering),\n/* harmony export */   \"SpriteBaseShapeRendering\": () => (/* reexport safe */ _Canvas2DRendering__WEBPACK_IMPORTED_MODULE_0__.SpriteBaseShapeRendering),\n/* harmony export */   \"SpriteBoundariesRendering\": () => (/* reexport safe */ _Canvas2DRendering__WEBPACK_IMPORTED_MODULE_0__.SpriteBoundariesRendering),\n/* harmony export */   \"SpriteCircleShapeRendering\": () => (/* reexport safe */ _Canvas2DRendering__WEBPACK_IMPORTED_MODULE_0__.SpriteCircleShapeRendering),\n/* harmony export */   \"SpriteImageRendering\": () => (/* reexport safe */ _Canvas2DRendering__WEBPACK_IMPORTED_MODULE_0__.SpriteImageRendering),\n/* harmony export */   \"SpriteRectangleShapeRendering\": () => (/* reexport safe */ _Canvas2DRendering__WEBPACK_IMPORTED_MODULE_0__.SpriteRectangleShapeRendering),\n/* harmony export */   \"SpriteRenderingFunctionAdapter\": () => (/* reexport safe */ _Canvas2DRendering__WEBPACK_IMPORTED_MODULE_0__.SpriteRenderingFunctionAdapter),\n/* harmony export */   \"SpriteTextRendering\": () => (/* reexport safe */ _Canvas2DRendering__WEBPACK_IMPORTED_MODULE_0__.SpriteTextRendering),\n/* harmony export */   \"SpriteTriangleShapeRendering\": () => (/* reexport safe */ _Canvas2DRendering__WEBPACK_IMPORTED_MODULE_0__.SpriteTriangleShapeRendering),\n/* harmony export */   \"HtmlCanvas\": () => (/* reexport safe */ _HtmlCanvas__WEBPACK_IMPORTED_MODULE_1__.HtmlCanvas),\n/* harmony export */   \"RenderingFactory\": () => (/* reexport safe */ _RenderingFactory__WEBPACK_IMPORTED_MODULE_2__.RenderingFactory)\n/* harmony export */ });\n/* harmony import */ var _Canvas2DRendering__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Canvas2DRendering */ \"./src/ts/Rendering/Canvas2DRendering/index.ts\");\n/* harmony import */ var _HtmlCanvas__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./HtmlCanvas */ \"./src/ts/Rendering/HtmlCanvas.ts\");\n/* harmony import */ var _RenderingFactory__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./RenderingFactory */ \"./src/ts/Rendering/RenderingFactory.ts\");\n\n\n\n\n\n//# sourceURL=webpack://arcadium/./src/ts/Rendering/index.ts?");

/***/ }),

/***/ "./src/ts/Ui/Mouse.ts":
/*!****************************!*\
  !*** ./src/ts/Ui/Mouse.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Mouse\": () => (/* binding */ Mouse)\n/* harmony export */ });\n/* harmony import */ var _MouseEvent__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./MouseEvent */ \"./src/ts/Ui/MouseEvent.ts\");\n/* harmony import */ var _MouseEvents__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MouseEvents */ \"./src/ts/Ui/MouseEvents.ts\");\n/* harmony import */ var _Geom__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../Geom */ \"./src/ts/Geom/index.ts\");\n\n\n\nclass Mouse extends _Geom__WEBPACK_IMPORTED_MODULE_2__.Point {\n    constructor(canvas) {\n        super({ x: null, y: null });\n        this.canvas = canvas;\n        this.canvas.addEventListener('mousemove', (evt) => {\n            this.x = evt.offsetX;\n            this.y = evt.offsetY;\n        });\n    }\n    track(sprite, eventName, callback) {\n        switch (eventName) {\n            case _MouseEvents__WEBPACK_IMPORTED_MODULE_1__.MouseEvents.MOUSE_OVER:\n                this.onOver(sprite, callback);\n                break;\n            case _MouseEvents__WEBPACK_IMPORTED_MODULE_1__.MouseEvents.MOUSE_OUT:\n                this.onOut(sprite, callback);\n                break;\n            case _MouseEvents__WEBPACK_IMPORTED_MODULE_1__.MouseEvents.CLICK:\n            case _MouseEvents__WEBPACK_IMPORTED_MODULE_1__.MouseEvents.MOUSE_DOWN:\n            case _MouseEvents__WEBPACK_IMPORTED_MODULE_1__.MouseEvents.MOUSE_UP:\n                this.onClickableEvent(sprite, eventName, callback);\n                break;\n            default:\n                throw new Error('event not managed');\n        }\n    }\n    unTrack() {\n        //todo\n    }\n    onOver(sprite, callback) {\n        this._on('mousemove', (evt) => {\n            if (this.isOver(sprite)) {\n                //todo faire un vrai event en arg.\n                callback(new _MouseEvent__WEBPACK_IMPORTED_MODULE_0__.MouseEvent(this, evt), sprite, _MouseEvents__WEBPACK_IMPORTED_MODULE_1__.MouseEvents.MOUSE_OVER);\n            }\n        });\n    }\n    onOut(sprite, callback) {\n        this._on('mousemove', (evt) => {\n            if (!this.isOver(sprite)) {\n                callback(new _MouseEvent__WEBPACK_IMPORTED_MODULE_0__.MouseEvent(this, evt), sprite, _MouseEvents__WEBPACK_IMPORTED_MODULE_1__.MouseEvents.MOUSE_OUT);\n            }\n        });\n    }\n    onClick(sprite, callback) {\n        this.onClickableEvent(sprite, _MouseEvents__WEBPACK_IMPORTED_MODULE_1__.MouseEvents.CLICK, callback);\n    }\n    onDrag(sprite, onDrag, onDrop) {\n        console.warn('this function is experimental');\n        let originalDistance = null;\n        this.onClickableEvent(sprite, _MouseEvents__WEBPACK_IMPORTED_MODULE_1__.MouseEvents.MOUSE_UP, () => {\n            originalDistance = null;\n            onDrop();\n        });\n        this.onClickableEvent(sprite, _MouseEvents__WEBPACK_IMPORTED_MODULE_1__.MouseEvents.MOUSE_DOWN, () => {\n            originalDistance = new _Geom__WEBPACK_IMPORTED_MODULE_2__.Vector(new _Geom__WEBPACK_IMPORTED_MODULE_2__.Point(sprite.absoluteRectangle), new _Geom__WEBPACK_IMPORTED_MODULE_2__.Point(this));\n        });\n        this._on('mousemove', (evt) => {\n            if (!originalDistance) {\n                return;\n            }\n            sprite.rectangle.coordinates = sprite.rectangle.coordinates.subtract(originalDistance.subtract(new _Geom__WEBPACK_IMPORTED_MODULE_2__.Vector(sprite.absoluteRectangle, this)));\n            onDrag();\n        });\n    }\n    setCursorAsPoint(sprite) {\n        this.onOver(sprite, () => {\n            this.canvas.style.cursor = 'pointer';\n        });\n        this.onOut(sprite, () => {\n            this.canvas.style.cursor = 'default';\n        });\n    }\n    onClickableEvent(sprite, eventName, callback) {\n        this.setCursorAsPoint(sprite);\n        this._on(eventName, (evt) => {\n            if (this.isOver(sprite)) {\n                callback(new _MouseEvent__WEBPACK_IMPORTED_MODULE_0__.MouseEvent(this, evt), sprite, eventName);\n            }\n        });\n    }\n    _on(eventName, listener, options) {\n        this.canvas.addEventListener(eventName, listener);\n    }\n}\n\n\n//# sourceURL=webpack://arcadium/./src/ts/Ui/Mouse.ts?");

/***/ }),

/***/ "./src/ts/Ui/MouseEvent.ts":
/*!*********************************!*\
  !*** ./src/ts/Ui/MouseEvent.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"MouseEvent\": () => (/* binding */ MouseEvent)\n/* harmony export */ });\n/* harmony import */ var _Geom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../Geom */ \"./src/ts/Geom/index.ts\");\n\nclass MouseEvent {\n    constructor(mouse, original) {\n        this.mouse = mouse;\n        this.location = new _Geom__WEBPACK_IMPORTED_MODULE_0__.Point(mouse);\n        this.original = original;\n    }\n}\n\n\n//# sourceURL=webpack://arcadium/./src/ts/Ui/MouseEvent.ts?");

/***/ }),

/***/ "./src/ts/Ui/MouseEvents.ts":
/*!**********************************!*\
  !*** ./src/ts/Ui/MouseEvents.ts ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"MouseEvents\": () => (/* binding */ MouseEvents)\n/* harmony export */ });\nvar MouseEvents;\n(function (MouseEvents) {\n    MouseEvents[\"MOUSE_OVER\"] = \"mouseover\";\n    MouseEvents[\"MOUSE_OUT\"] = \"mouseout\";\n    MouseEvents[\"CLICK\"] = \"click\";\n    MouseEvents[\"MOUSE_DOWN\"] = \"mousedown\";\n    MouseEvents[\"MOUSE_UP\"] = \"mouseup\";\n})(MouseEvents || (MouseEvents = {}));\n\n\n//# sourceURL=webpack://arcadium/./src/ts/Ui/MouseEvents.ts?");

/***/ }),

/***/ "./src/ts/Ui/index.ts":
/*!****************************!*\
  !*** ./src/ts/Ui/index.ts ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Mouse\": () => (/* reexport safe */ _Mouse__WEBPACK_IMPORTED_MODULE_0__.Mouse),\n/* harmony export */   \"MouseEvent\": () => (/* reexport safe */ _MouseEvent__WEBPACK_IMPORTED_MODULE_1__.MouseEvent),\n/* harmony export */   \"MouseEvents\": () => (/* reexport safe */ _MouseEvents__WEBPACK_IMPORTED_MODULE_2__.MouseEvents)\n/* harmony export */ });\n/* harmony import */ var _Mouse__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Mouse */ \"./src/ts/Ui/Mouse.ts\");\n/* harmony import */ var _MouseEvent__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MouseEvent */ \"./src/ts/Ui/MouseEvent.ts\");\n/* harmony import */ var _MouseEvents__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MouseEvents */ \"./src/ts/Ui/MouseEvents.ts\");\n\n\n\n\n\n//# sourceURL=webpack://arcadium/./src/ts/Ui/index.ts?");

/***/ }),

/***/ "./src/ts/index.ts":
/*!*************************!*\
  !*** ./src/ts/index.ts ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"Motion\": () => (/* reexport safe */ _Core__WEBPACK_IMPORTED_MODULE_0__.Motion),\n/* harmony export */   \"MotionEvents\": () => (/* reexport safe */ _Core__WEBPACK_IMPORTED_MODULE_0__.MotionEvents),\n/* harmony export */   \"MotionState\": () => (/* reexport safe */ _Core__WEBPACK_IMPORTED_MODULE_0__.MotionState),\n/* harmony export */   \"Image\": () => (/* reexport safe */ _Display__WEBPACK_IMPORTED_MODULE_1__.Image),\n/* harmony export */   \"Shadow\": () => (/* reexport safe */ _Display__WEBPACK_IMPORTED_MODULE_1__.Shadow),\n/* harmony export */   \"Shape\": () => (/* reexport safe */ _Display__WEBPACK_IMPORTED_MODULE_1__.Shape),\n/* harmony export */   \"Sprite\": () => (/* reexport safe */ _Display__WEBPACK_IMPORTED_MODULE_1__.Sprite),\n/* harmony export */   \"Text\": () => (/* reexport safe */ _Display__WEBPACK_IMPORTED_MODULE_1__.Text),\n/* harmony export */   \"EventListener\": () => (/* reexport safe */ _Event__WEBPACK_IMPORTED_MODULE_2__.EventListener),\n/* harmony export */   \"Angle\": () => (/* reexport safe */ _Geom__WEBPACK_IMPORTED_MODULE_3__.Angle),\n/* harmony export */   \"Point\": () => (/* reexport safe */ _Geom__WEBPACK_IMPORTED_MODULE_3__.Point),\n/* harmony export */   \"Rectangle\": () => (/* reexport safe */ _Geom__WEBPACK_IMPORTED_MODULE_3__.Rectangle),\n/* harmony export */   \"Transformation\": () => (/* reexport safe */ _Geom__WEBPACK_IMPORTED_MODULE_3__.Transformation),\n/* harmony export */   \"Vector\": () => (/* reexport safe */ _Geom__WEBPACK_IMPORTED_MODULE_3__.Vector),\n/* harmony export */   \"Services\": () => (/* reexport safe */ _Global__WEBPACK_IMPORTED_MODULE_4__.Services),\n/* harmony export */   \"Mouse\": () => (/* reexport safe */ _Ui__WEBPACK_IMPORTED_MODULE_5__.Mouse),\n/* harmony export */   \"MouseEvent\": () => (/* reexport safe */ _Ui__WEBPACK_IMPORTED_MODULE_5__.MouseEvent),\n/* harmony export */   \"MouseEvents\": () => (/* reexport safe */ _Ui__WEBPACK_IMPORTED_MODULE_5__.MouseEvents),\n/* harmony export */   \"BaseSpriteRendering\": () => (/* reexport safe */ _Rendering__WEBPACK_IMPORTED_MODULE_6__.BaseSpriteRendering),\n/* harmony export */   \"Canvas2DRendering\": () => (/* reexport safe */ _Rendering__WEBPACK_IMPORTED_MODULE_6__.Canvas2DRendering),\n/* harmony export */   \"HtmlCanvas\": () => (/* reexport safe */ _Rendering__WEBPACK_IMPORTED_MODULE_6__.HtmlCanvas),\n/* harmony export */   \"RenderingFactory\": () => (/* reexport safe */ _Rendering__WEBPACK_IMPORTED_MODULE_6__.RenderingFactory),\n/* harmony export */   \"SpriteBaseShapeRendering\": () => (/* reexport safe */ _Rendering__WEBPACK_IMPORTED_MODULE_6__.SpriteBaseShapeRendering),\n/* harmony export */   \"SpriteBoundariesRendering\": () => (/* reexport safe */ _Rendering__WEBPACK_IMPORTED_MODULE_6__.SpriteBoundariesRendering),\n/* harmony export */   \"SpriteCircleShapeRendering\": () => (/* reexport safe */ _Rendering__WEBPACK_IMPORTED_MODULE_6__.SpriteCircleShapeRendering),\n/* harmony export */   \"SpriteImageRendering\": () => (/* reexport safe */ _Rendering__WEBPACK_IMPORTED_MODULE_6__.SpriteImageRendering),\n/* harmony export */   \"SpriteRectangleShapeRendering\": () => (/* reexport safe */ _Rendering__WEBPACK_IMPORTED_MODULE_6__.SpriteRectangleShapeRendering),\n/* harmony export */   \"SpriteRenderingFunctionAdapter\": () => (/* reexport safe */ _Rendering__WEBPACK_IMPORTED_MODULE_6__.SpriteRenderingFunctionAdapter),\n/* harmony export */   \"SpriteTextRendering\": () => (/* reexport safe */ _Rendering__WEBPACK_IMPORTED_MODULE_6__.SpriteTextRendering),\n/* harmony export */   \"SpriteTriangleShapeRendering\": () => (/* reexport safe */ _Rendering__WEBPACK_IMPORTED_MODULE_6__.SpriteTriangleShapeRendering),\n/* harmony export */   \"Arcadium\": () => (/* reexport safe */ _Arcadium__WEBPACK_IMPORTED_MODULE_7__.Arcadium),\n/* harmony export */   \"arca\": () => (/* reexport safe */ _Arcadium__WEBPACK_IMPORTED_MODULE_7__.arca)\n/* harmony export */ });\n/* harmony import */ var _Core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Core */ \"./src/ts/Core/index.ts\");\n/* harmony import */ var _Display__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Display */ \"./src/ts/Display/index.ts\");\n/* harmony import */ var _Event__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Event */ \"./src/ts/Event/index.ts\");\n/* harmony import */ var _Geom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Geom */ \"./src/ts/Geom/index.ts\");\n/* harmony import */ var _Global__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Global */ \"./src/ts/Global/index.ts\");\n/* harmony import */ var _Ui__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./Ui */ \"./src/ts/Ui/index.ts\");\n/* harmony import */ var _Rendering__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./Rendering */ \"./src/ts/Rendering/index.ts\");\n/* harmony import */ var _Arcadium__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Arcadium */ \"./src/ts/Arcadium.ts\");\n\n\n\n\n\n\n\n\n\n\n//# sourceURL=webpack://arcadium/./src/ts/index.ts?");

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