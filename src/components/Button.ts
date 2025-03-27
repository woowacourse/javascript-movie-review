import MovieList from "./MovieList";
import fetchPopularMovies from "../fetch/fetchPopularMovies";
import fetchSearchMovies from "../fetch/fetchSearchMovies";
import movies from "../store/Movies";
import page from "../store/page";
import createElement from "./utils/createElement";
import { ButtonType } from "../types/ButtonType";

interface ButtonProps {
  text: string;
  type: ButtonType;
}
const Button = ({ text, type }: ButtonProps) => {
  const $button = createElement({
    tag: "button",
    classNames: ["primary", `${type}`],
  });

  $button.textContent = text;

  $button.addEventListener("click", async () => {
    const params = new URLSearchParams(window.location.search);

    let fetchedMovies;
    const currentPage = page.getNextPage();
    if (params.has("query")) {
      fetchedMovies = await fetchSearchMovies(
        params.get("query") || "",
        currentPage
      );
    } else {
      fetchedMovies = await fetchPopularMovies(currentPage);
    }

    movies.addMovies(fetchedMovies.results);

    if (fetchedMovies.totalPages === currentPage) {
      $button.classList.toggle("disappear");
    }

    const thumbnailList = document.querySelector(".thumbnail-list");
    if (thumbnailList) {
      thumbnailList.remove();
    }

    const section = document.querySelector("section");
    if (section) {
      section.appendChild(
        MovieList({
          movies: movies.movieList,
        })
      );
    }
  });

  return $button;
};

export default Button;
