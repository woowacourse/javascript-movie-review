class Movie {
  async getPopularMovies(page = 1) {
    const movieList = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.MOVIE_API_KEY}&language=ko-KR&page=${page}`
    )
      .then(async (response) => {
        if (response.ok) return response.json();

        const errorMessage = await response.json().then((data) => data.errors);

        throw new Error(errorMessage);
      })
      .catch((error) => alert(error));

    return movieList;
  }

  async findMovies(query: string, page = 1) {}
}

export default Movie;
