const getAPI = {
  popularMovie: (page: number) =>
    `https://api.themoviedb.org/3/movie/popular?api_key=c9b417a74f38d67da13a13b782bc5ce3&language=ko-KRS&page=${page}`,
  searchMovie: (keyword: string, page: number) =>
    `https://api.themoviedb.org/3/search/movie?api_key=0329916a6096551557f3f4edc9e82c57&language=ko-KR&query=${keyword}&page=${page}`,
};

export default getAPI;
