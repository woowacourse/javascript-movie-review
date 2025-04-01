import { showErrorPage } from "../../../../shared/ui/renderers/showErrorPage";
import { setParams } from "../../../../shared/utils/setParams";
import { pageManager } from "../../../../shared/domain/pageManager";
import { updateSearchPageUI } from "../renderers/updateSearchPageUI";
import { getSearchedPost } from "../../api/getSearchedPost";
import { initInfiniteScroll } from "../../../../shared/observer/infiniteScroll";

export const searchFormSubmitHandler = async (e: Event) => {
  try {
    pageManager.resetPage();
    const currentPage = pageManager.currentPage;
    const formData = new FormData(e.target as HTMLFormElement);
    const searchQuery = formData.get("search-input") as string;
    if (!searchQuery) return;

    setParams(searchQuery, "query");

    const searchedMovies = await getSearchedPost(searchQuery, currentPage);
    pageManager.setTotalPages(searchedMovies.total_pages);

    updateSearchPageUI(searchedMovies.results, searchQuery, {
      pageNum: currentPage,
      totalPages: pageManager.totalPages,
    });
    initInfiniteScroll();
  } catch (error) {
    showErrorPage();
  }
};
