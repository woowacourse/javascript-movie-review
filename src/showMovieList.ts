import { MovieInterface } from './utils/type';
import { MovieItem } from './components/MovieItem';
import PageData from './data/PageData';
import { $, $$ } from './utils';
import { SkeletonMovieItem } from './components/SkeletonMovieItem';
import { renderError } from './Validation';

export function resetMovieList() {
  const movieListElem = $('.item-list') as HTMLElement;
  movieListElem.innerHTML = '';
}

export async function showMovieList() {
  try {
    await tryShowMovieList();
  } catch (error) {
    if (error instanceof Error) renderError(String(error.message));
  }
}

async function tryShowMovieList() {
  renderSkeleton();

  const { values } = await PageData.useMovie();
  PageData.setTotalPage(values.total_pages);

  changePageHeader();
  renderMovieList(values.results);

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
  parentElem.insertAdjacentHTML(
    'beforeend',
    `${results.map((movie) => MovieItem(movie)).join('')}`
  );
  PageData.plusPage();
}

function changePageHeader() {
  const pageHeaderElem = $('.page-header') as HTMLElement;

  let text = '지금 인기 있는 영화';
  if (PageData.getPageStatus() !== 'popular') text = `"${PageData.getRecentKeyword()}" 검색 결과`;

  pageHeaderElem.innerText = text;
}
