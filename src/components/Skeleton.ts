export class Skeleton {
  private $container: HTMLElement;
  private $movieItems: HTMLElement;

  constructor($listItems: HTMLElement) {
    this.$movieItems = $listItems;
    this.$container = document.createElement('ul');
    this.$container.className = 'item-list skeleton-container';
    this.$container.innerHTML = this.template();
  }

  private template() {
    return `<li>
    <div class="item-card">
      <div class="item-thumbnail skeleton"></div>
      <div class="item-title skeleton"></div>
      <div class="item-score skeleton"></div>
    </div>
  </li>`.repeat(20);
  }

  attachSkeleton() {
    this.$movieItems.insertAdjacentElement('beforeend', this.$container);
  }

  removeSkeleton() {
    this.$container.remove();
  }
}
