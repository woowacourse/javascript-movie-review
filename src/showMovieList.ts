import { MovieInterface } from './data/api';
import { MovieItem } from './components/MovieItem';
import PageData from './data/PageData';
import { $, $$ } from './utils';
import { SkeletonMovieItem } from './components/SkeletonMovieItem';
import { Validation, renderError } from './Validation';

type pageStatusType = 'popular' | 'search';
type callPlaceType = 'popular' | 'search' | 'more';
type keywordType = string | null;

export async function showMovieList(callPlace: callPlaceType, keyword: keywordType) {
  try {
    await tryShowMovieList(callPlace, keyword);
  } catch (error) {
    if (error instanceof Error) renderError(String(error.message));
  }
}

async function tryShowMovieList(callPlace: callPlaceType, keyword: keywordType) {
  const PageStatus = PageData.getPageStatus();
  renderSkeleton();

  if (callPlace === 'popular') {
    await PageData.usePopularMovie().then(({ values }) => renderMovieList(values.results));
    changePageHeader('popular', null);
    return;
  }
  if (callPlace === 'search' && keyword !== null) {
    Validation.inputText(keyword);
    changePageHeader('search', keyword);
    await PageData.useSearchedMovie(keyword).then(({ values }) => renderMovieList(values.results));
  }
  if (callPlace === 'more' && PageStatus === 'popular') {
    await PageData.usePopularMovie().then(({ values }) => renderAddMovieList(values.results));
  }
  if (callPlace === 'more' && PageStatus === 'search') {
    await PageData.useSearchedMovie(PageData.getRecentKeyword()).then(({ values }) => {
      renderAddMovieList(values.results);
    });
  }

  deleteSkeleton();
}

export function renderSkeleton() {
  const parentElem = $('.item-list') as HTMLElement;
  parentElem.insertAdjacentHTML('beforeend', SkeletonMovieItem());
}

export function deleteSkeleton() {
  const skeletonList = $$('.skeleton-item');
  skeletonList?.forEach((item) => item.remove());
}

export async function renderMovieList(results: MovieInterface[]) {
  const parentElem = $('.item-list') as HTMLElement;

  parentElem.innerHTML = `
    ${results.map((movie) => MovieItem(movie)).join('')}
    `;
}

export async function renderAddMovieList(results: MovieInterface[]) {
  const parentElem = $('.item-list') as HTMLElement;

  parentElem.insertAdjacentHTML(
    'beforeend',
    `${results.map((movie) => MovieItem(movie)).join('')}`
  );
}

function changePageHeader(pageStatus: pageStatusType, keyword: keywordType) {
  const pageHeaderElem = $('.page-header') as HTMLElement;

  let text = '지금 인기 있는 영화';
  if (pageStatus !== 'popular') text = `"${keyword}" 검색 결과`;

  pageHeaderElem.innerText = text;
}
