import _isString from 'lodash/isString';
import _assign from 'lodash/assign';

export default (className, otherClasses) => {
    let result = {};

    if (typeof className === 'undefined') {
        return result;
    }

    if (_isString(className)) {
        result = { [className]: true };
    } else {
        result = className;
    }

    return otherClasses ?
        _assign(result, otherClasses) :
        result;
};
