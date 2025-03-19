import "./MovieListSection.css";
import MovieItem from "../Movie/MovieItem";

class MovieListSection {
  constructor(title, movies, isLoading) {
    this.title = title;
    this.movies = movies;
    this.isLoading = isLoading;
  }

  render() {
    const $section = document.createElement("section");
    const $title = document.createElement("h2");

    $title.textContent = this.title;
    const $ul = document.createElement("ul");
    $ul.classList.add("thumbnail-list");

    const totalMovie = this.movies.length;
    const startIndex = Math.max(0, totalMovie - 20);

    console.log("@@@@@@@@@@@@@@@@", totalMovie);
    if (totalMovie <= 20) {
      this.movies.forEach((movie) => {
        const $item = new MovieItem(movie, false).render();
        $ul.appendChild($item);
      });

      $section.append($title, $ul);
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

  setEvent() {}
}
export default MovieListSection;
