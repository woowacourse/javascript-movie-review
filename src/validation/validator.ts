import { ERROR_MESSAGE, MAX_KEYWORD_LENGTH } from '../constants/constants';

const validator = {
  checkKeyword(input: string) {
    validator.isEmpty(input);
    validator.isCorrectKeywordLength(input);
  },

  isEmpty(input: string) {
    if (input === '') throw new Error(ERROR_MESSAGE.EMPTY);
  },

  isCorrectKeywordLength(input: string) {
    if (input.length > MAX_KEYWORD_LENGTH) throw new Error(ERROR_MESSAGE.KEYWORD_LENGTH);
  },
};

export default validator;
