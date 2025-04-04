import APIHandler from "../ApIHandler";

class SearchMovieService {
  currentPage: number;

  constructor() {
    this.currentPage = 1;
  }

  async getSearchResult(searchWord: string) {
    const searchResult = await APIHandler.get(
      `/search/movie?query=${searchWord}&include_adult=false&language=ko-KR&page=${this.currentPage}`
    );
    return searchResult;
  }

  nextPage() {
    this.currentPage = this.currentPage + 1;
  }

  getCurrentPage() {
    return this.currentPage;
  }
}

export default SearchMovieService;
