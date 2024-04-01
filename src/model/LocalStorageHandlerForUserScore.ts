import { LOCAL_STORAGE_KEY } from '../constants';
import { LocalStorageUserScore } from '../type/movie';

class LocalStorageHandlerForUserScore {
  #scoreData: LocalStorageUserScore[] | undefined;

  constructor() {
    this.#scoreData = this.#getScoreData();
  }

  get scoreData() {
    return this.#scoreData;
  }

  removeScoreItem(id: number) {
    if (!this.#scoreData) return;

    const index = this.#scoreData.findIndex((item) => item.id === id);
    if (index === undefined) return;

    this.#scoreData.splice(index, 1);
    this.#updateLocalStorageScoreData();
  }

  updateScoreData(newScoreItem: LocalStorageUserScore) {
    if (!this.#scoreData) {
      this.#addScoreDataWhenNotInStorage(newScoreItem);
      return;
    }
    const index = this.#scoreData.findIndex(
      (item) => item.id === newScoreItem.id,
    );

    if (index < 0) {
      this.#pushScoreItemToScoreData(newScoreItem);
      return;
    }
    this.#replaceScoreItem(index, newScoreItem);
  }

  #getScoreData() {
    const sessionItem = window.localStorage.getItem(
      LOCAL_STORAGE_KEY.userScore,
    );
    if (!sessionItem) return;

    const scoreItems = JSON.parse(sessionItem) as LocalStorageUserScore[];

    return scoreItems;
  }

  #addScoreDataWhenNotInStorage(newScoreItem: LocalStorageUserScore) {
    this.#scoreData = [newScoreItem];
    this.#updateLocalStorageScoreData();
  }

  #pushScoreItemToScoreData(newScoreItem: LocalStorageUserScore) {
    if (!this.#scoreData) return;

    this.#scoreData.push(newScoreItem);
    this.#updateLocalStorageScoreData();
  }

  #replaceScoreItem(index: number, newScoreItem: LocalStorageUserScore) {
    if (!this.#scoreData) return;

    this.#scoreData.splice(index, 1, newScoreItem);
    this.#updateLocalStorageScoreData();
  }

  #updateLocalStorageScoreData() {
    window.localStorage.setItem(
      LOCAL_STORAGE_KEY.userScore,
      JSON.stringify(this.#scoreData),
    );
  }
}

const localStorageHandlerForUserScore = new LocalStorageHandlerForUserScore();

export default localStorageHandlerForUserScore;
