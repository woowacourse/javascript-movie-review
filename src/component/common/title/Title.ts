interface TitleProps {
  text: string;
}

export class Title {
  #container;
  #text;

  constructor({ text }: TitleProps) {
    this.#container = document.createElement('h2');
    this.#container.classList.add('title');
    this.#text = text;

    this.render();
  }

  render() {
    this.#container.innerText = `${this.#text}`;
  }

  get element() {
    return this.#container;
  }
}
