import star_filled from '../assets/star_filled.png';

import { IMovie } from '../api/api';
import { makeImagePath } from '../utils/makeImagePath';
import { fixDecimal } from '../utils/fixDecimal';

<<<<<<< HEAD
export function MovieItem({ id, poster_path, title, vote_average }: IMovie) {
  return `
  <li>
        <div class="item-card">
            <img
            class="item-thumbnail"
            src=${makeImagePath(poster_path)}
            loading="lazy"
            alt=${title}
            id=${id}
            />
            <p class="item-title" id=${id}>${title}</p>
            <p class="item-score"><img src="${star_filled}" alt="별점" />${fixDecimal(
    vote_average
  )}</p>
        </div>
=======
export function MovieItem({ poster_path, title, vote_average }: IMovie) {
  return `
  <li>
        <a href="#">
            <div class="item-card">
                <img
                class="item-thumbnail"
                src=${makeImagePath(poster_path)}
                loading="lazy"
                alt=${title}
                />
                <p class="item-title">${title}</p>
                <p class="item-score"><img src="${star_filled}" alt="별점" />${fixDecimal(
    vote_average
  )}</p>
            </div>
        </a>
>>>>>>> fa33fb01648a0dceb841473ad808bd0d9b6b0790
    </li>`;
}
