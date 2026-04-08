export const movieState = {
  page: 1,
  searchQuery: "",
  reset() {
    this.page = 1;
    this.searchQuery = "";
  },
};
