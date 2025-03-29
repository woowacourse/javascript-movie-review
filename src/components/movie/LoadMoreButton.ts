import Button from "../common/Button.ts";
import { MovieResponse } from "../../../types/movie";
import { loadMovies } from "../../utils/loadMovies.ts";

type LoadMoreButtonProps = {
  loadFn: (currentPage: number) => Promise<MovieResponse>;
};

const LoadMoreButton = ({ loadFn }: LoadMoreButtonProps) => {
  let currentPage = 1;

  const loadMoreButton = Button({ text: "더보기", className: ["load-more"] });
  loadMoreButton.addEventListener("click", async () => {
    currentPage++;
    const movies: MovieResponse = await loadFn(currentPage);
    loadMovies(movies);
  });

  return loadMoreButton;
};

export default LoadMoreButton;
