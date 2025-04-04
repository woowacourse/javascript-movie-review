import MovieItem from "../movieItem/MovieItem";
import SkeletonList from "../skeletonList/SkeletonList";
import { Movie } from "../../../types/responseType/responseType";
import { renderSwitch } from "../../utils/render";

interface MovieListProps {
  movies: Movie[];
  isLoading: boolean;
  isSearchMode: boolean;
  searchQuery: string;
}

const MovieList = (props: MovieListProps) => {
  const { movies, isLoading, isSearchMode, searchQuery } = props;

  return renderSwitch([
    [
      isSearchMode && movies.length === 0 && searchQuery.trim().length > 0,
      `<div class="no-results">검색 결과가 없습니다.</div>`,
    ],
    [isLoading && movies.length === 0, SkeletonList()],
    [
      true,
      `<ul class="thumbnail-list">
        ${movies
          .map((movie) =>
            MovieItem({
              title: movie.title,
              rate: movie.vote_count,
              src: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
              id: movie.id.toString(),
            })
          )
          .join("")}
      </ul>`,
    ],
  ]);
};

export default MovieList;
