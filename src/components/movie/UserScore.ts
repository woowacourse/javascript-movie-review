import { LOCAL_STORAGE_KEY } from '../../constants';
import Trash from '../../images/trash.svg';
import { renderAlertModalForNullEl } from '../../service';
import { LocalStorageUserScore } from '../../type/movie';
import { createElementWithAttribute, debouceFunc } from '../../utils';

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

  #getLocalScoreItems() {
    const sessionItem = window.localStorage.getItem(
      LOCAL_STORAGE_KEY.userScore,
    );
    if (!sessionItem) return;

    const scoreItems = JSON.parse(sessionItem) as LocalStorageUserScore[];

    return scoreItems;
  }

  // 로컬에 저장된 유저 점수 반영
  #getUserScore() {
    const scoreItems = this.#getLocalScoreItems();
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
    const $button = createElementWithAttribute('button', {
      class: 'button-reset-score',
    });
    const $img = createElementWithAttribute('img', {
      src: Trash,
    });
    $button.appendChild($img);

    $button.addEventListener('click', (event) =>
      this.#handleClickResetButton(event),
    );

    return $button;
  }

  #handleClickResetButton(event: Event) {
    event.stopPropagation();
    if (!this.#score) return;

    this.#score = 0;
    this.#changeScoreArea();
    this.#removeScoreItemFromStorage();
  }

  #removeScoreItemFromStorage() {
    const scoreItems = this.#getLocalScoreItems();
    if (!scoreItems) return;
    const index = scoreItems.findIndex((item) => item.id === this.#movieId);
    if (!index) return;

    scoreItems.splice(index, 1);
    this.#addScoreItemsToKLocalStorage(scoreItems);
  }

  #makeScoreArea() {
    const $scoreArea = createElementWithAttribute('div', {
      class: 'score-area',
    });
    const $starBox = this.#makeButtonGroup();
    const $scoreText = this.#makeScoreText();

    $scoreArea.appendChild($starBox);
    if ($scoreText) {
      $scoreArea.appendChild($scoreText);
    }

    return $scoreArea;
  }

  #makeScoreText() {
    const $scoreText = createElementWithAttribute('div', {
      class: 'score-text',
    });
    const text = SCORE_TEXT_MAP.get(this.#score);
    if (!text) {
      console.error('별점에 맞는 문구를 찾을 수 없습니다.');
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
    const $btn = createElementWithAttribute('button', {
      class: 'button-score',
      name: `${STAR_BUTTON_NAME_PREFIX}${index + 1}`,
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
    this.#updateChangedScoreToStorage();
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
    const $currentScoreArea = document.querySelector('.score-area');
    const $parent = $currentScoreArea?.parentElement;
    if (!$currentScoreArea || !$parent) {
      renderAlertModalForNullEl('score-area');
      return;
    }
    const $newCurrentScoreArea = this.#makeScoreArea();
    $parent.replaceChild($newCurrentScoreArea, $currentScoreArea);
  }

  #updateChangedScoreToStorage() {
    const scoreItems = this.#getLocalScoreItems();
    const newScoreItem = this.#getNewScoreItem();
    if (!scoreItems) {
      this.#addScoreItemsToKLocalStorage([newScoreItem]);
      return;
    }
    const index = scoreItems?.findIndex((item) => item.id === this.#movieId);
    if (!index) {
      this.#addScoreItemsToKLocalStorage(scoreItems.concat(newScoreItem));
      return;
    }
    scoreItems.splice(index, 1, newScoreItem);
    this.#addScoreItemsToKLocalStorage(scoreItems);
  }

  #addScoreItemsToKLocalStorage(scoreItems: LocalStorageUserScore[]) {
    window.localStorage.setItem(
      LOCAL_STORAGE_KEY.userScore,
      JSON.stringify(scoreItems),
    );
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
