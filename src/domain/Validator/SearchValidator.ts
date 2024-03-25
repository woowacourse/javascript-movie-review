const SearchValidator = {
  validate() {
    this.isInputEmpty();
  },

  isInputEmpty() {
    throw new Error(`공백을 제외하고 1글자 이상 입력하세요.`);
  },
};

export default SearchValidator;
