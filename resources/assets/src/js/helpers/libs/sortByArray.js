import _reduce from 'lodash/reduce';

export default (collection, sortedKeys) => _reduce(
    sortedKeys,
    (carry, key) => {
        carry.push(collection[key]);

        return carry;
    },
    []
);