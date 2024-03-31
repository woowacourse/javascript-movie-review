import ReplaceSkeletonsProps from '../../interfaces/ReplaceSkeletonsProps';
import MovieItem from '../MovieItem/MovieItem';

const MovieItems = {
  replaceSkeletons({ skeletonList, moviesData, moiveItemDetailModal, itemList }: ReplaceSkeletonsProps) {
    skeletonList.forEach((itemCard, index) => {
      MovieItem.replaceSkeleton({ itemCard, movieData: moviesData.results[index], moiveItemDetailModal });
    });

    const isNotResult: boolean = moviesData.results[0] === undefined;
    if (isNotResult) this.showNoResult(itemList);
  },

  showNoResult(itemList: HTMLElement): void {
    const noResultText = document.createElement('h2');

    noResultText.textContent = '존재하지 않습니다. 다시 입력해주세요.';

    itemList.replaceWith(noResultText);
  },
};

export default MovieItems;
