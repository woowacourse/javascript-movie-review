import globalStateMethod from '../globalState';
import { appendChildren, elementsReplaceWith } from '../utils/domUtil';
import { getMovieListContainer, getMovieItems } from './main/movie';
import { getSkeletonView, getMovieItemCardSkeleton } from './main/skeleton';

export async function renderNewMovies() {
  globalStateMethod.increasePage();
  const movieList = document.querySelector('.item-list') as HTMLElement;
  const skeletonItems = Array.from({ length: 20 }, () => getMovieItemCardSkeleton());
  appendChildren(movieList, skeletonItems);
  const newMovies = await getMovieItems();
  elementsReplaceWith(skeletonItems, newMovies);
}

export async function replaceMain() {
  globalStateMethod.initializePage();
  const sectionTag = document.querySelector('section');
  const skeletonView = getSkeletonView();
  sectionTag?.replaceWith(skeletonView);
  const movieListContainer = await getMovieListContainer();
  skeletonView?.replaceWith(movieListContainer);
}
