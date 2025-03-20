interface MovieItemProps {
  data: MovieData;
}

class MovieItem {
  #container: HTMLElement;
  #data: MovieData;

  constructor({ data }: MovieItemProps) {
    this.#container = document.createElement('li');
    this.#data = data;
    this.render();
  }

  render() {
    this.#container.innerHTML = `
      <div class="item">
        <img class="thumbnail" src=${this.#data.imgUrl} alt=${this.#data.title}/>
        <div class="item-desc">
          <p class="rate">
            <img src="./star_empty.png" class="star" />
            <span>${this.#data.score}</span>
          </p>
          <strong class = 'text-body'>${this.#data.title}</strong>
        </div>
      </div>`;
  }

  get element() {
    // @TODO
    return this.#container;
  }
}

export default MovieItem;
