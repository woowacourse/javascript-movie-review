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
<<<<<<< HEAD
    errorMessage: 'no error',
=======
>>>>>>> fa33fb01648a0dceb841473ad808bd0d9b6b0790
  }),

  setState(newState: stateType) {
    for (const [key, value] of Object.entries(newState)) {
      if (!this.state[key]) continue;
      this.state[key] = value;
    }
  },
};
