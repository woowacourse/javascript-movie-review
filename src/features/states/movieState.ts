export const movieState = {
  page: 1,
  searchMovie: "",
  reset() {
    this.page = 1;
    this.searchMovie = "";
  },
};
