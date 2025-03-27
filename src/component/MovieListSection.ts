import { IMovieItem } from "../types/movieResultType";
import createDOMElement from "../util/createDomElement";
import MovieItem from "./MovieItem";

interface IMovieListSectionProps {
  title: string;
  movieList: IMovieItem[];
}

const MovieListSection = ({ title, movieList }: IMovieListSectionProps) => {
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
    ],
  });
};

export default MovieListSection;
