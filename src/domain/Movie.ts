import { ApiMovieItem, MovieAppData, MovieItem } from "../type/movieType";
import { request } from "../util/apiRequest";
import { popularMovieUrl, searchMovieUrl } from "./movieUrl";
import GenreMatcher from "./GenreMatcher";
import { ImgSrc } from "../constant/movieConstants";

class Movie {
  private data: MovieAppData = {
    movies: [],
    searchWord: "",
    page: 1,
    totalPages: 0,
    isShowMore: false,
  };

  getMovie(id: number) {
    return this.data.movies.find((movie) => movie.id === id);
  }

  async getMovies(query: string = "") {
    this.data.page = 1;
    this.data.searchWord = query;
    this.data.isShowMore = false;

    const apiData = await this.getApiData();

    if (apiData.error) {
      return apiData;
    }

    this.data.movies = this.formMovies(apiData.results);
    this.data.totalPages = apiData.total_pages;

    return this.data;
  }

  async getMoreMovies() {
    this.data.page += 1;
    this.data.isShowMore = true;

    const apiData = await this.getApiData();

    if (apiData.error) {
      return apiData;
    }

    const moreMovies = this.formMovies(apiData.results);
    this.data.movies = [...this.data.movies, ...moreMovies];
    this.data.totalPages = apiData.total_pages;

    return { ...this.data, movies: moreMovies };
  }

  private formMovies(apiData: ApiMovieItem[]) {
    return apiData.map<MovieItem>((result: ApiMovieItem) => {
      const { id, title, poster_path, vote_average, genre_ids, overview } =
        result;

      const imgSrc = poster_path
        ? `https://image.tmdb.org/t/p/w220_and_h330_face${poster_path}`
        : ImgSrc.NO_IMG;

      return {
        id: id,
        title: title,
        src: imgSrc,
        starRate: Number(vote_average.toFixed(1)),
        genres: GenreMatcher.convert(genre_ids).join(", "),
        description: overview,
      };
    });
  }

  private makeUrl() {
    return this.data.searchWord
      ? searchMovieUrl(this.data.searchWord, this.data.page)
      : popularMovieUrl(this.data.page);
  }

  private async getApiData() {
    const url = this.makeUrl();
    const apiData = await request(url);
    return apiData;
  }
}

export default new Movie();
