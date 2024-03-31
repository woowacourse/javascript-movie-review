import { MovieItemProps, StarRate, TotalMovieItemProps } from '../types/movie';
import addStarRatePropertyFromOriginalData from './addStarRatePropertyFromOriginalData';
import LocalStorageService from './LocalStorageService';
import getTargetMovieAllGenres from './getAllMovieGenres';

const MovieStorageService = {
  addData(data: MovieItemProps[]) {
    const formattedData = addStarRatePropertyFromOriginalData(data);

    const addedData = this.filterExistingData(formattedData);

    return addedData;
  },

  updateStarRate(movieTitle: string, star_rating: StarRate) {
    const existingData = LocalStorageService.getData();
    const updatedData = existingData.map((movie) => {
      if (movie.title === movieTitle) {
        return { ...movie, star_rating };
      }
      return movie;
    });
    LocalStorageService.setData(updatedData);
  },

  filterExistingData(data: TotalMovieItemProps[]) {
    const existingData = LocalStorageService.getData();
    const newData = data.filter((newItem) => !existingData.some((existingItem) => existingItem.id === newItem.id));
    if (!newData.length) return data;

    const updatedData = [...existingData, ...newData];
    LocalStorageService.setData(updatedData);

    return newData;
  },

  /* eslint-disable  max-lines-per-function */
  async getDataFromMovieId(movieId: number) {
    const existingData = LocalStorageService.getData();
    const targetData = existingData.find((movie) => movie.id === movieId);
    if (!targetData) return;

    const { title, genre_ids, vote_average, poster_path, overview, star_rating } = targetData;
    const genres = await getTargetMovieAllGenres(genre_ids);

    return {
      title,
      genres,
      vote_average,
      poster_path,
      overview,
      star_rating,
    };
  },
};

export default MovieStorageService;
