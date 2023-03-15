import "./index.css";
import MovieItem from "./MovieItem";
import SkeletonList from "./SkeletonList";

// const temp = async (type, pageNumber) => {
//     const newHtml = awaitfetch(
//       "https://api.themoviedb.org/3/movie/popular?api_key=ef7c54f21b65b1fe66b6cf70349fa55f&language=ko&page=1"
//     )
//       .then((response) => response.json())
//       .then((data) => {
//         // return data.results.map((item) => item.title).join("<br>");
//         return `
//           <div>
//             <p>{data.asd}</p>
//             <p>{data.asd}</p>
//           </div>
//         `;
//       });

//     document.querySelector("#temp").innerHTML = newHTML;
//   }

//   return `<div id="temp">hi~hi~hi~hi~hi~hi~hi~hi~hi~hi~hi~hi~hi~hi~hi~hi~hi~hi~hi~hi~hi~hi~hi~</div>`;
// };

const MovieList = (type, searchKeyword) => {
  const template = () => {
    fetch(
      "https://api.themoviedb.org/3/movie/popular?api_key=ef7c54f21b65b1fe66b6cf70349fa55f&language=ko&page=1"
    )
      .then((response) => response.json())
      .then((data) => {
        document.querySelector("#temp").innerHTML = data.results
          .map((item) => item.title)
          .join("<br>");
      });
    return `<div id='temp' class='item-list'>${SkeletonList()}</div>`;
  };

  return `
        <section class="item-view">
          <h2>${
            type === "popular"
              ? "지금 인기있는 영화"
              : `"${searchKeyword}" 검색결과`
          }</h2>
          <ul class="item-list">
            ${template()}
          </ul>
          <button class="btn primary full-width">더 보기</button>
        </section>
      `;
};

export default MovieList;
