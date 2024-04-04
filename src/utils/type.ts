export const isArrayElement = <K, T extends K>(options: K[], value: K): value is T => {
  return options.includes(value);
};

export const isArrayWithObjectKeys = <T extends string[]>(item: object, candidates: string[]): candidates is T => {
  return Object.keys(item).every((key) => candidates.includes(key));
};
