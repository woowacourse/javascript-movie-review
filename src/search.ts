import renderMovieItemsToList from "./render/renderMovieItemsToList";
import removeSkeletonItems from "./render/removeSkeletonItems";
import renderSearchInput from "./render/renderSearchInput";
import renderSearchListrEmptyAlert from "./render/renderSearchListrEmptyAlert";
import renderSearchListTitle from "./render/renderSearchListTitle";
import renderShowMoreButton from "./render/renderShowMoreButton";
import renderSkeletonItems from "./render/renderSkeletonItemsToList";
import renderTopRatedMovie from "./render/renderTopRatedMovie";
import { MovieListResponse, Movie } from "./type";
import { fetchMoviesByPageRange, getPage, getQuery, setPage, setQuery } from "./utils";
import { handleError } from "./error";

addEventListener("load", async () => {
  let prevResponseList: MovieListResponse[] = [];

  try {
    async function renderSearchMoviePage(page: number, query: string) {
      renderSearchListTitle(query);
      renderSkeletonItems(20);

      const responseList = await fetchMoviesByPageRange(
        "/search/movie",
        prevResponseList.length,
        page,
        query
      );

      setPage(page);
      setQuery(query);

      removeSkeletonItems();

      prevResponseList.push(...responseList);

      const movieList = responseList.reduce((arr: Movie[], response) => {
        return [...arr, ...response.results];
      }, []);

      renderMovieItemsToList(movieList);
      renderSearchListrEmptyAlert();

      renderShowMoreButton(prevResponseList, page, async () => {
        try {
          await renderSearchMoviePage(getPage() + 1, getQuery());
        } catch (error) {
          handleError(error);
        } finally {
          removeSkeletonItems();
        }
      })
    }

    renderSearchInput(getQuery());

    await renderSearchMoviePage(getPage(), getQuery());

    if (prevResponseList.length && prevResponseList[0].results.length) {
      renderTopRatedMovie(prevResponseList[0].results[0])
    }
  } catch (error) {
    handleError(error);
  } finally {
    removeSkeletonItems();
  }
});
