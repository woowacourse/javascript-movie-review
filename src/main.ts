import Header from "./component/common/Header.js";
import MovieLayout from "./component/common/MovieLayout.js";
import clickEvent from "./util/clickEvent.js";
import submitEvent from "./util/submitEvent.js";
import { fetchPopularMovies } from "./api/fetch.js";

addEventListener("load", async() => {
  const movieData = await fetchPopularMovies(1);
  const movieLayout = new MovieLayout(movieData.results);
  await submitEvent(movieLayout);
  clickEvent(movieLayout);
  Header();


});


const skeletonItem: NodeListOf<HTMLElement> = document.querySelectorAll('.skeleton_loading');

const hideskeleton = (): void => {
  console.log(skeletonItem);
    skeletonItem.forEach((element: HTMLElement) => {
        element.style.transition = 'opacity 0.5s'; // 애니메이션 효과 설정
        element.style.opacity = '0'; // 점차 사라지도록 함
        setTimeout(() => {
            element.style.display = 'none'; // 완전히 사라지면 display 속성 제거
        }, 50000);
    });
};

window.onload = (): number => setTimeout(hideskeleton, 2000);
