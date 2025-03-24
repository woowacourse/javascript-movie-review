import { MovieResponse } from "../../../types/movie";
import Button from "../common/Button.ts";
import MovieList from "./MovieList.ts";

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
      MovieList(movies);
    },
  });

  return loadMoreButton;
};

export default LoadMoreButton;
