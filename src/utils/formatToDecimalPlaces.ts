const formatToDecimalPlaces = (targetValue: number, decimalPlaces: number): string => {
  const factor = Math.pow(10, decimalPlaces);

  return (Math.round(targetValue * factor) / factor).toFixed(decimalPlaces);
};

export default formatToDecimalPlaces;
