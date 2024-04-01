class PageManager {
  currentPage: number;
  totalPages: number;

  static DEFAULT_PAGE_NUMBER = 1;

  constructor() {
    this.currentPage = PageManager.DEFAULT_PAGE_NUMBER;
    this.totalPages = 0;
  }

  increasePage() {
    return (this.currentPage += 1);
  }

  resetPage() {
    this.currentPage = PageManager.DEFAULT_PAGE_NUMBER;
  }

  setTotalPages(totalPages: number) {
    this.totalPages = totalPages;
  }
}

const pageManager = new PageManager();

export default pageManager;
