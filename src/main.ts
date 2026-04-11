import { handleHome } from "./controller/handleHome";
import { handleLoadMore } from "./controller/handleLoadMore";
import { handleSearch } from "./controller/handleSearch";
import { searchView } from "./view/searchView";
import { modalView } from "./view/modalView";
import { handleModal } from "./controller/handleModal";
import { myStarRatingView } from "./view/myStarRatingView";
import { handleMyStar } from "./controller/handleMyStar";
import { currentMovieModel } from "./model/currentMovieModel";
import { infiniteScrollView } from "./view/InfiniteScrollView";

function init() {
  addEventListener("load", () => {
    handleHome();
  });

  infiniteScrollView.bindBottomIntersect(async () => {
    await handleLoadMore();
  });

  searchView.bindSearchSubmit((keyword: string) => {
    handleSearch(keyword);
  });

  modalView.bindMovieClick((clickedMovieId: string) => {
    handleModal(Number(clickedMovieId));
  });

  modalView.bindCloseModalClick();

  myStarRatingView.bindHandleMyStarClick((score) => {
    handleMyStar(score);
  });

  modalView.bindRetryClick(() => {
    const failedMovieId = currentMovieModel.currentMovieId;
    
    if (failedMovieId) {
      handleModal(failedMovieId);
    };
  });
}

init();
