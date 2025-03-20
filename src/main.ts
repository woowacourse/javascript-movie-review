import { ERROR_MESSAGE } from "./constant/errorMessage";
import MessageModalController from "./controller/ModalController";
import MovieListController from "./controller/MovieListController";
import SearchMovieListController from "./controller/SearchMovieListController";

const mainElement = document.querySelector("main") as HTMLElement;
const searchBarElement = document.querySelector(
  ".search-bar",
) as HTMLFormElement;
const headerLogoElement = document.querySelector(".header-wrapper .logo");

const movieListController = new MovieListController(mainElement);

const messageModalController = new MessageModalController(mainElement);

try {
  await movieListController.renderMovieList();
} catch (error) {
  messageModalController.changeContentMessage(
    ERROR_MESSAGE[Number((error as Error).message)] ||
      "알 수 없는 오류가 발생했습니다.",
  );
  messageModalController.messageModalElement.showModal();
}

searchBarElement.addEventListener("submit", async (event) => {
  event.preventDefault();

  const formElement = event.target as HTMLElement;
  const target = formElement.querySelector("input") as HTMLInputElement;
  const searchValue = target.value;

  new SearchMovieListController(mainElement, searchValue);
});

headerLogoElement?.addEventListener("click", async () => {
  await movieListController.renderExistingMovieList();

  const inputElement = searchBarElement.querySelector(
    "input",
  ) as HTMLInputElement;
  inputElement.value = "";
});
