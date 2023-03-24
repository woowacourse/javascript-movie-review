import './Modal.css';
import starFilled from '../../image/star_filled.png';
import { getGenre } from '../../data/genre';
import { $ } from '../../utils/common';

class Modal extends HTMLElement {
  connectedCallback() {
    this.render({ id: '', title: '', imgUrl: '', score: '', genre: [12, 53], description: '' });
  }

  render(movieInfo) {
    this.replaceChildren();

    this.innerHTML = `
      <div class="modal modal--open">
        <div class="modal-backdrop"></div>
        <div class="modal-container">
          <div class="modal-header">
            <h2>${movieInfo.title}</h2>
            <button class="modal-button">X</button>
          </div>
          <div class="modal-contents">
            <div class="contents-image contents-image-skeleton">
              ${
                movieInfo.imgUrl === ''
                  ? `<img class="contents-image">`
                  : `<img class="contents-image" src="https://image.tmdb.org/t/p/w300${movieInfo.imgUrl}">`
              }
            </div>  
            <div class="contents-info">
              <div class="contents-info-top">
                <div class="info-header">
                <p>${movieInfo.genre.reduce((acc, curr, index) => {
                  if (index === movieInfo.genre.length - 1) return acc + getGenre[curr];
                  return acc + getGenre[curr] + ', ';
                }, '')}</p>
                  <img src="${starFilled}" alt="별점" />
                  <p>${movieInfo.score}</p>
                </div>  
                ${
                  movieInfo.description === ''
                    ? `<p>줄거리가 제공되지 않는 영화입니다 😭😭😭😭😭😭😭😭</p>`
                    : `<p>${movieInfo.description}</p>`
                }
              </div>
              <div class="contents-info-bottom">
                <score-box id="${movieInfo.id}"></score-box>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    this.setClickExitEvent();
    this.setKeyExitEvent();
  }

  setClickExitEvent() {
    $('.modal-button').addEventListener('click', () => {
      $('.modal').classList.add('modal--open');
    });
  }

  setKeyExitEvent() {
    window.addEventListener('keydown', e => {
      if (e.key === 'Escape') {
        return $('.modal').classList.add('modal--open');
      }
    });
  }
}

customElements.define('info-modal', Modal);

export default Modal;
