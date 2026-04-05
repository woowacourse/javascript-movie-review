import { handleHome } from "./controller/handleHome";
import { handleMoreButton } from "./controller/handleMoreButton";
import { handleSearch } from "./controller/handleSearch";
import { searchView } from "./view/searchView";
import { addButtonView } from "./view/addButtonView";
import { movieModel } from "./model/movieModel";

function init() {
  addEventListener("load", () => {
    handleHome();
  });

  addButtonView.bindAddButtonClick(async () => {
    const result = await handleMoreButton.handleLoadMore(movieModel);

    if (result) {
      addButtonView.hideAddButton();
    }
  });

  searchView.bindSearchSubmit((keyword: string) => {
    handleSearch(keyword);
  });
}

init();
