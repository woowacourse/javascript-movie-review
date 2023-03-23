import { API_URL } from '../constants';
import { API_STATUS, STATUS_CODE } from '../constants/apiStatusCode';
import {
  Movie,
  RawMovie,
  FetchMoviesResult,
  ResponseParsedData,
  APIMovieResponseData,
} from '../types';

class MovieFetcher {
  private currentPage = 1;

  resetPage() {
    this.currentPage = 1;
  }

  increasePage() {
    this.currentPage += 1;
  }

  async fetchMovieList(keyword?: string): Promise<FetchMoviesResult> {
    try {
      const apiUrl =
        typeof keyword === 'string'
          ? API_URL.BASE + API_URL.SEARCH_MOVIES(this.currentPage, keyword)
          : API_URL.BASE + API_URL.POPULAR_MOVIES(this.currentPage);
      const response = await fetch(apiUrl);
      const result = await this.parse(response);

      if (!result.rawMovieList) {
        return {
          statusCode: result.statusCode,
          statusMessage: result.statusMessage,
          movieList: [],
          isLastPage: false,
        };
      }

      const movieList = this.convertToMovieList(result.rawMovieList);

      return {
        statusCode: result.statusCode,
        statusMessage: result.statusMessage,
        movieList: movieList,
        isLastPage: this.currentPage === result.totalPages ? true : false,
      };
    } catch (error) {
      return {
        statusCode: undefined,
        statusMessage: 'Not valid error',
        movieList: [],
        isLastPage: false,
      };
    }
  }

  async parse(response: Response): Promise<ResponseParsedData> {
    const { status_code, errors, total_pages, results }: APIMovieResponseData =
      await response.json();

    if (results) {
      return {
        statusCode: STATUS_CODE.SUCCESS,
        statusMessage: API_STATUS[STATUS_CODE.SUCCESS][1],
        totalPages: total_pages,
        rawMovieList: results,
      };
    }

    if (!status_code) return { statusCode: undefined, statusMessage: errors[0] };

    return { statusCode: status_code, statusMessage: API_STATUS[status_code][1] };
  }

  convertToMovieList(rawMovieList: RawMovie[]) {
    const movieList = rawMovieList.map(
      (rawMovie): Movie => ({
        title: rawMovie.title,
        posterPath: rawMovie.poster_path,
        voteAverage: rawMovie.vote_average,
      }),
    );

    return movieList;
  }
}

export default MovieFetcher;
