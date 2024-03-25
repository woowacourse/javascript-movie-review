import HttpError from '../error/HttpError';
import ERROR_MESSAGE from '../constants/api/messages';
import { Movie, MoviePage } from '../domain/movie';
import { TMDBMovieDetailsResponse, TMDBMoviesResponse } from '../types/tmdb';

/* eslint-disable max-depth */
/* eslint-disable max-lines-per-function */
/* eslint-disable no-useless-catch */

export class TMDBApi {
  activeHttpRequests: AbortController[] = [];

  constructor() {
    this.activeHttpRequests = [];
  }

  async sendRequest(url: string, method = 'GET', body = null, headers = {}) {
    console.log('url', url);
    const httpAbortCtrl = new AbortController();
    if (httpAbortCtrl instanceof AbortController) {
      this.activeHttpRequests.push(httpAbortCtrl);
    }

    try {
      const res = await fetch(url, {
        method,
        body,
        headers,
        signal: httpAbortCtrl.signal,
      });

      this.activeHttpRequests = this.activeHttpRequests.filter((reqCtrl) => reqCtrl !== httpAbortCtrl);

      if (!res.ok) {
        const error = new HttpError(ERROR_MESSAGE.FAIL_FETCH, res.status);
        throw error;
      }
      const data = await res.json();
      const transformedData = this.transformToMoviePage(data);
      return transformedData;
    } catch (err) {
      throw err;
    }
  }

  private transformToMoviePage(moviesData: TMDBMoviesResponse): MoviePage {
    return {
      page: moviesData.page,
      movies: moviesData.results.map(this.transformMovieData),
      totalPages: moviesData.total_pages,
      totalResults: moviesData.total_results,
    };
  }

  private transformMovieData(movieDetails: TMDBMovieDetailsResponse): Movie {
    return {
      id: movieDetails.id,
      title: movieDetails.title,
      genreIds: movieDetails.genre_ids,
      overview: movieDetails.overview,
      posterPath: movieDetails.poster_path,
      voteAverage: movieDetails.vote_average,
    };
  }

  cleanup() {
    this.activeHttpRequests.forEach((abortCtrl) => abortCtrl.abort());
  }
}

const tmdbApi = new TMDBApi();

export default tmdbApi;
