import { API_URL, IMAGE_URL } from '../constants';
import { API_STATUS, STATUS_CODE } from '../constants/apiStatusCode';
import {
  ResponseParsedData,
  FetchMovieDetailResult,
  APIMovieDetailResponseData,
  RawMovieDetail,
  MovieDetail,
} from '../types';

const movieDetailFetcher = {
  async fetchMovieDetail(id: number): Promise<FetchMovieDetailResult> {
    try {
      const apiUrl = API_URL.BASE + API_URL.MOVIE_DETAIL(id);
      const response = await fetch(apiUrl);
      const result = await this.parse(response);
      const movieDetail = this.convertToMovieDetail(result.rawMovieDetail);

      return {
        statusCode: result.statusCode,
        statusMessage: result.statusMessage,
        movieDetail: movieDetail,
      };
    } catch (error) {
      return {
        statusCode: undefined,
        statusMessage: 'Not valid error',
        movieDetail: undefined,
      };
    }
  },

  async parse(response: Response): Promise<ResponseParsedData> {
    const rawMovieDetail = await response.json();

    if (rawMovieDetail) {
      return {
        statusCode: STATUS_CODE.SUCCESS,
        statusMessage: API_STATUS[STATUS_CODE.SUCCESS][1],
        rawMovieDetail: rawMovieDetail,
      };
    }

    const { status_code, errors }: APIMovieDetailResponseData = await response.json();

    if (!status_code) return { statusCode: undefined, statusMessage: errors[0] };

    return { statusCode: status_code, statusMessage: API_STATUS[status_code][1] };
  },

  convertToMovieDetail(rawMovieDetail: RawMovieDetail | undefined): MovieDetail | undefined {
    if (!rawMovieDetail) return undefined;
    const genres = rawMovieDetail.genres.map((genre) => genre.name);

    const movieDetail = {
      id: rawMovieDetail.id,
      title: rawMovieDetail.title,
      posterPath: IMAGE_URL.BASE + rawMovieDetail.poster_path,
      voteAverage: rawMovieDetail.vote_average,
      genres: genres,
      overview: rawMovieDetail.overview,
      starRating: { imagePath: IMAGE_URL.STAR_EMPTY, score: 0, coment: '' },
    };

    return movieDetail;
  },
};

export default movieDetailFetcher;
