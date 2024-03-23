class PageManager {
  currentPage;

  static DEFAULT_PAGE_NUMBER = 1;

  constructor() {
    this.currentPage = PageManager.DEFAULT_PAGE_NUMBER;
  }

  increasePage() {
    return (this.currentPage += 1);
  }

  resetPage() {
    this.currentPage = PageManager.DEFAULT_PAGE_NUMBER;
  }
}

const pageManager = new PageManager();

export default pageManager;
