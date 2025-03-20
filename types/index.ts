export type UnPack<T> = T extends (infer U)[] ? U : T;
export type PropsWithChildren<P = unknown> = P & {
  children?: string | undefined;
};
