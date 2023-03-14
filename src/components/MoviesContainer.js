import './MoviesContainer.css';

class MoviesContainer extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = `
    <main>
      <section class="item-view">
        <h2>지금 인기 있는 영화</h2>
        <ul class="item-list">
        </ul>
      </section>
    </main>`;
  }
}

export default MoviesContainer;
