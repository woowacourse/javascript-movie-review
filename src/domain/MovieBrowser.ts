type Mode = 'popular' | 'search';

export class MovieBrowser {
  #mode: Mode = 'popular';
  #keyword = '';
  #page = 1;
  #totalPages = 0;

  get isLastPage() {
    return this.#totalPages > 0 && this.#page >= this.#totalPages;
  }

  get canLoadMore() {
    return !this.isLastPage;
  }

  get isNewSession() {
    return this.#page === 1;
  }

  get showsBanner() {
    return this.#mode === 'popular';
  }

  get sectionTitle() {
    return this.#mode === 'search' ? `"${this.#keyword}" 검색 결과` : '';
  }

  get currentPage() {
    return this.#page;
  }

  get nextPageNumber() {
    return this.#page + 1;
  }

  startSearch(keyword: string) {
    this.#mode = 'search';
    this.#keyword = keyword;
    this.#page = 1;
    this.#totalPages = 0;
  }

  setTotalPages(totalPages: number) {
    this.#totalPages = totalPages;
  }

  nextPage() {
    if (!this.canLoadMore) return;
    this.#page += 1;
  }
}
