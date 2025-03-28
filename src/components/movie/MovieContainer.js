import MovieList from "./MovieList";
import createElement from "../utils/createElement";
import Button from "../common/Button";
import storeMovies from "../../store/Movies";
import page from "../../store/page";
import fetchSearchMovies from "../../fetch/fetchSearchMovies";
import fetchPopularMovies from "../../fetch/fetchPopularMovies";

const BUTTON_MORE = "더보기";

const MovieContainer = ({ movies }) => {
  const $container = createElement({
    tag: "div",
    classNames: ["container"],
  });

  const $main = createElement({
    tag: "main",
  });

  const $section = createElement({
    tag: "section",
  });

  const $h2 = createElement({
    tag: "h2",
    classNames: ["list-title"],
  });

  $h2.textContent = "지금 인기 있는 영화";

  $container.appendChild($main);
  $main.appendChild($section);
  $section.appendChild($h2);

  const $div = createElement({
    tag: "div",
    classNames: ["oberserver"],
  });

  const callback = (entries, observer) => {
    entries.forEach(async (entry) => {
      if (entry.isIntersecting) {
        const params = new URLSearchParams(window.location.search);

        let fetchedMovies;
        const currentPage = page.getNextPage();
        if (params.has("query")) {
          fetchedMovies = await fetchSearchMovies(
            params.get("query"),
            currentPage
          );
        } else {
          fetchedMovies = await fetchPopularMovies(currentPage);
        }
        storeMovies.addMovies(fetchedMovies.results);

        if (fetchedMovies.totalPages === currentPage) {
          observer.unobserve($div);
        }

        document.querySelector(".thumbnail-list").remove();
        const oberserver = document.querySelector(".oberserver");
        const section = document.querySelector("section");
        section.insertBefore(
          MovieList({
            movies: storeMovies.movieList,
          }),
          oberserver
        );
      }
    });
  };

  const observer = new IntersectionObserver(callback);
  observer.observe($div);

  $section.appendChild(MovieList({ movies }));
  $section.appendChild($div);

  $main.appendChild(Button({ text: BUTTON_MORE, type: "more" }));

  return $container;
};

export default MovieContainer;
