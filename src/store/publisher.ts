import { IMovie } from '../api/api.js';
import { observable } from '../core/observer.js';

export type stateType = {
  [key: string]: string | number | boolean;
};

export const publisher = {
  state: observable({
    page: 1,
    keyword: '검색 결과',
    isPopular: true,
  }),

  setState(newState: stateType) {
    for (const [key, value] of Object.entries(newState)) {
      if (!this.state[key]) continue;
      this.state[key] = value;
    }
  },
};
