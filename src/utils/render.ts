export const renderIf = <T>(
  condition: boolean,
  trueValue: T,
  falseValue?: T
): T => {
  return condition
    ? trueValue
    : falseValue === undefined
    ? ("" as unknown as T)
    : falseValue;
};

export const renderIfString = (
  condition: boolean,
  trueValue: string,
  falseValue: string = ""
): string => {
  return condition ? trueValue : falseValue;
};

export const renderSwitch = <T>(
  conditions: Array<[boolean, T]>,
  defaultValue?: T
): T => {
  for (const [condition, value] of conditions) {
    if (condition) return value;
  }
  return defaultValue === undefined ? ("" as unknown as T) : defaultValue;
};
