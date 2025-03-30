import CardItem from "./CardItem.ts";
import Modal from "./Modal.ts";
import { createElement } from "../utils/dom.ts";

type CardListProps = {
  items?: {
    id: number;
    title: string;
    rating: number;
    imageSrc: string | null;
    description?: string;
  }[];
  el: Element;
};

const CardList = ({ items = [], el }: CardListProps) => {
  const render = () => {
    const $movieContainer = createElement("section", {
      class: ["movie-container"],
    });

    const $ul = createElement("ul", {
      class: ["thumbnail-list"],
    });

    const $fragment = document.createDocumentFragment();

    if (items.length !== 0) {
      const cardItems = items.map((item) =>
        CardItem({
          id: item.id,
          title: item.title,
          rating: item.rating,
          imageSrc: item.imageSrc,
          description: item.description,
          onShowDetail: () => handleShowDetail(item.id),
        })
      );

      $fragment.append(...cardItems);
      $ul.appendChild($fragment);
      $movieContainer.appendChild($ul);

      el.appendChild($movieContainer);
    }
  };

  const handleShowDetail = (id: number) => {
    const targetItem = items.find((item) =>
      item.id === id
    );
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
