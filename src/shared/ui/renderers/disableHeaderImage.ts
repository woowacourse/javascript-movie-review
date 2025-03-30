export function disableHeaderImage() {
  const $overlay = document.querySelector(".overlay");
  $overlay?.classList.add("disabled");

  const $topRatedMovie = document.querySelector(".top-rated-movie");
  $topRatedMovie?.classList.add("disabled");

  const $backgroundContainer = document.querySelector(".background-container");
  $backgroundContainer?.classList.add("background-container-disabled");
}
