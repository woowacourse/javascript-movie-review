import { NOT_SCORE_TEXT } from '../../constants';
import Trash from '../../images/trash.svg';
import localStorageHandler from '../../model/LocalStorageHandler';
import { LocalStorageUserScore } from '../../type/movie';
import {
  createElementWithAttribute,
  debouceFunc,
  ElementFinder,
} from '../../utils';

// 상수
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
const TOTAL_START_LENGTH = 5;
const STAR_SCORE_INCREMENT = 2;
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

    $userScore.appendChild(this.#makeScoreHeader());
    $userScore.appendChild(this.#makeScoreArea());
    $userScore.appendChild(this.#makeResetButton());

    return $userScore;
  }

  #makeScoreHeader() {
    const $h4 = document.createElement('h4');
    $h4.textContent = '내 별점';

    return $h4;
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

    $scoreArea.appendChild(this.#makeButtonGroup());
    $scoreArea.appendChild(this.#makeScoreNumber());

    const $scoreText = this.#makeScoreText();
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

    const numberOfFilledStar = this.#getNumberOfFilledStar();

    Array.from({ length: TOTAL_START_LENGTH }).forEach((_, index) => {
      const isFilled = index + 1 <= numberOfFilledStar;
      const $btn = this.#makeSoreButton(isFilled, index);
      $buttonGroup.appendChild($btn);
    });

    return $buttonGroup;
  }

  #getNumberOfFilledStar() {
    return this.#score ? this.#score / STAR_SCORE_INCREMENT : 0;
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
    // 변경된 score 를 로컬 스토리지에 업데이트
    const newScoreItem = this.#makeNewScoreItem();
    localStorageHandler.updateScoreData(newScoreItem);
  }

  /**
   * 클릭한 별에 따라서 변경되는 점수를 계산하는 함수
   * @param target  클릭한 별
   * @returns 변경된 점수
   */
  #getNewScore(target: HTMLButtonElement) {
    const targetScore = Number(
      target.name.replace(STAR_BUTTON_NAME_PREFIX, ''),
    );
    const newScore = targetScore * 2;
    if (this.#score === newScore) return;

    return newScore;
  }

  /**
   * 변경된 점수에 따라 UI 변경
   */
  #changeScoreArea() {
    const $currentScoreArea =
      ElementFinder.findElementBySelector('.score-area');
    if (!$currentScoreArea) return;

    const $parent = $currentScoreArea.parentElement;
    if (!$parent) {
      ElementFinder.renderAlertModalForNullEl('score-area parent');
      return;
    }

    $parent.replaceChild(this.#makeScoreArea(), $currentScoreArea);
  }

  /**
   * 변경된 점수에 따라 로컬 스토리지에 변경되어야하는 데이터 생성
   */
  #makeNewScoreItem() {
    const changedScoreItem: LocalStorageUserScore = {
      id: this.#movieId,
      score: this.#score,
    };

    return changedScoreItem;
  }
}

export default UserScore;
