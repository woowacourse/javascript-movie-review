import './Skeleton.css';

class Skeleton extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  makeSkeletonItem() {
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

  render() {
    this.innerHTML = this.makeSkeletonItem();
  }
}

customElements.define('skeleton-item', Skeleton);

export default Skeleton;
