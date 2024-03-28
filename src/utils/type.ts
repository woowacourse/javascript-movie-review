export const isValidElement = <K, T extends K>(options: K[], value: K): value is T => {
  return options.includes(value);
};
