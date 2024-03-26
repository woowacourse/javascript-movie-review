export const validation = {
  validateEmptyInput(inputvalue: string) {
    if (inputvalue.length === 0) {
      return false;
    } else {
      return true;
    }
  },
};
