const MovieSkeleton = {
  makeNode () {
    const skeleton = document.createDocumentFragment();

    const li = document.createElement('li');
    li.setAttribute('class', 'skeleton');

    const itemCard = document.createElement('div');
    itemCard.setAttribute('class', 'item-card');

    itemCard.insertAdjacentHTML('beforeend', '<div class="item-thumbnail skeleton"></div>');
    itemCard.insertAdjacentHTML('beforeend', '<div class="item-title skeleton"></div>');
    itemCard.insertAdjacentHTML('beforeend', '<div class="item-score skeleton"></div>');

    li.appendChild(itemCard);

    skeleton.appendChild(li);

    return skeleton;
  }
};

export default MovieSkeleton;
