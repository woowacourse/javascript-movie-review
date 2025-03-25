import { getUrlParams } from "../../../shared/utils/getUrlParams";
import { updateUrl } from "../../../shared/utils/updateUrl";
import { updateSearchedMovieUI } from "./updateSearchedMovieUI";

export const searchFormSubmitHandler = async (e: Event) => {
  const $thumbnailList = document.querySelector(
    ".thumbnail-list"
  ) as HTMLElement;

  if ($thumbnailList) {
    $thumbnailList.innerHTML = "";
  }

  const formData = new FormData(e.target as HTMLFormElement);
  const searchQuery = formData.get("search-input");

  const params = getUrlParams();
  updateUrlParams(params, String(searchQuery));
  updateSearchedMovieUI($thumbnailList, String(searchQuery));
  updateUrl(params);
};

function updateUrlParams(params: URLSearchParams, searchQuery: string) {
  const page = params.get("page");

  if (!page) {
    params.append("page", "1");
    params.append("query", searchQuery);
  } else {
    params.set("page", "1");
    params.set("query", searchQuery);
  }
}
