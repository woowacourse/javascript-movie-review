import { MovieInfoType } from "../@types/movieDataType";

export const MovieItem = (movieInfo: MovieInfoType) => {
  const { title, poster_path, vote_average } = movieInfo;

  return `
<li>
      <a href="#">
        <div class="item-card">
          <img
            class="item-thumbnail skeleton "
            src="https://image.tmdb.org/t/p/w220_and_h330_face${poster_path}"
            loading="lazy"
            alt="${title}"
          />
          <p class="item-title skeleton">${title}</p>
          <p class="item-score skeleton"><img src="./star_filled.png" alt="별점" /> ${vote_average}</p>
        </div>
      </a>
</li>
    `;
};
