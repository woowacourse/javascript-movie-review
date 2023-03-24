export type Values<T> = T[keyof T];
export type UnPack<T> = T extends (infer U)[] ? U : T extends readonly (infer U)[] ? U : T;
export type Props<T extends {} = {}> = {} & T;
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type ChangeProps<T, K extends { [k in keyof T]?: unknown }> = Omit<T, keyof K> & K;
