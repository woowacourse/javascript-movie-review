import App from "./components/App";
import MovieRenderer from "./domains/MovieRenderer";

export const initializeLayout = async () => {
  const $app = document.querySelector("#app");
  $app?.append(App.getInstance().getElement());

  await MovieRenderer.getInstance().renderMovies();
};
