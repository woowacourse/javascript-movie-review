import { Movie } from "../../types/movie";

const MovieItem = ({ rate, title, imgSrc }: Movie) => {
  const movieItem = document.createElement("li");

  movieItem.innerHTML = `
                <div class="item">
                  <img
                    class="thumbnail"
                    src=${imgSrc}
                    alt=${title}
                  />
                  <div class="item-desc">
                    <p class="rate">
                      <img src="images/star_empty.png" class="star" /><span
                        >${rate}</span
                      >
                    </p>
                    <strong>${title}</strong>
                  </div>
                </div>
              `;

  return movieItem;
};

export default MovieItem;
