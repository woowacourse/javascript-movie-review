import { $ } from '../util/selector';
import { createMovieItem, createSkeletonMovieItem } from './MovieItem';
import createSkeletonCardList from './Skeleton/SkeletonCardList';
import { handleElementVisibilityByElement } from '../util/handleHideElement';
import { MovieData } from '../interface/MovieData';
import wrapItemWithLi from '../util/wrapItemWithLi';
import Movie from '../domain/Movie';
import { EventHandler } from '../interface/view';
import SkeletonCardList from './Skeleton/SkeletonCardList';

class MovieContainer {
  private movieContainer;
  private movieListContainer;
  private moreButton;
  private firstSkeletonItem: HTMLElement | null;
  private skeletonList;

  constructor({ handleMoreList }: { handleMoreList: EventHandler }) {
    this.movieContainer = $('section.item-view');
    this.movieListContainer = $('ul.item-list');
    this.moreButton = $('.more-button', this.movieContainer);
    this.firstSkeletonItem = null;
    this.skeletonList = new SkeletonCardList();

    this.createSkeletonMovieList();
    this.addHandlerToMoreButton(handleMoreList);
  }

  private createSkeletonMovieList() {
    const skeletonMovieList = this.skeletonList.create(createSkeletonMovieItem);
    const wrappedSkeletonMovieListWithLi = wrapItemWithLi(skeletonMovieList);
    wrappedSkeletonMovieListWithLi.forEach((item) => this.movieListContainer.append(item));

    this.firstSkeletonItem = wrappedSkeletonMovieListWithLi[0]; // 새로운 아이템 push를 위한 진입점 마킹
  }

  pushNewMovieList({ movieList, hasNextPage }: { movieList: Array<Movie>; hasNextPage: boolean }) {
    handleElementVisibilityByElement(this.moreButton, hasNextPage);

    if (movieList.length === 0) {
      this.clearList();
      return;
    }

    const movieItemList = movieList.map((movie) => createMovieItem(movie.data));

    movieItemList.forEach((item) => this.firstSkeletonItem?.before(item));
  }

  private addHandlerToMoreButton(handleMoreList: EventHandler) {
    this.moreButton.addEventListener('click', handleMoreList);
  }

  private clearList() {
    const noticeNoDataElement = document.createElement('h3');
    noticeNoDataElement.textContent = '결과가 존재하지 않습니다.';

    const mainTitle = $('.main-title');
    mainTitle.after(noticeNoDataElement);

    this.skeletonList.handleVisibility(false);
  }
}

export default MovieContainer;
