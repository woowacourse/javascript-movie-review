const skeleton = {
  create(movieCount: number) {
    const $fragment = document.createDocumentFragment();
    Array.from({ length: movieCount }).forEach(() => {
      $fragment.appendChild(this.template());
    });

    return $fragment;
  },

  template() {
    const $itemCard = this.createItemCard();
    const $caption = this.createCaption();
    $itemCard.appendChild($caption);
    return $itemCard;
  },

  createItemCard() {
    const $itemCard = document.createElement('div');
    const $thumbnail = this.createThumbnail();
    const $title = this.createTitle();

    $itemCard.classList.add('item-card');
    $itemCard.appendChild($thumbnail);
    $itemCard.appendChild($title);
    return $itemCard;
  },

  createCaption() {
    const $caption = document.createElement('div');
    const $score = this.createScore();
    const $starIcon = this.createStarIcon();

    $caption.classList.add('item-caption', 'skeleton');
    $caption.appendChild($score);
    $caption.appendChild($starIcon);
    return $caption;
  },

  createThumbnail() {
    const $thumbnail = document.createElement('img');
    $thumbnail.classList.add('item-thumbnail', 'skeleton');
    $thumbnail.loading = 'lazy';
    return $thumbnail;
  },

  createTitle() {
    const $title = document.createElement('p');
    $title.classList.add('item-title', 'skeleton');
    return $title;
  },

  createScore() {
    const $score = document.createElement('p');
    $score.classList.add('item-score');
    return $score;
  },

  createStarIcon() {
    const $starIcon = document.createElement('img');
    $starIcon.classList.add('item-star-icon');
    $starIcon.loading = 'lazy';
    return $starIcon;
  },
};

export default skeleton;
