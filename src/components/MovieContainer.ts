import MovieList from "./MovieList";
import createElement from "./utils/createElement";
import Button from "./Button";
import MovieType from "../types/MovieType";
import { setupInfiniteScroll } from "./utils/infiniteScroll";
import renderMovieList from "./renderMovieList";
import page from "../store/page";
import fetchSearchMovies from "../fetch/fetchSearchMovies";
import fetchPopularMovies from "../fetch/fetchPopularMovies";

const BUTTON_MORE = "더보기";

interface MovieContainerProps {
  movies: MovieType[];
  status: "loading" | "fetched" | "error";
}

const MovieContainer = ({ movies, status }: MovieContainerProps) => {
  const $container = createElement({ tag: "div", classNames: ["container"] });
  const $main = createElement({ tag: "main" });
  const $section = createElement({ tag: "section" });
  const $h2 = createElement({ tag: "h2", classNames: ["list-title"] });

  $h2.textContent = "지금 인기 있는 영화";

  const movieListElement = MovieList({ movies, status });

  $section.appendChild($h2);
  $section.appendChild(movieListElement);
  $main.appendChild($section);
  $main.appendChild(Button({ text: BUTTON_MORE, type: "more" }));
  $container.appendChild($main);

  init();

  return $container;
};

export default MovieContainer;

const init = () => {
  setupInfiniteScroll({
    onLoad: async () => {
      const params = new URLSearchParams(window.location.search);
      const currentPage = page.getNextPage();
      const res = params.has("query")
        ? await fetchSearchMovies(params.get("query") || "", currentPage)
        : await fetchPopularMovies(currentPage);
      page.setTotalPages(res.totalPages);
      renderMovieList(() =>
        Promise.resolve({
          results: res.results,
          totalPages: res.totalPages,
        })
      );
    },
    offset: 150,
  });
};
