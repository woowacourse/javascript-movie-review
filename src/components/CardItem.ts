import { createElement } from "../utils/dom.ts";

type CardItemProps = {
  id: number;
  title: string;
  rating?: number;
  imageSrc?: string | null;
  description?: string;
  onShowDetail: (id: number) => void;
};

const CardItem = ({ id, title, rating, imageSrc, onShowDetail }: CardItemProps) => {
  const mappedImage = imageSrc
    ? `https://image.tmdb.org/t/p/w500${imageSrc}`
    : "images/nullImage.png";

  const $cardItem = createElement("li", {
    innerHTML: `
    <div class="item">
      <img class="thumbnail" src="${mappedImage}" alt="${title}" />
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
    onShowDetail(id);
  });

  return $cardItem;
};

export default CardItem;
