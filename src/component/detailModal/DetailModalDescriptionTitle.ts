import { MovieGenre } from "../../types/movieResultType";
import createDOMElement from "../../util/createDomElement";

interface DetailModalDescriptionTitleProps {
  title: string;
  releaseDate: string;
  genres: MovieGenre[];
  voteAverage: number;
}

const DetailModalDescriptionTitle = ({ title, releaseDate, genres, voteAverage }: DetailModalDescriptionTitleProps) => {
  return createDOMElement({
    tag: "div",
    class: "modal-description-title",
    children: [
      createDOMElement({
        tag: "h2",
        textContent: title,
      }),
      createDOMElement({
        tag: "p",
        textContent: `${releaseDate.split("-")[0]} · ${genres.map((genre) => genre.name).join(", ")}`,
      }),
      createDOMElement({
        tag: "p",
        class: "modal-vote-average",
        children: [
          createDOMElement({
            tag: "img",
            src: "./images/star_filled.png",
            class: "star",
          }),
          createDOMElement({
            tag: "span",
            textContent: voteAverage,
          }),
        ],
      }),
    ],
  });
};

export default DetailModalDescriptionTitle;
