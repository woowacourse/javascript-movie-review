import ReplaceSkeletonsProps from '../../interfaces/ReplaceSkeletonsProps';
import MovieItem from '../MovieItem/MovieItem';

const MovieItems = {
  replaceSkeletons({ movieItems, responseData, moiveItemDetailModal }: ReplaceSkeletonsProps) {
    const itemCards = movieItems.querySelectorAll('li');

    itemCards.forEach((itemCard, index) => {
      MovieItem.replaceSkeleton({
        itemCard: itemCard,
        movieData: responseData.results[index],
        moiveItemDetailModal: moiveItemDetailModal,
      });
    });

    if (responseData.results[0] === undefined) {
      this.showNoResult(movieItems);
    }
  },

  showNoResult(movieItems: HTMLUListElement): void {
    const noResultText = document.createElement('h2');

    noResultText.textContent = '존재하지 않습니다. 다시 입력해주세요.';

    movieItems.replaceWith(noResultText);
  },
};

export default MovieItems;
