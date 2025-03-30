import { IMovieItem } from "../../types/movieResultType";
import createDOMElement from "../../util/createDomElement";
import BackgroundThumbnail from "./BackgroundThumbnail";
import TopRatedMoviePreview from "./TopRatedMoviePreview";

const BackgroundThumbnailContainer = (movie: IMovieItem) => {
  console.log(movie);
  return createDOMElement({
    tag: "div",
    class: "background-container",
    children: [
      BackgroundThumbnail({ title: movie.title, backdropPath: movie.backdrop_path }),
      createDOMElement({
        tag: "div",
        class: "overlay",
        "aria-hidden": "true",
      }),
      TopRatedMoviePreview({ title: movie.title, voteAverage: movie.vote_average }),
    ],
  });
};

export default BackgroundThumbnailContainer;
