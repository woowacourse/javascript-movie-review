const detailOptions = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${process.env.TOKEN}`,
  },
};

class MovieDetailStore {
  static async fetchMovieDetail(movieId: number | string) {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}?language=ko`, detailOptions);
    return response.json();
  }
}

export default MovieDetailStore;
