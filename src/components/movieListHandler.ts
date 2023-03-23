import { movieApi } from "../domain/movieApi";
import { $ } from "../utils/selector";
import MovieList from "./MovieList";
import { MOVIE_COUNT_IN_ONE_PAGE } from "../constants";

export const updateMovies = () => {
  $<MovieList>("#movie-list").renderMovies();

  observeMovieIntersection();
};

const observeMovieIntersection = () => {
  const options = {
    threshold: 0.2,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.intersectionRatio <= 0) return;
      if (!entry.isIntersecting) return;

      const currentPage = Number(movieApi.urlParams.get("page"));
      if (currentPage === movieApi.totalPage) return;

      loadMoreMovies().then(() => {
        observer.unobserve(entry.target);
        observer.observe(entry.target);
      });
    });
  }, options);

  observer.observe($(".item-list > li:nth-last-child(3)"));
};

const loadMoreMovies = async () => {
  $(".item-list").insertAdjacentHTML("beforeend", makeSkeletons());

  const currentPage = Number(movieApi.urlParams.get("page"));
  movieApi.urlParams.set("page", `${currentPage + 1}`);

  const path = movieApi.url.pathname.replace("/3/", "");
  movieApi.showMovies(path, `${movieApi.urlParams.get("query")}`);
};

export const makeSkeletons = () => {
  return "<movie-skeleton></movie-skeleton>".repeat(MOVIE_COUNT_IN_ONE_PAGE);
};
