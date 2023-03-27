export const sliceSting = (word: string): string => {
  const LIMIT = 27;
  if (word.length > LIMIT) {
    return `${word.slice(0, LIMIT)}···`;
  }

  return word;
};

export const sliceScore = (score: string): string => {
  const SLICE_START = 0;
  const SLICE_END = 3;

  return score.slice(SLICE_START, SLICE_END);
};

export const getHashURLParams = (): { searchWord: string | null; movieId: string | null } => {
  const path = window.location.hash.replace('#', '');
  const URL = new URLSearchParams(path);

  const searchWord = URL.get('q');
  const movieId = URL.get('id');

  return { searchWord, movieId };
};

export const setHashURL = (): void => {
  const { searchWord } = getHashURLParams();

  if (searchWord) {
    window.location.hash = `?q=${searchWord}`;
    return;
  }

  window.location.hash = ' ';
};
