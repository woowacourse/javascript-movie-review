import { BASE_URL, CONFIG, ENDPOINT, MOVIE_LIST_TYPE, STORAGE } from '../constant/config';
import fetchAPI from '../api/fetchAPI';
import generateQueryUrl from '../api/generateQueryUrl';
import Movie from './Movie';
import MovieDetail from './MovieDetail';
import getEnvVariable from '../util/getEnvVariable';
import {
  MovieDetailRawData,
  MovieDetailData,
  MoviePageDataParams,
  UserScoreParams,
  UserScoreType,
} from '../interface/MovieInterface';

type MovieListType = keyof typeof MOVIE_LIST_TYPE;

interface FetchMovieDataParams {
  listType: MovieListType;
  pageNumber: number;
  searchKeyword: string;
}

class MovieService {
  constructor() {
    this.initUserMoviesStorage();
  }

  async fetchMovieData({ listType, pageNumber, searchKeyword = '' }: FetchMovieDataParams) {
    const endpoint = listType === MOVIE_LIST_TYPE.search.type ? ENDPOINT.GET.MOVIE_SEARCH : ENDPOINT.GET.POPULAR_MOVIES;
    const queryUrl = generateQueryUrl({
      baseUrl: BASE_URL,
      endpoint,
      query: {
        api_key: getEnvVariable('API_KEY'),
        language: 'ko-KR',
        page: pageNumber,
        query: searchKeyword,
      },
    });

    const { total_pages, results } = await fetchAPI({ url: queryUrl, method: 'GET' });
    return this.createMoviePageData({ total_pages, results, pageNumber });
  }

  async fetchMovieDetail(id: number) {
    const queryUrl = generateQueryUrl({
      baseUrl: BASE_URL,
      endpoint: ENDPOINT.GET.MOVIE_DETAIL(id),
      query: {
        api_key: getEnvVariable('API_KEY'),
        language: 'ko-KR',
      },
    });

    const { title, genres, poster_path, vote_average, overview } = await fetchAPI({ url: queryUrl, method: 'GET' });
    return this.createMovieDetail({ id, title, genres, poster_path, vote_average, overview });
  }

  createMoviePageData({ total_pages, results, pageNumber }: MoviePageDataParams) {
    const movieList: Movie[] = results.map(
      (result) =>
        new Movie({
          id: result.id,
          title: result.title,
          posterPath: result.poster_path,
          voteAverage: result.vote_average,
        }),
    );

    return {
      hasNextPage: total_pages > pageNumber,
      movieList,
    };
  }

  createMovieDetail({ ...data }: MovieDetailRawData) {
    const movieDetailData: MovieDetailData = {
      id: data.id,
      title: data.title,
      genres: data.genres.map((genre) => genre.name),
      overview: data.overview,
      posterPath: data.poster_path,
      voteAverage: data.vote_average,
      userScore: this.getUserScore({ movieId: data.id }),
    };
    return new MovieDetail(movieDetailData);
  }

  initUserMoviesStorage() {
    if (!localStorage.getItem(STORAGE.userMovies)) {
      localStorage.setItem(STORAGE.userMovies, '{}');
    }
  }

  getUserMoviesFromStorage() {
    const userMoviesRawData = localStorage.getItem(STORAGE.userMovies);
    if (!userMoviesRawData) {
      this.initUserMoviesStorage();
      return {};
    }
    return JSON.parse(userMoviesRawData);
  }

  getUserScore({ movieId }: UserScoreParams) {
    const userMovies = this.getUserMoviesFromStorage();
    if (
      Object.keys(userMovies).includes(movieId.toString()) &&
      parseInt(userMovies[movieId].userScore) in CONFIG.userScore
    ) {
      return parseInt(userMovies[movieId].userScore) as keyof typeof CONFIG.userScore;
    }
    return null;
  }

  setUserScore({ movieId, userScore }: UserScoreParams) {
    const userMovies = this.getUserMoviesFromStorage();
    const updatedUserMovies = { ...userMovies, [movieId]: { userScore } };
    localStorage.setItem(STORAGE.userMovies, JSON.stringify(updatedUserMovies));
  }
}

export default MovieService;
