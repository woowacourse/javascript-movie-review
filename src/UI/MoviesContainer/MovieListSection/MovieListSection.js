import "./MovieListSection.css";
import MovieItem from "../MovieItem/MovieItem";
import EmptyView from "../EmptyView/EmptyView";
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

    const $ul = document.createElement("ul");
    $ul.classList.add("thumbnail-list");

    if (this.movies === null) {
      const $div = new EmptyView("오류가 발생했습니다.").render();
      $section.appendChild($div);
      return $section;
    }

    const totalMovie = this.movies.length;
    const startIndex = Math.max(0, totalMovie - 20);

    if (totalMovie === 0) {
      const $div = new EmptyView("검색 결과가 없습니다.").render();
      $section.appendChild($title);
      $section.appendChild($div);

      return $section;
    }

    $section.appendChild($title);

    if (totalMovie <= 20) {
      this.renderMovieItemByArray(this.movies, $ul);

      $section.appendChild($ul);
      return $section;
    }

    this.renderMovieItemByArray(this.movies.slice(0, startIndex), $ul);
    this.renderMovieItemByArray(this.movies.slice(startIndex), $ul);

    $section.append($title, $ul);
    return $section;
  }

  renderMovieItemByArray(movies, $ul) {
    return movies.forEach((movie) => {
      const $item = new MovieItem(movie, this.isLoading).render();
      $ul.appendChild($item);
    });
  }

  getTitle() {
    if (this.title === null) {
      return "지금 인기 있는 영화";
    }
    return `"${this.title}" 검색 결과`;
  }
}
export default MovieListSection;
