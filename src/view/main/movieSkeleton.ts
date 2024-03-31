import movieStateMethod from '../../store/movieStore';

export function getMovieItemCardSkeleton() {
  const list = document.createElement('li');
  list.innerHTML = `<a href="#">
    <div class="item-card">
      <div class="item-thumbnail skeleton"></div>
      <div class="item-title skeleton"></div>
      <div class="item-score skeleton"></div>
    </div>`;
  return list;
}

function getSkeletonMovieList() {
  const movieList = document.createElement('ul');
  movieList.classList.add('item-list');
  const skeletonItems = Array.from({ length: 20 }, () => getMovieItemCardSkeleton());
  movieList.append(...skeletonItems);
  return movieList;
}

export function getSkeletonView() {
  const section = document.createElement('section');
  section.classList.add('item-view');
  const title = document.createElement('h2');
  const query = movieStateMethod.getQuery();
  title.innerText = query ? `"${query}" 검색 결과` : '지금 인기 있는 영화';
  const movieList = getSkeletonMovieList();
  section.append(title, movieList);
  return section;
}
