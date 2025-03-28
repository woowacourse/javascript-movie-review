import Main from "../Main";
import MovieList from "../movie/MovieList";
import fetchPopularMovies from "../../fetch/fetchPopularMovies";
import fetchSearchMovies from "../../fetch/fetchSearchMovies";
import movies from "../../store/Movies";
import page from "../../store/page";
import createElement from "../utils/createElement";

const Button = ({ text, type }) => {
  const $button = createElement({
    tag: "button",
    classNames: ["primary", `${type}`],
  });

  $button.textContent = text;

  $button.addEventListener("click", async () => {
    //const $input = document.querySelector(".search-bar");

    const params = new URLSearchParams(window.location.search);

    let fetchedMovies;
    const currentPage = page.getNextPage();
    if (params.has("query")) {
      fetchedMovies = await fetchSearchMovies(params.get("query"), currentPage);
    } else {
      fetchedMovies = await fetchPopularMovies(currentPage);
    }

    movies.addMovies(fetchedMovies.results);

    if (fetchedMovies.totalPages === currentPage) {
      $button.classList.toggle("disappear");
    }

    document.querySelector(".thumbnail-list").remove();

    const oberserver = document.querySelector(".oberserver");
    const section = document.querySelector("section");
    section.insertBefore(
      MovieList({
        movies: movies.movieList,
      }),
      oberserver
    );
  });

  return $button;
};

export default Button;
