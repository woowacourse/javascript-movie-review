import { MovieItemType } from "../types/movieResultType";
import createDOMElement from "../util/createDomElement";
import MovieItem from "./MovieItem";

interface IMovieListSectionProps {
  title: string;
  movieList: MovieItemType[];
  hasMore: boolean;
}

const MovieListSection = ({
  title,
  movieList,
  hasMore,
}: IMovieListSectionProps) => {
  return createDOMElement({
    tag: "section",
    children: [
      createDOMElement({
        tag: "h2",
        textContent: title,
      }),
      createDOMElement({
        tag: "ul",
        className: "thumbnail-list",
        children: movieList.map((movie) => MovieItem(movie)),
      }),
      hasMore
        ? createDOMElement({
            tag: "div",
            className: "see-more",
            textContent: "더 보기",
          })
        : null,
    ],
  });
};

export default MovieListSection;
