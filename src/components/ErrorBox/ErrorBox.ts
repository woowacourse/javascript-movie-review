import "./errorBox.css";

interface AddErrorBoxParameter {
  selector: string;
  errorMessage: string;
}

export const addErrorBox = ({
  selector,
  errorMessage,
}: AddErrorBoxParameter) => {
  const $container = document.querySelector(selector);

  if (!$container) {
    throw new Error(`${selector}가 존재하지 않습니다.`);
  }

  $container.replaceChildren($ErrorBox({ errorMessage }));
};

interface ErrorBoxProps {
  errorMessage: string;
}

const $ErrorBox = ({ errorMessage }: ErrorBoxProps) => {
  const $errorPlanet = createElement("img", {
    src: "./empty-planet.svg",
    className: "empty-planet",
    alt: errorMessage,
  });
  const $emptyText = createElement("h2", {
    textContent: errorMessage,
  });

  const $box = createElement("div", {
    className: "error-box",
  });
  $box.append($errorPlanet, $emptyText);

  return $box;
};

export default $ErrorBox;
