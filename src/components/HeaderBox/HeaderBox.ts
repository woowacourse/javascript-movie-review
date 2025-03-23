import $SearchForm from "../SearchForm/SearchForm";

const $HeaderBox = () => {
  const $headerBox = createElement("div", {
    className: "header-box",
  });
  const $logoLink = createElement("a", { href: "/javascript-movie-review" });
  const $logoImage = createElement("img", {
    src: "./logo.png",
    alt: "MovieList",
  });
  $logoLink.appendChild($logoImage);

  $headerBox.append($logoLink, $SearchForm());
  return $headerBox;
};

export default $HeaderBox;
