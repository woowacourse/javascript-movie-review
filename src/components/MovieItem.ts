import star_filled from '../assets/star_filled.png';
import star_empty from '../assets/star_empty.png';
import { MovieInterface } from '../utils/type';
import { makePosterImagePath } from '../utils/makePosterImagePath';

export function MovieItem({ id, poster_path, title, vote_average }: MovieInterface) {
  return `
  <li id=${id}>
        <a href="#$">
            <div class="item-card">
                <img
                class="item-thumbnail movie-poster-background"
                src=${makePosterImagePath(poster_path)}
                loading="lazy"
                alt=${title}
                />
                <p class="item-title">${title}</p>
                <p class="item-score"><img src="${
                  vote_average === 0 ? star_empty : star_filled
                }" alt="별점" />${vote_average}</p>
            </div>
        </a>
    </li>`;
}
