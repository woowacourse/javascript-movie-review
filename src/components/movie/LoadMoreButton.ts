import { Response } from "../../../types/response";
import { $ } from "../../utils/dom.ts";
import Button from "../common/Button.ts";
import hideSkeleton from "../utils/hideSkeleton.ts";
import showSkeleton from "../utils/showSkeleton.ts";
import MovieList from "./MovieList.ts";
import NoSearchResults from "./NoSearchResults.ts";

type Props = {
  loadFn: (currentPage: number) => Promise<Response>;
};

const LoadMoreButton = ({ loadFn }: Props) => {
  let currentPage = 1;

  const loadMoreButton = Button({
    text: "더보기",
    className: ["load-more"],
    onClick: async () => {
      showSkeleton();

      const movies = await loadFn(currentPage);

      if (movies.status === "fail") {
        $("#wrap").appendChild(
          NoSearchResults("영화 목록을 가져오지 못했습니다.")
        );
      }

      if (movies.status === "success") {
        currentPage++;

        MovieList(movies.data);
      }

      hideSkeleton();
    },
  });

  return loadMoreButton;
};

export default LoadMoreButton;
