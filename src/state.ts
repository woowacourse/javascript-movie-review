const State = {
  nextPageNum: 0,
  nextSearchPageNum: 0,
  requestMovieCount: 0,

  getNextPageNum() {
    return this.nextPageNum;
  },

  getNextSearchPageNum() {
    return this.nextSearchPageNum;
  },

  getRequestMovieCount() {
    return this.requestMovieCount;
  },

  setNextPageNum(page: number) {
    this.nextPageNum = page;
  },

  setNextSearchPageNum(page: number) {
    this.nextSearchPageNum = page;
  },

  setRequestMovieCount(count: number) {
    this.requestMovieCount = count;
  },
};

export default State;
