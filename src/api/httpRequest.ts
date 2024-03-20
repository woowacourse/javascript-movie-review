const httpRequest = {
  async fetchPopularMovies(page: number) {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=${page}&api_key=${process.env.API_KEY}`,
    );
    if (response.status !== 200) throw new Error();

    const responseData = await response.json();
    const popularMovieList = responseData.results;
    return popularMovieList;
  },

  async fetchSearchedMovies(page: number, input: string) {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${input}&include_adult=false&language=ko-KR&page=${page}&api_key=${process.env.API_KEY}`,
    );
    if (response.status !== 200) throw new Error();

    const responseData = await response.json();
    const searchedMovieList = responseData.results;
    return searchedMovieList;
  },
};

export default httpRequest;
