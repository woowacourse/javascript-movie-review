import type { Movie } from '../../types/Movie.ts';
import type { MovieBrowser } from '../domain/MovieBrowser.ts';
import {
  createMovieItemHTML,
  createBannerHTML,
  createNoResultHTML,
} from '../createHtml.ts';

const bannerBaseURL = 'https://image.tmdb.org/t/p/w1920_and_h800_multi_faces';

const attachSkeletonEvents = (li: HTMLLIElement) => {
  const img = li.querySelector<HTMLImageElement>('.thumbnail')!;
  const removeSkeleton = () => {
    li.querySelector('.item')?.classList.remove('skeleton');
    li.querySelector('.skeleton-poster')?.remove();
    li.querySelector('.skeleton-rate')?.remove();
    li.querySelector('.skeleton-title')?.remove();
  };

  img.addEventListener('load', removeSkeleton, { once: true });
  img.addEventListener(
    'error',
    () => {
      img.src = './images/no_image.png';
      removeSkeleton();
    },
    { once: true },
  );
};

const appendMovie = (movie: Movie) => {
  const li = createMovieItemHTML(movie);
  attachSkeletonEvents(li);
  document.querySelector('.thumbnail-list')?.appendChild(li);
};

const renderMovieList = (movies: Movie[]) => {
  movies.forEach(appendMovie);
};

const renderBanner = (movie: Movie) => {
  const bg = document.querySelector<HTMLElement>('.background-container');
  if (bg) bg.style.backgroundImage = `url("${bannerBaseURL + movie.backdrop_path}")`;
  document.querySelector('.top-rated-movie')?.appendChild(createBannerHTML(movie));
};

const renderNoResult = () => {
  document.querySelector('.thumbnail-list')?.appendChild(createNoResultHTML());
};

const clearMovieList = () => {
  const thumbnailList = document.querySelector('.thumbnail-list');
  if (thumbnailList) thumbnailList.replaceChildren();
};

const showBanner = () => {
  const bg = document.querySelector<HTMLElement>('.background-container');
  if (bg) bg.hidden = false;
};

const hideBanner = () => {
  const bg = document.querySelector<HTMLElement>('.background-container');
  if (bg) bg.hidden = true;
};

// const showLoadButton = () => {
//   const loadButton = document.querySelector<HTMLButtonElement>('#load-movie-button');
//   if (loadButton) loadButton.style.display = '';
// };

// const hideLoadButton = () => {
//   const loadButton = document.querySelector<HTMLButtonElement>('#load-movie-button');
//   if (loadButton) loadButton.style.display = 'none';
// };

// export const startLoading = () => {
//   const loadButton = document.querySelector<HTMLButtonElement>('#load-movie-button');
//   if (loadButton) loadButton.disabled = true;
// };

// export const stopLoading = () => {
//   const loadButton = document.querySelector<HTMLButtonElement>('#load-movie-button');
//   if (loadButton) loadButton.disabled = false;
// };

const setSectionTitle = (title: string) => {
  const sectionTitle = document.querySelector<HTMLElement>('#section-title');
  if (!sectionTitle) return;
  sectionTitle.textContent = title;
};

export const render = (state: MovieBrowser, movies: Movie[]) => {
  if (state.isNewSession) {
    clearMovieList();
    if (state.showsBanner) {
      showBanner();
      renderBanner(movies[0]);
    } else {
      hideBanner();
    }
  }

  if (movies.length === 0) {
    renderNoResult();
  } else {
    renderMovieList(movies);
  }

  // setSectionTitle(state.sectionTitle);
  // if (state.canLoadMore) 
    // showLoadButton(); else hideLoadButton();
};

export const showError = (error: unknown) => {
  alert(error instanceof Error ? error.message : '오류가 발생했습니다.');
};
