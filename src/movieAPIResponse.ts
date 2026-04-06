export const fetchMovies = async (moviePageCount: number) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/popular?language=en-US&page=${moviePageCount}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_TOKEN}`,
        },
      },
    );
    if (!response.ok) {
      throw new Error("[ERROR]인기 영화 불러오기에 실패하였습니다.");
    }
    return await response.json();
  } catch (error) {
    if (error instanceof Error) throw error;
    throw new Error("[ERROR]네트워크 오류가 발생했습니다.");
  }
};

export const fetchSearchedMovies = async (
  searchKeyword: string,
  searchPageCount: number,
) => {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${searchKeyword}&page=${searchPageCount}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_TOKEN}`,
        },
      },
    );
    if (!response.ok) {
      throw new Error("[ERROR]검색 영화 불러오기에 실패하였습니다.");
    }
    return await response.json();
  } catch (error) {
    if (error instanceof Error) throw error;
    throw new Error("[ERROR]네트워크 오류가 발생했습니다.");
  }
};
