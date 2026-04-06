import { handleHome } from "./controller/handleHome";
import { handleLoadMore } from "./controller/handleLoadMore";
import { handleSearch } from "./controller/handleSearch";
import { searchView } from "./view/searchView";
import { addButtonView } from "./view/addButtonView";

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
}

init();
