import Component from '../../core/Component';

import MovieListApiType from './../../../type/movie';
import { makeURL, makeParams, getApiData } from './../../../utils/apiHelper';

export default abstract class MovieList extends Component {
  $target;

  state;

  constructor($target: HTMLElement) {
    super();

    this.$target = $target;
    this.state = this.useState();
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

    return {
      movieList: movieData.results.map(
        ({ id, poster_path, title, vote_average }) => {
          return { id, poster_path, title, vote_average };
        }
      ),
      total_page: movieData.total_pages,
    };
  }

  abstract emit(query?: string): void;
}
