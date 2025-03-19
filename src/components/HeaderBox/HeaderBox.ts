import $SearchForm from "../SearchForm/SearchForm";

const $HeaderBox = () => {
  const $headerBox = createElement("div", {
    className: "header-box",
  });
  const $logoLink = createElement("a", { href: "/" });
  const $logoImage = createElement("img", {
    src: "/images/logo.png",
    alt: "MovieList",
  });
  $logoLink.appendChild($logoImage);

  $headerBox.append($logoLink, $SearchForm());
  return $headerBox;
};

export default $HeaderBox;
