const SearchValidator = {
  validate(searchInput: string) {
    this.isInputSpace(searchInput);
  },

  isInputSpace(searchInput: string) {
    console.log(searchInput.split(' ').join(' '));
    if (searchInput.replace(/\s+/g, '') === '') {
      throw new Error(`공백을 제외하고 1글자 이상 입력하세요.`);
    }
  },
};

export default SearchValidator;
