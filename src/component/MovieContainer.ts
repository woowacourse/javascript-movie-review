import { $ } from '../util/selector';
import { createMovieItem, createSkeletonMovieItem } from './MovieItem';
import createSkeletonCardList from './Skeleton/SkeletonCardList';
import { handleElementVisibilityByElement } from '../util/handleHideElement';
import { MovieData } from '../interface/MovieData';
import wrapItemWithLi from '../util/wrapItemWithLi';
import Movie from '../domain/Movie';
import { EventHandler } from '../interface/event';
import SkeletonCardList from './Skeleton/SkeletonCardList';
import removeAllChild from '../util/removeAllChild';

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

    // this.createSkeletonMovieList();
    this.addHandlerToMoreButton(handleMoreList);
  }

  // step2 에서 사용
  // private createSkeletonMovieList() {
  //   const skeletonMovieList = this.skeletonList.create(createSkeletonMovieItem);
  //   const wrappedSkeletonMovieListWithLi = wrapItemWithLi(skeletonMovieList);
  //   wrappedSkeletonMovieListWithLi.forEach((item) => this.movieListContainer.append(item));

  //   this.firstSkeletonItem = wrappedSkeletonMovieListWithLi[0]; // 새로운 아이템 push를 위한 진입점 마킹
  // }

  // 결과 없음 알림 요소 토글, ul 클리어, 버튼 보임 여부 토글
  groundWorkForNewMovieList({ movieList, hasNextPage }: { movieList: Array<Movie>; hasNextPage: boolean }) {
    try {
      const noticeNoDataElement = $('.notice-no-data', this.movieContainer);
      if (noticeNoDataElement && movieList.length !== 0) noticeNoDataElement.remove();
    } catch (e) {
      // 결과 없음 알림 요소가 없는 경우
      if (movieList.length === 0) this.noticeNoData();
    }

    if (movieList.length === 0) this.clearMovieList();

    handleElementVisibilityByElement(this.moreButton, hasNextPage);
  }

  pushNewMovieList({ movieList, hasNextPage }: { movieList: Array<Movie>; hasNextPage: boolean }) {
    this.groundWorkForNewMovieList({ movieList, hasNextPage });

    const movieItemList = movieList.map((movie) => createMovieItem(movie.data));

    if (this.firstSkeletonItem) movieItemList.forEach((item) => this.firstSkeletonItem!.before(item));
    else movieItemList.forEach((item) => this.movieListContainer.append(item));
  }

  private addHandlerToMoreButton(handleMoreList: EventHandler) {
    this.moreButton.addEventListener('click', handleMoreList);
  }

  clearMovieList() {
    this.skeletonList.handleVisibility(false);
    if (this.movieListContainer.firstChild) removeAllChild(this.movieListContainer);
    handleElementVisibilityByElement(this.moreButton, false);
  }

  noticeNoData() {
    const noticeNoDataElement = document.createElement('h3');
    noticeNoDataElement.textContent = '결과가 존재하지 않습니다.';
    noticeNoDataElement.classList.add('notice-no-data');

    const mainTitle = $('.main-title');
    mainTitle.after(noticeNoDataElement);
  }
}

export default MovieContainer;