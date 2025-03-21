export const addErrorBox = (text: string) => {
  const $movieListSection = document.querySelector(
    ".movie-list-section"
  ) as HTMLElement;
  $movieListSection.replaceChildren($ErrorBox({ text }));
};

interface ErrorBoxProps {
  text: string;
}

const $ErrorBox = ({ text }: ErrorBoxProps) => {
  const $errorPlanet = createElement("img", {
    src: "./empty-planet.svg",
    className: "empty-planet",
    alt: text,
  });
  const $emptyText = createElement("h2", {
    textContent: text,
  });

  const $box = createElement("div", {
    className: "error-box",
  });
  $box.append($errorPlanet, $emptyText);

  return $box;
};

export default $ErrorBox;
