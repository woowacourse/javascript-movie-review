const API_END_POINT = "https://api.themoviedb.org/3";
const defaultMethodOption = "GET";

const request = async (url: string, method: string) => {
  try {
    const response = await fetch(url, { method });

    if (!response.ok) {
      throw new Error(`${response.status} 에러가 발생했습니다.`);
    }
    return response.json();
  } catch (error: any) {
    if ((error.message = "failed to fetch")) {
      alert("네트워크 연결이 끊어졌습니다.");
    } else {
      alert(error.message);
    }
  }
};

const fetchPopularMovies = (page: number) => {
  const url = `${API_END_POINT}/movie/popular?api_key=${process.env.API_KEY}&language=ko&page=${page}`;

  return request(url, defaultMethodOption);
};

const fetchSearchMovies = (page: number, keyword: string) => {
  const url = `${API_END_POINT}/search/movie?api_key=${
    process.env.API_KEY
  }&language=ko&page=${page}&query=${encodeURI(keyword)}`;

  return request(url, defaultMethodOption);
};

export { fetchPopularMovies, fetchSearchMovies };
