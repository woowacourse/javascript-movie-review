import renderMovieItemsToList from "./render/renderMovieItemsToList";
import removeSkeletonItems from "./render/removeSkeletonItems";
import renderShowMoreButton from "./render/renderShowMoreButton";
import renderSkeletonItemsToList from "./render/renderSkeletonItemsToList";
import renderTopRatedMovie from "./render/renderTopRatedMovie";
import { MovieListResponse, Movie } from "./type";
import { fetchMoviesByPageRange, getPage, setPage } from "./utils";
import { handleError } from "./error";

addEventListener("load", async () => {
  let prevResponseList: MovieListResponse[] = [];

  try {
    async function renderPopularMoviePage(initPage: number) {
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

      renderShowMoreButton(prevResponseList, initPage, async () => {
        try {
          await renderPopularMoviePage(getPage() + 1);
        } catch (error) {
          handleError(error);
        } finally {
          removeSkeletonItems();
        }
      })
    }

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
