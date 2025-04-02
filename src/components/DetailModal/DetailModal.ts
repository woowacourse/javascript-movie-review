import { MovieItemType, storedDetailMovieItemType } from "../../types/movieResultType";
import createDOMElement from "../../util/createDomElement";
import ModalImageComponent from "./ModalImageComponent";
import ModalDescriptionComponent from "./ModalDescriptionComponent";
import CloseButton from "./CloseButton";

const DetailModal = (movieItem: MovieItemType | storedDetailMovieItemType) => {
  return createDOMElement({
    tag: "dialog",
    className: "detail-modal-container",
    children: [
      createDOMElement({
        tag: "div",
        className: "modal",
        children: [
          CloseButton(),
          createDOMElement({
            tag: "div",
            className: "modal-container",
            id: movieItem.id,
            children: [
              // Left Image
              ModalImageComponent(movieItem.poster_path, movieItem.title),
              // Right Description
              ModalDescriptionComponent(movieItem),
            ],
          }),
        ],
      }),
    ],
  });
};

export default DetailModal;
