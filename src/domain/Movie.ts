import {
  ApiError,
  ApiMovie,
  ApiMovieItem,
  MovieAppData,
  MovieItem,
} from "../type/movieType";
import { request } from "../util/apiRequest";
import { popularMovieUrl, searchMovieUrl } from "./movieUrl";
import GenreMatcher from "./GenreMatcher";
import { ImgSrc } from "../constant/movieConstants";

class Movie {
  private data: MovieAppData = {
    status: "fulfilled",
    movies: [],
    searchWord: "",
    page: 1,
    totalPages: 0,
    isShowMore: false,
  };

  private setNewData(newData: Partial<MovieAppData>) {
    this.data = { ...this.data, ...newData };
  }

  getMovie(id: number): MovieItem | undefined {
    return this.data.movies.find((movie) => movie.id === id);
  }

  async getMovies(query: string = "") {
    this.setNewData({ page: 1, searchWord: query, isShowMore: false });

    const apiData = await this.getApiData();

    if (apiData.status === "rejected") {
      return apiData;
    }

    this.setNewData({
      movies: this.formMovies(apiData.results),
      totalPages: apiData.total_pages,
    });

    return this.data;
  }

  async getMoreMovies() {
    this.setNewData({ page: this.data.page + 1, isShowMore: true });

    const apiData = await this.getApiData();

    if (apiData.status === "rejected") {
      return apiData;
    }

    const moreMovies = this.formMovies(apiData.results);
    this.setNewData({
      movies: [...this.data.movies, ...moreMovies],
      totalPages: apiData.total_pages,
    });

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

  private async getApiData(): Promise<ApiError | ApiMovie> {
    const url = this.makeUrl();
    const apiData = await request(url);
    return apiData;
  }
}

export default new Movie();
