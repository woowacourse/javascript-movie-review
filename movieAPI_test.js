const BASE_URL = "https://api.themoviedb.org/3";

const getMovies = async () => {
  const response = await fetch(
    `${BASE_URL}/movie/popular?api_key=${process.env.MOVIE_API_KEY}&language=ko-KR&page=${curPage}`
  );

  const data = await response.json();

  console.log(data);
};

getMovies();
