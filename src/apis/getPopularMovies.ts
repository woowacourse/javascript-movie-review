export const getPopularMovies = async (page = 1) => {
  const url = `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=${page}`;

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

    const response = await res.json();
    return (
      response ?? {
        results: [],
        page: 1,
        total_pages: 1,
        total_results: 0,
      }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
      return {
        results: [],
        page: 500,
        total_pages: 500,
        total_results: 0,
      };
    }
  }
};
