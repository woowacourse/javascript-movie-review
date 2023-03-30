import Component from '../../types/component';

class MovieDetailImage implements Component {
  node: HTMLElement;
  posterPath: string;
  title: string;

  constructor(posterPath: string, title: string) {
    this.node = document.createElement('div');
    this.node.classList.add('modal-image');
    this.posterPath = posterPath;
    this.title = title;

    this.composeNode();
  }

  composeNode(): this {
    this.node.innerHTML = `
    <img
      src="${this.posterPath}"
      alt="영화 제목이 ${this.title}인 포스터 사진"
    />
    `;

    return this;
  }
}

export default MovieDetailImage;
