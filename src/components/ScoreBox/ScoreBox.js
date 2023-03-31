import './ScoreBox.css';
import filledStar from '../../image/star_filled.png';
import emptyStar from '../../image/star_empty.png';
import { setMyScore, getMyScore } from '../../utils/common';

class ScoreBox extends HTMLElement {
  connectedCallback() {
    const id = this.getAttribute('id');
    const score = getMyScore(id);

    this.render(score);
    this.setClickEvent();
  }

  render(score) {
    this.replaceChildren();
    this.innerHTML = `
    <div class="my-favorite-score-box">
      <p class="my-score-text">내 별점</p>  
      ${score !== null ? this.scoreBoxTemplate(score) : this.scoreBoxTemplate('0')}
    </div>
    `;
  }

  setClickEvent() {
    const movieId = this.getAttribute('id');

    this.addEventListener('click', e => {
      if (e.target.classList.value === 'star-icon') {
        const score = e.target.id;
        setMyScore(movieId, score);
        this.render(score);
      }
    });
  }

  scoreBoxTemplate(score) {
    return `
      <span class='star'>
        ${this.scoreTemplate(score)}
      </span>
      </span>
      <p>${score}</p>
      <p class="score-feeling-text">${this.scoreTextTemplate(score)}</p>
    `;
  }

  scoreTemplate(score) {
    if (score === '0') {
      return `
        <img class="star-icon" id="2" src="${emptyStar}"/>
        <img class="star-icon" id="4" src="${emptyStar}"/>
        <img class="star-icon" id="6" src="${emptyStar}"/>
        <img class="star-icon" id="8" src="${emptyStar}"/>
        <img class="star-icon" id="10" src="${emptyStar}"/>
        `;
    }

    if (score === '2') {
      return `
        <img class="star-icon" id="2" src="${filledStar}"/>
        <img class="star-icon" id="4" src="${emptyStar}"/>
        <img class="star-icon" id="6" src="${emptyStar}"/>
        <img class="star-icon" id="8" src="${emptyStar}"/>
        <img class="star-icon" id="10" src="${emptyStar}"/>
        `;
    }

    if (score === '4') {
      return `
        <img class="star-icon" id="2" src="${filledStar}"/>
        <img class="star-icon" id="4" src="${filledStar}"/>
        <img class="star-icon" id="6" src="${emptyStar}"/>
        <img class="star-icon" id="8" src="${emptyStar}"/>
        <img class="star-icon" id="10" src="${emptyStar}"/>
      `;
    }

    if (score === '6') {
      return `
          <img class="star-icon" id="2" src="${filledStar}"/>
          <img class="star-icon" id="4" src="${filledStar}"/>
          <img class="star-icon" id="6" src="${filledStar}"/>
          <img class="star-icon" id="8" src="${emptyStar}"/>
          <img class="star-icon" id="10" src="${emptyStar}"/>
        `;
    }

    if (score === '8') {
      return `
        <img class="star-icon" id="2" src="${filledStar}"/>
        <img class="star-icon" id="4" src="${filledStar}"/>
        <img class="star-icon" id="6" src="${filledStar}"/>
        <img class="star-icon" id="8" src="${filledStar}"/>
        <img class="star-icon" id="10" src="${emptyStar}"/>
      `;
    }

    return `
      <img class="star-icon" id="2" src="${filledStar}"/>
      <img class="star-icon" id="4" src="${filledStar}"/>
      <img class="star-icon" id="6" src="${filledStar}"/>
      <img class="star-icon" id="8" src="${filledStar}"/>
      <img class="star-icon" id="10" src="${filledStar}"/>
    `;
  }

  scoreTextTemplate(score) {
    if (score === '0') return '아직 별점 안줬어요';
    if (score === '2') return '최악이에요';
    if (score === '4') return '별로예요';
    if (score === '6') return '보통이에요';
    if (score === '8') return '재미있어요';
    return '명작이에요';
  }
}

customElements.define('score-box', ScoreBox);

export default ScoreBox;
