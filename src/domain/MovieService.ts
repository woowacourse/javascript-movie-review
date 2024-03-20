import { showSkeleton, updateCard } from '../components/movieCard/movieCard';

export function loadMovieList() {
  const itemList = document.querySelector('.item-list');
  if (!itemList) return;
  const liList = Array.from({ length: 20 }, () => showSkeleton());
  itemList.append(...liList);
  return liList;
}

export function completeMovieList(liList: any, movies: any) {
  movies.forEach((movie: any, index: any) => {
    updateCard(liList[index], movie);
  });
  document.querySelectorAll('li.skeleton').forEach(element => {
    element.remove();
  });
}
