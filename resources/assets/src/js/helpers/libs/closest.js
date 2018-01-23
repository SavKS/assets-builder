const closest = function(el, fn) {
    return el && (fn(el) ? el : closest(el.parentNode, fn));
}

export default closest;