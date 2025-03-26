import backgroundContainer from "./internal/backgroundContainer";

const showBackgroundContainer = ($targetElement: Element | null) => {
  if (!$targetElement) {
    return;
  }

  const $backgroundContainer = backgroundContainer();

  $targetElement.append($backgroundContainer);
};

export default showBackgroundContainer;
