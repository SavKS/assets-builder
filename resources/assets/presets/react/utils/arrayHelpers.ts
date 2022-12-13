const toggleItem = <T>(
    array: T[],
    item: T,
    criteria: (item: T) => boolean
) => {
    const index = array.findIndex(criteria);

    if (index !== -1) {
        array.splice(index, 1);

        return true;
    }

    array.push(item);

    return true;
};

const replaceItem = <T>(
    array: T[],
    item: T,
    criteria: (item: T) => boolean
) => {
    const index = array.findIndex(criteria);

    if (index !== -1) {
        array.splice(index, 1, item);

        return true;
    }

    return false;
};

const pushItemIfNotExists = <T>(
    array: T[],
    item: T,
    criteria: (item: T) => boolean
) => {
    const index = array.findIndex(criteria);

    if (index === -1) {
        array.push(item);

        return true;
    }

    return false;
};

const pushIfNotExists = <T>(
    array: T[],
    value: T
) => {
    if (array.includes(value)) {
        return false;
    }

    array.push(value);

    return true;
};

const toggle = <T>(
    array: T[],
    value: T
) => {
    const index = array.indexOf(value);

    if (index !== -1) {
        array.splice(index, 1);

        return true;
    }

    array.push(value);

    return true;
};

const remove = <T>(
    array: T[],
    value: T
) => {
    const index = array.indexOf(value);

    if (index === -1) {
        return false;
    }

    array.splice(index, 1);

    return true;
};

const removeItem = <T>(
    array: T[],
    item: T,
    criteria: (item: T) => boolean
) => {
    const index = array.findIndex(criteria);

    if (index === -1) {
        return false;
    }

    array.splice(index, 1);

    return true;
};

export default {
    toggleItem,
    replaceItem,
    pushItemIfNotExists,
    pushIfNotExists,
    setOpposite: toggle,
    remove,
    removeItem
};
