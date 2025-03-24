import { MovieResponse } from "../../../types/movie";
import { loadMovies } from "../../utils/loadMovies.ts";
import Button from "../common/Button.ts";

type Props = {
  loadFn: (currentPage: number) => Promise<MovieResponse>;
};

const LoadMoreButton = ({ loadFn }: Props) => {
  let currentPage = 1;

  const loadMoreButton = Button({
    text: "더보기",
    className: ["load-more"],
    onClick: async () => {
      currentPage++;
      const movies = await loadFn(currentPage);
      loadMovies(movies);
    },
  });

  return loadMoreButton;
};

export default LoadMoreButton;
