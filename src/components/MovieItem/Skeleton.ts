import { MOVIE_COUNT_PER_PAGE } from '../../consts/UISettings';

class MovieItemSkeleton {
  itemBox = document.createElement('li');
  itemCard = document.createElement('a');
  itemThumbnail = document.createElement('img');
  itemTitle = document.createElement('div');
  itemScore = document.createElement('p');

  constructor(skeletonId: number) {
    this.itemBox.setAttribute('data-skeleton-id', String(skeletonId));
    this.itemBox.classList.add('item-box');
    this.itemCard.classList.add('item-card');
  }

  renderSkeleton() {
    this.itemThumbnail.classList.add('item-thumbnail', 'skeleton');
    this.itemTitle.classList.add('item-title', 'skeleton');
    this.itemScore.classList.add('item-score', 'skeleton');

    this.itemCard.append(this.itemThumbnail);
    this.itemCard.append(this.itemTitle);
    this.itemCard.append(this.itemScore);
    this.itemBox.append(this.itemCard);
    return this.itemBox;
  }
}
export default MovieItemSkeleton;
