import { Response } from "../../../types/response";
import MovieList from "../movie/MovieList";
import NoSearchResults from "../movie/NoSearchResults";
import hideSkeleton from "./hideSkeleton";
import showSkeleton from "./showSkeleton";
import { $ } from "../../utils/dom";

type Props = {
  loadFn: () => Promise<Response>;
};

const loadMoreMovies = async ({ loadFn }: Props) => {
  showSkeleton();
  const movies = await loadFn();

  if (movies.status === "fail") {
    $("#wrap").appendChild(NoSearchResults("영화 목록을 가져오지 못했습니다."));
  }

  if (movies.status === "success") {
    MovieList(movies.data);
  }

  hideSkeleton();
};

export default loadMoreMovies;
