import { MovieGenre } from "../../types/movieResultType";
import createDOMElement from "../../util/createDomElement";
import DetailModalDescriptionTitle from "./DetailModalDescriptionTitle";
import DetailModalMyStar from "./DetailModalMyStar";

interface DetailModalDescriptionProps {
  title: string;
  releaseDate: string;
  genres: MovieGenre[];
  voteAverage: number;
  starScore: number;
  overview: string;
}

const DetailModalDescription = ({
  title,
  releaseDate,
  genres,
  voteAverage,
  starScore,
  overview,
}: DetailModalDescriptionProps) => {
  return createDOMElement({
    tag: "div",
    class: "modal-description",
    children: [
      DetailModalDescriptionTitle({ title, releaseDate, genres, voteAverage }),
      createDOMElement({
        tag: "hr",
      }),
      DetailModalMyStar({ starScore }),
      createDOMElement({
        tag: "hr",
      }),
      createDOMElement({
        tag: "p",
        class: "detail",
        textContent: overview ?? "",
      }),
    ],
  });
};

export default DetailModalDescription;
