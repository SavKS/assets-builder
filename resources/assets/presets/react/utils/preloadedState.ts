import get from '@savks/not-need-lodash/get';

export default <T>(selector: string, defaultValue?: T) => get(
    window.__preload.state,
    selector,
    defaultValue
);
