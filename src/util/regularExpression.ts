export const getMatchString = (
  string: string,
  reg: RegExp
): string | undefined => {
  return string.match(reg)?.[1];
};
