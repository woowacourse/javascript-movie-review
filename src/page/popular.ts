import { getPage } from "../url";
import { handleError } from "../error";
import renderMovieList from "../render/renderMovieList";
import { removeSkeletonItems } from "../render/renderSkeletonItems";
import renderTopRatedMovie from "../render/renderTopRatedMovie";

addEventListener("load", async () => {
  try {
    await renderMovieList({
      endpoint: "/movie/popular",
      page: getPage(),
      direction: "append",
      afterRender: ({ page, response, }) => {
        if (page === 1) renderTopRatedMovie(response.results[0]);
      }
    });
  } catch (error) {
    await handleError(error);
    removeSkeletonItems();
  }
});
