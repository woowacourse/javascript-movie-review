const localStore = {
  getMyMovieRating(movieName: string): number | undefined {
    return Number(localStorage.getItem(movieName));
  },
  setMyMovieRating(movieName: string, rating: number) {
    localStorage.setItem(movieName, rating.toString());
  },
};

export default localStore;
