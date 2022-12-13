import isNil from '../utils/isNil';

const isNotChild = (children: any): boolean => {
    if (typeof children === 'string') {
        return false;
    }

    if (isNil(children)) {
        return true;
    }

    if (Array.isArray(children)) {
        return children.every(
            child => isNotChild(child)
        );
    }

    return typeof children.type === 'function' ? false : !children.type;
};

export default isNotChild;
