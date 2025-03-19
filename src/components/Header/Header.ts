import $SearchBox from "../SearchBox/SearchBox";

const $Header = () => {
  const $headerBox = createElement("div", { className: "header-box" });
  const $h1 = createElement("h1", { className: "logo" });
  const $logoImage = createElement("img", {
    src: "/images/logo.png",
    alt: "MovieList",
  });
  $h1.appendChild($logoImage);

  $headerBox.append($h1, $SearchBox());
  return $headerBox;
};

export default $Header;
