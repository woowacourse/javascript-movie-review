import { fetchMovies } from "../api";
import { handleError } from "../error";
import bindBottomInfiniteScrollObserver from "../observer/bindBottomInfiniteScrollObserver";
import bindTopInfiniteScrollObserver from "../observer/bindTopInfiniteScrollObserver";
import { MovieListResponse } from "../type";
import renderMovieItems from "./renderMovieItems";
import renderSkeletonItems, { removeSkeletonItems } from "./renderSkeletonItems";
import restoreScrollPosition from "./restoreScrollPosition";

type PopularPageAfterRenderOptions = {
  page: number;
  response: MovieListResponse;
  direction: "append" | "prepend";
}

type SearchPageAfterRenderOptions = {
  page: number;
  params: { query: string }
  response: MovieListResponse;
  direction: "append" | "prepend";
}

type RenderPopularMovieListOptions = {
  endpoint: "/movie/popular";
  params?: undefined
  page: number;
  direction: "append" | "prepend";
  afterRender?: (options: PopularPageAfterRenderOptions) => void;
};

type RenderSearchMovieListOptions = {
  endpoint: "/search/movie";
  params: { query: string };
  page: number;
  direction: "append" | "prepend";
  afterRender?: (options: SearchPageAfterRenderOptions) => void;
};

let firstLoadedPage: number | null = null;
let lastLoadedPage: number | null = null;
let totalPages = 0;

export default async function renderMovieList(
  options: RenderPopularMovieListOptions | RenderSearchMovieListOptions
) {
  renderSkeletonItems(20, options.direction);

  const response =
    options.endpoint === "/search/movie"
      ? await fetchMovies(options.endpoint, { query: options.params.query, page: options.page })
      : await fetchMovies(options.endpoint, { page: options.page });

  if (firstLoadedPage === null || lastLoadedPage === null) {
    firstLoadedPage = options.page;
    lastLoadedPage = options.page;
  } else {
    firstLoadedPage = Math.min(firstLoadedPage, options.page);
    lastLoadedPage = Math.max(lastLoadedPage, options.page);
  }

  totalPages = response.total_pages;

  removeSkeletonItems();

  renderMovieItems(options.page, response.results, options.direction);

  options.endpoint === "/search/movie" ?
    options.afterRender?.({ page: options.page, response, direction: options.direction, params: options.params })
    : options.afterRender?.({ page: options.page, response, direction: options.direction })

  restoreScrollPosition();

  const hasPrevPage = firstLoadedPage !== null && firstLoadedPage > 1;

  bindTopInfiniteScrollObserver(hasPrevPage, async () => {
    try {
      options.endpoint === "/search/movie" ?
        await renderMovieList({ endpoint: options.endpoint, params: options.params, page: firstLoadedPage! - 1, direction: 'prepend', afterRender: options.afterRender })
        : await renderMovieList({ endpoint: options.endpoint, page: firstLoadedPage! - 1, direction: 'prepend', afterRender: options.afterRender });
    } catch (error) {
      await handleError(error);
      removeSkeletonItems();
    }
  });

  const hasNextPage = totalPages > lastLoadedPage!;

  bindBottomInfiniteScrollObserver(hasNextPage, async () => {
    try {
      options.endpoint === "/search/movie" ?
        await renderMovieList({ endpoint: options.endpoint, params: options.params, page: lastLoadedPage! + 1, direction: 'append', afterRender: options.afterRender })
        : await renderMovieList({ endpoint: options.endpoint, page: lastLoadedPage! + 1, direction: 'append', afterRender: options.afterRender });
    } catch (error) {
      await handleError(error);
      removeSkeletonItems();
    }
  })
}