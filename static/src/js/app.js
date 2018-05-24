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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi4vc3JjL2pzL2NvbXBvbmVudHMvU3ZnSW1hZ2UudnVlIiwid2VicGFjazovLy8uLi9zcmMvanMvc3RvcmUvbW9kdWxlcyBub25yZWN1cnNpdmUgXFwuanMkIiwid2VicGFjazovLy8uLi9zcmMvaW1nL3N2ZyBeXFwuXFwvLipcXC5zdmckIiwid2VicGFjazovLy8uLi9zcmMvanMvY29tcG9uZW50cy9TdmdJbWFnZS52dWU/MmNhYyIsIndlYnBhY2s6Ly8vLi4vc3JjL2pzL2NvbXBvbmVudHMvU3ZnSW1hZ2UudnVlP2Y3MjIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBWUE7Ozs7O3NCQUlBO2tCQUdBO0FBSkE7QUFEQTs7d0NBT0E7QUFDQSwwRUFFQTtBQUNBO2dDQUNBOytDQUNBO0FBQ0E7a0NBQ0E7K0NBQ0E7QUFDQTtvQ0FDQTsrQ0FDQTtBQUNBO29DQUNBO29DQUNBO0FBRUE7QUFsQkE7O2tEQW9CQTtnQ0FDQTtBQUVBO0FBSkE7QUExQkEsRTs7Ozs7Ozs7Ozs7Ozs7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCOzs7Ozs7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0I7Ozs7Ozs7Ozs7Ozs7QUNqREE7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ21PO0FBQ25PO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsWUFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNILENBQUM7O0FBRUQ7Ozs7Ozs7Ozs7QUMxQ0E7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLGVBQWUsaUNBQWlDO0FBQ2hELFNBQVM7QUFDVCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ1E7QUFDUjtBQUNBO0FBQ0E7QUFDQSxxRUFBcUUsbURBQW1EO0FBQ3hIO0FBQ0EsQyIsImZpbGUiOiJhcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyI8dGVtcGxhdGU+XG4gICAgPHN2ZyA6Y2xhc3M9XCJjbGFzc05hbWVcIlxuICAgICAgICAgOndpZHRoPVwid2lkdGhcIlxuICAgICAgICAgOmhlaWdodD1cImhlaWdodFwiXG4gICAgICAgICA6dmlldy1ib3guY2FtZWw9XCJ2aWV3Qm94XCJcbiAgICAgICAgIHYtaHRtbD1cImNvbnRlbnRcIlxuICAgICAgICAgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiXG4gICAgICAgICBAY2xpY2s9XCJoYW5kbGVDbGlja1wiPlxuICAgIDwvc3ZnPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbiAgICBleHBvcnQgZGVmYXVsdCB7XG4gICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgICAgICAgICAgdHlwZTogT2JqZWN0XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGNvbXB1dGVkOiB7XG4gICAgICAgICAgICBjbGFzc05hbWUoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAgICAgW3RoaXMuJHByb3BzLmRhdGEuYXR0cmlidXRlcy5jbGFzc106IHRydWVcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHdpZHRoKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLiRwcm9wcy5kYXRhLmF0dHJpYnV0ZXMud2lkdGg7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgaGVpZ2h0KCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLiRwcm9wcy5kYXRhLmF0dHJpYnV0ZXMuaGVpZ2h0O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHZpZXdCb3goKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHByb3BzLmRhdGEuYXR0cmlidXRlcy52aWV3Qm94O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGNvbnRlbnQoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHByb3BzLmRhdGEuY29udGVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgbWV0aG9kczoge1xuICAgICAgICAgICAgaGFuZGxlQ2xpY2soJGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kZW1pdCgnY2xpY2snLCAkZXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuPC9zY3JpcHQ+XG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi4vc3JjL2pzL2NvbXBvbmVudHMvU3ZnSW1hZ2UudnVlIiwidmFyIG1hcCA9IHtcblx0XCIuL3Rlc3QuanNcIjogMjEzXG59O1xuZnVuY3Rpb24gd2VicGFja0NvbnRleHQocmVxKSB7XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpKTtcbn07XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSB7XG5cdHZhciBpZCA9IG1hcFtyZXFdO1xuXHRpZighKGlkICsgMSkpIC8vIGNoZWNrIGZvciBudW1iZXIgb3Igc3RyaW5nXG5cdFx0dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJy5cIik7XG5cdHJldHVybiBpZDtcbn07XG53ZWJwYWNrQ29udGV4dC5rZXlzID0gZnVuY3Rpb24gd2VicGFja0NvbnRleHRLZXlzKCkge1xuXHRyZXR1cm4gT2JqZWN0LmtleXMobWFwKTtcbn07XG53ZWJwYWNrQ29udGV4dC5yZXNvbHZlID0gd2VicGFja0NvbnRleHRSZXNvbHZlO1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrQ29udGV4dDtcbndlYnBhY2tDb250ZXh0LmlkID0gMjEyO1xuXG5cbi8vLy8vLy8vLy8vLy8vLy8vL1xuLy8gV0VCUEFDSyBGT09URVJcbi8vIC4uL3NyYy9qcy9zdG9yZS9tb2R1bGVzIG5vbnJlY3Vyc2l2ZSBcXC5qcyRcbi8vIG1vZHVsZSBpZCA9IDIxMlxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgbWFwID0ge1xuXHRcIi4vYXJyb3ctcmlnaHQuc3ZnXCI6IDIyOCxcblx0XCIuL2Fycm93LnN2Z1wiOiAyMjksXG5cdFwiLi9iaWN5Y2xlLnN2Z1wiOiAyMzAsXG5cdFwiLi9iaWN5Y2xlMi5zdmdcIjogMjMxLFxuXHRcIi4vY2FuY2VsLnN2Z1wiOiAyMzIsXG5cdFwiLi9jYXJ0LnN2Z1wiOiAyMzMsXG5cdFwiLi9jaGVja2VkLnN2Z1wiOiAyMzQsXG5cdFwiLi9jb21wYXJlLnN2Z1wiOiAyMzUsXG5cdFwiLi9mYWNlYm9vay5zdmdcIjogMjM2LFxuXHRcIi4vZmlsdGVyLnN2Z1wiOiAyMzcsXG5cdFwiLi9mcmVlLWRlbGl2ZXJ5LnN2Z1wiOiAyMzgsXG5cdFwiLi9naWZ0LnN2Z1wiOiAyMzksXG5cdFwiLi9nb29nbGUuc3ZnXCI6IDI0MCxcblx0XCIuL2hlYXJ0LnN2Z1wiOiAyNDEsXG5cdFwiLi9sb2dvLnN2Z1wiOiAyNDIsXG5cdFwiLi9vdGhlci5zdmdcIjogMjQzLFxuXHRcIi4vcGVkYWwuc3ZnXCI6IDI0NCxcblx0XCIuL3BlbmNpbC5zdmdcIjogMjQ1LFxuXHRcIi4vcGhvbmUuc3ZnXCI6IDI0Nixcblx0XCIuL3Bpbi5zdmdcIjogMjQ3LFxuXHRcIi4vcGxheS5zdmdcIjogMjQ4LFxuXHRcIi4vcnVsZXIuc3ZnXCI6IDI0OSxcblx0XCIuL3NlYXJjaC5zdmdcIjogMjUwLFxuXHRcIi4vc2V0dGluZ3Muc3ZnXCI6IDI1MSxcblx0XCIuL3NvcnQuc3ZnXCI6IDI1Mixcblx0XCIuL3NwZWVkb21ldGVyLnN2Z1wiOiAyNTMsXG5cdFwiLi90b29scy5zdmdcIjogMjU0LFxuXHRcIi4vdHNoaXJ0LnN2Z1wiOiAyNTUsXG5cdFwiLi91c2VyLnN2Z1wiOiAyNTYsXG5cdFwiLi92ZWxvem9uYS5zdmdcIjogMjU3LFxuXHRcIi4vdmlkZW8uc3ZnXCI6IDI1OCxcblx0XCIuL3ZpbnRhZ2Uuc3ZnXCI6IDI1OSxcblx0XCIuL3doZWVsLnN2Z1wiOiAyNjBcbn07XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dChyZXEpIHtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18od2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkpO1xufTtcbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpIHtcblx0dmFyIGlkID0gbWFwW3JlcV07XG5cdGlmKCEoaWQgKyAxKSkgLy8gY2hlY2sgZm9yIG51bWJlciBvciBzdHJpbmdcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInLlwiKTtcblx0cmV0dXJuIGlkO1xufTtcbndlYnBhY2tDb250ZXh0LmtleXMgPSBmdW5jdGlvbiB3ZWJwYWNrQ29udGV4dEtleXMoKSB7XG5cdHJldHVybiBPYmplY3Qua2V5cyhtYXApO1xufTtcbndlYnBhY2tDb250ZXh0LnJlc29sdmUgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmU7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tDb250ZXh0O1xud2VicGFja0NvbnRleHQuaWQgPSAyMjc7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vc3JjL2ltZy9zdmcgXlxcLlxcLy4qXFwuc3ZnJFxuLy8gbW9kdWxlIGlkID0gMjI3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBkaXNwb3NlZCA9IGZhbHNlXG4vKiBzY3JpcHQgKi9cbmV4cG9ydCAqIGZyb20gXCIhIWJhYmVsLWxvYWRlciEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zY3JpcHQmaW5kZXg9MCEuL1N2Z0ltYWdlLnZ1ZVwiXG5pbXBvcnQgX192dWVfc2NyaXB0X18gZnJvbSBcIiEhYmFiZWwtbG9hZGVyIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXNjcmlwdCZpbmRleD0wIS4vU3ZnSW1hZ2UudnVlXCJcbi8qIHRlbXBsYXRlICovXG5pbXBvcnQge3JlbmRlciBhcyBfX3Z1ZV9yZW5kZXJfXywgc3RhdGljUmVuZGVyRm5zIGFzIF9fdnVlX3N0YXRpY19yZW5kZXJfZm5zX199IGZyb20gXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlci9pbmRleD97XFxcImlkXFxcIjpcXFwiZGF0YS12LTU2NzU3Y2EzXFxcIixcXFwiaGFzU2NvcGVkXFxcIjpmYWxzZSxcXFwiYnVibGVcXFwiOntcXFwidHJhbnNmb3Jtc1xcXCI6e319fSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vU3ZnSW1hZ2UudnVlXCJcbi8qIHRlbXBsYXRlIGZ1bmN0aW9uYWwgKi9cbnZhciBfX3Z1ZV90ZW1wbGF0ZV9mdW5jdGlvbmFsX18gPSBmYWxzZVxuLyogc3R5bGVzICovXG52YXIgX192dWVfc3R5bGVzX18gPSBudWxsXG4vKiBzY29wZUlkICovXG52YXIgX192dWVfc2NvcGVJZF9fID0gbnVsbFxuLyogbW9kdWxlSWRlbnRpZmllciAoc2VydmVyIG9ubHkpICovXG52YXIgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfXyA9IG51bGxcbmltcG9ydCBub3JtYWxpemVDb21wb25lbnQgZnJvbSBcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnQtbm9ybWFsaXplclwiXG52YXIgQ29tcG9uZW50ID0gbm9ybWFsaXplQ29tcG9uZW50KFxuICBfX3Z1ZV9zY3JpcHRfXyxcbiAgX192dWVfcmVuZGVyX18sXG4gIF9fdnVlX3N0YXRpY19yZW5kZXJfZm5zX18sXG4gIF9fdnVlX3RlbXBsYXRlX2Z1bmN0aW9uYWxfXyxcbiAgX192dWVfc3R5bGVzX18sXG4gIF9fdnVlX3Njb3BlSWRfXyxcbiAgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfX1xuKVxuQ29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJzcmMvanMvY29tcG9uZW50cy9TdmdJbWFnZS52dWVcIlxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkgeyhmdW5jdGlvbiAoKSB7XG4gIHZhciBob3RBUEkgPSByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpXG4gIGhvdEFQSS5pbnN0YWxsKHJlcXVpcmUoXCJ2dWVcIiksIGZhbHNlKVxuICBpZiAoIWhvdEFQSS5jb21wYXRpYmxlKSByZXR1cm5cbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAoIW1vZHVsZS5ob3QuZGF0YSkge1xuICAgIGhvdEFQSS5jcmVhdGVSZWNvcmQoXCJkYXRhLXYtNTY3NTdjYTNcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH0gZWxzZSB7XG4gICAgaG90QVBJLnJlbG9hZChcImRhdGEtdi01Njc1N2NhM1wiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfVxuICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBkaXNwb3NlZCA9IHRydWVcbiAgfSlcbn0pKCl9XG5cbmV4cG9ydCBkZWZhdWx0IENvbXBvbmVudC5leHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9zcmMvanMvY29tcG9uZW50cy9TdmdJbWFnZS52dWVcbi8vIG1vZHVsZSBpZCA9IDI5N1xuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFwic3ZnXCIsIHtcbiAgICBjbGFzczogX3ZtLmNsYXNzTmFtZSxcbiAgICBhdHRyczoge1xuICAgICAgd2lkdGg6IF92bS53aWR0aCxcbiAgICAgIGhlaWdodDogX3ZtLmhlaWdodCxcbiAgICAgIHZpZXdCb3g6IF92bS52aWV3Qm94LFxuICAgICAgeG1sbnM6IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxuICAgIH0sXG4gICAgZG9tUHJvcHM6IHsgaW5uZXJIVE1MOiBfdm0uX3MoX3ZtLmNvbnRlbnQpIH0sXG4gICAgb246IHsgY2xpY2s6IF92bS5oYW5kbGVDbGljayB9XG4gIH0pXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfVxuaWYgKG1vZHVsZS5ob3QpIHtcbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAobW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKSAgICAgIC5yZXJlbmRlcihcImRhdGEtdi01Njc1N2NhM1wiLCB7IHJlbmRlcjogcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZucyB9KVxuICB9XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyP3tcImlkXCI6XCJkYXRhLXYtNTY3NTdjYTNcIixcImhhc1Njb3BlZFwiOmZhbHNlLFwiYnVibGVcIjp7XCJ0cmFuc2Zvcm1zXCI6e319fSEuLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4uL3NyYy9qcy9jb21wb25lbnRzL1N2Z0ltYWdlLnZ1ZVxuLy8gbW9kdWxlIGlkID0gMjk4XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=