// const logo = document.querySelector(".logo") as HTMLElement;

// 버튼 클릭 시 홈으로 이동
// TODO: 이미지 클릭 시 검색 기능 오류 수정
// logo.addEventListener("click", async () => {
//   const MovieListInstance = new MovieList();
//   MovieListInstance.renderSkeleton();
//   MovieListInstance.movieList!.innerHTML = "";
//   MovieListInstance.movieContainer!.innerHTML = "";
//   page = 1;
//   currentSearchQuery = "";

//   const mainTitle = document.querySelector(".main-title") as HTMLElement;
//   mainTitle.textContent = "지금 인기 있는 영화";

//   const data: { results: Movie[]; total_pages: number } =
//     await fetchMoviesApi("movie/popular", page);
//   Header.render(data.results[0]);

//   await fetchApi();
// });
