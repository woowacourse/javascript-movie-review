import { NOT_SCORE_TEXT } from '../../constants';
import Trash from '../../images/trash.svg';
import localStorageHandler from '../../model/LocalStorageHandler';
import { LocalStorageUserScore } from '../../type/movie';
import {
  createElementWithAttribute,
  debouceFunc,
  ElementFinder,
} from '../../utils';

const FILLED_CLASS = 'filled';
const SCORE_TEXT_MAP = new Map([
  [0, '별점을 남겨주세요.'],
  [2, '최악이에요.'],
  [4, '별로에요.'],
  [6, '보통이에요'],
  [8, '재미있어어요.'],
  [10, '명작이에요.'],
]);
const STAR_BUTTON_NAME_PREFIX = 'star_';

class UserScore {
  #movieId: number;
  #element: HTMLElement;
  #score = 0;

  constructor(movieId: number) {
    this.#movieId = movieId;
    this.#getUserScore();
    this.#element = this.#makeUserScore();
  }

  get element() {
    return this.#element;
  }

  // 로컬에 저장된 유저 점수 반영
  #getUserScore() {
    const scoreItems = localStorageHandler.scoreData;
    if (!scoreItems) return;

    const item = scoreItems.find((score) => score.id === this.#movieId);
    if (!item) return;

    this.#score = item.score;
  }

  // element 생성
  #makeUserScore() {
    const $userScore = createElementWithAttribute('section', {
      class: 'user-score',
    });
    const $h4 = document.createElement('h4');
    $h4.textContent = '내 별점';
    const $scoreArea = this.#makeScoreArea();
    const $resetButton = this.#makeResetButton();
    $userScore.appendChild($h4);
    $userScore.appendChild($scoreArea);
    $userScore.appendChild($resetButton);

    return $userScore;
  }

  #makeResetButton() {
    const $button = createElementWithAttribute<HTMLButtonElement>('button', {
      class: 'button-reset-score',
      title: '별점 초기화',
    });
    const $img = createElementWithAttribute<HTMLImageElement>('img', {
      src: Trash,
    });
    $button.appendChild($img);

    this.#addClickEventToResetButton($button);

    return $button;
  }

  #addClickEventToResetButton($resetButton: HTMLButtonElement) {
    $resetButton.addEventListener('click', (event) =>
      this.#handleClickResetButton(event),
    );
  }

  #handleClickResetButton(event: Event) {
    event.stopPropagation();
    if (!this.#score) return;

    this.#score = 0;
    this.#changeScoreArea();
    localStorageHandler.removeScoreItemFromScoreData(this.#movieId);
  }

  #makeScoreArea() {
    const $scoreArea = createElementWithAttribute('div', {
      class: 'score-area',
    });
    const $starBox = this.#makeButtonGroup();
    const $scoreText = this.#makeScoreText();
    const $scoreNumber = this.#makeScoreNumber();
    $scoreArea.appendChild($starBox);
    $scoreArea.appendChild($scoreNumber);
    if ($scoreText) {
      $scoreArea.appendChild($scoreText);
    }

    return $scoreArea;
  }

  #makeScoreNumber() {
    const $scoreNumber = createElementWithAttribute('span', {
      class: 'score-number',
    });
    $scoreNumber.textContent = this.#score.toString();
    return $scoreNumber;
  }

  #makeScoreText() {
    const $scoreText = createElementWithAttribute('span', {
      class: 'score-text',
    });
    const text = SCORE_TEXT_MAP.get(this.#score);
    if (!text) {
      console.error(NOT_SCORE_TEXT);
      return;
    }
    $scoreText.textContent = text;
    return $scoreText;
  }

  #makeButtonGroup() {
    const $buttonGroup = createElementWithAttribute('div', {
      class: 'button-score-group',
    });
    const TOTAL_START_LENGTH = 5;
    const filledStartLength = this.#score ? this.#score / 2 : 0;

    Array.from({ length: TOTAL_START_LENGTH }).forEach((_, index) => {
      const isFilled = index + 1 <= filledStartLength;
      const $btn = this.#makeSoreButton(isFilled, index);
      $buttonGroup.appendChild($btn);
    });

    return $buttonGroup;
  }

  #makeSoreButton(isFilled: boolean, index: number) {
    const $btn = createElementWithAttribute<HTMLButtonElement>('button', {
      class: 'button-score',
      name: `${STAR_BUTTON_NAME_PREFIX}${index + 1}`,
      title: '별점 버튼',
    });
    if (isFilled) $btn.classList.add(FILLED_CLASS);

    $btn.addEventListener('click', (event) => {
      debouceFunc(() => this.#handleClickSoreButton(event));
    });
    return $btn;
  }

  // button event
  #handleClickSoreButton(event: Event) {
    event.stopPropagation();
    const { target } = event;
    if (!(target instanceof HTMLButtonElement)) return;
    //score 변경
    const newScore = this.#getNewScore(target);
    if (!newScore) return;
    this.#score = newScore;
    // 변경된 score에 따라 scoreArea 변경
    this.#changeScoreArea();
    // 변경된 score - 로컬 스토리지에 업데이트
    const newScoreItem = this.#getNewScoreItem();
    localStorageHandler.updateScoreData(newScoreItem);
  }

  #getNewScore(target: HTMLButtonElement) {
    const targetScore = Number(
      target.name.replace(STAR_BUTTON_NAME_PREFIX, ''),
    );
    const newScore = targetScore * 2;
    if (this.#score === newScore) return;

    return newScore;
  }

  #changeScoreArea() {
    const $currentScoreArea =
      ElementFinder.findElementBySelector('.score-area');
    if (!$currentScoreArea) return;

    const $parent = $currentScoreArea.parentElement;
    if (!$currentScoreArea || !$parent) {
      ElementFinder.renderAlertModalForNullEl('score-area parent');
      return;
    }

    $parent.replaceChild(this.#makeScoreArea(), $currentScoreArea);
  }

  #getNewScoreItem() {
    const changedScoreItem: LocalStorageUserScore = {
      id: this.#movieId,
      score: this.#score,
    };

    return changedScoreItem;
  }
}

export default UserScore;
