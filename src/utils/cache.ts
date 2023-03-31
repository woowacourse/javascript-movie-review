type CacheType = {
  popularPage: Set<number>;
  searchPage: Set<number>;
};

export const cache: CacheType = {
  popularPage: new Set(),
  searchPage: new Set(),
};

export const cacheHook = (page: 'searchPage' | 'popularPage') => {
  return {
    reset: () => {
      cache[page] = new Set();
    },

    store: (targetPage: number) => {
      cache[page].add(targetPage);
    },

    has: (targetPage: number) => {
      return cache[page].has(targetPage);
    },
  };
};
