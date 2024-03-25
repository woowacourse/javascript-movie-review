import { renderSkeleton, updateSkeletonToMovieCard } from '../components/movieCard/movieCard';
import { Movie } from '../interface/Movie';

const movieList = {
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
