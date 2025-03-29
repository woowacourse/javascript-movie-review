import { createElementWithAttributes } from "../utils/createElementWithAttributes";
import skeletonContainer from "../skeleton/skeletonContainer";
import movieList from "./movieList";
import movieItem from "./movieItem";
import { MovieData } from "./types";
import { handleError } from "../error/handleError";

type LoadMoreCallback = (pageNumber: number) => Promise<MovieData>;

const MAX_PAGES = 500;

const movieContainer = (
  movieListTitle: string,
  movieData: MovieData,
  loadMoreCallback: LoadMoreCallback
) => {
  const $movieContainer = createElementWithAttributes({
    tag: "section",
    className: "movie-container",
    children: [
      {
        tag: "h2",
        textContent: movieListTitle,
      },
    ],
  });

  const { results, total_pages, total_results } = movieData;

  if (total_results === 0) {
    const $noSearchContainer = createElementWithAttributes({
      tag: "div",
      className: "no_search_container",
      children: [
        {
          tag: "img",
          className: "no_search_result_img",
          attributes: {
            src: "./images/no_search_result.png",
            alt: "검색 결과가 없습니다.",
          },
        },
        {
          tag: "h3",
          textContent: "검색 결과가 없습니다.",
          className: "no_search_result_text",
        },
      ],
    });
    $movieContainer.append($noSearchContainer);
    return $movieContainer;
  }

  const $movieList = movieList(results);
  $movieContainer.append($movieList);

  const $observerTarget = createElementWithAttributes({
    tag: "div",
    className: "observer-target",
    attributes: {
      style: "height: 10px; width: 100%;",
    },
  });
  $movieContainer.append($observerTarget);

  let pageNumber = 1;
  let isLoading = false;
  let hasMoreContent = pageNumber < total_pages && pageNumber < MAX_PAGES;

  const observer = new IntersectionObserver(
    async (entries) => {
      const entry = entries[0];

      if (entry.isIntersecting && !isLoading && hasMoreContent) {
        isLoading = true;
        pageNumber += 1;

        const $skeleton = skeletonContainer(20);
        $movieContainer.insertBefore($skeleton, $observerTarget);

        try {
          const { results: newResults } = await loadMoreCallback(pageNumber);

          newResults.forEach((movie) => {
            const $movieItem = movieItem(movie);
            $movieList.append($movieItem);
          });

          hasMoreContent = pageNumber < total_pages && pageNumber < MAX_PAGES;

          if (!hasMoreContent) {
            observer.disconnect();
          }
        } catch (error) {
          handleError(error);
        } finally {
          $skeleton.remove();
          isLoading = false;
        }
      }
    },
    {
      root: null,
      rootMargin: "100px",
      threshold: 0.1,
    }
  );

  observer.observe($observerTarget);

  return $movieContainer;
};

export default movieContainer;
