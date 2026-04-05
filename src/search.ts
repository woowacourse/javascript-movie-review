import { MovieListResponse, Movie } from "./type";
import { fetchSearchMoviesByPageRange, getPage, getQuery, handleError, removeSkeletonItem, renderListTitle, renderMovies, renderShowMoreButton, renderSkeletonItems, renderTopRatedMovie, setPage, setQuery, updateEmptyListAlert } from "./utils";

addEventListener("load", async () => {
  let prevResponseList: MovieListResponse[] = [];

  try {
    async function renderSearchMoviePage(page: number, query: string) {
      setPage(page);
      setQuery(query);

      renderListTitle(query);

      renderSkeletonItems(20);

      const responseList = await fetchSearchMoviesByPageRange(
        prevResponseList.length,
        page,
        query
      );

      removeSkeletonItem();

      prevResponseList.push(...responseList);

      const movieList = responseList.reduce((arr: Movie[], response) => {
        return [...arr, ...response.results];
      }, []);

      renderMovies(movieList);
      updateEmptyListAlert();

      renderShowMoreButton(prevResponseList, page, async () => {
        try {
          await renderSearchMoviePage(getPage() + 1, getQuery());
        } catch (error) {
          handleError(error);
        }
      })
    }

    const searchInput = document.querySelector<HTMLInputElement>(".search-input");
    if (searchInput) searchInput.value = getQuery();

    await renderSearchMoviePage(getPage(), getQuery());

    if (prevResponseList.length && prevResponseList[0].results.length) {
      renderTopRatedMovie(prevResponseList[0].results[0])
    }
  } catch (error) {
    handleError(error);
  }
});
