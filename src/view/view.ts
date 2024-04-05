import MovieCard from '../components/movieCard/movieCard';
import { Movie } from '../interface/Movie';

const view = {
  noMovieResult() {
    const itemList = document.querySelector('.item-list');
    if (!itemList) return;
    itemList.classList.add('none-text');

    itemList.innerHTML = `
      <h3>검색 결과를 찾지 못 하였습니다.</h3>
      <div>단어의 철자가 정확한지 확인해 보세요.</div>
      <div>검색어의 단어 수를 줄이거나, 보다 일반적인 검색어로 다시 검색해 보세요.</div>
    `;
  },

  renderMovieCard(movies: Movie[]) {
    const skeletonList = document.querySelector('.skeleton-list');
    if (!skeletonList) return;

    movies.forEach(movie => {
      skeletonList.before(MovieCard(movie));
    });
  },

  showSkeleton() {
    const skeletons = document.querySelectorAll('.skeleton-list');
    skeletons.forEach(element => {
      element.classList.remove('hidden');
    });
  },

  hideSkeleton() {
    const skeletons = document.querySelectorAll('.skeleton-list');
    skeletons.forEach(element => {
      element.classList.add('hidden');
    });
  },
};

export default view;
