const getPopularMovieList = async () => {
  const TOKEN = import.meta.env.VITE_API_URL;
  const url =
    "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
  };

  const data = await fetch(url, options);
  const movieList = await data.json();

  console.log(movieList);
};

getPopularMovieList();
