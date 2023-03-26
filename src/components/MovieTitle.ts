import { $ } from '../utils/domSelector';
import { MOVIE_LIST_RESET } from '../constants';
import { MOVIE_LIST_MAIN_TITLE } from '../constants/ui';
import MovieList from '../domain/MovieList';
import { MovieResetEventData } from '../types/movie';

class MovieTitle {
  private static instance: MovieTitle;
  private title: HTMLHeadingElement;

  private constructor() {
    this.init();
    this.title = $<HTMLHeadingElement>('#movie-list-title');
  }

  static getInstance(): MovieTitle {
    if (!MovieTitle.instance) {
      MovieTitle.instance = new MovieTitle();
    }

    return MovieTitle.instance;
  }

  private init() {
    MovieList.on(MOVIE_LIST_RESET, (event: CustomEvent<MovieResetEventData>) => {
      const { searchQuery } = event.detail;
      this.render(searchQuery);
    });
  }

  private render(searchQuery: string) {
    this.title.textContent = searchQuery ? `"${searchQuery}" 검색 결과` : MOVIE_LIST_MAIN_TITLE;
  }
}

export default MovieTitle.getInstance();
