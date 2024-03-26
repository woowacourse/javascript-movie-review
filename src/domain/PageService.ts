import { LAST_PAGE } from '../constants/constant';

export default class PageService {
  private currentPage;
  constructor(initialPage = 1) {
    this.currentPage = initialPage;
  }

  nextPage() {
    this.currentPage += 1;
  }

  resetPage() {
    this.currentPage = 1;
  }

  getCurrentPage() {
    return this.currentPage;
  }

  isPageInRange(totalPages = 0) {
    return Math.min(totalPages, LAST_PAGE) <= this.currentPage;
  }
}
