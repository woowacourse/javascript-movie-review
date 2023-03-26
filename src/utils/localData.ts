import { ScoreType } from '../utils/type';
import { localStorageDataName } from '../CONSTANT';

export const localData = {
  setStarDate(data: Map<number, ScoreType>) {
    localStorage.setItem(localStorageDataName.userStar, JSON.stringify([...data]));
  },

  getStarData(): Map<number, ScoreType> {
    const localList = localStorage.getItem(localStorageDataName.userStar);

    if (localList == null) return new Map();

    return new Map(JSON.parse(localList));
  },
};
