const API_END_POINT = "https://api.themoviedb.org/3";

const request = async (url: string) => {
  const response = await fetch(url);

  if (response.ok) {
    return response.json();
  }

  alert("요청 실패");
};

export const fetchPopularMovies = (page: number) => {
  const url = `${API_END_POINT}/movie/popular?api_key=${process.env.API_KEY}&language=ko&page=${page}`;

  return request(url);
};

export const fetchSearchMovies = (page: number, keyword: string) => {
  const url = `${API_END_POINT}/search/movie?api_key=${
    process.env.API_KEY
  }&language=ko&page=${page}&query=${encodeURI(keyword)}`;

  return request(url);
};
