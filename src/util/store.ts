interface Movie {
  id: number;
  rating: number;
}

type SetItemProp = {
  id: number;
  rating: number;
};

const MOVIE_KEY = "MovieData";

export function updateRating({ id, rating }: SetItemProp) {
  const movieList = getLocalStorageItem(MOVIE_KEY) as Movie[];

  const updatedList = getUpdateMovieList(movieList, { id, rating });
  setLocalStorageItem(MOVIE_KEY, updatedList);
}

export function getRating(id: number): number {
  const movieList = getLocalStorageItem(MOVIE_KEY);
  const movie = getMovie(movieList, id);

  return movie ? Number(movie.rating) : 0;
}

function isExistingById<T extends { id: number | string }>(
  list: T[],
  id: number | string
): boolean {
  return list.some((item) => item.id === id);
}

function getUpdateMovieList(list: Movie[], newItem: Movie): Movie[] {
  const exists = isExistingById(list, newItem.id);

  return exists
    ? list.map((movie) => (movie.id === newItem.id ? newItem : movie))
    : [...list, newItem];
}

function getMovie(movieList: Movie[], id: number) {
  return movieList.find((movie) => movie.id === id);
}

function setLocalStorageItem<T>(key: string, data: T) {
  localStorage.setItem(key, JSON.stringify(data));
}

function getLocalStorageItem(key: string) {
  const data = localStorage.getItem(key);
  if (data) {
    return JSON.parse(data);
  }
  return null;
}
