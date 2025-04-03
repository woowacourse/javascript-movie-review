import { createElement } from "../utils/dom.ts";
import { mappedImage } from "../utils/mappedImage.ts";

type CardItemProps = {
  id: number;
  title: string;
  rating?: number;
  imageSrc: string | null;
  description?: string;
  onClick: (id: number) => void;
};

const CardItem = ({ id, title, rating, imageSrc, onClick }: CardItemProps) => {
  const mappedImg = imageSrc ? mappedImage(imageSrc) : '';

  const $cardItem = createElement("li", {
    innerHTML: `
    <div class="item">
      <img class="thumbnail" src="${mappedImg}" alt="${title}" />
      <div class="item-desc">
        <p class="rate">
          <img src="images/star_empty.png" class="star" /><span>${rating}</span>
        </p>
        <strong>${title}</strong>
      </div>
    </div>
  `,
  });

  $cardItem.addEventListener("click", () => {
    onClick(id);
  });

  return $cardItem;
};

export default CardItem;
