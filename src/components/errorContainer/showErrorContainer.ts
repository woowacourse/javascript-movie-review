import { $ } from "../utils/selectors";
import hideBackgroundContainer from "../backgroundContainer/hideBackgroundContainer";
import errorContainer from "./internal/errorContainer";

const showErrorContainer = (error: unknown) => {
  if (error instanceof Error) {
    hideBackgroundContainer();

    const $errorContainer = errorContainer(error);

    const $main = $("main");
    $main?.replaceChildren($errorContainer);
  }
};

export default showErrorContainer;
