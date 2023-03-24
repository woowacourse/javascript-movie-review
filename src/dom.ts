import type { Movie } from './types/domain';
import { $ } from './utils/domUtils';

export const hide = (selectors: string) => $(selectors)?.classList.add('hide');

export const show = (selectors: string) => $(selectors)?.classList.remove('hide');

export const renderMovieListItem = (movies: Movie[]) => {
  $('.item-list')?.insertAdjacentHTML(
    'beforeend',
    movies
      .map(
        ({ id, title, posterPath, voteAverage }) => /* html */ `
          <movie-list-item 
            id="${id}"
            title="${title}" 
            poster-path="${posterPath}" 
            vote-average="${voteAverage}"
          ></movie-list-item>
        `
      )
      .join('')
  );
};

export const renderMoviePage = (title: string) => {
  const $page = $('#page');
  if ($page) $page.innerHTML = /* html */ `<movie-page title='${title}'></movie-page>`;
};

export const renderErrorPage = (statusCode: number) => {
  const $page = $('#page');
  if ($page) $page.innerHTML = /* html */ `<error-page status-code="${statusCode}"></error-page>`;
};

export const resetSearchBox = () => {
  const $searchBox = $('.search-box');
  if ($searchBox instanceof HTMLFormElement) $searchBox.reset();
};

export const renderMovieDetailBox = (movie: Movie, myVote: number) => {
  const $movieDetail = $('movie-detail');
  if (!$movieDetail) return;

  const { id, title, posterPath, voteAverage, genreString, overview } = movie;
  $movieDetail.outerHTML = /* html */ `
    <movie-detail
      id="${id}"
      title="${title}"
      poster-path="${posterPath}"
      vote-average="${voteAverage}"
      genreString="${genreString}"
      overview="${overview}"
      my-vote="${myVote}"
    ></movie-detail>
  `;
};

export const renderMyVoteArea = (id: string, myVote: string) => {
  const $voteArea = $('.vote-area');
  if (!$voteArea) return;

  $voteArea.outerHTML = /* html */ `<vote-area id="${id}" my-vote="${myVote}"></vote-area>`;
};
