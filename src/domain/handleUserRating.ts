import { DEFAULT_RATING, MAX_RATING } from "../constants/rating";

import getLocalStorageItem from "./utils/getLocalStorageItem";
import setLocalStorageItem from "./utils/setLocalStorageItem";

const LOCAL_STORAGE_KEY = "userMovieList";

interface userMovie {
  id: number;
  userRating: number;
}

let userMovieList: Map<number, userMovie> = new Map();

const savedList: userMovie[] = getLocalStorageItem(LOCAL_STORAGE_KEY, []);

savedList.forEach(({ id, userRating }) => {
  if (userRating < DEFAULT_RATING) userRating = DEFAULT_RATING;
  if (userRating > MAX_RATING) userRating = MAX_RATING;
  userMovieList.set(id, { id, userRating });
});

const addRating = ({ id, userRating }: userMovie) => {
  const newMovieList = new Map(userMovieList);
  newMovieList.set(id, { id, userRating });
  return newMovieList;
};

export const getUserRating = (id: number) => {
  const movie = userMovieList.get(id);

  if (!movie) {
    return DEFAULT_RATING;
  }

  return movie.userRating;
};

export const setUserRating = ({ id, userRating }: userMovie) => {
  userMovieList = addRating({ id, userRating });
  setLocalStorageItem(LOCAL_STORAGE_KEY, Array.from(userMovieList.values()));
};
