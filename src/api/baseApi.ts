const TOKEN = import.meta.env.VITE_TMDB_TOKEN;
const BASE_URL = "https://api.themoviedb.org/3";

const baseApi = async (path: string, page: number) => {
  const url = `${BASE_URL}${path}?language=ko-KR&page=${page}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
  };

  const data = await fetch(url, options);
  return data.json();
};

export default baseApi;
