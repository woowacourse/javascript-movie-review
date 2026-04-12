export const movieState = {
  page: 1,
  searchQuery: "",
  isLoading: false,
  hasMore: true,
  reset() {
    this.page = 1;
    this.searchQuery = "";
    this.isLoading = false;
    this.hasMore = true;
  },
};
