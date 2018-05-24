webpackJsonp([0],{

/***/ 100:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

//
//
//
//
//
//
//
//
//
//
//

exports.default = {
    props: {
        data: {
            required: true,
            type: Object
        }
    },
    computed: {
        className: function className() {
            return _defineProperty({}, this.$props.data.attributes.class, true);
        },
        width: function width() {
            return this.$props.data.attributes.width;
        },
        height: function height() {
            return this.$props.data.attributes.height;
        },
        viewBox: function viewBox() {
            return this.$props.data.attributes.viewBox;
        },
        content: function content() {
            return this.$props.data.content;
        }
    },
    methods: {
        handleClick: function handleClick($event) {
            this.$emit('click', $event);
        }
    }
};

/***/ }),

/***/ 101:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(102);


/***/ }),

/***/ 212:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./test.js": 213
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 212;

/***/ }),

/***/ 227:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./arrow-right.svg": 228,
	"./arrow.svg": 229,
	"./bicycle.svg": 230,
	"./bicycle2.svg": 231,
	"./cancel.svg": 232,
	"./cart.svg": 233,
	"./checked.svg": 234,
	"./compare.svg": 235,
	"./facebook.svg": 236,
	"./filter.svg": 237,
	"./free-delivery.svg": 238,
	"./gift.svg": 239,
	"./google.svg": 240,
	"./heart.svg": 241,
	"./logo.svg": 242,
	"./other.svg": 243,
	"./pedal.svg": 244,
	"./pencil.svg": 245,
	"./phone.svg": 246,
	"./pin.svg": 247,
	"./play.svg": 248,
	"./ruler.svg": 249,
	"./search.svg": 250,
	"./settings.svg": 251,
	"./sort.svg": 252,
	"./speedometer.svg": 253,
	"./tools.svg": 254,
	"./tshirt.svg": 255,
	"./user.svg": 256,
	"./velozona.svg": 257,
	"./video.svg": 258,
	"./vintage.svg": 259,
	"./wheel.svg": 260
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 227;

/***/ }),

/***/ 297:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_SvgImage_vue__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_SvgImage_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_SvgImage_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_SvgImage_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_SvgImage_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_56757ca3_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_SvgImage_vue__ = __webpack_require__(298);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__ = __webpack_require__(299);
var disposed = false
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(__WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__["a" /* default */])(
  __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_SvgImage_vue___default.a,
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_56757ca3_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_SvgImage_vue__["a" /* render */],
  __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_56757ca3_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_SvgImage_vue__["b" /* staticRenderFns */],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/js/components/SvgImage.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-56757ca3", Component.options)
  } else {
    hotAPI.reload("data-v-56757ca3", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ 298:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("svg", {
    class: _vm.className,
    attrs: {
      width: _vm.width,
      height: _vm.height,
      viewBox: _vm.viewBox,
      xmlns: "http://www.w3.org/2000/svg"
    },
    domProps: { innerHTML: _vm._s(_vm.content) },
    on: { click: _vm.handleClick }
  })
}
var staticRenderFns = []
render._withStripped = true

if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-56757ca3", { render: render, staticRenderFns: staticRenderFns })
  }
}

