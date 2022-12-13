export default <T>(
    items: (T | boolean | undefined | null)[],
    callback?: (item: T | boolean | undefined | null) => boolean
): T[] => items.filter(callback || (it => !!it)) as T[];
