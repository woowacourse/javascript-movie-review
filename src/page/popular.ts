import { getPage } from "../url";
import { handleError } from "../error";
import { renderPopularMoviePage } from "../render/renderPopularMoviePage";
import { removeSkeletonItems } from "../render/renderSkeletonItems";

addEventListener("load", async () => {
  try {
    await renderPopularMoviePage(getPage());
  } catch (error) {
    handleError(error);
    removeSkeletonItems();
  }
});
