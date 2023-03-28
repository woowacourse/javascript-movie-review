export default class Skeleton extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  render() {
    this.insertAdjacentHTML(
      "beforeend",
      `
        <li class="movie-skeleton">
          <div class="item-card">
            <div class="item-thumbnail skeleton"></div>
            <div class="item-title skeleton"></div>
            <div class="item-score skeleton"></div>
          </div>
        </li>
      `
    );
  }
}
