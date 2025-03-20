import "./MovieListSection.css";
import MovieItem from "../Movie/MovieItem";
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
      this.movies.forEach((movie) => {
        const $item = new MovieItem(movie, false).render();
        $ul.appendChild($item);
      });

      $section.appendChild($ul);
      return $section;
    }

    this.movies.slice(0, startIndex).forEach((movie) => {
      const $item = new MovieItem(movie, false).render();
      $ul.appendChild($item);
    });

    this.movies.slice(startIndex).forEach((movie) => {
      const $item = new MovieItem(movie, this.isLoading).render();
      $ul.appendChild($item);
    });

    $section.append($title, $ul);
    return $section;
  }

  getTitle() {
    if (this.title === undefined) {
      return "지금 인기 있는 영화";
    }
    return `"${this.title}" 검색 결과`;
  }
}
export default MovieListSection;
