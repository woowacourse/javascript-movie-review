export const mostPopular = async (pageNumber: number) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=ko-KR&page=${pageNumber}`,
    { method: "GET" }
  );
  const result = await response.json();

  return result;
};

export const search = async (query: String, pageNumber: number) => {
  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&language=ko-KR&query=${query}&page=${pageNumber}&include_adult=false`,
    { method: "GET" }
  );
  const result = await response.json();

  return result;
};
