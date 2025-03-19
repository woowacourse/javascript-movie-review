import Button from "./components/Button.ts";
import Header from "./components/Header.ts";
import Input from "./components/Input.ts";
import NavigationBar from "./components/NavigationBar.ts";

document.addEventListener("DOMContentLoaded", () => {
  const input = Input({
    type: "text",
    placeholder: "검색어를 입력하세요",
    onClick: () => {
      console.log("검색 아이콘 클릭");
    },
  });

  const navigationBar = NavigationBar({ input });
  const header = Header({ navigationBar });

  const wrap = document.querySelector("#wrap");
  wrap?.prepend(header);

  const button = Button({
    text: "더 보기",
    onClick: () => {
      console.log("버튼 클릭");
    },
  });

  const section = document.querySelector("section");
  section?.appendChild(button);

  // TMDB API 호출을 위한 설정
  const apiUrl =
    "https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1";
  const bearerToken = import.meta.env.VITE_TMDB_BEARER_TOKEN;

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${bearerToken}`,
    },
  };

  // API 호출 및 영화 데이터 렌더링
  fetch(apiUrl, options)
    .then((res) => {
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      return res.json();
    })
    .then((data) => {
      console.log("Fetched movie data:", data);
      const thumbnailList = document.querySelector(".thumbnail-list");
      if (!thumbnailList) return;

      thumbnailList.innerHTML = "";

      data.results.forEach((movie: any) => {
        console.log(movie);
      });
    })
    .catch((error) => {
      console.error("Error fetching movies:", error);
    });
});
