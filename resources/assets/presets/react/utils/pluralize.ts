export default (count: number, pattern: string) => {
    const cases = [ 2, 0, 1, 1, 1, 2 ];

    const words = pattern.split('|');

    return words[ (count % 100 > 4 && count % 100 < 20) ? 2 : cases[ Math.min(count % 10, 5) ] ];
};
