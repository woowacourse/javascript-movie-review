import { removeMoreButton, updateMovies } from "../components/movieListHandler";

export const movieApi = {
  page: 1,
  movies: [],
  total_pages: 2,
  total_results: 0,
  last_keyword: "",

  async fetchPopularMovieInfo() {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=ko&page=${this.page}`
    );

    try {
      if (response.status !== 200) throw new Error("서버가 불안정합니다.");
    } catch (error) {
      if (error instanceof Error) return alert(error.message);
    }

    const { page, results, total_pages, total_results } = await response.json();

    if (this.last_keyword !== "") {
      this.movies = [];
      this.last_keyword = "";
      this.page = 1;
    }

    this.page = page + 1;
    this.movies = [...this.movies, ...results] as any;
    this.total_pages = total_pages;
    this.total_results = total_results;

    updateMovies();
  },

  async fetchSearchedMovieInfo(keyword: string) {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&language=ko&page=${this.page}&include_adult=false&query=${keyword}`
    );
    const { page, results, total_pages, total_results } = await response.json();

    if (this.last_keyword !== keyword) {
      this.movies = [];
      this.page = 1;
    }

    this.last_keyword = keyword;
    this.page = page + 1;
    this.movies = [...this.movies, ...results] as any;
    this.total_pages = total_pages;
    this.total_results = total_results;

    updateMovies();

    if (this.page === total_pages) {
      removeMoreButton();
    }
  },
};
