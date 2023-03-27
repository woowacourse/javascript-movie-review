import DefaultPoster from '../../../assets/default_poster.png';
import { STAR_FILLED } from '../../../assets/svg';
import { hide } from '../../dom';
import { $ } from '../../utils/domUtils';

class MovieDetailBox extends HTMLElement {
  constructor() {
    super();
    this.render();
  }

  render() {
    const id = this.getAttribute('id');
    const posterPath = this.getAttribute('poster-path');

    this.innerHTML = /* html */ `
      <div class="modal hide">
        <div class="box" id="${id}">
          <section class="head">
            <h1>${this.getAttribute('title')}</h1>
            <button id="close">✕</button>
          </section>
          <section class="body">
            <img 
              class="poster" 
              src=${
                posterPath === 'null'
                  ? DefaultPoster
                  : `https://image.tmdb.org/t/p/w220_and_h330_face${posterPath}`
              }
            />
            <div class="detail">
              <div class="description">
                <p>
                  ${this.getAttribute('genreString')}
                  <span>${STAR_FILLED}</span>
                  ${this.getAttribute('vote-average')}
                </p>
                <p>
                  ${this.getAttribute('overview')}
                </p>
              </div>
              <vote-area 
                id="${id}" 
                my-vote="${this.getAttribute('my-vote')}"
              ></vote-area>
            </div>
          </section>
        </div>
      </div>
    `;
  }

  connectedCallback() {
    document.addEventListener('keydown', this.onKeyDown);
    this.addEventListener('click', this.onClick);
    this.querySelector('#close')?.addEventListener('click', this.close);
  }

  onKeyDown = (e: Event) => {
    const closeKeys = ['Escape', 'Backspace'];
    if (e instanceof KeyboardEvent && closeKeys.includes(e.key)) this.close();
  };

  onClick = (e: Event) => {
    const $box = $('.box');
    if (
      $box instanceof HTMLElement &&
      this.contains(<Node>e.target) &&
      !$box.contains(<Node>e.target)
    ) {
      this.close();
    }
  };

  close = () => {
    hide('.modal');
    document.body.classList.remove('fix');
  };
}

export default MovieDetailBox;
