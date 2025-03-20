import MessageModal from "./component/MessageModal";
import MovieListController from "./controller/MovieListController";
import SearchMovieListController from "./controller/SearchMovieListController";

const mainElement = document.querySelector("main") as HTMLElement;
const searchBarElement = document.querySelector(
  ".search-bar",
) as HTMLFormElement;
const headerLogoElement = document.querySelector(".header-wrapper .logo");

const movieListController = new MovieListController(mainElement);

try {
  await movieListController.renderMovieList();
} catch (error) {
  console.log(error);
  const modalElement = MessageModal("aaa") as HTMLDialogElement;
  mainElement.appendChild(modalElement);
  modalElement.showModal();
  modalElement.addEventListener("click", (e) => {
    if (e.target === e.currentTarget) modalElement.close();
  });
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
