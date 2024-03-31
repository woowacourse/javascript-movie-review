const Skeleton = {
  template() {
    const itemCard = document.createElement('a');
    itemCard.classList.add('item-card');

    const itemImage = document.createElement('img');
    itemImage.classList.add('item-thumbnail', 'skeleton');
    itemCard.append(itemImage);

    const itemTitle = document.createElement('p');
    itemTitle.classList.add('item-title', 'skeleton');

    const itemScoreAndIcon = document.createElement('div');
    itemScoreAndIcon.classList.add('item-score-and-icon', 'skeleton');

    const itemStarIcon = document.createElement('img');
    itemStarIcon.classList.add('item-star-icon');

    const itemScore = document.createElement('p');
    itemScore.classList.add('item-score');

    itemScoreAndIcon.append(itemStarIcon);
    itemScoreAndIcon.append(itemScore);

    itemCard.append(itemTitle);
    itemCard.append(itemScoreAndIcon);

    return itemCard;
  },
};

export default Skeleton;
