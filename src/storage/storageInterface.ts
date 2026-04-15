export interface Storage<T, K> {
    set(key: T, value: K): void;
    get(key: T): K;
}
