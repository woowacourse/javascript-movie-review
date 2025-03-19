import { IMovieItem } from "../types/movieResultType";
import createDOMElement from "../util/createDomElement";
import MovieItem from "./MovieItem";

const MovieListSection = (title: string, movieList: IMovieItem[]) => {
  return createDOMElement({
    tag: "section",
    children: [
      createDOMElement({
        tag: "h2",
        textContent: title,
      }),
      createDOMElement({
        tag: "ul",
        class: "thumbnail-list",
        children: movieList.map((movie) => MovieItem(movie)),
      }),
      createDOMElement({
        tag: "div",
        class: "see-more",
        textContent: "더 보기",
      }),
    ],
  });
};

export default MovieListSection;
