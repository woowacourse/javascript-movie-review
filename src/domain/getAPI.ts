const getAPI = {
  popularMovie: (page: number) => {
    return `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=ko-KRS&page=${page}`;
  },
  searchMovie: (keyword: string, page: number) =>
    `https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&language=ko-KR&query=${keyword}&page=${page}`,
};

export default getAPI;
