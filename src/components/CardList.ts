import CardItem from "./CardItem.ts";
import Modal from "./Modal.ts";
import { createElement } from "../utils/dom.ts";

type CardListProps = {
  items?: {
    id: number;
    title: string;
    rating: number;
    imageSrc: string | null;
    description: string;
    releaseDate: string
    genre?: string
  }[];
  el: Element;
  isAppend?: boolean;
};

const CardList = ({ items = [], el, isAppend = false }: CardListProps) => {
  const render = () => {
    if (items.length === 0) return;

    const $fragment = document.createDocumentFragment();

    const cardItems = items.map((item) =>
      CardItem({
        id: item.id,
        title: item.title,
        rating: item.rating,
        imageSrc: item.imageSrc,
        description: item.description,
        onClick: () => handleShowDetail(item.id),
      })
    );

    $fragment.append(...cardItems);

    if (isAppend) {
      const $existingList = el.querySelector(".thumbnail-list");
      if ($existingList) {
        $existingList.appendChild($fragment);
        return;
      }
    }

    const $movieContainer = createElement("section", {
      class: ["movie-container"],
    });

    const $ul = createElement("ul", {
      class: ["thumbnail-list"],
    });

    $ul.appendChild($fragment);
    $movieContainer.appendChild($ul);
    el.appendChild($movieContainer);
  };

  const handleShowDetail = (id: number) => {
    const targetItem = items.find((item) => item.id === id);
    if (!targetItem) return;

    const $modal = Modal({ item: targetItem });

    document.body.appendChild($modal);

    if ($modal instanceof HTMLDialogElement) {
      $modal.showModal();
    }
  };

  render();
};

export default CardList;
