interface TitleProps {
  text: string;
}

export class Title {
  #container;
  #text;

  constructor({ text }: TitleProps) {
    this.#container = document.createElement('div');
    this.#text = text;

    this.render();
  }

  // @todo : movie-gird--title 수정하기
  render() {
    this.#container.innerHTML = `
        <h2 class="title">${this.#text}</h2>
    `;
  }

  get element() {
    return this.#container;
  }
}
