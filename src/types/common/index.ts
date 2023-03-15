export type Values<T> = T[keyof T];
export type UnPack<T> = T extends (infer U)[] ? U : T;
export type Props<T extends {} = {}> = {} & T;
