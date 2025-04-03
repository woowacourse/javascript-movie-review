export const pageManager = {
  currentPage: 1,
  totalPages: 1,

  incrementCurrentPage() {
    this.currentPage++;
  },

  setTotalPages(totalPages: number) {
    this.totalPages = totalPages;
  },

  resetPage() {
    this.currentPage = 1;
  },

  isLastPage() {
    return this.currentPage >= this.totalPages;
  },
};
