import star_filled from '../assets/star_filled.png';

import { IMovie } from '../data/api';
import { makeImagePath } from '../utils/makeImagePath';

export function MovieItem({ poster_path, title, vote_average }: IMovie) {
  return `
  <li>
        <a href="#">
            <div class="item-card">
                <img
                class="item-thumbnail movie-poster-background"
                src=${makeImagePath(poster_path)}
                loading="lazy"
                alt=${title}
                />
                <p class="item-title">${title}</p>
                <p class="item-score"><img src="${star_filled}" alt="별점" />${vote_average}</p>
            </div>
        </a>
    </li>`;
}
