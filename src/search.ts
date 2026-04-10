import { MovieListResponse } from "./type";
import { fetchSearchMoviesByPageRange } from "./api";
import { getPage, getQuery, setQuery } from "./url";
import { renderListTitle, renderMoviePage, renderTopRatedMovie, updateEmptyListAlert } from "./render";

addEventListener("load", async () => {
  let prevResponseList: MovieListResponse[] = [];

  async function renderSearchMoviePage(page: number, query: string) {
    await renderMoviePage({
      page,
      prevResponseList,
      fetchFn: (startPage, p) => fetchSearchMoviesByPageRange(startPage, p, query),
      beforeFetch: () => {
        setQuery(query);
        renderListTitle(query);
      },
      afterRender: updateEmptyListAlert,
      showMoreCallback: () => renderSearchMoviePage(getPage() + 1, getQuery()),
    });
  }

  const searchInput = document.querySelector<HTMLInputElement>(".search-input");
  if (searchInput) searchInput.value = getQuery();

  await renderSearchMoviePage(getPage(), getQuery());

  if (prevResponseList.length && prevResponseList[0].results.length) {
    renderTopRatedMovie(prevResponseList[0].results[0]);
  }
});
