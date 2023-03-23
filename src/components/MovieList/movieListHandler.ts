import { $ } from "../../utils/selector";
import MovieList from ".";
import { loadNextPage } from "../../domain/movies";

export const renderMovieList = () => {
  const movieList = $("#movie-list") as MovieList;
  movieList.renderMovies();

  handleInfinityScroll();
};

const handleInfinityScroll = () => {
  const loadingTrigger = document.getElementById('loading-trigger');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) { loadNextPage(); }
    });
  });

  observer.observe(loadingTrigger as Element);
}

export const removeMoreButton = () => {
  $("#loading-trigger").remove();
};

export const renderSkeletons = () => {
  return "<movie-skeleton></movie-skeleton>".repeat(20);
};