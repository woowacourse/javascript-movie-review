type Mode = "popular" | "search";

let currentMode: Mode = "popular";
let currentPage = {
  popular: 1,
  search: 1,
};
let maxPage = {
  popular: Infinity,
  search: Infinity,
};
let currentSearchKeyword = "";

export const movieState = {
  getMode: () => currentMode,
  setMode: (mode: Mode) => {
    currentMode = mode;
  },

  getCurrentPage: () => currentPage[currentMode],
  increasePage: () => {
    currentPage[currentMode]++;
  },
  resetPage: () => {
    currentPage[currentMode] = 1;
  },

  getMaxPage: () => maxPage[currentMode],
  setMaxPage: (max: number) => {
    maxPage[currentMode] = max;
  },

  getSearchKeyword: () => currentSearchKeyword,
  setSearchKeyword: (keyword: string) => {
    currentSearchKeyword = keyword;
  },
};
