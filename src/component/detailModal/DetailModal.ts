import { IMovieDetail } from "../../types/movieResultType";
import createDOMElement from "../../util/createDomElement";
import CloseButton from "./CloseButton";
import DetailModalDescription from "./DetailModalDescription";
import DetailModalImage from "./DetailModalImage";

const DetailModal = (movieDetail: IMovieDetail) => {
  return createDOMElement({
    tag: "div",
    class: "modal-background active",
    id: "modalBackground",
    children: createDOMElement({
      tag: "div",
      class: "modal",
      children: [
        CloseButton(),
        createDOMElement({
          tag: "div",
          class: "modal-container",
          children: [
            DetailModalImage({ posterPath: movieDetail.poster_path }),
            DetailModalDescription({
              title: movieDetail.title,
              releaseDate: movieDetail.release_date,
              genres: movieDetail.genres,
              voteAverage: movieDetail.vote_average,
              starScore: movieDetail.starScore,
              overview: movieDetail.overview,
            }),
          ],
        }),
      ],
    }),
  });
};

export default DetailModal;
