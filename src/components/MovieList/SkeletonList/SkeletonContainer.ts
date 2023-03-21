import "./style.css";

class SkeletonList {
  $target: HTMLUListElement;

  constructor($target: HTMLUListElement) {
    this.$target = $target;

    this.render();
  }

  template() {
    return Array.from(
      { length: 20 },
      () => `
    <li>
    <a href="#">
      <div class="item-card skeleton">
        <div class="item-thumbnail skeleton"></div>
        <div class="item-title skeleton"></div>
        <div class="item-score skeleton"></div>
      </div>
    </a>
    </li>`
    ).join("");
  }

  render() {
    this.$target.innerHTML = this.template();
  }
}

export default SkeletonList;
