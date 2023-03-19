import { MovieType } from '../types';
import { $, $$ } from '../utils/domSelector';
import MovieItem from './MovieItem';
import skeletonItem from './skeletonItem';
import errorLayout from './errorLayout';

type ErrorLayoutConstructorType = {
  image: string;
  title: string;
  message: string;
};

class MovieList {
  renderListTitle(listTitle: string) {
    const template = `
      <h2>${listTitle}</h2>
      <ul class="item-list"></ul>`;

    $('.item-view').insertAdjacentHTML('beforeend', template);
  }

  setTitle(listTitle: string) {
    $('.item-view h2').textContent = listTitle;
  }

  showErrorMessage({ image, title, message }: ErrorLayoutConstructorType) {
    $('.item-list').innerHTML = errorLayout.getTemplate({ image, title, message });
  }

  clearItems() {
    $('.item-list').innerHTML = '';
  }

  renderSkeletonItems(count: number = 20) {
    const skeletonItems = skeletonItem().repeat(count);
    $('.item-list').insertAdjacentHTML('beforeend', skeletonItems);
  }

  removeSkeletonItems() {
    $$('.item-list .skeleton-item:not(.occupied)').forEach((skeleton) => {
      skeleton.remove();
    });
  }

  renderContents(movieInfoList: MovieType[]) {
    const skeletons = $$('.item-list .skeleton-item');
    console.log(skeletons);

    movieInfoList.forEach((movieInfo, index) => {
      skeletons[index].classList.add('occupied');
      new MovieItem({ skeleton: skeletons[index], movieInfo: movieInfo });
    });
  }
}

export default MovieList;
