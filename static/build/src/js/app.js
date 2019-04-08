/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
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
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
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
/******/ 	__webpack_require__.p = window.App.cdn;
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "../node_modules/axios/index.js":
/*!**************************************!*\
  !*** ../node_modules/axios/index.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/axios */ "../node_modules/axios/lib/axios.js");

/***/ }),

/***/ "../node_modules/axios/lib/adapters/xhr.js":
/*!*************************************************!*\
  !*** ../node_modules/axios/lib/adapters/xhr.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "../node_modules/axios/lib/utils.js");
var settle = __webpack_require__(/*! ./../core/settle */ "../node_modules/axios/lib/core/settle.js");
var buildURL = __webpack_require__(/*! ./../helpers/buildURL */ "../node_modules/axios/lib/helpers/buildURL.js");
var parseHeaders = __webpack_require__(/*! ./../helpers/parseHeaders */ "../node_modules/axios/lib/helpers/parseHeaders.js");
var isURLSameOrigin = __webpack_require__(/*! ./../helpers/isURLSameOrigin */ "../node_modules/axios/lib/helpers/isURLSameOrigin.js");
var createError = __webpack_require__(/*! ../core/createError */ "../node_modules/axios/lib/core/createError.js");
var btoa = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || __webpack_require__(/*! ./../helpers/btoa */ "../node_modules/axios/lib/helpers/btoa.js");

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();
    var loadEvent = 'onreadystatechange';
    var xDomain = false;

    // For IE 8/9 CORS support
    // Only supports POST and GET calls and doesn't returns the response headers.
    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
    if ( true &&
        typeof window !== 'undefined' &&
        window.XDomainRequest && !('withCredentials' in request) &&
        !isURLSameOrigin(config.url)) {
      request = new window.XDomainRequest();
      loadEvent = 'onload';
      xDomain = true;
      request.onprogress = function handleProgress() {};
      request.ontimeout = function handleTimeout() {};
    }

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request[loadEvent] = function handleLoad() {
      if (!request || (request.readyState !== 4 && !xDomain)) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        // IE sends 1223 instead of 204 (https://github.com/axios/axios/issues/201)
        status: request.status === 1223 ? 204 : request.status,
        statusText: request.status === 1223 ? 'No Content' : request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = __webpack_require__(/*! ./../helpers/cookies */ "../node_modules/axios/lib/helpers/cookies.js");

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
          cookies.read(config.xsrfCookieName) :
          undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (config.withCredentials) {
      request.withCredentials = true;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};


/***/ }),

/***/ "../node_modules/axios/lib/axios.js":
/*!******************************************!*\
  !*** ../node_modules/axios/lib/axios.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "../node_modules/axios/lib/utils.js");
var bind = __webpack_require__(/*! ./helpers/bind */ "../node_modules/axios/lib/helpers/bind.js");
var Axios = __webpack_require__(/*! ./core/Axios */ "../node_modules/axios/lib/core/Axios.js");
var defaults = __webpack_require__(/*! ./defaults */ "../node_modules/axios/lib/defaults.js");

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(utils.merge(defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = __webpack_require__(/*! ./cancel/Cancel */ "../node_modules/axios/lib/cancel/Cancel.js");
axios.CancelToken = __webpack_require__(/*! ./cancel/CancelToken */ "../node_modules/axios/lib/cancel/CancelToken.js");
axios.isCancel = __webpack_require__(/*! ./cancel/isCancel */ "../node_modules/axios/lib/cancel/isCancel.js");

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = __webpack_require__(/*! ./helpers/spread */ "../node_modules/axios/lib/helpers/spread.js");

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;


/***/ }),

/***/ "../node_modules/axios/lib/cancel/Cancel.js":
/*!**************************************************!*\
  !*** ../node_modules/axios/lib/cancel/Cancel.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;


/***/ }),

/***/ "../node_modules/axios/lib/cancel/CancelToken.js":
/*!*******************************************************!*\
  !*** ../node_modules/axios/lib/cancel/CancelToken.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Cancel = __webpack_require__(/*! ./Cancel */ "../node_modules/axios/lib/cancel/Cancel.js");

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;


/***/ }),

/***/ "../node_modules/axios/lib/cancel/isCancel.js":
/*!****************************************************!*\
  !*** ../node_modules/axios/lib/cancel/isCancel.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};


/***/ }),

/***/ "../node_modules/axios/lib/core/Axios.js":
/*!***********************************************!*\
  !*** ../node_modules/axios/lib/core/Axios.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var defaults = __webpack_require__(/*! ./../defaults */ "../node_modules/axios/lib/defaults.js");
var utils = __webpack_require__(/*! ./../utils */ "../node_modules/axios/lib/utils.js");
var InterceptorManager = __webpack_require__(/*! ./InterceptorManager */ "../node_modules/axios/lib/core/InterceptorManager.js");
var dispatchRequest = __webpack_require__(/*! ./dispatchRequest */ "../node_modules/axios/lib/core/dispatchRequest.js");

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = utils.merge({
      url: arguments[0]
    }, arguments[1]);
  }

  config = utils.merge(defaults, {method: 'get'}, this.defaults, config);
  config.method = config.method.toLowerCase();

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;


/***/ }),

/***/ "../node_modules/axios/lib/core/InterceptorManager.js":
/*!************************************************************!*\
  !*** ../node_modules/axios/lib/core/InterceptorManager.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "../node_modules/axios/lib/utils.js");

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;


/***/ }),

/***/ "../node_modules/axios/lib/core/createError.js":
/*!*****************************************************!*\
  !*** ../node_modules/axios/lib/core/createError.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var enhanceError = __webpack_require__(/*! ./enhanceError */ "../node_modules/axios/lib/core/enhanceError.js");

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};


/***/ }),

/***/ "../node_modules/axios/lib/core/dispatchRequest.js":
/*!*********************************************************!*\
  !*** ../node_modules/axios/lib/core/dispatchRequest.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "../node_modules/axios/lib/utils.js");
var transformData = __webpack_require__(/*! ./transformData */ "../node_modules/axios/lib/core/transformData.js");
var isCancel = __webpack_require__(/*! ../cancel/isCancel */ "../node_modules/axios/lib/cancel/isCancel.js");
var defaults = __webpack_require__(/*! ../defaults */ "../node_modules/axios/lib/defaults.js");
var isAbsoluteURL = __webpack_require__(/*! ./../helpers/isAbsoluteURL */ "../node_modules/axios/lib/helpers/isAbsoluteURL.js");
var combineURLs = __webpack_require__(/*! ./../helpers/combineURLs */ "../node_modules/axios/lib/helpers/combineURLs.js");

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Support baseURL config
  if (config.baseURL && !isAbsoluteURL(config.url)) {
    config.url = combineURLs(config.baseURL, config.url);
  }

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers || {}
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};


/***/ }),

/***/ "../node_modules/axios/lib/core/enhanceError.js":
/*!******************************************************!*\
  !*** ../node_modules/axios/lib/core/enhanceError.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }
  error.request = request;
  error.response = response;
  return error;
};


/***/ }),

/***/ "../node_modules/axios/lib/core/settle.js":
/*!************************************************!*\
  !*** ../node_modules/axios/lib/core/settle.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var createError = __webpack_require__(/*! ./createError */ "../node_modules/axios/lib/core/createError.js");

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  // Note: status is not exposed by XDomainRequest
  if (!response.status || !validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};


/***/ }),

/***/ "../node_modules/axios/lib/core/transformData.js":
/*!*******************************************************!*\
  !*** ../node_modules/axios/lib/core/transformData.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "../node_modules/axios/lib/utils.js");

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};


/***/ }),

/***/ "../node_modules/axios/lib/defaults.js":
/*!*********************************************!*\
  !*** ../node_modules/axios/lib/defaults.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {

var utils = __webpack_require__(/*! ./utils */ "../node_modules/axios/lib/utils.js");
var normalizeHeaderName = __webpack_require__(/*! ./helpers/normalizeHeaderName */ "../node_modules/axios/lib/helpers/normalizeHeaderName.js");

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = __webpack_require__(/*! ./adapters/xhr */ "../node_modules/axios/lib/adapters/xhr.js");
  } else if (typeof process !== 'undefined') {
    // For node use HTTP adapter
    adapter = __webpack_require__(/*! ./adapters/http */ "../node_modules/axios/lib/adapters/xhr.js");
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../process/browser.js */ "../node_modules/process/browser.js")))

/***/ }),

/***/ "../node_modules/axios/lib/helpers/bind.js":
/*!*************************************************!*\
  !*** ../node_modules/axios/lib/helpers/bind.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};


/***/ }),

/***/ "../node_modules/axios/lib/helpers/btoa.js":
/*!*************************************************!*\
  !*** ../node_modules/axios/lib/helpers/btoa.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

function E() {
  this.message = 'String contains an invalid character';
}
E.prototype = new Error;
E.prototype.code = 5;
E.prototype.name = 'InvalidCharacterError';

function btoa(input) {
  var str = String(input);
  var output = '';
  for (
    // initialize result and counter
    var block, charCode, idx = 0, map = chars;
    // if the next str index does not exist:
    //   change the mapping table to "="
    //   check if d has no fractional digits
    str.charAt(idx | 0) || (map = '=', idx % 1);
    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
  ) {
    charCode = str.charCodeAt(idx += 3 / 4);
    if (charCode > 0xFF) {
      throw new E();
    }
    block = block << 8 | charCode;
  }
  return output;
}

module.exports = btoa;


/***/ }),

/***/ "../node_modules/axios/lib/helpers/buildURL.js":
/*!*****************************************************!*\
  !*** ../node_modules/axios/lib/helpers/buildURL.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "../node_modules/axios/lib/utils.js");

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};


/***/ }),

/***/ "../node_modules/axios/lib/helpers/combineURLs.js":
/*!********************************************************!*\
  !*** ../node_modules/axios/lib/helpers/combineURLs.js ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};


/***/ }),

/***/ "../node_modules/axios/lib/helpers/cookies.js":
/*!****************************************************!*\
  !*** ../node_modules/axios/lib/helpers/cookies.js ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "../node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
  (function standardBrowserEnv() {
    return {
      write: function write(name, value, expires, path, domain, secure) {
        var cookie = [];
        cookie.push(name + '=' + encodeURIComponent(value));

        if (utils.isNumber(expires)) {
          cookie.push('expires=' + new Date(expires).toGMTString());
        }

        if (utils.isString(path)) {
          cookie.push('path=' + path);
        }

        if (utils.isString(domain)) {
          cookie.push('domain=' + domain);
        }

        if (secure === true) {
          cookie.push('secure');
        }

        document.cookie = cookie.join('; ');
      },

      read: function read(name) {
        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
        return (match ? decodeURIComponent(match[3]) : null);
      },

      remove: function remove(name) {
        this.write(name, '', Date.now() - 86400000);
      }
    };
  })() :

  // Non standard browser env (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return {
      write: function write() {},
      read: function read() { return null; },
      remove: function remove() {}
    };
  })()
);


/***/ }),

/***/ "../node_modules/axios/lib/helpers/isAbsoluteURL.js":
/*!**********************************************************!*\
  !*** ../node_modules/axios/lib/helpers/isAbsoluteURL.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};


/***/ }),

/***/ "../node_modules/axios/lib/helpers/isURLSameOrigin.js":
/*!************************************************************!*\
  !*** ../node_modules/axios/lib/helpers/isURLSameOrigin.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "../node_modules/axios/lib/utils.js");

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
  (function standardBrowserEnv() {
    var msie = /(msie|trident)/i.test(navigator.userAgent);
    var urlParsingNode = document.createElement('a');
    var originURL;

    /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
    function resolveURL(url) {
      var href = url;

      if (msie) {
        // IE needs attribute set twice to normalize properties
        urlParsingNode.setAttribute('href', href);
        href = urlParsingNode.href;
      }

      urlParsingNode.setAttribute('href', href);

      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
      return {
        href: urlParsingNode.href,
        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
        host: urlParsingNode.host,
        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
        hostname: urlParsingNode.hostname,
        port: urlParsingNode.port,
        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
                  urlParsingNode.pathname :
                  '/' + urlParsingNode.pathname
      };
    }

    originURL = resolveURL(window.location.href);

    /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
    return function isURLSameOrigin(requestURL) {
      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
      return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
    };
  })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
  (function nonStandardBrowserEnv() {
    return function isURLSameOrigin() {
      return true;
    };
  })()
);


/***/ }),

/***/ "../node_modules/axios/lib/helpers/normalizeHeaderName.js":
/*!****************************************************************!*\
  !*** ../node_modules/axios/lib/helpers/normalizeHeaderName.js ***!
  \****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ../utils */ "../node_modules/axios/lib/utils.js");

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};


/***/ }),

/***/ "../node_modules/axios/lib/helpers/parseHeaders.js":
/*!*********************************************************!*\
  !*** ../node_modules/axios/lib/helpers/parseHeaders.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./../utils */ "../node_modules/axios/lib/utils.js");

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};


/***/ }),

/***/ "../node_modules/axios/lib/helpers/spread.js":
/*!***************************************************!*\
  !*** ../node_modules/axios/lib/helpers/spread.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};


/***/ }),

/***/ "../node_modules/axios/lib/utils.js":
/*!******************************************!*\
  !*** ../node_modules/axios/lib/utils.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var bind = __webpack_require__(/*! ./helpers/bind */ "../node_modules/axios/lib/helpers/bind.js");
var isBuffer = __webpack_require__(/*! is-buffer */ "../node_modules/is-buffer/index.js");

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  extend: extend,
  trim: trim
};


/***/ }),

/***/ "../node_modules/babel-loader/lib/index.js?!../node_modules/vue-loader/lib/index.js?!../src/js/components/VField.vue?vue&type=script&lang=js&":
/*!************************************************************************************************************************************************************!*\
  !*** ../node_modules/babel-loader/lib??ref--1!../node_modules/vue-loader/lib??vue-loader-options!../src/js/components/VField.vue?vue&type=script&lang=js& ***!
  \************************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
//
//
//
//
/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    id: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: null
    },
    name: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'text'
    },
    value: {
      required: true,
      default: ''
    },
    errors: {
      type: String,
      default: null
    }
  },
  computed: {
    fieldId: function fieldId() {
      return this.$props.id || this.$props.name;
    }
  },
  methods: {
    handleInput: function handleInput(e) {
      this.$emit('input', e.target.value);
    }
  }
});

/***/ }),

/***/ "../node_modules/babel-loader/lib/index.js?!../node_modules/vue-loader/lib/index.js?!../src/js/components/VSvg.vue?vue&type=script&lang=js&":
/*!**********************************************************************************************************************************************************!*\
  !*** ../node_modules/babel-loader/lib??ref--1!../node_modules/vue-loader/lib??vue-loader-options!../src/js/components/VSvg.vue?vue&type=script&lang=js& ***!
  \**********************************************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
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
//
/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    icon: {
      type: String,
      default: null
    },
    data: {
      type: Object,
      default: null
    }
  },
  computed: {
    iconData: function iconData() {
      return this.$props.data || this.$helpers.icon(this.$props.icon);
    },
    className: function className() {
      return _defineProperty({}, this.iconData.attributes.class, true);
    },
    width: function width() {
      return this.iconData.attributes.width;
    },
    height: function height() {
      return this.iconData.attributes.height;
    },
    viewBox: function viewBox() {
      return this.iconData.attributes.viewBox;
    },
    content: function content() {
      return this.iconData.content;
    }
  },
  methods: {
    handleClick: function handleClick($event) {
      this.$emit('click', $event);
    }
  }
});

/***/ }),

/***/ "../node_modules/deep-for-each/es/index.js":
/*!*************************************************!*\
  !*** ../node_modules/deep-for-each/es/index.js ***!
  \*************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash_isplainobject__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash.isplainobject */ "../node_modules/lodash.isplainobject/index.js");
/* harmony import */ var lodash_isplainobject__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_isplainobject__WEBPACK_IMPORTED_MODULE_0__);


function forEachObject(obj, fn, path) {
    for (var key in obj) {
        var deepPath = path ? path + '.' + key : key;

        // Note that we always use obj[key] because it might be mutated by forEach
        fn.call(obj, obj[key], key, obj, deepPath);

        forEach(obj[key], fn, deepPath);
    }
}

function forEachArray(array, fn, path) {
    array.forEach(function (value, index, arr) {
        var deepPath = path + '[' + index + ']';

        fn.call(arr, value, index, arr, deepPath);

        // Note that we use arr[index] because it might be mutated by forEach
        forEach(arr[index], fn, deepPath);
    });
}

function forEach(value, fn, path) {
    path = path || '';

    if (Array.isArray(value)) {
        forEachArray(value, fn, path);
    } else if (lodash_isplainobject__WEBPACK_IMPORTED_MODULE_0___default()(value)) {
        forEachObject(value, fn, path);
    }
}

/* harmony default export */ __webpack_exports__["default"] = (forEach);

/***/ }),

/***/ "../node_modules/is-buffer/index.js":
/*!******************************************!*\
  !*** ../node_modules/is-buffer/index.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */

// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
  return obj != null && (isBuffer(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
}

function isBuffer (obj) {
  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
}

// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer(obj.slice(0, 0))
}


/***/ }),

/***/ "../node_modules/lodash.isplainobject/index.js":
/*!*****************************************************!*\
  !*** ../node_modules/lodash.isplainobject/index.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/**
 * Checks if `value` is a host object in IE < 9.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a host object, else `false`.
 */
function isHostObject(value) {
  // Many host objects are `Object` objects that can coerce to strings
  // despite having improperly defined `toString` methods.
  var result = false;
  if (value != null && typeof value.toString != 'function') {
    try {
      result = !!(value + '');
    } catch (e) {}
  }
  return result;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/** Used for built-in method references. */
var funcProto = Function.prototype,
    objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var funcToString = funcProto.toString;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/** Used to infer the `Object` constructor. */
var objectCtorString = funcToString.call(Object);

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var getPrototype = overArg(Object.getPrototypeOf, Object);

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * @static
 * @memberOf _
 * @since 0.8.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
function isPlainObject(value) {
  if (!isObjectLike(value) ||
      objectToString.call(value) != objectTag || isHostObject(value)) {
    return false;
  }
  var proto = getPrototype(value);
  if (proto === null) {
    return true;
  }
  var Ctor = hasOwnProperty.call(proto, 'constructor') && proto.constructor;
  return (typeof Ctor == 'function' &&
    Ctor instanceof Ctor && funcToString.call(Ctor) == objectCtorString);
}

module.exports = isPlainObject;


/***/ }),

/***/ "../node_modules/process/browser.js":
/*!******************************************!*\
  !*** ../node_modules/process/browser.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "../node_modules/qs/lib/formats.js":
/*!*****************************************!*\
  !*** ../node_modules/qs/lib/formats.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var replace = String.prototype.replace;
var percentTwenties = /%20/g;

module.exports = {
    'default': 'RFC3986',
    formatters: {
        RFC1738: function (value) {
            return replace.call(value, percentTwenties, '+');
        },
        RFC3986: function (value) {
            return value;
        }
    },
    RFC1738: 'RFC1738',
    RFC3986: 'RFC3986'
};


/***/ }),

/***/ "../node_modules/qs/lib/index.js":
/*!***************************************!*\
  !*** ../node_modules/qs/lib/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var stringify = __webpack_require__(/*! ./stringify */ "../node_modules/qs/lib/stringify.js");
var parse = __webpack_require__(/*! ./parse */ "../node_modules/qs/lib/parse.js");
var formats = __webpack_require__(/*! ./formats */ "../node_modules/qs/lib/formats.js");

module.exports = {
    formats: formats,
    parse: parse,
    stringify: stringify
};


/***/ }),

/***/ "../node_modules/qs/lib/parse.js":
/*!***************************************!*\
  !*** ../node_modules/qs/lib/parse.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "../node_modules/qs/lib/utils.js");

var has = Object.prototype.hasOwnProperty;

var defaults = {
    allowDots: false,
    allowPrototypes: false,
    arrayLimit: 20,
    decoder: utils.decode,
    delimiter: '&',
    depth: 5,
    parameterLimit: 1000,
    plainObjects: false,
    strictNullHandling: false
};

var parseValues = function parseQueryStringValues(str, options) {
    var obj = {};
    var cleanStr = options.ignoreQueryPrefix ? str.replace(/^\?/, '') : str;
    var limit = options.parameterLimit === Infinity ? undefined : options.parameterLimit;
    var parts = cleanStr.split(options.delimiter, limit);

    for (var i = 0; i < parts.length; ++i) {
        var part = parts[i];

        var bracketEqualsPos = part.indexOf(']=');
        var pos = bracketEqualsPos === -1 ? part.indexOf('=') : bracketEqualsPos + 1;

        var key, val;
        if (pos === -1) {
            key = options.decoder(part, defaults.decoder);
            val = options.strictNullHandling ? null : '';
        } else {
            key = options.decoder(part.slice(0, pos), defaults.decoder);
            val = options.decoder(part.slice(pos + 1), defaults.decoder);
        }
        if (has.call(obj, key)) {
            obj[key] = [].concat(obj[key]).concat(val);
        } else {
            obj[key] = val;
        }
    }

    return obj;
};

var parseObject = function (chain, val, options) {
    var leaf = val;

    for (var i = chain.length - 1; i >= 0; --i) {
        var obj;
        var root = chain[i];

        if (root === '[]') {
            obj = [];
            obj = obj.concat(leaf);
        } else {
            obj = options.plainObjects ? Object.create(null) : {};
            var cleanRoot = root.charAt(0) === '[' && root.charAt(root.length - 1) === ']' ? root.slice(1, -1) : root;
            var index = parseInt(cleanRoot, 10);
            if (
                !isNaN(index)
                && root !== cleanRoot
                && String(index) === cleanRoot
                && index >= 0
                && (options.parseArrays && index <= options.arrayLimit)
            ) {
                obj = [];
                obj[index] = leaf;
            } else {
                obj[cleanRoot] = leaf;
            }
        }

        leaf = obj;
    }

    return leaf;
};

var parseKeys = function parseQueryStringKeys(givenKey, val, options) {
    if (!givenKey) {
        return;
    }

    // Transform dot notation to bracket notation
    var key = options.allowDots ? givenKey.replace(/\.([^.[]+)/g, '[$1]') : givenKey;

    // The regex chunks

    var brackets = /(\[[^[\]]*])/;
    var child = /(\[[^[\]]*])/g;

    // Get the parent

    var segment = brackets.exec(key);
    var parent = segment ? key.slice(0, segment.index) : key;

    // Stash the parent if it exists

    var keys = [];
    if (parent) {
        // If we aren't using plain objects, optionally prefix keys
        // that would overwrite object prototype properties
        if (!options.plainObjects && has.call(Object.prototype, parent)) {
            if (!options.allowPrototypes) {
                return;
            }
        }

        keys.push(parent);
    }

    // Loop through children appending to the array until we hit depth

    var i = 0;
    while ((segment = child.exec(key)) !== null && i < options.depth) {
        i += 1;
        if (!options.plainObjects && has.call(Object.prototype, segment[1].slice(1, -1))) {
            if (!options.allowPrototypes) {
                return;
            }
        }
        keys.push(segment[1]);
    }

    // If there's a remainder, just add whatever is left

    if (segment) {
        keys.push('[' + key.slice(segment.index) + ']');
    }

    return parseObject(keys, val, options);
};

module.exports = function (str, opts) {
    var options = opts ? utils.assign({}, opts) : {};

    if (options.decoder !== null && options.decoder !== undefined && typeof options.decoder !== 'function') {
        throw new TypeError('Decoder has to be a function.');
    }

    options.ignoreQueryPrefix = options.ignoreQueryPrefix === true;
    options.delimiter = typeof options.delimiter === 'string' || utils.isRegExp(options.delimiter) ? options.delimiter : defaults.delimiter;
    options.depth = typeof options.depth === 'number' ? options.depth : defaults.depth;
    options.arrayLimit = typeof options.arrayLimit === 'number' ? options.arrayLimit : defaults.arrayLimit;
    options.parseArrays = options.parseArrays !== false;
    options.decoder = typeof options.decoder === 'function' ? options.decoder : defaults.decoder;
    options.allowDots = typeof options.allowDots === 'boolean' ? options.allowDots : defaults.allowDots;
    options.plainObjects = typeof options.plainObjects === 'boolean' ? options.plainObjects : defaults.plainObjects;
    options.allowPrototypes = typeof options.allowPrototypes === 'boolean' ? options.allowPrototypes : defaults.allowPrototypes;
    options.parameterLimit = typeof options.parameterLimit === 'number' ? options.parameterLimit : defaults.parameterLimit;
    options.strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : defaults.strictNullHandling;

    if (str === '' || str === null || typeof str === 'undefined') {
        return options.plainObjects ? Object.create(null) : {};
    }

    var tempObj = typeof str === 'string' ? parseValues(str, options) : str;
    var obj = options.plainObjects ? Object.create(null) : {};

    // Iterate over the keys and setup the new object

    var keys = Object.keys(tempObj);
    for (var i = 0; i < keys.length; ++i) {
        var key = keys[i];
        var newObj = parseKeys(key, tempObj[key], options);
        obj = utils.merge(obj, newObj, options);
    }

    return utils.compact(obj);
};


/***/ }),

/***/ "../node_modules/qs/lib/stringify.js":
/*!*******************************************!*\
  !*** ../node_modules/qs/lib/stringify.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var utils = __webpack_require__(/*! ./utils */ "../node_modules/qs/lib/utils.js");
var formats = __webpack_require__(/*! ./formats */ "../node_modules/qs/lib/formats.js");

var arrayPrefixGenerators = {
    brackets: function brackets(prefix) { // eslint-disable-line func-name-matching
        return prefix + '[]';
    },
    indices: function indices(prefix, key) { // eslint-disable-line func-name-matching
        return prefix + '[' + key + ']';
    },
    repeat: function repeat(prefix) { // eslint-disable-line func-name-matching
        return prefix;
    }
};

var toISO = Date.prototype.toISOString;

var defaults = {
    delimiter: '&',
    encode: true,
    encoder: utils.encode,
    encodeValuesOnly: false,
    serializeDate: function serializeDate(date) { // eslint-disable-line func-name-matching
        return toISO.call(date);
    },
    skipNulls: false,
    strictNullHandling: false
};

var stringify = function stringify( // eslint-disable-line func-name-matching
    object,
    prefix,
    generateArrayPrefix,
    strictNullHandling,
    skipNulls,
    encoder,
    filter,
    sort,
    allowDots,
    serializeDate,
    formatter,
    encodeValuesOnly
) {
    var obj = object;
    if (typeof filter === 'function') {
        obj = filter(prefix, obj);
    } else if (obj instanceof Date) {
        obj = serializeDate(obj);
    } else if (obj === null) {
        if (strictNullHandling) {
            return encoder && !encodeValuesOnly ? encoder(prefix, defaults.encoder) : prefix;
        }

        obj = '';
    }

    if (typeof obj === 'string' || typeof obj === 'number' || typeof obj === 'boolean' || utils.isBuffer(obj)) {
        if (encoder) {
            var keyValue = encodeValuesOnly ? prefix : encoder(prefix, defaults.encoder);
            return [formatter(keyValue) + '=' + formatter(encoder(obj, defaults.encoder))];
        }
        return [formatter(prefix) + '=' + formatter(String(obj))];
    }

    var values = [];

    if (typeof obj === 'undefined') {
        return values;
    }

    var objKeys;
    if (Array.isArray(filter)) {
        objKeys = filter;
    } else {
        var keys = Object.keys(obj);
        objKeys = sort ? keys.sort(sort) : keys;
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (skipNulls && obj[key] === null) {
            continue;
        }

        if (Array.isArray(obj)) {
            values = values.concat(stringify(
                obj[key],
                generateArrayPrefix(prefix, key),
                generateArrayPrefix,
                strictNullHandling,
                skipNulls,
                encoder,
                filter,
                sort,
                allowDots,
                serializeDate,
                formatter,
                encodeValuesOnly
            ));
        } else {
            values = values.concat(stringify(
                obj[key],
                prefix + (allowDots ? '.' + key : '[' + key + ']'),
                generateArrayPrefix,
                strictNullHandling,
                skipNulls,
                encoder,
                filter,
                sort,
                allowDots,
                serializeDate,
                formatter,
                encodeValuesOnly
            ));
        }
    }

    return values;
};

module.exports = function (object, opts) {
    var obj = object;
    var options = opts ? utils.assign({}, opts) : {};

    if (options.encoder !== null && options.encoder !== undefined && typeof options.encoder !== 'function') {
        throw new TypeError('Encoder has to be a function.');
    }

    var delimiter = typeof options.delimiter === 'undefined' ? defaults.delimiter : options.delimiter;
    var strictNullHandling = typeof options.strictNullHandling === 'boolean' ? options.strictNullHandling : defaults.strictNullHandling;
    var skipNulls = typeof options.skipNulls === 'boolean' ? options.skipNulls : defaults.skipNulls;
    var encode = typeof options.encode === 'boolean' ? options.encode : defaults.encode;
    var encoder = typeof options.encoder === 'function' ? options.encoder : defaults.encoder;
    var sort = typeof options.sort === 'function' ? options.sort : null;
    var allowDots = typeof options.allowDots === 'undefined' ? false : options.allowDots;
    var serializeDate = typeof options.serializeDate === 'function' ? options.serializeDate : defaults.serializeDate;
    var encodeValuesOnly = typeof options.encodeValuesOnly === 'boolean' ? options.encodeValuesOnly : defaults.encodeValuesOnly;
    if (typeof options.format === 'undefined') {
        options.format = formats['default'];
    } else if (!Object.prototype.hasOwnProperty.call(formats.formatters, options.format)) {
        throw new TypeError('Unknown format option provided.');
    }
    var formatter = formats.formatters[options.format];
    var objKeys;
    var filter;

    if (typeof options.filter === 'function') {
        filter = options.filter;
        obj = filter('', obj);
    } else if (Array.isArray(options.filter)) {
        filter = options.filter;
        objKeys = filter;
    }

    var keys = [];

    if (typeof obj !== 'object' || obj === null) {
        return '';
    }

    var arrayFormat;
    if (options.arrayFormat in arrayPrefixGenerators) {
        arrayFormat = options.arrayFormat;
    } else if ('indices' in options) {
        arrayFormat = options.indices ? 'indices' : 'repeat';
    } else {
        arrayFormat = 'indices';
    }

    var generateArrayPrefix = arrayPrefixGenerators[arrayFormat];

    if (!objKeys) {
        objKeys = Object.keys(obj);
    }

    if (sort) {
        objKeys.sort(sort);
    }

    for (var i = 0; i < objKeys.length; ++i) {
        var key = objKeys[i];

        if (skipNulls && obj[key] === null) {
            continue;
        }

        keys = keys.concat(stringify(
            obj[key],
            key,
            generateArrayPrefix,
            strictNullHandling,
            skipNulls,
            encode ? encoder : null,
            filter,
            sort,
            allowDots,
            serializeDate,
            formatter,
            encodeValuesOnly
        ));
    }

    var joined = keys.join(delimiter);
    var prefix = options.addQueryPrefix === true ? '?' : '';

    return joined.length > 0 ? prefix + joined : '';
};


/***/ }),

/***/ "../node_modules/qs/lib/utils.js":
/*!***************************************!*\
  !*** ../node_modules/qs/lib/utils.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = Object.prototype.hasOwnProperty;

var hexTable = (function () {
    var array = [];
    for (var i = 0; i < 256; ++i) {
        array.push('%' + ((i < 16 ? '0' : '') + i.toString(16)).toUpperCase());
    }

    return array;
}());

var compactQueue = function compactQueue(queue) {
    var obj;

    while (queue.length) {
        var item = queue.pop();
        obj = item.obj[item.prop];

        if (Array.isArray(obj)) {
            var compacted = [];

            for (var j = 0; j < obj.length; ++j) {
                if (typeof obj[j] !== 'undefined') {
                    compacted.push(obj[j]);
                }
            }

            item.obj[item.prop] = compacted;
        }
    }

    return obj;
};

var arrayToObject = function arrayToObject(source, options) {
    var obj = options && options.plainObjects ? Object.create(null) : {};
    for (var i = 0; i < source.length; ++i) {
        if (typeof source[i] !== 'undefined') {
            obj[i] = source[i];
        }
    }

    return obj;
};

var merge = function merge(target, source, options) {
    if (!source) {
        return target;
    }

    if (typeof source !== 'object') {
        if (Array.isArray(target)) {
            target.push(source);
        } else if (typeof target === 'object') {
            if (options.plainObjects || options.allowPrototypes || !has.call(Object.prototype, source)) {
                target[source] = true;
            }
        } else {
            return [target, source];
        }

        return target;
    }

    if (typeof target !== 'object') {
        return [target].concat(source);
    }

    var mergeTarget = target;
    if (Array.isArray(target) && !Array.isArray(source)) {
        mergeTarget = arrayToObject(target, options);
    }

    if (Array.isArray(target) && Array.isArray(source)) {
        source.forEach(function (item, i) {
            if (has.call(target, i)) {
                if (target[i] && typeof target[i] === 'object') {
                    target[i] = merge(target[i], item, options);
                } else {
                    target.push(item);
                }
            } else {
                target[i] = item;
            }
        });
        return target;
    }

    return Object.keys(source).reduce(function (acc, key) {
        var value = source[key];

        if (has.call(acc, key)) {
            acc[key] = merge(acc[key], value, options);
        } else {
            acc[key] = value;
        }
        return acc;
    }, mergeTarget);
};

var assign = function assignSingleSource(target, source) {
    return Object.keys(source).reduce(function (acc, key) {
        acc[key] = source[key];
        return acc;
    }, target);
};

var decode = function (str) {
    try {
        return decodeURIComponent(str.replace(/\+/g, ' '));
    } catch (e) {
        return str;
    }
};

var encode = function encode(str) {
    // This code was originally written by Brian White (mscdex) for the io.js core querystring library.
    // It has been adapted here for stricter adherence to RFC 3986
    if (str.length === 0) {
        return str;
    }

    var string = typeof str === 'string' ? str : String(str);

    var out = '';
    for (var i = 0; i < string.length; ++i) {
        var c = string.charCodeAt(i);

        if (
            c === 0x2D // -
            || c === 0x2E // .
            || c === 0x5F // _
            || c === 0x7E // ~
            || (c >= 0x30 && c <= 0x39) // 0-9
            || (c >= 0x41 && c <= 0x5A) // a-z
            || (c >= 0x61 && c <= 0x7A) // A-Z
        ) {
            out += string.charAt(i);
            continue;
        }

        if (c < 0x80) {
            out = out + hexTable[c];
            continue;
        }

        if (c < 0x800) {
            out = out + (hexTable[0xC0 | (c >> 6)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        if (c < 0xD800 || c >= 0xE000) {
            out = out + (hexTable[0xE0 | (c >> 12)] + hexTable[0x80 | ((c >> 6) & 0x3F)] + hexTable[0x80 | (c & 0x3F)]);
            continue;
        }

        i += 1;
        c = 0x10000 + (((c & 0x3FF) << 10) | (string.charCodeAt(i) & 0x3FF));
        out += hexTable[0xF0 | (c >> 18)]
            + hexTable[0x80 | ((c >> 12) & 0x3F)]
            + hexTable[0x80 | ((c >> 6) & 0x3F)]
            + hexTable[0x80 | (c & 0x3F)];
    }

    return out;
};

var compact = function compact(value) {
    var queue = [{ obj: { o: value }, prop: 'o' }];
    var refs = [];

    for (var i = 0; i < queue.length; ++i) {
        var item = queue[i];
        var obj = item.obj[item.prop];

        var keys = Object.keys(obj);
        for (var j = 0; j < keys.length; ++j) {
            var key = keys[j];
            var val = obj[key];
            if (typeof val === 'object' && val !== null && refs.indexOf(val) === -1) {
                queue.push({ obj: obj, prop: key });
                refs.push(val);
            }
        }
    }

    return compactQueue(queue);
};

var isRegExp = function isRegExp(obj) {
    return Object.prototype.toString.call(obj) === '[object RegExp]';
};

var isBuffer = function isBuffer(obj) {
    if (obj === null || typeof obj === 'undefined') {
        return false;
    }

    return !!(obj.constructor && obj.constructor.isBuffer && obj.constructor.isBuffer(obj));
};

module.exports = {
    arrayToObject: arrayToObject,
    assign: assign,
    compact: compact,
    decode: decode,
    encode: encode,
    isBuffer: isBuffer,
    isRegExp: isRegExp,
    merge: merge
};


/***/ }),

/***/ "../node_modules/regenerator-runtime/runtime.js":
/*!******************************************************!*\
  !*** ../node_modules/regenerator-runtime/runtime.js ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    if (typeof global.process === "object" && global.process.domain) {
      invoke = global.process.domain.bind(invoke);
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // Among the various tricks for obtaining a reference to the global
  // object, this seems to be the most reliable technique that does not
  // use indirect eval (which violates Content Security Policy).
  typeof global === "object" ? global :
  typeof window === "object" ? window :
  typeof self === "object" ? self : this
);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "../node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "../node_modules/sprintf-js/src/sprintf.js":
/*!*************************************************!*\
  !*** ../node_modules/sprintf-js/src/sprintf.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/* global window, exports, define */

!function() {
    'use strict'

    var re = {
        not_string: /[^s]/,
        not_bool: /[^t]/,
        not_type: /[^T]/,
        not_primitive: /[^v]/,
        number: /[diefg]/,
        numeric_arg: /[bcdiefguxX]/,
        json: /[j]/,
        not_json: /[^j]/,
        text: /^[^\x25]+/,
        modulo: /^\x25{2}/,
        placeholder: /^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-gijostTuvxX])/,
        key: /^([a-z_][a-z_\d]*)/i,
        key_access: /^\.([a-z_][a-z_\d]*)/i,
        index_access: /^\[(\d+)\]/,
        sign: /^[\+\-]/
    }

    function sprintf(key) {
        // `arguments` is not an array, but should be fine for this call
        return sprintf_format(sprintf_parse(key), arguments)
    }

    function vsprintf(fmt, argv) {
        return sprintf.apply(null, [fmt].concat(argv || []))
    }

    function sprintf_format(parse_tree, argv) {
        var cursor = 1, tree_length = parse_tree.length, arg, output = '', i, k, match, pad, pad_character, pad_length, is_positive, sign
        for (i = 0; i < tree_length; i++) {
            if (typeof parse_tree[i] === 'string') {
                output += parse_tree[i]
            }
            else if (Array.isArray(parse_tree[i])) {
                match = parse_tree[i] // convenience purposes only
                if (match[2]) { // keyword argument
                    arg = argv[cursor]
                    for (k = 0; k < match[2].length; k++) {
                        if (!arg.hasOwnProperty(match[2][k])) {
                            throw new Error(sprintf('[sprintf] property "%s" does not exist', match[2][k]))
                        }
                        arg = arg[match[2][k]]
                    }
                }
                else if (match[1]) { // positional argument (explicit)
                    arg = argv[match[1]]
                }
                else { // positional argument (implicit)
                    arg = argv[cursor++]
                }

                if (re.not_type.test(match[8]) && re.not_primitive.test(match[8]) && arg instanceof Function) {
                    arg = arg()
                }

                if (re.numeric_arg.test(match[8]) && (typeof arg !== 'number' && isNaN(arg))) {
                    throw new TypeError(sprintf('[sprintf] expecting number but found %T', arg))
                }

                if (re.number.test(match[8])) {
                    is_positive = arg >= 0
                }

                switch (match[8]) {
                    case 'b':
                        arg = parseInt(arg, 10).toString(2)
                        break
                    case 'c':
                        arg = String.fromCharCode(parseInt(arg, 10))
                        break
                    case 'd':
                    case 'i':
                        arg = parseInt(arg, 10)
                        break
                    case 'j':
                        arg = JSON.stringify(arg, null, match[6] ? parseInt(match[6]) : 0)
                        break
                    case 'e':
                        arg = match[7] ? parseFloat(arg).toExponential(match[7]) : parseFloat(arg).toExponential()
                        break
                    case 'f':
                        arg = match[7] ? parseFloat(arg).toFixed(match[7]) : parseFloat(arg)
                        break
                    case 'g':
                        arg = match[7] ? String(Number(arg.toPrecision(match[7]))) : parseFloat(arg)
                        break
                    case 'o':
                        arg = (parseInt(arg, 10) >>> 0).toString(8)
                        break
                    case 's':
                        arg = String(arg)
                        arg = (match[7] ? arg.substring(0, match[7]) : arg)
                        break
                    case 't':
                        arg = String(!!arg)
                        arg = (match[7] ? arg.substring(0, match[7]) : arg)
                        break
                    case 'T':
                        arg = Object.prototype.toString.call(arg).slice(8, -1).toLowerCase()
                        arg = (match[7] ? arg.substring(0, match[7]) : arg)
                        break
                    case 'u':
                        arg = parseInt(arg, 10) >>> 0
                        break
                    case 'v':
                        arg = arg.valueOf()
                        arg = (match[7] ? arg.substring(0, match[7]) : arg)
                        break
                    case 'x':
                        arg = (parseInt(arg, 10) >>> 0).toString(16)
                        break
                    case 'X':
                        arg = (parseInt(arg, 10) >>> 0).toString(16).toUpperCase()
                        break
                }
                if (re.json.test(match[8])) {
                    output += arg
                }
                else {
                    if (re.number.test(match[8]) && (!is_positive || match[3])) {
                        sign = is_positive ? '+' : '-'
                        arg = arg.toString().replace(re.sign, '')
                    }
                    else {
                        sign = ''
                    }
                    pad_character = match[4] ? match[4] === '0' ? '0' : match[4].charAt(1) : ' '
                    pad_length = match[6] - (sign + arg).length
                    pad = match[6] ? (pad_length > 0 ? pad_character.repeat(pad_length) : '') : ''
                    output += match[5] ? sign + arg + pad : (pad_character === '0' ? sign + pad + arg : pad + sign + arg)
                }
            }
        }
        return output
    }

    var sprintf_cache = Object.create(null)

    function sprintf_parse(fmt) {
        if (sprintf_cache[fmt]) {
            return sprintf_cache[fmt]
        }

        var _fmt = fmt, match, parse_tree = [], arg_names = 0
        while (_fmt) {
            if ((match = re.text.exec(_fmt)) !== null) {
                parse_tree.push(match[0])
            }
            else if ((match = re.modulo.exec(_fmt)) !== null) {
                parse_tree.push('%')
            }
            else if ((match = re.placeholder.exec(_fmt)) !== null) {
                if (match[2]) {
                    arg_names |= 1
                    var field_list = [], replacement_field = match[2], field_match = []
                    if ((field_match = re.key.exec(replacement_field)) !== null) {
                        field_list.push(field_match[1])
                        while ((replacement_field = replacement_field.substring(field_match[0].length)) !== '') {
                            if ((field_match = re.key_access.exec(replacement_field)) !== null) {
                                field_list.push(field_match[1])
                            }
                            else if ((field_match = re.index_access.exec(replacement_field)) !== null) {
                                field_list.push(field_match[1])
                            }
                            else {
                                throw new SyntaxError('[sprintf] failed to parse named argument key')
                            }
                        }
                    }
                    else {
                        throw new SyntaxError('[sprintf] failed to parse named argument key')
                    }
                    match[2] = field_list
                }
                else {
                    arg_names |= 2
                }
                if (arg_names === 3) {
                    throw new Error('[sprintf] mixing positional and named placeholders is not (yet) supported')
                }
                parse_tree.push(match)
            }
            else {
                throw new SyntaxError('[sprintf] unexpected placeholder')
            }
            _fmt = _fmt.substring(match[0].length)
        }
        return sprintf_cache[fmt] = parse_tree
    }

    /**
     * export to either browser or node.js
     */
    /* eslint-disable quote-props */
    if (true) {
        exports['sprintf'] = sprintf
        exports['vsprintf'] = vsprintf
    }
    if (typeof window !== 'undefined') {
        window['sprintf'] = sprintf
        window['vsprintf'] = vsprintf

        if (true) {
            !(__WEBPACK_AMD_DEFINE_RESULT__ = (function() {
                return {
                    'sprintf': sprintf,
                    'vsprintf': vsprintf
                }
            }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
        }
    }
    /* eslint-enable quote-props */
}()


/***/ }),

/***/ "../node_modules/vue-deepset/index.js":
/*!********************************************!*\
  !*** ../node_modules/vue-deepset/index.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.vueSet = vueSet;
exports.vuexSet = vuexSet;
exports.VUEX_DEEP_SET = VUEX_DEEP_SET;
exports.extendMutation = extendMutation;
exports.vueModel = vueModel;
exports.vuexModel = vuexModel;
exports.deepModel = deepModel;
exports.install = install;

var _vue = __webpack_require__(/*! vue */ "vue");

var _vue2 = _interopRequireDefault(_vue);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var invalidKey = /^\d|[^a-zA-Z0-9_]/gm;
var intKey = /^\d+$/;

function isNumberLike(value) {
  return String(value).match(/^\d+$/);
}

function toPath(pathString) {
  if (Array.isArray(pathString)) return pathString;
  if (typeof pathString === 'number') return [pathString];
  pathString = String(pathString);

  // taken from lodash - https://github.com/lodash/lodash
  var pathRx = /[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(\.|\[\])(?:\4|$))/g;
  var pathArray = [];

  pathString.replace(pathRx, function (match, number, quote, string) {
    pathArray.push(quote ? string : number !== undefined ? Number(number) : match);
    return pathArray[pathArray.length - 1];
  });
  return pathArray;
}

function noop() {}

function hasOwnProperty(object, property) {
  return Object.prototype.hasOwnProperty.call(object, property);
}

function deepsetError(message) {
  return new Error('[vue-deepset]: ' + message);
}

function isObjectLike(object) {
  return (typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object' && object !== null;
}

function pathJoin(base, path) {
  try {
    var connector = path.match(/^\[/) ? '' : '.';
    return '' + (base || '') + (base ? connector : '') + path;
  } catch (error) {
    return '';
  }
}

function pushPaths(object, current, paths) {
  paths.push(current);
  if (isObjectLike(object)) {
    getPaths(object, current, paths);
  }
}

function forEach(object, iteratee) {
  var isArray = Array.isArray(object);
  var keys = isArray ? object : Object.keys(object);
  keys.forEach(function (value, index) {
    return isArray ? iteratee(value, index) : iteratee(object[value], value);
  });
}

function has(object, path) {
  var obj = object;
  var parts = toPath(path);
  while (parts.length) {
    var key = parts.shift();
    if (!hasOwnProperty(obj, key)) {
      return false;
    } else if (!parts.length) {
      return true;
    }
    obj = obj[key];
  }
  return false;
}

function getPaths(object) {
  var current = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var paths = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  if (Array.isArray(object)) {
    forEach(object, function (val, idx) {
      pushPaths(val, (current + '.' + idx).replace(/^\./, ''), paths);
      pushPaths(val, (current + '[' + idx + ']').replace(/^\./, ''), paths);
      pushPaths(val, (current + '["' + idx + '"]').replace(/^\./, ''), paths);
    });
  } else if (isObjectLike(object)) {
    forEach(object, function (val, key) {
      if (key.match(intKey) !== null) {
        // is index
        pushPaths(val, (current + '.' + key).replace(/^\./, ''), paths);
        pushPaths(val, (current + '[' + key + ']').replace(/^\./, ''), paths);
        pushPaths(val, (current + '["' + key + '"]').replace(/^\./, ''), paths);
      } else if (!key.match(invalidKey)) {
        pushPaths(val, (current + '.' + key).replace(/^\./, ''), paths);
      }
      // always add the absolute array notation path
      pushPaths(val, (current + '["' + key + '"]').replace(/^\./, ''), paths);
    });
  }
  return [].concat(new Set(paths));
}

function _get(obj, path, defaultValue) {
  try {
    var o = obj;
    var fields = toPath(path);
    while (fields.length) {
      var prop = fields.shift();
      o = o[prop];
      if (!fields.length) {
        return o;
      }
    }
  } catch (err) {
    return defaultValue;
  }
  return defaultValue;
}

function getProxy(vm, base, options) {
  noop(options); // for future potential options
  var isVuex = typeof base === 'string';
  var object = isVuex ? _get(vm.$store.state, base) : base;

  return new Proxy(object, {
    get: function get(target, property) {
      return _get(target, property);
    },
    set: function set(target, property, value) {
      isVuex ? vuexSet.call(vm, pathJoin(base, property), value) : vueSet(target, property, value);
      return true;
    },
    deleteProperty: function deleteProperty() {
      return true;
    },
    enumerate: function enumerate(target) {
      return Object.keys(target);
    },
    ownKeys: function ownKeys(target) {
      return Object.keys(target);
    },
    has: function has(target, property) {
      return true;
    },
    defineProperty: function defineProperty(target) {
      return target;
    },
    getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, property) {
      return {
        value: _get(target, property),
        writable: false,
        enumerable: true,
        configurable: true
      };
    }
  });
}

function buildVueModel(vm, object, options) {
  var model = {};
  forEach(getPaths(object), function (path) {
    Object.defineProperty(model, path, {
      configurable: true,
      enumerable: true,
      get: function get() {
        return _get(object, path);
      },
      set: function set(value) {
        return vueSet(object, path, value);
      }
    });
  });
  return model;
}

function buildVuexModel(vm, vuexPath, options) {
  var model = Object.create(null);
  var object = _get(vm.$store.state, vuexPath);
  var paths = getPaths(object);
  forEach(paths, function (path) {
    var propPath = pathJoin(vuexPath, path);
    Object.defineProperty(model, path, {
      configurable: true,
      enumerable: true,
      get: function get() {
        return _get(vm.$store.state, propPath);
      },
      set: function set(value) {
        return vuexSet.call(vm, propPath, value);
      }
    });
  });
  return model;
}

function vueSet(obj, path, value) {
  var fields = Array.isArray(path) ? path : toPath(path);
  var prop = fields.shift();

  if (!fields.length) return _vue2.default.set(obj, prop, value);
  if (!hasOwnProperty(obj, prop) || obj[prop] === null) {
    var objVal = fields.length >= 1 && isNumberLike(fields[0]) ? [] : {};
    _vue2.default.set(obj, prop, objVal);
  }
  vueSet(obj[prop], fields, value);
}

function vuexSet(path, value) {
  if (!isObjectLike(this.$store)) {
    throw deepsetError('could not find vuex store object on instance');
  }
  var method = this.$store.commit ? 'commit' : 'dispatch';
  this.$store[method]('VUEX_DEEP_SET', { path: path, value: value });
}

function VUEX_DEEP_SET(state, _ref) {
  var path = _ref.path,
      value = _ref.value;

  vueSet(state, path, value);
}

function extendMutation() {
  var mutations = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return Object.assign(mutations, { VUEX_DEEP_SET: VUEX_DEEP_SET });
}

function vueModel(object, options) {
  var opts = Object.assign({}, options);
  if (!isObjectLike(object)) {
    throw deepsetError('invalid object specified for vue model');
  } else if (opts.useProxy === false || typeof Proxy === 'undefined') {
    return buildVueModel(this, object, opts);
  }
  return getProxy(this, object, opts);
}

function vuexModel(vuexPath, options) {
  var opts = Object.assign({}, options);
  if (typeof vuexPath !== 'string' || vuexPath === '') {
    throw deepsetError('invalid vuex path string');
  } else if (!isObjectLike(this.$store) || !isObjectLike(this.$store.state)) {
    throw deepsetError('no vuex state found');
  } else if (!has(this.$store.state, vuexPath)) {
    throw deepsetError('cannot find path "' + vuexPath + '" in Vuex store');
  } else if (opts.useProxy === false || typeof Proxy === 'undefined') {
    return buildVuexModel(this, vuexPath, opts);
  }
  return getProxy(this, vuexPath, opts);
}

function deepModel(base, options) {
  return typeof base === 'string' ? vuexModel.call(this, base, options) : vueModel.call(this, base, options);
}

function install(VueInstance) {
  VueInstance.prototype.$deepModel = deepModel;
  VueInstance.prototype.$vueSet = vueSet;
  VueInstance.prototype.$vuexSet = vuexSet;
}


/***/ }),

/***/ "../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!../src/js/components/VField.vue?vue&type=template&id=fb380820&":
/*!******************************************************************************************************************************************************************************************************!*\
  !*** ../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/vue-loader/lib??vue-loader-options!../src/js/components/VField.vue?vue&type=template&id=fb380820& ***!
  \******************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "form-group" }, [
    _c("input", {
      staticClass: "form-control form-control-lg",
      class: { "is-invalid": _vm.errors },
      attrs: { id: _vm.fieldId, type: _vm.type, name: _vm.name },
      domProps: { value: _vm.value },
      on: { input: _vm.handleInput }
    }),
    _vm._v(" "),
    _vm.errors
      ? _c("div", { staticClass: "invalid-feedback" }, [
          _vm._v("\n        " + _vm._s(_vm.errors) + "\n    ")
        ])
      : _vm._e(),
    _vm._v(" "),
    _vm.label
      ? _c(
          "label",
          { staticClass: "form-group-label", attrs: { for: _vm.fieldId } },
          [_vm._v(_vm._s(_vm.label))]
        )
      : _vm._e()
  ])
}
var staticRenderFns = []
render._withStripped = true



/***/ }),

/***/ "../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!../src/js/components/VSvg.vue?vue&type=template&id=192013da&":
/*!****************************************************************************************************************************************************************************************************!*\
  !*** ../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../node_modules/vue-loader/lib??vue-loader-options!../src/js/components/VSvg.vue?vue&type=template&id=192013da& ***!
  \****************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
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



/***/ }),

/***/ "../node_modules/vue-loader/lib/runtime/componentNormalizer.js":
/*!*********************************************************************!*\
  !*** ../node_modules/vue-loader/lib/runtime/componentNormalizer.js ***!
  \*********************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ "../node_modules/webpack/buildin/global.js":
/*!*************************************************!*\
  !*** ../node_modules/webpack/buildin/global.js ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "../src/img/20180725.jpg":
/*!*******************************!*\
  !*** ../src/img/20180725.jpg ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/build/src/vendor/20180725.2620c984c8.jpg";

/***/ }),

/***/ "../src/img/svg sync recursive ^\\.\\/.*\\.svg$":
/*!*****************************************!*\
  !*** ../src/img/svg sync ^\.\/.*\.svg$ ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = "../src/img/svg sync recursive ^\\.\\/.*\\.svg$";

/***/ }),

/***/ "../src/js/components/VField.vue":
/*!***************************************!*\
  !*** ../src/js/components/VField.vue ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VField_vue_vue_type_template_id_fb380820___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VField.vue?vue&type=template&id=fb380820& */ "../src/js/components/VField.vue?vue&type=template&id=fb380820&");
/* harmony import */ var _VField_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VField.vue?vue&type=script&lang=js& */ "../src/js/components/VField.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "../node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _VField_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _VField_vue_vue_type_template_id_fb380820___WEBPACK_IMPORTED_MODULE_0__["render"],
  _VField_vue_vue_type_template_id_fb380820___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/js/components/VField.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "../src/js/components/VField.vue?vue&type=script&lang=js&":
/*!****************************************************************!*\
  !*** ../src/js/components/VField.vue?vue&type=script&lang=js& ***!
  \****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_1_node_modules_vue_loader_lib_index_js_vue_loader_options_VField_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--1!../../../node_modules/vue-loader/lib??vue-loader-options!./VField.vue?vue&type=script&lang=js& */ "../node_modules/babel-loader/lib/index.js?!../node_modules/vue-loader/lib/index.js?!../src/js/components/VField.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_1_node_modules_vue_loader_lib_index_js_vue_loader_options_VField_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "../src/js/components/VField.vue?vue&type=template&id=fb380820&":
/*!**********************************************************************!*\
  !*** ../src/js/components/VField.vue?vue&type=template&id=fb380820& ***!
  \**********************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_VField_vue_vue_type_template_id_fb380820___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./VField.vue?vue&type=template&id=fb380820& */ "../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!../src/js/components/VField.vue?vue&type=template&id=fb380820&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_VField_vue_vue_type_template_id_fb380820___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_VField_vue_vue_type_template_id_fb380820___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "../src/js/components/VSvg.vue":
/*!*************************************!*\
  !*** ../src/js/components/VSvg.vue ***!
  \*************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _VSvg_vue_vue_type_template_id_192013da___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./VSvg.vue?vue&type=template&id=192013da& */ "../src/js/components/VSvg.vue?vue&type=template&id=192013da&");
/* harmony import */ var _VSvg_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./VSvg.vue?vue&type=script&lang=js& */ "../src/js/components/VSvg.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/componentNormalizer.js */ "../node_modules/vue-loader/lib/runtime/componentNormalizer.js");





/* normalize component */

var component = Object(_node_modules_vue_loader_lib_runtime_componentNormalizer_js__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _VSvg_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_1__["default"],
  _VSvg_vue_vue_type_template_id_192013da___WEBPACK_IMPORTED_MODULE_0__["render"],
  _VSvg_vue_vue_type_template_id_192013da___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"],
  false,
  null,
  null,
  null
  
)

/* hot reload */
if (false) { var api; }
component.options.__file = "src/js/components/VSvg.vue"
/* harmony default export */ __webpack_exports__["default"] = (component.exports);

/***/ }),

/***/ "../src/js/components/VSvg.vue?vue&type=script&lang=js&":
/*!**************************************************************!*\
  !*** ../src/js/components/VSvg.vue?vue&type=script&lang=js& ***!
  \**************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_babel_loader_lib_index_js_ref_1_node_modules_vue_loader_lib_index_js_vue_loader_options_VSvg_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib??ref--1!../../../node_modules/vue-loader/lib??vue-loader-options!./VSvg.vue?vue&type=script&lang=js& */ "../node_modules/babel-loader/lib/index.js?!../node_modules/vue-loader/lib/index.js?!../src/js/components/VSvg.vue?vue&type=script&lang=js&");
/* empty/unused harmony star reexport */ /* harmony default export */ __webpack_exports__["default"] = (_node_modules_babel_loader_lib_index_js_ref_1_node_modules_vue_loader_lib_index_js_vue_loader_options_VSvg_vue_vue_type_script_lang_js___WEBPACK_IMPORTED_MODULE_0__["default"]); 

/***/ }),

/***/ "../src/js/components/VSvg.vue?vue&type=template&id=192013da&":
/*!********************************************************************!*\
  !*** ../src/js/components/VSvg.vue?vue&type=template&id=192013da& ***!
  \********************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_VSvg_vue_vue_type_template_id_192013da___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!../../../node_modules/vue-loader/lib??vue-loader-options!./VSvg.vue?vue&type=template&id=192013da& */ "../node_modules/vue-loader/lib/loaders/templateLoader.js?!../node_modules/vue-loader/lib/index.js?!../src/js/components/VSvg.vue?vue&type=template&id=192013da&");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "render", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_VSvg_vue_vue_type_template_id_192013da___WEBPACK_IMPORTED_MODULE_0__["render"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return _node_modules_vue_loader_lib_loaders_templateLoader_js_vue_loader_options_node_modules_vue_loader_lib_index_js_vue_loader_options_VSvg_vue_vue_type_template_id_192013da___WEBPACK_IMPORTED_MODULE_0__["staticRenderFns"]; });



/***/ }),

/***/ "../src/js/helpers/index.js":
/*!**********************************!*\
  !*** ../src/js/helpers/index.js ***!
  \**********************************/
/*! exports provided: http, router, staticAssets, registerStore, vMount, vMountLazy, vReplace, install */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "install", function() { return install; });
/* harmony import */ var _libs_eventEmitter__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./libs/eventEmitter */ "../src/js/helpers/libs/eventEmitter.js");
/* harmony import */ var _libs_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./libs/http */ "../src/js/helpers/libs/http.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "http", function() { return _libs_http__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _libs_icon__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./libs/icon */ "../src/js/helpers/libs/icon.js");
/* harmony import */ var _libs_registerStore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./libs/registerStore */ "../src/js/helpers/libs/registerStore.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "registerStore", function() { return _libs_registerStore__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../routes */ "../src/js/routes/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "router", function() { return _routes__WEBPACK_IMPORTED_MODULE_4__["default"]; });

/* harmony import */ var _libs_staticAssets__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./libs/staticAssets */ "../src/js/helpers/libs/staticAssets.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "staticAssets", function() { return _libs_staticAssets__WEBPACK_IMPORTED_MODULE_5__["default"]; });

/* harmony import */ var _libs_vMount__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./libs/vMount */ "../src/js/helpers/libs/vMount.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "vMount", function() { return _libs_vMount__WEBPACK_IMPORTED_MODULE_6__["default"]; });

/* harmony import */ var _libs_vMountLazy__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./libs/vMountLazy */ "../src/js/helpers/libs/vMountLazy.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "vMountLazy", function() { return _libs_vMountLazy__WEBPACK_IMPORTED_MODULE_7__["default"]; });

/* harmony import */ var _libs_vReplace__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./libs/vReplace */ "../src/js/helpers/libs/vReplace.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "vReplace", function() { return _libs_vReplace__WEBPACK_IMPORTED_MODULE_8__["default"]; });











var install = {
  install: function install(Vue) {
    Vue.prototype.$helpers = {
      icon: _libs_icon__WEBPACK_IMPORTED_MODULE_2__["default"],
      http: _libs_http__WEBPACK_IMPORTED_MODULE_1__["default"],
      router: _routes__WEBPACK_IMPORTED_MODULE_4__["default"],
      staticAssets: _libs_staticAssets__WEBPACK_IMPORTED_MODULE_5__["default"]
    };
    Vue.prototype.$ee = _libs_eventEmitter__WEBPACK_IMPORTED_MODULE_0__["default"];
  }
};

/***/ }),

/***/ "../src/js/helpers/libs/eventEmitter.js":
/*!**********************************************!*\
  !*** ../src/js/helpers/libs/eventEmitter.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = (new vue__WEBPACK_IMPORTED_MODULE_0___default.a());

/***/ }),

/***/ "../src/js/helpers/libs/http.js":
/*!**************************************!*\
  !*** ../src/js/helpers/libs/http.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! axios */ "../node_modules/axios/index.js");
/* harmony import */ var axios__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(axios__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var qs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! qs */ "../node_modules/qs/lib/index.js");
/* harmony import */ var qs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(qs__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _routes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @routes */ "../src/js/routes/index.js");



var http = axios__WEBPACK_IMPORTED_MODULE_0___default.a.create({
  baseURL: '/',
  headers: {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  },
  paramsSerializer: function paramsSerializer(params) {
    return qs__WEBPACK_IMPORTED_MODULE_1___default.a.stringify(params);
  }
});
http.interceptors.request.use(function (config) {
  if (window.App.csrfToken && config.method === 'post') {
    config.headers['X-CSRF-TOKEN'] = window.App.csrfToken;
  }

  return config;
});
http.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  var query = qs__WEBPACK_IMPORTED_MODULE_1___default.a.parse(document.location.search);

  switch (error.response.status) {
    case 301:
    case 302:
      document.location.href = error.response.data.redirect_url;
      break;
  }

  return Promise.reject(error);
});
/* harmony default export */ __webpack_exports__["default"] = (http);

/***/ }),

/***/ "../src/js/helpers/libs/icon.js":
/*!**************************************!*\
  !*** ../src/js/helpers/libs/icon.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = (function (name) {
  return __webpack_require__("../src/img/svg sync recursive ^\\.\\/.*\\.svg$")("./".concat(name, ".svg"));
});

/***/ }),

/***/ "../src/js/helpers/libs/registerStore.js":
/*!***********************************************!*\
  !*** ../src/js/helpers/libs/registerStore.js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var deep_for_each__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! deep-for-each */ "../node_modules/deep-for-each/es/index.js");
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }




var typeConversion = function typeConversion(data) {
  Object(deep_for_each__WEBPACK_IMPORTED_MODULE_1__["default"])(data, function (value, prop, subject, path) {
    if (value === 'Infinity') {
      Object(lodash__WEBPACK_IMPORTED_MODULE_0__["set"])(data, path, Infinity);
    }
  });
  return data;
};

/* harmony default export */ __webpack_exports__["default"] = (function (name, Store, store) {
  store = store || __webpack_require__(/*! ../../store */ "../src/js/store/index.js").default;
  var initialState = Object(lodash__WEBPACK_IMPORTED_MODULE_0__["get"])(window, "__preload.store.".concat(name), null);

  if (initialState !== null) {
    var modules = Object(lodash__WEBPACK_IMPORTED_MODULE_0__["get"])(initialState, '@modules', null);

    if (modules !== null) {
      Object(lodash__WEBPACK_IMPORTED_MODULE_0__["each"])(modules, function (state, name) {
        var initState = Object(lodash__WEBPACK_IMPORTED_MODULE_0__["get"])(Store.modules, "".concat(name, ".state"), {});
        Object(lodash__WEBPACK_IMPORTED_MODULE_0__["set"])(Store.modules, "".concat(name, ".state"), typeConversion(_objectSpread({}, initState, state)));
      });
      delete initialState['@modules'];
    }

    Store.state = typeConversion(Object(lodash__WEBPACK_IMPORTED_MODULE_0__["merge"])(Store.state, initialState));
  }

  store.registerModule(name, Store);
});

/***/ }),

/***/ "../src/js/helpers/libs/staticAssets.js":
/*!**********************************************!*\
  !*** ../src/js/helpers/libs/staticAssets.js ***!
  \**********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);

var staticUrl = Object(lodash__WEBPACK_IMPORTED_MODULE_0__["trim"])(window.App.staticUrl, '/');
/* harmony default export */ __webpack_exports__["default"] = (function (path) {
  return "".concat(staticUrl, "/").concat(Object(lodash__WEBPACK_IMPORTED_MODULE_0__["trim"])(path, '/'));
});

/***/ }),

/***/ "../src/js/helpers/libs/vMount.js":
/*!****************************************!*\
  !*** ../src/js/helpers/libs/vMount.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);


/* harmony default export */ __webpack_exports__["default"] = (function (selector, component) {
  var targets;

  if (!selector || !(targets = document.querySelectorAll(selector)).length) {
    return;
  }

  if (!component instanceof vue__WEBPACK_IMPORTED_MODULE_0___default.a) {
    throw new Error('This is not Vue component');
  }

  Object(lodash__WEBPACK_IMPORTED_MODULE_1__["each"])(targets, function (el) {
    new vue__WEBPACK_IMPORTED_MODULE_0___default.a(Object(lodash__WEBPACK_IMPORTED_MODULE_1__["clone"])(component)).$mount(el);
  });
});
;

/***/ }),

/***/ "../src/js/helpers/libs/vMountLazy.js":
/*!********************************************!*\
  !*** ../src/js/helpers/libs/vMountLazy.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }



/* harmony default export */ __webpack_exports__["default"] = (function (selector, lazyComponents, callback) {
  var targets;

  if (!selector || !(targets = document.querySelectorAll(selector)).length) {
    return;
  }

  Promise.all(Object(lodash__WEBPACK_IMPORTED_MODULE_1__["flattenDeep"])([lazyComponents]).map(function (lazyComponent) {
    return lazyComponent();
  })).then(function (components) {
    var component = callback.apply(void 0, _toConsumableArray(components.map(function (c) {
      return c.default;
    })));
    Object(lodash__WEBPACK_IMPORTED_MODULE_1__["each"])(targets, function (el) {
      new vue__WEBPACK_IMPORTED_MODULE_0___default.a(Object(lodash__WEBPACK_IMPORTED_MODULE_1__["clone"])(component)).$mount(el);
    });
  });
});
;

/***/ }),

/***/ "../src/js/helpers/libs/vReplace.js":
/*!******************************************!*\
  !*** ../src/js/helpers/libs/vReplace.js ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



function init(el, component) {
  var rootParams = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var componentParams = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var tmpEl = document.createElement(el.tagName);
  tmpEl.classList.add('hide');
  el.parentNode.insertBefore(tmpEl, el);
  new Vue(_objectSpread({}, rootParams, {
    render: function render(h) {
      component.mixins = Object(lodash__WEBPACK_IMPORTED_MODULE_0__["concat"])(component.mixins || [], [{
        mounted: function mounted() {
          this.$el.style && this.$el.style.removeProperty('display');
          el.remove();
        }
      }]);
      return h(component, _objectSpread({
        style: {
          display: 'none'
        }
      }, componentParams));
    }
  })).$mount(tmpEl);
}

/* harmony default export */ __webpack_exports__["default"] = (function (selector, component) {
  var rootParams = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var componentParams = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var targets;

  if (selector instanceof HTMLElement) {
    return init(selector, Object(lodash__WEBPACK_IMPORTED_MODULE_0__["clone"])(component), rootParams, componentParams);
  }

  if (!selector || !(targets = document.querySelectorAll(selector)).length) {
    return;
  }

  if (!component instanceof Vue) {
    throw new Error('This is not Vue component');
  }

  Object(lodash__WEBPACK_IMPORTED_MODULE_0__["each"])(targets, function (el) {
    return init(el, Object(lodash__WEBPACK_IMPORTED_MODULE_0__["clone"])(component), rootParams, componentParams);
  });
});
;

/***/ }),

/***/ "../src/js/index.js":
/*!**************************!*\
  !*** ../src/js/index.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! regenerator-runtime/runtime */ "../node_modules/regenerator-runtime/runtime.js");
/* harmony import */ var regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(regenerator_runtime_runtime__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _store__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @store */ "../src/js/store/index.js");
/* harmony import */ var _plugins_i18n__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @plugins/i18n */ "../src/js/plugins/i18n/index.js");
/* harmony import */ var _plugins_forms__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @plugins/forms */ "../src/js/plugins/forms/index.js");
/* harmony import */ var _plugins_taskManager__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @plugins/taskManager */ "../src/js/plugins/taskManager/index.js");
/* harmony import */ var _polyfills_closest__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./polyfills/closest */ "../src/js/polyfills/closest.js");
/* harmony import */ var _polyfills_closest__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_polyfills_closest__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @helpers */ "../src/js/helpers/index.js");
/* harmony import */ var _components_VSvg__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @components/VSvg */ "../src/js/components/VSvg.vue");
/* harmony import */ var _components_VField__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @components/VField */ "../src/js/components/VField.vue");











vue__WEBPACK_IMPORTED_MODULE_1___default.a.component('v-svg', _components_VSvg__WEBPACK_IMPORTED_MODULE_9__["default"]);
vue__WEBPACK_IMPORTED_MODULE_1___default.a.component('v-field', _components_VField__WEBPACK_IMPORTED_MODULE_10__["default"]);
_plugins_forms__WEBPACK_IMPORTED_MODULE_5__["default"].config({
  httpClient: _helpers__WEBPACK_IMPORTED_MODULE_8__["http"]
});
_plugins_i18n__WEBPACK_IMPORTED_MODULE_4__["default"].config({
  currentLanguage: Object(lodash__WEBPACK_IMPORTED_MODULE_2__["get"])(window, 'App.currentLanguage', 'en'),
  dictionary: Object(lodash__WEBPACK_IMPORTED_MODULE_2__["get"])(window, '__preload.stores.i18n', {})
});
vue__WEBPACK_IMPORTED_MODULE_1___default.a.use(_helpers__WEBPACK_IMPORTED_MODULE_8__["install"]);
vue__WEBPACK_IMPORTED_MODULE_1___default.a.use(_plugins_i18n__WEBPACK_IMPORTED_MODULE_4__["default"]);
vue__WEBPACK_IMPORTED_MODULE_1___default.a.use(_plugins_forms__WEBPACK_IMPORTED_MODULE_5__["default"]);
vue__WEBPACK_IMPORTED_MODULE_1___default.a.use(_plugins_taskManager__WEBPACK_IMPORTED_MODULE_6__["default"]);
_plugins_forms__WEBPACK_IMPORTED_MODULE_5__["default"].preload(Object(lodash__WEBPACK_IMPORTED_MODULE_2__["get"])(window, '__preload.forms', {}));

var files = __webpack_require__("../src/js/modules sync recursive \\.\\/\\w+([\\_\\-]+\\w+)*\\/index\\.js$");

files.keys().forEach(function (key) {
  return files(key);
});
console.log(__webpack_require__(/*! ../img/20180725.jpg */ "../src/img/20180725.jpg"));

/***/ }),

/***/ "../src/js/modules sync recursive \\.\\/\\w+([\\_\\-]+\\w+)*\\/index\\.js$":
/*!***************************************************************!*\
  !*** ../src/js/modules sync \.\/\w+([\_\-]+\w+)*\/index\.js$ ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./general/index.js": "../src/js/modules/general/index.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) { // check for number or string
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return id;
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "../src/js/modules sync recursive \\.\\/\\w+([\\_\\-]+\\w+)*\\/index\\.js$";

/***/ }),

/***/ "../src/js/modules sync recursive \\/store\\/index\\.js$":
/*!**************************************************!*\
  !*** ../src/js/modules sync \/store\/index\.js$ ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./general/store/index.js": "../src/js/modules/general/store/index.js"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) { // check for number or string
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return id;
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "../src/js/modules sync recursive \\/store\\/index\\.js$";

/***/ }),

/***/ "../src/js/modules/general/index.js":
/*!******************************************!*\
  !*** ../src/js/modules/general/index.js ***!
  \******************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @helpers */ "../src/js/helpers/index.js");
 // import Test from './components/Test.vue';
// vMount('#el', {
//     store,
//     render(h) {
//         return h(Test);
//     }
// });

/***/ }),

/***/ "../src/js/modules/general/store/index.js":
/*!************************************************!*\
  !*** ../src/js/modules/general/store/index.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  namespaced: true,
  state: {},
  getters: {},
  mutations: {},
  actions: {}
});

/***/ }),

/***/ "../src/js/plugins/forms/index.js":
/*!****************************************!*\
  !*** ../src/js/plugins/forms/index.js ***!
  \****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var vue_deepset__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! vue-deepset */ "../node_modules/vue-deepset/index.js");
/* harmony import */ var vue_deepset__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(vue_deepset__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var qs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! qs */ "../node_modules/qs/lib/index.js");
/* harmony import */ var qs__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(qs__WEBPACK_IMPORTED_MODULE_3__);
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






var __store;

var __config = {
  defaultRequestType: 'json',
  paramsSerializer: function paramsSerializer(params) {
    return qs__WEBPACK_IMPORTED_MODULE_3___default.a.stringify(params);
  }
};
var __models = {};

var __forms = function __forms(name) {};

function preparePostData(data) {
  var dataType = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : __config.defaultRequestType;

  if (dataType === 'json') {
    return data;
  }

  return lodash__WEBPACK_IMPORTED_MODULE_1___default.a.reduce(data, function (carry, value, name) {
    if (lodash__WEBPACK_IMPORTED_MODULE_1___default.a.isArray(value) || lodash__WEBPACK_IMPORTED_MODULE_1___default.a.isPlainObject(value)) {
      lodash__WEBPACK_IMPORTED_MODULE_1___default.a.each(value, function (item, key) {
        carry.append("".concat(name, "[").concat(key, "]"), item);
      });
    } else {
      carry.append(name, value);
    }

    return carry;
  }, new FormData());
}

function __namespace() {
  return lodash__WEBPACK_IMPORTED_MODULE_1___default.a.get(__config, 'namespace', 'forms');
}

function __action(action) {
  return __namespace() + '/' + action;
}

function __getter(getter) {
  return __namespace() + '/' + getter;
}

function __createModel(_name) {
  return new vue__WEBPACK_IMPORTED_MODULE_0___default.a({
    data: function data() {
      return {
        old: {}
      };
    },
    store: __store,
    computed: {
      name: function name() {
        return _name;
      },
      errors: function errors() {
        var storage = __store.state[__namespace()];

        return lodash__WEBPACK_IMPORTED_MODULE_1___default.a.get(storage.errors, _name, {});
      },
      response: function response() {
        var storage = __store.state[__namespace()];

        return lodash__WEBPACK_IMPORTED_MODULE_1___default.a.get(storage.responses, _name, null);
      },
      data: function data() {
        return vue_deepset__WEBPACK_IMPORTED_MODULE_2__["deepModel"].bind(this)("".concat(__namespace(), ".data.").concat(_name));
      }
    },
    methods: {
      formatErrors: function formatErrors(names) {
        var _this = this;

        var delimiter = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '. ';

        var errors = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.flattenDeep([names]).map(function (name) {
          if (!_this.errors[name]) {
            return null;
          }

          return _this.errors[name];
        }).filter(function (value) {
          return value;
        });

        if (!errors.length) {
          return null;
        }

        return errors.join(delimiter);
      },
      hasErrors: function hasErrors() {
        var _this2 = this;

        for (var _len = arguments.length, names = new Array(_len), _key = 0; _key < _len; _key++) {
          names[_key] = arguments[_key];
        }

        if (names.length === 0) {
          return !lodash__WEBPACK_IMPORTED_MODULE_1___default.a.isEmpty(this.errors);
        }

        return lodash__WEBPACK_IMPORTED_MODULE_1___default.a.flattenDeep([names]).some(function (name) {
          return !!_this2.errors[name];
        });
      },
      remove: function remove(field) {
        return __store.dispatch(__action('remove'), {
          name: _name,
          field: field
        });
      },
      reset: function reset() {
        var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        return Promise.all([this.setData(data), __store.dispatch(__action('clearErrors'), _name)]);
      },
      fill: function fill(fields) {
        var _this3 = this;

        lodash__WEBPACK_IMPORTED_MODULE_1___default.a.each(fields, function (value, field) {
          _this3.data[field] = value;
        });
      },
      setData: function setData() {
        var _this4 = this;

        var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
        var remember = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

        var request = __store.dispatch(__action('setData'), {
          name: _name,
          data: data
        });

        if (remember) {
          request.then(function () {
            return _this4.remember();
          });
        }

        return request;
      },
      submit: function submit(method, url) {
        var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        var data = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.assign(options.filter ? lodash__WEBPACK_IMPORTED_MODULE_1___default.a.pickBy(this.data, options.filter) : this.data, options.data || {});

        var queryParams = options.params || {};

        var http = __config.httpClient || __webpack_require__(/*! axios */ "../node_modules/axios/index.js");

        var response;

        if (method.toLowerCase() === 'post') {
          response = http[method](url, preparePostData(data, options.dataType), _objectSpread({}, options.config || {}, {
            params: queryParams
          }));
        } else {
          response = http[method](url, _objectSpread({
            params: lodash__WEBPACK_IMPORTED_MODULE_1___default.a.assign(data, queryParams)
          }, options.config || {}));
        }

        response.catch(function (data) {
          if (data.response.status === 422) {
            __store.dispatch(__action('fillErrors'), {
              name: _name,
              errors: data.response.data.errors
            });
          }
        });
        response.then(function (data) {
          __store.dispatch(__action('clearErrors'), _name);

          __store.dispatch(__action('setResponse'), {
            name: _name,
            data: data
          });
        });
        return response;
      },
      onChange: function onChange(callback) {
        var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        return this.watch(null, callback, config);
      },
      watch: function watch() {
        var field = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
        var callback = arguments.length > 1 ? arguments[1] : undefined;
        var config = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
        var path = field !== null ? "".concat(__namespace(), ".data.").concat(_name, ".").concat(field) : "".concat(__namespace(), ".data.").concat(_name);
        var oldValue = typeof lodash__WEBPACK_IMPORTED_MODULE_1___default.a.get(__store.state, path) !== 'undefined' ? JSON.parse(JSON.stringify(lodash__WEBPACK_IMPORTED_MODULE_1___default.a.get(__store.state, path))) : undefined;
        return this.$store.watch(function (store) {
          return {
            result: lodash__WEBPACK_IMPORTED_MODULE_1___default.a.get(store, path)
          };
        }, function (_ref) {
          var result = _ref.result;

          if (JSON.stringify(result) !== JSON.stringify(oldValue)) {
            callback(result, oldValue);
            oldValue = undefined !== result ? JSON.parse(JSON.stringify(result)) : undefined;
          }
        }, _objectSpread({
          deep: field === null
        }, config));
      },
      remember: function remember() {
        this.$data.old = JSON.parse(JSON.stringify(this.data));
        return this;
      },
      restore: function restore() {
        this.setData(this.$data.old);
        return this;
      },
      changed: function changed(field) {
        if (!this.$data.old) {
          return false;
        }

        var oldValue, currentValue;

        if (!field) {
          oldValue = this.$data.old;
          currentValue = this.data;
        } else {
          oldValue = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.get(this.$data.old, field);
          currentValue = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.get(this.data, field);
        }

        return JSON.stringify(oldValue) !== JSON.stringify(currentValue);
      }
    }
  });
}

/* harmony default export */ __webpack_exports__["default"] = ({
  forms: function forms(name, data) {
    return __forms(name, data);
  },
  config: function config() {
    var _config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    __config = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.merge({}, __config, _config);
  },
  install: function install(Vue) {
    Vue = Vue;

    __forms = function (name, data) {
      if (!lodash__WEBPACK_IMPORTED_MODULE_1___default.a.has(__models, name)) {
        __store.dispatch(__action('register'), {
          name: name,
          data: data
        });
      }

      return __models[name];
    }.bind(Vue);

    Vue.prototype.$forms = __forms;

    Vue.prototype.$thisForm = function () {
      var resource = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

      if (typeof this.$options.form === 'undefined') {
        throw new Error('Form name not defined');
      }

      var formName = lodash__WEBPACK_IMPORTED_MODULE_1___default.a.isFunction(this.$options.form) ? this.$options.form.bind(this)() : this.$options.form;
      return resource !== null ? this.$forms(formName)[resource] : this.$forms(formName);
    };

    Vue.$forms = __forms;
  },
  storeRegisterer: function storeRegisterer(store) {
    __store = store;
    store.registerModule(__namespace(), {
      namespaced: true,
      state: {
        data: {},
        errors: {},
        responses: {}
      },
      mutations: {
        SET_DATA: function SET_DATA(state, _ref2) {
          var name = _ref2.name,
              data = _ref2.data;
          vue__WEBPACK_IMPORTED_MODULE_0___default.a.set(state.data, name, data);
        },
        REGISTER: function REGISTER(state, _ref3) {
          var name = _ref3.name;

          if (__models.hasOwnProperty(name)) {
            return false;
          }

          vue__WEBPACK_IMPORTED_MODULE_0___default.a.set(state.data, name, {});
          __models[name] = __createModel(name);
        },
        RESET: function RESET(state, name) {
          vue__WEBPACK_IMPORTED_MODULE_0___default.a.delete(state.data, name);
          vue__WEBPACK_IMPORTED_MODULE_0___default.a.delete(state.errors, name);
        },
        FILL_ERRORS: function FILL_ERRORS(state, _ref4) {
          var name = _ref4.name,
              errors = _ref4.errors;
          vue__WEBPACK_IMPORTED_MODULE_0___default.a.set(state.errors, name, errors);
        },
        CLEAR_ERRORS: function CLEAR_ERRORS(state, name) {
          vue__WEBPACK_IMPORTED_MODULE_0___default.a.delete(state.errors, name);
        },
        SET_RESPONSE: function SET_RESPONSE(state, _ref5) {
          var name = _ref5.name,
              data = _ref5.data;
          vue__WEBPACK_IMPORTED_MODULE_0___default.a.set(state.responses, name, data);
        }
      },
      actions: {
        register: function register(_ref6, payload) {
          var commit = _ref6.commit;
          commit('REGISTER', payload);
        },
        setData: function setData(_ref7, payload) {
          var commit = _ref7.commit;
          commit('SET_DATA', payload);
        },
        reset: function reset(_ref8, name) {
          var commit = _ref8.commit;
          commit('RESET', name);
        },
        fillErrors: function fillErrors(_ref9, _ref10) {
          var commit = _ref9.commit;
          var name = _ref10.name,
              errors = _ref10.errors;
          commit('FILL_ERRORS', {
            name: name,
            errors: errors
          });
        },
        clearErrors: function clearErrors(_ref11, name) {
          var commit = _ref11.commit;
          commit('CLEAR_ERRORS', name);
        },
        setResponse: function setResponse(_ref12, payload) {
          var commit = _ref12.commit;
          commit('SET_RESPONSE', payload);
        }
      }
    });
  },
  preload: function preload(forms) {
    if (lodash__WEBPACK_IMPORTED_MODULE_1___default.a.isEmpty(forms)) {
      return;
    }

    lodash__WEBPACK_IMPORTED_MODULE_1___default.a.each(forms, function (_ref13, name) {
      var data = _ref13.data;

      __store.dispatch(__action('register'), {
        name: name
      });

      __store.dispatch(__action('setData'), {
        name: name,
        data: data
      });
    });
  }
});

/***/ }),

/***/ "../src/js/plugins/i18n/index.js":
/*!***************************************!*\
  !*** ../src/js/plugins/i18n/index.js ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var sprintf_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! sprintf-js */ "../node_modules/sprintf-js/src/sprintf.js");
/* harmony import */ var sprintf_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(sprintf_js__WEBPACK_IMPORTED_MODULE_1__);
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }



var __config = {};
/* harmony default export */ __webpack_exports__["default"] = ({
  install: function install(Vue) {
    Vue.prototype.$t = function (text, scope) {
      return this.$store.getters['i18n/translate'](text);
    };

    Vue.prototype.$ti = function (text, args, scope) {
      if (!Object(lodash__WEBPACK_IMPORTED_MODULE_0__["isArray"])(args)) {
        throw Error('Arguments must bee array');
      }

      return sprintf_js__WEBPACK_IMPORTED_MODULE_1___default.a.sprintf.apply(sprintf_js__WEBPACK_IMPORTED_MODULE_1___default.a, [this.$t(text)].concat(_toConsumableArray(args)));
    };
  },
  storeRegister: function storeRegister(store) {
    store.registerModule('i18n', {
      namespaced: true,
      state: {
        dictionary: Object(lodash__WEBPACK_IMPORTED_MODULE_0__["merge"])({}, Object(lodash__WEBPACK_IMPORTED_MODULE_0__["get"])(__config, 'dictionary', {}))
      },
      getters: {
        translate: function translate(_ref) {
          var dictionary = _ref.dictionary;
          return function (text, locale) {
            return Object(lodash__WEBPACK_IMPORTED_MODULE_0__["get"])(dictionary, text, text);
          };
        }
      },
      mutations: {
        setCurrentLocale: function setCurrentLocale(state, Locale) {
          state.Locale = Locale;
        }
      },
      actions: {
        changeCurrentLanguage: function changeCurrentLanguage(_ref2, Locale) {
          var commit = _ref2.commit;
          commit('setCurrentLocale', Locale);
        }
      }
    });
  },
  config: function config() {
    var _config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    __config = Object(lodash__WEBPACK_IMPORTED_MODULE_0__["merge"])({}, __config, _config);
  }
});

/***/ }),

/***/ "../src/js/plugins/location/url.js":
/*!*****************************************!*\
  !*** ../src/js/plugins/location/url.js ***!
  \*****************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var qs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! qs */ "../node_modules/qs/lib/index.js");
/* harmony import */ var qs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(qs__WEBPACK_IMPORTED_MODULE_1__);


/**
 * @param string uri
 * @param string|number|Array|Object params
 * @return string
 * @throws Error
 */

/* harmony default export */ __webpack_exports__["default"] = (function (uri, params, query) {
  var placeholders = uri.split('/').filter(function (param) {
    return /\{.*\}/.test(param);
  }).map(function (param) {
    return param.replace('{', '').replace('}', '');
  });
  var url;

  if (Object(lodash__WEBPACK_IMPORTED_MODULE_0__["isArray"])(params)) {
    url = bindArray(uri, placeholders, params);
  } else if (Object(lodash__WEBPACK_IMPORTED_MODULE_0__["isObject"])(params)) {
    url = bindObject(uri, placeholders, params);
  } else {
    url = bindString(uri, placeholders, params);
  }

  return query ? "".concat(url, "?").concat(qs__WEBPACK_IMPORTED_MODULE_1___default.a.stringify(query)) : url;
});
/**
 * @param string url
 * @param string[] placeholders
 * @param string[] params
 */

function bindArray(url, placeholders, params) {
  var requiredPlaceholders = Object(lodash__WEBPACK_IMPORTED_MODULE_0__["filter"])(placeholders, function (value) {
    return value[value.length - 1] !== '?';
  });

  if (params.length < requiredPlaceholders.length) {
    throw new Error('Missed required parameters');
  }

  return Object(lodash__WEBPACK_IMPORTED_MODULE_0__["reduce"])(placeholders, function (state, placeholder, index) {
    if (!params[index] && requiredPlaceholders.indexOf(placeholder) === -1) {
      return state.replace("/{".concat(placeholder, "}"), '');
    }

    return state.replace("{".concat(placeholder, "}"), params[index]);
  }, url);
}
/**
 * @param string url
 * @param string[] placeholders
 * @param string[] params
 */


function bindObject(url, placeholders, params) {
  return Object(lodash__WEBPACK_IMPORTED_MODULE_0__["reduce"])(placeholders, function (state, placeholder) {
    if (!params.hasOwnProperty(placeholder)) {
      throw new Error("Missed required parameter [".concat(placeholder, "]"));
    }

    return state.replace("{".concat(placeholder, "}"), params[placeholder]);
  }, url);
}
/**
 * @param string url
 * @param string[] placeholders
 * @param string[] params
 */


function bindString(url, placeholders, param) {
  if (placeholders.length > 1) {
    throw new Error('Missed required parameters');
  }

  return url.replace("{".concat(placeholders[0], "}"), param);
}

/***/ }),

/***/ "../src/js/plugins/taskManager/index.js":
/*!**********************************************!*\
  !*** ../src/js/plugins/taskManager/index.js ***!
  \**********************************************/
/*! exports provided: taskManager, mapStatuses, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "taskManager", function() { return taskManager; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "mapStatuses", function() { return mapStatuses; });
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash */ "lodash");
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }


var __Vue = null;
var __store = null;
var __subscribers = [];
var taskManager = {
  run: function run(name, promise, params) {
    var names = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.flattenDeep([name]);

    var action, payload;

    if (Promise.resolve(promise) === promise) {
      action = 'run';
      payload = {
        promise: promise,
        params: params
      };
    } else {
      action = 'runSync';
      payload = {
        params: promise
      };
    }

    names.forEach(function (name) {
      __store.dispatch("taskManager/".concat(action), _objectSpread({
        name: name
      }, payload));
    });
    return promise;
  },
  status: function status(name) {
    var withDescendants = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    var activeProcesses = __store.state.taskManager.processes || {};

    if (!withDescendants) {
      return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.has(activeProcesses, name);
    }

    return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.some(activeProcesses, function (process) {
      return process.name === name || process.name.indexOf("".concat(name, ".")) !== -1 || process.name.indexOf("".concat(name, "@")) !== -1;
    });
  },
  subscribe: function subscribe(name, callback) {
    if (!lodash__WEBPACK_IMPORTED_MODULE_0___default.a.has(__subscribers, name)) {
      __subscribers[name] = [];
    }

    var index = __subscribers[name].length;
    __subscribers[name][__subscribers[name].length] = callback;
    return function () {
      return __subscribers.splice(index, 1);
    };
  }
};
var mapStatuses = function mapStatuses(names) {
  var data = names;

  if (!lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isArray(names)) {
    throw new Error('Statuses must be array');
  }

  return lodash__WEBPACK_IMPORTED_MODULE_0___default.a.reduce(data, function (carry, data) {
    var result = data;

    if (lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isString(data)) {
      result = {
        name: data,
        deep: false
      };
    }

    carry[lodash__WEBPACK_IMPORTED_MODULE_0___default.a.camelCase('ps.' + result.name)] = function () {
      var process = result.name;

      if (lodash__WEBPACK_IMPORTED_MODULE_0___default.a.has(result, 'process')) {
        process = lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isFunction(result.process) ? result.process.bind(this)() : result.process;
      }

      return this.$taskManager.status(process, !!result.deep);
    };

    return carry;
  }, {});
};

var __fire = function __fire(name, event, data) {
  var subscribers;

  if (lodash__WEBPACK_IMPORTED_MODULE_0___default.a.isArray(__subscribers[name])) {
    subscribers = __subscribers[name];
  }

  if (!subscribers) {
    return;
  }

  subscribers.forEach(function (callback) {
    return callback(event, data);
  });
};

/* harmony default export */ __webpack_exports__["default"] = ({
  install: function install(Vue) {
    __Vue = Vue;
    __Vue.prototype.$taskManager = taskManager;
  },
  storeRegister: function storeRegister(store) {
    __store = store;
    store.registerModule('taskManager', {
      namespaced: true,
      state: {
        processes: {}
      },
      mutations: {
        create: function create(state, _ref) {
          var name = _ref.name,
              data = _ref.data;

          __Vue.set(state.processes, name, {
            name: name,
            data: data
          });

          __fire(name, 'start', data);
        },
        kill: function kill(state, name) {
          __fire(name, 'done', lodash__WEBPACK_IMPORTED_MODULE_0___default.a.get(state.processes, "".concat(name, ".data")));

          __Vue.delete(state.processes, name);
        }
      },
      actions: {
        run: function run(_ref2, _ref3) {
          var commit = _ref2.commit;
          var name = _ref3.name,
              promise = _ref3.promise,
              _ref3$params = _ref3.params,
              params = _ref3$params === void 0 ? {} : _ref3$params;
          commit('create', {
            name: name,
            data: params.data || {}
          });

          if (params.failOnly) {
            promise.catch(function (xhr) {
              if (xhr.response.status >= 400) {
                commit('kill', name);
              }
            });
          } else {
            promise.then(function () {
              return commit('kill', name);
            }).catch(function () {
              return commit('kill', name);
            });
          }

          return promise;
        },
        runSync: function runSync(_ref4, _ref5) {
          var commit = _ref4.commit;
          var name = _ref5.name,
              _ref5$params = _ref5.params,
              params = _ref5$params === void 0 ? {} : _ref5$params;
          commit('create', {
            name: name,
            data: params.data || {}
          });
        },
        kill: function kill(_ref6, name) {
          var commit = _ref6.commit;
          return commit('kill', name);
        }
      }
    });
  }
});

/***/ }),

/***/ "../src/js/polyfills/closest.js":
/*!**************************************!*\
  !*** ../src/js/polyfills/closest.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Element.closest() polyfill
 * https://developer.mozilla.org/en-US/docs/Web/API/Element/closest#Polyfill
 */
if (!Element.prototype.closest) {
  if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
  }

  Element.prototype.closest = function (s) {
    var el = this;
    var ancestor = this;

    if (!document.documentElement.contains(el)) {
      return null;
    }

    do {
      if (ancestor.matches(s)) {
        return ancestor;
      }

      ancestor = ancestor.parentElement;
    } while (ancestor !== null);

    return null;
  };
}

/***/ }),

/***/ "../src/js/routes/index.js":
/*!*********************************!*\
  !*** ../src/js/routes/index.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _plugins_location_url__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @plugins/location/url */ "../src/js/plugins/location/url.js");

var routes = {
  rootUrl: window.App.baseURL,
  routes: [],
  prefix: '',
  route: function route(name, parameters, query) {
    var route = this.getByName(name);

    if (!route) {
      return;
    }

    return "/".concat(Object(_plugins_location_url__WEBPACK_IMPORTED_MODULE_0__["default"])(route.uri, parameters, query));
  },
  url: function url(_url) {
    var parameters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
    parameters = parameters || [];
    var uri = _url + '/' + parameters.join('/');
    return this.getCorrectUrl(uri);
  },
  toRoute: function toRoute(route, parameters) {
    var uri = this.replaceNamedParameters(route.uri, parameters);
    var qs = this.getRouteQueryString(parameters);

    if (this.absolute && this.isOtherHost(route)) {
      return "//" + route.host + "/" + uri + qs;
    }

    return this.getCorrectUrl(uri + qs);
  },
  isOtherHost: function isOtherHost(route) {
    return route.host && route.host !== window.location.hostname;
  },
  replaceNamedParameters: function replaceNamedParameters(uri, parameters) {
    return Object(_plugins_location_url__WEBPACK_IMPORTED_MODULE_0__["default"])(uri, parameters);
  },
  getRouteQueryString: function getRouteQueryString(parameters) {
    var qs = [];

    for (var key in parameters) {
      if (parameters.hasOwnProperty(key)) {
        qs.push(key + '=' + parameters[key]);
      }
    }

    if (qs.length < 1) {
      return '';
    }

    return '?' + qs.join('&');
  },
  getByName: function getByName(name) {
    for (var key in this.routes) {
      if (this.routes.hasOwnProperty(key) && this.routes[key].name === name) {
        return this.routes[key];
      }
    }
  }
};

var route = function route(_route, parameters, query) {
  return routes.route(_route, parameters, query);
};

var url = function url(_url2) {
  var parameters = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return routes.url(_url2, parameters);
};

/* harmony default export */ __webpack_exports__["default"] = ({
  route: route,
  url: url
});

/***/ }),

/***/ "../src/js/store/index.js":
/*!********************************!*\
  !*** ../src/js/store/index.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vuex */ "vuex");
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vuex__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _plugins_taskManager__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @plugins/taskManager */ "../src/js/plugins/taskManager/index.js");
/* harmony import */ var _plugins_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @plugins/i18n */ "../src/js/plugins/i18n/index.js");
/* harmony import */ var _plugins_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @plugins/forms */ "../src/js/plugins/forms/index.js");
/* harmony import */ var _helpers__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @helpers */ "../src/js/helpers/index.js");
/* harmony import */ var vue_deepset__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! vue-deepset */ "../node_modules/vue-deepset/index.js");
/* harmony import */ var vue_deepset__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(vue_deepset__WEBPACK_IMPORTED_MODULE_6__);







vue__WEBPACK_IMPORTED_MODULE_0___default.a.use(vuex__WEBPACK_IMPORTED_MODULE_1___default.a);
var store = new vuex__WEBPACK_IMPORTED_MODULE_1___default.a.Store({
  plugins: [_plugins_forms__WEBPACK_IMPORTED_MODULE_4__["default"].storeRegisterer, _plugins_i18n__WEBPACK_IMPORTED_MODULE_3__["default"].storeRegister, _plugins_taskManager__WEBPACK_IMPORTED_MODULE_2__["default"].storeRegister],
  mutations: {
    VUEX_DEEP_SET: vue_deepset__WEBPACK_IMPORTED_MODULE_6__["VUEX_DEEP_SET"]
  }
});

var files = __webpack_require__("../src/js/modules sync recursive \\/store\\/index\\.js$");

files.keys().forEach(function (key) {
  var name = key.replace('./', '').replace('/store/index.js', '');
  var data = files(key).default;
  Object(_helpers__WEBPACK_IMPORTED_MODULE_5__["registerStore"])(name, data, store);
});
/* harmony default export */ __webpack_exports__["default"] = (store);

/***/ }),

/***/ 0:
/*!********************************!*\
  !*** multi ../src/js/index.js ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ../src/js/index.js */"../src/js/index.js");


/***/ }),

/***/ "lodash":
/*!********************!*\
  !*** external "_" ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = _;

/***/ }),

/***/ "vue":
/*!**********************!*\
  !*** external "Vue" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = Vue;

/***/ }),

/***/ "vuex":
/*!***********************!*\
  !*** external "Vuex" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = Vuex;

/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9heGlvcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9hZGFwdGVycy94aHIuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvYXhpb3MuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL0NhbmNlbC5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jYW5jZWwvQ2FuY2VsVG9rZW4uanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY2FuY2VsL2lzQ2FuY2VsLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2NvcmUvQXhpb3MuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9JbnRlcmNlcHRvck1hbmFnZXIuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvY29yZS9jcmVhdGVFcnJvci5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2Rpc3BhdGNoUmVxdWVzdC5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL2VuaGFuY2VFcnJvci5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL3NldHRsZS5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9jb3JlL3RyYW5zZm9ybURhdGEuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvZGVmYXVsdHMuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9iaW5kLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvYnRvYS5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2J1aWxkVVJMLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvY29tYmluZVVSTHMuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9jb29raWVzLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvYXhpb3MvbGliL2hlbHBlcnMvaXNBYnNvbHV0ZVVSTC5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL2lzVVJMU2FtZU9yaWdpbi5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2F4aW9zL2xpYi9oZWxwZXJzL25vcm1hbGl6ZUhlYWRlck5hbWUuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9wYXJzZUhlYWRlcnMuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvaGVscGVycy9zcHJlYWQuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9heGlvcy9saWIvdXRpbHMuanMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9qcy9jb21wb25lbnRzL1ZGaWVsZC52dWUiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9qcy9jb21wb25lbnRzL1ZTdmcudnVlIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvZGVlcC1mb3ItZWFjaC9lcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2lzLWJ1ZmZlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL2xvZGFzaC5pc3BsYWlub2JqZWN0L2luZGV4LmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvcXMvbGliL2Zvcm1hdHMuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9xcy9saWIvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9xcy9saWIvcGFyc2UuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy9xcy9saWIvc3RyaW5naWZ5LmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvcXMvbGliL3V0aWxzLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvcmVnZW5lcmF0b3ItcnVudGltZS9ydW50aW1lLmpzIiwid2VicGFjazovLy8uLi9ub2RlX21vZHVsZXMvc3ByaW50Zi1qcy9zcmMvc3ByaW50Zi5qcyIsIndlYnBhY2s6Ly8vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1kZWVwc2V0L2luZGV4LmpzIiwid2VicGFjazovLy8uLi9zcmMvanMvY29tcG9uZW50cy9WRmllbGQudnVlP2FjMjMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9qcy9jb21wb25lbnRzL1ZTdmcudnVlPzczNWUiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanMiLCJ3ZWJwYWNrOi8vLy4uL25vZGVfbW9kdWxlcy93ZWJwYWNrL2J1aWxkaW4vZ2xvYmFsLmpzIiwid2VicGFjazovLy8uLi9zcmMvaW1nLzIwMTgwNzI1LmpwZyIsIndlYnBhY2s6Ly8vLi4vc3JjL2ltZy9zdmcgc3luYyBeXFwuXFwvLipcXC5zdmckIiwid2VicGFjazovLy8uLi9zcmMvanMvY29tcG9uZW50cy9WRmllbGQudnVlPzk5NDMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9qcy9jb21wb25lbnRzL1ZGaWVsZC52dWU/NWE0NiIsIndlYnBhY2s6Ly8vLi4vc3JjL2pzL2NvbXBvbmVudHMvVkZpZWxkLnZ1ZT8zOGUxIiwid2VicGFjazovLy8uLi9zcmMvanMvY29tcG9uZW50cy9WU3ZnLnZ1ZT9kZDU2Iiwid2VicGFjazovLy8uLi9zcmMvanMvY29tcG9uZW50cy9WU3ZnLnZ1ZT84OWYzIiwid2VicGFjazovLy8uLi9zcmMvanMvY29tcG9uZW50cy9WU3ZnLnZ1ZT8zMTBlIiwid2VicGFjazovLy8uLi9zcmMvanMvaGVscGVycy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi4vc3JjL2pzL2hlbHBlcnMvbGlicy9ldmVudEVtaXR0ZXIuanMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9qcy9oZWxwZXJzL2xpYnMvaHR0cC5qcyIsIndlYnBhY2s6Ly8vLi4vc3JjL2pzL2hlbHBlcnMvbGlicy9pY29uLmpzIiwid2VicGFjazovLy8uLi9zcmMvanMvaGVscGVycy9saWJzL3JlZ2lzdGVyU3RvcmUuanMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9qcy9oZWxwZXJzL2xpYnMvc3RhdGljQXNzZXRzLmpzIiwid2VicGFjazovLy8uLi9zcmMvanMvaGVscGVycy9saWJzL3ZNb3VudC5qcyIsIndlYnBhY2s6Ly8vLi4vc3JjL2pzL2hlbHBlcnMvbGlicy92TW91bnRMYXp5LmpzIiwid2VicGFjazovLy8uLi9zcmMvanMvaGVscGVycy9saWJzL3ZSZXBsYWNlLmpzIiwid2VicGFjazovLy8uLi9zcmMvanMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4uL3NyYy9qcy9tb2R1bGVzIHN5bmMgXFwuXFwvXFx3KyhbXFxfXFwtXStcXHcrKSpcXC9pbmRleFxcLmpzJCIsIndlYnBhY2s6Ly8vLi4vc3JjL2pzL21vZHVsZXMgc3luYyBcXC9zdG9yZVxcL2luZGV4XFwuanMkIiwid2VicGFjazovLy8uLi9zcmMvanMvbW9kdWxlcy9nZW5lcmFsL2luZGV4LmpzIiwid2VicGFjazovLy8uLi9zcmMvanMvbW9kdWxlcy9nZW5lcmFsL3N0b3JlL2luZGV4LmpzIiwid2VicGFjazovLy8uLi9zcmMvanMvcGx1Z2lucy9mb3Jtcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi4vc3JjL2pzL3BsdWdpbnMvaTE4bi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi4vc3JjL2pzL3BsdWdpbnMvbG9jYXRpb24vdXJsLmpzIiwid2VicGFjazovLy8uLi9zcmMvanMvcGx1Z2lucy90YXNrTWFuYWdlci9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi4vc3JjL2pzL3BvbHlmaWxscy9jbG9zZXN0LmpzIiwid2VicGFjazovLy8uLi9zcmMvanMvcm91dGVzL2luZGV4LmpzIiwid2VicGFjazovLy8uLi9zcmMvanMvc3RvcmUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiX1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcIlZ1ZVwiIiwid2VicGFjazovLy9leHRlcm5hbCBcIlZ1ZXhcIiJdLCJuYW1lcyI6WyJpbnN0YWxsIiwiVnVlIiwicHJvdG90eXBlIiwiJGhlbHBlcnMiLCJpY29uIiwiaHR0cCIsInJvdXRlciIsInN0YXRpY0Fzc2V0cyIsIiRlZSIsImVlIiwiYXhpb3MiLCJjcmVhdGUiLCJiYXNlVVJMIiwiaGVhZGVycyIsInBhcmFtc1NlcmlhbGl6ZXIiLCJwYXJhbXMiLCJxcyIsInN0cmluZ2lmeSIsImludGVyY2VwdG9ycyIsInJlcXVlc3QiLCJ1c2UiLCJjb25maWciLCJ3aW5kb3ciLCJBcHAiLCJjc3JmVG9rZW4iLCJtZXRob2QiLCJyZXNwb25zZSIsImVycm9yIiwicXVlcnkiLCJwYXJzZSIsImRvY3VtZW50IiwibG9jYXRpb24iLCJzZWFyY2giLCJzdGF0dXMiLCJocmVmIiwiZGF0YSIsInJlZGlyZWN0X3VybCIsIlByb21pc2UiLCJyZWplY3QiLCJuYW1lIiwicmVxdWlyZSIsInR5cGVDb252ZXJzaW9uIiwiZGVlcEZvckVhY2giLCJ2YWx1ZSIsInByb3AiLCJzdWJqZWN0IiwicGF0aCIsInNldCIsIkluZmluaXR5IiwiU3RvcmUiLCJzdG9yZSIsImRlZmF1bHQiLCJpbml0aWFsU3RhdGUiLCJnZXQiLCJtb2R1bGVzIiwiZWFjaCIsInN0YXRlIiwiaW5pdFN0YXRlIiwibWVyZ2UiLCJyZWdpc3Rlck1vZHVsZSIsInN0YXRpY1VybCIsInRyaW0iLCJzZWxlY3RvciIsImNvbXBvbmVudCIsInRhcmdldHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwibGVuZ3RoIiwiRXJyb3IiLCJlbCIsImNsb25lIiwiJG1vdW50IiwibGF6eUNvbXBvbmVudHMiLCJjYWxsYmFjayIsImFsbCIsImZsYXR0ZW5EZWVwIiwibWFwIiwibGF6eUNvbXBvbmVudCIsInRoZW4iLCJjb21wb25lbnRzIiwiYyIsImluaXQiLCJyb290UGFyYW1zIiwiY29tcG9uZW50UGFyYW1zIiwidG1wRWwiLCJjcmVhdGVFbGVtZW50IiwidGFnTmFtZSIsImNsYXNzTGlzdCIsImFkZCIsInBhcmVudE5vZGUiLCJpbnNlcnRCZWZvcmUiLCJyZW5kZXIiLCJoIiwibWl4aW5zIiwiY29uY2F0IiwibW91bnRlZCIsIiRlbCIsInN0eWxlIiwicmVtb3ZlUHJvcGVydHkiLCJyZW1vdmUiLCJkaXNwbGF5IiwiSFRNTEVsZW1lbnQiLCJWU3ZnIiwiVkZpZWxkIiwiVnVlRm9ybSIsImh0dHBDbGllbnQiLCJJMThuIiwiY3VycmVudExhbmd1YWdlIiwiZGljdGlvbmFyeSIsIkhlbHBlcnNJbnN0YWxsZXIiLCJUYXNrTWFuYWdlciIsInByZWxvYWQiLCJmaWxlcyIsImtleXMiLCJmb3JFYWNoIiwia2V5IiwiY29uc29sZSIsImxvZyIsIm5hbWVzcGFjZWQiLCJnZXR0ZXJzIiwibXV0YXRpb25zIiwiYWN0aW9ucyIsIl9fc3RvcmUiLCJfX2NvbmZpZyIsImRlZmF1bHRSZXF1ZXN0VHlwZSIsIl9fbW9kZWxzIiwiX19mb3JtcyIsInByZXBhcmVQb3N0RGF0YSIsImRhdGFUeXBlIiwiXyIsInJlZHVjZSIsImNhcnJ5IiwiaXNBcnJheSIsImlzUGxhaW5PYmplY3QiLCJpdGVtIiwiYXBwZW5kIiwiRm9ybURhdGEiLCJfX25hbWVzcGFjZSIsIl9fYWN0aW9uIiwiYWN0aW9uIiwiX19nZXR0ZXIiLCJnZXR0ZXIiLCJfX2NyZWF0ZU1vZGVsIiwib2xkIiwiY29tcHV0ZWQiLCJlcnJvcnMiLCJzdG9yYWdlIiwicmVzcG9uc2VzIiwiZGVlcE1vZGVsIiwiYmluZCIsIm1ldGhvZHMiLCJmb3JtYXRFcnJvcnMiLCJuYW1lcyIsImRlbGltaXRlciIsImZpbHRlciIsImpvaW4iLCJoYXNFcnJvcnMiLCJpc0VtcHR5Iiwic29tZSIsImZpZWxkIiwiZGlzcGF0Y2giLCJyZXNldCIsInNldERhdGEiLCJmaWxsIiwiZmllbGRzIiwicmVtZW1iZXIiLCJzdWJtaXQiLCJ1cmwiLCJvcHRpb25zIiwiYXNzaWduIiwicGlja0J5IiwicXVlcnlQYXJhbXMiLCJ0b0xvd2VyQ2FzZSIsImNhdGNoIiwib25DaGFuZ2UiLCJ3YXRjaCIsIm9sZFZhbHVlIiwiSlNPTiIsInVuZGVmaW5lZCIsIiRzdG9yZSIsInJlc3VsdCIsImRlZXAiLCIkZGF0YSIsInJlc3RvcmUiLCJjaGFuZ2VkIiwiY3VycmVudFZhbHVlIiwiZm9ybXMiLCJoYXMiLCIkZm9ybXMiLCIkdGhpc0Zvcm0iLCJyZXNvdXJjZSIsIiRvcHRpb25zIiwiZm9ybSIsImZvcm1OYW1lIiwiaXNGdW5jdGlvbiIsInN0b3JlUmVnaXN0ZXJlciIsIlNFVF9EQVRBIiwiUkVHSVNURVIiLCJoYXNPd25Qcm9wZXJ0eSIsIlJFU0VUIiwiZGVsZXRlIiwiRklMTF9FUlJPUlMiLCJDTEVBUl9FUlJPUlMiLCJTRVRfUkVTUE9OU0UiLCJyZWdpc3RlciIsInBheWxvYWQiLCJjb21taXQiLCJmaWxsRXJyb3JzIiwiY2xlYXJFcnJvcnMiLCJzZXRSZXNwb25zZSIsIiR0IiwidGV4dCIsInNjb3BlIiwiJHRpIiwiYXJncyIsInByaW50Iiwic3ByaW50ZiIsInN0b3JlUmVnaXN0ZXIiLCJ0cmFuc2xhdGUiLCJsb2NhbGUiLCJzZXRDdXJyZW50TG9jYWxlIiwiTG9jYWxlIiwiY2hhbmdlQ3VycmVudExhbmd1YWdlIiwidXJpIiwicGxhY2Vob2xkZXJzIiwic3BsaXQiLCJwYXJhbSIsInRlc3QiLCJyZXBsYWNlIiwiYmluZEFycmF5IiwiaXNPYmplY3QiLCJiaW5kT2JqZWN0IiwiYmluZFN0cmluZyIsInJlcXVpcmVkUGxhY2Vob2xkZXJzIiwicGxhY2Vob2xkZXIiLCJpbmRleCIsImluZGV4T2YiLCJfX1Z1ZSIsIl9fc3Vic2NyaWJlcnMiLCJ0YXNrTWFuYWdlciIsInJ1biIsInByb21pc2UiLCJyZXNvbHZlIiwid2l0aERlc2NlbmRhbnRzIiwiYWN0aXZlUHJvY2Vzc2VzIiwicHJvY2Vzc2VzIiwicHJvY2VzcyIsInN1YnNjcmliZSIsInNwbGljZSIsIm1hcFN0YXR1c2VzIiwiaXNTdHJpbmciLCJjYW1lbENhc2UiLCIkdGFza01hbmFnZXIiLCJfX2ZpcmUiLCJldmVudCIsInN1YnNjcmliZXJzIiwia2lsbCIsImZhaWxPbmx5IiwieGhyIiwicnVuU3luYyIsIkVsZW1lbnQiLCJjbG9zZXN0IiwibWF0Y2hlcyIsIm1zTWF0Y2hlc1NlbGVjdG9yIiwid2Via2l0TWF0Y2hlc1NlbGVjdG9yIiwicyIsImFuY2VzdG9yIiwiZG9jdW1lbnRFbGVtZW50IiwiY29udGFpbnMiLCJwYXJlbnRFbGVtZW50Iiwicm91dGVzIiwicm9vdFVybCIsInByZWZpeCIsInJvdXRlIiwicGFyYW1ldGVycyIsImdldEJ5TmFtZSIsInVybEhlbHBlciIsImdldENvcnJlY3RVcmwiLCJ0b1JvdXRlIiwicmVwbGFjZU5hbWVkUGFyYW1ldGVycyIsImdldFJvdXRlUXVlcnlTdHJpbmciLCJhYnNvbHV0ZSIsImlzT3RoZXJIb3N0IiwiaG9zdCIsImhvc3RuYW1lIiwicHVzaCIsIlZ1ZXgiLCJwbHVnaW5zIiwiVlVFWF9ERUVQX1NFVCIsInJlZ2lzdGVyU3RvcmUiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ2xGQSxpQkFBaUIsbUJBQU8sQ0FBQyx1REFBYSxFOzs7Ozs7Ozs7Ozs7QUNBekI7O0FBRWIsWUFBWSxtQkFBTyxDQUFDLHNEQUFZO0FBQ2hDLGFBQWEsbUJBQU8sQ0FBQyxrRUFBa0I7QUFDdkMsZUFBZSxtQkFBTyxDQUFDLDRFQUF1QjtBQUM5QyxtQkFBbUIsbUJBQU8sQ0FBQyxvRkFBMkI7QUFDdEQsc0JBQXNCLG1CQUFPLENBQUMsMEZBQThCO0FBQzVELGtCQUFrQixtQkFBTyxDQUFDLDBFQUFxQjtBQUMvQyx5RkFBeUYsbUJBQU8sQ0FBQyxvRUFBbUI7O0FBRXBIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsNENBQTRDO0FBQzVDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFRLEtBQStCO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLG1CQUFPLENBQUMsMEVBQXNCOztBQUVsRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDs7Ozs7Ozs7Ozs7OztBQ25MYTs7QUFFYixZQUFZLG1CQUFPLENBQUMsbURBQVM7QUFDN0IsV0FBVyxtQkFBTyxDQUFDLGlFQUFnQjtBQUNuQyxZQUFZLG1CQUFPLENBQUMsNkRBQWM7QUFDbEMsZUFBZSxtQkFBTyxDQUFDLHlEQUFZOztBQUVuQztBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsWUFBWSxNQUFNO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGVBQWUsbUJBQU8sQ0FBQyxtRUFBaUI7QUFDeEMsb0JBQW9CLG1CQUFPLENBQUMsNkVBQXNCO0FBQ2xELGlCQUFpQixtQkFBTyxDQUFDLHVFQUFtQjs7QUFFNUM7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLG1CQUFPLENBQUMscUVBQWtCOztBQUV6Qzs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbkRhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7Ozs7Ozs7Ozs7OztBQ2xCYTs7QUFFYixhQUFhLG1CQUFPLENBQUMsNERBQVU7O0FBRS9CO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsV0FBVyxTQUFTO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7Ozs7OztBQ3hEYTs7QUFFYjtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNKYTs7QUFFYixlQUFlLG1CQUFPLENBQUMsNERBQWU7QUFDdEMsWUFBWSxtQkFBTyxDQUFDLHNEQUFZO0FBQ2hDLHlCQUF5QixtQkFBTyxDQUFDLGtGQUFzQjtBQUN2RCxzQkFBc0IsbUJBQU8sQ0FBQyw0RUFBbUI7O0FBRWpEO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQSxrQ0FBa0MsY0FBYztBQUNoRDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnREFBZ0Q7QUFDaEQ7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdEO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLENBQUM7O0FBRUQ7Ozs7Ozs7Ozs7Ozs7QUM5RWE7O0FBRWIsWUFBWSxtQkFBTyxDQUFDLHNEQUFZOztBQUVoQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxTQUFTO0FBQ3BCLFdBQVcsU0FBUztBQUNwQjtBQUNBLFlBQVksT0FBTztBQUNuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFNBQVM7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIOztBQUVBOzs7Ozs7Ozs7Ozs7O0FDbkRhOztBQUViLG1CQUFtQixtQkFBTyxDQUFDLHNFQUFnQjs7QUFFM0M7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixhQUFhLE1BQU07QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2pCYTs7QUFFYixZQUFZLG1CQUFPLENBQUMsc0RBQVk7QUFDaEMsb0JBQW9CLG1CQUFPLENBQUMsd0VBQWlCO0FBQzdDLGVBQWUsbUJBQU8sQ0FBQyx3RUFBb0I7QUFDM0MsZUFBZSxtQkFBTyxDQUFDLDBEQUFhO0FBQ3BDLG9CQUFvQixtQkFBTyxDQUFDLHNGQUE0QjtBQUN4RCxrQkFBa0IsbUJBQU8sQ0FBQyxrRkFBMEI7O0FBRXBEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLCtCQUErQjtBQUMvQix1Q0FBdUM7QUFDdkM7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxHQUFHO0FBQ0g7Ozs7Ozs7Ozs7Ozs7QUNyRmE7O0FBRWI7QUFDQTtBQUNBO0FBQ0EsV0FBVyxNQUFNO0FBQ2pCLFdBQVcsT0FBTztBQUNsQixXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixhQUFhLE1BQU07QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNwQmE7O0FBRWIsa0JBQWtCLG1CQUFPLENBQUMsb0VBQWU7O0FBRXpDO0FBQ0E7QUFDQTtBQUNBLFdBQVcsU0FBUztBQUNwQixXQUFXLFNBQVM7QUFDcEIsV0FBVyxPQUFPO0FBQ2xCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUN6QmE7O0FBRWIsWUFBWSxtQkFBTyxDQUFDLHNEQUFZOztBQUVoQztBQUNBO0FBQ0E7QUFDQSxXQUFXLGNBQWM7QUFDekIsV0FBVyxNQUFNO0FBQ2pCLFdBQVcsZUFBZTtBQUMxQixhQUFhLEVBQUU7QUFDZjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOzs7Ozs7Ozs7Ozs7O0FDbkJBLCtDQUFhOztBQUViLFlBQVksbUJBQU8sQ0FBQyxtREFBUztBQUM3QiwwQkFBMEIsbUJBQU8sQ0FBQywrRkFBK0I7O0FBRWpFO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxtQkFBTyxDQUFDLGlFQUFnQjtBQUN0QyxHQUFHO0FBQ0g7QUFDQSxjQUFjLG1CQUFPLENBQUMsa0VBQWlCO0FBQ3ZDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdFQUF3RTtBQUN4RTtBQUNBO0FBQ0E7QUFDQSx1REFBdUQ7QUFDdkQ7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTyxZQUFZO0FBQ25CO0FBQ0E7QUFDQSxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQSxDQUFDOztBQUVEOzs7Ozs7Ozs7Ozs7OztBQy9GYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsaUJBQWlCO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNWYTs7QUFFYjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7O0FDbkNhOztBQUViLFlBQVksbUJBQU8sQ0FBQyxzREFBWTs7QUFFaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUCxLQUFLOztBQUVMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNqRWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDYmE7O0FBRWIsWUFBWSxtQkFBTyxDQUFDLHNEQUFZOztBQUVoQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsd0NBQXdDO0FBQ3hDLE9BQU87O0FBRVA7QUFDQSwwREFBMEQsd0JBQXdCO0FBQ2xGO0FBQ0EsT0FBTzs7QUFFUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDO0FBQ2hDLDZCQUE2QixhQUFhLEVBQUU7QUFDNUM7QUFDQTtBQUNBLEdBQUc7QUFDSDs7Ozs7Ozs7Ozs7OztBQ3BEYTs7QUFFYjtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDYmE7O0FBRWIsWUFBWSxtQkFBTyxDQUFDLHNEQUFZOztBQUVoQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxjQUFjLE9BQU87QUFDckIsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsY0FBYyxPQUFPO0FBQ3JCLGdCQUFnQixRQUFRO0FBQ3hCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7Ozs7Ozs7Ozs7OztBQ25FYTs7QUFFYixZQUFZLG1CQUFPLENBQUMsb0RBQVU7O0FBRTlCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDs7Ozs7Ozs7Ozs7OztBQ1hhOztBQUViLFlBQVksbUJBQU8sQ0FBQyxzREFBWTs7QUFFaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlCQUFpQixlQUFlOztBQUVoQztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsR0FBRzs7QUFFSDtBQUNBOzs7Ozs7Ozs7Ozs7O0FDcERhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0I7QUFDQTtBQUNBLFdBQVcsU0FBUztBQUNwQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDMUJhOztBQUViLFdBQVcsbUJBQU8sQ0FBQyxpRUFBZ0I7QUFDbkMsZUFBZSxtQkFBTyxDQUFDLHFEQUFXOztBQUVsQzs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxRQUFRO0FBQ3JCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxPQUFPO0FBQ2xCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsYUFBYSxPQUFPO0FBQ3BCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsYUFBYTtBQUN4QixXQUFXLFNBQVM7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1DQUFtQyxPQUFPO0FBQzFDO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixTQUFTLEdBQUcsU0FBUztBQUM1QywyQkFBMkI7QUFDM0I7QUFDQTtBQUNBLFdBQVcsT0FBTztBQUNsQixhQUFhLE9BQU87QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQSx1Q0FBdUMsT0FBTztBQUM5QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLE9BQU87QUFDbEIsV0FBVyxPQUFPO0FBQ2xCLFdBQVcsT0FBTztBQUNsQixZQUFZLE9BQU87QUFDbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNuUkE7QUFDQTtBQUNBO0FBQ0Esa0JBREE7QUFFQTtBQUZBLEtBREE7QUFLQTtBQUNBLGtCQURBO0FBRUE7QUFGQSxLQUxBO0FBU0E7QUFDQSxrQkFEQTtBQUVBO0FBRkEsS0FUQTtBQWFBO0FBQ0Esa0JBREE7QUFFQTtBQUZBLEtBYkE7QUFpQkE7QUFDQSxrQkFEQTtBQUVBO0FBRkEsS0FqQkE7QUFxQkE7QUFDQSxvQkFEQTtBQUVBO0FBRkEsS0FyQkE7QUF5QkE7QUFDQSxrQkFEQTtBQUVBO0FBRkE7QUF6QkEsR0FEQTtBQStCQTtBQUNBLFdBREEscUJBQ0E7QUFDQTtBQUNBO0FBSEEsR0EvQkE7QUFvQ0E7QUFDQSxlQURBLHVCQUNBLENBREEsRUFDQTtBQUNBO0FBQ0E7QUFIQTtBQXBDQSxHOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNkQTtBQUNBO0FBQ0E7QUFDQSxrQkFEQTtBQUVBO0FBRkEsS0FEQTtBQUtBO0FBQ0Esa0JBREE7QUFFQTtBQUZBO0FBTEEsR0FEQTtBQVdBO0FBQ0EsWUFEQSxzQkFDQTtBQUNBO0FBQ0EsS0FIQTtBQUtBLGFBTEEsdUJBS0E7QUFDQSxpQ0FDQSw4QkFEQSxFQUNBLElBREE7QUFHQSxLQVRBO0FBVUEsU0FWQSxtQkFVQTtBQUNBO0FBQ0EsS0FaQTtBQWFBLFVBYkEsb0JBYUE7QUFDQTtBQUNBLEtBZkE7QUFnQkEsV0FoQkEscUJBZ0JBO0FBQ0E7QUFDQSxLQWxCQTtBQW1CQSxXQW5CQSxxQkFtQkE7QUFDQTtBQUNBO0FBckJBLEdBWEE7QUFrQ0E7QUFDQSxlQURBLHVCQUNBLE1BREEsRUFDQTtBQUNBO0FBQ0E7QUFIQTtBQWxDQSxHOzs7Ozs7Ozs7Ozs7QUNiQTtBQUFBO0FBQUE7QUFBaUQ7O0FBRWpEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLLFVBQVUsMkRBQWE7QUFDNUI7QUFDQTtBQUNBOztBQUVlLHNFQUFPLEU7Ozs7Ozs7Ozs7O0FDbEN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLEVBQUU7QUFDYixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLFNBQVM7QUFDcEIsV0FBVyxTQUFTO0FBQ3BCLGFBQWEsU0FBUztBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLEVBQUU7QUFDYixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFXLEVBQUU7QUFDYixhQUFhLFFBQVE7QUFDckI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0JBQW9CLGlCQUFpQjtBQUNyQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7OztBQzFJQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsdUJBQXVCLHNCQUFzQjtBQUM3QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEscUNBQXFDOztBQUVyQztBQUNBO0FBQ0E7O0FBRUEsMkJBQTJCO0FBQzNCO0FBQ0E7QUFDQTtBQUNBLDRCQUE0QixVQUFVOzs7Ozs7Ozs7Ozs7O0FDdkx6Qjs7QUFFYjtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2pCYTs7QUFFYixnQkFBZ0IsbUJBQU8sQ0FBQyx3REFBYTtBQUNyQyxZQUFZLG1CQUFPLENBQUMsZ0RBQVM7QUFDN0IsY0FBYyxtQkFBTyxDQUFDLG9EQUFXOztBQUVqQztBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7O0FDVmE7O0FBRWIsWUFBWSxtQkFBTyxDQUFDLGdEQUFTOztBQUU3Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CLGtCQUFrQjtBQUNyQzs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSxrQ0FBa0MsUUFBUTtBQUMxQztBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHdDQUF3Qzs7QUFFeEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQSxtQkFBbUIsaUJBQWlCO0FBQ3BDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUM3S2E7O0FBRWIsWUFBWSxtQkFBTyxDQUFDLGdEQUFTO0FBQzdCLGNBQWMsbUJBQU8sQ0FBQyxvREFBVzs7QUFFakM7QUFDQSx5Q0FBeUM7QUFDekM7QUFDQSxLQUFLO0FBQ0wsNENBQTRDO0FBQzVDO0FBQ0EsS0FBSztBQUNMLHFDQUFxQztBQUNyQztBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRDtBQUNqRDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQSxtQkFBbUIsb0JBQW9CO0FBQ3ZDOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esd0NBQXdDOztBQUV4QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsbUJBQW1CLG9CQUFvQjtBQUN2Qzs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7OztBQ2pOYTs7QUFFYjs7QUFFQTtBQUNBO0FBQ0EsbUJBQW1CLFNBQVM7QUFDNUI7QUFDQTs7QUFFQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQSwyQkFBMkIsZ0JBQWdCO0FBQzNDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxtQkFBbUIsbUJBQW1CO0FBQ3RDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLG1CQUFtQixtQkFBbUI7QUFDdEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSxrQkFBa0IsT0FBTyxXQUFXLGFBQWE7QUFDakQ7O0FBRUEsbUJBQW1CLGtCQUFrQjtBQUNyQztBQUNBOztBQUVBO0FBQ0EsdUJBQXVCLGlCQUFpQjtBQUN4QztBQUNBO0FBQ0E7QUFDQSw0QkFBNEIsc0JBQXNCO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7OztBQ3BOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsZ0JBQWdCO0FBQ2hCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWM7QUFDZCxLQUFLO0FBQ0wsY0FBYztBQUNkO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EseURBQXlEO0FBQ3pEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZO0FBQ1o7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFdBQVc7QUFDWDtBQUNBLFdBQVc7QUFDWDs7QUFFQTtBQUNBO0FBQ0Esd0NBQXdDLFdBQVc7QUFDbkQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDJCQUEyQjtBQUMzQjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBLFNBQVM7QUFDVDtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esb0NBQW9DLGNBQWM7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlDQUFpQyxrQkFBa0I7QUFDbkQ7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGlCQUFpQjs7QUFFakI7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGlCQUFpQjtBQUN6QztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFlBQVk7QUFDWjtBQUNBOztBQUVBO0FBQ0EsWUFBWTtBQUNaOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSzs7QUFFTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsOENBQThDLFFBQVE7QUFDdEQ7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBOztBQUVBLFdBQVc7QUFDWDtBQUNBO0FBQ0E7O0FBRUEsV0FBVztBQUNYO0FBQ0E7QUFDQTs7QUFFQSxXQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0EsOENBQThDLFFBQVE7QUFDdEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSw4Q0FBOEMsUUFBUTtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7O0FBRUw7QUFDQSw4Q0FBOEMsUUFBUTtBQUN0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxLQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQy90QkE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVCQUF1QixFQUFFO0FBQ3pCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLG1CQUFtQixpQkFBaUI7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtCQUErQjtBQUMvQjtBQUNBLCtCQUErQixxQkFBcUI7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esb0NBQW9DO0FBQ3BDO0FBQ0E7QUFDQSxzQkFBc0I7QUFDdEI7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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elAsSUFBRCxFQUFPSixJQUFQLEVBQWFlLEtBQWIsQ0FBYjtBQUNILENBTEQ7QUFPZUEsb0VBQWYsRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNoQ0EsbUI7Ozs7Ozs7Ozs7O0FDQUEscUI7Ozs7Ozs7Ozs7O0FDQUEsc0IiLCJmaWxlIjoiYXBwLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJQVUJMSUNfUEFUSFwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vbGliL2F4aW9zJyk7IiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG52YXIgc2V0dGxlID0gcmVxdWlyZSgnLi8uLi9jb3JlL3NldHRsZScpO1xudmFyIGJ1aWxkVVJMID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2J1aWxkVVJMJyk7XG52YXIgcGFyc2VIZWFkZXJzID0gcmVxdWlyZSgnLi8uLi9oZWxwZXJzL3BhcnNlSGVhZGVycycpO1xudmFyIGlzVVJMU2FtZU9yaWdpbiA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9pc1VSTFNhbWVPcmlnaW4nKTtcbnZhciBjcmVhdGVFcnJvciA9IHJlcXVpcmUoJy4uL2NvcmUvY3JlYXRlRXJyb3InKTtcbnZhciBidG9hID0gKHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHdpbmRvdy5idG9hICYmIHdpbmRvdy5idG9hLmJpbmQod2luZG93KSkgfHwgcmVxdWlyZSgnLi8uLi9oZWxwZXJzL2J0b2EnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiB4aHJBZGFwdGVyKGNvbmZpZykge1xuICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24gZGlzcGF0Y2hYaHJSZXF1ZXN0KHJlc29sdmUsIHJlamVjdCkge1xuICAgIHZhciByZXF1ZXN0RGF0YSA9IGNvbmZpZy5kYXRhO1xuICAgIHZhciByZXF1ZXN0SGVhZGVycyA9IGNvbmZpZy5oZWFkZXJzO1xuXG4gICAgaWYgKHV0aWxzLmlzRm9ybURhdGEocmVxdWVzdERhdGEpKSB7XG4gICAgICBkZWxldGUgcmVxdWVzdEhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddOyAvLyBMZXQgdGhlIGJyb3dzZXIgc2V0IGl0XG4gICAgfVxuXG4gICAgdmFyIHJlcXVlc3QgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICB2YXIgbG9hZEV2ZW50ID0gJ29ucmVhZHlzdGF0ZWNoYW5nZSc7XG4gICAgdmFyIHhEb21haW4gPSBmYWxzZTtcblxuICAgIC8vIEZvciBJRSA4LzkgQ09SUyBzdXBwb3J0XG4gICAgLy8gT25seSBzdXBwb3J0cyBQT1NUIGFuZCBHRVQgY2FsbHMgYW5kIGRvZXNuJ3QgcmV0dXJucyB0aGUgcmVzcG9uc2UgaGVhZGVycy5cbiAgICAvLyBET04nVCBkbyB0aGlzIGZvciB0ZXN0aW5nIGIvYyBYTUxIdHRwUmVxdWVzdCBpcyBtb2NrZWQsIG5vdCBYRG9tYWluUmVxdWVzdC5cbiAgICBpZiAocHJvY2Vzcy5lbnYuTk9ERV9FTlYgIT09ICd0ZXN0JyAmJlxuICAgICAgICB0eXBlb2Ygd2luZG93ICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICB3aW5kb3cuWERvbWFpblJlcXVlc3QgJiYgISgnd2l0aENyZWRlbnRpYWxzJyBpbiByZXF1ZXN0KSAmJlxuICAgICAgICAhaXNVUkxTYW1lT3JpZ2luKGNvbmZpZy51cmwpKSB7XG4gICAgICByZXF1ZXN0ID0gbmV3IHdpbmRvdy5YRG9tYWluUmVxdWVzdCgpO1xuICAgICAgbG9hZEV2ZW50ID0gJ29ubG9hZCc7XG4gICAgICB4RG9tYWluID0gdHJ1ZTtcbiAgICAgIHJlcXVlc3Qub25wcm9ncmVzcyA9IGZ1bmN0aW9uIGhhbmRsZVByb2dyZXNzKCkge307XG4gICAgICByZXF1ZXN0Lm9udGltZW91dCA9IGZ1bmN0aW9uIGhhbmRsZVRpbWVvdXQoKSB7fTtcbiAgICB9XG5cbiAgICAvLyBIVFRQIGJhc2ljIGF1dGhlbnRpY2F0aW9uXG4gICAgaWYgKGNvbmZpZy5hdXRoKSB7XG4gICAgICB2YXIgdXNlcm5hbWUgPSBjb25maWcuYXV0aC51c2VybmFtZSB8fCAnJztcbiAgICAgIHZhciBwYXNzd29yZCA9IGNvbmZpZy5hdXRoLnBhc3N3b3JkIHx8ICcnO1xuICAgICAgcmVxdWVzdEhlYWRlcnMuQXV0aG9yaXphdGlvbiA9ICdCYXNpYyAnICsgYnRvYSh1c2VybmFtZSArICc6JyArIHBhc3N3b3JkKTtcbiAgICB9XG5cbiAgICByZXF1ZXN0Lm9wZW4oY29uZmlnLm1ldGhvZC50b1VwcGVyQ2FzZSgpLCBidWlsZFVSTChjb25maWcudXJsLCBjb25maWcucGFyYW1zLCBjb25maWcucGFyYW1zU2VyaWFsaXplciksIHRydWUpO1xuXG4gICAgLy8gU2V0IHRoZSByZXF1ZXN0IHRpbWVvdXQgaW4gTVNcbiAgICByZXF1ZXN0LnRpbWVvdXQgPSBjb25maWcudGltZW91dDtcblxuICAgIC8vIExpc3RlbiBmb3IgcmVhZHkgc3RhdGVcbiAgICByZXF1ZXN0W2xvYWRFdmVudF0gPSBmdW5jdGlvbiBoYW5kbGVMb2FkKCkge1xuICAgICAgaWYgKCFyZXF1ZXN0IHx8IChyZXF1ZXN0LnJlYWR5U3RhdGUgIT09IDQgJiYgIXhEb21haW4pKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gVGhlIHJlcXVlc3QgZXJyb3JlZCBvdXQgYW5kIHdlIGRpZG4ndCBnZXQgYSByZXNwb25zZSwgdGhpcyB3aWxsIGJlXG4gICAgICAvLyBoYW5kbGVkIGJ5IG9uZXJyb3IgaW5zdGVhZFxuICAgICAgLy8gV2l0aCBvbmUgZXhjZXB0aW9uOiByZXF1ZXN0IHRoYXQgdXNpbmcgZmlsZTogcHJvdG9jb2wsIG1vc3QgYnJvd3NlcnNcbiAgICAgIC8vIHdpbGwgcmV0dXJuIHN0YXR1cyBhcyAwIGV2ZW4gdGhvdWdoIGl0J3MgYSBzdWNjZXNzZnVsIHJlcXVlc3RcbiAgICAgIGlmIChyZXF1ZXN0LnN0YXR1cyA9PT0gMCAmJiAhKHJlcXVlc3QucmVzcG9uc2VVUkwgJiYgcmVxdWVzdC5yZXNwb25zZVVSTC5pbmRleE9mKCdmaWxlOicpID09PSAwKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIFByZXBhcmUgdGhlIHJlc3BvbnNlXG4gICAgICB2YXIgcmVzcG9uc2VIZWFkZXJzID0gJ2dldEFsbFJlc3BvbnNlSGVhZGVycycgaW4gcmVxdWVzdCA/IHBhcnNlSGVhZGVycyhyZXF1ZXN0LmdldEFsbFJlc3BvbnNlSGVhZGVycygpKSA6IG51bGw7XG4gICAgICB2YXIgcmVzcG9uc2VEYXRhID0gIWNvbmZpZy5yZXNwb25zZVR5cGUgfHwgY29uZmlnLnJlc3BvbnNlVHlwZSA9PT0gJ3RleHQnID8gcmVxdWVzdC5yZXNwb25zZVRleHQgOiByZXF1ZXN0LnJlc3BvbnNlO1xuICAgICAgdmFyIHJlc3BvbnNlID0ge1xuICAgICAgICBkYXRhOiByZXNwb25zZURhdGEsXG4gICAgICAgIC8vIElFIHNlbmRzIDEyMjMgaW5zdGVhZCBvZiAyMDQgKGh0dHBzOi8vZ2l0aHViLmNvbS9heGlvcy9heGlvcy9pc3N1ZXMvMjAxKVxuICAgICAgICBzdGF0dXM6IHJlcXVlc3Quc3RhdHVzID09PSAxMjIzID8gMjA0IDogcmVxdWVzdC5zdGF0dXMsXG4gICAgICAgIHN0YXR1c1RleHQ6IHJlcXVlc3Quc3RhdHVzID09PSAxMjIzID8gJ05vIENvbnRlbnQnIDogcmVxdWVzdC5zdGF0dXNUZXh0LFxuICAgICAgICBoZWFkZXJzOiByZXNwb25zZUhlYWRlcnMsXG4gICAgICAgIGNvbmZpZzogY29uZmlnLFxuICAgICAgICByZXF1ZXN0OiByZXF1ZXN0XG4gICAgICB9O1xuXG4gICAgICBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCByZXNwb25zZSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBIYW5kbGUgbG93IGxldmVsIG5ldHdvcmsgZXJyb3JzXG4gICAgcmVxdWVzdC5vbmVycm9yID0gZnVuY3Rpb24gaGFuZGxlRXJyb3IoKSB7XG4gICAgICAvLyBSZWFsIGVycm9ycyBhcmUgaGlkZGVuIGZyb20gdXMgYnkgdGhlIGJyb3dzZXJcbiAgICAgIC8vIG9uZXJyb3Igc2hvdWxkIG9ubHkgZmlyZSBpZiBpdCdzIGEgbmV0d29yayBlcnJvclxuICAgICAgcmVqZWN0KGNyZWF0ZUVycm9yKCdOZXR3b3JrIEVycm9yJywgY29uZmlnLCBudWxsLCByZXF1ZXN0KSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBIYW5kbGUgdGltZW91dFxuICAgIHJlcXVlc3Qub250aW1lb3V0ID0gZnVuY3Rpb24gaGFuZGxlVGltZW91dCgpIHtcbiAgICAgIHJlamVjdChjcmVhdGVFcnJvcigndGltZW91dCBvZiAnICsgY29uZmlnLnRpbWVvdXQgKyAnbXMgZXhjZWVkZWQnLCBjb25maWcsICdFQ09OTkFCT1JURUQnLFxuICAgICAgICByZXF1ZXN0KSk7XG5cbiAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgIHJlcXVlc3QgPSBudWxsO1xuICAgIH07XG5cbiAgICAvLyBBZGQgeHNyZiBoZWFkZXJcbiAgICAvLyBUaGlzIGlzIG9ubHkgZG9uZSBpZiBydW5uaW5nIGluIGEgc3RhbmRhcmQgYnJvd3NlciBlbnZpcm9ubWVudC5cbiAgICAvLyBTcGVjaWZpY2FsbHkgbm90IGlmIHdlJ3JlIGluIGEgd2ViIHdvcmtlciwgb3IgcmVhY3QtbmF0aXZlLlxuICAgIGlmICh1dGlscy5pc1N0YW5kYXJkQnJvd3NlckVudigpKSB7XG4gICAgICB2YXIgY29va2llcyA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9jb29raWVzJyk7XG5cbiAgICAgIC8vIEFkZCB4c3JmIGhlYWRlclxuICAgICAgdmFyIHhzcmZWYWx1ZSA9IChjb25maWcud2l0aENyZWRlbnRpYWxzIHx8IGlzVVJMU2FtZU9yaWdpbihjb25maWcudXJsKSkgJiYgY29uZmlnLnhzcmZDb29raWVOYW1lID9cbiAgICAgICAgICBjb29raWVzLnJlYWQoY29uZmlnLnhzcmZDb29raWVOYW1lKSA6XG4gICAgICAgICAgdW5kZWZpbmVkO1xuXG4gICAgICBpZiAoeHNyZlZhbHVlKSB7XG4gICAgICAgIHJlcXVlc3RIZWFkZXJzW2NvbmZpZy54c3JmSGVhZGVyTmFtZV0gPSB4c3JmVmFsdWU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQWRkIGhlYWRlcnMgdG8gdGhlIHJlcXVlc3RcbiAgICBpZiAoJ3NldFJlcXVlc3RIZWFkZXInIGluIHJlcXVlc3QpIHtcbiAgICAgIHV0aWxzLmZvckVhY2gocmVxdWVzdEhlYWRlcnMsIGZ1bmN0aW9uIHNldFJlcXVlc3RIZWFkZXIodmFsLCBrZXkpIHtcbiAgICAgICAgaWYgKHR5cGVvZiByZXF1ZXN0RGF0YSA9PT0gJ3VuZGVmaW5lZCcgJiYga2V5LnRvTG93ZXJDYXNlKCkgPT09ICdjb250ZW50LXR5cGUnKSB7XG4gICAgICAgICAgLy8gUmVtb3ZlIENvbnRlbnQtVHlwZSBpZiBkYXRhIGlzIHVuZGVmaW5lZFxuICAgICAgICAgIGRlbGV0ZSByZXF1ZXN0SGVhZGVyc1trZXldO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIE90aGVyd2lzZSBhZGQgaGVhZGVyIHRvIHRoZSByZXF1ZXN0XG4gICAgICAgICAgcmVxdWVzdC5zZXRSZXF1ZXN0SGVhZGVyKGtleSwgdmFsKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gQWRkIHdpdGhDcmVkZW50aWFscyB0byByZXF1ZXN0IGlmIG5lZWRlZFxuICAgIGlmIChjb25maWcud2l0aENyZWRlbnRpYWxzKSB7XG4gICAgICByZXF1ZXN0LndpdGhDcmVkZW50aWFscyA9IHRydWU7XG4gICAgfVxuXG4gICAgLy8gQWRkIHJlc3BvbnNlVHlwZSB0byByZXF1ZXN0IGlmIG5lZWRlZFxuICAgIGlmIChjb25maWcucmVzcG9uc2VUeXBlKSB7XG4gICAgICB0cnkge1xuICAgICAgICByZXF1ZXN0LnJlc3BvbnNlVHlwZSA9IGNvbmZpZy5yZXNwb25zZVR5cGU7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIC8vIEV4cGVjdGVkIERPTUV4Y2VwdGlvbiB0aHJvd24gYnkgYnJvd3NlcnMgbm90IGNvbXBhdGlibGUgWE1MSHR0cFJlcXVlc3QgTGV2ZWwgMi5cbiAgICAgICAgLy8gQnV0LCB0aGlzIGNhbiBiZSBzdXBwcmVzc2VkIGZvciAnanNvbicgdHlwZSBhcyBpdCBjYW4gYmUgcGFyc2VkIGJ5IGRlZmF1bHQgJ3RyYW5zZm9ybVJlc3BvbnNlJyBmdW5jdGlvbi5cbiAgICAgICAgaWYgKGNvbmZpZy5yZXNwb25zZVR5cGUgIT09ICdqc29uJykge1xuICAgICAgICAgIHRocm93IGU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBIYW5kbGUgcHJvZ3Jlc3MgaWYgbmVlZGVkXG4gICAgaWYgKHR5cGVvZiBjb25maWcub25Eb3dubG9hZFByb2dyZXNzID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICByZXF1ZXN0LmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgY29uZmlnLm9uRG93bmxvYWRQcm9ncmVzcyk7XG4gICAgfVxuXG4gICAgLy8gTm90IGFsbCBicm93c2VycyBzdXBwb3J0IHVwbG9hZCBldmVudHNcbiAgICBpZiAodHlwZW9mIGNvbmZpZy5vblVwbG9hZFByb2dyZXNzID09PSAnZnVuY3Rpb24nICYmIHJlcXVlc3QudXBsb2FkKSB7XG4gICAgICByZXF1ZXN0LnVwbG9hZC5hZGRFdmVudExpc3RlbmVyKCdwcm9ncmVzcycsIGNvbmZpZy5vblVwbG9hZFByb2dyZXNzKTtcbiAgICB9XG5cbiAgICBpZiAoY29uZmlnLmNhbmNlbFRva2VuKSB7XG4gICAgICAvLyBIYW5kbGUgY2FuY2VsbGF0aW9uXG4gICAgICBjb25maWcuY2FuY2VsVG9rZW4ucHJvbWlzZS50aGVuKGZ1bmN0aW9uIG9uQ2FuY2VsZWQoY2FuY2VsKSB7XG4gICAgICAgIGlmICghcmVxdWVzdCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlcXVlc3QuYWJvcnQoKTtcbiAgICAgICAgcmVqZWN0KGNhbmNlbCk7XG4gICAgICAgIC8vIENsZWFuIHVwIHJlcXVlc3RcbiAgICAgICAgcmVxdWVzdCA9IG51bGw7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAocmVxdWVzdERhdGEgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmVxdWVzdERhdGEgPSBudWxsO1xuICAgIH1cblxuICAgIC8vIFNlbmQgdGhlIHJlcXVlc3RcbiAgICByZXF1ZXN0LnNlbmQocmVxdWVzdERhdGEpO1xuICB9KTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbnZhciBiaW5kID0gcmVxdWlyZSgnLi9oZWxwZXJzL2JpbmQnKTtcbnZhciBBeGlvcyA9IHJlcXVpcmUoJy4vY29yZS9BeGlvcycpO1xudmFyIGRlZmF1bHRzID0gcmVxdWlyZSgnLi9kZWZhdWx0cycpO1xuXG4vKipcbiAqIENyZWF0ZSBhbiBpbnN0YW5jZSBvZiBBeGlvc1xuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBkZWZhdWx0Q29uZmlnIFRoZSBkZWZhdWx0IGNvbmZpZyBmb3IgdGhlIGluc3RhbmNlXG4gKiBAcmV0dXJuIHtBeGlvc30gQSBuZXcgaW5zdGFuY2Ugb2YgQXhpb3NcbiAqL1xuZnVuY3Rpb24gY3JlYXRlSW5zdGFuY2UoZGVmYXVsdENvbmZpZykge1xuICB2YXIgY29udGV4dCA9IG5ldyBBeGlvcyhkZWZhdWx0Q29uZmlnKTtcbiAgdmFyIGluc3RhbmNlID0gYmluZChBeGlvcy5wcm90b3R5cGUucmVxdWVzdCwgY29udGV4dCk7XG5cbiAgLy8gQ29weSBheGlvcy5wcm90b3R5cGUgdG8gaW5zdGFuY2VcbiAgdXRpbHMuZXh0ZW5kKGluc3RhbmNlLCBBeGlvcy5wcm90b3R5cGUsIGNvbnRleHQpO1xuXG4gIC8vIENvcHkgY29udGV4dCB0byBpbnN0YW5jZVxuICB1dGlscy5leHRlbmQoaW5zdGFuY2UsIGNvbnRleHQpO1xuXG4gIHJldHVybiBpbnN0YW5jZTtcbn1cblxuLy8gQ3JlYXRlIHRoZSBkZWZhdWx0IGluc3RhbmNlIHRvIGJlIGV4cG9ydGVkXG52YXIgYXhpb3MgPSBjcmVhdGVJbnN0YW5jZShkZWZhdWx0cyk7XG5cbi8vIEV4cG9zZSBBeGlvcyBjbGFzcyB0byBhbGxvdyBjbGFzcyBpbmhlcml0YW5jZVxuYXhpb3MuQXhpb3MgPSBBeGlvcztcblxuLy8gRmFjdG9yeSBmb3IgY3JlYXRpbmcgbmV3IGluc3RhbmNlc1xuYXhpb3MuY3JlYXRlID0gZnVuY3Rpb24gY3JlYXRlKGluc3RhbmNlQ29uZmlnKSB7XG4gIHJldHVybiBjcmVhdGVJbnN0YW5jZSh1dGlscy5tZXJnZShkZWZhdWx0cywgaW5zdGFuY2VDb25maWcpKTtcbn07XG5cbi8vIEV4cG9zZSBDYW5jZWwgJiBDYW5jZWxUb2tlblxuYXhpb3MuQ2FuY2VsID0gcmVxdWlyZSgnLi9jYW5jZWwvQ2FuY2VsJyk7XG5heGlvcy5DYW5jZWxUb2tlbiA9IHJlcXVpcmUoJy4vY2FuY2VsL0NhbmNlbFRva2VuJyk7XG5heGlvcy5pc0NhbmNlbCA9IHJlcXVpcmUoJy4vY2FuY2VsL2lzQ2FuY2VsJyk7XG5cbi8vIEV4cG9zZSBhbGwvc3ByZWFkXG5heGlvcy5hbGwgPSBmdW5jdGlvbiBhbGwocHJvbWlzZXMpIHtcbiAgcmV0dXJuIFByb21pc2UuYWxsKHByb21pc2VzKTtcbn07XG5heGlvcy5zcHJlYWQgPSByZXF1aXJlKCcuL2hlbHBlcnMvc3ByZWFkJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gYXhpb3M7XG5cbi8vIEFsbG93IHVzZSBvZiBkZWZhdWx0IGltcG9ydCBzeW50YXggaW4gVHlwZVNjcmlwdFxubW9kdWxlLmV4cG9ydHMuZGVmYXVsdCA9IGF4aW9zO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIEEgYENhbmNlbGAgaXMgYW4gb2JqZWN0IHRoYXQgaXMgdGhyb3duIHdoZW4gYW4gb3BlcmF0aW9uIGlzIGNhbmNlbGVkLlxuICpcbiAqIEBjbGFzc1xuICogQHBhcmFtIHtzdHJpbmc9fSBtZXNzYWdlIFRoZSBtZXNzYWdlLlxuICovXG5mdW5jdGlvbiBDYW5jZWwobWVzc2FnZSkge1xuICB0aGlzLm1lc3NhZ2UgPSBtZXNzYWdlO1xufVxuXG5DYW5jZWwucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gdG9TdHJpbmcoKSB7XG4gIHJldHVybiAnQ2FuY2VsJyArICh0aGlzLm1lc3NhZ2UgPyAnOiAnICsgdGhpcy5tZXNzYWdlIDogJycpO1xufTtcblxuQ2FuY2VsLnByb3RvdHlwZS5fX0NBTkNFTF9fID0gdHJ1ZTtcblxubW9kdWxlLmV4cG9ydHMgPSBDYW5jZWw7XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBDYW5jZWwgPSByZXF1aXJlKCcuL0NhbmNlbCcpO1xuXG4vKipcbiAqIEEgYENhbmNlbFRva2VuYCBpcyBhbiBvYmplY3QgdGhhdCBjYW4gYmUgdXNlZCB0byByZXF1ZXN0IGNhbmNlbGxhdGlvbiBvZiBhbiBvcGVyYXRpb24uXG4gKlxuICogQGNsYXNzXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBleGVjdXRvciBUaGUgZXhlY3V0b3IgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIENhbmNlbFRva2VuKGV4ZWN1dG9yKSB7XG4gIGlmICh0eXBlb2YgZXhlY3V0b3IgIT09ICdmdW5jdGlvbicpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdleGVjdXRvciBtdXN0IGJlIGEgZnVuY3Rpb24uJyk7XG4gIH1cblxuICB2YXIgcmVzb2x2ZVByb21pc2U7XG4gIHRoaXMucHJvbWlzZSA9IG5ldyBQcm9taXNlKGZ1bmN0aW9uIHByb21pc2VFeGVjdXRvcihyZXNvbHZlKSB7XG4gICAgcmVzb2x2ZVByb21pc2UgPSByZXNvbHZlO1xuICB9KTtcblxuICB2YXIgdG9rZW4gPSB0aGlzO1xuICBleGVjdXRvcihmdW5jdGlvbiBjYW5jZWwobWVzc2FnZSkge1xuICAgIGlmICh0b2tlbi5yZWFzb24pIHtcbiAgICAgIC8vIENhbmNlbGxhdGlvbiBoYXMgYWxyZWFkeSBiZWVuIHJlcXVlc3RlZFxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRva2VuLnJlYXNvbiA9IG5ldyBDYW5jZWwobWVzc2FnZSk7XG4gICAgcmVzb2x2ZVByb21pc2UodG9rZW4ucmVhc29uKTtcbiAgfSk7XG59XG5cbi8qKlxuICogVGhyb3dzIGEgYENhbmNlbGAgaWYgY2FuY2VsbGF0aW9uIGhhcyBiZWVuIHJlcXVlc3RlZC5cbiAqL1xuQ2FuY2VsVG9rZW4ucHJvdG90eXBlLnRocm93SWZSZXF1ZXN0ZWQgPSBmdW5jdGlvbiB0aHJvd0lmUmVxdWVzdGVkKCkge1xuICBpZiAodGhpcy5yZWFzb24pIHtcbiAgICB0aHJvdyB0aGlzLnJlYXNvbjtcbiAgfVxufTtcblxuLyoqXG4gKiBSZXR1cm5zIGFuIG9iamVjdCB0aGF0IGNvbnRhaW5zIGEgbmV3IGBDYW5jZWxUb2tlbmAgYW5kIGEgZnVuY3Rpb24gdGhhdCwgd2hlbiBjYWxsZWQsXG4gKiBjYW5jZWxzIHRoZSBgQ2FuY2VsVG9rZW5gLlxuICovXG5DYW5jZWxUb2tlbi5zb3VyY2UgPSBmdW5jdGlvbiBzb3VyY2UoKSB7XG4gIHZhciBjYW5jZWw7XG4gIHZhciB0b2tlbiA9IG5ldyBDYW5jZWxUb2tlbihmdW5jdGlvbiBleGVjdXRvcihjKSB7XG4gICAgY2FuY2VsID0gYztcbiAgfSk7XG4gIHJldHVybiB7XG4gICAgdG9rZW46IHRva2VuLFxuICAgIGNhbmNlbDogY2FuY2VsXG4gIH07XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IENhbmNlbFRva2VuO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGlzQ2FuY2VsKHZhbHVlKSB7XG4gIHJldHVybiAhISh2YWx1ZSAmJiB2YWx1ZS5fX0NBTkNFTF9fKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBkZWZhdWx0cyA9IHJlcXVpcmUoJy4vLi4vZGVmYXVsdHMnKTtcbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcbnZhciBJbnRlcmNlcHRvck1hbmFnZXIgPSByZXF1aXJlKCcuL0ludGVyY2VwdG9yTWFuYWdlcicpO1xudmFyIGRpc3BhdGNoUmVxdWVzdCA9IHJlcXVpcmUoJy4vZGlzcGF0Y2hSZXF1ZXN0Jyk7XG5cbi8qKlxuICogQ3JlYXRlIGEgbmV3IGluc3RhbmNlIG9mIEF4aW9zXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IGluc3RhbmNlQ29uZmlnIFRoZSBkZWZhdWx0IGNvbmZpZyBmb3IgdGhlIGluc3RhbmNlXG4gKi9cbmZ1bmN0aW9uIEF4aW9zKGluc3RhbmNlQ29uZmlnKSB7XG4gIHRoaXMuZGVmYXVsdHMgPSBpbnN0YW5jZUNvbmZpZztcbiAgdGhpcy5pbnRlcmNlcHRvcnMgPSB7XG4gICAgcmVxdWVzdDogbmV3IEludGVyY2VwdG9yTWFuYWdlcigpLFxuICAgIHJlc3BvbnNlOiBuZXcgSW50ZXJjZXB0b3JNYW5hZ2VyKClcbiAgfTtcbn1cblxuLyoqXG4gKiBEaXNwYXRjaCBhIHJlcXVlc3RcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcgc3BlY2lmaWMgZm9yIHRoaXMgcmVxdWVzdCAobWVyZ2VkIHdpdGggdGhpcy5kZWZhdWx0cylcbiAqL1xuQXhpb3MucHJvdG90eXBlLnJlcXVlc3QgPSBmdW5jdGlvbiByZXF1ZXN0KGNvbmZpZykge1xuICAvKmVzbGludCBuby1wYXJhbS1yZWFzc2lnbjowKi9cbiAgLy8gQWxsb3cgZm9yIGF4aW9zKCdleGFtcGxlL3VybCdbLCBjb25maWddKSBhIGxhIGZldGNoIEFQSVxuICBpZiAodHlwZW9mIGNvbmZpZyA9PT0gJ3N0cmluZycpIHtcbiAgICBjb25maWcgPSB1dGlscy5tZXJnZSh7XG4gICAgICB1cmw6IGFyZ3VtZW50c1swXVxuICAgIH0sIGFyZ3VtZW50c1sxXSk7XG4gIH1cblxuICBjb25maWcgPSB1dGlscy5tZXJnZShkZWZhdWx0cywge21ldGhvZDogJ2dldCd9LCB0aGlzLmRlZmF1bHRzLCBjb25maWcpO1xuICBjb25maWcubWV0aG9kID0gY29uZmlnLm1ldGhvZC50b0xvd2VyQ2FzZSgpO1xuXG4gIC8vIEhvb2sgdXAgaW50ZXJjZXB0b3JzIG1pZGRsZXdhcmVcbiAgdmFyIGNoYWluID0gW2Rpc3BhdGNoUmVxdWVzdCwgdW5kZWZpbmVkXTtcbiAgdmFyIHByb21pc2UgPSBQcm9taXNlLnJlc29sdmUoY29uZmlnKTtcblxuICB0aGlzLmludGVyY2VwdG9ycy5yZXF1ZXN0LmZvckVhY2goZnVuY3Rpb24gdW5zaGlmdFJlcXVlc3RJbnRlcmNlcHRvcnMoaW50ZXJjZXB0b3IpIHtcbiAgICBjaGFpbi51bnNoaWZ0KGludGVyY2VwdG9yLmZ1bGZpbGxlZCwgaW50ZXJjZXB0b3IucmVqZWN0ZWQpO1xuICB9KTtcblxuICB0aGlzLmludGVyY2VwdG9ycy5yZXNwb25zZS5mb3JFYWNoKGZ1bmN0aW9uIHB1c2hSZXNwb25zZUludGVyY2VwdG9ycyhpbnRlcmNlcHRvcikge1xuICAgIGNoYWluLnB1c2goaW50ZXJjZXB0b3IuZnVsZmlsbGVkLCBpbnRlcmNlcHRvci5yZWplY3RlZCk7XG4gIH0pO1xuXG4gIHdoaWxlIChjaGFpbi5sZW5ndGgpIHtcbiAgICBwcm9taXNlID0gcHJvbWlzZS50aGVuKGNoYWluLnNoaWZ0KCksIGNoYWluLnNoaWZ0KCkpO1xuICB9XG5cbiAgcmV0dXJuIHByb21pc2U7XG59O1xuXG4vLyBQcm92aWRlIGFsaWFzZXMgZm9yIHN1cHBvcnRlZCByZXF1ZXN0IG1ldGhvZHNcbnV0aWxzLmZvckVhY2goWydkZWxldGUnLCAnZ2V0JywgJ2hlYWQnLCAnb3B0aW9ucyddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kTm9EYXRhKG1ldGhvZCkge1xuICAvKmVzbGludCBmdW5jLW5hbWVzOjAqL1xuICBBeGlvcy5wcm90b3R5cGVbbWV0aG9kXSA9IGZ1bmN0aW9uKHVybCwgY29uZmlnKSB7XG4gICAgcmV0dXJuIHRoaXMucmVxdWVzdCh1dGlscy5tZXJnZShjb25maWcgfHwge30sIHtcbiAgICAgIG1ldGhvZDogbWV0aG9kLFxuICAgICAgdXJsOiB1cmxcbiAgICB9KSk7XG4gIH07XG59KTtcblxudXRpbHMuZm9yRWFjaChbJ3Bvc3QnLCAncHV0JywgJ3BhdGNoJ10sIGZ1bmN0aW9uIGZvckVhY2hNZXRob2RXaXRoRGF0YShtZXRob2QpIHtcbiAgLyplc2xpbnQgZnVuYy1uYW1lczowKi9cbiAgQXhpb3MucHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbih1cmwsIGRhdGEsIGNvbmZpZykge1xuICAgIHJldHVybiB0aGlzLnJlcXVlc3QodXRpbHMubWVyZ2UoY29uZmlnIHx8IHt9LCB7XG4gICAgICBtZXRob2Q6IG1ldGhvZCxcbiAgICAgIHVybDogdXJsLFxuICAgICAgZGF0YTogZGF0YVxuICAgIH0pKTtcbiAgfTtcbn0pO1xuXG5tb2R1bGUuZXhwb3J0cyA9IEF4aW9zO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbmZ1bmN0aW9uIEludGVyY2VwdG9yTWFuYWdlcigpIHtcbiAgdGhpcy5oYW5kbGVycyA9IFtdO1xufVxuXG4vKipcbiAqIEFkZCBhIG5ldyBpbnRlcmNlcHRvciB0byB0aGUgc3RhY2tcbiAqXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmdWxmaWxsZWQgVGhlIGZ1bmN0aW9uIHRvIGhhbmRsZSBgdGhlbmAgZm9yIGEgYFByb21pc2VgXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSByZWplY3RlZCBUaGUgZnVuY3Rpb24gdG8gaGFuZGxlIGByZWplY3RgIGZvciBhIGBQcm9taXNlYFxuICpcbiAqIEByZXR1cm4ge051bWJlcn0gQW4gSUQgdXNlZCB0byByZW1vdmUgaW50ZXJjZXB0b3IgbGF0ZXJcbiAqL1xuSW50ZXJjZXB0b3JNYW5hZ2VyLnByb3RvdHlwZS51c2UgPSBmdW5jdGlvbiB1c2UoZnVsZmlsbGVkLCByZWplY3RlZCkge1xuICB0aGlzLmhhbmRsZXJzLnB1c2goe1xuICAgIGZ1bGZpbGxlZDogZnVsZmlsbGVkLFxuICAgIHJlamVjdGVkOiByZWplY3RlZFxuICB9KTtcbiAgcmV0dXJuIHRoaXMuaGFuZGxlcnMubGVuZ3RoIC0gMTtcbn07XG5cbi8qKlxuICogUmVtb3ZlIGFuIGludGVyY2VwdG9yIGZyb20gdGhlIHN0YWNrXG4gKlxuICogQHBhcmFtIHtOdW1iZXJ9IGlkIFRoZSBJRCB0aGF0IHdhcyByZXR1cm5lZCBieSBgdXNlYFxuICovXG5JbnRlcmNlcHRvck1hbmFnZXIucHJvdG90eXBlLmVqZWN0ID0gZnVuY3Rpb24gZWplY3QoaWQpIHtcbiAgaWYgKHRoaXMuaGFuZGxlcnNbaWRdKSB7XG4gICAgdGhpcy5oYW5kbGVyc1tpZF0gPSBudWxsO1xuICB9XG59O1xuXG4vKipcbiAqIEl0ZXJhdGUgb3ZlciBhbGwgdGhlIHJlZ2lzdGVyZWQgaW50ZXJjZXB0b3JzXG4gKlxuICogVGhpcyBtZXRob2QgaXMgcGFydGljdWxhcmx5IHVzZWZ1bCBmb3Igc2tpcHBpbmcgb3ZlciBhbnlcbiAqIGludGVyY2VwdG9ycyB0aGF0IG1heSBoYXZlIGJlY29tZSBgbnVsbGAgY2FsbGluZyBgZWplY3RgLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGZuIFRoZSBmdW5jdGlvbiB0byBjYWxsIGZvciBlYWNoIGludGVyY2VwdG9yXG4gKi9cbkludGVyY2VwdG9yTWFuYWdlci5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uIGZvckVhY2goZm4pIHtcbiAgdXRpbHMuZm9yRWFjaCh0aGlzLmhhbmRsZXJzLCBmdW5jdGlvbiBmb3JFYWNoSGFuZGxlcihoKSB7XG4gICAgaWYgKGggIT09IG51bGwpIHtcbiAgICAgIGZuKGgpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IEludGVyY2VwdG9yTWFuYWdlcjtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGVuaGFuY2VFcnJvciA9IHJlcXVpcmUoJy4vZW5oYW5jZUVycm9yJyk7XG5cbi8qKlxuICogQ3JlYXRlIGFuIEVycm9yIHdpdGggdGhlIHNwZWNpZmllZCBtZXNzYWdlLCBjb25maWcsIGVycm9yIGNvZGUsIHJlcXVlc3QgYW5kIHJlc3BvbnNlLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBtZXNzYWdlIFRoZSBlcnJvciBtZXNzYWdlLlxuICogQHBhcmFtIHtPYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnLlxuICogQHBhcmFtIHtzdHJpbmd9IFtjb2RlXSBUaGUgZXJyb3IgY29kZSAoZm9yIGV4YW1wbGUsICdFQ09OTkFCT1JURUQnKS5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVxdWVzdF0gVGhlIHJlcXVlc3QuXG4gKiBAcGFyYW0ge09iamVjdH0gW3Jlc3BvbnNlXSBUaGUgcmVzcG9uc2UuXG4gKiBAcmV0dXJucyB7RXJyb3J9IFRoZSBjcmVhdGVkIGVycm9yLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGNyZWF0ZUVycm9yKG1lc3NhZ2UsIGNvbmZpZywgY29kZSwgcmVxdWVzdCwgcmVzcG9uc2UpIHtcbiAgdmFyIGVycm9yID0gbmV3IEVycm9yKG1lc3NhZ2UpO1xuICByZXR1cm4gZW5oYW5jZUVycm9yKGVycm9yLCBjb25maWcsIGNvZGUsIHJlcXVlc3QsIHJlc3BvbnNlKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcbnZhciB0cmFuc2Zvcm1EYXRhID0gcmVxdWlyZSgnLi90cmFuc2Zvcm1EYXRhJyk7XG52YXIgaXNDYW5jZWwgPSByZXF1aXJlKCcuLi9jYW5jZWwvaXNDYW5jZWwnKTtcbnZhciBkZWZhdWx0cyA9IHJlcXVpcmUoJy4uL2RlZmF1bHRzJyk7XG52YXIgaXNBYnNvbHV0ZVVSTCA9IHJlcXVpcmUoJy4vLi4vaGVscGVycy9pc0Fic29sdXRlVVJMJyk7XG52YXIgY29tYmluZVVSTHMgPSByZXF1aXJlKCcuLy4uL2hlbHBlcnMvY29tYmluZVVSTHMnKTtcblxuLyoqXG4gKiBUaHJvd3MgYSBgQ2FuY2VsYCBpZiBjYW5jZWxsYXRpb24gaGFzIGJlZW4gcmVxdWVzdGVkLlxuICovXG5mdW5jdGlvbiB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZykge1xuICBpZiAoY29uZmlnLmNhbmNlbFRva2VuKSB7XG4gICAgY29uZmlnLmNhbmNlbFRva2VuLnRocm93SWZSZXF1ZXN0ZWQoKTtcbiAgfVxufVxuXG4vKipcbiAqIERpc3BhdGNoIGEgcmVxdWVzdCB0byB0aGUgc2VydmVyIHVzaW5nIHRoZSBjb25maWd1cmVkIGFkYXB0ZXIuXG4gKlxuICogQHBhcmFtIHtvYmplY3R9IGNvbmZpZyBUaGUgY29uZmlnIHRoYXQgaXMgdG8gYmUgdXNlZCBmb3IgdGhlIHJlcXVlc3RcbiAqIEByZXR1cm5zIHtQcm9taXNlfSBUaGUgUHJvbWlzZSB0byBiZSBmdWxmaWxsZWRcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBkaXNwYXRjaFJlcXVlc3QoY29uZmlnKSB7XG4gIHRocm93SWZDYW5jZWxsYXRpb25SZXF1ZXN0ZWQoY29uZmlnKTtcblxuICAvLyBTdXBwb3J0IGJhc2VVUkwgY29uZmlnXG4gIGlmIChjb25maWcuYmFzZVVSTCAmJiAhaXNBYnNvbHV0ZVVSTChjb25maWcudXJsKSkge1xuICAgIGNvbmZpZy51cmwgPSBjb21iaW5lVVJMcyhjb25maWcuYmFzZVVSTCwgY29uZmlnLnVybCk7XG4gIH1cblxuICAvLyBFbnN1cmUgaGVhZGVycyBleGlzdFxuICBjb25maWcuaGVhZGVycyA9IGNvbmZpZy5oZWFkZXJzIHx8IHt9O1xuXG4gIC8vIFRyYW5zZm9ybSByZXF1ZXN0IGRhdGFcbiAgY29uZmlnLmRhdGEgPSB0cmFuc2Zvcm1EYXRhKFxuICAgIGNvbmZpZy5kYXRhLFxuICAgIGNvbmZpZy5oZWFkZXJzLFxuICAgIGNvbmZpZy50cmFuc2Zvcm1SZXF1ZXN0XG4gICk7XG5cbiAgLy8gRmxhdHRlbiBoZWFkZXJzXG4gIGNvbmZpZy5oZWFkZXJzID0gdXRpbHMubWVyZ2UoXG4gICAgY29uZmlnLmhlYWRlcnMuY29tbW9uIHx8IHt9LFxuICAgIGNvbmZpZy5oZWFkZXJzW2NvbmZpZy5tZXRob2RdIHx8IHt9LFxuICAgIGNvbmZpZy5oZWFkZXJzIHx8IHt9XG4gICk7XG5cbiAgdXRpbHMuZm9yRWFjaChcbiAgICBbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCcsICdwb3N0JywgJ3B1dCcsICdwYXRjaCcsICdjb21tb24nXSxcbiAgICBmdW5jdGlvbiBjbGVhbkhlYWRlckNvbmZpZyhtZXRob2QpIHtcbiAgICAgIGRlbGV0ZSBjb25maWcuaGVhZGVyc1ttZXRob2RdO1xuICAgIH1cbiAgKTtcblxuICB2YXIgYWRhcHRlciA9IGNvbmZpZy5hZGFwdGVyIHx8IGRlZmF1bHRzLmFkYXB0ZXI7XG5cbiAgcmV0dXJuIGFkYXB0ZXIoY29uZmlnKS50aGVuKGZ1bmN0aW9uIG9uQWRhcHRlclJlc29sdXRpb24ocmVzcG9uc2UpIHtcbiAgICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgICAvLyBUcmFuc2Zvcm0gcmVzcG9uc2UgZGF0YVxuICAgIHJlc3BvbnNlLmRhdGEgPSB0cmFuc2Zvcm1EYXRhKFxuICAgICAgcmVzcG9uc2UuZGF0YSxcbiAgICAgIHJlc3BvbnNlLmhlYWRlcnMsXG4gICAgICBjb25maWcudHJhbnNmb3JtUmVzcG9uc2VcbiAgICApO1xuXG4gICAgcmV0dXJuIHJlc3BvbnNlO1xuICB9LCBmdW5jdGlvbiBvbkFkYXB0ZXJSZWplY3Rpb24ocmVhc29uKSB7XG4gICAgaWYgKCFpc0NhbmNlbChyZWFzb24pKSB7XG4gICAgICB0aHJvd0lmQ2FuY2VsbGF0aW9uUmVxdWVzdGVkKGNvbmZpZyk7XG5cbiAgICAgIC8vIFRyYW5zZm9ybSByZXNwb25zZSBkYXRhXG4gICAgICBpZiAocmVhc29uICYmIHJlYXNvbi5yZXNwb25zZSkge1xuICAgICAgICByZWFzb24ucmVzcG9uc2UuZGF0YSA9IHRyYW5zZm9ybURhdGEoXG4gICAgICAgICAgcmVhc29uLnJlc3BvbnNlLmRhdGEsXG4gICAgICAgICAgcmVhc29uLnJlc3BvbnNlLmhlYWRlcnMsXG4gICAgICAgICAgY29uZmlnLnRyYW5zZm9ybVJlc3BvbnNlXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KHJlYXNvbik7XG4gIH0pO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBVcGRhdGUgYW4gRXJyb3Igd2l0aCB0aGUgc3BlY2lmaWVkIGNvbmZpZywgZXJyb3IgY29kZSwgYW5kIHJlc3BvbnNlLlxuICpcbiAqIEBwYXJhbSB7RXJyb3J9IGVycm9yIFRoZSBlcnJvciB0byB1cGRhdGUuXG4gKiBAcGFyYW0ge09iamVjdH0gY29uZmlnIFRoZSBjb25maWcuXG4gKiBAcGFyYW0ge3N0cmluZ30gW2NvZGVdIFRoZSBlcnJvciBjb2RlIChmb3IgZXhhbXBsZSwgJ0VDT05OQUJPUlRFRCcpLlxuICogQHBhcmFtIHtPYmplY3R9IFtyZXF1ZXN0XSBUaGUgcmVxdWVzdC5cbiAqIEBwYXJhbSB7T2JqZWN0fSBbcmVzcG9uc2VdIFRoZSByZXNwb25zZS5cbiAqIEByZXR1cm5zIHtFcnJvcn0gVGhlIGVycm9yLlxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIGVuaGFuY2VFcnJvcihlcnJvciwgY29uZmlnLCBjb2RlLCByZXF1ZXN0LCByZXNwb25zZSkge1xuICBlcnJvci5jb25maWcgPSBjb25maWc7XG4gIGlmIChjb2RlKSB7XG4gICAgZXJyb3IuY29kZSA9IGNvZGU7XG4gIH1cbiAgZXJyb3IucmVxdWVzdCA9IHJlcXVlc3Q7XG4gIGVycm9yLnJlc3BvbnNlID0gcmVzcG9uc2U7XG4gIHJldHVybiBlcnJvcjtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciBjcmVhdGVFcnJvciA9IHJlcXVpcmUoJy4vY3JlYXRlRXJyb3InKTtcblxuLyoqXG4gKiBSZXNvbHZlIG9yIHJlamVjdCBhIFByb21pc2UgYmFzZWQgb24gcmVzcG9uc2Ugc3RhdHVzLlxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IHJlc29sdmUgQSBmdW5jdGlvbiB0aGF0IHJlc29sdmVzIHRoZSBwcm9taXNlLlxuICogQHBhcmFtIHtGdW5jdGlvbn0gcmVqZWN0IEEgZnVuY3Rpb24gdGhhdCByZWplY3RzIHRoZSBwcm9taXNlLlxuICogQHBhcmFtIHtvYmplY3R9IHJlc3BvbnNlIFRoZSByZXNwb25zZS5cbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBzZXR0bGUocmVzb2x2ZSwgcmVqZWN0LCByZXNwb25zZSkge1xuICB2YXIgdmFsaWRhdGVTdGF0dXMgPSByZXNwb25zZS5jb25maWcudmFsaWRhdGVTdGF0dXM7XG4gIC8vIE5vdGU6IHN0YXR1cyBpcyBub3QgZXhwb3NlZCBieSBYRG9tYWluUmVxdWVzdFxuICBpZiAoIXJlc3BvbnNlLnN0YXR1cyB8fCAhdmFsaWRhdGVTdGF0dXMgfHwgdmFsaWRhdGVTdGF0dXMocmVzcG9uc2Uuc3RhdHVzKSkge1xuICAgIHJlc29sdmUocmVzcG9uc2UpO1xuICB9IGVsc2Uge1xuICAgIHJlamVjdChjcmVhdGVFcnJvcihcbiAgICAgICdSZXF1ZXN0IGZhaWxlZCB3aXRoIHN0YXR1cyBjb2RlICcgKyByZXNwb25zZS5zdGF0dXMsXG4gICAgICByZXNwb25zZS5jb25maWcsXG4gICAgICBudWxsLFxuICAgICAgcmVzcG9uc2UucmVxdWVzdCxcbiAgICAgIHJlc3BvbnNlXG4gICAgKSk7XG4gIH1cbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxuLyoqXG4gKiBUcmFuc2Zvcm0gdGhlIGRhdGEgZm9yIGEgcmVxdWVzdCBvciBhIHJlc3BvbnNlXG4gKlxuICogQHBhcmFtIHtPYmplY3R8U3RyaW5nfSBkYXRhIFRoZSBkYXRhIHRvIGJlIHRyYW5zZm9ybWVkXG4gKiBAcGFyYW0ge0FycmF5fSBoZWFkZXJzIFRoZSBoZWFkZXJzIGZvciB0aGUgcmVxdWVzdCBvciByZXNwb25zZVxuICogQHBhcmFtIHtBcnJheXxGdW5jdGlvbn0gZm5zIEEgc2luZ2xlIGZ1bmN0aW9uIG9yIEFycmF5IG9mIGZ1bmN0aW9uc1xuICogQHJldHVybnMgeyp9IFRoZSByZXN1bHRpbmcgdHJhbnNmb3JtZWQgZGF0YVxuICovXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIHRyYW5zZm9ybURhdGEoZGF0YSwgaGVhZGVycywgZm5zKSB7XG4gIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICB1dGlscy5mb3JFYWNoKGZucywgZnVuY3Rpb24gdHJhbnNmb3JtKGZuKSB7XG4gICAgZGF0YSA9IGZuKGRhdGEsIGhlYWRlcnMpO1xuICB9KTtcblxuICByZXR1cm4gZGF0YTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vdXRpbHMnKTtcbnZhciBub3JtYWxpemVIZWFkZXJOYW1lID0gcmVxdWlyZSgnLi9oZWxwZXJzL25vcm1hbGl6ZUhlYWRlck5hbWUnKTtcblxudmFyIERFRkFVTFRfQ09OVEVOVF9UWVBFID0ge1xuICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCdcbn07XG5cbmZ1bmN0aW9uIHNldENvbnRlbnRUeXBlSWZVbnNldChoZWFkZXJzLCB2YWx1ZSkge1xuICBpZiAoIXV0aWxzLmlzVW5kZWZpbmVkKGhlYWRlcnMpICYmIHV0aWxzLmlzVW5kZWZpbmVkKGhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddKSkge1xuICAgIGhlYWRlcnNbJ0NvbnRlbnQtVHlwZSddID0gdmFsdWU7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0RGVmYXVsdEFkYXB0ZXIoKSB7XG4gIHZhciBhZGFwdGVyO1xuICBpZiAodHlwZW9mIFhNTEh0dHBSZXF1ZXN0ICE9PSAndW5kZWZpbmVkJykge1xuICAgIC8vIEZvciBicm93c2VycyB1c2UgWEhSIGFkYXB0ZXJcbiAgICBhZGFwdGVyID0gcmVxdWlyZSgnLi9hZGFwdGVycy94aHInKTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgcHJvY2VzcyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAvLyBGb3Igbm9kZSB1c2UgSFRUUCBhZGFwdGVyXG4gICAgYWRhcHRlciA9IHJlcXVpcmUoJy4vYWRhcHRlcnMvaHR0cCcpO1xuICB9XG4gIHJldHVybiBhZGFwdGVyO1xufVxuXG52YXIgZGVmYXVsdHMgPSB7XG4gIGFkYXB0ZXI6IGdldERlZmF1bHRBZGFwdGVyKCksXG5cbiAgdHJhbnNmb3JtUmVxdWVzdDogW2Z1bmN0aW9uIHRyYW5zZm9ybVJlcXVlc3QoZGF0YSwgaGVhZGVycykge1xuICAgIG5vcm1hbGl6ZUhlYWRlck5hbWUoaGVhZGVycywgJ0NvbnRlbnQtVHlwZScpO1xuICAgIGlmICh1dGlscy5pc0Zvcm1EYXRhKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0FycmF5QnVmZmVyKGRhdGEpIHx8XG4gICAgICB1dGlscy5pc0J1ZmZlcihkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNTdHJlYW0oZGF0YSkgfHxcbiAgICAgIHV0aWxzLmlzRmlsZShkYXRhKSB8fFxuICAgICAgdXRpbHMuaXNCbG9iKGRhdGEpXG4gICAgKSB7XG4gICAgICByZXR1cm4gZGF0YTtcbiAgICB9XG4gICAgaWYgKHV0aWxzLmlzQXJyYXlCdWZmZXJWaWV3KGRhdGEpKSB7XG4gICAgICByZXR1cm4gZGF0YS5idWZmZXI7XG4gICAgfVxuICAgIGlmICh1dGlscy5pc1VSTFNlYXJjaFBhcmFtcyhkYXRhKSkge1xuICAgICAgc2V0Q29udGVudFR5cGVJZlVuc2V0KGhlYWRlcnMsICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQ7Y2hhcnNldD11dGYtOCcpO1xuICAgICAgcmV0dXJuIGRhdGEudG9TdHJpbmcoKTtcbiAgICB9XG4gICAgaWYgKHV0aWxzLmlzT2JqZWN0KGRhdGEpKSB7XG4gICAgICBzZXRDb250ZW50VHlwZUlmVW5zZXQoaGVhZGVycywgJ2FwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtOCcpO1xuICAgICAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGRhdGEpO1xuICAgIH1cbiAgICByZXR1cm4gZGF0YTtcbiAgfV0sXG5cbiAgdHJhbnNmb3JtUmVzcG9uc2U6IFtmdW5jdGlvbiB0cmFuc2Zvcm1SZXNwb25zZShkYXRhKSB7XG4gICAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gICAgaWYgKHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykge1xuICAgICAgdHJ5IHtcbiAgICAgICAgZGF0YSA9IEpTT04ucGFyc2UoZGF0YSk7XG4gICAgICB9IGNhdGNoIChlKSB7IC8qIElnbm9yZSAqLyB9XG4gICAgfVxuICAgIHJldHVybiBkYXRhO1xuICB9XSxcblxuICAvKipcbiAgICogQSB0aW1lb3V0IGluIG1pbGxpc2Vjb25kcyB0byBhYm9ydCBhIHJlcXVlc3QuIElmIHNldCB0byAwIChkZWZhdWx0KSBhXG4gICAqIHRpbWVvdXQgaXMgbm90IGNyZWF0ZWQuXG4gICAqL1xuICB0aW1lb3V0OiAwLFxuXG4gIHhzcmZDb29raWVOYW1lOiAnWFNSRi1UT0tFTicsXG4gIHhzcmZIZWFkZXJOYW1lOiAnWC1YU1JGLVRPS0VOJyxcblxuICBtYXhDb250ZW50TGVuZ3RoOiAtMSxcblxuICB2YWxpZGF0ZVN0YXR1czogZnVuY3Rpb24gdmFsaWRhdGVTdGF0dXMoc3RhdHVzKSB7XG4gICAgcmV0dXJuIHN0YXR1cyA+PSAyMDAgJiYgc3RhdHVzIDwgMzAwO1xuICB9XG59O1xuXG5kZWZhdWx0cy5oZWFkZXJzID0ge1xuICBjb21tb246IHtcbiAgICAnQWNjZXB0JzogJ2FwcGxpY2F0aW9uL2pzb24sIHRleHQvcGxhaW4sICovKidcbiAgfVxufTtcblxudXRpbHMuZm9yRWFjaChbJ2RlbGV0ZScsICdnZXQnLCAnaGVhZCddLCBmdW5jdGlvbiBmb3JFYWNoTWV0aG9kTm9EYXRhKG1ldGhvZCkge1xuICBkZWZhdWx0cy5oZWFkZXJzW21ldGhvZF0gPSB7fTtcbn0pO1xuXG51dGlscy5mb3JFYWNoKFsncG9zdCcsICdwdXQnLCAncGF0Y2gnXSwgZnVuY3Rpb24gZm9yRWFjaE1ldGhvZFdpdGhEYXRhKG1ldGhvZCkge1xuICBkZWZhdWx0cy5oZWFkZXJzW21ldGhvZF0gPSB1dGlscy5tZXJnZShERUZBVUxUX0NPTlRFTlRfVFlQRSk7XG59KTtcblxubW9kdWxlLmV4cG9ydHMgPSBkZWZhdWx0cztcbiIsIid1c2Ugc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBiaW5kKGZuLCB0aGlzQXJnKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKCkge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGgpO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgICAgYXJnc1tpXSA9IGFyZ3VtZW50c1tpXTtcbiAgICB9XG4gICAgcmV0dXJuIGZuLmFwcGx5KHRoaXNBcmcsIGFyZ3MpO1xuICB9O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLy8gYnRvYSBwb2x5ZmlsbCBmb3IgSUU8MTAgY291cnRlc3kgaHR0cHM6Ly9naXRodWIuY29tL2RhdmlkY2hhbWJlcnMvQmFzZTY0LmpzXG5cbnZhciBjaGFycyA9ICdBQkNERUZHSElKS0xNTk9QUVJTVFVWV1hZWmFiY2RlZmdoaWprbG1ub3BxcnN0dXZ3eHl6MDEyMzQ1Njc4OSsvPSc7XG5cbmZ1bmN0aW9uIEUoKSB7XG4gIHRoaXMubWVzc2FnZSA9ICdTdHJpbmcgY29udGFpbnMgYW4gaW52YWxpZCBjaGFyYWN0ZXInO1xufVxuRS5wcm90b3R5cGUgPSBuZXcgRXJyb3I7XG5FLnByb3RvdHlwZS5jb2RlID0gNTtcbkUucHJvdG90eXBlLm5hbWUgPSAnSW52YWxpZENoYXJhY3RlckVycm9yJztcblxuZnVuY3Rpb24gYnRvYShpbnB1dCkge1xuICB2YXIgc3RyID0gU3RyaW5nKGlucHV0KTtcbiAgdmFyIG91dHB1dCA9ICcnO1xuICBmb3IgKFxuICAgIC8vIGluaXRpYWxpemUgcmVzdWx0IGFuZCBjb3VudGVyXG4gICAgdmFyIGJsb2NrLCBjaGFyQ29kZSwgaWR4ID0gMCwgbWFwID0gY2hhcnM7XG4gICAgLy8gaWYgdGhlIG5leHQgc3RyIGluZGV4IGRvZXMgbm90IGV4aXN0OlxuICAgIC8vICAgY2hhbmdlIHRoZSBtYXBwaW5nIHRhYmxlIHRvIFwiPVwiXG4gICAgLy8gICBjaGVjayBpZiBkIGhhcyBubyBmcmFjdGlvbmFsIGRpZ2l0c1xuICAgIHN0ci5jaGFyQXQoaWR4IHwgMCkgfHwgKG1hcCA9ICc9JywgaWR4ICUgMSk7XG4gICAgLy8gXCI4IC0gaWR4ICUgMSAqIDhcIiBnZW5lcmF0ZXMgdGhlIHNlcXVlbmNlIDIsIDQsIDYsIDhcbiAgICBvdXRwdXQgKz0gbWFwLmNoYXJBdCg2MyAmIGJsb2NrID4+IDggLSBpZHggJSAxICogOClcbiAgKSB7XG4gICAgY2hhckNvZGUgPSBzdHIuY2hhckNvZGVBdChpZHggKz0gMyAvIDQpO1xuICAgIGlmIChjaGFyQ29kZSA+IDB4RkYpIHtcbiAgICAgIHRocm93IG5ldyBFKCk7XG4gICAgfVxuICAgIGJsb2NrID0gYmxvY2sgPDwgOCB8IGNoYXJDb2RlO1xuICB9XG4gIHJldHVybiBvdXRwdXQ7XG59XG5cbm1vZHVsZS5leHBvcnRzID0gYnRvYTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi8uLi91dGlscycpO1xuXG5mdW5jdGlvbiBlbmNvZGUodmFsKSB7XG4gIHJldHVybiBlbmNvZGVVUklDb21wb25lbnQodmFsKS5cbiAgICByZXBsYWNlKC8lNDAvZ2ksICdAJykuXG4gICAgcmVwbGFjZSgvJTNBL2dpLCAnOicpLlxuICAgIHJlcGxhY2UoLyUyNC9nLCAnJCcpLlxuICAgIHJlcGxhY2UoLyUyQy9naSwgJywnKS5cbiAgICByZXBsYWNlKC8lMjAvZywgJysnKS5cbiAgICByZXBsYWNlKC8lNUIvZ2ksICdbJykuXG4gICAgcmVwbGFjZSgvJTVEL2dpLCAnXScpO1xufVxuXG4vKipcbiAqIEJ1aWxkIGEgVVJMIGJ5IGFwcGVuZGluZyBwYXJhbXMgdG8gdGhlIGVuZFxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIGJhc2Ugb2YgdGhlIHVybCAoZS5nLiwgaHR0cDovL3d3dy5nb29nbGUuY29tKVxuICogQHBhcmFtIHtvYmplY3R9IFtwYXJhbXNdIFRoZSBwYXJhbXMgdG8gYmUgYXBwZW5kZWRcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBmb3JtYXR0ZWQgdXJsXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gYnVpbGRVUkwodXJsLCBwYXJhbXMsIHBhcmFtc1NlcmlhbGl6ZXIpIHtcbiAgLyplc2xpbnQgbm8tcGFyYW0tcmVhc3NpZ246MCovXG4gIGlmICghcGFyYW1zKSB7XG4gICAgcmV0dXJuIHVybDtcbiAgfVxuXG4gIHZhciBzZXJpYWxpemVkUGFyYW1zO1xuICBpZiAocGFyYW1zU2VyaWFsaXplcikge1xuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJhbXNTZXJpYWxpemVyKHBhcmFtcyk7XG4gIH0gZWxzZSBpZiAodXRpbHMuaXNVUkxTZWFyY2hQYXJhbXMocGFyYW1zKSkge1xuICAgIHNlcmlhbGl6ZWRQYXJhbXMgPSBwYXJhbXMudG9TdHJpbmcoKTtcbiAgfSBlbHNlIHtcbiAgICB2YXIgcGFydHMgPSBbXTtcblxuICAgIHV0aWxzLmZvckVhY2gocGFyYW1zLCBmdW5jdGlvbiBzZXJpYWxpemUodmFsLCBrZXkpIHtcbiAgICAgIGlmICh2YWwgPT09IG51bGwgfHwgdHlwZW9mIHZhbCA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAodXRpbHMuaXNBcnJheSh2YWwpKSB7XG4gICAgICAgIGtleSA9IGtleSArICdbXSc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YWwgPSBbdmFsXTtcbiAgICAgIH1cblxuICAgICAgdXRpbHMuZm9yRWFjaCh2YWwsIGZ1bmN0aW9uIHBhcnNlVmFsdWUodikge1xuICAgICAgICBpZiAodXRpbHMuaXNEYXRlKHYpKSB7XG4gICAgICAgICAgdiA9IHYudG9JU09TdHJpbmcoKTtcbiAgICAgICAgfSBlbHNlIGlmICh1dGlscy5pc09iamVjdCh2KSkge1xuICAgICAgICAgIHYgPSBKU09OLnN0cmluZ2lmeSh2KTtcbiAgICAgICAgfVxuICAgICAgICBwYXJ0cy5wdXNoKGVuY29kZShrZXkpICsgJz0nICsgZW5jb2RlKHYpKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgc2VyaWFsaXplZFBhcmFtcyA9IHBhcnRzLmpvaW4oJyYnKTtcbiAgfVxuXG4gIGlmIChzZXJpYWxpemVkUGFyYW1zKSB7XG4gICAgdXJsICs9ICh1cmwuaW5kZXhPZignPycpID09PSAtMSA/ICc/JyA6ICcmJykgKyBzZXJpYWxpemVkUGFyYW1zO1xuICB9XG5cbiAgcmV0dXJuIHVybDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBVUkwgYnkgY29tYmluaW5nIHRoZSBzcGVjaWZpZWQgVVJMc1xuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSBiYXNlVVJMIFRoZSBiYXNlIFVSTFxuICogQHBhcmFtIHtzdHJpbmd9IHJlbGF0aXZlVVJMIFRoZSByZWxhdGl2ZSBVUkxcbiAqIEByZXR1cm5zIHtzdHJpbmd9IFRoZSBjb21iaW5lZCBVUkxcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBjb21iaW5lVVJMcyhiYXNlVVJMLCByZWxhdGl2ZVVSTCkge1xuICByZXR1cm4gcmVsYXRpdmVVUkxcbiAgICA/IGJhc2VVUkwucmVwbGFjZSgvXFwvKyQvLCAnJykgKyAnLycgKyByZWxhdGl2ZVVSTC5yZXBsYWNlKC9eXFwvKy8sICcnKVxuICAgIDogYmFzZVVSTDtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAoXG4gIHV0aWxzLmlzU3RhbmRhcmRCcm93c2VyRW52KCkgP1xuXG4gIC8vIFN0YW5kYXJkIGJyb3dzZXIgZW52cyBzdXBwb3J0IGRvY3VtZW50LmNvb2tpZVxuICAoZnVuY3Rpb24gc3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgIHJldHVybiB7XG4gICAgICB3cml0ZTogZnVuY3Rpb24gd3JpdGUobmFtZSwgdmFsdWUsIGV4cGlyZXMsIHBhdGgsIGRvbWFpbiwgc2VjdXJlKSB7XG4gICAgICAgIHZhciBjb29raWUgPSBbXTtcbiAgICAgICAgY29va2llLnB1c2gobmFtZSArICc9JyArIGVuY29kZVVSSUNvbXBvbmVudCh2YWx1ZSkpO1xuXG4gICAgICAgIGlmICh1dGlscy5pc051bWJlcihleHBpcmVzKSkge1xuICAgICAgICAgIGNvb2tpZS5wdXNoKCdleHBpcmVzPScgKyBuZXcgRGF0ZShleHBpcmVzKS50b0dNVFN0cmluZygpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh1dGlscy5pc1N0cmluZyhwYXRoKSkge1xuICAgICAgICAgIGNvb2tpZS5wdXNoKCdwYXRoPScgKyBwYXRoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh1dGlscy5pc1N0cmluZyhkb21haW4pKSB7XG4gICAgICAgICAgY29va2llLnB1c2goJ2RvbWFpbj0nICsgZG9tYWluKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChzZWN1cmUgPT09IHRydWUpIHtcbiAgICAgICAgICBjb29raWUucHVzaCgnc2VjdXJlJyk7XG4gICAgICAgIH1cblxuICAgICAgICBkb2N1bWVudC5jb29raWUgPSBjb29raWUuam9pbignOyAnKTtcbiAgICAgIH0sXG5cbiAgICAgIHJlYWQ6IGZ1bmN0aW9uIHJlYWQobmFtZSkge1xuICAgICAgICB2YXIgbWF0Y2ggPSBkb2N1bWVudC5jb29raWUubWF0Y2gobmV3IFJlZ0V4cCgnKF58O1xcXFxzKikoJyArIG5hbWUgKyAnKT0oW147XSopJykpO1xuICAgICAgICByZXR1cm4gKG1hdGNoID8gZGVjb2RlVVJJQ29tcG9uZW50KG1hdGNoWzNdKSA6IG51bGwpO1xuICAgICAgfSxcblxuICAgICAgcmVtb3ZlOiBmdW5jdGlvbiByZW1vdmUobmFtZSkge1xuICAgICAgICB0aGlzLndyaXRlKG5hbWUsICcnLCBEYXRlLm5vdygpIC0gODY0MDAwMDApO1xuICAgICAgfVxuICAgIH07XG4gIH0pKCkgOlxuXG4gIC8vIE5vbiBzdGFuZGFyZCBicm93c2VyIGVudiAod2ViIHdvcmtlcnMsIHJlYWN0LW5hdGl2ZSkgbGFjayBuZWVkZWQgc3VwcG9ydC5cbiAgKGZ1bmN0aW9uIG5vblN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgd3JpdGU6IGZ1bmN0aW9uIHdyaXRlKCkge30sXG4gICAgICByZWFkOiBmdW5jdGlvbiByZWFkKCkgeyByZXR1cm4gbnVsbDsgfSxcbiAgICAgIHJlbW92ZTogZnVuY3Rpb24gcmVtb3ZlKCkge31cbiAgICB9O1xuICB9KSgpXG4pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG4vKipcbiAqIERldGVybWluZXMgd2hldGhlciB0aGUgc3BlY2lmaWVkIFVSTCBpcyBhYnNvbHV0ZVxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB1cmwgVGhlIFVSTCB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB0aGUgc3BlY2lmaWVkIFVSTCBpcyBhYnNvbHV0ZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gaXNBYnNvbHV0ZVVSTCh1cmwpIHtcbiAgLy8gQSBVUkwgaXMgY29uc2lkZXJlZCBhYnNvbHV0ZSBpZiBpdCBiZWdpbnMgd2l0aCBcIjxzY2hlbWU+Oi8vXCIgb3IgXCIvL1wiIChwcm90b2NvbC1yZWxhdGl2ZSBVUkwpLlxuICAvLyBSRkMgMzk4NiBkZWZpbmVzIHNjaGVtZSBuYW1lIGFzIGEgc2VxdWVuY2Ugb2YgY2hhcmFjdGVycyBiZWdpbm5pbmcgd2l0aCBhIGxldHRlciBhbmQgZm9sbG93ZWRcbiAgLy8gYnkgYW55IGNvbWJpbmF0aW9uIG9mIGxldHRlcnMsIGRpZ2l0cywgcGx1cywgcGVyaW9kLCBvciBoeXBoZW4uXG4gIHJldHVybiAvXihbYS16XVthLXpcXGRcXCtcXC1cXC5dKjopP1xcL1xcLy9pLnRlc3QodXJsKTtcbn07XG4iLCIndXNlIHN0cmljdCc7XG5cbnZhciB1dGlscyA9IHJlcXVpcmUoJy4vLi4vdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSAoXG4gIHV0aWxzLmlzU3RhbmRhcmRCcm93c2VyRW52KCkgP1xuXG4gIC8vIFN0YW5kYXJkIGJyb3dzZXIgZW52cyBoYXZlIGZ1bGwgc3VwcG9ydCBvZiB0aGUgQVBJcyBuZWVkZWQgdG8gdGVzdFxuICAvLyB3aGV0aGVyIHRoZSByZXF1ZXN0IFVSTCBpcyBvZiB0aGUgc2FtZSBvcmlnaW4gYXMgY3VycmVudCBsb2NhdGlvbi5cbiAgKGZ1bmN0aW9uIHN0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgICB2YXIgbXNpZSA9IC8obXNpZXx0cmlkZW50KS9pLnRlc3QobmF2aWdhdG9yLnVzZXJBZ2VudCk7XG4gICAgdmFyIHVybFBhcnNpbmdOb2RlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICAgIHZhciBvcmlnaW5VUkw7XG5cbiAgICAvKipcbiAgICAqIFBhcnNlIGEgVVJMIHRvIGRpc2NvdmVyIGl0J3MgY29tcG9uZW50c1xuICAgICpcbiAgICAqIEBwYXJhbSB7U3RyaW5nfSB1cmwgVGhlIFVSTCB0byBiZSBwYXJzZWRcbiAgICAqIEByZXR1cm5zIHtPYmplY3R9XG4gICAgKi9cbiAgICBmdW5jdGlvbiByZXNvbHZlVVJMKHVybCkge1xuICAgICAgdmFyIGhyZWYgPSB1cmw7XG5cbiAgICAgIGlmIChtc2llKSB7XG4gICAgICAgIC8vIElFIG5lZWRzIGF0dHJpYnV0ZSBzZXQgdHdpY2UgdG8gbm9ybWFsaXplIHByb3BlcnRpZXNcbiAgICAgICAgdXJsUGFyc2luZ05vZGUuc2V0QXR0cmlidXRlKCdocmVmJywgaHJlZik7XG4gICAgICAgIGhyZWYgPSB1cmxQYXJzaW5nTm9kZS5ocmVmO1xuICAgICAgfVxuXG4gICAgICB1cmxQYXJzaW5nTm9kZS5zZXRBdHRyaWJ1dGUoJ2hyZWYnLCBocmVmKTtcblxuICAgICAgLy8gdXJsUGFyc2luZ05vZGUgcHJvdmlkZXMgdGhlIFVybFV0aWxzIGludGVyZmFjZSAtIGh0dHA6Ly91cmwuc3BlYy53aGF0d2cub3JnLyN1cmx1dGlsc1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaHJlZjogdXJsUGFyc2luZ05vZGUuaHJlZixcbiAgICAgICAgcHJvdG9jb2w6IHVybFBhcnNpbmdOb2RlLnByb3RvY29sID8gdXJsUGFyc2luZ05vZGUucHJvdG9jb2wucmVwbGFjZSgvOiQvLCAnJykgOiAnJyxcbiAgICAgICAgaG9zdDogdXJsUGFyc2luZ05vZGUuaG9zdCxcbiAgICAgICAgc2VhcmNoOiB1cmxQYXJzaW5nTm9kZS5zZWFyY2ggPyB1cmxQYXJzaW5nTm9kZS5zZWFyY2gucmVwbGFjZSgvXlxcPy8sICcnKSA6ICcnLFxuICAgICAgICBoYXNoOiB1cmxQYXJzaW5nTm9kZS5oYXNoID8gdXJsUGFyc2luZ05vZGUuaGFzaC5yZXBsYWNlKC9eIy8sICcnKSA6ICcnLFxuICAgICAgICBob3N0bmFtZTogdXJsUGFyc2luZ05vZGUuaG9zdG5hbWUsXG4gICAgICAgIHBvcnQ6IHVybFBhcnNpbmdOb2RlLnBvcnQsXG4gICAgICAgIHBhdGhuYW1lOiAodXJsUGFyc2luZ05vZGUucGF0aG5hbWUuY2hhckF0KDApID09PSAnLycpID9cbiAgICAgICAgICAgICAgICAgIHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lIDpcbiAgICAgICAgICAgICAgICAgICcvJyArIHVybFBhcnNpbmdOb2RlLnBhdGhuYW1lXG4gICAgICB9O1xuICAgIH1cblxuICAgIG9yaWdpblVSTCA9IHJlc29sdmVVUkwod2luZG93LmxvY2F0aW9uLmhyZWYpO1xuXG4gICAgLyoqXG4gICAgKiBEZXRlcm1pbmUgaWYgYSBVUkwgc2hhcmVzIHRoZSBzYW1lIG9yaWdpbiBhcyB0aGUgY3VycmVudCBsb2NhdGlvblxuICAgICpcbiAgICAqIEBwYXJhbSB7U3RyaW5nfSByZXF1ZXN0VVJMIFRoZSBVUkwgdG8gdGVzdFxuICAgICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgVVJMIHNoYXJlcyB0aGUgc2FtZSBvcmlnaW4sIG90aGVyd2lzZSBmYWxzZVxuICAgICovXG4gICAgcmV0dXJuIGZ1bmN0aW9uIGlzVVJMU2FtZU9yaWdpbihyZXF1ZXN0VVJMKSB7XG4gICAgICB2YXIgcGFyc2VkID0gKHV0aWxzLmlzU3RyaW5nKHJlcXVlc3RVUkwpKSA/IHJlc29sdmVVUkwocmVxdWVzdFVSTCkgOiByZXF1ZXN0VVJMO1xuICAgICAgcmV0dXJuIChwYXJzZWQucHJvdG9jb2wgPT09IG9yaWdpblVSTC5wcm90b2NvbCAmJlxuICAgICAgICAgICAgcGFyc2VkLmhvc3QgPT09IG9yaWdpblVSTC5ob3N0KTtcbiAgICB9O1xuICB9KSgpIDpcblxuICAvLyBOb24gc3RhbmRhcmQgYnJvd3NlciBlbnZzICh3ZWIgd29ya2VycywgcmVhY3QtbmF0aXZlKSBsYWNrIG5lZWRlZCBzdXBwb3J0LlxuICAoZnVuY3Rpb24gbm9uU3RhbmRhcmRCcm93c2VyRW52KCkge1xuICAgIHJldHVybiBmdW5jdGlvbiBpc1VSTFNhbWVPcmlnaW4oKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuICB9KSgpXG4pO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLi91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIG5vcm1hbGl6ZUhlYWRlck5hbWUoaGVhZGVycywgbm9ybWFsaXplZE5hbWUpIHtcbiAgdXRpbHMuZm9yRWFjaChoZWFkZXJzLCBmdW5jdGlvbiBwcm9jZXNzSGVhZGVyKHZhbHVlLCBuYW1lKSB7XG4gICAgaWYgKG5hbWUgIT09IG5vcm1hbGl6ZWROYW1lICYmIG5hbWUudG9VcHBlckNhc2UoKSA9PT0gbm9ybWFsaXplZE5hbWUudG9VcHBlckNhc2UoKSkge1xuICAgICAgaGVhZGVyc1tub3JtYWxpemVkTmFtZV0gPSB2YWx1ZTtcbiAgICAgIGRlbGV0ZSBoZWFkZXJzW25hbWVdO1xuICAgIH1cbiAgfSk7XG59O1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKCcuLy4uL3V0aWxzJyk7XG5cbi8vIEhlYWRlcnMgd2hvc2UgZHVwbGljYXRlcyBhcmUgaWdub3JlZCBieSBub2RlXG4vLyBjLmYuIGh0dHBzOi8vbm9kZWpzLm9yZy9hcGkvaHR0cC5odG1sI2h0dHBfbWVzc2FnZV9oZWFkZXJzXG52YXIgaWdub3JlRHVwbGljYXRlT2YgPSBbXG4gICdhZ2UnLCAnYXV0aG9yaXphdGlvbicsICdjb250ZW50LWxlbmd0aCcsICdjb250ZW50LXR5cGUnLCAnZXRhZycsXG4gICdleHBpcmVzJywgJ2Zyb20nLCAnaG9zdCcsICdpZi1tb2RpZmllZC1zaW5jZScsICdpZi11bm1vZGlmaWVkLXNpbmNlJyxcbiAgJ2xhc3QtbW9kaWZpZWQnLCAnbG9jYXRpb24nLCAnbWF4LWZvcndhcmRzJywgJ3Byb3h5LWF1dGhvcml6YXRpb24nLFxuICAncmVmZXJlcicsICdyZXRyeS1hZnRlcicsICd1c2VyLWFnZW50J1xuXTtcblxuLyoqXG4gKiBQYXJzZSBoZWFkZXJzIGludG8gYW4gb2JqZWN0XG4gKlxuICogYGBgXG4gKiBEYXRlOiBXZWQsIDI3IEF1ZyAyMDE0IDA4OjU4OjQ5IEdNVFxuICogQ29udGVudC1UeXBlOiBhcHBsaWNhdGlvbi9qc29uXG4gKiBDb25uZWN0aW9uOiBrZWVwLWFsaXZlXG4gKiBUcmFuc2Zlci1FbmNvZGluZzogY2h1bmtlZFxuICogYGBgXG4gKlxuICogQHBhcmFtIHtTdHJpbmd9IGhlYWRlcnMgSGVhZGVycyBuZWVkaW5nIHRvIGJlIHBhcnNlZFxuICogQHJldHVybnMge09iamVjdH0gSGVhZGVycyBwYXJzZWQgaW50byBhbiBvYmplY3RcbiAqL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiBwYXJzZUhlYWRlcnMoaGVhZGVycykge1xuICB2YXIgcGFyc2VkID0ge307XG4gIHZhciBrZXk7XG4gIHZhciB2YWw7XG4gIHZhciBpO1xuXG4gIGlmICghaGVhZGVycykgeyByZXR1cm4gcGFyc2VkOyB9XG5cbiAgdXRpbHMuZm9yRWFjaChoZWFkZXJzLnNwbGl0KCdcXG4nKSwgZnVuY3Rpb24gcGFyc2VyKGxpbmUpIHtcbiAgICBpID0gbGluZS5pbmRleE9mKCc6Jyk7XG4gICAga2V5ID0gdXRpbHMudHJpbShsaW5lLnN1YnN0cigwLCBpKSkudG9Mb3dlckNhc2UoKTtcbiAgICB2YWwgPSB1dGlscy50cmltKGxpbmUuc3Vic3RyKGkgKyAxKSk7XG5cbiAgICBpZiAoa2V5KSB7XG4gICAgICBpZiAocGFyc2VkW2tleV0gJiYgaWdub3JlRHVwbGljYXRlT2YuaW5kZXhPZihrZXkpID49IDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKGtleSA9PT0gJ3NldC1jb29raWUnKSB7XG4gICAgICAgIHBhcnNlZFtrZXldID0gKHBhcnNlZFtrZXldID8gcGFyc2VkW2tleV0gOiBbXSkuY29uY2F0KFt2YWxdKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhcnNlZFtrZXldID0gcGFyc2VkW2tleV0gPyBwYXJzZWRba2V5XSArICcsICcgKyB2YWwgOiB2YWw7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gcGFyc2VkO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxuLyoqXG4gKiBTeW50YWN0aWMgc3VnYXIgZm9yIGludm9raW5nIGEgZnVuY3Rpb24gYW5kIGV4cGFuZGluZyBhbiBhcnJheSBmb3IgYXJndW1lbnRzLlxuICpcbiAqIENvbW1vbiB1c2UgY2FzZSB3b3VsZCBiZSB0byB1c2UgYEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseWAuXG4gKlxuICogIGBgYGpzXG4gKiAgZnVuY3Rpb24gZih4LCB5LCB6KSB7fVxuICogIHZhciBhcmdzID0gWzEsIDIsIDNdO1xuICogIGYuYXBwbHkobnVsbCwgYXJncyk7XG4gKiAgYGBgXG4gKlxuICogV2l0aCBgc3ByZWFkYCB0aGlzIGV4YW1wbGUgY2FuIGJlIHJlLXdyaXR0ZW4uXG4gKlxuICogIGBgYGpzXG4gKiAgc3ByZWFkKGZ1bmN0aW9uKHgsIHksIHopIHt9KShbMSwgMiwgM10pO1xuICogIGBgYFxuICpcbiAqIEBwYXJhbSB7RnVuY3Rpb259IGNhbGxiYWNrXG4gKiBAcmV0dXJucyB7RnVuY3Rpb259XG4gKi9cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gc3ByZWFkKGNhbGxiYWNrKSB7XG4gIHJldHVybiBmdW5jdGlvbiB3cmFwKGFycikge1xuICAgIHJldHVybiBjYWxsYmFjay5hcHBseShudWxsLCBhcnIpO1xuICB9O1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGJpbmQgPSByZXF1aXJlKCcuL2hlbHBlcnMvYmluZCcpO1xudmFyIGlzQnVmZmVyID0gcmVxdWlyZSgnaXMtYnVmZmVyJyk7XG5cbi8qZ2xvYmFsIHRvU3RyaW5nOnRydWUqL1xuXG4vLyB1dGlscyBpcyBhIGxpYnJhcnkgb2YgZ2VuZXJpYyBoZWxwZXIgZnVuY3Rpb25zIG5vbi1zcGVjaWZpYyB0byBheGlvc1xuXG52YXIgdG9TdHJpbmcgPSBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nO1xuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIEFycmF5XG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gQXJyYXksIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5KHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBBcnJheV0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIEFycmF5QnVmZmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5QnVmZmVyKHZhbCkge1xuICByZXR1cm4gdG9TdHJpbmcuY2FsbCh2YWwpID09PSAnW29iamVjdCBBcnJheUJ1ZmZlcl0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRm9ybURhdGFcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhbiBGb3JtRGF0YSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRm9ybURhdGEodmFsKSB7XG4gIHJldHVybiAodHlwZW9mIEZvcm1EYXRhICE9PSAndW5kZWZpbmVkJykgJiYgKHZhbCBpbnN0YW5jZW9mIEZvcm1EYXRhKTtcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIHZpZXcgb24gYW4gQXJyYXlCdWZmZXJcbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIHZpZXcgb24gYW4gQXJyYXlCdWZmZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc0FycmF5QnVmZmVyVmlldyh2YWwpIHtcbiAgdmFyIHJlc3VsdDtcbiAgaWYgKCh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnKSAmJiAoQXJyYXlCdWZmZXIuaXNWaWV3KSkge1xuICAgIHJlc3VsdCA9IEFycmF5QnVmZmVyLmlzVmlldyh2YWwpO1xuICB9IGVsc2Uge1xuICAgIHJlc3VsdCA9ICh2YWwpICYmICh2YWwuYnVmZmVyKSAmJiAodmFsLmJ1ZmZlciBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgU3RyaW5nXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBTdHJpbmcsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1N0cmluZyh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdzdHJpbmcnO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgTnVtYmVyXG4gKlxuICogQHBhcmFtIHtPYmplY3R9IHZhbCBUaGUgdmFsdWUgdG8gdGVzdFxuICogQHJldHVybnMge2Jvb2xlYW59IFRydWUgaWYgdmFsdWUgaXMgYSBOdW1iZXIsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc051bWJlcih2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICdudW1iZXInO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIHVuZGVmaW5lZFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHRoZSB2YWx1ZSBpcyB1bmRlZmluZWQsIG90aGVyd2lzZSBmYWxzZVxuICovXG5mdW5jdGlvbiBpc1VuZGVmaW5lZCh2YWwpIHtcbiAgcmV0dXJuIHR5cGVvZiB2YWwgPT09ICd1bmRlZmluZWQnO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGFuIE9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGFuIE9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0KHZhbCkge1xuICByZXR1cm4gdmFsICE9PSBudWxsICYmIHR5cGVvZiB2YWwgPT09ICdvYmplY3QnO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRGF0ZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRGF0ZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRGF0ZSh2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgRGF0ZV0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRmlsZVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgRmlsZSwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzRmlsZSh2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgRmlsZV0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgQmxvYlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgQmxvYiwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzQmxvYih2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgQmxvYl0nO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgRnVuY3Rpb25cbiAqXG4gKiBAcGFyYW0ge09iamVjdH0gdmFsIFRoZSB2YWx1ZSB0byB0ZXN0XG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gVHJ1ZSBpZiB2YWx1ZSBpcyBhIEZ1bmN0aW9uLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNGdW5jdGlvbih2YWwpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwodmFsKSA9PT0gJ1tvYmplY3QgRnVuY3Rpb25dJztcbn1cblxuLyoqXG4gKiBEZXRlcm1pbmUgaWYgYSB2YWx1ZSBpcyBhIFN0cmVhbVxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgU3RyZWFtLCBvdGhlcndpc2UgZmFsc2VcbiAqL1xuZnVuY3Rpb24gaXNTdHJlYW0odmFsKSB7XG4gIHJldHVybiBpc09iamVjdCh2YWwpICYmIGlzRnVuY3Rpb24odmFsLnBpcGUpO1xufVxuXG4vKipcbiAqIERldGVybWluZSBpZiBhIHZhbHVlIGlzIGEgVVJMU2VhcmNoUGFyYW1zIG9iamVjdFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSB2YWwgVGhlIHZhbHVlIHRvIHRlc3RcbiAqIEByZXR1cm5zIHtib29sZWFufSBUcnVlIGlmIHZhbHVlIGlzIGEgVVJMU2VhcmNoUGFyYW1zIG9iamVjdCwgb3RoZXJ3aXNlIGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzVVJMU2VhcmNoUGFyYW1zKHZhbCkge1xuICByZXR1cm4gdHlwZW9mIFVSTFNlYXJjaFBhcmFtcyAhPT0gJ3VuZGVmaW5lZCcgJiYgdmFsIGluc3RhbmNlb2YgVVJMU2VhcmNoUGFyYW1zO1xufVxuXG4vKipcbiAqIFRyaW0gZXhjZXNzIHdoaXRlc3BhY2Ugb2ZmIHRoZSBiZWdpbm5pbmcgYW5kIGVuZCBvZiBhIHN0cmluZ1xuICpcbiAqIEBwYXJhbSB7U3RyaW5nfSBzdHIgVGhlIFN0cmluZyB0byB0cmltXG4gKiBAcmV0dXJucyB7U3RyaW5nfSBUaGUgU3RyaW5nIGZyZWVkIG9mIGV4Y2VzcyB3aGl0ZXNwYWNlXG4gKi9cbmZ1bmN0aW9uIHRyaW0oc3RyKSB7XG4gIHJldHVybiBzdHIucmVwbGFjZSgvXlxccyovLCAnJykucmVwbGFjZSgvXFxzKiQvLCAnJyk7XG59XG5cbi8qKlxuICogRGV0ZXJtaW5lIGlmIHdlJ3JlIHJ1bm5pbmcgaW4gYSBzdGFuZGFyZCBicm93c2VyIGVudmlyb25tZW50XG4gKlxuICogVGhpcyBhbGxvd3MgYXhpb3MgdG8gcnVuIGluIGEgd2ViIHdvcmtlciwgYW5kIHJlYWN0LW5hdGl2ZS5cbiAqIEJvdGggZW52aXJvbm1lbnRzIHN1cHBvcnQgWE1MSHR0cFJlcXVlc3QsIGJ1dCBub3QgZnVsbHkgc3RhbmRhcmQgZ2xvYmFscy5cbiAqXG4gKiB3ZWIgd29ya2VyczpcbiAqICB0eXBlb2Ygd2luZG93IC0+IHVuZGVmaW5lZFxuICogIHR5cGVvZiBkb2N1bWVudCAtPiB1bmRlZmluZWRcbiAqXG4gKiByZWFjdC1uYXRpdmU6XG4gKiAgbmF2aWdhdG9yLnByb2R1Y3QgLT4gJ1JlYWN0TmF0aXZlJ1xuICovXG5mdW5jdGlvbiBpc1N0YW5kYXJkQnJvd3NlckVudigpIHtcbiAgaWYgKHR5cGVvZiBuYXZpZ2F0b3IgIT09ICd1bmRlZmluZWQnICYmIG5hdmlnYXRvci5wcm9kdWN0ID09PSAnUmVhY3ROYXRpdmUnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIHJldHVybiAoXG4gICAgdHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcgJiZcbiAgICB0eXBlb2YgZG9jdW1lbnQgIT09ICd1bmRlZmluZWQnXG4gICk7XG59XG5cbi8qKlxuICogSXRlcmF0ZSBvdmVyIGFuIEFycmF5IG9yIGFuIE9iamVjdCBpbnZva2luZyBhIGZ1bmN0aW9uIGZvciBlYWNoIGl0ZW0uXG4gKlxuICogSWYgYG9iamAgaXMgYW4gQXJyYXkgY2FsbGJhY2sgd2lsbCBiZSBjYWxsZWQgcGFzc2luZ1xuICogdGhlIHZhbHVlLCBpbmRleCwgYW5kIGNvbXBsZXRlIGFycmF5IGZvciBlYWNoIGl0ZW0uXG4gKlxuICogSWYgJ29iaicgaXMgYW4gT2JqZWN0IGNhbGxiYWNrIHdpbGwgYmUgY2FsbGVkIHBhc3NpbmdcbiAqIHRoZSB2YWx1ZSwga2V5LCBhbmQgY29tcGxldGUgb2JqZWN0IGZvciBlYWNoIHByb3BlcnR5LlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fEFycmF5fSBvYmogVGhlIG9iamVjdCB0byBpdGVyYXRlXG4gKiBAcGFyYW0ge0Z1bmN0aW9ufSBmbiBUaGUgY2FsbGJhY2sgdG8gaW52b2tlIGZvciBlYWNoIGl0ZW1cbiAqL1xuZnVuY3Rpb24gZm9yRWFjaChvYmosIGZuKSB7XG4gIC8vIERvbid0IGJvdGhlciBpZiBubyB2YWx1ZSBwcm92aWRlZFxuICBpZiAob2JqID09PSBudWxsIHx8IHR5cGVvZiBvYmogPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gRm9yY2UgYW4gYXJyYXkgaWYgbm90IGFscmVhZHkgc29tZXRoaW5nIGl0ZXJhYmxlXG4gIGlmICh0eXBlb2Ygb2JqICE9PSAnb2JqZWN0Jykge1xuICAgIC8qZXNsaW50IG5vLXBhcmFtLXJlYXNzaWduOjAqL1xuICAgIG9iaiA9IFtvYmpdO1xuICB9XG5cbiAgaWYgKGlzQXJyYXkob2JqKSkge1xuICAgIC8vIEl0ZXJhdGUgb3ZlciBhcnJheSB2YWx1ZXNcbiAgICBmb3IgKHZhciBpID0gMCwgbCA9IG9iai5sZW5ndGg7IGkgPCBsOyBpKyspIHtcbiAgICAgIGZuLmNhbGwobnVsbCwgb2JqW2ldLCBpLCBvYmopO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICAvLyBJdGVyYXRlIG92ZXIgb2JqZWN0IGtleXNcbiAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwga2V5KSkge1xuICAgICAgICBmbi5jYWxsKG51bGwsIG9ialtrZXldLCBrZXksIG9iaik7XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi8qKlxuICogQWNjZXB0cyB2YXJhcmdzIGV4cGVjdGluZyBlYWNoIGFyZ3VtZW50IHRvIGJlIGFuIG9iamVjdCwgdGhlblxuICogaW1tdXRhYmx5IG1lcmdlcyB0aGUgcHJvcGVydGllcyBvZiBlYWNoIG9iamVjdCBhbmQgcmV0dXJucyByZXN1bHQuXG4gKlxuICogV2hlbiBtdWx0aXBsZSBvYmplY3RzIGNvbnRhaW4gdGhlIHNhbWUga2V5IHRoZSBsYXRlciBvYmplY3QgaW5cbiAqIHRoZSBhcmd1bWVudHMgbGlzdCB3aWxsIHRha2UgcHJlY2VkZW5jZS5cbiAqXG4gKiBFeGFtcGxlOlxuICpcbiAqIGBgYGpzXG4gKiB2YXIgcmVzdWx0ID0gbWVyZ2Uoe2ZvbzogMTIzfSwge2ZvbzogNDU2fSk7XG4gKiBjb25zb2xlLmxvZyhyZXN1bHQuZm9vKTsgLy8gb3V0cHV0cyA0NTZcbiAqIGBgYFxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBvYmoxIE9iamVjdCB0byBtZXJnZVxuICogQHJldHVybnMge09iamVjdH0gUmVzdWx0IG9mIGFsbCBtZXJnZSBwcm9wZXJ0aWVzXG4gKi9cbmZ1bmN0aW9uIG1lcmdlKC8qIG9iajEsIG9iajIsIG9iajMsIC4uLiAqLykge1xuICB2YXIgcmVzdWx0ID0ge307XG4gIGZ1bmN0aW9uIGFzc2lnblZhbHVlKHZhbCwga2V5KSB7XG4gICAgaWYgKHR5cGVvZiByZXN1bHRba2V5XSA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIHZhbCA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHJlc3VsdFtrZXldID0gbWVyZ2UocmVzdWx0W2tleV0sIHZhbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdFtrZXldID0gdmFsO1xuICAgIH1cbiAgfVxuXG4gIGZvciAodmFyIGkgPSAwLCBsID0gYXJndW1lbnRzLmxlbmd0aDsgaSA8IGw7IGkrKykge1xuICAgIGZvckVhY2goYXJndW1lbnRzW2ldLCBhc3NpZ25WYWx1ZSk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBFeHRlbmRzIG9iamVjdCBhIGJ5IG11dGFibHkgYWRkaW5nIHRvIGl0IHRoZSBwcm9wZXJ0aWVzIG9mIG9iamVjdCBiLlxuICpcbiAqIEBwYXJhbSB7T2JqZWN0fSBhIFRoZSBvYmplY3QgdG8gYmUgZXh0ZW5kZWRcbiAqIEBwYXJhbSB7T2JqZWN0fSBiIFRoZSBvYmplY3QgdG8gY29weSBwcm9wZXJ0aWVzIGZyb21cbiAqIEBwYXJhbSB7T2JqZWN0fSB0aGlzQXJnIFRoZSBvYmplY3QgdG8gYmluZCBmdW5jdGlvbiB0b1xuICogQHJldHVybiB7T2JqZWN0fSBUaGUgcmVzdWx0aW5nIHZhbHVlIG9mIG9iamVjdCBhXG4gKi9cbmZ1bmN0aW9uIGV4dGVuZChhLCBiLCB0aGlzQXJnKSB7XG4gIGZvckVhY2goYiwgZnVuY3Rpb24gYXNzaWduVmFsdWUodmFsLCBrZXkpIHtcbiAgICBpZiAodGhpc0FyZyAmJiB0eXBlb2YgdmFsID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBhW2tleV0gPSBiaW5kKHZhbCwgdGhpc0FyZyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFba2V5XSA9IHZhbDtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gYTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gIGlzQXJyYXk6IGlzQXJyYXksXG4gIGlzQXJyYXlCdWZmZXI6IGlzQXJyYXlCdWZmZXIsXG4gIGlzQnVmZmVyOiBpc0J1ZmZlcixcbiAgaXNGb3JtRGF0YTogaXNGb3JtRGF0YSxcbiAgaXNBcnJheUJ1ZmZlclZpZXc6IGlzQXJyYXlCdWZmZXJWaWV3LFxuICBpc1N0cmluZzogaXNTdHJpbmcsXG4gIGlzTnVtYmVyOiBpc051bWJlcixcbiAgaXNPYmplY3Q6IGlzT2JqZWN0LFxuICBpc1VuZGVmaW5lZDogaXNVbmRlZmluZWQsXG4gIGlzRGF0ZTogaXNEYXRlLFxuICBpc0ZpbGU6IGlzRmlsZSxcbiAgaXNCbG9iOiBpc0Jsb2IsXG4gIGlzRnVuY3Rpb246IGlzRnVuY3Rpb24sXG4gIGlzU3RyZWFtOiBpc1N0cmVhbSxcbiAgaXNVUkxTZWFyY2hQYXJhbXM6IGlzVVJMU2VhcmNoUGFyYW1zLFxuICBpc1N0YW5kYXJkQnJvd3NlckVudjogaXNTdGFuZGFyZEJyb3dzZXJFbnYsXG4gIGZvckVhY2g6IGZvckVhY2gsXG4gIG1lcmdlOiBtZXJnZSxcbiAgZXh0ZW5kOiBleHRlbmQsXG4gIHRyaW06IHRyaW1cbn07XG4iLCI8dGVtcGxhdGU+XG4gICAgPGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cbiAgICAgICAgPGlucHV0XG4gICAgICAgICAgICA6aWQ9XCJmaWVsZElkXCJcbiAgICAgICAgICAgIDp0eXBlPVwidHlwZVwiXG4gICAgICAgICAgICA6dmFsdWU9XCJ2YWx1ZVwiXG4gICAgICAgICAgICA6Y2xhc3M9XCJ7ICdpcy1pbnZhbGlkJzogZXJyb3JzIH1cIlxuICAgICAgICAgICAgOm5hbWU9XCJuYW1lXCJcbiAgICAgICAgICAgIGNsYXNzPVwiZm9ybS1jb250cm9sIGZvcm0tY29udHJvbC1sZ1wiXG4gICAgICAgICAgICBAaW5wdXQ9XCJoYW5kbGVJbnB1dFwiXG4gICAgICAgID5cblxuICAgICAgICA8ZGl2XG4gICAgICAgICAgICB2LWlmPVwiZXJyb3JzXCJcbiAgICAgICAgICAgIGNsYXNzPVwiaW52YWxpZC1mZWVkYmFja1wiXG4gICAgICAgID5cbiAgICAgICAgICAgIHt7IGVycm9ycyB9fVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGxhYmVsXG4gICAgICAgICAgICB2LWlmPVwibGFiZWxcIlxuICAgICAgICAgICAgOmZvcj1cImZpZWxkSWRcIlxuICAgICAgICAgICAgY2xhc3M9XCJmb3JtLWdyb3VwLWxhYmVsXCJcbiAgICAgICAgPnt7IGxhYmVsIH19PC9sYWJlbD5cbiAgICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzY3JpcHQ+XG4gICAgZXhwb3J0IGRlZmF1bHQge1xuICAgICAgICBwcm9wczoge1xuICAgICAgICAgICAgaWQ6IHtcbiAgICAgICAgICAgICAgICB0eXBlOiBTdHJpbmcsXG4gICAgICAgICAgICAgICAgZGVmYXVsdDogJydcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBsYWJlbDoge1xuICAgICAgICAgICAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgICAgICAgICAgICBkZWZhdWx0OiBudWxsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbmFtZToge1xuICAgICAgICAgICAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgICAgICAgICAgICBkZWZhdWx0OiAnJ1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHBsYWNlaG9sZGVyOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6ICcnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdHlwZToge1xuICAgICAgICAgICAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgICAgICAgICAgICBkZWZhdWx0OiAndGV4dCdcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB2YWx1ZToge1xuICAgICAgICAgICAgICAgIHJlcXVpcmVkOiB0cnVlLFxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6ICcnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZXJyb3JzOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6IG51bGxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgY29tcHV0ZWQ6IHtcbiAgICAgICAgICAgIGZpZWxkSWQoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHByb3BzLmlkIHx8IHRoaXMuJHByb3BzLm5hbWU7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIG1ldGhvZHM6IHtcbiAgICAgICAgICAgIGhhbmRsZUlucHV0KGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRlbWl0KCdpbnB1dCcsIGUudGFyZ2V0LnZhbHVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG48L3NjcmlwdD5cbiIsIjx0ZW1wbGF0ZT5cbiAgICA8c3ZnXG4gICAgICAgIDpjbGFzcz1cImNsYXNzTmFtZVwiXG4gICAgICAgIDp3aWR0aD1cIndpZHRoXCJcbiAgICAgICAgOmhlaWdodD1cImhlaWdodFwiXG4gICAgICAgIDp2aWV3LWJveC5jYW1lbD1cInZpZXdCb3hcIlxuICAgICAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcbiAgICAgICAgQGNsaWNrPVwiaGFuZGxlQ2xpY2tcIlxuICAgICAgICB2LWh0bWw9XCJjb250ZW50XCJcbiAgICAvPlxuPC90ZW1wbGF0ZT5cblxuPHNjcmlwdD5cbiAgICBleHBvcnQgZGVmYXVsdCB7XG4gICAgICAgIHByb3BzOiB7XG4gICAgICAgICAgICBpY29uOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogU3RyaW5nLFxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6IG51bGxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBkYXRhOiB7XG4gICAgICAgICAgICAgICAgdHlwZTogT2JqZWN0LFxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6IG51bGxcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgY29tcHV0ZWQ6IHtcbiAgICAgICAgICAgIGljb25EYXRhKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLiRwcm9wcy5kYXRhIHx8IHRoaXMuJGhlbHBlcnMuaWNvbih0aGlzLiRwcm9wcy5pY29uKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGNsYXNzTmFtZSgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgICAgICBbdGhpcy5pY29uRGF0YS5hdHRyaWJ1dGVzLmNsYXNzXTogdHJ1ZVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgd2lkdGgoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaWNvbkRhdGEuYXR0cmlidXRlcy53aWR0aDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBoZWlnaHQoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaWNvbkRhdGEuYXR0cmlidXRlcy5oZWlnaHQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdmlld0JveCgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pY29uRGF0YS5hdHRyaWJ1dGVzLnZpZXdCb3g7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29udGVudCgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5pY29uRGF0YS5jb250ZW50O1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBtZXRob2RzOiB7XG4gICAgICAgICAgICBoYW5kbGVDbGljaygkZXZlbnQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRlbWl0KCdjbGljaycsICRldmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuPC9zY3JpcHQ+XG4iLCJpbXBvcnQgaXNQbGFpbk9iamVjdCBmcm9tICdsb2Rhc2guaXNwbGFpbm9iamVjdCc7XG5cbmZ1bmN0aW9uIGZvckVhY2hPYmplY3Qob2JqLCBmbiwgcGF0aCkge1xuICAgIGZvciAodmFyIGtleSBpbiBvYmopIHtcbiAgICAgICAgdmFyIGRlZXBQYXRoID0gcGF0aCA/IHBhdGggKyAnLicgKyBrZXkgOiBrZXk7XG5cbiAgICAgICAgLy8gTm90ZSB0aGF0IHdlIGFsd2F5cyB1c2Ugb2JqW2tleV0gYmVjYXVzZSBpdCBtaWdodCBiZSBtdXRhdGVkIGJ5IGZvckVhY2hcbiAgICAgICAgZm4uY2FsbChvYmosIG9ialtrZXldLCBrZXksIG9iaiwgZGVlcFBhdGgpO1xuXG4gICAgICAgIGZvckVhY2gob2JqW2tleV0sIGZuLCBkZWVwUGF0aCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBmb3JFYWNoQXJyYXkoYXJyYXksIGZuLCBwYXRoKSB7XG4gICAgYXJyYXkuZm9yRWFjaChmdW5jdGlvbiAodmFsdWUsIGluZGV4LCBhcnIpIHtcbiAgICAgICAgdmFyIGRlZXBQYXRoID0gcGF0aCArICdbJyArIGluZGV4ICsgJ10nO1xuXG4gICAgICAgIGZuLmNhbGwoYXJyLCB2YWx1ZSwgaW5kZXgsIGFyciwgZGVlcFBhdGgpO1xuXG4gICAgICAgIC8vIE5vdGUgdGhhdCB3ZSB1c2UgYXJyW2luZGV4XSBiZWNhdXNlIGl0IG1pZ2h0IGJlIG11dGF0ZWQgYnkgZm9yRWFjaFxuICAgICAgICBmb3JFYWNoKGFycltpbmRleF0sIGZuLCBkZWVwUGF0aCk7XG4gICAgfSk7XG59XG5cbmZ1bmN0aW9uIGZvckVhY2godmFsdWUsIGZuLCBwYXRoKSB7XG4gICAgcGF0aCA9IHBhdGggfHwgJyc7XG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheSh2YWx1ZSkpIHtcbiAgICAgICAgZm9yRWFjaEFycmF5KHZhbHVlLCBmbiwgcGF0aCk7XG4gICAgfSBlbHNlIGlmIChpc1BsYWluT2JqZWN0KHZhbHVlKSkge1xuICAgICAgICBmb3JFYWNoT2JqZWN0KHZhbHVlLCBmbiwgcGF0aCk7XG4gICAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBmb3JFYWNoOyIsIi8qIVxuICogRGV0ZXJtaW5lIGlmIGFuIG9iamVjdCBpcyBhIEJ1ZmZlclxuICpcbiAqIEBhdXRob3IgICBGZXJvc3MgQWJvdWtoYWRpamVoIDxodHRwczovL2Zlcm9zcy5vcmc+XG4gKiBAbGljZW5zZSAgTUlUXG4gKi9cblxuLy8gVGhlIF9pc0J1ZmZlciBjaGVjayBpcyBmb3IgU2FmYXJpIDUtNyBzdXBwb3J0LCBiZWNhdXNlIGl0J3MgbWlzc2luZ1xuLy8gT2JqZWN0LnByb3RvdHlwZS5jb25zdHJ1Y3Rvci4gUmVtb3ZlIHRoaXMgZXZlbnR1YWxseVxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAob2JqKSB7XG4gIHJldHVybiBvYmogIT0gbnVsbCAmJiAoaXNCdWZmZXIob2JqKSB8fCBpc1Nsb3dCdWZmZXIob2JqKSB8fCAhIW9iai5faXNCdWZmZXIpXG59XG5cbmZ1bmN0aW9uIGlzQnVmZmVyIChvYmopIHtcbiAgcmV0dXJuICEhb2JqLmNvbnN0cnVjdG9yICYmIHR5cGVvZiBvYmouY29uc3RydWN0b3IuaXNCdWZmZXIgPT09ICdmdW5jdGlvbicgJiYgb2JqLmNvbnN0cnVjdG9yLmlzQnVmZmVyKG9iailcbn1cblxuLy8gRm9yIE5vZGUgdjAuMTAgc3VwcG9ydC4gUmVtb3ZlIHRoaXMgZXZlbnR1YWxseS5cbmZ1bmN0aW9uIGlzU2xvd0J1ZmZlciAob2JqKSB7XG4gIHJldHVybiB0eXBlb2Ygb2JqLnJlYWRGbG9hdExFID09PSAnZnVuY3Rpb24nICYmIHR5cGVvZiBvYmouc2xpY2UgPT09ICdmdW5jdGlvbicgJiYgaXNCdWZmZXIob2JqLnNsaWNlKDAsIDApKVxufVxuIiwiLyoqXG4gKiBsb2Rhc2ggKEN1c3RvbSBCdWlsZCkgPGh0dHBzOi8vbG9kYXNoLmNvbS8+XG4gKiBCdWlsZDogYGxvZGFzaCBtb2R1bGFyaXplIGV4cG9ydHM9XCJucG1cIiAtbyAuL2BcbiAqIENvcHlyaWdodCBqUXVlcnkgRm91bmRhdGlvbiBhbmQgb3RoZXIgY29udHJpYnV0b3JzIDxodHRwczovL2pxdWVyeS5vcmcvPlxuICogUmVsZWFzZWQgdW5kZXIgTUlUIGxpY2Vuc2UgPGh0dHBzOi8vbG9kYXNoLmNvbS9saWNlbnNlPlxuICogQmFzZWQgb24gVW5kZXJzY29yZS5qcyAxLjguMyA8aHR0cDovL3VuZGVyc2NvcmVqcy5vcmcvTElDRU5TRT5cbiAqIENvcHlyaWdodCBKZXJlbXkgQXNoa2VuYXMsIERvY3VtZW50Q2xvdWQgYW5kIEludmVzdGlnYXRpdmUgUmVwb3J0ZXJzICYgRWRpdG9yc1xuICovXG5cbi8qKiBgT2JqZWN0I3RvU3RyaW5nYCByZXN1bHQgcmVmZXJlbmNlcy4gKi9cbnZhciBvYmplY3RUYWcgPSAnW29iamVjdCBPYmplY3RdJztcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBhIGhvc3Qgb2JqZWN0IGluIElFIDwgOS5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBhIGhvc3Qgb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKi9cbmZ1bmN0aW9uIGlzSG9zdE9iamVjdCh2YWx1ZSkge1xuICAvLyBNYW55IGhvc3Qgb2JqZWN0cyBhcmUgYE9iamVjdGAgb2JqZWN0cyB0aGF0IGNhbiBjb2VyY2UgdG8gc3RyaW5nc1xuICAvLyBkZXNwaXRlIGhhdmluZyBpbXByb3Blcmx5IGRlZmluZWQgYHRvU3RyaW5nYCBtZXRob2RzLlxuICB2YXIgcmVzdWx0ID0gZmFsc2U7XG4gIGlmICh2YWx1ZSAhPSBudWxsICYmIHR5cGVvZiB2YWx1ZS50b1N0cmluZyAhPSAnZnVuY3Rpb24nKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJlc3VsdCA9ICEhKHZhbHVlICsgJycpO1xuICAgIH0gY2F0Y2ggKGUpIHt9XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgdW5hcnkgZnVuY3Rpb24gdGhhdCBpbnZva2VzIGBmdW5jYCB3aXRoIGl0cyBhcmd1bWVudCB0cmFuc2Zvcm1lZC5cbiAqXG4gKiBAcHJpdmF0ZVxuICogQHBhcmFtIHtGdW5jdGlvbn0gZnVuYyBUaGUgZnVuY3Rpb24gdG8gd3JhcC5cbiAqIEBwYXJhbSB7RnVuY3Rpb259IHRyYW5zZm9ybSBUaGUgYXJndW1lbnQgdHJhbnNmb3JtLlxuICogQHJldHVybnMge0Z1bmN0aW9ufSBSZXR1cm5zIHRoZSBuZXcgZnVuY3Rpb24uXG4gKi9cbmZ1bmN0aW9uIG92ZXJBcmcoZnVuYywgdHJhbnNmb3JtKSB7XG4gIHJldHVybiBmdW5jdGlvbihhcmcpIHtcbiAgICByZXR1cm4gZnVuYyh0cmFuc2Zvcm0oYXJnKSk7XG4gIH07XG59XG5cbi8qKiBVc2VkIGZvciBidWlsdC1pbiBtZXRob2QgcmVmZXJlbmNlcy4gKi9cbnZhciBmdW5jUHJvdG8gPSBGdW5jdGlvbi5wcm90b3R5cGUsXG4gICAgb2JqZWN0UHJvdG8gPSBPYmplY3QucHJvdG90eXBlO1xuXG4vKiogVXNlZCB0byByZXNvbHZlIHRoZSBkZWNvbXBpbGVkIHNvdXJjZSBvZiBmdW5jdGlvbnMuICovXG52YXIgZnVuY1RvU3RyaW5nID0gZnVuY1Byb3RvLnRvU3RyaW5nO1xuXG4vKiogVXNlZCB0byBjaGVjayBvYmplY3RzIGZvciBvd24gcHJvcGVydGllcy4gKi9cbnZhciBoYXNPd25Qcm9wZXJ0eSA9IG9iamVjdFByb3RvLmhhc093blByb3BlcnR5O1xuXG4vKiogVXNlZCB0byBpbmZlciB0aGUgYE9iamVjdGAgY29uc3RydWN0b3IuICovXG52YXIgb2JqZWN0Q3RvclN0cmluZyA9IGZ1bmNUb1N0cmluZy5jYWxsKE9iamVjdCk7XG5cbi8qKlxuICogVXNlZCB0byByZXNvbHZlIHRoZVxuICogW2B0b1N0cmluZ1RhZ2BdKGh0dHA6Ly9lY21hLWludGVybmF0aW9uYWwub3JnL2VjbWEtMjYyLzcuMC8jc2VjLW9iamVjdC5wcm90b3R5cGUudG9zdHJpbmcpXG4gKiBvZiB2YWx1ZXMuXG4gKi9cbnZhciBvYmplY3RUb1N0cmluZyA9IG9iamVjdFByb3RvLnRvU3RyaW5nO1xuXG4vKiogQnVpbHQtaW4gdmFsdWUgcmVmZXJlbmNlcy4gKi9cbnZhciBnZXRQcm90b3R5cGUgPSBvdmVyQXJnKE9iamVjdC5nZXRQcm90b3R5cGVPZiwgT2JqZWN0KTtcblxuLyoqXG4gKiBDaGVja3MgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZS4gQSB2YWx1ZSBpcyBvYmplY3QtbGlrZSBpZiBpdCdzIG5vdCBgbnVsbGBcbiAqIGFuZCBoYXMgYSBgdHlwZW9mYCByZXN1bHQgb2YgXCJvYmplY3RcIi5cbiAqXG4gKiBAc3RhdGljXG4gKiBAbWVtYmVyT2YgX1xuICogQHNpbmNlIDQuMC4wXG4gKiBAY2F0ZWdvcnkgTGFuZ1xuICogQHBhcmFtIHsqfSB2YWx1ZSBUaGUgdmFsdWUgdG8gY2hlY2suXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn0gUmV0dXJucyBgdHJ1ZWAgaWYgYHZhbHVlYCBpcyBvYmplY3QtbGlrZSwgZWxzZSBgZmFsc2VgLlxuICogQGV4YW1wbGVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZSh7fSk7XG4gKiAvLyA9PiB0cnVlXG4gKlxuICogXy5pc09iamVjdExpa2UoWzEsIDIsIDNdKTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShfLm5vb3ApO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzT2JqZWN0TGlrZShudWxsKTtcbiAqIC8vID0+IGZhbHNlXG4gKi9cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZSh2YWx1ZSkge1xuICByZXR1cm4gISF2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT0gJ29iamVjdCc7XG59XG5cbi8qKlxuICogQ2hlY2tzIGlmIGB2YWx1ZWAgaXMgYSBwbGFpbiBvYmplY3QsIHRoYXQgaXMsIGFuIG9iamVjdCBjcmVhdGVkIGJ5IHRoZVxuICogYE9iamVjdGAgY29uc3RydWN0b3Igb3Igb25lIHdpdGggYSBgW1tQcm90b3R5cGVdXWAgb2YgYG51bGxgLlxuICpcbiAqIEBzdGF0aWNcbiAqIEBtZW1iZXJPZiBfXG4gKiBAc2luY2UgMC44LjBcbiAqIEBjYXRlZ29yeSBMYW5nXG4gKiBAcGFyYW0geyp9IHZhbHVlIFRoZSB2YWx1ZSB0byBjaGVjay5cbiAqIEByZXR1cm5zIHtib29sZWFufSBSZXR1cm5zIGB0cnVlYCBpZiBgdmFsdWVgIGlzIGEgcGxhaW4gb2JqZWN0LCBlbHNlIGBmYWxzZWAuXG4gKiBAZXhhbXBsZVxuICpcbiAqIGZ1bmN0aW9uIEZvbygpIHtcbiAqICAgdGhpcy5hID0gMTtcbiAqIH1cbiAqXG4gKiBfLmlzUGxhaW5PYmplY3QobmV3IEZvbyk7XG4gKiAvLyA9PiBmYWxzZVxuICpcbiAqIF8uaXNQbGFpbk9iamVjdChbMSwgMiwgM10pO1xuICogLy8gPT4gZmFsc2VcbiAqXG4gKiBfLmlzUGxhaW5PYmplY3QoeyAneCc6IDAsICd5JzogMCB9KTtcbiAqIC8vID0+IHRydWVcbiAqXG4gKiBfLmlzUGxhaW5PYmplY3QoT2JqZWN0LmNyZWF0ZShudWxsKSk7XG4gKiAvLyA9PiB0cnVlXG4gKi9cbmZ1bmN0aW9uIGlzUGxhaW5PYmplY3QodmFsdWUpIHtcbiAgaWYgKCFpc09iamVjdExpa2UodmFsdWUpIHx8XG4gICAgICBvYmplY3RUb1N0cmluZy5jYWxsKHZhbHVlKSAhPSBvYmplY3RUYWcgfHwgaXNIb3N0T2JqZWN0KHZhbHVlKSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICB2YXIgcHJvdG8gPSBnZXRQcm90b3R5cGUodmFsdWUpO1xuICBpZiAocHJvdG8gPT09IG51bGwpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICB2YXIgQ3RvciA9IGhhc093blByb3BlcnR5LmNhbGwocHJvdG8sICdjb25zdHJ1Y3RvcicpICYmIHByb3RvLmNvbnN0cnVjdG9yO1xuICByZXR1cm4gKHR5cGVvZiBDdG9yID09ICdmdW5jdGlvbicgJiZcbiAgICBDdG9yIGluc3RhbmNlb2YgQ3RvciAmJiBmdW5jVG9TdHJpbmcuY2FsbChDdG9yKSA9PSBvYmplY3RDdG9yU3RyaW5nKTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpc1BsYWluT2JqZWN0O1xuIiwiLy8gc2hpbSBmb3IgdXNpbmcgcHJvY2VzcyBpbiBicm93c2VyXG52YXIgcHJvY2VzcyA9IG1vZHVsZS5leHBvcnRzID0ge307XG5cbi8vIGNhY2hlZCBmcm9tIHdoYXRldmVyIGdsb2JhbCBpcyBwcmVzZW50IHNvIHRoYXQgdGVzdCBydW5uZXJzIHRoYXQgc3R1YiBpdFxuLy8gZG9uJ3QgYnJlYWsgdGhpbmdzLiAgQnV0IHdlIG5lZWQgdG8gd3JhcCBpdCBpbiBhIHRyeSBjYXRjaCBpbiBjYXNlIGl0IGlzXG4vLyB3cmFwcGVkIGluIHN0cmljdCBtb2RlIGNvZGUgd2hpY2ggZG9lc24ndCBkZWZpbmUgYW55IGdsb2JhbHMuICBJdCdzIGluc2lkZSBhXG4vLyBmdW5jdGlvbiBiZWNhdXNlIHRyeS9jYXRjaGVzIGRlb3B0aW1pemUgaW4gY2VydGFpbiBlbmdpbmVzLlxuXG52YXIgY2FjaGVkU2V0VGltZW91dDtcbnZhciBjYWNoZWRDbGVhclRpbWVvdXQ7XG5cbmZ1bmN0aW9uIGRlZmF1bHRTZXRUaW1vdXQoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZXRUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG5mdW5jdGlvbiBkZWZhdWx0Q2xlYXJUaW1lb3V0ICgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2NsZWFyVGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuKGZ1bmN0aW9uICgpIHtcbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIHNldFRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICBpZiAodHlwZW9mIGNsZWFyVGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gZGVmYXVsdENsZWFyVGltZW91dDtcbiAgICB9XG59ICgpKVxuZnVuY3Rpb24gcnVuVGltZW91dChmdW4pIHtcbiAgICBpZiAoY2FjaGVkU2V0VGltZW91dCA9PT0gc2V0VGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgLy8gaWYgc2V0VGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZFNldFRpbWVvdXQgPT09IGRlZmF1bHRTZXRUaW1vdXQgfHwgIWNhY2hlZFNldFRpbWVvdXQpICYmIHNldFRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9IGNhdGNoKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0IHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKG51bGwsIGZ1biwgMCk7XG4gICAgICAgIH0gY2F0Y2goZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvclxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbCh0aGlzLCBmdW4sIDApO1xuICAgICAgICB9XG4gICAgfVxuXG5cbn1cbmZ1bmN0aW9uIHJ1bkNsZWFyVGltZW91dChtYXJrZXIpIHtcbiAgICBpZiAoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgLy8gaWYgY2xlYXJUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkQ2xlYXJUaW1lb3V0ID09PSBkZWZhdWx0Q2xlYXJUaW1lb3V0IHx8ICFjYWNoZWRDbGVhclRpbWVvdXQpICYmIGNsZWFyVGltZW91dCkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIHJldHVybiBjbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfSBjYXRjaCAoZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgIHRydXN0IHRoZSBnbG9iYWwgb2JqZWN0IHdoZW4gY2FsbGVkIG5vcm1hbGx5XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwobnVsbCwgbWFya2VyKTtcbiAgICAgICAgfSBjYXRjaCAoZSl7XG4gICAgICAgICAgICAvLyBzYW1lIGFzIGFib3ZlIGJ1dCB3aGVuIGl0J3MgYSB2ZXJzaW9uIG9mIEkuRS4gdGhhdCBtdXN0IGhhdmUgdGhlIGdsb2JhbCBvYmplY3QgZm9yICd0aGlzJywgaG9wZnVsbHkgb3VyIGNvbnRleHQgY29ycmVjdCBvdGhlcndpc2UgaXQgd2lsbCB0aHJvdyBhIGdsb2JhbCBlcnJvci5cbiAgICAgICAgICAgIC8vIFNvbWUgdmVyc2lvbnMgb2YgSS5FLiBoYXZlIGRpZmZlcmVudCBydWxlcyBmb3IgY2xlYXJUaW1lb3V0IHZzIHNldFRpbWVvdXRcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbCh0aGlzLCBtYXJrZXIpO1xuICAgICAgICB9XG4gICAgfVxuXG5cblxufVxudmFyIHF1ZXVlID0gW107XG52YXIgZHJhaW5pbmcgPSBmYWxzZTtcbnZhciBjdXJyZW50UXVldWU7XG52YXIgcXVldWVJbmRleCA9IC0xO1xuXG5mdW5jdGlvbiBjbGVhblVwTmV4dFRpY2soKSB7XG4gICAgaWYgKCFkcmFpbmluZyB8fCAhY3VycmVudFF1ZXVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBpZiAoY3VycmVudFF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBxdWV1ZSA9IGN1cnJlbnRRdWV1ZS5jb25jYXQocXVldWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICB9XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICBkcmFpblF1ZXVlKCk7XG4gICAgfVxufVxuXG5mdW5jdGlvbiBkcmFpblF1ZXVlKCkge1xuICAgIGlmIChkcmFpbmluZykge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIHZhciB0aW1lb3V0ID0gcnVuVGltZW91dChjbGVhblVwTmV4dFRpY2spO1xuICAgIGRyYWluaW5nID0gdHJ1ZTtcblxuICAgIHZhciBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgd2hpbGUobGVuKSB7XG4gICAgICAgIGN1cnJlbnRRdWV1ZSA9IHF1ZXVlO1xuICAgICAgICBxdWV1ZSA9IFtdO1xuICAgICAgICB3aGlsZSAoKytxdWV1ZUluZGV4IDwgbGVuKSB7XG4gICAgICAgICAgICBpZiAoY3VycmVudFF1ZXVlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFF1ZXVlW3F1ZXVlSW5kZXhdLnJ1bigpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHF1ZXVlSW5kZXggPSAtMTtcbiAgICAgICAgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIH1cbiAgICBjdXJyZW50UXVldWUgPSBudWxsO1xuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgcnVuQ2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xufVxuXG5wcm9jZXNzLm5leHRUaWNrID0gZnVuY3Rpb24gKGZ1bikge1xuICAgIHZhciBhcmdzID0gbmV3IEFycmF5KGFyZ3VtZW50cy5sZW5ndGggLSAxKTtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDE7IGkgPCBhcmd1bWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGFyZ3NbaSAtIDFdID0gYXJndW1lbnRzW2ldO1xuICAgICAgICB9XG4gICAgfVxuICAgIHF1ZXVlLnB1c2gobmV3IEl0ZW0oZnVuLCBhcmdzKSk7XG4gICAgaWYgKHF1ZXVlLmxlbmd0aCA9PT0gMSAmJiAhZHJhaW5pbmcpIHtcbiAgICAgICAgcnVuVGltZW91dChkcmFpblF1ZXVlKTtcbiAgICB9XG59O1xuXG4vLyB2OCBsaWtlcyBwcmVkaWN0aWJsZSBvYmplY3RzXG5mdW5jdGlvbiBJdGVtKGZ1biwgYXJyYXkpIHtcbiAgICB0aGlzLmZ1biA9IGZ1bjtcbiAgICB0aGlzLmFycmF5ID0gYXJyYXk7XG59XG5JdGVtLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5mdW4uYXBwbHkobnVsbCwgdGhpcy5hcnJheSk7XG59O1xucHJvY2Vzcy50aXRsZSA9ICdicm93c2VyJztcbnByb2Nlc3MuYnJvd3NlciA9IHRydWU7XG5wcm9jZXNzLmVudiA9IHt9O1xucHJvY2Vzcy5hcmd2ID0gW107XG5wcm9jZXNzLnZlcnNpb24gPSAnJzsgLy8gZW1wdHkgc3RyaW5nIHRvIGF2b2lkIHJlZ2V4cCBpc3N1ZXNcbnByb2Nlc3MudmVyc2lvbnMgPSB7fTtcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbnByb2Nlc3Mub24gPSBub29wO1xucHJvY2Vzcy5hZGRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLm9uY2UgPSBub29wO1xucHJvY2Vzcy5vZmYgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUFsbExpc3RlbmVycyA9IG5vb3A7XG5wcm9jZXNzLmVtaXQgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5wcmVwZW5kT25jZUxpc3RlbmVyID0gbm9vcDtcblxucHJvY2Vzcy5saXN0ZW5lcnMgPSBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gW10gfVxuXG5wcm9jZXNzLmJpbmRpbmcgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5iaW5kaW5nIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5cbnByb2Nlc3MuY3dkID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gJy8nIH07XG5wcm9jZXNzLmNoZGlyID0gZnVuY3Rpb24gKGRpcikge1xuICAgIHRocm93IG5ldyBFcnJvcigncHJvY2Vzcy5jaGRpciBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xucHJvY2Vzcy51bWFzayA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gMDsgfTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHJlcGxhY2UgPSBTdHJpbmcucHJvdG90eXBlLnJlcGxhY2U7XG52YXIgcGVyY2VudFR3ZW50aWVzID0gLyUyMC9nO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICAnZGVmYXVsdCc6ICdSRkMzOTg2JyxcbiAgICBmb3JtYXR0ZXJzOiB7XG4gICAgICAgIFJGQzE3Mzg6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHJlcGxhY2UuY2FsbCh2YWx1ZSwgcGVyY2VudFR3ZW50aWVzLCAnKycpO1xuICAgICAgICB9LFxuICAgICAgICBSRkMzOTg2OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgfVxuICAgIH0sXG4gICAgUkZDMTczODogJ1JGQzE3MzgnLFxuICAgIFJGQzM5ODY6ICdSRkMzOTg2J1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHN0cmluZ2lmeSA9IHJlcXVpcmUoJy4vc3RyaW5naWZ5Jyk7XG52YXIgcGFyc2UgPSByZXF1aXJlKCcuL3BhcnNlJyk7XG52YXIgZm9ybWF0cyA9IHJlcXVpcmUoJy4vZm9ybWF0cycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBmb3JtYXRzOiBmb3JtYXRzLFxuICAgIHBhcnNlOiBwYXJzZSxcbiAgICBzdHJpbmdpZnk6IHN0cmluZ2lmeVxufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xuXG52YXIgaGFzID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblxudmFyIGRlZmF1bHRzID0ge1xuICAgIGFsbG93RG90czogZmFsc2UsXG4gICAgYWxsb3dQcm90b3R5cGVzOiBmYWxzZSxcbiAgICBhcnJheUxpbWl0OiAyMCxcbiAgICBkZWNvZGVyOiB1dGlscy5kZWNvZGUsXG4gICAgZGVsaW1pdGVyOiAnJicsXG4gICAgZGVwdGg6IDUsXG4gICAgcGFyYW1ldGVyTGltaXQ6IDEwMDAsXG4gICAgcGxhaW5PYmplY3RzOiBmYWxzZSxcbiAgICBzdHJpY3ROdWxsSGFuZGxpbmc6IGZhbHNlXG59O1xuXG52YXIgcGFyc2VWYWx1ZXMgPSBmdW5jdGlvbiBwYXJzZVF1ZXJ5U3RyaW5nVmFsdWVzKHN0ciwgb3B0aW9ucykge1xuICAgIHZhciBvYmogPSB7fTtcbiAgICB2YXIgY2xlYW5TdHIgPSBvcHRpb25zLmlnbm9yZVF1ZXJ5UHJlZml4ID8gc3RyLnJlcGxhY2UoL15cXD8vLCAnJykgOiBzdHI7XG4gICAgdmFyIGxpbWl0ID0gb3B0aW9ucy5wYXJhbWV0ZXJMaW1pdCA9PT0gSW5maW5pdHkgPyB1bmRlZmluZWQgOiBvcHRpb25zLnBhcmFtZXRlckxpbWl0O1xuICAgIHZhciBwYXJ0cyA9IGNsZWFuU3RyLnNwbGl0KG9wdGlvbnMuZGVsaW1pdGVyLCBsaW1pdCk7XG5cbiAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBhcnRzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHZhciBwYXJ0ID0gcGFydHNbaV07XG5cbiAgICAgICAgdmFyIGJyYWNrZXRFcXVhbHNQb3MgPSBwYXJ0LmluZGV4T2YoJ109Jyk7XG4gICAgICAgIHZhciBwb3MgPSBicmFja2V0RXF1YWxzUG9zID09PSAtMSA/IHBhcnQuaW5kZXhPZignPScpIDogYnJhY2tldEVxdWFsc1BvcyArIDE7XG5cbiAgICAgICAgdmFyIGtleSwgdmFsO1xuICAgICAgICBpZiAocG9zID09PSAtMSkge1xuICAgICAgICAgICAga2V5ID0gb3B0aW9ucy5kZWNvZGVyKHBhcnQsIGRlZmF1bHRzLmRlY29kZXIpO1xuICAgICAgICAgICAgdmFsID0gb3B0aW9ucy5zdHJpY3ROdWxsSGFuZGxpbmcgPyBudWxsIDogJyc7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBrZXkgPSBvcHRpb25zLmRlY29kZXIocGFydC5zbGljZSgwLCBwb3MpLCBkZWZhdWx0cy5kZWNvZGVyKTtcbiAgICAgICAgICAgIHZhbCA9IG9wdGlvbnMuZGVjb2RlcihwYXJ0LnNsaWNlKHBvcyArIDEpLCBkZWZhdWx0cy5kZWNvZGVyKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaGFzLmNhbGwob2JqLCBrZXkpKSB7XG4gICAgICAgICAgICBvYmpba2V5XSA9IFtdLmNvbmNhdChvYmpba2V5XSkuY29uY2F0KHZhbCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvYmpba2V5XSA9IHZhbDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBvYmo7XG59O1xuXG52YXIgcGFyc2VPYmplY3QgPSBmdW5jdGlvbiAoY2hhaW4sIHZhbCwgb3B0aW9ucykge1xuICAgIHZhciBsZWFmID0gdmFsO1xuXG4gICAgZm9yICh2YXIgaSA9IGNoYWluLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBvYmo7XG4gICAgICAgIHZhciByb290ID0gY2hhaW5baV07XG5cbiAgICAgICAgaWYgKHJvb3QgPT09ICdbXScpIHtcbiAgICAgICAgICAgIG9iaiA9IFtdO1xuICAgICAgICAgICAgb2JqID0gb2JqLmNvbmNhdChsZWFmKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIG9iaiA9IG9wdGlvbnMucGxhaW5PYmplY3RzID8gT2JqZWN0LmNyZWF0ZShudWxsKSA6IHt9O1xuICAgICAgICAgICAgdmFyIGNsZWFuUm9vdCA9IHJvb3QuY2hhckF0KDApID09PSAnWycgJiYgcm9vdC5jaGFyQXQocm9vdC5sZW5ndGggLSAxKSA9PT0gJ10nID8gcm9vdC5zbGljZSgxLCAtMSkgOiByb290O1xuICAgICAgICAgICAgdmFyIGluZGV4ID0gcGFyc2VJbnQoY2xlYW5Sb290LCAxMCk7XG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgIWlzTmFOKGluZGV4KVxuICAgICAgICAgICAgICAgICYmIHJvb3QgIT09IGNsZWFuUm9vdFxuICAgICAgICAgICAgICAgICYmIFN0cmluZyhpbmRleCkgPT09IGNsZWFuUm9vdFxuICAgICAgICAgICAgICAgICYmIGluZGV4ID49IDBcbiAgICAgICAgICAgICAgICAmJiAob3B0aW9ucy5wYXJzZUFycmF5cyAmJiBpbmRleCA8PSBvcHRpb25zLmFycmF5TGltaXQpXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICBvYmogPSBbXTtcbiAgICAgICAgICAgICAgICBvYmpbaW5kZXhdID0gbGVhZjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgb2JqW2NsZWFuUm9vdF0gPSBsZWFmO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgbGVhZiA9IG9iajtcbiAgICB9XG5cbiAgICByZXR1cm4gbGVhZjtcbn07XG5cbnZhciBwYXJzZUtleXMgPSBmdW5jdGlvbiBwYXJzZVF1ZXJ5U3RyaW5nS2V5cyhnaXZlbktleSwgdmFsLCBvcHRpb25zKSB7XG4gICAgaWYgKCFnaXZlbktleSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gVHJhbnNmb3JtIGRvdCBub3RhdGlvbiB0byBicmFja2V0IG5vdGF0aW9uXG4gICAgdmFyIGtleSA9IG9wdGlvbnMuYWxsb3dEb3RzID8gZ2l2ZW5LZXkucmVwbGFjZSgvXFwuKFteLltdKykvZywgJ1skMV0nKSA6IGdpdmVuS2V5O1xuXG4gICAgLy8gVGhlIHJlZ2V4IGNodW5rc1xuXG4gICAgdmFyIGJyYWNrZXRzID0gLyhcXFtbXltcXF1dKl0pLztcbiAgICB2YXIgY2hpbGQgPSAvKFxcW1teW1xcXV0qXSkvZztcblxuICAgIC8vIEdldCB0aGUgcGFyZW50XG5cbiAgICB2YXIgc2VnbWVudCA9IGJyYWNrZXRzLmV4ZWMoa2V5KTtcbiAgICB2YXIgcGFyZW50ID0gc2VnbWVudCA/IGtleS5zbGljZSgwLCBzZWdtZW50LmluZGV4KSA6IGtleTtcblxuICAgIC8vIFN0YXNoIHRoZSBwYXJlbnQgaWYgaXQgZXhpc3RzXG5cbiAgICB2YXIga2V5cyA9IFtdO1xuICAgIGlmIChwYXJlbnQpIHtcbiAgICAgICAgLy8gSWYgd2UgYXJlbid0IHVzaW5nIHBsYWluIG9iamVjdHMsIG9wdGlvbmFsbHkgcHJlZml4IGtleXNcbiAgICAgICAgLy8gdGhhdCB3b3VsZCBvdmVyd3JpdGUgb2JqZWN0IHByb3RvdHlwZSBwcm9wZXJ0aWVzXG4gICAgICAgIGlmICghb3B0aW9ucy5wbGFpbk9iamVjdHMgJiYgaGFzLmNhbGwoT2JqZWN0LnByb3RvdHlwZSwgcGFyZW50KSkge1xuICAgICAgICAgICAgaWYgKCFvcHRpb25zLmFsbG93UHJvdG90eXBlcykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGtleXMucHVzaChwYXJlbnQpO1xuICAgIH1cblxuICAgIC8vIExvb3AgdGhyb3VnaCBjaGlsZHJlbiBhcHBlbmRpbmcgdG8gdGhlIGFycmF5IHVudGlsIHdlIGhpdCBkZXB0aFxuXG4gICAgdmFyIGkgPSAwO1xuICAgIHdoaWxlICgoc2VnbWVudCA9IGNoaWxkLmV4ZWMoa2V5KSkgIT09IG51bGwgJiYgaSA8IG9wdGlvbnMuZGVwdGgpIHtcbiAgICAgICAgaSArPSAxO1xuICAgICAgICBpZiAoIW9wdGlvbnMucGxhaW5PYmplY3RzICYmIGhhcy5jYWxsKE9iamVjdC5wcm90b3R5cGUsIHNlZ21lbnRbMV0uc2xpY2UoMSwgLTEpKSkge1xuICAgICAgICAgICAgaWYgKCFvcHRpb25zLmFsbG93UHJvdG90eXBlcykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBrZXlzLnB1c2goc2VnbWVudFsxXSk7XG4gICAgfVxuXG4gICAgLy8gSWYgdGhlcmUncyBhIHJlbWFpbmRlciwganVzdCBhZGQgd2hhdGV2ZXIgaXMgbGVmdFxuXG4gICAgaWYgKHNlZ21lbnQpIHtcbiAgICAgICAga2V5cy5wdXNoKCdbJyArIGtleS5zbGljZShzZWdtZW50LmluZGV4KSArICddJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhcnNlT2JqZWN0KGtleXMsIHZhbCwgb3B0aW9ucyk7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChzdHIsIG9wdHMpIHtcbiAgICB2YXIgb3B0aW9ucyA9IG9wdHMgPyB1dGlscy5hc3NpZ24oe30sIG9wdHMpIDoge307XG5cbiAgICBpZiAob3B0aW9ucy5kZWNvZGVyICE9PSBudWxsICYmIG9wdGlvbnMuZGVjb2RlciAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiBvcHRpb25zLmRlY29kZXIgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignRGVjb2RlciBoYXMgdG8gYmUgYSBmdW5jdGlvbi4nKTtcbiAgICB9XG5cbiAgICBvcHRpb25zLmlnbm9yZVF1ZXJ5UHJlZml4ID0gb3B0aW9ucy5pZ25vcmVRdWVyeVByZWZpeCA9PT0gdHJ1ZTtcbiAgICBvcHRpb25zLmRlbGltaXRlciA9IHR5cGVvZiBvcHRpb25zLmRlbGltaXRlciA9PT0gJ3N0cmluZycgfHwgdXRpbHMuaXNSZWdFeHAob3B0aW9ucy5kZWxpbWl0ZXIpID8gb3B0aW9ucy5kZWxpbWl0ZXIgOiBkZWZhdWx0cy5kZWxpbWl0ZXI7XG4gICAgb3B0aW9ucy5kZXB0aCA9IHR5cGVvZiBvcHRpb25zLmRlcHRoID09PSAnbnVtYmVyJyA/IG9wdGlvbnMuZGVwdGggOiBkZWZhdWx0cy5kZXB0aDtcbiAgICBvcHRpb25zLmFycmF5TGltaXQgPSB0eXBlb2Ygb3B0aW9ucy5hcnJheUxpbWl0ID09PSAnbnVtYmVyJyA/IG9wdGlvbnMuYXJyYXlMaW1pdCA6IGRlZmF1bHRzLmFycmF5TGltaXQ7XG4gICAgb3B0aW9ucy5wYXJzZUFycmF5cyA9IG9wdGlvbnMucGFyc2VBcnJheXMgIT09IGZhbHNlO1xuICAgIG9wdGlvbnMuZGVjb2RlciA9IHR5cGVvZiBvcHRpb25zLmRlY29kZXIgPT09ICdmdW5jdGlvbicgPyBvcHRpb25zLmRlY29kZXIgOiBkZWZhdWx0cy5kZWNvZGVyO1xuICAgIG9wdGlvbnMuYWxsb3dEb3RzID0gdHlwZW9mIG9wdGlvbnMuYWxsb3dEb3RzID09PSAnYm9vbGVhbicgPyBvcHRpb25zLmFsbG93RG90cyA6IGRlZmF1bHRzLmFsbG93RG90cztcbiAgICBvcHRpb25zLnBsYWluT2JqZWN0cyA9IHR5cGVvZiBvcHRpb25zLnBsYWluT2JqZWN0cyA9PT0gJ2Jvb2xlYW4nID8gb3B0aW9ucy5wbGFpbk9iamVjdHMgOiBkZWZhdWx0cy5wbGFpbk9iamVjdHM7XG4gICAgb3B0aW9ucy5hbGxvd1Byb3RvdHlwZXMgPSB0eXBlb2Ygb3B0aW9ucy5hbGxvd1Byb3RvdHlwZXMgPT09ICdib29sZWFuJyA/IG9wdGlvbnMuYWxsb3dQcm90b3R5cGVzIDogZGVmYXVsdHMuYWxsb3dQcm90b3R5cGVzO1xuICAgIG9wdGlvbnMucGFyYW1ldGVyTGltaXQgPSB0eXBlb2Ygb3B0aW9ucy5wYXJhbWV0ZXJMaW1pdCA9PT0gJ251bWJlcicgPyBvcHRpb25zLnBhcmFtZXRlckxpbWl0IDogZGVmYXVsdHMucGFyYW1ldGVyTGltaXQ7XG4gICAgb3B0aW9ucy5zdHJpY3ROdWxsSGFuZGxpbmcgPSB0eXBlb2Ygb3B0aW9ucy5zdHJpY3ROdWxsSGFuZGxpbmcgPT09ICdib29sZWFuJyA/IG9wdGlvbnMuc3RyaWN0TnVsbEhhbmRsaW5nIDogZGVmYXVsdHMuc3RyaWN0TnVsbEhhbmRsaW5nO1xuXG4gICAgaWYgKHN0ciA9PT0gJycgfHwgc3RyID09PSBudWxsIHx8IHR5cGVvZiBzdHIgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybiBvcHRpb25zLnBsYWluT2JqZWN0cyA/IE9iamVjdC5jcmVhdGUobnVsbCkgOiB7fTtcbiAgICB9XG5cbiAgICB2YXIgdGVtcE9iaiA9IHR5cGVvZiBzdHIgPT09ICdzdHJpbmcnID8gcGFyc2VWYWx1ZXMoc3RyLCBvcHRpb25zKSA6IHN0cjtcbiAgICB2YXIgb2JqID0gb3B0aW9ucy5wbGFpbk9iamVjdHMgPyBPYmplY3QuY3JlYXRlKG51bGwpIDoge307XG5cbiAgICAvLyBJdGVyYXRlIG92ZXIgdGhlIGtleXMgYW5kIHNldHVwIHRoZSBuZXcgb2JqZWN0XG5cbiAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKHRlbXBPYmopO1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwga2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIga2V5ID0ga2V5c1tpXTtcbiAgICAgICAgdmFyIG5ld09iaiA9IHBhcnNlS2V5cyhrZXksIHRlbXBPYmpba2V5XSwgb3B0aW9ucyk7XG4gICAgICAgIG9iaiA9IHV0aWxzLm1lcmdlKG9iaiwgbmV3T2JqLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdXRpbHMuY29tcGFjdChvYmopO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIHV0aWxzID0gcmVxdWlyZSgnLi91dGlscycpO1xudmFyIGZvcm1hdHMgPSByZXF1aXJlKCcuL2Zvcm1hdHMnKTtcblxudmFyIGFycmF5UHJlZml4R2VuZXJhdG9ycyA9IHtcbiAgICBicmFja2V0czogZnVuY3Rpb24gYnJhY2tldHMocHJlZml4KSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZnVuYy1uYW1lLW1hdGNoaW5nXG4gICAgICAgIHJldHVybiBwcmVmaXggKyAnW10nO1xuICAgIH0sXG4gICAgaW5kaWNlczogZnVuY3Rpb24gaW5kaWNlcyhwcmVmaXgsIGtleSkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGZ1bmMtbmFtZS1tYXRjaGluZ1xuICAgICAgICByZXR1cm4gcHJlZml4ICsgJ1snICsga2V5ICsgJ10nO1xuICAgIH0sXG4gICAgcmVwZWF0OiBmdW5jdGlvbiByZXBlYXQocHJlZml4KSB7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgZnVuYy1uYW1lLW1hdGNoaW5nXG4gICAgICAgIHJldHVybiBwcmVmaXg7XG4gICAgfVxufTtcblxudmFyIHRvSVNPID0gRGF0ZS5wcm90b3R5cGUudG9JU09TdHJpbmc7XG5cbnZhciBkZWZhdWx0cyA9IHtcbiAgICBkZWxpbWl0ZXI6ICcmJyxcbiAgICBlbmNvZGU6IHRydWUsXG4gICAgZW5jb2RlcjogdXRpbHMuZW5jb2RlLFxuICAgIGVuY29kZVZhbHVlc09ubHk6IGZhbHNlLFxuICAgIHNlcmlhbGl6ZURhdGU6IGZ1bmN0aW9uIHNlcmlhbGl6ZURhdGUoZGF0ZSkgeyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGZ1bmMtbmFtZS1tYXRjaGluZ1xuICAgICAgICByZXR1cm4gdG9JU08uY2FsbChkYXRlKTtcbiAgICB9LFxuICAgIHNraXBOdWxsczogZmFsc2UsXG4gICAgc3RyaWN0TnVsbEhhbmRsaW5nOiBmYWxzZVxufTtcblxudmFyIHN0cmluZ2lmeSA9IGZ1bmN0aW9uIHN0cmluZ2lmeSggLy8gZXNsaW50LWRpc2FibGUtbGluZSBmdW5jLW5hbWUtbWF0Y2hpbmdcbiAgICBvYmplY3QsXG4gICAgcHJlZml4LFxuICAgIGdlbmVyYXRlQXJyYXlQcmVmaXgsXG4gICAgc3RyaWN0TnVsbEhhbmRsaW5nLFxuICAgIHNraXBOdWxscyxcbiAgICBlbmNvZGVyLFxuICAgIGZpbHRlcixcbiAgICBzb3J0LFxuICAgIGFsbG93RG90cyxcbiAgICBzZXJpYWxpemVEYXRlLFxuICAgIGZvcm1hdHRlcixcbiAgICBlbmNvZGVWYWx1ZXNPbmx5XG4pIHtcbiAgICB2YXIgb2JqID0gb2JqZWN0O1xuICAgIGlmICh0eXBlb2YgZmlsdGVyID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIG9iaiA9IGZpbHRlcihwcmVmaXgsIG9iaik7XG4gICAgfSBlbHNlIGlmIChvYmogaW5zdGFuY2VvZiBEYXRlKSB7XG4gICAgICAgIG9iaiA9IHNlcmlhbGl6ZURhdGUob2JqKTtcbiAgICB9IGVsc2UgaWYgKG9iaiA9PT0gbnVsbCkge1xuICAgICAgICBpZiAoc3RyaWN0TnVsbEhhbmRsaW5nKSB7XG4gICAgICAgICAgICByZXR1cm4gZW5jb2RlciAmJiAhZW5jb2RlVmFsdWVzT25seSA/IGVuY29kZXIocHJlZml4LCBkZWZhdWx0cy5lbmNvZGVyKSA6IHByZWZpeDtcbiAgICAgICAgfVxuXG4gICAgICAgIG9iaiA9ICcnO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2Ygb2JqID09PSAnc3RyaW5nJyB8fCB0eXBlb2Ygb2JqID09PSAnbnVtYmVyJyB8fCB0eXBlb2Ygb2JqID09PSAnYm9vbGVhbicgfHwgdXRpbHMuaXNCdWZmZXIob2JqKSkge1xuICAgICAgICBpZiAoZW5jb2Rlcikge1xuICAgICAgICAgICAgdmFyIGtleVZhbHVlID0gZW5jb2RlVmFsdWVzT25seSA/IHByZWZpeCA6IGVuY29kZXIocHJlZml4LCBkZWZhdWx0cy5lbmNvZGVyKTtcbiAgICAgICAgICAgIHJldHVybiBbZm9ybWF0dGVyKGtleVZhbHVlKSArICc9JyArIGZvcm1hdHRlcihlbmNvZGVyKG9iaiwgZGVmYXVsdHMuZW5jb2RlcikpXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gW2Zvcm1hdHRlcihwcmVmaXgpICsgJz0nICsgZm9ybWF0dGVyKFN0cmluZyhvYmopKV07XG4gICAgfVxuXG4gICAgdmFyIHZhbHVlcyA9IFtdO1xuXG4gICAgaWYgKHR5cGVvZiBvYmogPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybiB2YWx1ZXM7XG4gICAgfVxuXG4gICAgdmFyIG9iaktleXM7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZmlsdGVyKSkge1xuICAgICAgICBvYmpLZXlzID0gZmlsdGVyO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBrZXlzID0gT2JqZWN0LmtleXMob2JqKTtcbiAgICAgICAgb2JqS2V5cyA9IHNvcnQgPyBrZXlzLnNvcnQoc29ydCkgOiBrZXlzO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2JqS2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIga2V5ID0gb2JqS2V5c1tpXTtcblxuICAgICAgICBpZiAoc2tpcE51bGxzICYmIG9ialtrZXldID09PSBudWxsKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcbiAgICAgICAgICAgIHZhbHVlcyA9IHZhbHVlcy5jb25jYXQoc3RyaW5naWZ5KFxuICAgICAgICAgICAgICAgIG9ialtrZXldLFxuICAgICAgICAgICAgICAgIGdlbmVyYXRlQXJyYXlQcmVmaXgocHJlZml4LCBrZXkpLFxuICAgICAgICAgICAgICAgIGdlbmVyYXRlQXJyYXlQcmVmaXgsXG4gICAgICAgICAgICAgICAgc3RyaWN0TnVsbEhhbmRsaW5nLFxuICAgICAgICAgICAgICAgIHNraXBOdWxscyxcbiAgICAgICAgICAgICAgICBlbmNvZGVyLFxuICAgICAgICAgICAgICAgIGZpbHRlcixcbiAgICAgICAgICAgICAgICBzb3J0LFxuICAgICAgICAgICAgICAgIGFsbG93RG90cyxcbiAgICAgICAgICAgICAgICBzZXJpYWxpemVEYXRlLFxuICAgICAgICAgICAgICAgIGZvcm1hdHRlcixcbiAgICAgICAgICAgICAgICBlbmNvZGVWYWx1ZXNPbmx5XG4gICAgICAgICAgICApKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHZhbHVlcyA9IHZhbHVlcy5jb25jYXQoc3RyaW5naWZ5KFxuICAgICAgICAgICAgICAgIG9ialtrZXldLFxuICAgICAgICAgICAgICAgIHByZWZpeCArIChhbGxvd0RvdHMgPyAnLicgKyBrZXkgOiAnWycgKyBrZXkgKyAnXScpLFxuICAgICAgICAgICAgICAgIGdlbmVyYXRlQXJyYXlQcmVmaXgsXG4gICAgICAgICAgICAgICAgc3RyaWN0TnVsbEhhbmRsaW5nLFxuICAgICAgICAgICAgICAgIHNraXBOdWxscyxcbiAgICAgICAgICAgICAgICBlbmNvZGVyLFxuICAgICAgICAgICAgICAgIGZpbHRlcixcbiAgICAgICAgICAgICAgICBzb3J0LFxuICAgICAgICAgICAgICAgIGFsbG93RG90cyxcbiAgICAgICAgICAgICAgICBzZXJpYWxpemVEYXRlLFxuICAgICAgICAgICAgICAgIGZvcm1hdHRlcixcbiAgICAgICAgICAgICAgICBlbmNvZGVWYWx1ZXNPbmx5XG4gICAgICAgICAgICApKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB2YWx1ZXM7XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChvYmplY3QsIG9wdHMpIHtcbiAgICB2YXIgb2JqID0gb2JqZWN0O1xuICAgIHZhciBvcHRpb25zID0gb3B0cyA/IHV0aWxzLmFzc2lnbih7fSwgb3B0cykgOiB7fTtcblxuICAgIGlmIChvcHRpb25zLmVuY29kZXIgIT09IG51bGwgJiYgb3B0aW9ucy5lbmNvZGVyICE9PSB1bmRlZmluZWQgJiYgdHlwZW9mIG9wdGlvbnMuZW5jb2RlciAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdFbmNvZGVyIGhhcyB0byBiZSBhIGZ1bmN0aW9uLicpO1xuICAgIH1cblxuICAgIHZhciBkZWxpbWl0ZXIgPSB0eXBlb2Ygb3B0aW9ucy5kZWxpbWl0ZXIgPT09ICd1bmRlZmluZWQnID8gZGVmYXVsdHMuZGVsaW1pdGVyIDogb3B0aW9ucy5kZWxpbWl0ZXI7XG4gICAgdmFyIHN0cmljdE51bGxIYW5kbGluZyA9IHR5cGVvZiBvcHRpb25zLnN0cmljdE51bGxIYW5kbGluZyA9PT0gJ2Jvb2xlYW4nID8gb3B0aW9ucy5zdHJpY3ROdWxsSGFuZGxpbmcgOiBkZWZhdWx0cy5zdHJpY3ROdWxsSGFuZGxpbmc7XG4gICAgdmFyIHNraXBOdWxscyA9IHR5cGVvZiBvcHRpb25zLnNraXBOdWxscyA9PT0gJ2Jvb2xlYW4nID8gb3B0aW9ucy5za2lwTnVsbHMgOiBkZWZhdWx0cy5za2lwTnVsbHM7XG4gICAgdmFyIGVuY29kZSA9IHR5cGVvZiBvcHRpb25zLmVuY29kZSA9PT0gJ2Jvb2xlYW4nID8gb3B0aW9ucy5lbmNvZGUgOiBkZWZhdWx0cy5lbmNvZGU7XG4gICAgdmFyIGVuY29kZXIgPSB0eXBlb2Ygb3B0aW9ucy5lbmNvZGVyID09PSAnZnVuY3Rpb24nID8gb3B0aW9ucy5lbmNvZGVyIDogZGVmYXVsdHMuZW5jb2RlcjtcbiAgICB2YXIgc29ydCA9IHR5cGVvZiBvcHRpb25zLnNvcnQgPT09ICdmdW5jdGlvbicgPyBvcHRpb25zLnNvcnQgOiBudWxsO1xuICAgIHZhciBhbGxvd0RvdHMgPSB0eXBlb2Ygb3B0aW9ucy5hbGxvd0RvdHMgPT09ICd1bmRlZmluZWQnID8gZmFsc2UgOiBvcHRpb25zLmFsbG93RG90cztcbiAgICB2YXIgc2VyaWFsaXplRGF0ZSA9IHR5cGVvZiBvcHRpb25zLnNlcmlhbGl6ZURhdGUgPT09ICdmdW5jdGlvbicgPyBvcHRpb25zLnNlcmlhbGl6ZURhdGUgOiBkZWZhdWx0cy5zZXJpYWxpemVEYXRlO1xuICAgIHZhciBlbmNvZGVWYWx1ZXNPbmx5ID0gdHlwZW9mIG9wdGlvbnMuZW5jb2RlVmFsdWVzT25seSA9PT0gJ2Jvb2xlYW4nID8gb3B0aW9ucy5lbmNvZGVWYWx1ZXNPbmx5IDogZGVmYXVsdHMuZW5jb2RlVmFsdWVzT25seTtcbiAgICBpZiAodHlwZW9mIG9wdGlvbnMuZm9ybWF0ID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICBvcHRpb25zLmZvcm1hdCA9IGZvcm1hdHNbJ2RlZmF1bHQnXTtcbiAgICB9IGVsc2UgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZm9ybWF0cy5mb3JtYXR0ZXJzLCBvcHRpb25zLmZvcm1hdCkpIHtcbiAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVW5rbm93biBmb3JtYXQgb3B0aW9uIHByb3ZpZGVkLicpO1xuICAgIH1cbiAgICB2YXIgZm9ybWF0dGVyID0gZm9ybWF0cy5mb3JtYXR0ZXJzW29wdGlvbnMuZm9ybWF0XTtcbiAgICB2YXIgb2JqS2V5cztcbiAgICB2YXIgZmlsdGVyO1xuXG4gICAgaWYgKHR5cGVvZiBvcHRpb25zLmZpbHRlciA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICBmaWx0ZXIgPSBvcHRpb25zLmZpbHRlcjtcbiAgICAgICAgb2JqID0gZmlsdGVyKCcnLCBvYmopO1xuICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShvcHRpb25zLmZpbHRlcikpIHtcbiAgICAgICAgZmlsdGVyID0gb3B0aW9ucy5maWx0ZXI7XG4gICAgICAgIG9iaktleXMgPSBmaWx0ZXI7XG4gICAgfVxuXG4gICAgdmFyIGtleXMgPSBbXTtcblxuICAgIGlmICh0eXBlb2Ygb2JqICE9PSAnb2JqZWN0JyB8fCBvYmogPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cblxuICAgIHZhciBhcnJheUZvcm1hdDtcbiAgICBpZiAob3B0aW9ucy5hcnJheUZvcm1hdCBpbiBhcnJheVByZWZpeEdlbmVyYXRvcnMpIHtcbiAgICAgICAgYXJyYXlGb3JtYXQgPSBvcHRpb25zLmFycmF5Rm9ybWF0O1xuICAgIH0gZWxzZSBpZiAoJ2luZGljZXMnIGluIG9wdGlvbnMpIHtcbiAgICAgICAgYXJyYXlGb3JtYXQgPSBvcHRpb25zLmluZGljZXMgPyAnaW5kaWNlcycgOiAncmVwZWF0JztcbiAgICB9IGVsc2Uge1xuICAgICAgICBhcnJheUZvcm1hdCA9ICdpbmRpY2VzJztcbiAgICB9XG5cbiAgICB2YXIgZ2VuZXJhdGVBcnJheVByZWZpeCA9IGFycmF5UHJlZml4R2VuZXJhdG9yc1thcnJheUZvcm1hdF07XG5cbiAgICBpZiAoIW9iaktleXMpIHtcbiAgICAgICAgb2JqS2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG4gICAgfVxuXG4gICAgaWYgKHNvcnQpIHtcbiAgICAgICAgb2JqS2V5cy5zb3J0KHNvcnQpO1xuICAgIH1cblxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2JqS2V5cy5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIga2V5ID0gb2JqS2V5c1tpXTtcblxuICAgICAgICBpZiAoc2tpcE51bGxzICYmIG9ialtrZXldID09PSBudWxsKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGtleXMgPSBrZXlzLmNvbmNhdChzdHJpbmdpZnkoXG4gICAgICAgICAgICBvYmpba2V5XSxcbiAgICAgICAgICAgIGtleSxcbiAgICAgICAgICAgIGdlbmVyYXRlQXJyYXlQcmVmaXgsXG4gICAgICAgICAgICBzdHJpY3ROdWxsSGFuZGxpbmcsXG4gICAgICAgICAgICBza2lwTnVsbHMsXG4gICAgICAgICAgICBlbmNvZGUgPyBlbmNvZGVyIDogbnVsbCxcbiAgICAgICAgICAgIGZpbHRlcixcbiAgICAgICAgICAgIHNvcnQsXG4gICAgICAgICAgICBhbGxvd0RvdHMsXG4gICAgICAgICAgICBzZXJpYWxpemVEYXRlLFxuICAgICAgICAgICAgZm9ybWF0dGVyLFxuICAgICAgICAgICAgZW5jb2RlVmFsdWVzT25seVxuICAgICAgICApKTtcbiAgICB9XG5cbiAgICB2YXIgam9pbmVkID0ga2V5cy5qb2luKGRlbGltaXRlcik7XG4gICAgdmFyIHByZWZpeCA9IG9wdGlvbnMuYWRkUXVlcnlQcmVmaXggPT09IHRydWUgPyAnPycgOiAnJztcblxuICAgIHJldHVybiBqb2luZWQubGVuZ3RoID4gMCA/IHByZWZpeCArIGpvaW5lZCA6ICcnO1xufTtcbiIsIid1c2Ugc3RyaWN0JztcblxudmFyIGhhcyA9IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHk7XG5cbnZhciBoZXhUYWJsZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGFycmF5ID0gW107XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCAyNTY7ICsraSkge1xuICAgICAgICBhcnJheS5wdXNoKCclJyArICgoaSA8IDE2ID8gJzAnIDogJycpICsgaS50b1N0cmluZygxNikpLnRvVXBwZXJDYXNlKCkpO1xuICAgIH1cblxuICAgIHJldHVybiBhcnJheTtcbn0oKSk7XG5cbnZhciBjb21wYWN0UXVldWUgPSBmdW5jdGlvbiBjb21wYWN0UXVldWUocXVldWUpIHtcbiAgICB2YXIgb2JqO1xuXG4gICAgd2hpbGUgKHF1ZXVlLmxlbmd0aCkge1xuICAgICAgICB2YXIgaXRlbSA9IHF1ZXVlLnBvcCgpO1xuICAgICAgICBvYmogPSBpdGVtLm9ialtpdGVtLnByb3BdO1xuXG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcbiAgICAgICAgICAgIHZhciBjb21wYWN0ZWQgPSBbXTtcblxuICAgICAgICAgICAgZm9yICh2YXIgaiA9IDA7IGogPCBvYmoubGVuZ3RoOyArK2opIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIG9ialtqXSAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgY29tcGFjdGVkLnB1c2gob2JqW2pdKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGl0ZW0ub2JqW2l0ZW0ucHJvcF0gPSBjb21wYWN0ZWQ7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gb2JqO1xufTtcblxudmFyIGFycmF5VG9PYmplY3QgPSBmdW5jdGlvbiBhcnJheVRvT2JqZWN0KHNvdXJjZSwgb3B0aW9ucykge1xuICAgIHZhciBvYmogPSBvcHRpb25zICYmIG9wdGlvbnMucGxhaW5PYmplY3RzID8gT2JqZWN0LmNyZWF0ZShudWxsKSA6IHt9O1xuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgc291cmNlLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc291cmNlW2ldICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgb2JqW2ldID0gc291cmNlW2ldO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG9iajtcbn07XG5cbnZhciBtZXJnZSA9IGZ1bmN0aW9uIG1lcmdlKHRhcmdldCwgc291cmNlLCBvcHRpb25zKSB7XG4gICAgaWYgKCFzb3VyY2UpIHtcbiAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHNvdXJjZSAhPT0gJ29iamVjdCcpIHtcbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkodGFyZ2V0KSkge1xuICAgICAgICAgICAgdGFyZ2V0LnB1c2goc291cmNlKTtcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdGFyZ2V0ID09PSAnb2JqZWN0Jykge1xuICAgICAgICAgICAgaWYgKG9wdGlvbnMucGxhaW5PYmplY3RzIHx8IG9wdGlvbnMuYWxsb3dQcm90b3R5cGVzIHx8ICFoYXMuY2FsbChPYmplY3QucHJvdG90eXBlLCBzb3VyY2UpKSB7XG4gICAgICAgICAgICAgICAgdGFyZ2V0W3NvdXJjZV0gPSB0cnVlO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIFt0YXJnZXQsIHNvdXJjZV07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgdGFyZ2V0ICE9PSAnb2JqZWN0Jykge1xuICAgICAgICByZXR1cm4gW3RhcmdldF0uY29uY2F0KHNvdXJjZSk7XG4gICAgfVxuXG4gICAgdmFyIG1lcmdlVGFyZ2V0ID0gdGFyZ2V0O1xuICAgIGlmIChBcnJheS5pc0FycmF5KHRhcmdldCkgJiYgIUFycmF5LmlzQXJyYXkoc291cmNlKSkge1xuICAgICAgICBtZXJnZVRhcmdldCA9IGFycmF5VG9PYmplY3QodGFyZ2V0LCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBpZiAoQXJyYXkuaXNBcnJheSh0YXJnZXQpICYmIEFycmF5LmlzQXJyYXkoc291cmNlKSkge1xuICAgICAgICBzb3VyY2UuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSwgaSkge1xuICAgICAgICAgICAgaWYgKGhhcy5jYWxsKHRhcmdldCwgaSkpIHtcbiAgICAgICAgICAgICAgICBpZiAodGFyZ2V0W2ldICYmIHR5cGVvZiB0YXJnZXRbaV0gPT09ICdvYmplY3QnKSB7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldFtpXSA9IG1lcmdlKHRhcmdldFtpXSwgaXRlbSwgb3B0aW9ucyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LnB1c2goaXRlbSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0YXJnZXRbaV0gPSBpdGVtO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICB9XG5cbiAgICByZXR1cm4gT2JqZWN0LmtleXMoc291cmNlKS5yZWR1Y2UoZnVuY3Rpb24gKGFjYywga2V5KSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IHNvdXJjZVtrZXldO1xuXG4gICAgICAgIGlmIChoYXMuY2FsbChhY2MsIGtleSkpIHtcbiAgICAgICAgICAgIGFjY1trZXldID0gbWVyZ2UoYWNjW2tleV0sIHZhbHVlLCBvcHRpb25zKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGFjY1trZXldID0gdmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICB9LCBtZXJnZVRhcmdldCk7XG59O1xuXG52YXIgYXNzaWduID0gZnVuY3Rpb24gYXNzaWduU2luZ2xlU291cmNlKHRhcmdldCwgc291cmNlKSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKHNvdXJjZSkucmVkdWNlKGZ1bmN0aW9uIChhY2MsIGtleSkge1xuICAgICAgICBhY2Nba2V5XSA9IHNvdXJjZVtrZXldO1xuICAgICAgICByZXR1cm4gYWNjO1xuICAgIH0sIHRhcmdldCk7XG59O1xuXG52YXIgZGVjb2RlID0gZnVuY3Rpb24gKHN0cikge1xuICAgIHRyeSB7XG4gICAgICAgIHJldHVybiBkZWNvZGVVUklDb21wb25lbnQoc3RyLnJlcGxhY2UoL1xcKy9nLCAnICcpKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgfVxufTtcblxudmFyIGVuY29kZSA9IGZ1bmN0aW9uIGVuY29kZShzdHIpIHtcbiAgICAvLyBUaGlzIGNvZGUgd2FzIG9yaWdpbmFsbHkgd3JpdHRlbiBieSBCcmlhbiBXaGl0ZSAobXNjZGV4KSBmb3IgdGhlIGlvLmpzIGNvcmUgcXVlcnlzdHJpbmcgbGlicmFyeS5cbiAgICAvLyBJdCBoYXMgYmVlbiBhZGFwdGVkIGhlcmUgZm9yIHN0cmljdGVyIGFkaGVyZW5jZSB0byBSRkMgMzk4NlxuICAgIGlmIChzdHIubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiBzdHI7XG4gICAgfVxuXG4gICAgdmFyIHN0cmluZyA9IHR5cGVvZiBzdHIgPT09ICdzdHJpbmcnID8gc3RyIDogU3RyaW5nKHN0cik7XG5cbiAgICB2YXIgb3V0ID0gJyc7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHJpbmcubGVuZ3RoOyArK2kpIHtcbiAgICAgICAgdmFyIGMgPSBzdHJpbmcuY2hhckNvZGVBdChpKTtcblxuICAgICAgICBpZiAoXG4gICAgICAgICAgICBjID09PSAweDJEIC8vIC1cbiAgICAgICAgICAgIHx8IGMgPT09IDB4MkUgLy8gLlxuICAgICAgICAgICAgfHwgYyA9PT0gMHg1RiAvLyBfXG4gICAgICAgICAgICB8fCBjID09PSAweDdFIC8vIH5cbiAgICAgICAgICAgIHx8IChjID49IDB4MzAgJiYgYyA8PSAweDM5KSAvLyAwLTlcbiAgICAgICAgICAgIHx8IChjID49IDB4NDEgJiYgYyA8PSAweDVBKSAvLyBhLXpcbiAgICAgICAgICAgIHx8IChjID49IDB4NjEgJiYgYyA8PSAweDdBKSAvLyBBLVpcbiAgICAgICAgKSB7XG4gICAgICAgICAgICBvdXQgKz0gc3RyaW5nLmNoYXJBdChpKTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGMgPCAweDgwKSB7XG4gICAgICAgICAgICBvdXQgPSBvdXQgKyBoZXhUYWJsZVtjXTtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGMgPCAweDgwMCkge1xuICAgICAgICAgICAgb3V0ID0gb3V0ICsgKGhleFRhYmxlWzB4QzAgfCAoYyA+PiA2KV0gKyBoZXhUYWJsZVsweDgwIHwgKGMgJiAweDNGKV0pO1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYyA8IDB4RDgwMCB8fCBjID49IDB4RTAwMCkge1xuICAgICAgICAgICAgb3V0ID0gb3V0ICsgKGhleFRhYmxlWzB4RTAgfCAoYyA+PiAxMildICsgaGV4VGFibGVbMHg4MCB8ICgoYyA+PiA2KSAmIDB4M0YpXSArIGhleFRhYmxlWzB4ODAgfCAoYyAmIDB4M0YpXSk7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGkgKz0gMTtcbiAgICAgICAgYyA9IDB4MTAwMDAgKyAoKChjICYgMHgzRkYpIDw8IDEwKSB8IChzdHJpbmcuY2hhckNvZGVBdChpKSAmIDB4M0ZGKSk7XG4gICAgICAgIG91dCArPSBoZXhUYWJsZVsweEYwIHwgKGMgPj4gMTgpXVxuICAgICAgICAgICAgKyBoZXhUYWJsZVsweDgwIHwgKChjID4+IDEyKSAmIDB4M0YpXVxuICAgICAgICAgICAgKyBoZXhUYWJsZVsweDgwIHwgKChjID4+IDYpICYgMHgzRildXG4gICAgICAgICAgICArIGhleFRhYmxlWzB4ODAgfCAoYyAmIDB4M0YpXTtcbiAgICB9XG5cbiAgICByZXR1cm4gb3V0O1xufTtcblxudmFyIGNvbXBhY3QgPSBmdW5jdGlvbiBjb21wYWN0KHZhbHVlKSB7XG4gICAgdmFyIHF1ZXVlID0gW3sgb2JqOiB7IG86IHZhbHVlIH0sIHByb3A6ICdvJyB9XTtcbiAgICB2YXIgcmVmcyA9IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBxdWV1ZS5sZW5ndGg7ICsraSkge1xuICAgICAgICB2YXIgaXRlbSA9IHF1ZXVlW2ldO1xuICAgICAgICB2YXIgb2JqID0gaXRlbS5vYmpbaXRlbS5wcm9wXTtcblxuICAgICAgICB2YXIga2V5cyA9IE9iamVjdC5rZXlzKG9iaik7XG4gICAgICAgIGZvciAodmFyIGogPSAwOyBqIDwga2V5cy5sZW5ndGg7ICsraikge1xuICAgICAgICAgICAgdmFyIGtleSA9IGtleXNbal07XG4gICAgICAgICAgICB2YXIgdmFsID0gb2JqW2tleV07XG4gICAgICAgICAgICBpZiAodHlwZW9mIHZhbCA9PT0gJ29iamVjdCcgJiYgdmFsICE9PSBudWxsICYmIHJlZnMuaW5kZXhPZih2YWwpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIHF1ZXVlLnB1c2goeyBvYmo6IG9iaiwgcHJvcDoga2V5IH0pO1xuICAgICAgICAgICAgICAgIHJlZnMucHVzaCh2YWwpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbXBhY3RRdWV1ZShxdWV1ZSk7XG59O1xuXG52YXIgaXNSZWdFeHAgPSBmdW5jdGlvbiBpc1JlZ0V4cChvYmopIHtcbiAgICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKG9iaikgPT09ICdbb2JqZWN0IFJlZ0V4cF0nO1xufTtcblxudmFyIGlzQnVmZmVyID0gZnVuY3Rpb24gaXNCdWZmZXIob2JqKSB7XG4gICAgaWYgKG9iaiA9PT0gbnVsbCB8fCB0eXBlb2Ygb2JqID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuICEhKG9iai5jb25zdHJ1Y3RvciAmJiBvYmouY29uc3RydWN0b3IuaXNCdWZmZXIgJiYgb2JqLmNvbnN0cnVjdG9yLmlzQnVmZmVyKG9iaikpO1xufTtcblxubW9kdWxlLmV4cG9ydHMgPSB7XG4gICAgYXJyYXlUb09iamVjdDogYXJyYXlUb09iamVjdCxcbiAgICBhc3NpZ246IGFzc2lnbixcbiAgICBjb21wYWN0OiBjb21wYWN0LFxuICAgIGRlY29kZTogZGVjb2RlLFxuICAgIGVuY29kZTogZW5jb2RlLFxuICAgIGlzQnVmZmVyOiBpc0J1ZmZlcixcbiAgICBpc1JlZ0V4cDogaXNSZWdFeHAsXG4gICAgbWVyZ2U6IG1lcmdlXG59O1xuIiwiLyoqXG4gKiBDb3B5cmlnaHQgKGMpIDIwMTQsIEZhY2Vib29rLCBJbmMuXG4gKiBBbGwgcmlnaHRzIHJlc2VydmVkLlxuICpcbiAqIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEJTRC1zdHlsZSBsaWNlbnNlIGZvdW5kIGluIHRoZVxuICogaHR0cHM6Ly9yYXcuZ2l0aHViLmNvbS9mYWNlYm9vay9yZWdlbmVyYXRvci9tYXN0ZXIvTElDRU5TRSBmaWxlLiBBblxuICogYWRkaXRpb25hbCBncmFudCBvZiBwYXRlbnQgcmlnaHRzIGNhbiBiZSBmb3VuZCBpbiB0aGUgUEFURU5UUyBmaWxlIGluXG4gKiB0aGUgc2FtZSBkaXJlY3RvcnkuXG4gKi9cblxuIShmdW5jdGlvbihnbG9iYWwpIHtcbiAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgdmFyIE9wID0gT2JqZWN0LnByb3RvdHlwZTtcbiAgdmFyIGhhc093biA9IE9wLmhhc093blByb3BlcnR5O1xuICB2YXIgdW5kZWZpbmVkOyAvLyBNb3JlIGNvbXByZXNzaWJsZSB0aGFuIHZvaWQgMC5cbiAgdmFyICRTeW1ib2wgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgPyBTeW1ib2wgOiB7fTtcbiAgdmFyIGl0ZXJhdG9yU3ltYm9sID0gJFN5bWJvbC5pdGVyYXRvciB8fCBcIkBAaXRlcmF0b3JcIjtcbiAgdmFyIGFzeW5jSXRlcmF0b3JTeW1ib2wgPSAkU3ltYm9sLmFzeW5jSXRlcmF0b3IgfHwgXCJAQGFzeW5jSXRlcmF0b3JcIjtcbiAgdmFyIHRvU3RyaW5nVGFnU3ltYm9sID0gJFN5bWJvbC50b1N0cmluZ1RhZyB8fCBcIkBAdG9TdHJpbmdUYWdcIjtcblxuICB2YXIgaW5Nb2R1bGUgPSB0eXBlb2YgbW9kdWxlID09PSBcIm9iamVjdFwiO1xuICB2YXIgcnVudGltZSA9IGdsb2JhbC5yZWdlbmVyYXRvclJ1bnRpbWU7XG4gIGlmIChydW50aW1lKSB7XG4gICAgaWYgKGluTW9kdWxlKSB7XG4gICAgICAvLyBJZiByZWdlbmVyYXRvclJ1bnRpbWUgaXMgZGVmaW5lZCBnbG9iYWxseSBhbmQgd2UncmUgaW4gYSBtb2R1bGUsXG4gICAgICAvLyBtYWtlIHRoZSBleHBvcnRzIG9iamVjdCBpZGVudGljYWwgdG8gcmVnZW5lcmF0b3JSdW50aW1lLlxuICAgICAgbW9kdWxlLmV4cG9ydHMgPSBydW50aW1lO1xuICAgIH1cbiAgICAvLyBEb24ndCBib3RoZXIgZXZhbHVhdGluZyB0aGUgcmVzdCBvZiB0aGlzIGZpbGUgaWYgdGhlIHJ1bnRpbWUgd2FzXG4gICAgLy8gYWxyZWFkeSBkZWZpbmVkIGdsb2JhbGx5LlxuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIERlZmluZSB0aGUgcnVudGltZSBnbG9iYWxseSAoYXMgZXhwZWN0ZWQgYnkgZ2VuZXJhdGVkIGNvZGUpIGFzIGVpdGhlclxuICAvLyBtb2R1bGUuZXhwb3J0cyAoaWYgd2UncmUgaW4gYSBtb2R1bGUpIG9yIGEgbmV3LCBlbXB0eSBvYmplY3QuXG4gIHJ1bnRpbWUgPSBnbG9iYWwucmVnZW5lcmF0b3JSdW50aW1lID0gaW5Nb2R1bGUgPyBtb2R1bGUuZXhwb3J0cyA6IHt9O1xuXG4gIGZ1bmN0aW9uIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBJZiBvdXRlckZuIHByb3ZpZGVkIGFuZCBvdXRlckZuLnByb3RvdHlwZSBpcyBhIEdlbmVyYXRvciwgdGhlbiBvdXRlckZuLnByb3RvdHlwZSBpbnN0YW5jZW9mIEdlbmVyYXRvci5cbiAgICB2YXIgcHJvdG9HZW5lcmF0b3IgPSBvdXRlckZuICYmIG91dGVyRm4ucHJvdG90eXBlIGluc3RhbmNlb2YgR2VuZXJhdG9yID8gb3V0ZXJGbiA6IEdlbmVyYXRvcjtcbiAgICB2YXIgZ2VuZXJhdG9yID0gT2JqZWN0LmNyZWF0ZShwcm90b0dlbmVyYXRvci5wcm90b3R5cGUpO1xuICAgIHZhciBjb250ZXh0ID0gbmV3IENvbnRleHQodHJ5TG9jc0xpc3QgfHwgW10pO1xuXG4gICAgLy8gVGhlIC5faW52b2tlIG1ldGhvZCB1bmlmaWVzIHRoZSBpbXBsZW1lbnRhdGlvbnMgb2YgdGhlIC5uZXh0LFxuICAgIC8vIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcy5cbiAgICBnZW5lcmF0b3IuX2ludm9rZSA9IG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCk7XG5cbiAgICByZXR1cm4gZ2VuZXJhdG9yO1xuICB9XG4gIHJ1bnRpbWUud3JhcCA9IHdyYXA7XG5cbiAgLy8gVHJ5L2NhdGNoIGhlbHBlciB0byBtaW5pbWl6ZSBkZW9wdGltaXphdGlvbnMuIFJldHVybnMgYSBjb21wbGV0aW9uXG4gIC8vIHJlY29yZCBsaWtlIGNvbnRleHQudHJ5RW50cmllc1tpXS5jb21wbGV0aW9uLiBUaGlzIGludGVyZmFjZSBjb3VsZFxuICAvLyBoYXZlIGJlZW4gKGFuZCB3YXMgcHJldmlvdXNseSkgZGVzaWduZWQgdG8gdGFrZSBhIGNsb3N1cmUgdG8gYmVcbiAgLy8gaW52b2tlZCB3aXRob3V0IGFyZ3VtZW50cywgYnV0IGluIGFsbCB0aGUgY2FzZXMgd2UgY2FyZSBhYm91dCB3ZVxuICAvLyBhbHJlYWR5IGhhdmUgYW4gZXhpc3RpbmcgbWV0aG9kIHdlIHdhbnQgdG8gY2FsbCwgc28gdGhlcmUncyBubyBuZWVkXG4gIC8vIHRvIGNyZWF0ZSBhIG5ldyBmdW5jdGlvbiBvYmplY3QuIFdlIGNhbiBldmVuIGdldCBhd2F5IHdpdGggYXNzdW1pbmdcbiAgLy8gdGhlIG1ldGhvZCB0YWtlcyBleGFjdGx5IG9uZSBhcmd1bWVudCwgc2luY2UgdGhhdCBoYXBwZW5zIHRvIGJlIHRydWVcbiAgLy8gaW4gZXZlcnkgY2FzZSwgc28gd2UgZG9uJ3QgaGF2ZSB0byB0b3VjaCB0aGUgYXJndW1lbnRzIG9iamVjdC4gVGhlXG4gIC8vIG9ubHkgYWRkaXRpb25hbCBhbGxvY2F0aW9uIHJlcXVpcmVkIGlzIHRoZSBjb21wbGV0aW9uIHJlY29yZCwgd2hpY2hcbiAgLy8gaGFzIGEgc3RhYmxlIHNoYXBlIGFuZCBzbyBob3BlZnVsbHkgc2hvdWxkIGJlIGNoZWFwIHRvIGFsbG9jYXRlLlxuICBmdW5jdGlvbiB0cnlDYXRjaChmbiwgb2JqLCBhcmcpIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIHsgdHlwZTogXCJub3JtYWxcIiwgYXJnOiBmbi5jYWxsKG9iaiwgYXJnKSB9O1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmV0dXJuIHsgdHlwZTogXCJ0aHJvd1wiLCBhcmc6IGVyciB9O1xuICAgIH1cbiAgfVxuXG4gIHZhciBHZW5TdGF0ZVN1c3BlbmRlZFN0YXJ0ID0gXCJzdXNwZW5kZWRTdGFydFwiO1xuICB2YXIgR2VuU3RhdGVTdXNwZW5kZWRZaWVsZCA9IFwic3VzcGVuZGVkWWllbGRcIjtcbiAgdmFyIEdlblN0YXRlRXhlY3V0aW5nID0gXCJleGVjdXRpbmdcIjtcbiAgdmFyIEdlblN0YXRlQ29tcGxldGVkID0gXCJjb21wbGV0ZWRcIjtcblxuICAvLyBSZXR1cm5pbmcgdGhpcyBvYmplY3QgZnJvbSB0aGUgaW5uZXJGbiBoYXMgdGhlIHNhbWUgZWZmZWN0IGFzXG4gIC8vIGJyZWFraW5nIG91dCBvZiB0aGUgZGlzcGF0Y2ggc3dpdGNoIHN0YXRlbWVudC5cbiAgdmFyIENvbnRpbnVlU2VudGluZWwgPSB7fTtcblxuICAvLyBEdW1teSBjb25zdHJ1Y3RvciBmdW5jdGlvbnMgdGhhdCB3ZSB1c2UgYXMgdGhlIC5jb25zdHJ1Y3RvciBhbmRcbiAgLy8gLmNvbnN0cnVjdG9yLnByb3RvdHlwZSBwcm9wZXJ0aWVzIGZvciBmdW5jdGlvbnMgdGhhdCByZXR1cm4gR2VuZXJhdG9yXG4gIC8vIG9iamVjdHMuIEZvciBmdWxsIHNwZWMgY29tcGxpYW5jZSwgeW91IG1heSB3aXNoIHRvIGNvbmZpZ3VyZSB5b3VyXG4gIC8vIG1pbmlmaWVyIG5vdCB0byBtYW5nbGUgdGhlIG5hbWVzIG9mIHRoZXNlIHR3byBmdW5jdGlvbnMuXG4gIGZ1bmN0aW9uIEdlbmVyYXRvcigpIHt9XG4gIGZ1bmN0aW9uIEdlbmVyYXRvckZ1bmN0aW9uKCkge31cbiAgZnVuY3Rpb24gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUoKSB7fVxuXG4gIC8vIFRoaXMgaXMgYSBwb2x5ZmlsbCBmb3IgJUl0ZXJhdG9yUHJvdG90eXBlJSBmb3IgZW52aXJvbm1lbnRzIHRoYXRcbiAgLy8gZG9uJ3QgbmF0aXZlbHkgc3VwcG9ydCBpdC5cbiAgdmFyIEl0ZXJhdG9yUHJvdG90eXBlID0ge307XG4gIEl0ZXJhdG9yUHJvdG90eXBlW2l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcblxuICB2YXIgZ2V0UHJvdG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Y7XG4gIHZhciBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSA9IGdldFByb3RvICYmIGdldFByb3RvKGdldFByb3RvKHZhbHVlcyhbXSkpKTtcbiAgaWYgKE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlICYmXG4gICAgICBOYXRpdmVJdGVyYXRvclByb3RvdHlwZSAhPT0gT3AgJiZcbiAgICAgIGhhc093bi5jYWxsKE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlLCBpdGVyYXRvclN5bWJvbCkpIHtcbiAgICAvLyBUaGlzIGVudmlyb25tZW50IGhhcyBhIG5hdGl2ZSAlSXRlcmF0b3JQcm90b3R5cGUlOyB1c2UgaXQgaW5zdGVhZFxuICAgIC8vIG9mIHRoZSBwb2x5ZmlsbC5cbiAgICBJdGVyYXRvclByb3RvdHlwZSA9IE5hdGl2ZUl0ZXJhdG9yUHJvdG90eXBlO1xuICB9XG5cbiAgdmFyIEdwID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUucHJvdG90eXBlID1cbiAgICBHZW5lcmF0b3IucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShJdGVyYXRvclByb3RvdHlwZSk7XG4gIEdlbmVyYXRvckZ1bmN0aW9uLnByb3RvdHlwZSA9IEdwLmNvbnN0cnVjdG9yID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGU7XG4gIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlLmNvbnN0cnVjdG9yID0gR2VuZXJhdG9yRnVuY3Rpb247XG4gIEdlbmVyYXRvckZ1bmN0aW9uUHJvdG90eXBlW3RvU3RyaW5nVGFnU3ltYm9sXSA9XG4gICAgR2VuZXJhdG9yRnVuY3Rpb24uZGlzcGxheU5hbWUgPSBcIkdlbmVyYXRvckZ1bmN0aW9uXCI7XG5cbiAgLy8gSGVscGVyIGZvciBkZWZpbmluZyB0aGUgLm5leHQsIC50aHJvdywgYW5kIC5yZXR1cm4gbWV0aG9kcyBvZiB0aGVcbiAgLy8gSXRlcmF0b3IgaW50ZXJmYWNlIGluIHRlcm1zIG9mIGEgc2luZ2xlIC5faW52b2tlIG1ldGhvZC5cbiAgZnVuY3Rpb24gZGVmaW5lSXRlcmF0b3JNZXRob2RzKHByb3RvdHlwZSkge1xuICAgIFtcIm5leHRcIiwgXCJ0aHJvd1wiLCBcInJldHVyblwiXS5mb3JFYWNoKGZ1bmN0aW9uKG1ldGhvZCkge1xuICAgICAgcHJvdG90eXBlW21ldGhvZF0gPSBmdW5jdGlvbihhcmcpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ludm9rZShtZXRob2QsIGFyZyk7XG4gICAgICB9O1xuICAgIH0pO1xuICB9XG5cbiAgcnVudGltZS5pc0dlbmVyYXRvckZ1bmN0aW9uID0gZnVuY3Rpb24oZ2VuRnVuKSB7XG4gICAgdmFyIGN0b3IgPSB0eXBlb2YgZ2VuRnVuID09PSBcImZ1bmN0aW9uXCIgJiYgZ2VuRnVuLmNvbnN0cnVjdG9yO1xuICAgIHJldHVybiBjdG9yXG4gICAgICA/IGN0b3IgPT09IEdlbmVyYXRvckZ1bmN0aW9uIHx8XG4gICAgICAgIC8vIEZvciB0aGUgbmF0aXZlIEdlbmVyYXRvckZ1bmN0aW9uIGNvbnN0cnVjdG9yLCB0aGUgYmVzdCB3ZSBjYW5cbiAgICAgICAgLy8gZG8gaXMgdG8gY2hlY2sgaXRzIC5uYW1lIHByb3BlcnR5LlxuICAgICAgICAoY3Rvci5kaXNwbGF5TmFtZSB8fCBjdG9yLm5hbWUpID09PSBcIkdlbmVyYXRvckZ1bmN0aW9uXCJcbiAgICAgIDogZmFsc2U7XG4gIH07XG5cbiAgcnVudGltZS5tYXJrID0gZnVuY3Rpb24oZ2VuRnVuKSB7XG4gICAgaWYgKE9iamVjdC5zZXRQcm90b3R5cGVPZikge1xuICAgICAgT2JqZWN0LnNldFByb3RvdHlwZU9mKGdlbkZ1biwgR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBnZW5GdW4uX19wcm90b19fID0gR2VuZXJhdG9yRnVuY3Rpb25Qcm90b3R5cGU7XG4gICAgICBpZiAoISh0b1N0cmluZ1RhZ1N5bWJvbCBpbiBnZW5GdW4pKSB7XG4gICAgICAgIGdlbkZ1blt0b1N0cmluZ1RhZ1N5bWJvbF0gPSBcIkdlbmVyYXRvckZ1bmN0aW9uXCI7XG4gICAgICB9XG4gICAgfVxuICAgIGdlbkZ1bi5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKEdwKTtcbiAgICByZXR1cm4gZ2VuRnVuO1xuICB9O1xuXG4gIC8vIFdpdGhpbiB0aGUgYm9keSBvZiBhbnkgYXN5bmMgZnVuY3Rpb24sIGBhd2FpdCB4YCBpcyB0cmFuc2Zvcm1lZCB0b1xuICAvLyBgeWllbGQgcmVnZW5lcmF0b3JSdW50aW1lLmF3cmFwKHgpYCwgc28gdGhhdCB0aGUgcnVudGltZSBjYW4gdGVzdFxuICAvLyBgaGFzT3duLmNhbGwodmFsdWUsIFwiX19hd2FpdFwiKWAgdG8gZGV0ZXJtaW5lIGlmIHRoZSB5aWVsZGVkIHZhbHVlIGlzXG4gIC8vIG1lYW50IHRvIGJlIGF3YWl0ZWQuXG4gIHJ1bnRpbWUuYXdyYXAgPSBmdW5jdGlvbihhcmcpIHtcbiAgICByZXR1cm4geyBfX2F3YWl0OiBhcmcgfTtcbiAgfTtcblxuICBmdW5jdGlvbiBBc3luY0l0ZXJhdG9yKGdlbmVyYXRvcikge1xuICAgIGZ1bmN0aW9uIGludm9rZShtZXRob2QsIGFyZywgcmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICB2YXIgcmVjb3JkID0gdHJ5Q2F0Y2goZ2VuZXJhdG9yW21ldGhvZF0sIGdlbmVyYXRvciwgYXJnKTtcbiAgICAgIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgIHJlamVjdChyZWNvcmQuYXJnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciByZXN1bHQgPSByZWNvcmQuYXJnO1xuICAgICAgICB2YXIgdmFsdWUgPSByZXN1bHQudmFsdWU7XG4gICAgICAgIGlmICh2YWx1ZSAmJlxuICAgICAgICAgICAgdHlwZW9mIHZhbHVlID09PSBcIm9iamVjdFwiICYmXG4gICAgICAgICAgICBoYXNPd24uY2FsbCh2YWx1ZSwgXCJfX2F3YWl0XCIpKSB7XG4gICAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh2YWx1ZS5fX2F3YWl0KS50aGVuKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICBpbnZva2UoXCJuZXh0XCIsIHZhbHVlLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0sIGZ1bmN0aW9uKGVycikge1xuICAgICAgICAgICAgaW52b2tlKFwidGhyb3dcIiwgZXJyLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSh2YWx1ZSkudGhlbihmdW5jdGlvbih1bndyYXBwZWQpIHtcbiAgICAgICAgICAvLyBXaGVuIGEgeWllbGRlZCBQcm9taXNlIGlzIHJlc29sdmVkLCBpdHMgZmluYWwgdmFsdWUgYmVjb21lc1xuICAgICAgICAgIC8vIHRoZSAudmFsdWUgb2YgdGhlIFByb21pc2U8e3ZhbHVlLGRvbmV9PiByZXN1bHQgZm9yIHRoZVxuICAgICAgICAgIC8vIGN1cnJlbnQgaXRlcmF0aW9uLiBJZiB0aGUgUHJvbWlzZSBpcyByZWplY3RlZCwgaG93ZXZlciwgdGhlXG4gICAgICAgICAgLy8gcmVzdWx0IGZvciB0aGlzIGl0ZXJhdGlvbiB3aWxsIGJlIHJlamVjdGVkIHdpdGggdGhlIHNhbWVcbiAgICAgICAgICAvLyByZWFzb24uIE5vdGUgdGhhdCByZWplY3Rpb25zIG9mIHlpZWxkZWQgUHJvbWlzZXMgYXJlIG5vdFxuICAgICAgICAgIC8vIHRocm93biBiYWNrIGludG8gdGhlIGdlbmVyYXRvciBmdW5jdGlvbiwgYXMgaXMgdGhlIGNhc2VcbiAgICAgICAgICAvLyB3aGVuIGFuIGF3YWl0ZWQgUHJvbWlzZSBpcyByZWplY3RlZC4gVGhpcyBkaWZmZXJlbmNlIGluXG4gICAgICAgICAgLy8gYmVoYXZpb3IgYmV0d2VlbiB5aWVsZCBhbmQgYXdhaXQgaXMgaW1wb3J0YW50LCBiZWNhdXNlIGl0XG4gICAgICAgICAgLy8gYWxsb3dzIHRoZSBjb25zdW1lciB0byBkZWNpZGUgd2hhdCB0byBkbyB3aXRoIHRoZSB5aWVsZGVkXG4gICAgICAgICAgLy8gcmVqZWN0aW9uIChzd2FsbG93IGl0IGFuZCBjb250aW51ZSwgbWFudWFsbHkgLnRocm93IGl0IGJhY2tcbiAgICAgICAgICAvLyBpbnRvIHRoZSBnZW5lcmF0b3IsIGFiYW5kb24gaXRlcmF0aW9uLCB3aGF0ZXZlcikuIFdpdGhcbiAgICAgICAgICAvLyBhd2FpdCwgYnkgY29udHJhc3QsIHRoZXJlIGlzIG5vIG9wcG9ydHVuaXR5IHRvIGV4YW1pbmUgdGhlXG4gICAgICAgICAgLy8gcmVqZWN0aW9uIHJlYXNvbiBvdXRzaWRlIHRoZSBnZW5lcmF0b3IgZnVuY3Rpb24sIHNvIHRoZVxuICAgICAgICAgIC8vIG9ubHkgb3B0aW9uIGlzIHRvIHRocm93IGl0IGZyb20gdGhlIGF3YWl0IGV4cHJlc3Npb24sIGFuZFxuICAgICAgICAgIC8vIGxldCB0aGUgZ2VuZXJhdG9yIGZ1bmN0aW9uIGhhbmRsZSB0aGUgZXhjZXB0aW9uLlxuICAgICAgICAgIHJlc3VsdC52YWx1ZSA9IHVud3JhcHBlZDtcbiAgICAgICAgICByZXNvbHZlKHJlc3VsdCk7XG4gICAgICAgIH0sIHJlamVjdCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHR5cGVvZiBnbG9iYWwucHJvY2VzcyA9PT0gXCJvYmplY3RcIiAmJiBnbG9iYWwucHJvY2Vzcy5kb21haW4pIHtcbiAgICAgIGludm9rZSA9IGdsb2JhbC5wcm9jZXNzLmRvbWFpbi5iaW5kKGludm9rZSk7XG4gICAgfVxuXG4gICAgdmFyIHByZXZpb3VzUHJvbWlzZTtcblxuICAgIGZ1bmN0aW9uIGVucXVldWUobWV0aG9kLCBhcmcpIHtcbiAgICAgIGZ1bmN0aW9uIGNhbGxJbnZva2VXaXRoTWV0aG9kQW5kQXJnKCkge1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24ocmVzb2x2ZSwgcmVqZWN0KSB7XG4gICAgICAgICAgaW52b2tlKG1ldGhvZCwgYXJnLCByZXNvbHZlLCByZWplY3QpO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHByZXZpb3VzUHJvbWlzZSA9XG4gICAgICAgIC8vIElmIGVucXVldWUgaGFzIGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiB3ZSB3YW50IHRvIHdhaXQgdW50aWxcbiAgICAgICAgLy8gYWxsIHByZXZpb3VzIFByb21pc2VzIGhhdmUgYmVlbiByZXNvbHZlZCBiZWZvcmUgY2FsbGluZyBpbnZva2UsXG4gICAgICAgIC8vIHNvIHRoYXQgcmVzdWx0cyBhcmUgYWx3YXlzIGRlbGl2ZXJlZCBpbiB0aGUgY29ycmVjdCBvcmRlci4gSWZcbiAgICAgICAgLy8gZW5xdWV1ZSBoYXMgbm90IGJlZW4gY2FsbGVkIGJlZm9yZSwgdGhlbiBpdCBpcyBpbXBvcnRhbnQgdG9cbiAgICAgICAgLy8gY2FsbCBpbnZva2UgaW1tZWRpYXRlbHksIHdpdGhvdXQgd2FpdGluZyBvbiBhIGNhbGxiYWNrIHRvIGZpcmUsXG4gICAgICAgIC8vIHNvIHRoYXQgdGhlIGFzeW5jIGdlbmVyYXRvciBmdW5jdGlvbiBoYXMgdGhlIG9wcG9ydHVuaXR5IHRvIGRvXG4gICAgICAgIC8vIGFueSBuZWNlc3Nhcnkgc2V0dXAgaW4gYSBwcmVkaWN0YWJsZSB3YXkuIFRoaXMgcHJlZGljdGFiaWxpdHlcbiAgICAgICAgLy8gaXMgd2h5IHRoZSBQcm9taXNlIGNvbnN0cnVjdG9yIHN5bmNocm9ub3VzbHkgaW52b2tlcyBpdHNcbiAgICAgICAgLy8gZXhlY3V0b3IgY2FsbGJhY2ssIGFuZCB3aHkgYXN5bmMgZnVuY3Rpb25zIHN5bmNocm9ub3VzbHlcbiAgICAgICAgLy8gZXhlY3V0ZSBjb2RlIGJlZm9yZSB0aGUgZmlyc3QgYXdhaXQuIFNpbmNlIHdlIGltcGxlbWVudCBzaW1wbGVcbiAgICAgICAgLy8gYXN5bmMgZnVuY3Rpb25zIGluIHRlcm1zIG9mIGFzeW5jIGdlbmVyYXRvcnMsIGl0IGlzIGVzcGVjaWFsbHlcbiAgICAgICAgLy8gaW1wb3J0YW50IHRvIGdldCB0aGlzIHJpZ2h0LCBldmVuIHRob3VnaCBpdCByZXF1aXJlcyBjYXJlLlxuICAgICAgICBwcmV2aW91c1Byb21pc2UgPyBwcmV2aW91c1Byb21pc2UudGhlbihcbiAgICAgICAgICBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZyxcbiAgICAgICAgICAvLyBBdm9pZCBwcm9wYWdhdGluZyBmYWlsdXJlcyB0byBQcm9taXNlcyByZXR1cm5lZCBieSBsYXRlclxuICAgICAgICAgIC8vIGludm9jYXRpb25zIG9mIHRoZSBpdGVyYXRvci5cbiAgICAgICAgICBjYWxsSW52b2tlV2l0aE1ldGhvZEFuZEFyZ1xuICAgICAgICApIDogY2FsbEludm9rZVdpdGhNZXRob2RBbmRBcmcoKTtcbiAgICB9XG5cbiAgICAvLyBEZWZpbmUgdGhlIHVuaWZpZWQgaGVscGVyIG1ldGhvZCB0aGF0IGlzIHVzZWQgdG8gaW1wbGVtZW50IC5uZXh0LFxuICAgIC8vIC50aHJvdywgYW5kIC5yZXR1cm4gKHNlZSBkZWZpbmVJdGVyYXRvck1ldGhvZHMpLlxuICAgIHRoaXMuX2ludm9rZSA9IGVucXVldWU7XG4gIH1cblxuICBkZWZpbmVJdGVyYXRvck1ldGhvZHMoQXN5bmNJdGVyYXRvci5wcm90b3R5cGUpO1xuICBBc3luY0l0ZXJhdG9yLnByb3RvdHlwZVthc3luY0l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gdGhpcztcbiAgfTtcbiAgcnVudGltZS5Bc3luY0l0ZXJhdG9yID0gQXN5bmNJdGVyYXRvcjtcblxuICAvLyBOb3RlIHRoYXQgc2ltcGxlIGFzeW5jIGZ1bmN0aW9ucyBhcmUgaW1wbGVtZW50ZWQgb24gdG9wIG9mXG4gIC8vIEFzeW5jSXRlcmF0b3Igb2JqZWN0czsgdGhleSBqdXN0IHJldHVybiBhIFByb21pc2UgZm9yIHRoZSB2YWx1ZSBvZlxuICAvLyB0aGUgZmluYWwgcmVzdWx0IHByb2R1Y2VkIGJ5IHRoZSBpdGVyYXRvci5cbiAgcnVudGltZS5hc3luYyA9IGZ1bmN0aW9uKGlubmVyRm4sIG91dGVyRm4sIHNlbGYsIHRyeUxvY3NMaXN0KSB7XG4gICAgdmFyIGl0ZXIgPSBuZXcgQXN5bmNJdGVyYXRvcihcbiAgICAgIHdyYXAoaW5uZXJGbiwgb3V0ZXJGbiwgc2VsZiwgdHJ5TG9jc0xpc3QpXG4gICAgKTtcblxuICAgIHJldHVybiBydW50aW1lLmlzR2VuZXJhdG9yRnVuY3Rpb24ob3V0ZXJGbilcbiAgICAgID8gaXRlciAvLyBJZiBvdXRlckZuIGlzIGEgZ2VuZXJhdG9yLCByZXR1cm4gdGhlIGZ1bGwgaXRlcmF0b3IuXG4gICAgICA6IGl0ZXIubmV4dCgpLnRoZW4oZnVuY3Rpb24ocmVzdWx0KSB7XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdC5kb25lID8gcmVzdWx0LnZhbHVlIDogaXRlci5uZXh0KCk7XG4gICAgICAgIH0pO1xuICB9O1xuXG4gIGZ1bmN0aW9uIG1ha2VJbnZva2VNZXRob2QoaW5uZXJGbiwgc2VsZiwgY29udGV4dCkge1xuICAgIHZhciBzdGF0ZSA9IEdlblN0YXRlU3VzcGVuZGVkU3RhcnQ7XG5cbiAgICByZXR1cm4gZnVuY3Rpb24gaW52b2tlKG1ldGhvZCwgYXJnKSB7XG4gICAgICBpZiAoc3RhdGUgPT09IEdlblN0YXRlRXhlY3V0aW5nKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIkdlbmVyYXRvciBpcyBhbHJlYWR5IHJ1bm5pbmdcIik7XG4gICAgICB9XG5cbiAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVDb21wbGV0ZWQpIHtcbiAgICAgICAgaWYgKG1ldGhvZCA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgdGhyb3cgYXJnO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gQmUgZm9yZ2l2aW5nLCBwZXIgMjUuMy4zLjMuMyBvZiB0aGUgc3BlYzpcbiAgICAgICAgLy8gaHR0cHM6Ly9wZW9wbGUubW96aWxsYS5vcmcvfmpvcmVuZG9yZmYvZXM2LWRyYWZ0Lmh0bWwjc2VjLWdlbmVyYXRvcnJlc3VtZVxuICAgICAgICByZXR1cm4gZG9uZVJlc3VsdCgpO1xuICAgICAgfVxuXG4gICAgICBjb250ZXh0Lm1ldGhvZCA9IG1ldGhvZDtcbiAgICAgIGNvbnRleHQuYXJnID0gYXJnO1xuXG4gICAgICB3aGlsZSAodHJ1ZSkge1xuICAgICAgICB2YXIgZGVsZWdhdGUgPSBjb250ZXh0LmRlbGVnYXRlO1xuICAgICAgICBpZiAoZGVsZWdhdGUpIHtcbiAgICAgICAgICB2YXIgZGVsZWdhdGVSZXN1bHQgPSBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KTtcbiAgICAgICAgICBpZiAoZGVsZWdhdGVSZXN1bHQpIHtcbiAgICAgICAgICAgIGlmIChkZWxlZ2F0ZVJlc3VsdCA9PT0gQ29udGludWVTZW50aW5lbCkgY29udGludWU7XG4gICAgICAgICAgICByZXR1cm4gZGVsZWdhdGVSZXN1bHQ7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbnRleHQubWV0aG9kID09PSBcIm5leHRcIikge1xuICAgICAgICAgIC8vIFNldHRpbmcgY29udGV4dC5fc2VudCBmb3IgbGVnYWN5IHN1cHBvcnQgb2YgQmFiZWwnc1xuICAgICAgICAgIC8vIGZ1bmN0aW9uLnNlbnQgaW1wbGVtZW50YXRpb24uXG4gICAgICAgICAgY29udGV4dC5zZW50ID0gY29udGV4dC5fc2VudCA9IGNvbnRleHQuYXJnO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgIGlmIChzdGF0ZSA9PT0gR2VuU3RhdGVTdXNwZW5kZWRTdGFydCkge1xuICAgICAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUNvbXBsZXRlZDtcbiAgICAgICAgICAgIHRocm93IGNvbnRleHQuYXJnO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnRleHQuZGlzcGF0Y2hFeGNlcHRpb24oY29udGV4dC5hcmcpO1xuXG4gICAgICAgIH0gZWxzZSBpZiAoY29udGV4dC5tZXRob2QgPT09IFwicmV0dXJuXCIpIHtcbiAgICAgICAgICBjb250ZXh0LmFicnVwdChcInJldHVyblwiLCBjb250ZXh0LmFyZyk7XG4gICAgICAgIH1cblxuICAgICAgICBzdGF0ZSA9IEdlblN0YXRlRXhlY3V0aW5nO1xuXG4gICAgICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChpbm5lckZuLCBzZWxmLCBjb250ZXh0KTtcbiAgICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcIm5vcm1hbFwiKSB7XG4gICAgICAgICAgLy8gSWYgYW4gZXhjZXB0aW9uIGlzIHRocm93biBmcm9tIGlubmVyRm4sIHdlIGxlYXZlIHN0YXRlID09PVxuICAgICAgICAgIC8vIEdlblN0YXRlRXhlY3V0aW5nIGFuZCBsb29wIGJhY2sgZm9yIGFub3RoZXIgaW52b2NhdGlvbi5cbiAgICAgICAgICBzdGF0ZSA9IGNvbnRleHQuZG9uZVxuICAgICAgICAgICAgPyBHZW5TdGF0ZUNvbXBsZXRlZFxuICAgICAgICAgICAgOiBHZW5TdGF0ZVN1c3BlbmRlZFlpZWxkO1xuXG4gICAgICAgICAgaWYgKHJlY29yZC5hcmcgPT09IENvbnRpbnVlU2VudGluZWwpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB2YWx1ZTogcmVjb3JkLmFyZyxcbiAgICAgICAgICAgIGRvbmU6IGNvbnRleHQuZG9uZVxuICAgICAgICAgIH07XG5cbiAgICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJ0aHJvd1wiKSB7XG4gICAgICAgICAgc3RhdGUgPSBHZW5TdGF0ZUNvbXBsZXRlZDtcbiAgICAgICAgICAvLyBEaXNwYXRjaCB0aGUgZXhjZXB0aW9uIGJ5IGxvb3BpbmcgYmFjayBhcm91bmQgdG8gdGhlXG4gICAgICAgICAgLy8gY29udGV4dC5kaXNwYXRjaEV4Y2VwdGlvbihjb250ZXh0LmFyZykgY2FsbCBhYm92ZS5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwidGhyb3dcIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLy8gQ2FsbCBkZWxlZ2F0ZS5pdGVyYXRvcltjb250ZXh0Lm1ldGhvZF0oY29udGV4dC5hcmcpIGFuZCBoYW5kbGUgdGhlXG4gIC8vIHJlc3VsdCwgZWl0aGVyIGJ5IHJldHVybmluZyBhIHsgdmFsdWUsIGRvbmUgfSByZXN1bHQgZnJvbSB0aGVcbiAgLy8gZGVsZWdhdGUgaXRlcmF0b3IsIG9yIGJ5IG1vZGlmeWluZyBjb250ZXh0Lm1ldGhvZCBhbmQgY29udGV4dC5hcmcsXG4gIC8vIHNldHRpbmcgY29udGV4dC5kZWxlZ2F0ZSB0byBudWxsLCBhbmQgcmV0dXJuaW5nIHRoZSBDb250aW51ZVNlbnRpbmVsLlxuICBmdW5jdGlvbiBtYXliZUludm9rZURlbGVnYXRlKGRlbGVnYXRlLCBjb250ZXh0KSB7XG4gICAgdmFyIG1ldGhvZCA9IGRlbGVnYXRlLml0ZXJhdG9yW2NvbnRleHQubWV0aG9kXTtcbiAgICBpZiAobWV0aG9kID09PSB1bmRlZmluZWQpIHtcbiAgICAgIC8vIEEgLnRocm93IG9yIC5yZXR1cm4gd2hlbiB0aGUgZGVsZWdhdGUgaXRlcmF0b3IgaGFzIG5vIC50aHJvd1xuICAgICAgLy8gbWV0aG9kIGFsd2F5cyB0ZXJtaW5hdGVzIHRoZSB5aWVsZCogbG9vcC5cbiAgICAgIGNvbnRleHQuZGVsZWdhdGUgPSBudWxsO1xuXG4gICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICBpZiAoZGVsZWdhdGUuaXRlcmF0b3IucmV0dXJuKSB7XG4gICAgICAgICAgLy8gSWYgdGhlIGRlbGVnYXRlIGl0ZXJhdG9yIGhhcyBhIHJldHVybiBtZXRob2QsIGdpdmUgaXQgYVxuICAgICAgICAgIC8vIGNoYW5jZSB0byBjbGVhbiB1cC5cbiAgICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwicmV0dXJuXCI7XG4gICAgICAgICAgY29udGV4dC5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgbWF5YmVJbnZva2VEZWxlZ2F0ZShkZWxlZ2F0ZSwgY29udGV4dCk7XG5cbiAgICAgICAgICBpZiAoY29udGV4dC5tZXRob2QgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgICAgLy8gSWYgbWF5YmVJbnZva2VEZWxlZ2F0ZShjb250ZXh0KSBjaGFuZ2VkIGNvbnRleHQubWV0aG9kIGZyb21cbiAgICAgICAgICAgIC8vIFwicmV0dXJuXCIgdG8gXCJ0aHJvd1wiLCBsZXQgdGhhdCBvdmVycmlkZSB0aGUgVHlwZUVycm9yIGJlbG93LlxuICAgICAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICAgIGNvbnRleHQuYXJnID0gbmV3IFR5cGVFcnJvcihcbiAgICAgICAgICBcIlRoZSBpdGVyYXRvciBkb2VzIG5vdCBwcm92aWRlIGEgJ3Rocm93JyBtZXRob2RcIik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIHZhciByZWNvcmQgPSB0cnlDYXRjaChtZXRob2QsIGRlbGVnYXRlLml0ZXJhdG9yLCBjb250ZXh0LmFyZyk7XG5cbiAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgY29udGV4dC5tZXRob2QgPSBcInRocm93XCI7XG4gICAgICBjb250ZXh0LmFyZyA9IHJlY29yZC5hcmc7XG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIHZhciBpbmZvID0gcmVjb3JkLmFyZztcblxuICAgIGlmICghIGluZm8pIHtcbiAgICAgIGNvbnRleHQubWV0aG9kID0gXCJ0aHJvd1wiO1xuICAgICAgY29udGV4dC5hcmcgPSBuZXcgVHlwZUVycm9yKFwiaXRlcmF0b3IgcmVzdWx0IGlzIG5vdCBhbiBvYmplY3RcIik7XG4gICAgICBjb250ZXh0LmRlbGVnYXRlID0gbnVsbDtcbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cblxuICAgIGlmIChpbmZvLmRvbmUpIHtcbiAgICAgIC8vIEFzc2lnbiB0aGUgcmVzdWx0IG9mIHRoZSBmaW5pc2hlZCBkZWxlZ2F0ZSB0byB0aGUgdGVtcG9yYXJ5XG4gICAgICAvLyB2YXJpYWJsZSBzcGVjaWZpZWQgYnkgZGVsZWdhdGUucmVzdWx0TmFtZSAoc2VlIGRlbGVnYXRlWWllbGQpLlxuICAgICAgY29udGV4dFtkZWxlZ2F0ZS5yZXN1bHROYW1lXSA9IGluZm8udmFsdWU7XG5cbiAgICAgIC8vIFJlc3VtZSBleGVjdXRpb24gYXQgdGhlIGRlc2lyZWQgbG9jYXRpb24gKHNlZSBkZWxlZ2F0ZVlpZWxkKS5cbiAgICAgIGNvbnRleHQubmV4dCA9IGRlbGVnYXRlLm5leHRMb2M7XG5cbiAgICAgIC8vIElmIGNvbnRleHQubWV0aG9kIHdhcyBcInRocm93XCIgYnV0IHRoZSBkZWxlZ2F0ZSBoYW5kbGVkIHRoZVxuICAgICAgLy8gZXhjZXB0aW9uLCBsZXQgdGhlIG91dGVyIGdlbmVyYXRvciBwcm9jZWVkIG5vcm1hbGx5LiBJZlxuICAgICAgLy8gY29udGV4dC5tZXRob2Qgd2FzIFwibmV4dFwiLCBmb3JnZXQgY29udGV4dC5hcmcgc2luY2UgaXQgaGFzIGJlZW5cbiAgICAgIC8vIFwiY29uc3VtZWRcIiBieSB0aGUgZGVsZWdhdGUgaXRlcmF0b3IuIElmIGNvbnRleHQubWV0aG9kIHdhc1xuICAgICAgLy8gXCJyZXR1cm5cIiwgYWxsb3cgdGhlIG9yaWdpbmFsIC5yZXR1cm4gY2FsbCB0byBjb250aW51ZSBpbiB0aGVcbiAgICAgIC8vIG91dGVyIGdlbmVyYXRvci5cbiAgICAgIGlmIChjb250ZXh0Lm1ldGhvZCAhPT0gXCJyZXR1cm5cIikge1xuICAgICAgICBjb250ZXh0Lm1ldGhvZCA9IFwibmV4dFwiO1xuICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBSZS15aWVsZCB0aGUgcmVzdWx0IHJldHVybmVkIGJ5IHRoZSBkZWxlZ2F0ZSBtZXRob2QuXG4gICAgICByZXR1cm4gaW5mbztcbiAgICB9XG5cbiAgICAvLyBUaGUgZGVsZWdhdGUgaXRlcmF0b3IgaXMgZmluaXNoZWQsIHNvIGZvcmdldCBpdCBhbmQgY29udGludWUgd2l0aFxuICAgIC8vIHRoZSBvdXRlciBnZW5lcmF0b3IuXG4gICAgY29udGV4dC5kZWxlZ2F0ZSA9IG51bGw7XG4gICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gIH1cblxuICAvLyBEZWZpbmUgR2VuZXJhdG9yLnByb3RvdHlwZS57bmV4dCx0aHJvdyxyZXR1cm59IGluIHRlcm1zIG9mIHRoZVxuICAvLyB1bmlmaWVkIC5faW52b2tlIGhlbHBlciBtZXRob2QuXG4gIGRlZmluZUl0ZXJhdG9yTWV0aG9kcyhHcCk7XG5cbiAgR3BbdG9TdHJpbmdUYWdTeW1ib2xdID0gXCJHZW5lcmF0b3JcIjtcblxuICAvLyBBIEdlbmVyYXRvciBzaG91bGQgYWx3YXlzIHJldHVybiBpdHNlbGYgYXMgdGhlIGl0ZXJhdG9yIG9iamVjdCB3aGVuIHRoZVxuICAvLyBAQGl0ZXJhdG9yIGZ1bmN0aW9uIGlzIGNhbGxlZCBvbiBpdC4gU29tZSBicm93c2VycycgaW1wbGVtZW50YXRpb25zIG9mIHRoZVxuICAvLyBpdGVyYXRvciBwcm90b3R5cGUgY2hhaW4gaW5jb3JyZWN0bHkgaW1wbGVtZW50IHRoaXMsIGNhdXNpbmcgdGhlIEdlbmVyYXRvclxuICAvLyBvYmplY3QgdG8gbm90IGJlIHJldHVybmVkIGZyb20gdGhpcyBjYWxsLiBUaGlzIGVuc3VyZXMgdGhhdCBkb2Vzbid0IGhhcHBlbi5cbiAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWdlbmVyYXRvci9pc3N1ZXMvMjc0IGZvciBtb3JlIGRldGFpbHMuXG4gIEdwW2l0ZXJhdG9yU3ltYm9sXSA9IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzO1xuICB9O1xuXG4gIEdwLnRvU3RyaW5nID0gZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIFwiW29iamVjdCBHZW5lcmF0b3JdXCI7XG4gIH07XG5cbiAgZnVuY3Rpb24gcHVzaFRyeUVudHJ5KGxvY3MpIHtcbiAgICB2YXIgZW50cnkgPSB7IHRyeUxvYzogbG9jc1swXSB9O1xuXG4gICAgaWYgKDEgaW4gbG9jcykge1xuICAgICAgZW50cnkuY2F0Y2hMb2MgPSBsb2NzWzFdO1xuICAgIH1cblxuICAgIGlmICgyIGluIGxvY3MpIHtcbiAgICAgIGVudHJ5LmZpbmFsbHlMb2MgPSBsb2NzWzJdO1xuICAgICAgZW50cnkuYWZ0ZXJMb2MgPSBsb2NzWzNdO1xuICAgIH1cblxuICAgIHRoaXMudHJ5RW50cmllcy5wdXNoKGVudHJ5KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIHJlc2V0VHJ5RW50cnkoZW50cnkpIHtcbiAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbiB8fCB7fTtcbiAgICByZWNvcmQudHlwZSA9IFwibm9ybWFsXCI7XG4gICAgZGVsZXRlIHJlY29yZC5hcmc7XG4gICAgZW50cnkuY29tcGxldGlvbiA9IHJlY29yZDtcbiAgfVxuXG4gIGZ1bmN0aW9uIENvbnRleHQodHJ5TG9jc0xpc3QpIHtcbiAgICAvLyBUaGUgcm9vdCBlbnRyeSBvYmplY3QgKGVmZmVjdGl2ZWx5IGEgdHJ5IHN0YXRlbWVudCB3aXRob3V0IGEgY2F0Y2hcbiAgICAvLyBvciBhIGZpbmFsbHkgYmxvY2spIGdpdmVzIHVzIGEgcGxhY2UgdG8gc3RvcmUgdmFsdWVzIHRocm93biBmcm9tXG4gICAgLy8gbG9jYXRpb25zIHdoZXJlIHRoZXJlIGlzIG5vIGVuY2xvc2luZyB0cnkgc3RhdGVtZW50LlxuICAgIHRoaXMudHJ5RW50cmllcyA9IFt7IHRyeUxvYzogXCJyb290XCIgfV07XG4gICAgdHJ5TG9jc0xpc3QuZm9yRWFjaChwdXNoVHJ5RW50cnksIHRoaXMpO1xuICAgIHRoaXMucmVzZXQodHJ1ZSk7XG4gIH1cblxuICBydW50aW1lLmtleXMgPSBmdW5jdGlvbihvYmplY3QpIHtcbiAgICB2YXIga2V5cyA9IFtdO1xuICAgIGZvciAodmFyIGtleSBpbiBvYmplY3QpIHtcbiAgICAgIGtleXMucHVzaChrZXkpO1xuICAgIH1cbiAgICBrZXlzLnJldmVyc2UoKTtcblxuICAgIC8vIFJhdGhlciB0aGFuIHJldHVybmluZyBhbiBvYmplY3Qgd2l0aCBhIG5leHQgbWV0aG9kLCB3ZSBrZWVwXG4gICAgLy8gdGhpbmdzIHNpbXBsZSBhbmQgcmV0dXJuIHRoZSBuZXh0IGZ1bmN0aW9uIGl0c2VsZi5cbiAgICByZXR1cm4gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgIHdoaWxlIChrZXlzLmxlbmd0aCkge1xuICAgICAgICB2YXIga2V5ID0ga2V5cy5wb3AoKTtcbiAgICAgICAgaWYgKGtleSBpbiBvYmplY3QpIHtcbiAgICAgICAgICBuZXh0LnZhbHVlID0ga2V5O1xuICAgICAgICAgIG5leHQuZG9uZSA9IGZhbHNlO1xuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIC8vIFRvIGF2b2lkIGNyZWF0aW5nIGFuIGFkZGl0aW9uYWwgb2JqZWN0LCB3ZSBqdXN0IGhhbmcgdGhlIC52YWx1ZVxuICAgICAgLy8gYW5kIC5kb25lIHByb3BlcnRpZXMgb2ZmIHRoZSBuZXh0IGZ1bmN0aW9uIG9iamVjdCBpdHNlbGYuIFRoaXNcbiAgICAgIC8vIGFsc28gZW5zdXJlcyB0aGF0IHRoZSBtaW5pZmllciB3aWxsIG5vdCBhbm9ueW1pemUgdGhlIGZ1bmN0aW9uLlxuICAgICAgbmV4dC5kb25lID0gdHJ1ZTtcbiAgICAgIHJldHVybiBuZXh0O1xuICAgIH07XG4gIH07XG5cbiAgZnVuY3Rpb24gdmFsdWVzKGl0ZXJhYmxlKSB7XG4gICAgaWYgKGl0ZXJhYmxlKSB7XG4gICAgICB2YXIgaXRlcmF0b3JNZXRob2QgPSBpdGVyYWJsZVtpdGVyYXRvclN5bWJvbF07XG4gICAgICBpZiAoaXRlcmF0b3JNZXRob2QpIHtcbiAgICAgICAgcmV0dXJuIGl0ZXJhdG9yTWV0aG9kLmNhbGwoaXRlcmFibGUpO1xuICAgICAgfVxuXG4gICAgICBpZiAodHlwZW9mIGl0ZXJhYmxlLm5leHQgPT09IFwiZnVuY3Rpb25cIikge1xuICAgICAgICByZXR1cm4gaXRlcmFibGU7XG4gICAgICB9XG5cbiAgICAgIGlmICghaXNOYU4oaXRlcmFibGUubGVuZ3RoKSkge1xuICAgICAgICB2YXIgaSA9IC0xLCBuZXh0ID0gZnVuY3Rpb24gbmV4dCgpIHtcbiAgICAgICAgICB3aGlsZSAoKytpIDwgaXRlcmFibGUubGVuZ3RoKSB7XG4gICAgICAgICAgICBpZiAoaGFzT3duLmNhbGwoaXRlcmFibGUsIGkpKSB7XG4gICAgICAgICAgICAgIG5leHQudmFsdWUgPSBpdGVyYWJsZVtpXTtcbiAgICAgICAgICAgICAgbmV4dC5kb25lID0gZmFsc2U7XG4gICAgICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIG5leHQudmFsdWUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgbmV4dC5kb25lID0gdHJ1ZTtcblxuICAgICAgICAgIHJldHVybiBuZXh0O1xuICAgICAgICB9O1xuXG4gICAgICAgIHJldHVybiBuZXh0Lm5leHQgPSBuZXh0O1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFJldHVybiBhbiBpdGVyYXRvciB3aXRoIG5vIHZhbHVlcy5cbiAgICByZXR1cm4geyBuZXh0OiBkb25lUmVzdWx0IH07XG4gIH1cbiAgcnVudGltZS52YWx1ZXMgPSB2YWx1ZXM7XG5cbiAgZnVuY3Rpb24gZG9uZVJlc3VsdCgpIHtcbiAgICByZXR1cm4geyB2YWx1ZTogdW5kZWZpbmVkLCBkb25lOiB0cnVlIH07XG4gIH1cblxuICBDb250ZXh0LnByb3RvdHlwZSA9IHtcbiAgICBjb25zdHJ1Y3RvcjogQ29udGV4dCxcblxuICAgIHJlc2V0OiBmdW5jdGlvbihza2lwVGVtcFJlc2V0KSB7XG4gICAgICB0aGlzLnByZXYgPSAwO1xuICAgICAgdGhpcy5uZXh0ID0gMDtcbiAgICAgIC8vIFJlc2V0dGluZyBjb250ZXh0Ll9zZW50IGZvciBsZWdhY3kgc3VwcG9ydCBvZiBCYWJlbCdzXG4gICAgICAvLyBmdW5jdGlvbi5zZW50IGltcGxlbWVudGF0aW9uLlxuICAgICAgdGhpcy5zZW50ID0gdGhpcy5fc2VudCA9IHVuZGVmaW5lZDtcbiAgICAgIHRoaXMuZG9uZSA9IGZhbHNlO1xuICAgICAgdGhpcy5kZWxlZ2F0ZSA9IG51bGw7XG5cbiAgICAgIHRoaXMubWV0aG9kID0gXCJuZXh0XCI7XG4gICAgICB0aGlzLmFyZyA9IHVuZGVmaW5lZDtcblxuICAgICAgdGhpcy50cnlFbnRyaWVzLmZvckVhY2gocmVzZXRUcnlFbnRyeSk7XG5cbiAgICAgIGlmICghc2tpcFRlbXBSZXNldCkge1xuICAgICAgICBmb3IgKHZhciBuYW1lIGluIHRoaXMpIHtcbiAgICAgICAgICAvLyBOb3Qgc3VyZSBhYm91dCB0aGUgb3B0aW1hbCBvcmRlciBvZiB0aGVzZSBjb25kaXRpb25zOlxuICAgICAgICAgIGlmIChuYW1lLmNoYXJBdCgwKSA9PT0gXCJ0XCIgJiZcbiAgICAgICAgICAgICAgaGFzT3duLmNhbGwodGhpcywgbmFtZSkgJiZcbiAgICAgICAgICAgICAgIWlzTmFOKCtuYW1lLnNsaWNlKDEpKSkge1xuICAgICAgICAgICAgdGhpc1tuYW1lXSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgc3RvcDogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLmRvbmUgPSB0cnVlO1xuXG4gICAgICB2YXIgcm9vdEVudHJ5ID0gdGhpcy50cnlFbnRyaWVzWzBdO1xuICAgICAgdmFyIHJvb3RSZWNvcmQgPSByb290RW50cnkuY29tcGxldGlvbjtcbiAgICAgIGlmIChyb290UmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICB0aHJvdyByb290UmVjb3JkLmFyZztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHRoaXMucnZhbDtcbiAgICB9LFxuXG4gICAgZGlzcGF0Y2hFeGNlcHRpb246IGZ1bmN0aW9uKGV4Y2VwdGlvbikge1xuICAgICAgaWYgKHRoaXMuZG9uZSkge1xuICAgICAgICB0aHJvdyBleGNlcHRpb247XG4gICAgICB9XG5cbiAgICAgIHZhciBjb250ZXh0ID0gdGhpcztcbiAgICAgIGZ1bmN0aW9uIGhhbmRsZShsb2MsIGNhdWdodCkge1xuICAgICAgICByZWNvcmQudHlwZSA9IFwidGhyb3dcIjtcbiAgICAgICAgcmVjb3JkLmFyZyA9IGV4Y2VwdGlvbjtcbiAgICAgICAgY29udGV4dC5uZXh0ID0gbG9jO1xuXG4gICAgICAgIGlmIChjYXVnaHQpIHtcbiAgICAgICAgICAvLyBJZiB0aGUgZGlzcGF0Y2hlZCBleGNlcHRpb24gd2FzIGNhdWdodCBieSBhIGNhdGNoIGJsb2NrLFxuICAgICAgICAgIC8vIHRoZW4gbGV0IHRoYXQgY2F0Y2ggYmxvY2sgaGFuZGxlIHRoZSBleGNlcHRpb24gbm9ybWFsbHkuXG4gICAgICAgICAgY29udGV4dC5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgICBjb250ZXh0LmFyZyA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAhISBjYXVnaHQ7XG4gICAgICB9XG5cbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcblxuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSBcInJvb3RcIikge1xuICAgICAgICAgIC8vIEV4Y2VwdGlvbiB0aHJvd24gb3V0c2lkZSBvZiBhbnkgdHJ5IGJsb2NrIHRoYXQgY291bGQgaGFuZGxlXG4gICAgICAgICAgLy8gaXQsIHNvIHNldCB0aGUgY29tcGxldGlvbiB2YWx1ZSBvZiB0aGUgZW50aXJlIGZ1bmN0aW9uIHRvXG4gICAgICAgICAgLy8gdGhyb3cgdGhlIGV4Y2VwdGlvbi5cbiAgICAgICAgICByZXR1cm4gaGFuZGxlKFwiZW5kXCIpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYpIHtcbiAgICAgICAgICB2YXIgaGFzQ2F0Y2ggPSBoYXNPd24uY2FsbChlbnRyeSwgXCJjYXRjaExvY1wiKTtcbiAgICAgICAgICB2YXIgaGFzRmluYWxseSA9IGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIik7XG5cbiAgICAgICAgICBpZiAoaGFzQ2F0Y2ggJiYgaGFzRmluYWxseSkge1xuICAgICAgICAgICAgaWYgKHRoaXMucHJldiA8IGVudHJ5LmNhdGNoTG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuY2F0Y2hMb2MsIHRydWUpO1xuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0NhdGNoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wcmV2IDwgZW50cnkuY2F0Y2hMb2MpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGhhbmRsZShlbnRyeS5jYXRjaExvYywgdHJ1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2UgaWYgKGhhc0ZpbmFsbHkpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnByZXYgPCBlbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgICAgICAgIHJldHVybiBoYW5kbGUoZW50cnkuZmluYWxseUxvYyk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwidHJ5IHN0YXRlbWVudCB3aXRob3V0IGNhdGNoIG9yIGZpbmFsbHlcIik7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcblxuICAgIGFicnVwdDogZnVuY3Rpb24odHlwZSwgYXJnKSB7XG4gICAgICBmb3IgKHZhciBpID0gdGhpcy50cnlFbnRyaWVzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICAgIHZhciBlbnRyeSA9IHRoaXMudHJ5RW50cmllc1tpXTtcbiAgICAgICAgaWYgKGVudHJ5LnRyeUxvYyA8PSB0aGlzLnByZXYgJiZcbiAgICAgICAgICAgIGhhc093bi5jYWxsKGVudHJ5LCBcImZpbmFsbHlMb2NcIikgJiZcbiAgICAgICAgICAgIHRoaXMucHJldiA8IGVudHJ5LmZpbmFsbHlMb2MpIHtcbiAgICAgICAgICB2YXIgZmluYWxseUVudHJ5ID0gZW50cnk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGZpbmFsbHlFbnRyeSAmJlxuICAgICAgICAgICh0eXBlID09PSBcImJyZWFrXCIgfHxcbiAgICAgICAgICAgdHlwZSA9PT0gXCJjb250aW51ZVwiKSAmJlxuICAgICAgICAgIGZpbmFsbHlFbnRyeS50cnlMb2MgPD0gYXJnICYmXG4gICAgICAgICAgYXJnIDw9IGZpbmFsbHlFbnRyeS5maW5hbGx5TG9jKSB7XG4gICAgICAgIC8vIElnbm9yZSB0aGUgZmluYWxseSBlbnRyeSBpZiBjb250cm9sIGlzIG5vdCBqdW1waW5nIHRvIGFcbiAgICAgICAgLy8gbG9jYXRpb24gb3V0c2lkZSB0aGUgdHJ5L2NhdGNoIGJsb2NrLlxuICAgICAgICBmaW5hbGx5RW50cnkgPSBudWxsO1xuICAgICAgfVxuXG4gICAgICB2YXIgcmVjb3JkID0gZmluYWxseUVudHJ5ID8gZmluYWxseUVudHJ5LmNvbXBsZXRpb24gOiB7fTtcbiAgICAgIHJlY29yZC50eXBlID0gdHlwZTtcbiAgICAgIHJlY29yZC5hcmcgPSBhcmc7XG5cbiAgICAgIGlmIChmaW5hbGx5RW50cnkpIHtcbiAgICAgICAgdGhpcy5tZXRob2QgPSBcIm5leHRcIjtcbiAgICAgICAgdGhpcy5uZXh0ID0gZmluYWxseUVudHJ5LmZpbmFsbHlMb2M7XG4gICAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdGhpcy5jb21wbGV0ZShyZWNvcmQpO1xuICAgIH0sXG5cbiAgICBjb21wbGV0ZTogZnVuY3Rpb24ocmVjb3JkLCBhZnRlckxvYykge1xuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcInRocm93XCIpIHtcbiAgICAgICAgdGhyb3cgcmVjb3JkLmFyZztcbiAgICAgIH1cblxuICAgICAgaWYgKHJlY29yZC50eXBlID09PSBcImJyZWFrXCIgfHxcbiAgICAgICAgICByZWNvcmQudHlwZSA9PT0gXCJjb250aW51ZVwiKSB7XG4gICAgICAgIHRoaXMubmV4dCA9IHJlY29yZC5hcmc7XG4gICAgICB9IGVsc2UgaWYgKHJlY29yZC50eXBlID09PSBcInJldHVyblwiKSB7XG4gICAgICAgIHRoaXMucnZhbCA9IHRoaXMuYXJnID0gcmVjb3JkLmFyZztcbiAgICAgICAgdGhpcy5tZXRob2QgPSBcInJldHVyblwiO1xuICAgICAgICB0aGlzLm5leHQgPSBcImVuZFwiO1xuICAgICAgfSBlbHNlIGlmIChyZWNvcmQudHlwZSA9PT0gXCJub3JtYWxcIiAmJiBhZnRlckxvYykge1xuICAgICAgICB0aGlzLm5leHQgPSBhZnRlckxvYztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgfSxcblxuICAgIGZpbmlzaDogZnVuY3Rpb24oZmluYWxseUxvYykge1xuICAgICAgZm9yICh2YXIgaSA9IHRoaXMudHJ5RW50cmllcy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgICB2YXIgZW50cnkgPSB0aGlzLnRyeUVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS5maW5hbGx5TG9jID09PSBmaW5hbGx5TG9jKSB7XG4gICAgICAgICAgdGhpcy5jb21wbGV0ZShlbnRyeS5jb21wbGV0aW9uLCBlbnRyeS5hZnRlckxvYyk7XG4gICAgICAgICAgcmVzZXRUcnlFbnRyeShlbnRyeSk7XG4gICAgICAgICAgcmV0dXJuIENvbnRpbnVlU2VudGluZWw7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9LFxuXG4gICAgXCJjYXRjaFwiOiBmdW5jdGlvbih0cnlMb2MpIHtcbiAgICAgIGZvciAodmFyIGkgPSB0aGlzLnRyeUVudHJpZXMubGVuZ3RoIC0gMTsgaSA+PSAwOyAtLWkpIHtcbiAgICAgICAgdmFyIGVudHJ5ID0gdGhpcy50cnlFbnRyaWVzW2ldO1xuICAgICAgICBpZiAoZW50cnkudHJ5TG9jID09PSB0cnlMb2MpIHtcbiAgICAgICAgICB2YXIgcmVjb3JkID0gZW50cnkuY29tcGxldGlvbjtcbiAgICAgICAgICBpZiAocmVjb3JkLnR5cGUgPT09IFwidGhyb3dcIikge1xuICAgICAgICAgICAgdmFyIHRocm93biA9IHJlY29yZC5hcmc7XG4gICAgICAgICAgICByZXNldFRyeUVudHJ5KGVudHJ5KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHRocm93bjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBUaGUgY29udGV4dC5jYXRjaCBtZXRob2QgbXVzdCBvbmx5IGJlIGNhbGxlZCB3aXRoIGEgbG9jYXRpb25cbiAgICAgIC8vIGFyZ3VtZW50IHRoYXQgY29ycmVzcG9uZHMgdG8gYSBrbm93biBjYXRjaCBibG9jay5cbiAgICAgIHRocm93IG5ldyBFcnJvcihcImlsbGVnYWwgY2F0Y2ggYXR0ZW1wdFwiKTtcbiAgICB9LFxuXG4gICAgZGVsZWdhdGVZaWVsZDogZnVuY3Rpb24oaXRlcmFibGUsIHJlc3VsdE5hbWUsIG5leHRMb2MpIHtcbiAgICAgIHRoaXMuZGVsZWdhdGUgPSB7XG4gICAgICAgIGl0ZXJhdG9yOiB2YWx1ZXMoaXRlcmFibGUpLFxuICAgICAgICByZXN1bHROYW1lOiByZXN1bHROYW1lLFxuICAgICAgICBuZXh0TG9jOiBuZXh0TG9jXG4gICAgICB9O1xuXG4gICAgICBpZiAodGhpcy5tZXRob2QgPT09IFwibmV4dFwiKSB7XG4gICAgICAgIC8vIERlbGliZXJhdGVseSBmb3JnZXQgdGhlIGxhc3Qgc2VudCB2YWx1ZSBzbyB0aGF0IHdlIGRvbid0XG4gICAgICAgIC8vIGFjY2lkZW50YWxseSBwYXNzIGl0IG9uIHRvIHRoZSBkZWxlZ2F0ZS5cbiAgICAgICAgdGhpcy5hcmcgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBDb250aW51ZVNlbnRpbmVsO1xuICAgIH1cbiAgfTtcbn0pKFxuICAvLyBBbW9uZyB0aGUgdmFyaW91cyB0cmlja3MgZm9yIG9idGFpbmluZyBhIHJlZmVyZW5jZSB0byB0aGUgZ2xvYmFsXG4gIC8vIG9iamVjdCwgdGhpcyBzZWVtcyB0byBiZSB0aGUgbW9zdCByZWxpYWJsZSB0ZWNobmlxdWUgdGhhdCBkb2VzIG5vdFxuICAvLyB1c2UgaW5kaXJlY3QgZXZhbCAod2hpY2ggdmlvbGF0ZXMgQ29udGVudCBTZWN1cml0eSBQb2xpY3kpLlxuICB0eXBlb2YgZ2xvYmFsID09PSBcIm9iamVjdFwiID8gZ2xvYmFsIDpcbiAgdHlwZW9mIHdpbmRvdyA9PT0gXCJvYmplY3RcIiA/IHdpbmRvdyA6XG4gIHR5cGVvZiBzZWxmID09PSBcIm9iamVjdFwiID8gc2VsZiA6IHRoaXNcbik7XG4iLCIvKiBnbG9iYWwgd2luZG93LCBleHBvcnRzLCBkZWZpbmUgKi9cblxuIWZ1bmN0aW9uKCkge1xuICAgICd1c2Ugc3RyaWN0J1xuXG4gICAgdmFyIHJlID0ge1xuICAgICAgICBub3Rfc3RyaW5nOiAvW15zXS8sXG4gICAgICAgIG5vdF9ib29sOiAvW150XS8sXG4gICAgICAgIG5vdF90eXBlOiAvW15UXS8sXG4gICAgICAgIG5vdF9wcmltaXRpdmU6IC9bXnZdLyxcbiAgICAgICAgbnVtYmVyOiAvW2RpZWZnXS8sXG4gICAgICAgIG51bWVyaWNfYXJnOiAvW2JjZGllZmd1eFhdLyxcbiAgICAgICAganNvbjogL1tqXS8sXG4gICAgICAgIG5vdF9qc29uOiAvW15qXS8sXG4gICAgICAgIHRleHQ6IC9eW15cXHgyNV0rLyxcbiAgICAgICAgbW9kdWxvOiAvXlxceDI1ezJ9LyxcbiAgICAgICAgcGxhY2Vob2xkZXI6IC9eXFx4MjUoPzooWzEtOV1cXGQqKVxcJHxcXCgoW15cXCldKylcXCkpPyhcXCspPygwfCdbXiRdKT8oLSk/KFxcZCspPyg/OlxcLihcXGQrKSk/KFtiLWdpam9zdFR1dnhYXSkvLFxuICAgICAgICBrZXk6IC9eKFthLXpfXVthLXpfXFxkXSopL2ksXG4gICAgICAgIGtleV9hY2Nlc3M6IC9eXFwuKFthLXpfXVthLXpfXFxkXSopL2ksXG4gICAgICAgIGluZGV4X2FjY2VzczogL15cXFsoXFxkKylcXF0vLFxuICAgICAgICBzaWduOiAvXltcXCtcXC1dL1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNwcmludGYoa2V5KSB7XG4gICAgICAgIC8vIGBhcmd1bWVudHNgIGlzIG5vdCBhbiBhcnJheSwgYnV0IHNob3VsZCBiZSBmaW5lIGZvciB0aGlzIGNhbGxcbiAgICAgICAgcmV0dXJuIHNwcmludGZfZm9ybWF0KHNwcmludGZfcGFyc2Uoa2V5KSwgYXJndW1lbnRzKVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHZzcHJpbnRmKGZtdCwgYXJndikge1xuICAgICAgICByZXR1cm4gc3ByaW50Zi5hcHBseShudWxsLCBbZm10XS5jb25jYXQoYXJndiB8fCBbXSkpXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc3ByaW50Zl9mb3JtYXQocGFyc2VfdHJlZSwgYXJndikge1xuICAgICAgICB2YXIgY3Vyc29yID0gMSwgdHJlZV9sZW5ndGggPSBwYXJzZV90cmVlLmxlbmd0aCwgYXJnLCBvdXRwdXQgPSAnJywgaSwgaywgbWF0Y2gsIHBhZCwgcGFkX2NoYXJhY3RlciwgcGFkX2xlbmd0aCwgaXNfcG9zaXRpdmUsIHNpZ25cbiAgICAgICAgZm9yIChpID0gMDsgaSA8IHRyZWVfbGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgcGFyc2VfdHJlZVtpXSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgICAgICBvdXRwdXQgKz0gcGFyc2VfdHJlZVtpXVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoQXJyYXkuaXNBcnJheShwYXJzZV90cmVlW2ldKSkge1xuICAgICAgICAgICAgICAgIG1hdGNoID0gcGFyc2VfdHJlZVtpXSAvLyBjb252ZW5pZW5jZSBwdXJwb3NlcyBvbmx5XG4gICAgICAgICAgICAgICAgaWYgKG1hdGNoWzJdKSB7IC8vIGtleXdvcmQgYXJndW1lbnRcbiAgICAgICAgICAgICAgICAgICAgYXJnID0gYXJndltjdXJzb3JdXG4gICAgICAgICAgICAgICAgICAgIGZvciAoayA9IDA7IGsgPCBtYXRjaFsyXS5sZW5ndGg7IGsrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFhcmcuaGFzT3duUHJvcGVydHkobWF0Y2hbMl1ba10pKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKHNwcmludGYoJ1tzcHJpbnRmXSBwcm9wZXJ0eSBcIiVzXCIgZG9lcyBub3QgZXhpc3QnLCBtYXRjaFsyXVtrXSkpXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmcgPSBhcmdbbWF0Y2hbMl1ba11dXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgZWxzZSBpZiAobWF0Y2hbMV0pIHsgLy8gcG9zaXRpb25hbCBhcmd1bWVudCAoZXhwbGljaXQpXG4gICAgICAgICAgICAgICAgICAgIGFyZyA9IGFyZ3ZbbWF0Y2hbMV1dXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGVsc2UgeyAvLyBwb3NpdGlvbmFsIGFyZ3VtZW50IChpbXBsaWNpdClcbiAgICAgICAgICAgICAgICAgICAgYXJnID0gYXJndltjdXJzb3IrK11cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAocmUubm90X3R5cGUudGVzdChtYXRjaFs4XSkgJiYgcmUubm90X3ByaW1pdGl2ZS50ZXN0KG1hdGNoWzhdKSAmJiBhcmcgaW5zdGFuY2VvZiBGdW5jdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBhcmcgPSBhcmcoKVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChyZS5udW1lcmljX2FyZy50ZXN0KG1hdGNoWzhdKSAmJiAodHlwZW9mIGFyZyAhPT0gJ251bWJlcicgJiYgaXNOYU4oYXJnKSkpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihzcHJpbnRmKCdbc3ByaW50Zl0gZXhwZWN0aW5nIG51bWJlciBidXQgZm91bmQgJVQnLCBhcmcpKVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChyZS5udW1iZXIudGVzdChtYXRjaFs4XSkpIHtcbiAgICAgICAgICAgICAgICAgICAgaXNfcG9zaXRpdmUgPSBhcmcgPj0gMFxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHN3aXRjaCAobWF0Y2hbOF0pIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnYic6XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmcgPSBwYXJzZUludChhcmcsIDEwKS50b1N0cmluZygyKVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnYyc6XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmcgPSBTdHJpbmcuZnJvbUNoYXJDb2RlKHBhcnNlSW50KGFyZywgMTApKVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnZCc6XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2knOlxuICAgICAgICAgICAgICAgICAgICAgICAgYXJnID0gcGFyc2VJbnQoYXJnLCAxMClcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ2onOlxuICAgICAgICAgICAgICAgICAgICAgICAgYXJnID0gSlNPTi5zdHJpbmdpZnkoYXJnLCBudWxsLCBtYXRjaFs2XSA/IHBhcnNlSW50KG1hdGNoWzZdKSA6IDApXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdlJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZyA9IG1hdGNoWzddID8gcGFyc2VGbG9hdChhcmcpLnRvRXhwb25lbnRpYWwobWF0Y2hbN10pIDogcGFyc2VGbG9hdChhcmcpLnRvRXhwb25lbnRpYWwoKVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnZic6XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmcgPSBtYXRjaFs3XSA/IHBhcnNlRmxvYXQoYXJnKS50b0ZpeGVkKG1hdGNoWzddKSA6IHBhcnNlRmxvYXQoYXJnKVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAnZyc6XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmcgPSBtYXRjaFs3XSA/IFN0cmluZyhOdW1iZXIoYXJnLnRvUHJlY2lzaW9uKG1hdGNoWzddKSkpIDogcGFyc2VGbG9hdChhcmcpXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVha1xuICAgICAgICAgICAgICAgICAgICBjYXNlICdvJzpcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZyA9IChwYXJzZUludChhcmcsIDEwKSA+Pj4gMCkudG9TdHJpbmcoOClcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3MnOlxuICAgICAgICAgICAgICAgICAgICAgICAgYXJnID0gU3RyaW5nKGFyZylcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZyA9IChtYXRjaFs3XSA/IGFyZy5zdWJzdHJpbmcoMCwgbWF0Y2hbN10pIDogYXJnKVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAndCc6XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmcgPSBTdHJpbmcoISFhcmcpXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmcgPSAobWF0Y2hbN10gPyBhcmcuc3Vic3RyaW5nKDAsIG1hdGNoWzddKSA6IGFyZylcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ1QnOlxuICAgICAgICAgICAgICAgICAgICAgICAgYXJnID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGFyZykuc2xpY2UoOCwgLTEpLnRvTG93ZXJDYXNlKClcbiAgICAgICAgICAgICAgICAgICAgICAgIGFyZyA9IChtYXRjaFs3XSA/IGFyZy5zdWJzdHJpbmcoMCwgbWF0Y2hbN10pIDogYXJnKVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAndSc6XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmcgPSBwYXJzZUludChhcmcsIDEwKSA+Pj4gMFxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAndic6XG4gICAgICAgICAgICAgICAgICAgICAgICBhcmcgPSBhcmcudmFsdWVPZigpXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmcgPSAobWF0Y2hbN10gPyBhcmcuc3Vic3RyaW5nKDAsIG1hdGNoWzddKSA6IGFyZylcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ3gnOlxuICAgICAgICAgICAgICAgICAgICAgICAgYXJnID0gKHBhcnNlSW50KGFyZywgMTApID4+PiAwKS50b1N0cmluZygxNilcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJ1gnOlxuICAgICAgICAgICAgICAgICAgICAgICAgYXJnID0gKHBhcnNlSW50KGFyZywgMTApID4+PiAwKS50b1N0cmluZygxNikudG9VcHBlckNhc2UoKVxuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHJlLmpzb24udGVzdChtYXRjaFs4XSkpIHtcbiAgICAgICAgICAgICAgICAgICAgb3V0cHV0ICs9IGFyZ1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlLm51bWJlci50ZXN0KG1hdGNoWzhdKSAmJiAoIWlzX3Bvc2l0aXZlIHx8IG1hdGNoWzNdKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2lnbiA9IGlzX3Bvc2l0aXZlID8gJysnIDogJy0nXG4gICAgICAgICAgICAgICAgICAgICAgICBhcmcgPSBhcmcudG9TdHJpbmcoKS5yZXBsYWNlKHJlLnNpZ24sICcnKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgc2lnbiA9ICcnXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcGFkX2NoYXJhY3RlciA9IG1hdGNoWzRdID8gbWF0Y2hbNF0gPT09ICcwJyA/ICcwJyA6IG1hdGNoWzRdLmNoYXJBdCgxKSA6ICcgJ1xuICAgICAgICAgICAgICAgICAgICBwYWRfbGVuZ3RoID0gbWF0Y2hbNl0gLSAoc2lnbiArIGFyZykubGVuZ3RoXG4gICAgICAgICAgICAgICAgICAgIHBhZCA9IG1hdGNoWzZdID8gKHBhZF9sZW5ndGggPiAwID8gcGFkX2NoYXJhY3Rlci5yZXBlYXQocGFkX2xlbmd0aCkgOiAnJykgOiAnJ1xuICAgICAgICAgICAgICAgICAgICBvdXRwdXQgKz0gbWF0Y2hbNV0gPyBzaWduICsgYXJnICsgcGFkIDogKHBhZF9jaGFyYWN0ZXIgPT09ICcwJyA/IHNpZ24gKyBwYWQgKyBhcmcgOiBwYWQgKyBzaWduICsgYXJnKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3V0cHV0XG4gICAgfVxuXG4gICAgdmFyIHNwcmludGZfY2FjaGUgPSBPYmplY3QuY3JlYXRlKG51bGwpXG5cbiAgICBmdW5jdGlvbiBzcHJpbnRmX3BhcnNlKGZtdCkge1xuICAgICAgICBpZiAoc3ByaW50Zl9jYWNoZVtmbXRdKSB7XG4gICAgICAgICAgICByZXR1cm4gc3ByaW50Zl9jYWNoZVtmbXRdXG4gICAgICAgIH1cblxuICAgICAgICB2YXIgX2ZtdCA9IGZtdCwgbWF0Y2gsIHBhcnNlX3RyZWUgPSBbXSwgYXJnX25hbWVzID0gMFxuICAgICAgICB3aGlsZSAoX2ZtdCkge1xuICAgICAgICAgICAgaWYgKChtYXRjaCA9IHJlLnRleHQuZXhlYyhfZm10KSkgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBwYXJzZV90cmVlLnB1c2gobWF0Y2hbMF0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIGlmICgobWF0Y2ggPSByZS5tb2R1bG8uZXhlYyhfZm10KSkgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBwYXJzZV90cmVlLnB1c2goJyUnKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSBpZiAoKG1hdGNoID0gcmUucGxhY2Vob2xkZXIuZXhlYyhfZm10KSkgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICBpZiAobWF0Y2hbMl0pIHtcbiAgICAgICAgICAgICAgICAgICAgYXJnX25hbWVzIHw9IDFcbiAgICAgICAgICAgICAgICAgICAgdmFyIGZpZWxkX2xpc3QgPSBbXSwgcmVwbGFjZW1lbnRfZmllbGQgPSBtYXRjaFsyXSwgZmllbGRfbWF0Y2ggPSBbXVxuICAgICAgICAgICAgICAgICAgICBpZiAoKGZpZWxkX21hdGNoID0gcmUua2V5LmV4ZWMocmVwbGFjZW1lbnRfZmllbGQpKSAhPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZmllbGRfbGlzdC5wdXNoKGZpZWxkX21hdGNoWzFdKVxuICAgICAgICAgICAgICAgICAgICAgICAgd2hpbGUgKChyZXBsYWNlbWVudF9maWVsZCA9IHJlcGxhY2VtZW50X2ZpZWxkLnN1YnN0cmluZyhmaWVsZF9tYXRjaFswXS5sZW5ndGgpKSAhPT0gJycpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoKGZpZWxkX21hdGNoID0gcmUua2V5X2FjY2Vzcy5leGVjKHJlcGxhY2VtZW50X2ZpZWxkKSkgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmllbGRfbGlzdC5wdXNoKGZpZWxkX21hdGNoWzFdKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbHNlIGlmICgoZmllbGRfbWF0Y2ggPSByZS5pbmRleF9hY2Nlc3MuZXhlYyhyZXBsYWNlbWVudF9maWVsZCkpICE9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkX2xpc3QucHVzaChmaWVsZF9tYXRjaFsxXSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcignW3NwcmludGZdIGZhaWxlZCB0byBwYXJzZSBuYW1lZCBhcmd1bWVudCBrZXknKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBTeW50YXhFcnJvcignW3NwcmludGZdIGZhaWxlZCB0byBwYXJzZSBuYW1lZCBhcmd1bWVudCBrZXknKVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIG1hdGNoWzJdID0gZmllbGRfbGlzdFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgYXJnX25hbWVzIHw9IDJcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKGFyZ19uYW1lcyA9PT0gMykge1xuICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1tzcHJpbnRmXSBtaXhpbmcgcG9zaXRpb25hbCBhbmQgbmFtZWQgcGxhY2Vob2xkZXJzIGlzIG5vdCAoeWV0KSBzdXBwb3J0ZWQnKVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBwYXJzZV90cmVlLnB1c2gobWF0Y2gpXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgU3ludGF4RXJyb3IoJ1tzcHJpbnRmXSB1bmV4cGVjdGVkIHBsYWNlaG9sZGVyJylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIF9mbXQgPSBfZm10LnN1YnN0cmluZyhtYXRjaFswXS5sZW5ndGgpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHNwcmludGZfY2FjaGVbZm10XSA9IHBhcnNlX3RyZWVcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBleHBvcnQgdG8gZWl0aGVyIGJyb3dzZXIgb3Igbm9kZS5qc1xuICAgICAqL1xuICAgIC8qIGVzbGludC1kaXNhYmxlIHF1b3RlLXByb3BzICovXG4gICAgaWYgKHR5cGVvZiBleHBvcnRzICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICBleHBvcnRzWydzcHJpbnRmJ10gPSBzcHJpbnRmXG4gICAgICAgIGV4cG9ydHNbJ3ZzcHJpbnRmJ10gPSB2c3ByaW50ZlxuICAgIH1cbiAgICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgd2luZG93WydzcHJpbnRmJ10gPSBzcHJpbnRmXG4gICAgICAgIHdpbmRvd1sndnNwcmludGYnXSA9IHZzcHJpbnRmXG5cbiAgICAgICAgaWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lWydhbWQnXSkge1xuICAgICAgICAgICAgZGVmaW5lKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgICAgICdzcHJpbnRmJzogc3ByaW50ZixcbiAgICAgICAgICAgICAgICAgICAgJ3ZzcHJpbnRmJzogdnNwcmludGZcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KVxuICAgICAgICB9XG4gICAgfVxuICAgIC8qIGVzbGludC1lbmFibGUgcXVvdGUtcHJvcHMgKi9cbn0oKVxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX3R5cGVvZiA9IHR5cGVvZiBTeW1ib2wgPT09IFwiZnVuY3Rpb25cIiAmJiB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID09PSBcInN5bWJvbFwiID8gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gdHlwZW9mIG9iajsgfSA6IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIG9iaiAmJiB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7IH07XG5cbmV4cG9ydHMudnVlU2V0ID0gdnVlU2V0O1xuZXhwb3J0cy52dWV4U2V0ID0gdnVleFNldDtcbmV4cG9ydHMuVlVFWF9ERUVQX1NFVCA9IFZVRVhfREVFUF9TRVQ7XG5leHBvcnRzLmV4dGVuZE11dGF0aW9uID0gZXh0ZW5kTXV0YXRpb247XG5leHBvcnRzLnZ1ZU1vZGVsID0gdnVlTW9kZWw7XG5leHBvcnRzLnZ1ZXhNb2RlbCA9IHZ1ZXhNb2RlbDtcbmV4cG9ydHMuZGVlcE1vZGVsID0gZGVlcE1vZGVsO1xuZXhwb3J0cy5pbnN0YWxsID0gaW5zdGFsbDtcblxudmFyIF92dWUgPSByZXF1aXJlKCd2dWUnKTtcblxudmFyIF92dWUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdnVlKTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxudmFyIGludmFsaWRLZXkgPSAvXlxcZHxbXmEtekEtWjAtOV9dL2dtO1xudmFyIGludEtleSA9IC9eXFxkKyQvO1xuXG5mdW5jdGlvbiBpc051bWJlckxpa2UodmFsdWUpIHtcbiAgcmV0dXJuIFN0cmluZyh2YWx1ZSkubWF0Y2goL15cXGQrJC8pO1xufVxuXG5mdW5jdGlvbiB0b1BhdGgocGF0aFN0cmluZykge1xuICBpZiAoQXJyYXkuaXNBcnJheShwYXRoU3RyaW5nKSkgcmV0dXJuIHBhdGhTdHJpbmc7XG4gIGlmICh0eXBlb2YgcGF0aFN0cmluZyA9PT0gJ251bWJlcicpIHJldHVybiBbcGF0aFN0cmluZ107XG4gIHBhdGhTdHJpbmcgPSBTdHJpbmcocGF0aFN0cmluZyk7XG5cbiAgLy8gdGFrZW4gZnJvbSBsb2Rhc2ggLSBodHRwczovL2dpdGh1Yi5jb20vbG9kYXNoL2xvZGFzaFxuICB2YXIgcGF0aFJ4ID0gL1teLltcXF1dK3xcXFsoPzooLT9cXGQrKD86XFwuXFxkKyk/KXwoW1wiJ10pKCg/Oig/IVxcMilbXlxcXFxdfFxcXFwuKSo/KVxcMilcXF18KD89KFxcLnxcXFtcXF0pKD86XFw0fCQpKS9nO1xuICB2YXIgcGF0aEFycmF5ID0gW107XG5cbiAgcGF0aFN0cmluZy5yZXBsYWNlKHBhdGhSeCwgZnVuY3Rpb24gKG1hdGNoLCBudW1iZXIsIHF1b3RlLCBzdHJpbmcpIHtcbiAgICBwYXRoQXJyYXkucHVzaChxdW90ZSA/IHN0cmluZyA6IG51bWJlciAhPT0gdW5kZWZpbmVkID8gTnVtYmVyKG51bWJlcikgOiBtYXRjaCk7XG4gICAgcmV0dXJuIHBhdGhBcnJheVtwYXRoQXJyYXkubGVuZ3RoIC0gMV07XG4gIH0pO1xuICByZXR1cm4gcGF0aEFycmF5O1xufVxuXG5mdW5jdGlvbiBub29wKCkge31cblxuZnVuY3Rpb24gaGFzT3duUHJvcGVydHkob2JqZWN0LCBwcm9wZXJ0eSkge1xuICByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpO1xufVxuXG5mdW5jdGlvbiBkZWVwc2V0RXJyb3IobWVzc2FnZSkge1xuICByZXR1cm4gbmV3IEVycm9yKCdbdnVlLWRlZXBzZXRdOiAnICsgbWVzc2FnZSk7XG59XG5cbmZ1bmN0aW9uIGlzT2JqZWN0TGlrZShvYmplY3QpIHtcbiAgcmV0dXJuICh0eXBlb2Ygb2JqZWN0ID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZihvYmplY3QpKSA9PT0gJ29iamVjdCcgJiYgb2JqZWN0ICE9PSBudWxsO1xufVxuXG5mdW5jdGlvbiBwYXRoSm9pbihiYXNlLCBwYXRoKSB7XG4gIHRyeSB7XG4gICAgdmFyIGNvbm5lY3RvciA9IHBhdGgubWF0Y2goL15cXFsvKSA/ICcnIDogJy4nO1xuICAgIHJldHVybiAnJyArIChiYXNlIHx8ICcnKSArIChiYXNlID8gY29ubmVjdG9yIDogJycpICsgcGF0aDtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cbn1cblxuZnVuY3Rpb24gcHVzaFBhdGhzKG9iamVjdCwgY3VycmVudCwgcGF0aHMpIHtcbiAgcGF0aHMucHVzaChjdXJyZW50KTtcbiAgaWYgKGlzT2JqZWN0TGlrZShvYmplY3QpKSB7XG4gICAgZ2V0UGF0aHMob2JqZWN0LCBjdXJyZW50LCBwYXRocyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZm9yRWFjaChvYmplY3QsIGl0ZXJhdGVlKSB7XG4gIHZhciBpc0FycmF5ID0gQXJyYXkuaXNBcnJheShvYmplY3QpO1xuICB2YXIga2V5cyA9IGlzQXJyYXkgPyBvYmplY3QgOiBPYmplY3Qua2V5cyhvYmplY3QpO1xuICBrZXlzLmZvckVhY2goZnVuY3Rpb24gKHZhbHVlLCBpbmRleCkge1xuICAgIHJldHVybiBpc0FycmF5ID8gaXRlcmF0ZWUodmFsdWUsIGluZGV4KSA6IGl0ZXJhdGVlKG9iamVjdFt2YWx1ZV0sIHZhbHVlKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGhhcyhvYmplY3QsIHBhdGgpIHtcbiAgdmFyIG9iaiA9IG9iamVjdDtcbiAgdmFyIHBhcnRzID0gdG9QYXRoKHBhdGgpO1xuICB3aGlsZSAocGFydHMubGVuZ3RoKSB7XG4gICAgdmFyIGtleSA9IHBhcnRzLnNoaWZ0KCk7XG4gICAgaWYgKCFoYXNPd25Qcm9wZXJ0eShvYmosIGtleSkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2UgaWYgKCFwYXJ0cy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBvYmogPSBvYmpba2V5XTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbmZ1bmN0aW9uIGdldFBhdGhzKG9iamVjdCkge1xuICB2YXIgY3VycmVudCA9IGFyZ3VtZW50cy5sZW5ndGggPiAxICYmIGFyZ3VtZW50c1sxXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzFdIDogJyc7XG4gIHZhciBwYXRocyA9IGFyZ3VtZW50cy5sZW5ndGggPiAyICYmIGFyZ3VtZW50c1syXSAhPT0gdW5kZWZpbmVkID8gYXJndW1lbnRzWzJdIDogW107XG5cbiAgaWYgKEFycmF5LmlzQXJyYXkob2JqZWN0KSkge1xuICAgIGZvckVhY2gob2JqZWN0LCBmdW5jdGlvbiAodmFsLCBpZHgpIHtcbiAgICAgIHB1c2hQYXRocyh2YWwsIChjdXJyZW50ICsgJy4nICsgaWR4KS5yZXBsYWNlKC9eXFwuLywgJycpLCBwYXRocyk7XG4gICAgICBwdXNoUGF0aHModmFsLCAoY3VycmVudCArICdbJyArIGlkeCArICddJykucmVwbGFjZSgvXlxcLi8sICcnKSwgcGF0aHMpO1xuICAgICAgcHVzaFBhdGhzKHZhbCwgKGN1cnJlbnQgKyAnW1wiJyArIGlkeCArICdcIl0nKS5yZXBsYWNlKC9eXFwuLywgJycpLCBwYXRocyk7XG4gICAgfSk7XG4gIH0gZWxzZSBpZiAoaXNPYmplY3RMaWtlKG9iamVjdCkpIHtcbiAgICBmb3JFYWNoKG9iamVjdCwgZnVuY3Rpb24gKHZhbCwga2V5KSB7XG4gICAgICBpZiAoa2V5Lm1hdGNoKGludEtleSkgIT09IG51bGwpIHtcbiAgICAgICAgLy8gaXMgaW5kZXhcbiAgICAgICAgcHVzaFBhdGhzKHZhbCwgKGN1cnJlbnQgKyAnLicgKyBrZXkpLnJlcGxhY2UoL15cXC4vLCAnJyksIHBhdGhzKTtcbiAgICAgICAgcHVzaFBhdGhzKHZhbCwgKGN1cnJlbnQgKyAnWycgKyBrZXkgKyAnXScpLnJlcGxhY2UoL15cXC4vLCAnJyksIHBhdGhzKTtcbiAgICAgICAgcHVzaFBhdGhzKHZhbCwgKGN1cnJlbnQgKyAnW1wiJyArIGtleSArICdcIl0nKS5yZXBsYWNlKC9eXFwuLywgJycpLCBwYXRocyk7XG4gICAgICB9IGVsc2UgaWYgKCFrZXkubWF0Y2goaW52YWxpZEtleSkpIHtcbiAgICAgICAgcHVzaFBhdGhzKHZhbCwgKGN1cnJlbnQgKyAnLicgKyBrZXkpLnJlcGxhY2UoL15cXC4vLCAnJyksIHBhdGhzKTtcbiAgICAgIH1cbiAgICAgIC8vIGFsd2F5cyBhZGQgdGhlIGFic29sdXRlIGFycmF5IG5vdGF0aW9uIHBhdGhcbiAgICAgIHB1c2hQYXRocyh2YWwsIChjdXJyZW50ICsgJ1tcIicgKyBrZXkgKyAnXCJdJykucmVwbGFjZSgvXlxcLi8sICcnKSwgcGF0aHMpO1xuICAgIH0pO1xuICB9XG4gIHJldHVybiBbXS5jb25jYXQobmV3IFNldChwYXRocykpO1xufVxuXG5mdW5jdGlvbiBfZ2V0KG9iaiwgcGF0aCwgZGVmYXVsdFZhbHVlKSB7XG4gIHRyeSB7XG4gICAgdmFyIG8gPSBvYmo7XG4gICAgdmFyIGZpZWxkcyA9IHRvUGF0aChwYXRoKTtcbiAgICB3aGlsZSAoZmllbGRzLmxlbmd0aCkge1xuICAgICAgdmFyIHByb3AgPSBmaWVsZHMuc2hpZnQoKTtcbiAgICAgIG8gPSBvW3Byb3BdO1xuICAgICAgaWYgKCFmaWVsZHMubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiBvO1xuICAgICAgfVxuICAgIH1cbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcbiAgfVxuICByZXR1cm4gZGVmYXVsdFZhbHVlO1xufVxuXG5mdW5jdGlvbiBnZXRQcm94eSh2bSwgYmFzZSwgb3B0aW9ucykge1xuICBub29wKG9wdGlvbnMpOyAvLyBmb3IgZnV0dXJlIHBvdGVudGlhbCBvcHRpb25zXG4gIHZhciBpc1Z1ZXggPSB0eXBlb2YgYmFzZSA9PT0gJ3N0cmluZyc7XG4gIHZhciBvYmplY3QgPSBpc1Z1ZXggPyBfZ2V0KHZtLiRzdG9yZS5zdGF0ZSwgYmFzZSkgOiBiYXNlO1xuXG4gIHJldHVybiBuZXcgUHJveHkob2JqZWN0LCB7XG4gICAgZ2V0OiBmdW5jdGlvbiBnZXQodGFyZ2V0LCBwcm9wZXJ0eSkge1xuICAgICAgcmV0dXJuIF9nZXQodGFyZ2V0LCBwcm9wZXJ0eSk7XG4gICAgfSxcbiAgICBzZXQ6IGZ1bmN0aW9uIHNldCh0YXJnZXQsIHByb3BlcnR5LCB2YWx1ZSkge1xuICAgICAgaXNWdWV4ID8gdnVleFNldC5jYWxsKHZtLCBwYXRoSm9pbihiYXNlLCBwcm9wZXJ0eSksIHZhbHVlKSA6IHZ1ZVNldCh0YXJnZXQsIHByb3BlcnR5LCB2YWx1ZSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9LFxuICAgIGRlbGV0ZVByb3BlcnR5OiBmdW5jdGlvbiBkZWxldGVQcm9wZXJ0eSgpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG4gICAgZW51bWVyYXRlOiBmdW5jdGlvbiBlbnVtZXJhdGUodGFyZ2V0KSB7XG4gICAgICByZXR1cm4gT2JqZWN0LmtleXModGFyZ2V0KTtcbiAgICB9LFxuICAgIG93bktleXM6IGZ1bmN0aW9uIG93bktleXModGFyZ2V0KSB7XG4gICAgICByZXR1cm4gT2JqZWN0LmtleXModGFyZ2V0KTtcbiAgICB9LFxuICAgIGhhczogZnVuY3Rpb24gaGFzKHRhcmdldCwgcHJvcGVydHkpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG4gICAgZGVmaW5lUHJvcGVydHk6IGZ1bmN0aW9uIGRlZmluZVByb3BlcnR5KHRhcmdldCkge1xuICAgICAgcmV0dXJuIHRhcmdldDtcbiAgICB9LFxuICAgIGdldE93blByb3BlcnR5RGVzY3JpcHRvcjogZnVuY3Rpb24gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHRhcmdldCwgcHJvcGVydHkpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHZhbHVlOiBfZ2V0KHRhcmdldCwgcHJvcGVydHkpLFxuICAgICAgICB3cml0YWJsZTogZmFsc2UsXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgfTtcbiAgICB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBidWlsZFZ1ZU1vZGVsKHZtLCBvYmplY3QsIG9wdGlvbnMpIHtcbiAgdmFyIG1vZGVsID0ge307XG4gIGZvckVhY2goZ2V0UGF0aHMob2JqZWN0KSwgZnVuY3Rpb24gKHBhdGgpIHtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkobW9kZWwsIHBhdGgsIHtcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZSxcbiAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICBnZXQ6IGZ1bmN0aW9uIGdldCgpIHtcbiAgICAgICAgcmV0dXJuIF9nZXQob2JqZWN0LCBwYXRoKTtcbiAgICAgIH0sXG4gICAgICBzZXQ6IGZ1bmN0aW9uIHNldCh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdnVlU2V0KG9iamVjdCwgcGF0aCwgdmFsdWUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbiAgcmV0dXJuIG1vZGVsO1xufVxuXG5mdW5jdGlvbiBidWlsZFZ1ZXhNb2RlbCh2bSwgdnVleFBhdGgsIG9wdGlvbnMpIHtcbiAgdmFyIG1vZGVsID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgdmFyIG9iamVjdCA9IF9nZXQodm0uJHN0b3JlLnN0YXRlLCB2dWV4UGF0aCk7XG4gIHZhciBwYXRocyA9IGdldFBhdGhzKG9iamVjdCk7XG4gIGZvckVhY2gocGF0aHMsIGZ1bmN0aW9uIChwYXRoKSB7XG4gICAgdmFyIHByb3BQYXRoID0gcGF0aEpvaW4odnVleFBhdGgsIHBhdGgpO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShtb2RlbCwgcGF0aCwge1xuICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgIGdldDogZnVuY3Rpb24gZ2V0KCkge1xuICAgICAgICByZXR1cm4gX2dldCh2bS4kc3RvcmUuc3RhdGUsIHByb3BQYXRoKTtcbiAgICAgIH0sXG4gICAgICBzZXQ6IGZ1bmN0aW9uIHNldCh2YWx1ZSkge1xuICAgICAgICByZXR1cm4gdnVleFNldC5jYWxsKHZtLCBwcm9wUGF0aCwgdmFsdWUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbiAgcmV0dXJuIG1vZGVsO1xufVxuXG5mdW5jdGlvbiB2dWVTZXQob2JqLCBwYXRoLCB2YWx1ZSkge1xuICB2YXIgZmllbGRzID0gQXJyYXkuaXNBcnJheShwYXRoKSA/IHBhdGggOiB0b1BhdGgocGF0aCk7XG4gIHZhciBwcm9wID0gZmllbGRzLnNoaWZ0KCk7XG5cbiAgaWYgKCFmaWVsZHMubGVuZ3RoKSByZXR1cm4gX3Z1ZTIuZGVmYXVsdC5zZXQob2JqLCBwcm9wLCB2YWx1ZSk7XG4gIGlmICghaGFzT3duUHJvcGVydHkob2JqLCBwcm9wKSB8fCBvYmpbcHJvcF0gPT09IG51bGwpIHtcbiAgICB2YXIgb2JqVmFsID0gZmllbGRzLmxlbmd0aCA+PSAxICYmIGlzTnVtYmVyTGlrZShmaWVsZHNbMF0pID8gW10gOiB7fTtcbiAgICBfdnVlMi5kZWZhdWx0LnNldChvYmosIHByb3AsIG9ialZhbCk7XG4gIH1cbiAgdnVlU2V0KG9ialtwcm9wXSwgZmllbGRzLCB2YWx1ZSk7XG59XG5cbmZ1bmN0aW9uIHZ1ZXhTZXQocGF0aCwgdmFsdWUpIHtcbiAgaWYgKCFpc09iamVjdExpa2UodGhpcy4kc3RvcmUpKSB7XG4gICAgdGhyb3cgZGVlcHNldEVycm9yKCdjb3VsZCBub3QgZmluZCB2dWV4IHN0b3JlIG9iamVjdCBvbiBpbnN0YW5jZScpO1xuICB9XG4gIHZhciBtZXRob2QgPSB0aGlzLiRzdG9yZS5jb21taXQgPyAnY29tbWl0JyA6ICdkaXNwYXRjaCc7XG4gIHRoaXMuJHN0b3JlW21ldGhvZF0oJ1ZVRVhfREVFUF9TRVQnLCB7IHBhdGg6IHBhdGgsIHZhbHVlOiB2YWx1ZSB9KTtcbn1cblxuZnVuY3Rpb24gVlVFWF9ERUVQX1NFVChzdGF0ZSwgX3JlZikge1xuICB2YXIgcGF0aCA9IF9yZWYucGF0aCxcbiAgICAgIHZhbHVlID0gX3JlZi52YWx1ZTtcblxuICB2dWVTZXQoc3RhdGUsIHBhdGgsIHZhbHVlKTtcbn1cblxuZnVuY3Rpb24gZXh0ZW5kTXV0YXRpb24oKSB7XG4gIHZhciBtdXRhdGlvbnMgPSBhcmd1bWVudHMubGVuZ3RoID4gMCAmJiBhcmd1bWVudHNbMF0gIT09IHVuZGVmaW5lZCA/IGFyZ3VtZW50c1swXSA6IHt9O1xuXG4gIHJldHVybiBPYmplY3QuYXNzaWduKG11dGF0aW9ucywgeyBWVUVYX0RFRVBfU0VUOiBWVUVYX0RFRVBfU0VUIH0pO1xufVxuXG5mdW5jdGlvbiB2dWVNb2RlbChvYmplY3QsIG9wdGlvbnMpIHtcbiAgdmFyIG9wdHMgPSBPYmplY3QuYXNzaWduKHt9LCBvcHRpb25zKTtcbiAgaWYgKCFpc09iamVjdExpa2Uob2JqZWN0KSkge1xuICAgIHRocm93IGRlZXBzZXRFcnJvcignaW52YWxpZCBvYmplY3Qgc3BlY2lmaWVkIGZvciB2dWUgbW9kZWwnKTtcbiAgfSBlbHNlIGlmIChvcHRzLnVzZVByb3h5ID09PSBmYWxzZSB8fCB0eXBlb2YgUHJveHkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgcmV0dXJuIGJ1aWxkVnVlTW9kZWwodGhpcywgb2JqZWN0LCBvcHRzKTtcbiAgfVxuICByZXR1cm4gZ2V0UHJveHkodGhpcywgb2JqZWN0LCBvcHRzKTtcbn1cblxuZnVuY3Rpb24gdnVleE1vZGVsKHZ1ZXhQYXRoLCBvcHRpb25zKSB7XG4gIHZhciBvcHRzID0gT2JqZWN0LmFzc2lnbih7fSwgb3B0aW9ucyk7XG4gIGlmICh0eXBlb2YgdnVleFBhdGggIT09ICdzdHJpbmcnIHx8IHZ1ZXhQYXRoID09PSAnJykge1xuICAgIHRocm93IGRlZXBzZXRFcnJvcignaW52YWxpZCB2dWV4IHBhdGggc3RyaW5nJyk7XG4gIH0gZWxzZSBpZiAoIWlzT2JqZWN0TGlrZSh0aGlzLiRzdG9yZSkgfHwgIWlzT2JqZWN0TGlrZSh0aGlzLiRzdG9yZS5zdGF0ZSkpIHtcbiAgICB0aHJvdyBkZWVwc2V0RXJyb3IoJ25vIHZ1ZXggc3RhdGUgZm91bmQnKTtcbiAgfSBlbHNlIGlmICghaGFzKHRoaXMuJHN0b3JlLnN0YXRlLCB2dWV4UGF0aCkpIHtcbiAgICB0aHJvdyBkZWVwc2V0RXJyb3IoJ2Nhbm5vdCBmaW5kIHBhdGggXCInICsgdnVleFBhdGggKyAnXCIgaW4gVnVleCBzdG9yZScpO1xuICB9IGVsc2UgaWYgKG9wdHMudXNlUHJveHkgPT09IGZhbHNlIHx8IHR5cGVvZiBQcm94eSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICByZXR1cm4gYnVpbGRWdWV4TW9kZWwodGhpcywgdnVleFBhdGgsIG9wdHMpO1xuICB9XG4gIHJldHVybiBnZXRQcm94eSh0aGlzLCB2dWV4UGF0aCwgb3B0cyk7XG59XG5cbmZ1bmN0aW9uIGRlZXBNb2RlbChiYXNlLCBvcHRpb25zKSB7XG4gIHJldHVybiB0eXBlb2YgYmFzZSA9PT0gJ3N0cmluZycgPyB2dWV4TW9kZWwuY2FsbCh0aGlzLCBiYXNlLCBvcHRpb25zKSA6IHZ1ZU1vZGVsLmNhbGwodGhpcywgYmFzZSwgb3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIGluc3RhbGwoVnVlSW5zdGFuY2UpIHtcbiAgVnVlSW5zdGFuY2UucHJvdG90eXBlLiRkZWVwTW9kZWwgPSBkZWVwTW9kZWw7XG4gIFZ1ZUluc3RhbmNlLnByb3RvdHlwZS4kdnVlU2V0ID0gdnVlU2V0O1xuICBWdWVJbnN0YW5jZS5wcm90b3R5cGUuJHZ1ZXhTZXQgPSB2dWV4U2V0O1xufVxuIiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImZvcm0tZ3JvdXBcIiB9LCBbXG4gICAgX2MoXCJpbnB1dFwiLCB7XG4gICAgICBzdGF0aWNDbGFzczogXCJmb3JtLWNvbnRyb2wgZm9ybS1jb250cm9sLWxnXCIsXG4gICAgICBjbGFzczogeyBcImlzLWludmFsaWRcIjogX3ZtLmVycm9ycyB9LFxuICAgICAgYXR0cnM6IHsgaWQ6IF92bS5maWVsZElkLCB0eXBlOiBfdm0udHlwZSwgbmFtZTogX3ZtLm5hbWUgfSxcbiAgICAgIGRvbVByb3BzOiB7IHZhbHVlOiBfdm0udmFsdWUgfSxcbiAgICAgIG9uOiB7IGlucHV0OiBfdm0uaGFuZGxlSW5wdXQgfVxuICAgIH0pLFxuICAgIF92bS5fdihcIiBcIiksXG4gICAgX3ZtLmVycm9yc1xuICAgICAgPyBfYyhcImRpdlwiLCB7IHN0YXRpY0NsYXNzOiBcImludmFsaWQtZmVlZGJhY2tcIiB9LCBbXG4gICAgICAgICAgX3ZtLl92KFwiXFxuICAgICAgICBcIiArIF92bS5fcyhfdm0uZXJyb3JzKSArIFwiXFxuICAgIFwiKVxuICAgICAgICBdKVxuICAgICAgOiBfdm0uX2UoKSxcbiAgICBfdm0uX3YoXCIgXCIpLFxuICAgIF92bS5sYWJlbFxuICAgICAgPyBfYyhcbiAgICAgICAgICBcImxhYmVsXCIsXG4gICAgICAgICAgeyBzdGF0aWNDbGFzczogXCJmb3JtLWdyb3VwLWxhYmVsXCIsIGF0dHJzOiB7IGZvcjogX3ZtLmZpZWxkSWQgfSB9LFxuICAgICAgICAgIFtfdm0uX3YoX3ZtLl9zKF92bS5sYWJlbCkpXVxuICAgICAgICApXG4gICAgICA6IF92bS5fZSgpXG4gIF0pXG59XG52YXIgc3RhdGljUmVuZGVyRm5zID0gW11cbnJlbmRlci5fd2l0aFN0cmlwcGVkID0gdHJ1ZVxuXG5leHBvcnQgeyByZW5kZXIsIHN0YXRpY1JlbmRlckZucyB9IiwidmFyIHJlbmRlciA9IGZ1bmN0aW9uKCkge1xuICB2YXIgX3ZtID0gdGhpc1xuICB2YXIgX2ggPSBfdm0uJGNyZWF0ZUVsZW1lbnRcbiAgdmFyIF9jID0gX3ZtLl9zZWxmLl9jIHx8IF9oXG4gIHJldHVybiBfYyhcInN2Z1wiLCB7XG4gICAgY2xhc3M6IF92bS5jbGFzc05hbWUsXG4gICAgYXR0cnM6IHtcbiAgICAgIHdpZHRoOiBfdm0ud2lkdGgsXG4gICAgICBoZWlnaHQ6IF92bS5oZWlnaHQsXG4gICAgICB2aWV3Qm94OiBfdm0udmlld0JveCxcbiAgICAgIHhtbG5zOiBcImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcbiAgICB9LFxuICAgIGRvbVByb3BzOiB7IGlubmVySFRNTDogX3ZtLl9zKF92bS5jb250ZW50KSB9LFxuICAgIG9uOiB7IGNsaWNrOiBfdm0uaGFuZGxlQ2xpY2sgfVxuICB9KVxufVxudmFyIHN0YXRpY1JlbmRlckZucyA9IFtdXG5yZW5kZXIuX3dpdGhTdHJpcHBlZCA9IHRydWVcblxuZXhwb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSIsIi8qIGdsb2JhbHMgX19WVUVfU1NSX0NPTlRFWFRfXyAqL1xuXG4vLyBJTVBPUlRBTlQ6IERvIE5PVCB1c2UgRVMyMDE1IGZlYXR1cmVzIGluIHRoaXMgZmlsZSAoZXhjZXB0IGZvciBtb2R1bGVzKS5cbi8vIFRoaXMgbW9kdWxlIGlzIGEgcnVudGltZSB1dGlsaXR5IGZvciBjbGVhbmVyIGNvbXBvbmVudCBtb2R1bGUgb3V0cHV0IGFuZCB3aWxsXG4vLyBiZSBpbmNsdWRlZCBpbiB0aGUgZmluYWwgd2VicGFjayB1c2VyIGJ1bmRsZS5cblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gbm9ybWFsaXplQ29tcG9uZW50IChcbiAgc2NyaXB0RXhwb3J0cyxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZ1bmN0aW9uYWxUZW1wbGF0ZSxcbiAgaW5qZWN0U3R5bGVzLFxuICBzY29wZUlkLFxuICBtb2R1bGVJZGVudGlmaWVyLCAvKiBzZXJ2ZXIgb25seSAqL1xuICBzaGFkb3dNb2RlIC8qIHZ1ZS1jbGkgb25seSAqL1xuKSB7XG4gIC8vIFZ1ZS5leHRlbmQgY29uc3RydWN0b3IgZXhwb3J0IGludGVyb3BcbiAgdmFyIG9wdGlvbnMgPSB0eXBlb2Ygc2NyaXB0RXhwb3J0cyA9PT0gJ2Z1bmN0aW9uJ1xuICAgID8gc2NyaXB0RXhwb3J0cy5vcHRpb25zXG4gICAgOiBzY3JpcHRFeHBvcnRzXG5cbiAgLy8gcmVuZGVyIGZ1bmN0aW9uc1xuICBpZiAocmVuZGVyKSB7XG4gICAgb3B0aW9ucy5yZW5kZXIgPSByZW5kZXJcbiAgICBvcHRpb25zLnN0YXRpY1JlbmRlckZucyA9IHN0YXRpY1JlbmRlckZuc1xuICAgIG9wdGlvbnMuX2NvbXBpbGVkID0gdHJ1ZVxuICB9XG5cbiAgLy8gZnVuY3Rpb25hbCB0ZW1wbGF0ZVxuICBpZiAoZnVuY3Rpb25hbFRlbXBsYXRlKSB7XG4gICAgb3B0aW9ucy5mdW5jdGlvbmFsID0gdHJ1ZVxuICB9XG5cbiAgLy8gc2NvcGVkSWRcbiAgaWYgKHNjb3BlSWQpIHtcbiAgICBvcHRpb25zLl9zY29wZUlkID0gJ2RhdGEtdi0nICsgc2NvcGVJZFxuICB9XG5cbiAgdmFyIGhvb2tcbiAgaWYgKG1vZHVsZUlkZW50aWZpZXIpIHsgLy8gc2VydmVyIGJ1aWxkXG4gICAgaG9vayA9IGZ1bmN0aW9uIChjb250ZXh0KSB7XG4gICAgICAvLyAyLjMgaW5qZWN0aW9uXG4gICAgICBjb250ZXh0ID1cbiAgICAgICAgY29udGV4dCB8fCAvLyBjYWNoZWQgY2FsbFxuICAgICAgICAodGhpcy4kdm5vZGUgJiYgdGhpcy4kdm5vZGUuc3NyQ29udGV4dCkgfHwgLy8gc3RhdGVmdWxcbiAgICAgICAgKHRoaXMucGFyZW50ICYmIHRoaXMucGFyZW50LiR2bm9kZSAmJiB0aGlzLnBhcmVudC4kdm5vZGUuc3NyQ29udGV4dCkgLy8gZnVuY3Rpb25hbFxuICAgICAgLy8gMi4yIHdpdGggcnVuSW5OZXdDb250ZXh0OiB0cnVlXG4gICAgICBpZiAoIWNvbnRleHQgJiYgdHlwZW9mIF9fVlVFX1NTUl9DT05URVhUX18gIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIGNvbnRleHQgPSBfX1ZVRV9TU1JfQ09OVEVYVF9fXG4gICAgICB9XG4gICAgICAvLyBpbmplY3QgY29tcG9uZW50IHN0eWxlc1xuICAgICAgaWYgKGluamVjdFN0eWxlcykge1xuICAgICAgICBpbmplY3RTdHlsZXMuY2FsbCh0aGlzLCBjb250ZXh0KVxuICAgICAgfVxuICAgICAgLy8gcmVnaXN0ZXIgY29tcG9uZW50IG1vZHVsZSBpZGVudGlmaWVyIGZvciBhc3luYyBjaHVuayBpbmZlcnJlbmNlXG4gICAgICBpZiAoY29udGV4dCAmJiBjb250ZXh0Ll9yZWdpc3RlcmVkQ29tcG9uZW50cykge1xuICAgICAgICBjb250ZXh0Ll9yZWdpc3RlcmVkQ29tcG9uZW50cy5hZGQobW9kdWxlSWRlbnRpZmllcilcbiAgICAgIH1cbiAgICB9XG4gICAgLy8gdXNlZCBieSBzc3IgaW4gY2FzZSBjb21wb25lbnQgaXMgY2FjaGVkIGFuZCBiZWZvcmVDcmVhdGVcbiAgICAvLyBuZXZlciBnZXRzIGNhbGxlZFxuICAgIG9wdGlvbnMuX3NzclJlZ2lzdGVyID0gaG9va1xuICB9IGVsc2UgaWYgKGluamVjdFN0eWxlcykge1xuICAgIGhvb2sgPSBzaGFkb3dNb2RlXG4gICAgICA/IGZ1bmN0aW9uICgpIHsgaW5qZWN0U3R5bGVzLmNhbGwodGhpcywgdGhpcy4kcm9vdC4kb3B0aW9ucy5zaGFkb3dSb290KSB9XG4gICAgICA6IGluamVjdFN0eWxlc1xuICB9XG5cbiAgaWYgKGhvb2spIHtcbiAgICBpZiAob3B0aW9ucy5mdW5jdGlvbmFsKSB7XG4gICAgICAvLyBmb3IgdGVtcGxhdGUtb25seSBob3QtcmVsb2FkIGJlY2F1c2UgaW4gdGhhdCBjYXNlIHRoZSByZW5kZXIgZm4gZG9lc24ndFxuICAgICAgLy8gZ28gdGhyb3VnaCB0aGUgbm9ybWFsaXplclxuICAgICAgb3B0aW9ucy5faW5qZWN0U3R5bGVzID0gaG9va1xuICAgICAgLy8gcmVnaXN0ZXIgZm9yIGZ1bmN0aW9hbCBjb21wb25lbnQgaW4gdnVlIGZpbGVcbiAgICAgIHZhciBvcmlnaW5hbFJlbmRlciA9IG9wdGlvbnMucmVuZGVyXG4gICAgICBvcHRpb25zLnJlbmRlciA9IGZ1bmN0aW9uIHJlbmRlcldpdGhTdHlsZUluamVjdGlvbiAoaCwgY29udGV4dCkge1xuICAgICAgICBob29rLmNhbGwoY29udGV4dClcbiAgICAgICAgcmV0dXJuIG9yaWdpbmFsUmVuZGVyKGgsIGNvbnRleHQpXG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIGluamVjdCBjb21wb25lbnQgcmVnaXN0cmF0aW9uIGFzIGJlZm9yZUNyZWF0ZSBob29rXG4gICAgICB2YXIgZXhpc3RpbmcgPSBvcHRpb25zLmJlZm9yZUNyZWF0ZVxuICAgICAgb3B0aW9ucy5iZWZvcmVDcmVhdGUgPSBleGlzdGluZ1xuICAgICAgICA/IFtdLmNvbmNhdChleGlzdGluZywgaG9vaylcbiAgICAgICAgOiBbaG9va11cbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGV4cG9ydHM6IHNjcmlwdEV4cG9ydHMsXG4gICAgb3B0aW9uczogb3B0aW9uc1xuICB9XG59XG4iLCJ2YXIgZztcblxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcbmcgPSAoZnVuY3Rpb24oKSB7XG5cdHJldHVybiB0aGlzO1xufSkoKTtcblxudHJ5IHtcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXG5cdGcgPSBnIHx8IG5ldyBGdW5jdGlvbihcInJldHVybiB0aGlzXCIpKCk7XG59IGNhdGNoIChlKSB7XG5cdC8vIFRoaXMgd29ya3MgaWYgdGhlIHdpbmRvdyByZWZlcmVuY2UgaXMgYXZhaWxhYmxlXG5cdGlmICh0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKSBnID0gd2luZG93O1xufVxuXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXG4vLyBXZSByZXR1cm4gdW5kZWZpbmVkLCBpbnN0ZWFkIG9mIG5vdGhpbmcgaGVyZSwgc28gaXQnc1xuLy8gZWFzaWVyIHRvIGhhbmRsZSB0aGlzIGNhc2UuIGlmKCFnbG9iYWwpIHsgLi4ufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGc7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IFwiL2J1aWxkL3NyYy92ZW5kb3IvMjAxODA3MjUuMjYyMGM5ODRjOC5qcGdcIjsiLCJmdW5jdGlvbiB3ZWJwYWNrRW1wdHlDb250ZXh0KHJlcSkge1xuXHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIidcIik7XG5cdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0dGhyb3cgZTtcbn1cbndlYnBhY2tFbXB0eUNvbnRleHQua2V5cyA9IGZ1bmN0aW9uKCkgeyByZXR1cm4gW107IH07XG53ZWJwYWNrRW1wdHlDb250ZXh0LnJlc29sdmUgPSB3ZWJwYWNrRW1wdHlDb250ZXh0O1xubW9kdWxlLmV4cG9ydHMgPSB3ZWJwYWNrRW1wdHlDb250ZXh0O1xud2VicGFja0VtcHR5Q29udGV4dC5pZCA9IFwiLi4vc3JjL2ltZy9zdmcgc3luYyByZWN1cnNpdmUgXlxcXFwuXFxcXC8uKlxcXFwuc3ZnJFwiOyIsImltcG9ydCB7IHJlbmRlciwgc3RhdGljUmVuZGVyRm5zIH0gZnJvbSBcIi4vVkZpZWxkLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD1mYjM4MDgyMCZcIlxuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9WRmllbGQudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5leHBvcnQgKiBmcm9tIFwiLi9WRmllbGQudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiXG5cblxuLyogbm9ybWFsaXplIGNvbXBvbmVudCAqL1xuaW1wb3J0IG5vcm1hbGl6ZXIgZnJvbSBcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvcnVudGltZS9jb21wb25lbnROb3JtYWxpemVyLmpzXCJcbnZhciBjb21wb25lbnQgPSBub3JtYWxpemVyKFxuICBzY3JpcHQsXG4gIHJlbmRlcixcbiAgc3RhdGljUmVuZGVyRm5zLFxuICBmYWxzZSxcbiAgbnVsbCxcbiAgbnVsbCxcbiAgbnVsbFxuICBcbilcblxuLyogaG90IHJlbG9hZCAqL1xuaWYgKG1vZHVsZS5ob3QpIHtcbiAgdmFyIGFwaSA9IHJlcXVpcmUoXCIvaG9tZS9zYXZrcy9Xb3JrL0RvY2tlci9PdGhlci93ZWJwYWNrL3Jlc291cmNlcy9hc3NldHMvbm9kZV9tb2R1bGVzL3Z1ZS1ob3QtcmVsb2FkLWFwaS9kaXN0L2luZGV4LmpzXCIpXG4gIGFwaS5pbnN0YWxsKHJlcXVpcmUoJ3Z1ZScpKVxuICBpZiAoYXBpLmNvbXBhdGlibGUpIHtcbiAgICBtb2R1bGUuaG90LmFjY2VwdCgpXG4gICAgaWYgKCFtb2R1bGUuaG90LmRhdGEpIHtcbiAgICAgIGFwaS5jcmVhdGVSZWNvcmQoJ2ZiMzgwODIwJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfSBlbHNlIHtcbiAgICAgIGFwaS5yZWxvYWQoJ2ZiMzgwODIwJywgY29tcG9uZW50Lm9wdGlvbnMpXG4gICAgfVxuICAgIG1vZHVsZS5ob3QuYWNjZXB0KFwiLi9WRmllbGQudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPWZiMzgwODIwJlwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBhcGkucmVyZW5kZXIoJ2ZiMzgwODIwJywge1xuICAgICAgICByZW5kZXI6IHJlbmRlcixcbiAgICAgICAgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnNcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJzcmMvanMvY29tcG9uZW50cy9WRmllbGQudnVlXCJcbmV4cG9ydCBkZWZhdWx0IGNvbXBvbmVudC5leHBvcnRzIiwiaW1wb3J0IG1vZCBmcm9tIFwiLSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vVkZpZWxkLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIjsgZXhwb3J0IGRlZmF1bHQgbW9kOyBleHBvcnQgKiBmcm9tIFwiLSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvYmFiZWwtbG9hZGVyL2xpYi9pbmRleC5qcz8/cmVmLS0xIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9pbmRleC5qcz8/dnVlLWxvYWRlci1vcHRpb25zIS4vVkZpZWxkLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIiIsImV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3RlbXBsYXRlTG9hZGVyLmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9WRmllbGQudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPWZiMzgwODIwJlwiIiwiaW1wb3J0IHsgcmVuZGVyLCBzdGF0aWNSZW5kZXJGbnMgfSBmcm9tIFwiLi9WU3ZnLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0xOTIwMTNkYSZcIlxuaW1wb3J0IHNjcmlwdCBmcm9tIFwiLi9WU3ZnLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIlxuZXhwb3J0ICogZnJvbSBcIi4vVlN2Zy52dWU/dnVlJnR5cGU9c2NyaXB0Jmxhbmc9anMmXCJcblxuXG4vKiBub3JtYWxpemUgY29tcG9uZW50ICovXG5pbXBvcnQgbm9ybWFsaXplciBmcm9tIFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9ydW50aW1lL2NvbXBvbmVudE5vcm1hbGl6ZXIuanNcIlxudmFyIGNvbXBvbmVudCA9IG5vcm1hbGl6ZXIoXG4gIHNjcmlwdCxcbiAgcmVuZGVyLFxuICBzdGF0aWNSZW5kZXJGbnMsXG4gIGZhbHNlLFxuICBudWxsLFxuICBudWxsLFxuICBudWxsXG4gIFxuKVxuXG4vKiBob3QgcmVsb2FkICovXG5pZiAobW9kdWxlLmhvdCkge1xuICB2YXIgYXBpID0gcmVxdWlyZShcIi9ob21lL3NhdmtzL1dvcmsvRG9ja2VyL090aGVyL3dlYnBhY2svcmVzb3VyY2VzL2Fzc2V0cy9ub2RlX21vZHVsZXMvdnVlLWhvdC1yZWxvYWQtYXBpL2Rpc3QvaW5kZXguanNcIilcbiAgYXBpLmluc3RhbGwocmVxdWlyZSgndnVlJykpXG4gIGlmIChhcGkuY29tcGF0aWJsZSkge1xuICAgIG1vZHVsZS5ob3QuYWNjZXB0KClcbiAgICBpZiAoIW1vZHVsZS5ob3QuZGF0YSkge1xuICAgICAgYXBpLmNyZWF0ZVJlY29yZCgnMTkyMDEzZGEnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbG9hZCgnMTkyMDEzZGEnLCBjb21wb25lbnQub3B0aW9ucylcbiAgICB9XG4gICAgbW9kdWxlLmhvdC5hY2NlcHQoXCIuL1ZTdmcudnVlP3Z1ZSZ0eXBlPXRlbXBsYXRlJmlkPTE5MjAxM2RhJlwiLCBmdW5jdGlvbiAoKSB7XG4gICAgICBhcGkucmVyZW5kZXIoJzE5MjAxM2RhJywge1xuICAgICAgICByZW5kZXI6IHJlbmRlcixcbiAgICAgICAgc3RhdGljUmVuZGVyRm5zOiBzdGF0aWNSZW5kZXJGbnNcbiAgICAgIH0pXG4gICAgfSlcbiAgfVxufVxuY29tcG9uZW50Lm9wdGlvbnMuX19maWxlID0gXCJzcmMvanMvY29tcG9uZW50cy9WU3ZnLnZ1ZVwiXG5leHBvcnQgZGVmYXVsdCBjb21wb25lbnQuZXhwb3J0cyIsImltcG9ydCBtb2QgZnJvbSBcIi0hLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2JhYmVsLWxvYWRlci9saWIvaW5kZXguanM/P3JlZi0tMSEuLi8uLi8uLi9ub2RlX21vZHVsZXMvdnVlLWxvYWRlci9saWIvaW5kZXguanM/P3Z1ZS1sb2FkZXItb3B0aW9ucyEuL1ZTdmcudnVlP3Z1ZSZ0eXBlPXNjcmlwdCZsYW5nPWpzJlwiOyBleHBvcnQgZGVmYXVsdCBtb2Q7IGV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9iYWJlbC1sb2FkZXIvbGliL2luZGV4LmpzPz9yZWYtLTEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9WU3ZnLnZ1ZT92dWUmdHlwZT1zY3JpcHQmbGFuZz1qcyZcIiIsImV4cG9ydCAqIGZyb20gXCItIS4uLy4uLy4uL25vZGVfbW9kdWxlcy92dWUtbG9hZGVyL2xpYi9sb2FkZXJzL3RlbXBsYXRlTG9hZGVyLmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3Z1ZS1sb2FkZXIvbGliL2luZGV4LmpzPz92dWUtbG9hZGVyLW9wdGlvbnMhLi9WU3ZnLnZ1ZT92dWUmdHlwZT10ZW1wbGF0ZSZpZD0xOTIwMTNkYSZcIiIsImltcG9ydCBlZSBmcm9tICcuL2xpYnMvZXZlbnRFbWl0dGVyJztcbmltcG9ydCBodHRwIGZyb20gJy4vbGlicy9odHRwJztcbmltcG9ydCBpY29uIGZyb20gJy4vbGlicy9pY29uJztcbmltcG9ydCByZWdpc3RlclN0b3JlIGZyb20gJy4vbGlicy9yZWdpc3RlclN0b3JlJztcbmltcG9ydCByb3V0ZXIgZnJvbSAnLi4vcm91dGVzJztcbmltcG9ydCBzdGF0aWNBc3NldHMgZnJvbSAnLi9saWJzL3N0YXRpY0Fzc2V0cyc7XG5pbXBvcnQgdk1vdW50IGZyb20gJy4vbGlicy92TW91bnQnO1xuaW1wb3J0IHZNb3VudExhenkgZnJvbSAnLi9saWJzL3ZNb3VudExhenknO1xuaW1wb3J0IHZSZXBsYWNlIGZyb20gJy4vbGlicy92UmVwbGFjZSc7XG5cbmV4cG9ydCB7XG4gICAgaHR0cCxcbiAgICByb3V0ZXIsXG4gICAgc3RhdGljQXNzZXRzLFxuICAgIHJlZ2lzdGVyU3RvcmUsXG4gICAgdk1vdW50LFxuICAgIHZNb3VudExhenksXG4gICAgdlJlcGxhY2Vcbn07XG5cbmV4cG9ydCBjb25zdCBpbnN0YWxsID0ge1xuICAgIGluc3RhbGwoVnVlKSB7XG4gICAgICAgIFZ1ZS5wcm90b3R5cGUuJGhlbHBlcnMgPSB7XG4gICAgICAgICAgICBpY29uLFxuICAgICAgICAgICAgaHR0cCxcbiAgICAgICAgICAgIHJvdXRlcixcbiAgICAgICAgICAgIHN0YXRpY0Fzc2V0c1xuICAgICAgICB9O1xuXG4gICAgICAgIFZ1ZS5wcm90b3R5cGUuJGVlID0gZWU7XG4gICAgfVxufTtcbiIsImltcG9ydCBWdWUgZnJvbSAndnVlJztcblxuZXhwb3J0IGRlZmF1bHQgbmV3IFZ1ZTtcbiIsImltcG9ydCBheGlvcyBmcm9tICdheGlvcyc7XG5pbXBvcnQgcXMgZnJvbSAncXMnO1xuaW1wb3J0IHJvdXRlciBmcm9tICdAcm91dGVzJztcblxuY29uc3QgaHR0cCAgPSBheGlvcy5jcmVhdGUoe1xuICAgIGJhc2VVUkw6ICcvJyxcbiAgICBoZWFkZXJzOiB7XG4gICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgICAgICdYLVJlcXVlc3RlZC1XaXRoJzogJ1hNTEh0dHBSZXF1ZXN0J1xuICAgIH0sXG4gICAgcGFyYW1zU2VyaWFsaXplcjogcGFyYW1zID0+IHFzLnN0cmluZ2lmeShwYXJhbXMpXG59KTtcblxuaHR0cC5pbnRlcmNlcHRvcnMucmVxdWVzdC51c2UoKGNvbmZpZykgPT4ge1xuICAgIGlmICh3aW5kb3cuQXBwLmNzcmZUb2tlbiAmJiBjb25maWcubWV0aG9kID09PSAncG9zdCcpIHtcbiAgICAgICAgY29uZmlnLmhlYWRlcnNbJ1gtQ1NSRi1UT0tFTiddID0gd2luZG93LkFwcC5jc3JmVG9rZW47XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbmZpZztcbn0pO1xuXG5odHRwLmludGVyY2VwdG9ycy5yZXNwb25zZS51c2UoKHJlc3BvbnNlKSA9PiB7XG4gICAgcmV0dXJuIHJlc3BvbnNlO1xufSwgKGVycm9yKSA9PiB7XG4gICAgY29uc3QgcXVlcnkgPSBxcy5wYXJzZShkb2N1bWVudC5sb2NhdGlvbi5zZWFyY2gpO1xuXG4gICAgc3dpdGNoIChlcnJvci5yZXNwb25zZS5zdGF0dXMpIHtcbiAgICAgICAgY2FzZSAzMDE6XG4gICAgICAgIGNhc2UgMzAyOlxuICAgICAgICAgICAgZG9jdW1lbnQubG9jYXRpb24uaHJlZiA9IGVycm9yLnJlc3BvbnNlLmRhdGEucmVkaXJlY3RfdXJsO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KGVycm9yKTtcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBodHRwO1xuIiwiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gKG5hbWUpIHtcbiAgICByZXR1cm4gcmVxdWlyZShgQHNyYy9pbWcvc3ZnLyR7bmFtZX0uc3ZnYCk7XG59XG4iLCJpbXBvcnQgeyBnZXQsIHNldCwgbWVyZ2UsIGVhY2ggfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IGRlZXBGb3JFYWNoIGZyb20gJ2RlZXAtZm9yLWVhY2gnO1xuXG5jb25zdCB0eXBlQ29udmVyc2lvbiA9IChkYXRhKSA9PiB7XG4gICAgZGVlcEZvckVhY2goZGF0YSwgKHZhbHVlLCBwcm9wLCBzdWJqZWN0LCBwYXRoKSA9PiB7XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gJ0luZmluaXR5Jykge1xuICAgICAgICAgICAgc2V0KGRhdGEsIHBhdGgsIEluZmluaXR5KTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgcmV0dXJuIGRhdGE7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAobmFtZSwgU3RvcmUsIHN0b3JlKSB7XG4gICAgc3RvcmUgPSBzdG9yZSB8fCByZXF1aXJlKCdAc3RvcmUnKS5kZWZhdWx0O1xuXG4gICAgY29uc3QgaW5pdGlhbFN0YXRlID0gZ2V0KHdpbmRvdywgYF9fcHJlbG9hZC5zdG9yZS4ke25hbWV9YCwgbnVsbCk7XG5cbiAgICBpZiAoaW5pdGlhbFN0YXRlICE9PSBudWxsKSB7XG4gICAgICAgIGNvbnN0IG1vZHVsZXMgPSBnZXQoaW5pdGlhbFN0YXRlLCAnQG1vZHVsZXMnLCBudWxsKTtcblxuICAgICAgICBpZiAobW9kdWxlcyAhPT0gbnVsbCkge1xuICAgICAgICAgICAgZWFjaChtb2R1bGVzLCAoc3RhdGUsIG5hbWUpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBpbml0U3RhdGUgPSBnZXQoU3RvcmUubW9kdWxlcywgYCR7bmFtZX0uc3RhdGVgLCB7fSk7XG5cbiAgICAgICAgICAgICAgICBzZXQoXG4gICAgICAgICAgICAgICAgICAgIFN0b3JlLm1vZHVsZXMsXG4gICAgICAgICAgICAgICAgICAgIGAke25hbWV9LnN0YXRlYCxcbiAgICAgICAgICAgICAgICAgICAgdHlwZUNvbnZlcnNpb24oe1xuICAgICAgICAgICAgICAgICAgICAgICAgLi4uaW5pdFN0YXRlLFxuICAgICAgICAgICAgICAgICAgICAgICAgLi4uc3RhdGVcbiAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGRlbGV0ZSBpbml0aWFsU3RhdGVbICdAbW9kdWxlcycgXTtcbiAgICAgICAgfVxuXG4gICAgICAgIFN0b3JlLnN0YXRlID0gdHlwZUNvbnZlcnNpb24oXG4gICAgICAgICAgICBtZXJnZShTdG9yZS5zdGF0ZSwgaW5pdGlhbFN0YXRlKVxuICAgICAgICApO1xuICAgIH1cblxuICAgIHN0b3JlLnJlZ2lzdGVyTW9kdWxlKG5hbWUsIFN0b3JlKTtcbn1cbiIsImltcG9ydCB7IHRyaW0gfSBmcm9tICdsb2Rhc2gnO1xuXG5jb25zdCBzdGF0aWNVcmwgPSB0cmltKHdpbmRvdy5BcHAuc3RhdGljVXJsLCAnLycpO1xuXG5leHBvcnQgZGVmYXVsdCAocGF0aCkgPT4gYCR7c3RhdGljVXJsfS8ke3RyaW0ocGF0aCwgJy8nKX1gO1xuIiwiaW1wb3J0IFZ1ZSBmcm9tICd2dWUnO1xuXG5pbXBvcnQgeyBlYWNoLCBjbG9uZSB9IGZyb20gJ2xvZGFzaCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChzZWxlY3RvciwgY29tcG9uZW50KSB7XG4gICAgbGV0IHRhcmdldHM7XG5cbiAgICBpZiAoIXNlbGVjdG9yIHx8ICEodGFyZ2V0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKS5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghY29tcG9uZW50IGluc3RhbmNlb2YgVnVlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVGhpcyBpcyBub3QgVnVlIGNvbXBvbmVudCcpO1xuICAgIH1cblxuICAgIGVhY2godGFyZ2V0cywgKGVsKSA9PiB7XG4gICAgICAgIChuZXcgVnVlKGNsb25lKGNvbXBvbmVudCkpKS4kbW91bnQoZWwpO1xuICAgIH0pO1xufTtcbiIsImltcG9ydCBWdWUgZnJvbSAndnVlJztcbmltcG9ydCB7IGVhY2gsIGNsb25lLCBmbGF0dGVuRGVlcCB9IGZyb20gJ2xvZGFzaCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIChzZWxlY3RvciwgbGF6eUNvbXBvbmVudHMsIGNhbGxiYWNrKSB7XG4gICAgbGV0IHRhcmdldHM7XG5cbiAgICBpZiAoIXNlbGVjdG9yIHx8ICEodGFyZ2V0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoc2VsZWN0b3IpKS5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIFByb21pc2UuYWxsKFxuICAgICAgICBmbGF0dGVuRGVlcChbIGxhenlDb21wb25lbnRzIF0pLm1hcChcbiAgICAgICAgICAgIGxhenlDb21wb25lbnQgPT4gbGF6eUNvbXBvbmVudCgpXG4gICAgICAgIClcbiAgICApLnRoZW4oY29tcG9uZW50cyA9PiB7XG4gICAgICAgIGNvbnN0IGNvbXBvbmVudCA9IGNhbGxiYWNrKFxuICAgICAgICAgICAgLi4uY29tcG9uZW50cy5tYXAoYyA9PiBjLmRlZmF1bHQpXG4gICAgICAgICk7XG5cbiAgICAgICAgZWFjaCh0YXJnZXRzLCBlbCA9PiB7XG4gICAgICAgICAgICAobmV3IFZ1ZShjbG9uZShjb21wb25lbnQpKSkuJG1vdW50KGVsKTtcbiAgICAgICAgfSk7XG4gICAgfSk7XG59O1xuIiwiaW1wb3J0IHsgZWFjaCwgY29uY2F0LCBjbG9uZSB9IGZyb20gJ2xvZGFzaCc7XG5cbmZ1bmN0aW9uIGluaXQoZWwsIGNvbXBvbmVudCwgcm9vdFBhcmFtcyA9IHt9LCBjb21wb25lbnRQYXJhbXMgPSB7fSkge1xuICAgIGNvbnN0IHRtcEVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbC50YWdOYW1lKTtcbiAgICB0bXBFbC5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG5cbiAgICBlbC5wYXJlbnROb2RlLmluc2VydEJlZm9yZSh0bXBFbCwgZWwpO1xuXG4gICAgKG5ldyBWdWUoe1xuICAgICAgICAuLi5yb290UGFyYW1zLFxuICAgICAgICByZW5kZXIoaCkge1xuICAgICAgICAgICAgY29tcG9uZW50Lm1peGlucyA9IGNvbmNhdChjb21wb25lbnQubWl4aW5zIHx8IFtdLCBbXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBtb3VudGVkKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy4kZWwuc3R5bGUgJiYgdGhpcy4kZWwuc3R5bGUucmVtb3ZlUHJvcGVydHkoJ2Rpc3BsYXknKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsLnJlbW92ZSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgXSk7XG5cbiAgICAgICAgICAgIHJldHVybiBoKGNvbXBvbmVudCwge1xuICAgICAgICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICAgICAgICAgIGRpc3BsYXk6ICdub25lJ1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgLi4uY29tcG9uZW50UGFyYW1zXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH0pKS4kbW91bnQodG1wRWwpO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiAoc2VsZWN0b3IsIGNvbXBvbmVudCwgcm9vdFBhcmFtcyA9IHt9LCBjb21wb25lbnRQYXJhbXMgPSB7fSkge1xuICAgIGxldCB0YXJnZXRzO1xuXG4gICAgaWYgKHNlbGVjdG9yIGluc3RhbmNlb2YgSFRNTEVsZW1lbnQpIHtcbiAgICAgICAgcmV0dXJuIGluaXQoc2VsZWN0b3IsIGNsb25lKGNvbXBvbmVudCksIHJvb3RQYXJhbXMsIGNvbXBvbmVudFBhcmFtcyk7XG4gICAgfVxuXG4gICAgaWYgKCFzZWxlY3RvciB8fCAhKHRhcmdldHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKHNlbGVjdG9yKSkubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIWNvbXBvbmVudCBpbnN0YW5jZW9mIFZ1ZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoaXMgaXMgbm90IFZ1ZSBjb21wb25lbnQnKTtcbiAgICB9XG5cbiAgICBlYWNoKHRhcmdldHMsIChlbCkgPT4gaW5pdChcbiAgICAgICAgZWwsXG4gICAgICAgIGNsb25lKGNvbXBvbmVudCksXG4gICAgICAgIHJvb3RQYXJhbXMsXG4gICAgICAgIGNvbXBvbmVudFBhcmFtc1xuICAgICkpO1xufTtcbiIsImltcG9ydCAncmVnZW5lcmF0b3ItcnVudGltZS9ydW50aW1lJztcblxuaW1wb3J0IFZ1ZSBmcm9tICd2dWUnO1xuaW1wb3J0IHsgZ2V0IH0gZnJvbSAnbG9kYXNoJztcblxuaW1wb3J0ICdAc3RvcmUnO1xuXG5pbXBvcnQgSTE4biBmcm9tICdAcGx1Z2lucy9pMThuJztcbmltcG9ydCBWdWVGb3JtIGZyb20gJ0BwbHVnaW5zL2Zvcm1zJztcbmltcG9ydCBUYXNrTWFuYWdlciBmcm9tICdAcGx1Z2lucy90YXNrTWFuYWdlcic7XG5pbXBvcnQgJy4vcG9seWZpbGxzL2Nsb3Nlc3QnO1xuXG5pbXBvcnQgeyBodHRwLCBpbnN0YWxsIGFzIEhlbHBlcnNJbnN0YWxsZXIgfSBmcm9tICdAaGVscGVycyc7XG5cbmltcG9ydCBWU3ZnIGZyb20gJ0Bjb21wb25lbnRzL1ZTdmcnO1xuaW1wb3J0IFZGaWVsZCBmcm9tICdAY29tcG9uZW50cy9WRmllbGQnO1xuXG5WdWUuY29tcG9uZW50KCd2LXN2ZycsIFZTdmcpO1xuVnVlLmNvbXBvbmVudCgndi1maWVsZCcsIFZGaWVsZCk7XG5cblZ1ZUZvcm0uY29uZmlnKHtcbiAgICBodHRwQ2xpZW50OiBodHRwXG59KTtcblxuSTE4bi5jb25maWcoe1xuICAgIGN1cnJlbnRMYW5ndWFnZTogZ2V0KHdpbmRvdywgJ0FwcC5jdXJyZW50TGFuZ3VhZ2UnLCAnZW4nKSxcbiAgICBkaWN0aW9uYXJ5OiBnZXQod2luZG93LCAnX19wcmVsb2FkLnN0b3Jlcy5pMThuJywge30pXG59KTtcblxuVnVlLnVzZShIZWxwZXJzSW5zdGFsbGVyKTtcblZ1ZS51c2UoSTE4bik7XG5WdWUudXNlKFZ1ZUZvcm0pO1xuVnVlLnVzZShUYXNrTWFuYWdlcik7XG5cblZ1ZUZvcm0ucHJlbG9hZChcbiAgICBnZXQod2luZG93LCAnX19wcmVsb2FkLmZvcm1zJywge30pXG4pO1xuXG5jb25zdCBmaWxlcyA9IHJlcXVpcmUuY29udGV4dCgnLi9tb2R1bGVzJywgdHJ1ZSwgL1xcLlxcL1xcdysoW1xcX1xcLV0rXFx3KykqXFwvaW5kZXhcXC5qcyQvKTtcblxuZmlsZXMua2V5cygpLmZvckVhY2goXG4gICAga2V5ID0+IGZpbGVzKGtleSlcbik7XG5cbmNvbnNvbGUubG9nKFxuICAgIHJlcXVpcmUoJy4uL2ltZy8yMDE4MDcyNS5qcGcnKVxuKTtcbiIsInZhciBtYXAgPSB7XG5cdFwiLi9nZW5lcmFsL2luZGV4LmpzXCI6IFwiLi4vc3JjL2pzL21vZHVsZXMvZ2VuZXJhbC9pbmRleC5qc1wiXG59O1xuXG5cbmZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0KHJlcSkge1xuXHR2YXIgaWQgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKTtcblx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oaWQpO1xufVxuZnVuY3Rpb24gd2VicGFja0NvbnRleHRSZXNvbHZlKHJlcSkge1xuXHR2YXIgaWQgPSBtYXBbcmVxXTtcblx0aWYoIShpZCArIDEpKSB7IC8vIGNoZWNrIGZvciBudW1iZXIgb3Igc3RyaW5nXG5cdFx0dmFyIGUgPSBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiICsgcmVxICsgXCInXCIpO1xuXHRcdGUuY29kZSA9ICdNT0RVTEVfTk9UX0ZPVU5EJztcblx0XHR0aHJvdyBlO1xuXHR9XG5cdHJldHVybiBpZDtcbn1cbndlYnBhY2tDb250ZXh0LmtleXMgPSBmdW5jdGlvbiB3ZWJwYWNrQ29udGV4dEtleXMoKSB7XG5cdHJldHVybiBPYmplY3Qua2V5cyhtYXApO1xufTtcbndlYnBhY2tDb250ZXh0LnJlc29sdmUgPSB3ZWJwYWNrQ29udGV4dFJlc29sdmU7XG5tb2R1bGUuZXhwb3J0cyA9IHdlYnBhY2tDb250ZXh0O1xud2VicGFja0NvbnRleHQuaWQgPSBcIi4uL3NyYy9qcy9tb2R1bGVzIHN5bmMgcmVjdXJzaXZlIFxcXFwuXFxcXC9cXFxcdysoW1xcXFxfXFxcXC1dK1xcXFx3KykqXFxcXC9pbmRleFxcXFwuanMkXCI7IiwidmFyIG1hcCA9IHtcblx0XCIuL2dlbmVyYWwvc3RvcmUvaW5kZXguanNcIjogXCIuLi9zcmMvanMvbW9kdWxlcy9nZW5lcmFsL3N0b3JlL2luZGV4LmpzXCJcbn07XG5cblxuZnVuY3Rpb24gd2VicGFja0NvbnRleHQocmVxKSB7XG5cdHZhciBpZCA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZShyZXEpO1xuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhpZCk7XG59XG5mdW5jdGlvbiB3ZWJwYWNrQ29udGV4dFJlc29sdmUocmVxKSB7XG5cdHZhciBpZCA9IG1hcFtyZXFdO1xuXHRpZighKGlkICsgMSkpIHsgLy8gY2hlY2sgZm9yIG51bWJlciBvciBzdHJpbmdcblx0XHR2YXIgZSA9IG5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIgKyByZXEgKyBcIidcIik7XG5cdFx0ZS5jb2RlID0gJ01PRFVMRV9OT1RfRk9VTkQnO1xuXHRcdHRocm93IGU7XG5cdH1cblx0cmV0dXJuIGlkO1xufVxud2VicGFja0NvbnRleHQua2V5cyA9IGZ1bmN0aW9uIHdlYnBhY2tDb250ZXh0S2V5cygpIHtcblx0cmV0dXJuIE9iamVjdC5rZXlzKG1hcCk7XG59O1xud2VicGFja0NvbnRleHQucmVzb2x2ZSA9IHdlYnBhY2tDb250ZXh0UmVzb2x2ZTtcbm1vZHVsZS5leHBvcnRzID0gd2VicGFja0NvbnRleHQ7XG53ZWJwYWNrQ29udGV4dC5pZCA9IFwiLi4vc3JjL2pzL21vZHVsZXMgc3luYyByZWN1cnNpdmUgXFxcXC9zdG9yZVxcXFwvaW5kZXhcXFxcLmpzJFwiOyIsImltcG9ydCB7IHZNb3VudCB9IGZyb20gJ0BoZWxwZXJzJztcblxuLy8gaW1wb3J0IFRlc3QgZnJvbSAnLi9jb21wb25lbnRzL1Rlc3QudnVlJztcblxuLy8gdk1vdW50KCcjZWwnLCB7XG4vLyAgICAgc3RvcmUsXG4vLyAgICAgcmVuZGVyKGgpIHtcbi8vICAgICAgICAgcmV0dXJuIGgoVGVzdCk7XG4vLyAgICAgfVxuLy8gfSk7XG4iLCJleHBvcnQgZGVmYXVsdCB7XG4gICAgbmFtZXNwYWNlZDogdHJ1ZSxcbiAgICBzdGF0ZToge30sXG4gICAgZ2V0dGVyczoge30sXG4gICAgbXV0YXRpb25zOiB7fSxcbiAgICBhY3Rpb25zOiB7fVxufTtcbiIsImltcG9ydCBWdWUgZnJvbSAndnVlJztcblxuaW1wb3J0IF8gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IGRlZXBNb2RlbCB9IGZyb20gJ3Z1ZS1kZWVwc2V0JztcbmltcG9ydCBxcyBmcm9tICdxcyc7XG5cbmxldCBfX3N0b3JlO1xubGV0IF9fY29uZmlnID0ge1xuICAgIGRlZmF1bHRSZXF1ZXN0VHlwZTogJ2pzb24nLFxuICAgIHBhcmFtc1NlcmlhbGl6ZXI6IChwYXJhbXMpID0+IHFzLnN0cmluZ2lmeShwYXJhbXMpXG59O1xubGV0IF9fbW9kZWxzID0ge307XG5sZXQgX19mb3JtcyA9IGZ1bmN0aW9uIChuYW1lKSB7fTtcblxuZnVuY3Rpb24gcHJlcGFyZVBvc3REYXRhKGRhdGEsIGRhdGFUeXBlID0gX19jb25maWcuZGVmYXVsdFJlcXVlc3RUeXBlKSB7XG4gICAgaWYgKGRhdGFUeXBlID09PSAnanNvbicpIHtcbiAgICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuXG4gICAgcmV0dXJuIF8ucmVkdWNlKFxuICAgICAgICBkYXRhLFxuICAgICAgICAoY2FycnksIHZhbHVlLCBuYW1lKSA9PiB7XG4gICAgICAgICAgICBpZiAoXy5pc0FycmF5KHZhbHVlKSB8fCBfLmlzUGxhaW5PYmplY3QodmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgXy5lYWNoKHZhbHVlLCAoaXRlbSwga2V5KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNhcnJ5LmFwcGVuZChgJHtuYW1lfVske2tleX1dYCwgaXRlbSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGNhcnJ5LmFwcGVuZChuYW1lLCB2YWx1ZSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiBjYXJyeTtcbiAgICAgICAgfSxcbiAgICAgICAgbmV3IEZvcm1EYXRhXG4gICAgKTtcbn1cblxuZnVuY3Rpb24gX19uYW1lc3BhY2UoKSB7XG4gICAgcmV0dXJuIF8uZ2V0KF9fY29uZmlnLCAnbmFtZXNwYWNlJywgJ2Zvcm1zJyk7XG59XG5cbmZ1bmN0aW9uIF9fYWN0aW9uKGFjdGlvbikge1xuICAgIHJldHVybiBfX25hbWVzcGFjZSgpICsgJy8nICsgYWN0aW9uO1xufVxuXG5mdW5jdGlvbiBfX2dldHRlcihnZXR0ZXIpIHtcbiAgICByZXR1cm4gX19uYW1lc3BhY2UoKSArICcvJyArIGdldHRlcjtcbn1cblxuZnVuY3Rpb24gX19jcmVhdGVNb2RlbChuYW1lKSB7XG4gICAgcmV0dXJuIG5ldyBWdWUoe1xuICAgICAgICBkYXRhOiAoKSA9PiAoe1xuICAgICAgICAgICAgb2xkOiB7fVxuICAgICAgICB9KSxcbiAgICAgICAgc3RvcmU6IF9fc3RvcmUsXG4gICAgICAgIGNvbXB1dGVkOiB7XG4gICAgICAgICAgICBuYW1lOiAoKSA9PiBuYW1lLFxuXG4gICAgICAgICAgICBlcnJvcnMoKSB7XG4gICAgICAgICAgICAgICAgbGV0IHN0b3JhZ2UgPSBfX3N0b3JlLnN0YXRlWyBfX25hbWVzcGFjZSgpIF07XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gXy5nZXQoc3RvcmFnZS5lcnJvcnMsIG5hbWUsIHt9KTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHJlc3BvbnNlKCkge1xuICAgICAgICAgICAgICAgIGxldCBzdG9yYWdlID0gX19zdG9yZS5zdGF0ZVsgX19uYW1lc3BhY2UoKSBdO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIF8uZ2V0KHN0b3JhZ2UucmVzcG9uc2VzLCBuYW1lLCBudWxsKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIGRhdGEoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGRlZXBNb2RlbC5iaW5kKHRoaXMpKGAke19fbmFtZXNwYWNlKCl9LmRhdGEuJHtuYW1lfWApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBtZXRob2RzOiB7XG4gICAgICAgICAgICBmb3JtYXRFcnJvcnMobmFtZXMsIGRlbGltaXRlciA9ICcuICcpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBlcnJvcnMgPSBfLmZsYXR0ZW5EZWVwKFtuYW1lc10pXG4gICAgICAgICAgICAgICAgICAgIC5tYXAobmFtZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuZXJyb3JzWyBuYW1lIF0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuZXJyb3JzWyBuYW1lIF07XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgIC5maWx0ZXIodmFsdWUgPT4gdmFsdWUpO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFlcnJvcnMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiBlcnJvcnMuam9pbihkZWxpbWl0ZXIpO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgaGFzRXJyb3JzKC4uLm5hbWVzKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5hbWVzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gIV8uaXNFbXB0eSh0aGlzLmVycm9ycyk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmV0dXJuIF8uZmxhdHRlbkRlZXAoW25hbWVzXSkuc29tZShcbiAgICAgICAgICAgICAgICAgICAgbmFtZSA9PiAhIXRoaXMuZXJyb3JzWyBuYW1lIF1cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgcmVtb3ZlKGZpZWxkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIF9fc3RvcmUuZGlzcGF0Y2goX19hY3Rpb24oJ3JlbW92ZScpLCB7IG5hbWUsIGZpZWxkIH0pO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgcmVzZXQoZGF0YSA9IHt9KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKFtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXREYXRhKGRhdGEpLFxuICAgICAgICAgICAgICAgICAgICBfX3N0b3JlLmRpc3BhdGNoKF9fYWN0aW9uKCdjbGVhckVycm9ycycpLCBuYW1lKVxuICAgICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgZmlsbChmaWVsZHMpIHtcbiAgICAgICAgICAgICAgICBfLmVhY2goZmllbGRzLCAodmFsdWUsIGZpZWxkKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZGF0YVsgZmllbGQgXSA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgc2V0RGF0YShkYXRhID0ge30sIHJlbWVtYmVyID0gdHJ1ZSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlcXVlc3QgPSBfX3N0b3JlLmRpc3BhdGNoKF9fYWN0aW9uKCdzZXREYXRhJyksIHtcbiAgICAgICAgICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgZGF0YVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgaWYgKHJlbWVtYmVyKSB7XG4gICAgICAgICAgICAgICAgICAgIHJlcXVlc3QudGhlbihcbiAgICAgICAgICAgICAgICAgICAgICAgICgpID0+IHRoaXMucmVtZW1iZXIoKVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiByZXF1ZXN0O1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgc3VibWl0KG1ldGhvZCwgdXJsLCBvcHRpb25zID0ge30pIHtcbiAgICAgICAgICAgICAgICBjb25zdCBkYXRhID0gXy5hc3NpZ24oXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMuZmlsdGVyID8gXy5waWNrQnkodGhpcy5kYXRhLCBvcHRpb25zLmZpbHRlcikgOiB0aGlzLmRhdGEsXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnMuZGF0YSB8fCB7fVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgY29uc3QgcXVlcnlQYXJhbXMgPSBvcHRpb25zLnBhcmFtcyB8fCB7fTtcbiAgICAgICAgICAgICAgICBjb25zdCBodHRwID0gX19jb25maWcuaHR0cENsaWVudCB8fCByZXF1aXJlKCdheGlvcycpO1xuXG4gICAgICAgICAgICAgICAgbGV0IHJlc3BvbnNlO1xuXG4gICAgICAgICAgICAgICAgaWYgKG1ldGhvZC50b0xvd2VyQ2FzZSgpID09PSAncG9zdCcpIHtcbiAgICAgICAgICAgICAgICAgICAgcmVzcG9uc2UgPSBodHRwWyBtZXRob2QgXShcbiAgICAgICAgICAgICAgICAgICAgICAgIHVybCxcbiAgICAgICAgICAgICAgICAgICAgICAgIHByZXBhcmVQb3N0RGF0YShkYXRhLCBvcHRpb25zLmRhdGFUeXBlKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuLi4ob3B0aW9ucy5jb25maWcgfHwge30pLFxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcGFyYW1zOiBxdWVyeVBhcmFtc1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc3BvbnNlID0gaHR0cFsgbWV0aG9kIF0odXJsLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBwYXJhbXM6IF8uYXNzaWduKGRhdGEsIHF1ZXJ5UGFyYW1zKSxcbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLm9wdGlvbnMuY29uZmlnIHx8IHt9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJlc3BvbnNlLmNhdGNoKChkYXRhKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLnJlc3BvbnNlLnN0YXR1cyA9PT0gNDIyKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBfX3N0b3JlLmRpc3BhdGNoKF9fYWN0aW9uKCdmaWxsRXJyb3JzJyksIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVycm9yczogZGF0YS5yZXNwb25zZS5kYXRhLmVycm9yc1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgIHJlc3BvbnNlLnRoZW4oZGF0YSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIF9fc3RvcmUuZGlzcGF0Y2goX19hY3Rpb24oJ2NsZWFyRXJyb3JzJyksIG5hbWUpO1xuXG4gICAgICAgICAgICAgICAgICAgIF9fc3RvcmUuZGlzcGF0Y2goX19hY3Rpb24oJ3NldFJlc3BvbnNlJyksIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgb25DaGFuZ2UoY2FsbGJhY2ssIGNvbmZpZyA9IHt9KSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMud2F0Y2gobnVsbCwgY2FsbGJhY2ssIGNvbmZpZyk7XG4gICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICB3YXRjaChmaWVsZCA9IG51bGwsIGNhbGxiYWNrLCBjb25maWcgPSB7fSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHBhdGggPSBmaWVsZCAhPT0gbnVsbCA/XG4gICAgICAgICAgICAgICAgICAgIGAke19fbmFtZXNwYWNlKCl9LmRhdGEuJHtuYW1lfS4ke2ZpZWxkfWAgOlxuICAgICAgICAgICAgICAgICAgICBgJHtfX25hbWVzcGFjZSgpfS5kYXRhLiR7bmFtZX1gO1xuXG4gICAgICAgICAgICAgICAgbGV0IG9sZFZhbHVlID0gdHlwZW9mIF8uZ2V0KF9fc3RvcmUuc3RhdGUsIHBhdGgpICE9PSAndW5kZWZpbmVkJyA/XG4gICAgICAgICAgICAgICAgICAgIEpTT04ucGFyc2UoXG4gICAgICAgICAgICAgICAgICAgICAgICBKU09OLnN0cmluZ2lmeShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfLmdldChfX3N0b3JlLnN0YXRlLCBwYXRoKVxuICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICApIDpcbiAgICAgICAgICAgICAgICAgICAgdW5kZWZpbmVkO1xuXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHN0b3JlLndhdGNoKFxuICAgICAgICAgICAgICAgICAgICBzdG9yZSA9PiAoe1xuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0OiBfLmdldChzdG9yZSwgcGF0aClcbiAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICh7IHJlc3VsdCB9KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoSlNPTi5zdHJpbmdpZnkocmVzdWx0KSAhPT0gSlNPTi5zdHJpbmdpZnkob2xkVmFsdWUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY2FsbGJhY2socmVzdWx0LCBvbGRWYWx1ZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBvbGRWYWx1ZSA9IHVuZGVmaW5lZCAhPT0gcmVzdWx0ID9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgSlNPTi5wYXJzZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEpTT04uc3RyaW5naWZ5KHJlc3VsdClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVuZGVmaW5lZDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGVlcDogZmllbGQgPT09IG51bGwsXG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC4uLmNvbmZpZ1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHJlbWVtYmVyKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuJGRhdGEub2xkID0gSlNPTi5wYXJzZShcbiAgICAgICAgICAgICAgICAgICAgSlNPTi5zdHJpbmdpZnkodGhpcy5kYXRhKVxuICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgIHJlc3RvcmUoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zZXREYXRhKHRoaXMuJGRhdGEub2xkKTtcblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgY2hhbmdlZChmaWVsZCkge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy4kZGF0YS5vbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxldCBvbGRWYWx1ZSwgY3VycmVudFZhbHVlO1xuXG4gICAgICAgICAgICAgICAgaWYgKCFmaWVsZCkge1xuICAgICAgICAgICAgICAgICAgICBvbGRWYWx1ZSA9IHRoaXMuJGRhdGEub2xkO1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50VmFsdWUgPSB0aGlzLmRhdGE7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgb2xkVmFsdWUgPSBfLmdldCh0aGlzLiRkYXRhLm9sZCwgZmllbGQpO1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50VmFsdWUgPSBfLmdldCh0aGlzLmRhdGEsIGZpZWxkKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkob2xkVmFsdWUpICE9PSBKU09OLnN0cmluZ2lmeShjdXJyZW50VmFsdWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgICBmb3JtczogKG5hbWUsIGRhdGEpID0+IF9fZm9ybXMobmFtZSwgZGF0YSksXG4gICAgY29uZmlnKGNvbmZpZyA9IHt9KSB7XG4gICAgICAgIF9fY29uZmlnID0gXy5tZXJnZSh7fSwgX19jb25maWcsIGNvbmZpZyk7XG4gICAgfSxcbiAgICBpbnN0YWxsKFZ1ZSkge1xuICAgICAgICBWdWUgPSBWdWU7XG5cbiAgICAgICAgX19mb3JtcyA9IChmdW5jdGlvbiAobmFtZSwgZGF0YSkge1xuICAgICAgICAgICAgaWYgKCFfLmhhcyhfX21vZGVscywgbmFtZSkpIHtcbiAgICAgICAgICAgICAgICBfX3N0b3JlLmRpc3BhdGNoKF9fYWN0aW9uKCdyZWdpc3RlcicpLCB7XG4gICAgICAgICAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICAgICAgICAgIGRhdGFcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIF9fbW9kZWxzWyBuYW1lIF07XG4gICAgICAgIH0pLmJpbmQoVnVlKTtcblxuICAgICAgICBWdWUucHJvdG90eXBlLiRmb3JtcyA9IF9fZm9ybXM7XG5cbiAgICAgICAgVnVlLnByb3RvdHlwZS4kdGhpc0Zvcm0gPSBmdW5jdGlvbiAocmVzb3VyY2UgPSBudWxsKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMuJG9wdGlvbnMuZm9ybSA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Zvcm0gbmFtZSBub3QgZGVmaW5lZCcpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCBmb3JtTmFtZSA9IF8uaXNGdW5jdGlvbih0aGlzLiRvcHRpb25zLmZvcm0pID9cbiAgICAgICAgICAgICAgICB0aGlzLiRvcHRpb25zLmZvcm0uYmluZCh0aGlzKSgpIDpcbiAgICAgICAgICAgICAgICB0aGlzLiRvcHRpb25zLmZvcm07XG5cbiAgICAgICAgICAgIHJldHVybiByZXNvdXJjZSAhPT0gbnVsbCA/XG4gICAgICAgICAgICAgICAgdGhpcy4kZm9ybXMoZm9ybU5hbWUpWyByZXNvdXJjZSBdIDpcbiAgICAgICAgICAgICAgICB0aGlzLiRmb3Jtcyhmb3JtTmFtZSk7XG4gICAgICAgIH07XG5cbiAgICAgICAgVnVlLiRmb3JtcyA9IF9fZm9ybXM7XG4gICAgfSxcbiAgICBzdG9yZVJlZ2lzdGVyZXIoc3RvcmUpIHtcbiAgICAgICAgX19zdG9yZSA9IHN0b3JlO1xuXG4gICAgICAgIHN0b3JlLnJlZ2lzdGVyTW9kdWxlKF9fbmFtZXNwYWNlKCksIHtcbiAgICAgICAgICAgIG5hbWVzcGFjZWQ6IHRydWUsXG4gICAgICAgICAgICBzdGF0ZToge1xuICAgICAgICAgICAgICAgIGRhdGE6IHt9LFxuICAgICAgICAgICAgICAgIGVycm9yczoge30sXG4gICAgICAgICAgICAgICAgcmVzcG9uc2VzOiB7fVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG11dGF0aW9uczoge1xuICAgICAgICAgICAgICAgIFNFVF9EQVRBOiAoc3RhdGUsIHsgbmFtZSwgZGF0YSB9KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIFZ1ZS5zZXQoc3RhdGUuZGF0YSwgbmFtZSwgZGF0YSk7XG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIFJFR0lTVEVSOiAoc3RhdGUsIHsgbmFtZSB9KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChfX21vZGVscy5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgVnVlLnNldChzdGF0ZS5kYXRhLCBuYW1lLCB7fSk7XG5cbiAgICAgICAgICAgICAgICAgICAgX19tb2RlbHNbIG5hbWUgXSA9IF9fY3JlYXRlTW9kZWwobmFtZSk7XG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIFJFU0VUOiAoc3RhdGUsIG5hbWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgVnVlLmRlbGV0ZShzdGF0ZS5kYXRhLCBuYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgVnVlLmRlbGV0ZShzdGF0ZS5lcnJvcnMsIG5hbWUpO1xuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICBGSUxMX0VSUk9SUzogKHN0YXRlLCB7IG5hbWUsIGVycm9ycyB9KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIFZ1ZS5zZXQoc3RhdGUuZXJyb3JzLCBuYW1lLCBlcnJvcnMpO1xuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICBDTEVBUl9FUlJPUlM6IChzdGF0ZSwgbmFtZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBWdWUuZGVsZXRlKHN0YXRlLmVycm9ycywgbmFtZSk7XG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIFNFVF9SRVNQT05TRTogKHN0YXRlLCB7IG5hbWUsIGRhdGEgfSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBWdWUuc2V0KHN0YXRlLnJlc3BvbnNlcywgbmFtZSwgZGF0YSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFjdGlvbnM6IHtcbiAgICAgICAgICAgICAgICByZWdpc3RlcjogKHsgY29tbWl0IH0sIHBheWxvYWQpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29tbWl0KCdSRUdJU1RFUicsIHBheWxvYWQpO1xuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICBzZXREYXRhOiAoeyBjb21taXQgfSwgcGF5bG9hZCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb21taXQoJ1NFVF9EQVRBJywgcGF5bG9hZCk7XG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIHJlc2V0OiAoeyBjb21taXQgfSwgbmFtZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb21taXQoJ1JFU0VUJywgbmFtZSk7XG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIGZpbGxFcnJvcnM6ICh7IGNvbW1pdCB9LCB7IG5hbWUsIGVycm9ycyB9KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbW1pdCgnRklMTF9FUlJPUlMnLCB7IG5hbWUsIGVycm9ycyB9KTtcbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgY2xlYXJFcnJvcnM6ICh7IGNvbW1pdCB9LCBuYW1lKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbW1pdCgnQ0xFQVJfRVJST1JTJywgbmFtZSk7XG4gICAgICAgICAgICAgICAgfSxcblxuICAgICAgICAgICAgICAgIHNldFJlc3BvbnNlOiAoeyBjb21taXQgfSwgcGF5bG9hZCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb21taXQoJ1NFVF9SRVNQT05TRScsIHBheWxvYWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfSxcbiAgICBwcmVsb2FkKGZvcm1zKSB7XG4gICAgICAgIGlmIChfLmlzRW1wdHkoZm9ybXMpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBfLmVhY2goZm9ybXMsICh7IGRhdGEgfSwgbmFtZSkgPT4ge1xuICAgICAgICAgICAgX19zdG9yZS5kaXNwYXRjaChcbiAgICAgICAgICAgICAgICBfX2FjdGlvbigncmVnaXN0ZXInKSxcbiAgICAgICAgICAgICAgICB7IG5hbWUgfVxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgX19zdG9yZS5kaXNwYXRjaChcbiAgICAgICAgICAgICAgICBfX2FjdGlvbignc2V0RGF0YScpLFxuICAgICAgICAgICAgICAgIHsgbmFtZSwgZGF0YSB9XG4gICAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICB9XG59O1xuIiwiaW1wb3J0IHsgZ2V0LCBpc0FycmF5LCBtZXJnZSB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgcHJpbnQgZnJvbSAnc3ByaW50Zi1qcyc7XG5cbmxldCBfX2NvbmZpZyA9IHt9O1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgaW5zdGFsbChWdWUpIHtcbiAgICAgICAgVnVlLnByb3RvdHlwZS4kdCA9IGZ1bmN0aW9uICh0ZXh0LCBzY29wZSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHN0b3JlLmdldHRlcnNbJ2kxOG4vdHJhbnNsYXRlJ10odGV4dCk7XG4gICAgICAgIH07XG5cbiAgICAgICAgVnVlLnByb3RvdHlwZS4kdGkgPSBmdW5jdGlvbiAodGV4dCwgYXJncywgc2NvcGUpIHtcbiAgICAgICAgICAgIGlmICghaXNBcnJheShhcmdzKSkge1xuICAgICAgICAgICAgICAgIHRocm93IEVycm9yKCdBcmd1bWVudHMgbXVzdCBiZWUgYXJyYXknKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHByaW50LnNwcmludGYoXG4gICAgICAgICAgICAgICAgdGhpcy4kdCh0ZXh0KSxcbiAgICAgICAgICAgICAgICAuLi5hcmdzXG4gICAgICAgICAgICApO1xuICAgICAgICB9O1xuICAgIH0sXG4gICAgc3RvcmVSZWdpc3RlcihzdG9yZSkge1xuICAgICAgICBzdG9yZS5yZWdpc3Rlck1vZHVsZSgnaTE4bicsIHtcbiAgICAgICAgICAgIG5hbWVzcGFjZWQ6IHRydWUsXG4gICAgICAgICAgICBzdGF0ZToge1xuICAgICAgICAgICAgICAgIGRpY3Rpb25hcnk6IG1lcmdlKFxuICAgICAgICAgICAgICAgICAgICB7fSxcbiAgICAgICAgICAgICAgICAgICAgZ2V0KF9fY29uZmlnLCAnZGljdGlvbmFyeScsIHt9KVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBnZXR0ZXJzOiB7XG4gICAgICAgICAgICAgICAgdHJhbnNsYXRlOiAoeyBkaWN0aW9uYXJ5IH0pID0+ICh0ZXh0LCBsb2NhbGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGdldChkaWN0aW9uYXJ5LCB0ZXh0LCB0ZXh0KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbXV0YXRpb25zOiB7XG4gICAgICAgICAgICAgICAgc2V0Q3VycmVudExvY2FsZTogKHN0YXRlLCBMb2NhbGUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgc3RhdGUuTG9jYWxlID0gTG9jYWxlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBhY3Rpb25zOiB7XG4gICAgICAgICAgICAgICAgY2hhbmdlQ3VycmVudExhbmd1YWdlOiAoeyBjb21taXQgfSwgTG9jYWxlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbW1pdCgnc2V0Q3VycmVudExvY2FsZScsIExvY2FsZSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgfSxcbiAgICBjb25maWcoY29uZmlnID0ge30pIHtcbiAgICAgICAgX19jb25maWcgPSBtZXJnZSh7fSwgX19jb25maWcsIGNvbmZpZyk7XG4gICAgfVxufTtcbiIsImltcG9ydCB7IGlzQXJyYXksIGlzT2JqZWN0LCByZWR1Y2UsIGZpbHRlciB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgcXMgZnJvbSAncXMnO1xuXG4vKipcbiAqIEBwYXJhbSBzdHJpbmcgdXJpXG4gKiBAcGFyYW0gc3RyaW5nfG51bWJlcnxBcnJheXxPYmplY3QgcGFyYW1zXG4gKiBAcmV0dXJuIHN0cmluZ1xuICogQHRocm93cyBFcnJvclxuICovXG5leHBvcnQgZGVmYXVsdCAodXJpLCBwYXJhbXMsIHF1ZXJ5KSA9PiB7XG4gICAgY29uc3QgcGxhY2Vob2xkZXJzID0gdXJpXG4gICAgICAgIC5zcGxpdCgnLycpXG4gICAgICAgIC5maWx0ZXIoKHBhcmFtKSA9PiAvXFx7LipcXH0vLnRlc3QocGFyYW0pKVxuICAgICAgICAubWFwKChwYXJhbSkgPT4gcGFyYW0ucmVwbGFjZSgneycsICcnKS5yZXBsYWNlKCd9JywgJycpKVxuICAgIDtcblxuICAgIGxldCB1cmw7XG5cbiAgICBpZiAoaXNBcnJheShwYXJhbXMpKSB7XG4gICAgICAgIHVybCA9IGJpbmRBcnJheSh1cmksIHBsYWNlaG9sZGVycywgcGFyYW1zKTtcbiAgICB9IGVsc2UgaWYgKGlzT2JqZWN0KHBhcmFtcykpIHtcbiAgICAgICAgdXJsID0gYmluZE9iamVjdCh1cmksIHBsYWNlaG9sZGVycywgcGFyYW1zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB1cmwgPSBiaW5kU3RyaW5nKHVyaSwgcGxhY2Vob2xkZXJzLCBwYXJhbXMpO1xuICAgIH1cblxuICAgIHJldHVybiBxdWVyeSA/IGAke3VybH0/JHtxcy5zdHJpbmdpZnkocXVlcnkpfWAgOiB1cmw7XG59O1xuXG4vKipcbiAqIEBwYXJhbSBzdHJpbmcgdXJsXG4gKiBAcGFyYW0gc3RyaW5nW10gcGxhY2Vob2xkZXJzXG4gKiBAcGFyYW0gc3RyaW5nW10gcGFyYW1zXG4gKi9cbmZ1bmN0aW9uIGJpbmRBcnJheSh1cmwsIHBsYWNlaG9sZGVycywgcGFyYW1zKSB7XG4gICAgY29uc3QgcmVxdWlyZWRQbGFjZWhvbGRlcnMgPSBmaWx0ZXIoXG4gICAgICAgIHBsYWNlaG9sZGVycyxcbiAgICAgICAgKHZhbHVlKSA9PiB2YWx1ZVt2YWx1ZS5sZW5ndGggLSAxXSAhPT0gJz8nXG4gICAgKTtcblxuICAgIGlmIChwYXJhbXMubGVuZ3RoIDwgcmVxdWlyZWRQbGFjZWhvbGRlcnMubGVuZ3RoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2VkIHJlcXVpcmVkIHBhcmFtZXRlcnMnKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVkdWNlKHBsYWNlaG9sZGVycywgKHN0YXRlLCBwbGFjZWhvbGRlciwgaW5kZXgpID0+IHtcbiAgICAgICAgaWYgKCFwYXJhbXNbaW5kZXhdXG4gICAgICAgICAgICAmJiByZXF1aXJlZFBsYWNlaG9sZGVycy5pbmRleE9mKHBsYWNlaG9sZGVyKSA9PT0gLTEpIHtcbiAgICAgICAgICAgIHJldHVybiBzdGF0ZS5yZXBsYWNlKGAveyR7cGxhY2Vob2xkZXJ9fWAsICcnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzdGF0ZS5yZXBsYWNlKGB7JHtwbGFjZWhvbGRlcn19YCwgcGFyYW1zW2luZGV4XSk7XG4gICAgfSwgdXJsKTtcbn1cblxuLyoqXG4gKiBAcGFyYW0gc3RyaW5nIHVybFxuICogQHBhcmFtIHN0cmluZ1tdIHBsYWNlaG9sZGVyc1xuICogQHBhcmFtIHN0cmluZ1tdIHBhcmFtc1xuICovXG5mdW5jdGlvbiBiaW5kT2JqZWN0KHVybCwgcGxhY2Vob2xkZXJzLCBwYXJhbXMpIHtcbiAgICByZXR1cm4gcmVkdWNlKHBsYWNlaG9sZGVycywgKHN0YXRlLCBwbGFjZWhvbGRlcikgPT4ge1xuICAgICAgICBpZiAoIXBhcmFtcy5oYXNPd25Qcm9wZXJ0eShwbGFjZWhvbGRlcikpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgTWlzc2VkIHJlcXVpcmVkIHBhcmFtZXRlciBbJHtwbGFjZWhvbGRlcn1dYCk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc3RhdGUucmVwbGFjZShgeyR7cGxhY2Vob2xkZXJ9fWAsIHBhcmFtc1twbGFjZWhvbGRlcl0pO1xuICAgIH0sIHVybCk7XG59XG5cbi8qKlxuICogQHBhcmFtIHN0cmluZyB1cmxcbiAqIEBwYXJhbSBzdHJpbmdbXSBwbGFjZWhvbGRlcnNcbiAqIEBwYXJhbSBzdHJpbmdbXSBwYXJhbXNcbiAqL1xuZnVuY3Rpb24gYmluZFN0cmluZyh1cmwsIHBsYWNlaG9sZGVycywgcGFyYW0pIHtcbiAgICBpZiAocGxhY2Vob2xkZXJzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzZWQgcmVxdWlyZWQgcGFyYW1ldGVycycpO1xuICAgIH1cblxuICAgIHJldHVybiB1cmwucmVwbGFjZShgeyR7cGxhY2Vob2xkZXJzWzBdfX1gLCBwYXJhbSk7XG59XG4iLCJpbXBvcnQgXyBmcm9tICdsb2Rhc2gnO1xuXG5sZXQgX19WdWUgPSBudWxsO1xubGV0IF9fc3RvcmUgPSBudWxsO1xubGV0IF9fc3Vic2NyaWJlcnMgPSBbXTtcblxuZXhwb3J0IGNvbnN0IHRhc2tNYW5hZ2VyID0ge1xuICAgIHJ1bihuYW1lLCBwcm9taXNlLCBwYXJhbXMpIHtcbiAgICAgICAgbGV0IG5hbWVzID0gXy5mbGF0dGVuRGVlcChbIG5hbWUgXSk7XG5cbiAgICAgICAgbGV0IGFjdGlvbiwgcGF5bG9hZDtcblxuICAgICAgICBpZiAoUHJvbWlzZS5yZXNvbHZlKHByb21pc2UpID09PSBwcm9taXNlKSB7XG4gICAgICAgICAgICBhY3Rpb24gPSAncnVuJztcbiAgICAgICAgICAgIHBheWxvYWQgPSB7XG4gICAgICAgICAgICAgICAgcHJvbWlzZSxcbiAgICAgICAgICAgICAgICBwYXJhbXNcbiAgICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhY3Rpb24gPSAncnVuU3luYyc7XG4gICAgICAgICAgICBwYXlsb2FkID0ge1xuICAgICAgICAgICAgICAgIHBhcmFtczogcHJvbWlzZVxuICAgICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIG5hbWVzLmZvckVhY2gobmFtZSA9PiB7XG4gICAgICAgICAgICBfX3N0b3JlLmRpc3BhdGNoKGB0YXNrTWFuYWdlci8ke2FjdGlvbn1gLCB7XG4gICAgICAgICAgICAgICAgbmFtZSxcblxuICAgICAgICAgICAgICAgIC4uLnBheWxvYWRcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICB9LFxuXG4gICAgc3RhdHVzKG5hbWUsIHdpdGhEZXNjZW5kYW50cyA9IGZhbHNlKSB7XG4gICAgICAgIGNvbnN0IGFjdGl2ZVByb2Nlc3NlcyA9IF9fc3RvcmUuc3RhdGUudGFza01hbmFnZXIucHJvY2Vzc2VzIHx8IHt9O1xuXG4gICAgICAgIGlmICghd2l0aERlc2NlbmRhbnRzKSB7XG4gICAgICAgICAgICByZXR1cm4gXy5oYXMoYWN0aXZlUHJvY2Vzc2VzLCBuYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBfLnNvbWUoYWN0aXZlUHJvY2Vzc2VzLCAocHJvY2VzcykgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIHByb2Nlc3MubmFtZSA9PT0gbmFtZVxuICAgICAgICAgICAgICAgIHx8IHByb2Nlc3MubmFtZS5pbmRleE9mKGAke25hbWV9LmApICE9PSAtMVxuICAgICAgICAgICAgICAgIHx8IHByb2Nlc3MubmFtZS5pbmRleE9mKGAke25hbWV9QGApICE9PSAtMTtcbiAgICAgICAgfSk7XG4gICAgfSxcblxuICAgIHN1YnNjcmliZShuYW1lLCBjYWxsYmFjaykge1xuICAgICAgICBpZiAoIV8uaGFzKF9fc3Vic2NyaWJlcnMsIG5hbWUpKSB7XG4gICAgICAgICAgICBfX3N1YnNjcmliZXJzWyBuYW1lIF0gPSBbXTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGluZGV4ID0gX19zdWJzY3JpYmVyc1sgbmFtZSBdLmxlbmd0aDtcblxuICAgICAgICBfX3N1YnNjcmliZXJzWyBuYW1lIF1bIF9fc3Vic2NyaWJlcnNbIG5hbWUgXS5sZW5ndGggXSA9IGNhbGxiYWNrO1xuXG4gICAgICAgIHJldHVybiAoKSA9PiBfX3N1YnNjcmliZXJzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxufTtcblxuZXhwb3J0IGNvbnN0IG1hcFN0YXR1c2VzID0gKG5hbWVzKSA9PiB7XG4gICAgbGV0IGRhdGEgPSBuYW1lcztcblxuICAgIGlmICghXy5pc0FycmF5KG5hbWVzKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1N0YXR1c2VzIG11c3QgYmUgYXJyYXknKTtcbiAgICB9XG5cbiAgICByZXR1cm4gXy5yZWR1Y2UoXG4gICAgICAgIGRhdGEsXG4gICAgICAgIChjYXJyeSwgZGF0YSkgPT4ge1xuICAgICAgICAgICAgbGV0IHJlc3VsdCA9IGRhdGE7XG5cbiAgICAgICAgICAgIGlmIChfLmlzU3RyaW5nKGRhdGEpKSB7XG4gICAgICAgICAgICAgICAgcmVzdWx0ID0ge1xuICAgICAgICAgICAgICAgICAgICBuYW1lOiBkYXRhLFxuICAgICAgICAgICAgICAgICAgICBkZWVwOiBmYWxzZVxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNhcnJ5WyBfLmNhbWVsQ2FzZSgncHMuJyArIHJlc3VsdC5uYW1lKSBdID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGxldCBwcm9jZXNzID0gcmVzdWx0Lm5hbWU7XG5cbiAgICAgICAgICAgICAgICBpZiAoXy5oYXMocmVzdWx0LCAncHJvY2VzcycpKSB7XG4gICAgICAgICAgICAgICAgICAgIHByb2Nlc3MgPSBfLmlzRnVuY3Rpb24ocmVzdWx0LnByb2Nlc3MpID9cbiAgICAgICAgICAgICAgICAgICAgICAgIHJlc3VsdC5wcm9jZXNzLmJpbmQodGhpcykoKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQucHJvY2VzcztcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy4kdGFza01hbmFnZXIuc3RhdHVzKFxuICAgICAgICAgICAgICAgICAgICBwcm9jZXNzLFxuICAgICAgICAgICAgICAgICAgICAhIXJlc3VsdC5kZWVwXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHJldHVybiBjYXJyeTtcbiAgICAgICAgfSxcbiAgICAgICAge31cbiAgICApO1xufTtcblxuY29uc3QgX19maXJlID0gKG5hbWUsIGV2ZW50LCBkYXRhKSA9PiB7XG4gICAgbGV0IHN1YnNjcmliZXJzO1xuXG4gICAgaWYgKF8uaXNBcnJheShfX3N1YnNjcmliZXJzWyBuYW1lIF0pKSB7XG4gICAgICAgIHN1YnNjcmliZXJzID0gX19zdWJzY3JpYmVyc1sgbmFtZSBdO1xuICAgIH1cblxuICAgIGlmICghc3Vic2NyaWJlcnMpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHN1YnNjcmliZXJzLmZvckVhY2goXG4gICAgICAgIGNhbGxiYWNrID0+IGNhbGxiYWNrKGV2ZW50LCBkYXRhKVxuICAgICk7XG59O1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgaW5zdGFsbChWdWUpIHtcbiAgICAgICAgX19WdWUgPSBWdWU7XG5cbiAgICAgICAgX19WdWUucHJvdG90eXBlLiR0YXNrTWFuYWdlciA9IHRhc2tNYW5hZ2VyO1xuICAgIH0sXG4gICAgc3RvcmVSZWdpc3RlcihzdG9yZSkge1xuICAgICAgICBfX3N0b3JlID0gc3RvcmU7XG5cbiAgICAgICAgc3RvcmUucmVnaXN0ZXJNb2R1bGUoJ3Rhc2tNYW5hZ2VyJywge1xuICAgICAgICAgICAgbmFtZXNwYWNlZDogdHJ1ZSxcbiAgICAgICAgICAgIHN0YXRlOiB7XG4gICAgICAgICAgICAgICAgcHJvY2Vzc2VzOiB7fVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG11dGF0aW9uczoge1xuICAgICAgICAgICAgICAgIGNyZWF0ZTogKHN0YXRlLCB7IG5hbWUsIGRhdGEgfSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBfX1Z1ZS5zZXQoc3RhdGUucHJvY2Vzc2VzLCBuYW1lLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YVxuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICBfX2ZpcmUobmFtZSwgJ3N0YXJ0JywgZGF0YSk7XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBraWxsOiAoc3RhdGUsIG5hbWUpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgX19maXJlKFxuICAgICAgICAgICAgICAgICAgICAgICAgbmFtZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICdkb25lJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIF8uZ2V0KHN0YXRlLnByb2Nlc3NlcywgYCR7bmFtZX0uZGF0YWApXG4gICAgICAgICAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgICAgICAgICAgX19WdWUuZGVsZXRlKHN0YXRlLnByb2Nlc3NlcywgbmFtZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGFjdGlvbnM6IHtcbiAgICAgICAgICAgICAgICBydW46ICh7IGNvbW1pdCB9LCB7IG5hbWUsIHByb21pc2UsIHBhcmFtcyA9IHt9IH0pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29tbWl0KCdjcmVhdGUnLCB7XG4gICAgICAgICAgICAgICAgICAgICAgICBuYW1lLFxuICAgICAgICAgICAgICAgICAgICAgICAgZGF0YTogcGFyYW1zLmRhdGEgfHwge31cbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKHBhcmFtcy5mYWlsT25seSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcHJvbWlzZS5jYXRjaCh4aHIgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICh4aHIucmVzcG9uc2Uuc3RhdHVzID49IDQwMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb21taXQoJ2tpbGwnLCBuYW1lKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHByb21pc2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbigoKSA9PiBjb21taXQoJ2tpbGwnLCBuYW1lKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAuY2F0Y2goKCkgPT4gY29tbWl0KCdraWxsJywgbmFtZSkpXG4gICAgICAgICAgICAgICAgICAgICAgICA7XG4gICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJvbWlzZTtcbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgcnVuU3luYzogKHsgY29tbWl0IH0sIHsgbmFtZSwgcGFyYW1zID0ge30gfSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb21taXQoJ2NyZWF0ZScsIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBkYXRhOiBwYXJhbXMuZGF0YSB8fCB7fVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAga2lsbDogKHsgY29tbWl0IH0sIG5hbWUpID0+IGNvbW1pdCgna2lsbCcsIG5hbWUpXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn07XG4iLCIvKipcbiAqIEVsZW1lbnQuY2xvc2VzdCgpIHBvbHlmaWxsXG4gKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvRWxlbWVudC9jbG9zZXN0I1BvbHlmaWxsXG4gKi9cbmlmICghRWxlbWVudC5wcm90b3R5cGUuY2xvc2VzdCkge1xuICAgIGlmICghRWxlbWVudC5wcm90b3R5cGUubWF0Y2hlcykge1xuICAgICAgICBFbGVtZW50LnByb3RvdHlwZS5tYXRjaGVzID0gRWxlbWVudC5wcm90b3R5cGUubXNNYXRjaGVzU2VsZWN0b3IgfHwgRWxlbWVudC5wcm90b3R5cGUud2Via2l0TWF0Y2hlc1NlbGVjdG9yO1xuICAgIH1cbiAgICBFbGVtZW50LnByb3RvdHlwZS5jbG9zZXN0ID0gZnVuY3Rpb24gKHMpIHtcbiAgICAgICAgdmFyIGVsID0gdGhpcztcbiAgICAgICAgdmFyIGFuY2VzdG9yID0gdGhpcztcbiAgICAgICAgaWYgKCFkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY29udGFpbnMoZWwpKSB7XG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBkbyB7XG4gICAgICAgICAgICBpZiAoYW5jZXN0b3IubWF0Y2hlcyhzKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBhbmNlc3RvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGFuY2VzdG9yID0gYW5jZXN0b3IucGFyZW50RWxlbWVudDtcbiAgICAgICAgfSB3aGlsZSAoYW5jZXN0b3IgIT09IG51bGwpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICB9O1xufVxuIiwiaW1wb3J0IHVybEhlbHBlciBmcm9tICdAcGx1Z2lucy9sb2NhdGlvbi91cmwnO1xuXG5jb25zdCByb3V0ZXMgPSB7XG4gICAgcm9vdFVybDogd2luZG93LkFwcC5iYXNlVVJMLFxuICAgIHJvdXRlczogW10sXG4gICAgcHJlZml4OiAnJyxcblxuICAgIHJvdXRlKG5hbWUsIHBhcmFtZXRlcnMsIHF1ZXJ5KSB7XG4gICAgICAgIGNvbnN0IHJvdXRlID0gdGhpcy5nZXRCeU5hbWUobmFtZSk7XG5cbiAgICAgICAgaWYgKCFyb3V0ZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGAvJHt1cmxIZWxwZXIocm91dGUudXJpLCBwYXJhbWV0ZXJzLCBxdWVyeSl9YDtcbiAgICB9LFxuXG4gICAgdXJsKHVybCwgcGFyYW1ldGVycyA9IFtdKSB7XG4gICAgICAgIHBhcmFtZXRlcnMgPSBwYXJhbWV0ZXJzIHx8IFtdO1xuXG4gICAgICAgIGNvbnN0IHVyaSA9IHVybCArICcvJyArIHBhcmFtZXRlcnMuam9pbignLycpO1xuXG4gICAgICAgIHJldHVybiB0aGlzLmdldENvcnJlY3RVcmwodXJpKTtcbiAgICB9LFxuXG4gICAgdG9Sb3V0ZShyb3V0ZSwgcGFyYW1ldGVycykge1xuICAgICAgICB2YXIgdXJpID0gdGhpcy5yZXBsYWNlTmFtZWRQYXJhbWV0ZXJzKHJvdXRlLnVyaSwgcGFyYW1ldGVycyk7XG4gICAgICAgIHZhciBxcyA9IHRoaXMuZ2V0Um91dGVRdWVyeVN0cmluZyhwYXJhbWV0ZXJzKTtcblxuICAgICAgICBpZiAodGhpcy5hYnNvbHV0ZSAmJiB0aGlzLmlzT3RoZXJIb3N0KHJvdXRlKSkge1xuICAgICAgICAgICAgcmV0dXJuIFwiLy9cIiArIHJvdXRlLmhvc3QgKyBcIi9cIiArIHVyaSArIHFzO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Q29ycmVjdFVybCh1cmkgKyBxcyk7XG4gICAgfSxcblxuICAgIGlzT3RoZXJIb3N0KHJvdXRlKSB7XG4gICAgICAgIHJldHVybiByb3V0ZS5ob3N0ICYmIHJvdXRlLmhvc3QgIT09IHdpbmRvdy5sb2NhdGlvbi5ob3N0bmFtZTtcbiAgICB9LFxuXG4gICAgcmVwbGFjZU5hbWVkUGFyYW1ldGVycyh1cmksIHBhcmFtZXRlcnMpIHtcbiAgICAgICAgcmV0dXJuIHVybEhlbHBlcih1cmksIHBhcmFtZXRlcnMpO1xuICAgIH0sXG5cbiAgICBnZXRSb3V0ZVF1ZXJ5U3RyaW5nOiBmdW5jdGlvbiAocGFyYW1ldGVycykge1xuICAgICAgICBjb25zdCBxcyA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiBwYXJhbWV0ZXJzKSB7XG4gICAgICAgICAgICBpZiAocGFyYW1ldGVycy5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgcXMucHVzaChrZXkgKyAnPScgKyBwYXJhbWV0ZXJzW2tleV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHFzLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiAnPycgKyBxcy5qb2luKCcmJyk7XG4gICAgfSxcblxuICAgIGdldEJ5TmFtZTogZnVuY3Rpb24gKG5hbWUpIHtcbiAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5yb3V0ZXMpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnJvdXRlcy5oYXNPd25Qcm9wZXJ0eShrZXkpICYmIHRoaXMucm91dGVzW2tleV0ubmFtZSA9PT0gbmFtZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnJvdXRlc1trZXldO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxufTtcblxuY29uc3Qgcm91dGUgPSAocm91dGUsIHBhcmFtZXRlcnMsIHF1ZXJ5KSA9PiByb3V0ZXMucm91dGUocm91dGUsIHBhcmFtZXRlcnMsIHF1ZXJ5KTtcbmNvbnN0IHVybCA9ICh1cmwsIHBhcmFtZXRlcnMgPSB7fSkgPT4gcm91dGVzLnVybCh1cmwsIHBhcmFtZXRlcnMpO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gICAgcm91dGUsXG4gICAgdXJsXG59O1xuIiwiaW1wb3J0IFZ1ZSBmcm9tICd2dWUnO1xuaW1wb3J0IFZ1ZXggZnJvbSAndnVleCc7XG5cbmltcG9ydCBUYXNrTWFuYWdlciBmcm9tICdAcGx1Z2lucy90YXNrTWFuYWdlcic7XG5pbXBvcnQgSTE4biBmcm9tICdAcGx1Z2lucy9pMThuJztcbmltcG9ydCBWdWVGb3JtIGZyb20gJ0BwbHVnaW5zL2Zvcm1zJztcbmltcG9ydCB7IHJlZ2lzdGVyU3RvcmUgfSBmcm9tICdAaGVscGVycyc7XG5cbmltcG9ydCB7IFZVRVhfREVFUF9TRVQgfSBmcm9tICd2dWUtZGVlcHNldCc7XG5cblZ1ZS51c2UoVnVleCk7XG5cbmNvbnN0IHN0b3JlID0gbmV3IFZ1ZXguU3RvcmUoe1xuICAgIHBsdWdpbnM6IFtcbiAgICAgICAgVnVlRm9ybS5zdG9yZVJlZ2lzdGVyZXIsXG4gICAgICAgIEkxOG4uc3RvcmVSZWdpc3RlcixcbiAgICAgICAgVGFza01hbmFnZXIuc3RvcmVSZWdpc3RlclxuICAgIF0sXG4gICAgbXV0YXRpb25zOiB7XG4gICAgICAgIFZVRVhfREVFUF9TRVRcbiAgICB9XG59KTtcblxuY29uc3QgZmlsZXMgPSByZXF1aXJlLmNvbnRleHQoJy4uL21vZHVsZXMnLCB0cnVlLCAvXFwvc3RvcmVcXC9pbmRleFxcLmpzJC8pO1xuXG5maWxlcy5rZXlzKCkuZm9yRWFjaChrZXkgPT4ge1xuICAgIGNvbnN0IG5hbWUgPSBrZXkucmVwbGFjZSgnLi8nLCAnJykucmVwbGFjZSgnL3N0b3JlL2luZGV4LmpzJywgJycpO1xuICAgIGNvbnN0IGRhdGEgPSBmaWxlcyhrZXkpLmRlZmF1bHQ7XG5cbiAgICByZWdpc3RlclN0b3JlKG5hbWUsIGRhdGEsIHN0b3JlKTtcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBzdG9yZTtcbiIsIm1vZHVsZS5leHBvcnRzID0gXzsiLCJtb2R1bGUuZXhwb3J0cyA9IFZ1ZTsiLCJtb2R1bGUuZXhwb3J0cyA9IFZ1ZXg7Il0sInNvdXJjZVJvb3QiOiIifQ==