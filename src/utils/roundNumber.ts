export const roundNumber = (number: number, decimalPlaces: number): number => {
  const factor = Math.pow(10, decimalPlaces);
  return Math.round(number * factor) / factor;
};
