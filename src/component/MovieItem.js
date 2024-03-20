import itemScoreIconPath from '../asset/star_filled.png';

function createMovieItem(movie) {
  const aLink = document.createElement('a');
  aLink.href = '#';

  const itemCard = document.createElement('div');
  itemCard.classList.add('item-card');

  const itemThumbnail = document.createElement('img');
  itemThumbnail.classList.add('item-thumbnail');

  itemThumbnail.src = movie.posterPath;
  itemThumbnail.loading = 'lazy';
  itemThumbnail.alt = movie.title;

  const itemTitle = document.createElement('p');
  itemTitle.classList.add('item-title');
  itemTitle.textContent = movie.title;

  const itemScore = document.createElement('p');
  itemScore.classList.add('item-score');
  const itemScoreIcon = document.createElement('img');
  itemScoreIcon.src = itemScoreIconPath;
  itemScoreIcon.alt = '별점';

  itemScore.append(itemScoreIcon, movie.voteAverage);
  itemCard.append(itemThumbnail, itemTitle, itemScore);
  aLink.append(itemCard);

  return aLink;
}

function createSkeletonMovieItem() {
  const aLink = document.createElement('a');
  aLink.href = '#';

  const itemCard = document.createElement('div');
  itemCard.classList.add('item-card');

  const itemThumbnail = document.createElement('img');
  itemThumbnail.classList.add('item-thumbnail', 'skeleton');

  // itemThumbnail.src = movie.posterPath;
  // itemThumbnail.loading = 'lazy';
  // itemThumbnail.alt = movie.title;

  const itemTitle = document.createElement('p');
  itemTitle.classList.add('item-title', 'skeleton');
  // itemTitle.textContent = movie.title;

  const itemScore = document.createElement('p');
  itemScore.classList.add('item-score', 'skeleton');

  itemCard.append(itemThumbnail, itemTitle, itemScore);
  aLink.append(itemCard);

  return aLink;
}

export { createMovieItem, createSkeletonMovieItem };
