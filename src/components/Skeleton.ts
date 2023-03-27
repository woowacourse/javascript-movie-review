import './Skeleton.css';

class Skeleton extends HTMLElement {
  connectedCallback(): void {
    this.render();
  }

  render(): void {
    this.innerHTML = /*html*/ `
      <ul class="item-list skeleton-list">
        ${this.makeSkeletonItem().repeat(20)}
      </ul>
    `;
  }

  makeSkeletonItem(): string {
    return /*html*/ `
      <li class="skeleton-item">
          <div class="item-card">
            <div class="item-thumbnail skeleton"></div>
            <div class="item-title skeleton"></div>
            <div class="skeleton-score skeleton"></div>
          </div>
      </li>`;
  }
}

export default Skeleton;
