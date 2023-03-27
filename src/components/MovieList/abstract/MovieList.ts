import Component from '../../core/Component';

import { MovieListApiType, MovieDetailApiType } from './../../../type/movie';
import { makeURL, makeParams, getApiData } from './../../../utils/apiHelper';

export default abstract class MovieList extends Component {
  $target;

  constructor($target: HTMLElement) {
    super();

    this.$target = $target;
  }

  async getMoviesData(
    router: string,
    page: 'popularPage' | 'searchPage',
    query?: string
  ) {
    const params = query
      ? makeParams({ query, page: this.state.getValue(page) })
      : makeParams({ page: this.state.getValue(page) });

    const movieData = await getApiData<MovieListApiType>(
      makeURL(router),
      params
    );

    if (!movieData || movieData.results.length === 0) return null;

    return {
      movieList: movieData?.results.map(
        ({ id, poster_path, title, vote_average }) => {
          return { id, poster_path, title, vote_average };
        }
      ),
      total_page: movieData?.total_pages,
    };
  }

  async getMovieDetailData(router: string) {
    const movieDetailData = await getApiData<MovieDetailApiType>(
      makeURL(router)
    );

    if (!movieDetailData) return null;

    const { id, title, vote_average, poster_path, overview, genres } =
      movieDetailData;

    return {
      id,
      title,
      voteAverage: vote_average,
      poster_path: poster_path,
      overview,
      genres,
    };
  }

  abstract emit(query?: string): void;
}
