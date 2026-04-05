import { MovieListResponse, Movie } from "./type";
import { fetchPopularMoviesByPageRange, getPage, handleError, removeSkeletonItem, renderMovies, renderShowMoreButton, renderSkeletonItems, renderTopRatedMovie, setPage } from "./utils";

addEventListener("load", async () => {
  let prevResponseList: MovieListResponse[] = [];

  try {
    async function renderPopularMoviePage(page: number) {
      setPage(page);

      renderSkeletonItems(20);

      const responseList = await fetchPopularMoviesByPageRange(
        prevResponseList.length,
        page,
      );

      removeSkeletonItem();

      prevResponseList.push(...responseList);

      const movieList = responseList.reduce((arr: Movie[], response) => {
        return [...arr, ...response.results];
      }, []);

      renderMovies(movieList);

      renderShowMoreButton(prevResponseList, page, async () => {
        try {
          await renderPopularMoviePage(getPage() + 1);
        } catch (error) {
          handleError(error);
        }
      })
    }

    await renderPopularMoviePage(getPage());

    if (prevResponseList.length && prevResponseList[0].results.length) {
      renderTopRatedMovie(prevResponseList[0].results[0])
    }
  } catch (error) {
    handleError(error);
  }
});
