import { LOCAL_STORAGE_KEY } from '../constants';
import { LocalStorageUserScore } from '../type/movie';

class LocalStorageHandler {
  #scoreData: LocalStorageUserScore[] | undefined;

  constructor() {
    this.#scoreData = this.#getScoreData();
  }

  get scoreData() {
    return this.#scoreData;
  }

  removeScoreItemFromScoreData(id: number) {
    if (!this.#scoreData) return;

    const index = this.#scoreData.findIndex((item) => item.id === id);
    if (index === undefined) return;

    this.#scoreData.splice(index, 1);
    this.#addScoreItemsToKLocalStorage();
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
    this.#addScoreItemsToKLocalStorage();
  }

  #pushScoreItemToScoreData(newScoreItem: LocalStorageUserScore) {
    if (!this.#scoreData) return;

    this.#scoreData.push(newScoreItem);
    this.#addScoreItemsToKLocalStorage();
  }

  #replaceScoreItem(index: number, newScoreItem: LocalStorageUserScore) {
    if (!this.#scoreData) return;

    this.#scoreData.splice(index, 1, newScoreItem);
    this.#addScoreItemsToKLocalStorage();
  }

  #addScoreItemsToKLocalStorage() {
    window.localStorage.setItem(
      LOCAL_STORAGE_KEY.userScore,
      JSON.stringify(this.#scoreData),
    );
  }
}

const localStorageHandler = new LocalStorageHandler();

export default localStorageHandler;
