import { MovieInfoType } from "../@types/movieType";

export const MovieItem = (movieInfo: any) => {
  const { title, posterPath, voteAverage } = movieInfo;

  return `
    <li>
      <a href="#">
        <div class="item-card">
          <img
            class="item-thumbnail"
            src="https://image.tmdb.org/t/p/original${posterPath}"
            loading="lazy"
            alt="앤트맨과 와스프: 퀀텀매니아"
          />
          <p class="item-title">${title}</p>
          <p class="item-score"><img src="./star_filled.png" alt="별점" /> ${voteAverage}</p>
        </div>
      </a>
    </li>
    `;
};
