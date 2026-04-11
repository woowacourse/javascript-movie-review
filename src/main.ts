import { handleHome } from "./controller/handleHome";
import { handleLoadMore } from "./controller/handleLoadMore";
import { handleSearch } from "./controller/handleSearch";
import { searchView } from "./view/searchView";
import { addButtonView } from "./view/addButtonView";
import { modalView } from "./view/modalView";
import { handleModal } from "./controller/handleModal";
import { myStarRatingView } from "./view/myStarRatingView";
import { handleMyStar } from "./controller/handleMyStar";
import { currentMovieModal } from "./model/currentMovieModel";

function init() {
  addEventListener("load", () => {
    handleHome();
  });

  addButtonView.bindAddButtonClick(async () => {
    await handleLoadMore();
  });

  searchView.bindSearchSubmit((keyword: string) => {
    handleSearch(keyword);
  });

  modalView.bindMovieClick((clickedMovieId: string) => {
    handleModal(clickedMovieId);
  });

  modalView.bindCloseModalClick();

  myStarRatingView.bindHandleMyStarClick((score) => {
    const currentMovieId = currentMovieModal.currentMovieId;
    handleMyStar(currentMovieId, score);
  });
}

init();
