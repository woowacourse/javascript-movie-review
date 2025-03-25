type CardItemProps = {
  title: string;
  rating?: number;
  imageSrc?: string | null;
  description?: string;
};

const CardItem = ({ title, rating, imageSrc }: CardItemProps) => {
  const cardItem = document.createElement("li");

  const mappedImage = imageSrc
    ? `https://image.tmdb.org/t/p/w500${imageSrc}`
    : "images/nullImage.png";

  cardItem.innerHTML = `
    <div class="item">
      <img class="thumbnail" src="${mappedImage}" alt="${title}" />
      <div class="item-desc">
        <p class="rate">
          <img src="images/star_empty.png" class="star" /><span>${rating}</span>
        </p>
        <strong>${title}</strong>
      </div>
    </div>
  `;

  return cardItem;
};

export default CardItem;
