export const pageManager = {
  currentPage: 1,
  totalPages: 0,

  setTotalPages(totalPages: number) {
    this.totalPages = totalPages;
  },

  incrementCurrentPage() {
    this.currentPage++;
  },

  initializePageInfo() {
    this.currentPage = 1;
    this.totalPages = 0;
  },
};
