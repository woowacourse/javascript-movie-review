import fetchSearchMovies from "../fetch/fetchSearchMovies";
import fetchPopularMovies from "../fetch/fetchPopularMovies";

const currentPage = 1;

const deleteParams = async () => {
  let fetchedMovies;

  try {
    const params = new URLSearchParams(window.location.search);

    if (params.has("query")) {
      fetchedMovies = await fetchSearchMovies(params.get("query"), currentPage);
    } else {
      fetchedMovies = await fetchPopularMovies(currentPage);
    }
  } catch (error) {
    console.error("영화 데이터를 불러오는 중 에러가 발생했습니다:", error);
    // 사용자에게 알려주거나 fallback 처리
    fetchedMovies = []; // 에러 시 빈 배열로 대체하거나
    // 또는 에러 메시지를 UI에 표시할 수 있는 상태로 전달
  }
};

export default deleteParams;

// const deleteParams = () => {
//   const params = new URLSearchParams(window.location.search);

//   if (params.has("query")) {
//     params.delete("query");
//     window.history.replaceState(
//       {},
//       "",
//       `${window.location.pathname}?${params.toString()}`
//     );
//   }
// };

// export default deleteParams;

// if (params.has("query")) {
//   fetchedMovies = await fetchSearchMovies(params.get("query"), currentPage);
// } else {
//   fetchedMovies = await fetchPopularMovies(currentPage);
// }

// let fetchedMovies;

// try {
//   const params = new URLSearchParams(window.location.search);

//   if (params.has("query")) {
//     fetchedMovies = await fetchSearchMovies(params.get("query"), currentPage);
//   } else {
//     fetchedMovies = await fetchPopularMovies(currentPage);
//   }
// } catch (error) {
//   console.error("영화 데이터를 불러오는 중 에러가 발생했습니다:", error);
//   // 사용자에게 알려주거나 fallback 처리
//   fetchedMovies = []; // 에러 시 빈 배열로 대체하거나
//   // 또는 에러 메시지를 UI에 표시할 수 있는 상태로 전달
// }

// import { fetchPopularMovies, fetchSearchMovies } from "./api"; // 경로는 상황에 따라 조정

// const currentPage = 1; // 이 값은 실제 로직에서 동적으로 정해질 수도 있음

// const fetchMovies = async () => {
//   let fetchedMovies;

//   try {
//     const params = new URLSearchParams(window.location.search);

//     if (params.has("query")) {
//       fetchedMovies = await fetchSearchMovies(params.get("query"), currentPage);
//     } else {
//       fetchedMovies = await fetchPopularMovies(currentPage);
//     }

//     console.log(fetchedMovies); // 받아온 데이터 확인
//   } catch (error) {
//     console.error("영화 데이터를 불러오는 중 에러가 발생했습니다:", error);
//     fetchedMovies = [];
//   }
// };

// fetchMovies();
