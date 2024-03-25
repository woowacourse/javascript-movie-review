import { renderSkeleton, updateSkeletonToMovieCard } from '../components/movieCard/movieCard';
import { Movie } from '../interface/Movie';

const movieList = {
  none() {
    const itemList = document.querySelector('.item-list');
    if (!itemList) return;
    itemList.classList.add('none-text');

    itemList.innerHTML = `
      <h3>검색 결과를 찾지 못 하였습니다.</h3>
      <div>단어의 철자가 정확한지 확인해 보세요.</div>
      <div>검색어의 단어 수를 줄이거나, 보다 일반적인 검색어로 다시 검색해 보세요.</div>
    `;
  },

  loading() {
    const itemList = document.querySelector('.item-list');
    if (!itemList) return;
    const liList = Array.from({ length: 20 }, () => renderSkeleton());
    itemList.append(...liList);
    return liList;
  },

  completed(liList: any, movies: Movie[]) {
    movies.forEach((movie, index) => {
      updateSkeletonToMovieCard(liList[index], movie);
    });
    document.querySelectorAll('li.skeleton').forEach(element => {
      element.remove();
    });
  },
};

export default movieList;
