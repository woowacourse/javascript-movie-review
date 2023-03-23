type CacheType = {
  popularPage: Set<number>;
  searchPage: Set<number>;
};

export const cache: CacheType = {
  popularPage: new Set(),
  searchPage: new Set(),
};
