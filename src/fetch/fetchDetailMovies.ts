export const fetchDetailMovie = async (movieId: number) => {
  const detailMovieUrl = `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_THDB_API_KEY}`,
    },
  };
  try {
    const response = await fetch(detailMovieUrl, options);
    const { title, release_date, genres, vote_average, overview, poster_path } =
      await response.json();
    return { title, release_date, genres, vote_average, overview, poster_path };
  } catch (error) {
    alert("영화 정보를 불러오는데 실패했습니다.");
  }
};