/***/ })

},[101]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi4vc3JjL2pzL2NvbXBvbmVudHMvU3ZnSW1hZ2UudnVlIiwid2VicGFjazovLy8uLi9zcmMvanMvc3RvcmUvbW9kdWxlcyBub25yZWN1cnNpdmUgXFwuanMkIiwid2VicGFjazovLy8uLi9zcmMvaW1nL3N2ZyBeXFwuXFwvLipcXC5zdmckIiwid2VicGFjazovLy8uLi9zcmMvanMvY29tcG9uZW50cy9TdmdJbWFnZS52dWU/MmNhYyIsIndlYnBhY2s6Ly8vLi4vc3JjL2pzL2NvbXBvbmVudHMvU3ZnSW1hZ2UudnVlP2Y3MjIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBWUE7Ozs7O3NCQUlBO2tCQUdBO0FBSkE7QUFEQTs7d0NBT0E7QUFDQSwwRUFFQTtBQUNBO2dDQUNBOytDQUNBO0FBQ0E7a0NBQ0E7K0NBQ0E7QUFDQTtvQ0FDQTsrQ0FDQTtBQUNBO29DQUNBO29DQUNBO0FBRUE7QUFsQkE7O2tEQW9CQTtnQ0FDQTtBQUVBO0FBSkE7QUExQkEsRTs7Ozs7Ozs7Ozs7Ozs7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCOzs7Ozs7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0I7Ozs7Ozs7Ozs7Ozs7QUNqREE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ21PO0FBQ25PO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsWUFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7O0FBRUQ7Ozs7Ozs7Ozs7QUMxQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLGVBQWUsaUNBQWlDO0FBQ2hELFNBQVM7QUFDVCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ1E7QUFDUjtBQUNBO0FBQ0E7QUFDQSxxRUFBcUUsbURBQW1EO0FBQ3hIO0FBQ0EsQyIsImZpbGUiOiJhcHAuOWZlZDRjZWE3Yi5qcyIsInNvdXJjZXNDb250ZW50IjpbIjx0ZW1wbGF0ZT5cbiAgICA8c3ZnIDpjbGFzcz1cImNsYXNzTmFtZVwiXG4gICAgICAgICA6d2lkdGg9XCJ3aWR0aFwiXG4gICAgICAgICA6aGVpZ2h0PVwiaGVpZ2h0XCJcbiAgICAgICAgIDp2aWV3LWJveC5jYW1lbD1cInZpZXdCb3hcIlxuICAgICAgICAgdi1odG1sPVwiY29udGVudFwiXG4gICAgICAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcbiAgICAgICAgIEBjbGljaz1cImhhbmRsZUNsaWNrXCI+XG4gICAgPC9zdmc+XG48L3RlbXBsYXRlPlxuXG48c2NyaXB0PlxuICAgIGV4cG9ydCBkZWZhdWx0IHtcbiAgICAgICAgcHJvcHM6IHtcbiAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB0eXBlOiBPYmplY3RcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgY29tcHV0ZWQ6IHtcbiAgICAgICAgICAgIGNsYXNzTmFtZSgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBbdGhpcy4kcHJvcHMuZGF0YS5hdHRyaWJ1dGVzLmNsYXNzXTogdHJ1ZVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgd2lkdGgoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHByb3BzLmRhdGEuYXR0cmlidXRlcy53aWR0aDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBoZWlnaHQoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHByb3BzLmRhdGEuYXR0cmlidXRlcy5oZWlnaHQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdmlld0JveCgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy4kcHJvcHMuZGF0YS5hdHRyaWJ1dGVzLnZpZXdCb3g7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29udGVudCgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy4kcHJvcHMuZGF0YS5jb250ZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBtZXRob2RzOiB7XG4gICAgICAgICAgICBoYW5kbGVDbGljaygkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRlbWl0KCdjbGljaycsICRldmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG48L3NjcmlwdD5cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuLi9zcmMvanMvY29tcG9uZW50cy9TdmdJbWFnZS52dWUiLCJ2YXIgbWFwID0ge1xuXHRcIi4vdGVzdC5qc1wiOiAyMTNcbn07XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18od2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkpO1xufTtcbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0dmFyIGlkID0gbWFwW3JlcV07XG5cdGlmKCEoaWQgKyAxKSkgLy8gY2hlY2sgZm9yIG51bWJlciBvciBzdHJpbmdcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInLlwiKTtcblx0cmV0dXJuIGlkO1xufTtcbndlYnBhY2tDb250ZXh0LmtleXMgPSBmdW5jdGlvbiB3ZWJwYWNrQ29udGV4dEtleXMoKSB7XG5cdHJldHVybiBPYmplY3Qua2V5cyhtYXApO1xufTtcbndlYnBhY2tDb250ZXh0LnJlc29sdmUgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmU7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tDb250ZXh0O1xud2VicGFja0NvbnRleHQuaWQgPSAyMTI7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vc3JjL2pzL3N0b3JlL21vZHVsZXMgbm9ucmVjdXJzaXZlIFxcLmpzJFxuLy8gbW9kdWxlIGlkID0gMjEyXG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBtYXAgPSB7XG5cdFwiLi9hcnJvdy1yaWdodC5zdmdcIjogMjI4LFxuXHRcIi4vYXJyb3cuc3ZnXCI6IDIyOSxcblx0XCIuL2JpY3ljbGUuc3ZnXCI6IDIzMCxcblx0XCIuL2JpY3ljbGUyLnN2Z1wiOiAyMzEsXG5cdFwiLi9jYW5jZWwuc3ZnXCI6IDIzMixcblx0XCIuL2NhcnQuc3ZnXCI6IDIzMyxcblx0XCIuL2NoZWNrZWQuc3ZnXCI6IDIzNCxcblx0XCIuL2NvbXBhcmUuc3ZnXCI6IDIzNSxcblx0XCIuL2ZhY2Vib29rLnN2Z1wiOiAyMzYsXG5cdFwiLi9maWx0ZXIuc3ZnXCI6IDIzNyxcblx0XCIuL2ZyZWUtZGVsaXZlcnkuc3ZnXCI6IDIzOCxcblx0XCIuL2dpZnQuc3ZnXCI6IDIzOSxcblx0XCIuL2dvb2dsZS5zdmdcIjogMjQwLFxuXHRcIi4vaGVhcnQuc3ZnXCI6IDI0MSxcblx0XCIuL2xvZ28uc3ZnXCI6IDI0Mixcblx0XCIuL290aGVyLnN2Z1wiOiAyNDMsXG5cdFwiLi9wZWRhbC5zdmdcIjogMjQ0LFxuXHRcIi4vcGVuY2lsLnN2Z1wiOiAyNDUsXG5cdFwiLi9waG9uZS5zdmdcIjogMjQ2LFxuXHRcIi4vcGluLnN2Z1wiOiAyNDcsXG5cdFwiLi9wbGF5LnN2Z1wiOiAyNDgsXG5cdFwiLi9ydWxlci5zdmdcIjogMjQ5LFxuXHRcIi4vc2VhcmNoLnN2Z1wiOiAyNTAsXG5cdFwiLi9zZXR0aW5ncy5zdmdcIjogMjUxLFxuXHRcIi4vc29ydC5zdmdcIjogMjUyLFxuXHRcIi4vc3BlZWRvbWV0ZXIuc3ZnXCI6IDI1Myxcblx0XCIuL3Rvb2xzLnN2Z1wiOiAyNTQsXG5cdFwiLi90c2hpcnQuc3ZnXCI6IDI1NSxcblx0XCIuL3VzZXIuc3ZnXCI6IDI1Nixcblx0XCIuL3ZlbG96b25hLnN2Z1wiOiAyNTcsXG5cdFwiLi92aWRlby5zdmdcIjogMjU4LFxuXHRcIi4vdmludGFnZS5zdmdcIjogMjU5LFxuXHRcIi4vd2hlZWwuc3ZnXCI6IDI2MFxufTtcbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0KHJlcSkge1xuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyh3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSk7XG59O1xuZnVuY3Rpb24gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkge1xuXHR2YXIgaWQgPSBtYXBbcmVxXTtcblx0aWYoIShpZCArIDEpKSAvLyBjaGVjayBmb3IgbnVtYmVyIG9yIHN0cmluZ1xuXHRcdHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIicuXCIpO1xuXHRyZXR1cm4gaWQ7XG59O1xud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IDIyNztcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9zcmMvaW1nL3N2ZyBeXFwuXFwvLipcXC5zdmckXG4vLyBtb2R1bGUgaWQgPSAyMjdcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwidmFyIGRpc3Bvc2VkID0gZmFsc2Vcbi8qIHNjcmlwdCAqL1xuZXhwb3J0ICogZnJvbSBcIiEhYmFiZWwtbG9hZGVyIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXNjcmlwdCZpbmRleD0wIS4vU3ZnSW1hZ2UudnVlXCJcbmltcG9ydCBfX3Z1ZV9zY3JpcHRfXyBmcm9tIFwiISFiYWJlbC1sb2FkZXIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3NlbGVjdG9yP3R5cGU9c2NyaXB0JmluZGV4PTAhLi9TdmdJbWFnZS52dWVcIlxuLyogdGVtcGxhdGUgKi9cbmltcG9ydCB7cmVuZGVyIGFzIF9fdnVlX3JlbmRlcl9fLCBzdGF0aWNSZW5kZXJGbnMgYXMgX192dWVfc3RhdGljX3JlbmRlcl9mbnNfX30gZnJvbSBcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyL2luZGV4P3tcXFwiaWRcXFwiOlxcXCJkYXRhLXYtNTY3NTdjYTNcXFwiLFxcXCJoYXNTY29wZWRcXFwiOmZhbHNlLFxcXCJidWJsZVxcXCI6e1xcXCJ0cmFuc2Zvcm1zXFxcIjp7fX19IS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi9TdmdJbWFnZS52dWVcIlxuLyogdGVtcGxhdGUgZnVuY3Rpb25hbCAqL1xudmFyIF9fdnVlX3RlbXBsYXRlX2Z1bmN0aW9uYWxfXyA9IGZhbHNlXG4vKiBzdHlsZXMgKi9cbnZhciBfX3Z1ZV9zdHlsZXNfXyA9IG51bGxcbi8qIHNjb3BlSWQgKi9cbnZhciBfX3Z1ZV9zY29wZUlkX18gPSBudWxsXG4vKiBtb2R1bGVJZGVudGlmaWVyIChzZXJ2ZXIgb25seSkgKi9cbnZhciBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fID0gbnVsbFxuaW1wb3J0IG5vcm1hbGl6ZUNvbXBvbmVudCBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudC1ub3JtYWxpemVyXCJcbnZhciBDb21wb25lbnQgPSBub3JtYWxpemVDb21wb25lbnQoXG4gIF9fdnVlX3NjcmlwdF9fLFxuICBfX3Z1ZV9yZW5kZXJfXyxcbiAgX192dWVfc3RhdGljX3JlbmRlcl9mbnNfXyxcbiAgX192dWVfdGVtcGxhdGVfZnVuY3Rpb25hbF9fLFxuICBfX3Z1ZV9zdHlsZXNfXyxcbiAgX192dWVfc2NvcGVJZF9fLFxuICBfX3Z1ZV9tb2R1bGVfaWRlbnRpZmllcl9fXG4pXG5Db21wb25lbnQub3B0aW9ucy5fX2ZpbGUgPSBcInNyYy9qcy9jb21wb25lbnRzL1N2Z0ltYWdlLnZ1ZVwiXG5cbi8qIGhvdCByZWxvYWQgKi9cbmlmIChtb2R1bGUuaG90KSB7KGZ1bmN0aW9uICgpIHtcbiAgdmFyIGhvdEFQSSA9IHJlcXVpcmUoXCJ2dWUtaG90LXJlbG9hZC1hcGlcIilcbiAgaG90QVBJLmluc3RhbGwocmVxdWlyZShcInZ1ZVwiKSwgZmFsc2UpXG4gIGlmICghaG90QVBJLmNvbXBhdGlibGUpIHJldHVyblxuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmICghbW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgaG90QVBJLmNyZWF0ZVJlY29yZChcImRhdGEtdi01Njc1N2NhM1wiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfSBlbHNlIHtcbiAgICBob3RBUEkucmVsb2FkKFwiZGF0YS12LTU2NzU3Y2EzXCIsIENvbXBvbmVudC5vcHRpb25zKVxuICB9XG4gIG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbiAoZGF0YSkge1xuICAgIGRpc3Bvc2VkID0gdHJ1ZVxuICB9KVxufSkoKX1cblxuZXhwb3J0IGRlZmF1bHQgQ29tcG9uZW50LmV4cG9ydHNcblxuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL3NyYy9qcy9jb21wb25lbnRzL1N2Z0ltYWdlLnZ1ZVxuLy8gbW9kdWxlIGlkID0gMjk3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciByZW5kZXIgPSBmdW5jdGlvbigpIHtcbiAgdmFyIF92bSA9IHRoaXNcbiAgdmFyIF9oID0gX3ZtLiRjcmVhdGVFbGVtZW50XG4gIHZhciBfYyA9IF92bS5fc2VsZi5fYyB8fCBfaFxuICByZXR1cm4gX2MoXCJzdmdcIiwge1xuICAgIGNsYXNzOiBfdm0uY2xhc3NOYW1lLFxuICAgIGF0dHJzOiB7XG4gICAgICB3aWR0aDogX3ZtLndpZHRoLFxuICAgICAgaGVpZ2h0OiBfdm0uaGVpZ2h0LFxuICAgICAgdmlld0JveDogX3ZtLnZpZXdCb3gsXG4gICAgICB4bWxuczogXCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXG4gICAgfSxcbiAgICBkb21Qcm9wczogeyBpbm5lckhUTUw6IF92bS5fcyhfdm0uY29udGVudCkgfSxcbiAgICBvbjogeyBjbGljazogX3ZtLmhhbmRsZUNsaWNrIH1cbiAgfSlcbn1cbnZhciBzdGF0aWNSZW5kZXJGbnMgPSBbXVxucmVuZGVyLl93aXRoU3RyaXBwZWQgPSB0cnVlXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9XG5pZiAobW9kdWxlLmhvdCkge1xuICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gIGlmIChtb2R1bGUuaG90LmRhdGEpIHtcbiAgICByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpICAgICAgLnJlcmVuZGVyKFwiZGF0YS12LTU2NzU3Y2EzXCIsIHsgcmVuZGVyOiByZW5kZXIsIHN0YXRpY1JlbmRlckZuczogc3RhdGljUmVuZGVyRm5zIH0pXG4gIH1cbn1cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvdGVtcGxhdGUtY29tcGlsZXI/e1wiaWRcIjpcImRhdGEtdi01Njc1N2NhM1wiLFwiaGFzU2NvcGVkXCI6ZmFsc2UsXCJidWJsZVwiOntcInRyYW5zZm9ybXNcIjp7fX19IS4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvci5qcz90eXBlPXRlbXBsYXRlJmluZGV4PTAhLi4vc3JjL2pzL2NvbXBvbmVudHMvU3ZnSW1hZ2UudnVlXG4vLyBtb2R1bGUgaWQgPSAyOThcbi8vIG1vZHVsZSBjaHVua3MgPSAwIl0sInNvdXJjZVJvb3QiOiIifQ==