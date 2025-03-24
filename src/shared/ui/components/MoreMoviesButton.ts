export default function MoreMoviesButton() {
  return document.getElementById("more-movies-button");
}

MoreMoviesButton.addDisable = (): void => {
  const moreMoviesButton = document.getElementById("more-movies-button");
  moreMoviesButton?.classList.add("disabled");
};

MoreMoviesButton.removeDisable = (): void => {
  const moreMoviesButton = document.getElementById("more-movies-button");
  moreMoviesButton?.classList.remove("disabled");
};
