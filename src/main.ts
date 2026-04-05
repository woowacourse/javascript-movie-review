import { popularController } from "./controller/popularController";
import { moreButtonController } from "./controller/moreButtonController";
import { searchController } from "./controller/searchController";
import { searchView } from "./view/searchView";
import { addButtonView } from "./view/addButtonView";
import { movieModel } from "./model/MovieModel";

function init() {
  addEventListener("load", () => {
    popularController();
  });

  addButtonView.bindAddButtonClick(async () => {
    const result = await moreButtonController.handleLoadMore(movieModel);

    if (result) {
      addButtonView.hideAddButton();
    }
  });

  searchView.bindSearchSubmit((keyword: string) => {
    searchController(keyword);
  });
}

init();
