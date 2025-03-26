export default async function fetchSearchMovies(query: string, page: number) {
  const searchMovieUrl = `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=ko-KR&page=${page}`;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_THDB_API_KEY}`,
    },
  };

  try {
    const response = await fetch(searchMovieUrl, options);
    const { results, total_pages } = await response.json();
    const totalPages = total_pages;

    return { results, totalPages };
  } catch (error) {
    alert("영화 정보를 불러오는데 실패했습니다.");
  }
}
