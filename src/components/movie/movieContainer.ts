import { createElementWithAttributes } from "../utils/createElementWithAttributes";
import movieList from "./movieList";
import { Movie } from "./types";

type LoadMoreCallback = (pageNumber: number) => Promise<Movie[]>;

const movieContainer = (
  movieListTitle: string,
  movies: Movie[],
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

  const $movieList = movieList(movies);

  const $seeMoreButton = createElementWithAttributes({
    tag: "button",
    textContent: "더보기",
    className: "see-more",
  });

  let pageNumber = 1;
  $seeMoreButton.addEventListener("click", async () => {
    pageNumber += 1;
    const results = await loadMoreCallback(pageNumber);
    const $newMovieList = movieList(results);
    $movieList.append(...$newMovieList.children);
  });

  $movieContainer.append($movieList, $seeMoreButton);

  return $movieContainer;
};

export default movieContainer;
