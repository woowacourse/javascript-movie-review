import { $ } from "../utils/selectors";

const hideBackgroundContainer = () => {
  const $backgroundContainer = $(".background-container");

  if (!$backgroundContainer) {
    return;
  }

  $backgroundContainer.remove();
};

export default hideBackgroundContainer;
