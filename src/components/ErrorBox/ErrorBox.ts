export const addErrorBox = (text: string) => {
  const $movieListSection = document.querySelector(
    ".movie-list-section"
  ) as HTMLElement;
  $movieListSection.replaceChildren($ErrorBox({ text }));
};

export const networkErrorBoundary = async (asyncFn: () => Promise<void>) => {
  try {
    await asyncFn();
  } catch (error) {
    if (error instanceof Error) {
      addErrorBox(error.message);
    }
  }
};

interface ErrorBoxProps {
  text: string;
}

const $ErrorBox = ({ text }: ErrorBoxProps) => {
  const $errorPlanet = createElement("img", {
    src: "./images/empty-planet.svg",
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
