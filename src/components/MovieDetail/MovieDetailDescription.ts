import Component from '../../types/component';

class MovieDetailDescription implements Component {
  readonly node: HTMLElement;
  readonly overview: string;

  constructor(overview: string) {
    this.node = document.createElement('div');
    this.node.classList.add('modal-image');
    this.overview = overview;

    this.composeNode();
  }

  composeNode(): this {
    this.node.innerHTML = `
    <p>${this.overview}</p>
    `;

    return this;
  }
}

export default MovieDetailDescription;
