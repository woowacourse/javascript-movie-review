const Skeleton = {
  template() {
    const skeletonCard = document.createElement('a');
    skeletonCard.classList.add('item-card');

    const skeletonThumbnail = document.createElement('div');
    skeletonThumbnail.classList.add('item-thumbnail', 'skeleton');

    const skeletonTitle = document.createElement('div');
    skeletonTitle.classList.add('item-title', 'skeleton');

    const skeletonScoreAndIcon = document.createElement('div');
    skeletonScoreAndIcon.classList.add('item-score-and-icon', 'skeleton');

    const skeletonStarIcon = document.createElement('div');
    skeletonStarIcon.classList.add('item-star-icon');

    const skeletonScore = document.createElement('p');
    skeletonScore.classList.add('item-score', 'skeleton');

    skeletonScoreAndIcon.append(skeletonStarIcon);
    skeletonScoreAndIcon.append(skeletonScore);

    skeletonCard.append(skeletonThumbnail);
    skeletonCard.append(skeletonTitle);
    skeletonCard.append(skeletonScoreAndIcon);

    return skeletonCard;
  },
};

export default Skeleton;
