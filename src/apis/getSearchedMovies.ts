export const getSearchedMovies = async (
  searchKeyword: string,
  pageNumber = 1
) => {
  console.log("searchKeyword, pageNumber", searchKeyword, pageNumber);
  const query = encodeURIComponent(searchKeyword); // 사용자 입력값을 인코딩

  const url = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=ko-KR&page=${pageNumber}`;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
    },
  };

  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      throw new Error("성공적으로 받아오지 못했습니다.");
    }

    const { results } = await res.json();
    return results;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
};
