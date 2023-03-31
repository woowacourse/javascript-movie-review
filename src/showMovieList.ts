import { MovieInterface } from './utils/type';
import { movieItem } from './components/movieItem';
import PageData from './data/pageData';
import { $, $$ } from './utils';
import { skeletonMovieItem } from './components/skeletonMovieItem';
import { renderError } from './validation';

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
  parentElem.insertAdjacentHTML('beforeend', skeletonMovieItem());
}

export function deleteSkeleton() {
  const skeletonList = $$('.skeleton-item');
  skeletonList?.forEach((item) => item.remove());
}

export async function renderMovieList(results: MovieInterface[]) {
  const parentElem = $('.item-list') as HTMLElement;
  parentElem.insertAdjacentHTML(
    'beforeend',
    `${results.map((movie) => movieItem(movie)).join('')}`
  );
  PageData.plusCurrentPage();
}

function changePageHeader() {
  const pageHeaderElem = $('.page-header') as HTMLElement;

  let text = '지금 인기 있는 영화';
  if (PageData.getPageStatus() !== 'popular') text = `"${PageData.getRecentKeyword()}" 검색 결과`;

  pageHeaderElem.innerText = text;
}
