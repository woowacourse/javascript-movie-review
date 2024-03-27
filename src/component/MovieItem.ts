import { MovieData } from '../interface/MovieData';
import scoreIconPath from '../asset/star_filled.png';

// movieItem의 형태(청사진)를 만들어 반환한다.
function createMovieItemBlueprint() {
  const aLink = document.createElement('a');
  aLink.href = '#';

  const itemCard = document.createElement('div');
  itemCard.classList.add('item-card');

  const itemThumbnail = document.createElement('img');
  itemThumbnail.classList.add('item-thumbnail');

  const itemTitle = document.createElement('p');
  itemTitle.classList.add('item-title');

  const itemScore = document.createElement('p');
  itemScore.classList.add('item-score');

  const scoreIcon = document.createElement('img');
  scoreIcon.src = scoreIconPath;

  itemScore.append(scoreIcon);
  itemCard.append(itemThumbnail, itemTitle, itemScore);

  aLink.append(itemCard);

  return {
    movieItem: aLink,
    needSkeletonElementList: [itemThumbnail, itemTitle, itemScore],
    dataElementList: {
      thumbnailElement: itemThumbnail,
      titleElement: itemTitle,
      scoreElement: itemScore,
    },
  };
}

function createMovieItem({ voteAverage, posterPath, title }: MovieData) {
  const { movieItem, dataElementList } = createMovieItemBlueprint();
  const { scoreElement, thumbnailElement, titleElement } = dataElementList;

  thumbnailElement.src = posterPath;
  titleElement.textContent = title;
  scoreElement.append(voteAverage.toString());

  thumbnailElement.onload = () => {
    thumbnailElement.loading = 'lazy';
    thumbnailElement.alt = title;
  };

  return movieItem;
}

function createSkeletonMovieItem() {
  const { movieItem, needSkeletonElementList } = createMovieItemBlueprint();

  needSkeletonElementList.forEach((element) => element.classList.add('skeleton'));

  return movieItem;
}

// function injectMovieDataToItem({ item, movie }) {
//   const $itemThumbnail = item.querySelector('.item-thumbnail');
//   const $itemTitle = item.querySelector('.item-title');
//   const $itemScore = item.querySelector('.item-score');

//   $itemThumbnail.onload = () => {
//     $itemThumbnail.classList.remove('skeleton');
//     $itemTitle.classList.remove('skeleton');
//     $itemScore.classList.remove('skeleton');

//     $itemThumbnail.loading = 'lazy';
//     $itemThumbnail.alt = movie.title;
//     $itemTitle.textContent = movie.title;

//     const $itemScoreIcon = document.createElement('img');

//     $itemScoreIcon.src = itemScoreIconPath;
//     $itemScoreIcon.alt = '별점';

//     $itemScore.append($itemScoreIcon, movie.voteAverage);
//   };

//   $itemThumbnail.src = movie.posterPath;
// }

export { createMovieItem, createSkeletonMovieItem };
