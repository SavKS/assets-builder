import _ from 'lodash';

const hasItem = (array, item, criteria) => {
    const index = _.findIndex(array, criteria || { id: item.id });

    if (index !== -1) {
        return true;
    }

    return false;
};

const toggleItem = (array, item, criteria) => {
    const index = _.findIndex(array, criteria || { id: item.id });

    if (index !== -1) {
        array.splice(index, 1);

        return true;
    }

    array.push(item);

    return true;
};

const replaceItem = (array, item, criteria) => {
    const index = _.findIndex(array, criteria || { id: item.id });

    if (index !== -1) {
        array.splice(index, 1, item);

        return true;
    }

    return false;
};

const pushItemIfNotExists = (array, item, criteria) => {
    const index = _.findIndex(array, criteria || { id: item.id });

    if (index === -1) {
        array.push(item);

        return true;
    }

    return false;
};

const pushIfNotExists = (array, value) => {
    if (array.includes(value)) {
        return false;
    }

    array.push(value);

    return true;
};

const toggle = (array, value) => {
    const index = array.indexOf(value);

    if (index !== -1) {
        array.splice(index, 1);

        return true;
    }

    array.push(value);

    return true;
};

const remove = (array, value) => {
    const index = array.indexOf(value);

    if (index === -1) {
        return false;
    }

    array.splice(index, 1);

    return true;
};

const removeItem = (array, item, criteria) => {
    const index = _.findIndex(array, criteria || { id: item.id });

    if (index === -1) {
        return false;
    }

    array.splice(index, 1);

    return true;
};

const flip = (trans, value = null) => {
    let key;
    let array = {};

    for (key in trans) {
        if (!trans.hasOwnProperty(key)) {
            continue;
        }

        array[trans[key]] = value || key;
    }

    return array;
};

export default {
    flip,
    hasItem,
    toggleItem,
    replaceItem,
    pushItemIfNotExists,
    pushIfNotExists,
    toggle,
    remove,
    removeItem
};
