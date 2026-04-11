import renderMovieItemsToList from "./render/renderMovieItemsToList";
import removeSkeletonItems from "./render/removeSkeletonItems";
import bindInfiniteScrollObserver from "./observer/bindInfiniteScrollObserver";
import renderSkeletonItemsToList from "./render/renderSkeletonItemsToList";
import renderTopRatedMovie from "./render/renderTopRatedMovie";
import { MovieListResponse, Movie } from "./type";
import { getPage, setPage } from "./url";
import { handleError } from "./error";
import bindClickMovieEvent from "./event/bindClickMovieEvent";
import { fetchMoviesByPageRange } from "./api";

addEventListener("load", async () => {
  let prevResponseList: MovieListResponse[] = [];

  async function renderPopularMoviePage(initPage: number) {
    bindClickMovieEvent();
    renderSkeletonItemsToList(20);

    const responseList = await fetchMoviesByPageRange(
      "/movie/popular",
      prevResponseList.length,
      initPage,
    );

    setPage(initPage);

    removeSkeletonItems();

    prevResponseList.push(...responseList);

    const movieList = responseList.reduce((arr: Movie[], response) => {
      return [...arr, ...response.results];
    }, []);

    renderMovieItemsToList(movieList);

    const hasNextPage = prevResponseList.length > 0 && prevResponseList[prevResponseList.length - 1].total_pages > initPage;

    bindInfiniteScrollObserver(hasNextPage, async () => {
      try {
        await renderPopularMoviePage(getPage() + 1);
      } catch (error) {
        handleError(error);
      } finally {
        removeSkeletonItems();
      }
    })
  }

  try {
    await renderPopularMoviePage(getPage());

    if (prevResponseList.length && prevResponseList[0].results.length) {
      renderTopRatedMovie(prevResponseList[0].results[0])
    }
  } catch (error) {
    handleError(error);
  } finally {
    removeSkeletonItems();
  }
});
