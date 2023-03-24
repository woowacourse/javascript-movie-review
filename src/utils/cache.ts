import { MovieApiType } from '../type/movie';

type CacheType = {
  popularPage: Set<number>;
  searchPage: Set<number>;
};

export const cache: CacheType = {
  popularPage: new Set(),
  searchPage: new Set(),
};

export const cacheHook = {
  popular: {
    reset: () => {
      cache.popularPage = new Set();
    },

    store: (page: number) => {
      cache.popularPage.add(page);
    },

    has: (page: number) => {
      cache.popularPage.has(page);
    },
  },

  search: {
    reset: () => {
      cache.searchPage = new Set();
    },

    store: (page: number) => {
      cache.searchPage.add(page);
    },
  },
};
