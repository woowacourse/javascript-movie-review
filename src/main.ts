import App from "./components/App";
import MovieService from "./domains/MovieService";

export const initializeLayout = async () => {
  const $app = document.querySelector("#app");
  $app?.append(App.getInstance().getElement());

  await MovieService.getInstance().renderMovies();
};
