import { observable } from './core/observer.js';

export type stateType = {
  [key: string]: string | number | boolean;
};

export const store = {
  state: observable({
    page: 1,
    keyword: '검색 결과',
    isPopular: true,
    isContentEnd: false,
    errorMessage: 'no error',
  }),

  setState(newState: stateType) {
    for (const [key, value] of Object.entries(newState)) {
      if (!this.state[key]) continue;
      this.state[key] = value;
    }
  },
};
