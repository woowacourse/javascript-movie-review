const API_KEY = process.env.API_KEY;

export const popularUrl = (page: number) => {
  return `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&page=${page}&include_adult=false`;
};

export const searchUrl = (query: string, page: number) => {
  return `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=ko-KR&query=${query}&page=${page}&include_adult=false`;
};

export const request = async (url: string) => {
  const data = await fetch(url).then((res) => {
    if (res.status === 401) {
      return alert("접근 권한이 없습니다.");
    }

    if (res.status === 404) {
      return alert("없는 페이지입니다.");
    }

    if (!res.ok) {
      return alert("알수 없는 에러가 발생했습니다.");
    }

    return res.json();
  });

  return data;
};
