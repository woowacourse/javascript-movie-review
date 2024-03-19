const formatToDecimalPlaces = (targetValue: number | string, decimalPlaces: number): string => {
  const factor = Math.pow(10, decimalPlaces);
  if (typeof targetValue === 'string') {
    targetValue = Number(targetValue);
  }
  return (Math.round(targetValue * factor) / factor).toFixed(decimalPlaces);
};

export default formatToDecimalPlaces;
