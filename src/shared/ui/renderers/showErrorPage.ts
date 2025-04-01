import ErrorPage from "../components/ErrorPage";
import { disableHeaderImage } from "./disableHeaderImage";

export const showErrorPage = (errorMessage: string) => {
  const $container = document.querySelector(".container");
  if (!$container) return;

  disableHeaderImage();
  $container.replaceChildren(ErrorPage(errorMessage));
};
