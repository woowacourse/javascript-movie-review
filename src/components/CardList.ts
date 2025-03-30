import CardItem from "./CardItem.ts";
import { createElement } from "../utils/dom.ts";

type CardListProps = {
  items?: {
    title: string;
    rating: number;
    imageSrc: string | null;
    description?: string;
  }[];
};

const CardList = ({ items = [] }: CardListProps) => {
  const movieContainer = createElement("section", {
    class: ["movie-container"],
  });

  if (items.length !== 0) {
    const ul = createElement("ul", {
      class: ["thumbnail-list"],
    });

    const fragment = document.createDocumentFragment();

    const cardItems = items.map((item) =>
      CardItem({
        title: item.title,
        rating: item.rating,
        imageSrc: item.imageSrc,
        description: item.description,
      })
    );

    fragment.append(...cardItems);
    ul.appendChild(fragment);
    movieContainer.appendChild(ul);
  }

  return movieContainer;
};

export default CardList;
