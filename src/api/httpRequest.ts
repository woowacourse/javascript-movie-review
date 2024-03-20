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
};

export default httpRequest;
