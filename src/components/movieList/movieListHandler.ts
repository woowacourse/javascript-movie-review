import { movieApi } from "../../domain/movieApi";
import { $ } from "../../utils/selector";
import { MOVIE_COUNT_IN_ONE_PAGE } from "../../constants";
import { handleModal } from "../movieDetailModal/movieDetailModalHandler";
import { backToTop } from "../../components/topButton/topButtonHandler";
import MovieList from ".";

export const updateMovies = () => {
  $<MovieList>("#movie-list").renderMovies();

  observeMovieIntersection();
  handleModal();

  backToTop();
};

const observeMovieIntersection = () => {
  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (isStoppingObservation(entry)) return;

      loadMoreMovies().then(() => {
        observer.unobserve(entry.target);
        observer.observe(entry.target);
      });
    });
  });

  const moviesOrNoResult = $(".item-view").lastElementChild;
  if (moviesOrNoResult && moviesOrNoResult.className !== "item-list") return;

  observer.observe($(".item-list > li:last-child"));
};

const isStoppingObservation = (entry: IntersectionObserverEntry) => {
  const currentPage = Number(movieApi.urlParams.get("page"));

  return (
    entry.intersectionRatio <= 0 ||
    !entry.isIntersecting ||
    currentPage === movieApi.totalPage
  );
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
