import ApiClient from "./ApiClient";

class MovieApi {
  private static readonly BASE_URL = "https://api.themoviedb.org/3";
  private static readonly options = {
    method: "GET",
    headers: {
      accept: "application",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
    },
  };

  static async fetchSearchMovies(page: number, searchParams: string) {
    const data = await ApiClient.fetch({
      url: `${this.BASE_URL}/search/movie?query=${searchParams}&include_adult=false&language=ko-KR&page=${page}`,
      options: this.options,
    });

    const movies = data.results;

    return { movies, total_pages: data.total_pages };
  }

  static async fetchPopularMovies(page: number) {
    const data = await ApiClient.fetch({
      url: `${this.BASE_URL}/movie/popular?language=ko-KR&page=${page}`,
      options: this.options,
    });

    const movies = data.results;

    return { movies, total_pages: data.total_pages };
  }

  static async fetchMovieDetail(movieId: number) {
    const data = await ApiClient.fetch({
      url: `${this.BASE_URL}/movie/${movieId}?language=ko-KR`,
      options: this.options,
    });

    return data;
  }
}

export default MovieApi;
