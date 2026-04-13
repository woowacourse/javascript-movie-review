import star_empty from '../../templates/images/star_empty.png';
import star_filled from '../../templates/images/star_filled.png';

import { getElement } from './getElementView';

export interface Movie {
    id: number;
    backdrop_path: string;
    poster_path: string;
    title: string;
    vote_average: number;
    overview: string;
    genres: { id: number; name: string }[];
    release_date: string;
}

export const addMovieList = (movieDisplay: HTMLUListElement, movieList: Movie[]) => {
    movieList.forEach((movie: Movie) => {
        const li = document.createElement('li');
        li.dataset.id = String(movie.id);

        li.innerHTML = /*html*/ `
    <div class="item" >
      <img
        class="thumbnail"
        src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
        alt=${movie.title}
      />
      <div class="item-desc">
        <p class="rate">
          <img class="star" src="${star_empty}" />
          <span class="vote-average">${(movie.vote_average ?? 0).toFixed(1)}</span>
        </p>
        <strong id="title">${movie.title}</strong>
      </div>
    </div>`;

        movieDisplay.appendChild(li);
    });
};

export const addMovieSkeletonUIList = (movieDisplay: HTMLUListElement, count: number = 20) => {
    Array.from({ length: count }, () => {
        const li = document.createElement('li');
        li.className = 'skeleton-li';

        li.innerHTML = /*html*/ `
    <div class="skeleton-item">
      <div class="square"></div>
      <div class="first-line"></div>
        <div class="second-line"></div>
    </div>`;

        movieDisplay.appendChild(li);
    });
};

export const removeMovieSkeletonUIList = (movieDisplay: HTMLUListElement) => {
    movieDisplay.querySelectorAll('.skeleton-li').forEach((it) => it.remove());
};

export const showBackgroundMovieInfo = (movie: Movie) => {
    const background = getElement('.background-container');
    background.innerHTML = /*html*/ `
          <div class="overlay" aria-hidden="true">
           <img src="https://image.tmdb.org/t/p/original${movie.backdrop_path}" alt="영화 이미지" />
          </div>
          <div class="top-rated-container">
            <div class="top-rated-movie">
              <div class="rate">
                <img src="${star_empty}" class="star" />
                <span class="rate-value">${(movie.vote_average ?? 0).toFixed(1)}</span>
              </div>
              <div class="title">${movie.title}</div>
            </div>
          </div>
  `;
};

export const updateMyStarRate = (value: string) => {
    const emptyStars = document.querySelectorAll<HTMLImageElement>('.star-icon');
    emptyStars.forEach((star) => {
        if (Number(star.dataset.value) <= Number(value)) {
            star.src = star_filled;
        } else {
            star.src = star_empty;
        }
    });
    const rateText: Record<number, string> = {
        2: '최악이에요',
        4: '별로예요',
        6: '보통이에요',
        8: '재미있어요',
        10: '명작이에요',
    };

    const text = rateText[Number(value)];
    getElement('.my-rate-text').textContent = text ? `${text} (${value}/10)` : '';
};
