import { MovieData, MovieDetail, MovieServiceType } from '../../domain/MovieServiceType';
import convertToPosterPath from '../../util/convertToPosterPath';
import fetchDataFromUrl from '../../util/fetchDataFromUrl';
import getEnvVariable from '../../util/getEnvVariable';
import { ResponseMovieDetail, ResponseMovieList } from './TMDBType';

interface RequestPopularMovieList {
  endpoint: '/movie/popular';
  params: { page: number; api_key: string; language: string };
}

interface RequestSearchMovieList {
  endpoint: '/search/movie';
  params: { query: string; page: number; api_key: string; language: string };
}

interface RequestMovieDetail {
  endpoint: `/movie/${number}`;
  params: { api_key: string; language: string };
}

class TMDB implements MovieServiceType {
  private readonly base;
  private readonly apiKey;

  constructor() {
    this.base = getEnvVariable('TMDB_API_BASE_URL');
    this.apiKey = getEnvVariable('API_KEY');
  }

  async fetchPopularMovieList(currentPage: number) {
    const requestData: RequestPopularMovieList = {
      endpoint: '/movie/popular',
      params: {
        page: currentPage,
        api_key: this.apiKey,
        language: 'ko-KR',
      },
    };

    const responseData = await fetchDataFromUrl<ResponseMovieList>(
      `${this.base}${requestData.endpoint}`,
      requestData.params,
    );

    return this.createMoviePageData({ responseData, currentPage: currentPage });
  }

  async fetchSearchResult({ query, currentPage }: { query: string; currentPage: number }) {
    const requestData: RequestSearchMovieList = {
      endpoint: '/search/movie',
      params: {
        page: currentPage,
        api_key: this.apiKey,
        language: 'ko-KR',
        query,
      },
    };

    const responseData = await fetchDataFromUrl<ResponseMovieList>(
      `${this.base}${requestData.endpoint}`,
      requestData.params,
    );

    return this.createMoviePageData({ responseData, currentPage: currentPage });
  }

  async fetchMovieDetail(movieId: number) {
    const requestData: RequestMovieDetail = {
      endpoint: `/movie/${movieId}`,
      params: {
        language: 'ko-KR',
        api_key: this.apiKey,
      },
    };

    const responseData = await fetchDataFromUrl<ResponseMovieDetail>(
      `${this.base}${requestData.endpoint}`,
      requestData.params,
    );

    return this.createMovieDetailData(responseData);
  }

  private createMoviePageData({ responseData, currentPage }: { responseData: ResponseMovieList; currentPage: number }) {
    const movieList: MovieData[] = responseData.results.map((result) => ({
      id: result.id,
      title: result.title,
      posterPath: convertToPosterPath({ relativePath: result.poster_path, width: 200 }),
      voteAverage: result.vote_average,
    }));

    return {
      hasNextPage: responseData.total_pages > currentPage,
      movieList,
    };
  }

  private createMovieDetailData(responseData: ResponseMovieDetail): MovieDetail {
    return {
      id: responseData.id,
      genres: responseData.genres.map(({ name }) => name),
      title: responseData.title,
      voteAverage: responseData.vote_average,
      description: responseData.overview,
      posterPath: convertToPosterPath({ relativePath: responseData.poster_path, width: 300 }),
    };
  }
}

export default new TMDB();
