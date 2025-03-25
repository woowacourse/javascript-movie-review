import { createElementWithAttributes } from "../utils/createElementWithAttributes";
import movieList from "./internal/movieList";
import { MovieData } from "../../domain/types";
import seeMoreButton from "./internal/seeMoreButton";

export type LoadMoreCallback = (pageNumber: number) => Promise<MovieData>;

interface MovieContainerProps {
  movieListTitle: string;
  movieData: MovieData;
  loadMoreCallback: LoadMoreCallback;
}

const movieContainer = ({
  movieListTitle,
  movieData: { results, page, total_pages, total_results },
  loadMoreCallback,
}: MovieContainerProps) => {
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

  const $seeMoreButton = seeMoreButton($movieList, loadMoreCallback);

  $movieContainer.append($movieList);
  if (page !== total_pages) {
    $movieContainer.append($seeMoreButton);
  }

  return $movieContainer;
};

export default movieContainer;
