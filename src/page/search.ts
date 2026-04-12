import { getPage, getQuery } from "../url";
import { handleError } from "../error";
import { renderSearchMoviePage } from "../render/renderSearchMoviePage";
import { removeSkeletonItems } from "../render/renderSkeletonItems";
import renderSearchInput from "../render/renderSearchInput";
import renderSearchListTitle from "../render/renderSearchListTitle";

addEventListener("load", async () => {
  try {
    const query = getQuery();
    renderSearchInput(query);
    renderSearchListTitle(query);
    await renderSearchMoviePage(getPage(), query);
  } catch (error) {
    handleError(error);
    removeSkeletonItems();
  }
});
