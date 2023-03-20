import { page } from "../../domain/page";
import { executeEventListener } from "../../utils/eventListener";
import { $ } from "../../utils/selector";
import MovieList from ".";

export const onClickMoreButton = () => {
  executeEventListener($("#more-button"), {
    type: "click",
    prevent: true
  }, async () => {
    $(".item-list").insertAdjacentHTML("beforeend", renderSkeletons());

    page.page += 1;

    if (page.last_keyword === "") {
      page.showPopularMovies();
    } else {
      page.showSearchedMovies(page.last_keyword);
    }
  });
};

export const updateMovies = () => {
  const movieList = $("#movie-list") as MovieList;
  movieList.renderMovies();

  onClickMoreButton();
};

export const removeMoreButton = () => {
  $("#more-button").remove();
};

export const renderSkeletons = () => {
  return "<movie-skeleton></movie-skeleton>".repeat(20);
};
