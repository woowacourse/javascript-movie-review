import "./MovieListSection.css";
import MovieItem from "../UI/Movie/MovieItem";

class MovieListSection {
  constructor(title, movies) {
    console.log(title, movies);

    this.title = title;
    this.movies = movies;
  }

  render() {
    const $section = document.createElement("section");
    const $title = document.createElement("h2");

    $title.textContent = this.title;
    const $ul = document.createElement("ul");
    $ul.classList.add("thumbnail-list");

    this.movies.forEach((movie) => {
      const $item = new MovieItem(movie).render();
      $ul.appendChild($item);
    });

    $section.append($title, $ul);

    return $section;
  }

  setEvent() {}
}
export default MovieListSection;
