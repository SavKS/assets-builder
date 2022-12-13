export default <T>(value: T | undefined | null): value is undefined | null => value === undefined || value === null;
