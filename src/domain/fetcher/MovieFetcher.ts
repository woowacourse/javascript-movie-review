import { MOVIE_IMAGE_URL } from '../../constants/movieURLs';
import { FetchedMovieJson } from '../../types/fetchedMovie';
import { MovieItem } from '../../types/movie';
import fetchJson from '../fetchJson';

abstract class MovieFetcher {
  protected abstract base: string;
  private totalPages!: number;

  protected params: { [param: string]: string } = {
    api_key: process.env.API_KEY as string,
    language: 'ko-KR',
    page: '0',
  };

  constructor(queries?: { [param: string]: string }) {
    this.params = {
      ...this.params,
      ...queries,
    };
  }

  fetchNextMovies(): Promise<MovieItem[]> {
    this.params.page = String(Number(this.params.page) + 1);

    return fetchJson(this.#createSearchURL(this.params), this.#processMovieData.bind(this));
  }

  isLastPage(): boolean {
    return Number(this.params.page) === this.totalPages;
  }

  #createSearchURL(params: { [param: string]: string }): string {
    const url = new URL(this.base);
    Object.entries(params).forEach(([param, value]) => {
      url.searchParams.append(param, value);
    });

    return url.toString();
  }

  #processMovieData({ page, results, total_pages }: FetchedMovieJson): MovieItem[] {
    const movies: MovieItem[] = results.map(result => ({
      title: result.title,
      posterPath: `${MOVIE_IMAGE_URL}/${result.poster_path}`,
      voteAverage: result.vote_average,
    }));

    this.params.page = String(page);
    this.totalPages = total_pages;

    return movies;
  }
}

export default MovieFetcher;
