import { removeMoreButton, updateMovies } from "../components/movieListHandler";
import { IApiResponse, IMovie } from "../type";

export const movieApi = {
  page: 1,
  movies: [] as IMovie[],
  total_pages: 2,
  total_results: 0,
  last_keyword: "",

  async fetchPopularMovieInfo() {
    if (this.last_keyword !== "") {
      this.movies = [];
      this.last_keyword = "";
      this.page = 1;
    }

    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=ko&page=${this.page}`;
    const response = await fetch(url);

    try {
      if (response.status !== 200) throw new Error("서버가 불안정합니다.");
    } catch (error) {
      if (error instanceof Error) return alert(error.message);
    }

    const { page, results, total_pages, total_results } = await response.json();

    this.page = page + 1;
    this.movies = [...this.movies, ...convertApiResponseToMovieList(results)];
    this.total_pages = total_pages;
    this.total_results = total_results;

    updateMovies();
  },

  async fetchSearchedMovieInfo(keyword: string) {
    if (this.last_keyword !== keyword) {
      this.movies = [];
      this.page = 1;
    }

    const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&language=ko&page=${this.page}&include_adult=false&query=${keyword}`;
    const response = await fetch(url);
    const { page, results, total_pages, total_results } = await response.json();

    this.last_keyword = keyword;
    this.page = page + 1;
    this.movies = [...this.movies, ...convertApiResponseToMovieList(results)];
    this.total_pages = total_pages;
    this.total_results = total_results;

    updateMovies();

    if (this.page === total_pages) {
      removeMoreButton();
    }
  },
};

const convertApiResponseToMovieList = (results: IApiResponse[]): IMovie[] => {
  return results.map((movie) => {
    return {
      poster: movie.poster_path,
      title: movie.title,
      ratings: movie.vote_average,
    };
  });
};
