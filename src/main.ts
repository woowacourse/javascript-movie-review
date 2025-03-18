import MovieItem from "./components/MovieItem";

const data = [
  {
    adult: false,
    backdrop_path: "/qUc0Hol3eP74dbW4YyqT6oRLYgT.jpg",
    genre_ids: [878, 35, 12],
    id: 696506,
    original_language: "en",
    original_title: "Mickey 17",
    overview:
      "친구 티모와 함께 차린 마카롱 가게가 쫄딱 망해 거액의 빚을 지고 못 갚으면 죽이겠다는 사채업자를 피해 지구를 떠나야 하는 미키. 기술이 없는 그는, 정치인 마셜의 얼음행성 개척단에서 위험한 일을 도맡고, 죽으면 다시 프린트되는 익스펜더블로 지원한다. 4년의 항해와 얼음행성 니플하임에 도착한 뒤에도 늘 미키를 지켜준 여자친구 나샤. 그와 함께, 미키는 반복되는 죽음과 출력의 사이클에도 익숙해진다. 그러나 미키 17이 얼음행성의 생명체인 크리퍼와 만난 후 죽을 위기에서 돌아와 보니 이미 미키 18이 프린트되어 있다. 행성 당 1명만 허용된 익스펜더블이 둘이 된 멀티플 상황. 둘 중 하나는 죽어야 하는 현실 속에 걷잡을 수 없는 사건이 기다리고 있었으니…",
    popularity: 25.061,
    poster_path: "/7KghOYtsxFquUuw4THbARsSEo6g.jpg",
    release_date: "2025-02-28",
    title: "미키 17",
    video: false,
    vote_average: 7.0,
    vote_count: 692,
  },
  {
    adult: false,
    backdrop_path: "/AuSip6e3uvQgPnnFQjzdTrOVPx7.jpg",
    genre_ids: [16, 28],
    id: 1297763,
    original_language: "ja",
    original_title: "ニンジャバットマン対ヤクザリーグ",
    overview: "",
    popularity: 23.049,
    poster_path: "/y2mQtPz6uDdw4CRpSdU5tlGB2MA.jpg",
    release_date: "2025-03-17",
    title: "ニンジャバットマン対ヤクザリーグ",
    video: false,
    vote_average: 4.2,
    vote_count: 5,
  },
];

const thumbnailList = document.querySelector("ul.thumbnail-list");
data.forEach(({ title, poster_path, vote_average }) => {
  const movieItem = new MovieItem({ title, vote_average, poster_path });
  const movieItemElement = movieItem.create();
  thumbnailList?.appendChild(movieItemElement);
});
