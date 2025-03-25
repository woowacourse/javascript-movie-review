import CardItem from "./CardItem.ts";
import { Movie } from "../../types/movie";

type CardListProps = {
  movieItems?: Movie[];
};

const CardList = ({ movieItems = [] }: CardListProps) => {
  const movieContainer = document.createElement("section");
  movieContainer.classList.add("movie-container");

  if (movieItems === null) {
    return;
  }

  if (movieItems.length !== 0) {
    const ul = document.createElement("ul");
    ul.classList.add("thumbnail-list");

    const fragment = document.createDocumentFragment();

    const cardItems = movieItems.map((movie) =>
      CardItem({
        title: movie.title,
        rating: movie.voteAverage,
        imageSrc: movie.posterPath,
      })
    );

    fragment.append(...cardItems);
    ul.appendChild(fragment);
    movieContainer.appendChild(ul);
  }

  if (movieItems.length === 0) {
    movieContainer.innerHTML = `
      <img src="images/empty_logo.png" alt="우아한테크코스 로고" />
      <h2 class="empty-content">검색 결과가 없습니다.</h2>
  `;
  }

  return movieContainer;
};

export default CardList;
