const fetchMovies = async (endpoint: string) => {
  const url = `https://api.themoviedb.org/3/${endpoint}`;

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
      response ?? { results: [], page: 1, total_pages: 1, total_results: 0 }
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
  }
};

export default fetchMovies;
