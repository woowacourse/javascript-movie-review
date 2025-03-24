import "./MovieListSection.css";
import MovieItem from "../MovieItem/MovieItem";
import EmptyView from "../EmptyView/EmptyView";
import { MOVIE } from "../../../constants/movie";

class MovieListSection {
  constructor(title, movies, isLoading) {
    this.title = title;
    this.movies = movies;
    this.isLoading = isLoading;
  }

  render() {
    const $section = document.createElement("section");
    const $title = document.createElement("h2");
    $title.textContent = this.getTitle();
    $section.appendChild($title);

    const $ul = document.createElement("ul");
    $ul.classList.add("thumbnail-list");

    if (this.movies === null) {
      const $div = new EmptyView("오류가 발생했습니다.").render();
      $section.appendChild($div);
      return $section;
    }

    const totalMovie = this.movies.length;

    if (this.isLoading && totalMovie === 0) {
      this.renderMovieItemByArray(
        Array(MOVIE.MAX_MOVIES_PER_PAGE).fill(0),
        $ul,
        this.isLoading
      );
      $section.appendChild($ul);

      return $section;
    }

    if (totalMovie === 0) {
      const $div = new EmptyView("검색 결과가 없습니다.").render();
      $section.appendChild($title);
      $section.appendChild($div);

      return $section;
    }

    this.renderMovieItemByArray(this.movies, $ul, false);
    if (this.isLoading) {
      this.renderMovieItemByArray(
        Array(MOVIE.MAX_MOVIES_PER_PAGE).fill(0),
        $ul,
        this.isLoading
      );
    }

    $section.append($title, $ul);
    return $section;
  }

  renderMovieItemByArray(movies, $ul, isLoading) {
    movies.forEach((movie) => {
      const $item = new MovieItem(movie, isLoading).render();
      $ul.appendChild($item);
    });
  }

  getTitle() {
    if (this.title === undefined) {
      return "지금 인기 있는 영화";
    }
    return `"${this.title}" 검색 결과`;
  }
}
export default MovieListSection;
