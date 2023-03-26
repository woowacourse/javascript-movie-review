const handleLocalStorage = {
  getAllMovieStar: (): { -readonly [k in keyof ArrayLike<number>]: number } => {
    return JSON.parse(localStorage.getItem('movieStar') as string) || {};
  },

  getMovieStar: (movieId: number) => {
    return handleLocalStorage.getAllMovieStar()[movieId] || 0;
  },

  setMovieStar: (movieId: number, starCount: number) => {
    const movieStar = handleLocalStorage.getAllMovieStar();
    movieStar[movieId] = starCount;

    localStorage.setItem('movieStar', JSON.stringify(movieStar));
  },
};

export default handleLocalStorage;
