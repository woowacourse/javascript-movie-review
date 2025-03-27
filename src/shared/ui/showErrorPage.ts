import ErrorPage from "./components/ErrorPage";

export const showErrorPage = () => {
  const $container = document.querySelector(".container");
  if (!$container) return;

  $container.replaceChildren(ErrorPage());
};
