import { getPage, getQuery } from "../url";
import { handleError } from "../error";
import { removeSkeletonItems } from "../render/renderSkeletonItems";
import renderSearchInput from "../render/renderSearchInput";
import renderSearchListTitle from "../render/renderSearchListTitle";
import renderMovieList from "../render/renderMovieList";
import renderSearchListEmptyAlert from "../render/renderSearchListEmptyAlert";

addEventListener("load", async () => {
  try {
    await renderMovieList({
      endpoint: "/search/movie",
      params: { query: getQuery() },
      page: getPage(),
      direction: "append",
      afterRender: ({ params }) => {
        renderSearchInput(params.query);
        renderSearchListTitle(params.query);
        renderSearchListEmptyAlert();
      }
    });
  } catch (error) {
    await handleError(error);
    removeSkeletonItems();
  }
});
