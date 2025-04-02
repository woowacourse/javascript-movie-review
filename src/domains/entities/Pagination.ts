import { MAX_MOVIE_PAGE } from "../../constants/constants";

export default class Pagination {
  private static instance: Pagination;
  private _currentPage: number = 1;
  private _totalPages: number = 1;
  private _maxPage: number = MAX_MOVIE_PAGE;

  static getInstance(): Pagination {
    if (!Pagination.instance) Pagination.instance = new Pagination();
    return Pagination.instance;
  }

  get currentPage() {
    return this._currentPage;
  }

  updateTotalPages(totalPages: number) {
    this._totalPages = totalPages;
  }

  nextPage() {
    if (!this.hasReachedEnd()) this._currentPage += 1;
    return this._currentPage;
  }

  hasReachedEnd() {
    return this._currentPage >= Math.min(this._maxPage, this._totalPages);
  }

  isFirstPage() {
    return this._currentPage === 1;
  }

  resetCurrentPage() {
    this._currentPage = 1;
  }
}
