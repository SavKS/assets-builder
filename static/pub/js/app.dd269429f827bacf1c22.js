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
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 227;

/***/ }),

/***/ 264:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_SvgImage_vue__ = __webpack_require__(100);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_SvgImage_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_SvgImage_vue__);
/* harmony namespace reexport (unknown) */ for(var __WEBPACK_IMPORT_KEY__ in __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_SvgImage_vue__) if(__WEBPACK_IMPORT_KEY__ !== 'default') (function(key) { __webpack_require__.d(__webpack_exports__, key, function() { return __WEBPACK_IMPORTED_MODULE_0__babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_SvgImage_vue__[key]; }) }(__WEBPACK_IMPORT_KEY__));
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_modules_vue_loader_lib_template_compiler_index_id_data_v_56757ca3_hasScoped_false_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_SvgImage_vue__ = __webpack_require__(265);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__node_modules_vue_loader_lib_runtime_component_normalizer__ = __webpack_require__(266);
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

/***/ 265:
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi4vc3JjL2pzL2NvbXBvbmVudHMvU3ZnSW1hZ2UudnVlIiwid2VicGFjazovLy8uLi9zcmMvanMvc3RvcmUvbW9kdWxlcyBub25yZWN1cnNpdmUgXFwuanMkIiwid2VicGFjazovLy8vaG9tZS9zYXZrcy9Xb3JrL0RvY2tlci9PdGhlci93ZWJwYWNrL3N0YXRpYy9zcmMvaW1nL3N2ZyBeXFwuXFwvLipcXC5zdmckIiwid2VicGFjazovLy8uLi9zcmMvanMvY29tcG9uZW50cy9TdmdJbWFnZS52dWU/MmNhYyIsIndlYnBhY2s6Ly8vLi4vc3JjL2pzL2NvbXBvbmVudHMvU3ZnSW1hZ2UudnVlP2Y3MjIiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBWUE7Ozs7O3NCQUlBO2tCQUdBO0FBSkE7QUFEQTs7d0NBT0E7QUFDQSwwRUFFQTtBQUNBO2dDQUNBOytDQUNBO0FBQ0E7a0NBQ0E7K0NBQ0E7QUFDQTtvQ0FDQTsrQ0FDQTtBQUNBO29DQUNBO29DQUNBO0FBRUE7QUFsQkE7O2tEQW9CQTtnQ0FDQTtBQUVBO0FBSkE7QUExQkEsRTs7Ozs7Ozs7Ozs7Ozs7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCOzs7Ozs7O0FDakJBO0FBQ0E7QUFDQTtBQUNBLHVDQUF1QyxXQUFXO0FBQ2xEO0FBQ0E7QUFDQSw2Qjs7Ozs7Ozs7Ozs7OztBQ05BO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNtTztBQUNuTztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFlBQWlCO0FBQ2pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSCxDQUFDOztBQUVEOzs7Ozs7Ozs7O0FDMUNBO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxlQUFlLGlDQUFpQztBQUNoRCxTQUFTO0FBQ1QsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNRO0FBQ1I7QUFDQTtBQUNBO0FBQ0EscUVBQXFFLG1EQUFtRDtBQUN4SDtBQUNBLEMiLCJmaWxlIjoiYXBwLmRkMjY5NDI5ZjgyN2JhY2YxYzIyLmpzIiwic291cmNlc0NvbnRlbnQiOlsiPHRlbXBsYXRlPlxuICAgIDxzdmcgOmNsYXNzPVwiY2xhc3NOYW1lXCJcbiAgICAgICAgIDp3aWR0aD1cIndpZHRoXCJcbiAgICAgICAgIDpoZWlnaHQ9XCJoZWlnaHRcIlxuICAgICAgICAgOnZpZXctYm94LmNhbWVsPVwidmlld0JveFwiXG4gICAgICAgICB2LWh0bWw9XCJjb250ZW50XCJcbiAgICAgICAgIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxuICAgICAgICAgQGNsaWNrPVwiaGFuZGxlQ2xpY2tcIj5cbiAgICA8L3N2Zz5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG4gICAgZXhwb3J0IGRlZmF1bHQge1xuICAgICAgICBwcm9wczoge1xuICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICAgICAgICAgIHR5cGU6IE9iamVjdFxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBjb21wdXRlZDoge1xuICAgICAgICAgICAgY2xhc3NOYW1lKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgIFt0aGlzLiRwcm9wcy5kYXRhLmF0dHJpYnV0ZXMuY2xhc3NdOiB0cnVlXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB3aWR0aCgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy4kcHJvcHMuZGF0YS5hdHRyaWJ1dGVzLndpZHRoO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGhlaWdodCgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy4kcHJvcHMuZGF0YS5hdHRyaWJ1dGVzLmhlaWdodDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB2aWV3Qm94KCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLiRwcm9wcy5kYXRhLmF0dHJpYnV0ZXMudmlld0JveDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb250ZW50KCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLiRwcm9wcy5kYXRhLmNvbnRlbnQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIG1ldGhvZHM6IHtcbiAgICAgICAgICAgIGhhbmRsZUNsaWNrKCRldmVudCkge1xuICAgICAgICAgICAgICAgIHRoaXMuJGVtaXQoJ2NsaWNrJywgJGV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbjwvc2NyaXB0PlxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4uL3NyYy9qcy9jb21wb25lbnRzL1N2Z0ltYWdlLnZ1ZSIsInZhciBtYXAgPSB7XG5cdFwiLi90ZXN0LmpzXCI6IDIxM1xufTtcbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0KHJlcSkge1xuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyh3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSk7XG59O1xuZnVuY3Rpb24gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkge1xuXHR2YXIgaWQgPSBtYXBbcmVxXTtcblx0aWYoIShpZCArIDEpKSAvLyBjaGVjayBmb3IgbnVtYmVyIG9yIHN0cmluZ1xuXHRcdHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIicuXCIpO1xuXHRyZXR1cm4gaWQ7XG59O1xud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IDIxMjtcblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9zcmMvanMvc3RvcmUvbW9kdWxlcyBub25yZWN1cnNpdmUgXFwuanMkXG4vLyBtb2R1bGUgaWQgPSAyMTJcbi8vIG1vZHVsZSBjaHVua3MgPSAwIiwiZnVuY3Rpb24gd2VicGFja0VtcHR5Q29udGV4dChyZXEpIHtcblx0dGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIiArIHJlcSArIFwiJy5cIik7XG59XG53ZWJwYWNrRW1wdHlDb250ZXh0LmtleXMgPSBmdW5jdGlvbigpIHsgcmV0dXJuIFtdOyB9O1xud2VicGFja0VtcHR5Q29udGV4dC5yZXNvbHZlID0gd2VicGFja0VtcHR5Q29udGV4dDtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0VtcHR5Q29udGV4dDtcbndlYnBhY2tFbXB0eUNvbnRleHQuaWQgPSAyMjc7XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gL2hvbWUvc2F2a3MvV29yay9Eb2NrZXIvT3RoZXIvd2VicGFjay9zdGF0aWMvc3JjL2ltZy9zdmcgXlxcLlxcLy4qXFwuc3ZnJFxuLy8gbW9kdWxlIGlkID0gMjI3XG4vLyBtb2R1bGUgY2h1bmtzID0gMCIsInZhciBkaXNwb3NlZCA9IGZhbHNlXG4vKiBzY3JpcHQgKi9cbmV4cG9ydCAqIGZyb20gXCIhIWJhYmVsLWxvYWRlciEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT1zY3JpcHQmaW5kZXg9MCEuL1N2Z0ltYWdlLnZ1ZVwiXG5pbXBvcnQgX192dWVfc2NyaXB0X18gZnJvbSBcIiEhYmFiZWwtbG9hZGVyIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9zZWxlY3Rvcj90eXBlPXNjcmlwdCZpbmRleD0wIS4vU3ZnSW1hZ2UudnVlXCJcbi8qIHRlbXBsYXRlICovXG5pbXBvcnQge3JlbmRlciBhcyBfX3Z1ZV9yZW5kZXJfXywgc3RhdGljUmVuZGVyRm5zIGFzIF9fdnVlX3N0YXRpY19yZW5kZXJfZm5zX199IGZyb20gXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi90ZW1wbGF0ZS1jb21waWxlci9pbmRleD97XFxcImlkXFxcIjpcXFwiZGF0YS12LTU2NzU3Y2EzXFxcIixcXFwiaGFzU2NvcGVkXFxcIjpmYWxzZSxcXFwiYnVibGVcXFwiOntcXFwidHJhbnNmb3Jtc1xcXCI6e319fSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3I/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4vU3ZnSW1hZ2UudnVlXCJcbi8qIHRlbXBsYXRlIGZ1bmN0aW9uYWwgKi9cbnZhciBfX3Z1ZV90ZW1wbGF0ZV9mdW5jdGlvbmFsX18gPSBmYWxzZVxuLyogc3R5bGVzICovXG52YXIgX192dWVfc3R5bGVzX18gPSBudWxsXG4vKiBzY29wZUlkICovXG52YXIgX192dWVfc2NvcGVJZF9fID0gbnVsbFxuLyogbW9kdWxlSWRlbnRpZmllciAoc2VydmVyIG9ubHkpICovXG52YXIgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfXyA9IG51bGxcbmltcG9ydCBub3JtYWxpemVDb21wb25lbnQgZnJvbSBcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnQtbm9ybWFsaXplclwiXG52YXIgQ29tcG9uZW50ID0gbm9ybWFsaXplQ29tcG9uZW50KFxuICBfX3Z1ZV9zY3JpcHRfXyxcbiAgX192dWVfcmVuZGVyX18sXG4gIF9fdnVlX3N0YXRpY19yZW5kZXJfZm5zX18sXG4gIF9fdnVlX3RlbXBsYXRlX2Z1bmN0aW9uYWxfXyxcbiAgX192dWVfc3R5bGVzX18sXG4gIF9fdnVlX3Njb3BlSWRfXyxcbiAgX192dWVfbW9kdWxlX2lkZW50aWZpZXJfX1xuKVxuQ29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJzcmMvanMvY29tcG9uZW50cy9TdmdJbWFnZS52dWVcIlxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkgeyhmdW5jdGlvbiAoKSB7XG4gIHZhciBob3RBUEkgPSByZXF1aXJlKFwidnVlLWhvdC1yZWxvYWQtYXBpXCIpXG4gIGhvdEFQSS5pbnN0YWxsKHJlcXVpcmUoXCJ2dWVcIiksIGZhbHNlKVxuICBpZiAoIWhvdEFQSS5jb21wYXRpYmxlKSByZXR1cm5cbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAoIW1vZHVsZS5ob3QuZGF0YSkge1xuICAgIGhvdEFQSS5jcmVhdGVSZWNvcmQoXCJkYXRhLXYtNTY3NTdjYTNcIiwgQ29tcG9uZW50Lm9wdGlvbnMpXG4gIH0gZWxzZSB7XG4gICAgaG90QVBJLnJlbG9hZChcImRhdGEtdi01Njc1N2NhM1wiLCBDb21wb25lbnQub3B0aW9ucylcbiAgfVxuICBtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24gKGRhdGEpIHtcbiAgICBkaXNwb3NlZCA9IHRydWVcbiAgfSlcbn0pKCl9XG5cbmV4cG9ydCBkZWZhdWx0IENvbXBvbmVudC5leHBvcnRzXG5cblxuXG4vLy8vLy8vLy8vLy8vLy8vLy9cbi8vIFdFQlBBQ0sgRk9PVEVSXG4vLyAuLi9zcmMvanMvY29tcG9uZW50cy9TdmdJbWFnZS52dWVcbi8vIG1vZHVsZSBpZCA9IDI2NFxuLy8gbW9kdWxlIGNodW5rcyA9IDAiLCJ2YXIgcmVuZGVyID0gZnVuY3Rpb24oKSB7XG4gIHZhciBfdm0gPSB0aGlzXG4gIHZhciBfaCA9IF92bS4kY3JlYXRlRWxlbWVudFxuICB2YXIgX2MgPSBfdm0uX3NlbGYuX2MgfHwgX2hcbiAgcmV0dXJuIF9jKFwic3ZnXCIsIHtcbiAgICBjbGFzczogX3ZtLmNsYXNzTmFtZSxcbiAgICBhdHRyczoge1xuICAgICAgd2lkdGg6IF92bS53aWR0aCxcbiAgICAgIGhlaWdodDogX3ZtLmhlaWdodCxcbiAgICAgIHZpZXdCb3g6IF92bS52aWV3Qm94LFxuICAgICAgeG1sbnM6IFwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIlxuICAgIH0sXG4gICAgZG9tUHJvcHM6IHsgaW5uZXJIVE1MOiBfdm0uX3MoX3ZtLmNvbnRlbnQpIH0sXG4gICAgb246IHsgY2xpY2s6IF92bS5oYW5kbGVDbGljayB9XG4gIH0pXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfVxuaWYgKG1vZHVsZS5ob3QpIHtcbiAgbW9kdWxlLmhvdC5hY2NlcHQoKVxuICBpZiAobW9kdWxlLmhvdC5kYXRhKSB7XG4gICAgcmVxdWlyZShcInZ1ZS1ob3QtcmVsb2FkLWFwaVwiKSAgICAgIC5yZXJlbmRlcihcImRhdGEtdi01Njc1N2NhM1wiLCB7IHJlbmRlcjogcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnM6IHN0YXRpY1JlbmRlckZucyB9KVxuICB9XG59XG5cblxuLy8vLy8vLy8vLy8vLy8vLy8vXG4vLyBXRUJQQUNLIEZPT1RFUlxuLy8gLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL3RlbXBsYXRlLWNvbXBpbGVyP3tcImlkXCI6XCJkYXRhLXYtNTY3NTdjYTNcIixcImhhc1Njb3BlZFwiOmZhbHNlLFwiYnVibGVcIjp7XCJ0cmFuc2Zvcm1zXCI6e319fSEuLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvc2VsZWN0b3IuanM/dHlwZT10ZW1wbGF0ZSZpbmRleD0wIS4uL3NyYy9qcy9jb21wb25lbnRzL1N2Z0ltYWdlLnZ1ZVxuLy8gbW9kdWxlIGlkID0gMjY1XG4vLyBtb2R1bGUgY2h1bmtzID0gMCJdLCJzb3VyY2VSb290IjoiIn0=