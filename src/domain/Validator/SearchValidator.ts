const SearchValidator = {
  validate(searchInput: string) {
    this.isInputEmpty(searchInput);
    this.isInputSpace(searchInput);
  },

  isInputEmpty(searchInput: string) {
    if (searchInput === '') throw new Error(`공백을 제외하고 1글자 이상 입력하세요.`);
  },

  isInputSpace(searchInput: string) {
    if (searchInput.replace(/\s+/g, '') === '') {
      throw new Error(`공백을 제외하고 1글자 이상 입력하세요.`);
    }
  },
};

export default SearchValidator;
