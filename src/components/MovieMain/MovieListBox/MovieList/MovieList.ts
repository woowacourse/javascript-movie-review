import MovieItem, { Movie } from "./MovieItem";

import createElement from "../../../utils/createElement";

class MovieList {
  $element;
  movieList;

  constructor() {
    this.movieList = Array.from({ length: 20 }).map(() => new MovieItem());
    this.$element = this.generateMovieList();
  }

  private generateMovieList() {
    return createElement({
      tagName: "ul",
      attribute: { class: "item-list" },
      children: this.movieList.map((item) => item.$element),
    });
  }

  //TODO: 20개가 전부 오지 않았을 경우 요소 remove
  reRender(movies: Movie[]) {
    Array.from({ length: 20 }).forEach((_, index) => {
      const movieItem = this.movieList[index];

      if (index < movies.length) {
        const movie = movies[index];
        movieItem.reRender(movie);
        return;
      }

      movieItem.$element.remove();
    });
  }

  appendSkeleton() {
    this.movieList = Array.from({ length: 20 }).map(() => new MovieItem());
    this.$element.append(...this.movieList.map((item) => item.$element));
  }
}

export default MovieList;
