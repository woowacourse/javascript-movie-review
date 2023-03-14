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
          <movie-item imgUrl="https://image.tmdb.org/t/p/w220_and_h330_face/cw6jBnTauNmEEIIXcoNEyoQItG7.jpg" title="앤트맨과 와스프: 퀀텀매니아" score="6.7"></movie-item>
        </ul>
        <common-button text="더보기" color="primary"></common-button>
      </section>
    </main>`;
  }
}

export default MoviesContainer;
