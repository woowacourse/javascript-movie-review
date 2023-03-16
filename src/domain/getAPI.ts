const API_KEY = process.env.API_KEY ?? prompt('API KEY를 입력해주세요');

const getAPI = {
  popularMovie: (page: number) => {
    return `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=ko-KR&page=${page}`;
  },
  searchMovie: (keyword: string, page: number) =>
    `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=ko-KR&query=${keyword}&page=${page}`,
};

export default getAPI;
