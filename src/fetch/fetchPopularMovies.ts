export default async function fetchPopularMovies(page: number) {
  const popularMovieUrl = `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=${page}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_THDB_API_KEY}`,
    },
  };
  try {
    const response = await fetch(popularMovieUrl, options);
    const { results, total_pages } = await response.json();
    const totalPages = total_pages;
    return { results, totalPages };
  } catch (error) {
    alert("영화 정보를 불러오는데 실패했습니다.");
  }
}
