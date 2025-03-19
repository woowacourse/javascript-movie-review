import Header from "./components/Header.ts";
import NavigationBar from "./components/NavigationBar.ts";
import MovieItem from "./components/MovieItem.ts";
import Input from "./components/Input.ts";
import Button from "./components/Button.ts";
import fetchMovies from "./api/http.ts";

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

  fetchMovies()
    .then((data: any) => {
      // console.log("Fetched movie data:", data);
      const thumbnailList = document.querySelector(".thumbnail-list");
      if (!thumbnailList) return;

      thumbnailList.innerHTML = "";
      data.results.forEach((movie: any) => {
        console.log(movie);

        const movieItem = MovieItem({
          rate: movie.vote_average,
          title: movie.title,
          imgSrc: movie.poster_path,
        });

        thumbnailList.appendChild(movieItem);
      });
    })
    .catch((error: Error) => {
      console.error("Error in main.ts:", error);
    });
});
