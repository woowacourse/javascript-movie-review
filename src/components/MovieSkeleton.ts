const skeletonTemplate = (() => {
  const skeleton = document.createElement('li');
  skeleton.setAttribute('class', 'skeleton');

  const itemCard = document.createElement('div');
  itemCard.setAttribute('class', 'item-card');

  itemCard.insertAdjacentHTML('beforeend', '<div class="item-thumbnail skeleton"></div>');
  itemCard.insertAdjacentHTML('beforeend', '<div class="item-title skeleton"></div>');
  itemCard.insertAdjacentHTML('beforeend', '<div class="item-score skeleton"></div>');

  skeleton.appendChild(itemCard);

  return skeleton;
})();

class MovieSkeleton {
  private readonly element: HTMLElement;
  private readonly list: HTMLElement;

  constructor(element: HTMLElement) {
    this.element = element;
    this.element.dataset.hidden = 'true';

    this.list = document.createElement('ul');
    this.list.setAttribute('class', 'item-list');
    this.element.appendChild(this.list);
  }

  render(size: number) {
    this.list.replaceChildren();
    for (let count = 0; count < size; count += 1) {
      this.list.appendChild(skeletonTemplate.cloneNode(true));
    }
    return this.element;
  }

  show() {
    this.element.dataset.hidden = 'false';
  }

  hide() {
    this.element.dataset.hidden = 'true';
  }
}

export default MovieSkeleton;
