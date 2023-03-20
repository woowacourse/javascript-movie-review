import './Skeleton.css';

class Skeleton extends HTMLElement {
  connectedCallback(): void {
    this.render();
  }

  makeSkeletonItem(): string {
    return `
      <li>
        <a href="#">
          <div class="item-card">
            <div class="item-thumbnail skeleton"></div>
            <div class="item-title skeleton"></div>
            <div class="item-score skeleton"></div>
          </div>
        </a>
      </li>`;
  }

  render(): void {
    this.innerHTML = `
    <ul class="item-list">
    ${this.makeSkeletonItem().repeat(20)}
    </ul>
    `;
  }
}

export default Skeleton;
