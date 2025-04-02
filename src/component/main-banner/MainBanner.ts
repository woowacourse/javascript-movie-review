import Button from '../button/Button';
import { MovieData } from '../../../types/movie';

interface MovieBannerProps {
  data: MovieData;
}

class MainBanner {
  #container;
  #data: MovieData;
  #detailButton: Button | null = null;

  constructor({ data }: MovieBannerProps) {
    this.#container = document.createElement('div');
    this.#container.classList.add('main-banner');
    this.#data = data;
    this.render();
    this.#detailButtonElement();
  }

  render() {
    this.#container.innerHTML = `
           <div class="overlay" aria-hidden="true">
             <img class = "main-banner__image" src=${this.#data.imgUrl} alt=${this.#data.title}/>
           </div>
           
        <div class="main-banner__info">
           <div class="main-banner__rate">
                <img src="https://h0ngju.github.io/javascript-movie-review/star_empty.png" class="main-banner__rating-star" />
                <span class="main-banner__rate-value text-subtitle">${this.#data.score}</span>
            </div>
              <div class="main-banner__title text-title">${this.#data.title}</div>
              <div class="main-banner__button"></div>
        </div>`;
  }

  #detailButtonElement() {
    this.#detailButton = new Button({
      cssType: 'small',
      innerText: '자세히 보기',
      onClick: () => {
        const event = new CustomEvent('movie-clicked', {
          detail: this.#data,
          bubbles: true,
        });
        this.#container.dispatchEvent(event);
      },
    });

    const buttonContainer = this.#container.querySelector('.main-banner__button');
    buttonContainer?.appendChild(this.#detailButton.element);
  }

  get element() {
    return this.#container;
  }
}

export default MainBanner;
