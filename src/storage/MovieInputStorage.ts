const MovieInputStorage = {
  getMovieInput(movieId: number): IMovieInput {
    const moviesData = localStorage.getItem("movieDetails");
    if (!moviesData) return {};

    const movies = JSON.parse(moviesData);
    const movieInput = movies.find(
      (movie: IMovieInput) => movie.movieId === movieId
    );

    if (!movieInput) return {};
    return movieInput;
  },

  getAllMovieInput(): IMovieInput[] {
    const allMovieInput = localStorage.getItem("movieDetails"); // TODO: 상수화

    if (!allMovieInput) return [];

    return JSON.parse(allMovieInput);
  },

  setMovieDetail(movieInput: IMovieInput) {
    console.log("세팅: ", movieInput.movieId);

    const allMovieInput = MovieInputStorage.getAllMovieInput();
    const existingMovieIndex = allMovieInput.findIndex(
      (input) => input.movieId === movieInput.movieId
    );

    if (existingMovieIndex !== -1) {
      allMovieInput[existingMovieIndex] = movieInput;
    } else {
      allMovieInput.push(movieInput);
    }

    localStorage.setItem("movieDetails", JSON.stringify(allMovieInput));
  },
};

export default MovieInputStorage;
