import { MovieScore } from './types/movie';

const MOVIE_DATA = 'movieData';

const storage = {
  setData(movieScore: MovieScore) {
    const localStorageData = localStorage.getItem(MOVIE_DATA);

    if (localStorageData === null) {
      localStorage.setItem(MOVIE_DATA, JSON.stringify([movieScore]));
      return;
    }

    const existingData: MovieScore[] = JSON.parse(localStorageData!);
    let isDuplicate = false;
    const newData = existingData.map((data: MovieScore) => {
      if (data.movie.title === movieScore.movie.title) {
        isDuplicate = true;
        return movieScore;
      }
      return data;
    });

    if (!isDuplicate) {
      newData.push(movieScore);
    }

    localStorage.setItem(MOVIE_DATA, JSON.stringify(newData));
  },

  getData() {
    const data: MovieScore[] = JSON.parse(localStorage.getItem(MOVIE_DATA)!);
    return data;
  },
};

export default storage;
