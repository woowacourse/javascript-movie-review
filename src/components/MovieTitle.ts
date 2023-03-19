import { $ } from '../utils/domSelector';
import { MOVIE_LIST_RESET } from '../constants';
import MovieList from '../domain/MovieList';

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
    MovieList.on(MOVIE_LIST_RESET, (event) => {
      const searchQuery = (event as CustomEvent).detail;
      this.render(searchQuery);
    });
  }

  private render(searchQuery: string) {
    this.title.textContent = searchQuery ? `"${searchQuery}" 검색 결과` : '지금 인기 있는 영화';
  }
}

export default MovieTitle.getInstance();
