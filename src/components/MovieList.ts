import { Movie } from "../main";

export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";

const MovieList = (movies: Movie[]) => {
  return /*html*/ `
    <section>
        <h2>지금 인기 있는 영화</h2>
        <ul class="thumbnail-list">
        ${movies
          .map(
            ({ poster_path, title, vote_average }) => `
            <li>
                <div class="item">
                    <img
                    class="thumbnail"
                    src="${IMAGE_BASE_URL}${poster_path}"
                    alt="${title}"
                    />
                    <div class="item-desc">
                    <p class="rate">
                        <img src="./images/star_empty.png" class="star" /><span
                        >${vote_average}</span
                        >
                    </p>
                    <strong>${title}</strong>
                    </div>
                </div>
            </li>
        `
          )
          .join("")}  
        </ul>
    </section>
    
    `;
};

export default MovieList;
