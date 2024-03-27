function createSkeletonMovieItem(): HTMLElement {
  const aLink = document.createElement('a');
  aLink.href = '#';

  const itemCard = document.createElement('div');
  itemCard.classList.add('item-card');

  const itemThumbnail = document.createElement('img');
  itemThumbnail.classList.add('item-thumbnail', 'skeleton');

  const itemTitle = document.createElement('p');
  itemTitle.classList.add('item-title', 'skeleton');

  const itemScore = document.createElement('p');
  itemScore.classList.add('item-score', 'skeleton');

  itemCard.append(itemThumbnail, itemTitle, itemScore);
  aLink.append(itemCard);

  return aLink;
}

export default createSkeletonMovieItem;
