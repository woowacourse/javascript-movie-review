import './style.css';

const skeletonTemplate = /* html */ `
  <div class="item-skeleton">
    <img class="item-thumbnail-skeleton skeleton" loading="lazy" />
    <p class="item-title-skeleton skeleton"></p>
    <div class="item-score-container-skeleton">
      <p class="item-score-skeleton skeleton"></p>
    </div>
  </div>
`;

class Skeleton {
  private template: HTMLLIElement;

  constructor() {
    const li = document.createElement('li');
    li.className = 'li-skeleton';
    li.innerHTML = skeletonTemplate;
    this.template = li;
  }

  get element() {
    return this.template;
  }

  removeSkeleton() {
    this.template.remove();
  }
}

export default Skeleton;
