import CardItem from "./CardItem.ts";

type CardListProps = {
  items?: {
    title: string;
    voteAverage: number;
    posterPath: string | null;
    description?: string;
  }[];
};

const CardList = ({ items = [] }: CardListProps) => {
  const movieContainer = document.createElement("section");
  movieContainer.classList.add("movie-container");

  if (items === null) {
    return;
  }

  if (items.length !== 0) {
    const ul = document.createElement("ul");
    ul.classList.add("thumbnail-list");

    const fragment = document.createDocumentFragment();

    const cardItems = items.map((item) =>
      CardItem({
        title: item.title,
        rating: item.voteAverage,
        imageSrc: item.posterPath,
      })
    );

    fragment.append(...cardItems);
    ul.appendChild(fragment);
    movieContainer.appendChild(ul);
  }

  return movieContainer;
};

export default CardList;
