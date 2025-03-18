import Header from "./UI/Header/Header";
import Movie from "./UI/Movie/MovieItem";
import Thumbnail from "./UI/Thumbnail/Thumbnail";
import MovieListSection from "./MovieListSection/MovieListSection";
import Button from "./Button/Button";

const movie = {
  page: 2,
  results: [
    {
      adult: false,
      backdrop_path: "/2n7lYEeIbucsEQCswRcVB6ZYmMP.jpg",
      genre_ids: [878, 12, 18],
      id: 777443,
      original_language: "en",
      original_title: "The Electric State",
      overview:
        "고아가 된 10대 소녀. 오래전 잃어버린 남동생을 찾아 미스터리한 로봇과 함께 길을 떠나는데. 그 여정에서 한 밀수꾼과 그의 재치 있는 조수를 만나 동행이 된다.",
      popularity: 20.545,
      poster_path: "/wt0BDf8ItIHDCDCj72eGLco2xff.jpg",
      release_date: "2025-03-07",
      title: "일렉트릭 스테이트",
      video: false,
      vote_average: 6.807,
      vote_count: 396,
    },
    {
      adult: false,
      backdrop_path: "/2siOHQYDG7gCQB6g69g2pTZiSia.jpg",
      genre_ids: [10751, 14],
      id: 447273,
      original_language: "en",
      original_title: "Snow White",
      overview:
        "눈보라가 몰아치던 겨울 밤 태어난 백설공주. 온정이 넘치던 왕국에서 모두의 사랑을 받았지만, 강력한 어둠의 힘으로 왕국을 빼앗은 여왕의 위협에 숲으로 도망친다. 마법의 숲에서 간신히 살아남은 백설공주는 신비로운 일곱 광부들과 만나게 되며 새로운 세상을 마주하고, 마음속 깊이 숨겨진 용기와 선한 힘을 깨닫게 된다. 그리고 마침내, 빼앗긴 왕국을 되찾기 위해 여왕과 맞서 싸우기로 결심하는데…",
      popularity: 17.184,
      poster_path: "/7EruTgYzDFM8kWhr2ysuuwoXFqk.jpg",
      release_date: "2025-03-19",
      title: "백설공주",
      video: false,
      vote_average: 3,
      vote_count: 12,
    },
    {
      adult: false,
      backdrop_path: "/9nhjGaFLKtddDPtPaX5EmKqsWdH.jpg",
      genre_ids: [10749, 878, 53],
      id: 950396,
      original_language: "en",
      original_title: "The Gorge",
      overview:
        "고도의 훈련을 받은 두 요원는 비밀스러운 협곡의 양쪽을 지키는 임무를 받은 후 멀리서 서로와 서서히 친해진다. 도사리고 있던 악이 드러나자, 둘은 협곡 안의 위험으로부터 살아남기 위해 협력해야만 한다.",
      popularity: 12.915,
      poster_path: "/fhPj5pWbCoVoz8sehfaCeIWWFxc.jpg",
      release_date: "2025-02-13",
      title: "'더 캐니언' - The Gorge",
      video: false,
      vote_average: 7.759,
      vote_count: 2001,
    },
    {
      adult: false,
      backdrop_path: null,
      genre_ids: [99, 10770],
      id: 1442200,
      original_language: "ca",
      original_title: "Revolució 304",
      overview: "",
      popularity: 21.168,
      poster_path: null,
      release_date: "2025-03-18",
      title: "Revolució 304",
      video: false,
      vote_average: 0,
      vote_count: 0,
    },
    {
      adult: false,
      backdrop_path: "/axTt8unBOfjEZaxrx2xzklAqo7r.jpg",
      genre_ids: [27, 53],
      id: 1439804,
      original_language: "en",
      original_title: "Spider in the Cupboard",
      overview: "",
      popularity: 21.164,
      poster_path: "/9lKBcNmWdSbODDuF6TBO6UZvAyL.jpg",
      release_date: "2025-03-18",
      title: "Spider in the Cupboard",
      video: false,
      vote_average: 4,
      vote_count: 1,
    },
    {
      adult: false,
      backdrop_path: null,
      genre_ids: [99],
      id: 1437920,
      original_language: "en",
      original_title: "Centered: Joe Lieberman",
      overview: "",
      popularity: 21.164,
      poster_path: "/pGeRaZEmOo46DhgRePw4uAUSnkJ.jpg",
      release_date: "2025-03-18",
      title: "Centered: Joe Lieberman",
      video: false,
      vote_average: 8.5,
      vote_count: 2,
    },
    {
      adult: false,
      backdrop_path: "/ApBJ1YzoJsDBe8HjZaDTgqTCzMv.jpg",
      genre_ids: [99],
      id: 1437701,
      original_language: "en",
      original_title: "Leaving Neverland 2: Surviving Michael Jackson",
      overview: "",
      popularity: 21.162,
      poster_path: "/wPmKY6KaLj3PEPoDuy0tAX4MKYs.jpg",
      release_date: "2025-03-18",
      title: "Leaving Neverland 2: Surviving Michael Jackson",
      video: false,
      vote_average: 7,
      vote_count: 2,
    },
    {
      adult: false,
      backdrop_path: "/273gJEUf5n8sZZ30ENpGyTLpDjR.jpg",
      genre_ids: [99],
      id: 1437446,
      original_language: "en",
      original_title: "The Twister: Caught in the Storm",
      overview:
        "2011년 5월, 강력한 토네이도가 미주리주 조플린을 휩쓸었다. 손에 땀을 쥐게 하는 생생한 당시 영상을 바탕으로, 치명적인 토네이도 속으로 들어가는 다큐멘터리.",
      popularity: 21.162,
      poster_path: "/xu7JiLVSXW0PSLCJMwqLKAAJGM2.jpg",
      release_date: "2025-03-18",
      title: "토네이도: 폭풍에 갇히다",
      video: false,
      vote_average: 7,
      vote_count: 1,
    },
    {
      adult: false,
      backdrop_path: null,
      genre_ids: [53],
      id: 1436099,
      original_language: "en",
      original_title: "Act of Kindness",
      overview: "",
      popularity: 21.162,
      poster_path: "/jC9eJYTxvREpBeaR3KJFv3SUq4o.jpg",
      release_date: "2025-03-18",
      title: "Act of Kindness",
      video: false,
      vote_average: 0,
      vote_count: 0,
    },
    {
      adult: false,
      backdrop_path: "/sBtuuQ2MPliv76mjckkfwB3mNNO.jpg",
      genre_ids: [99],
      id: 1417181,
      original_language: "en",
      original_title: "Dawn of Impressionism: Paris 1874",
      overview: "",
      popularity: 21.143,
      poster_path: "/lSU85MrxOtlrvtiRlI9GTPBGiwK.jpg",
      release_date: "2025-03-18",
      title: "Dawn of Impressionism: Paris 1874",
      video: false,
      vote_average: 0,
      vote_count: 0,
    },
    {
      adult: false,
      backdrop_path: "/vnNLcHsXQ5N9dDLsNJW2Bm8UNmG.jpg",
      genre_ids: [99],
      id: 1204967,
      original_language: "en",
      original_title: "USAH: Uncommon Stories of American Horror",
      overview: "",
      popularity: 21.088,
      poster_path: "/FDGnXfWwRJETNa0TP4xq2Sjt5k.jpg",
      release_date: "2025-03-18",
      title: "USAH: Uncommon Stories of American Horror",
      video: false,
      vote_average: 0,
      vote_count: 0,
    },
    {
      adult: false,
      backdrop_path: null,
      genre_ids: [53, 27],
      id: 675776,
      original_language: "en",
      original_title: "Persona",
      overview: "",
      popularity: 21.06,
      poster_path: null,
      release_date: "2025-03-18",
      title: "Persona",
      video: false,
      vote_average: 0,
      vote_count: 0,
    },
    {
      adult: false,
      backdrop_path: "/nHCEf4DG2CgaCfKVMozOBGJAw7e.jpg",
      genre_ids: [],
      id: 1445505,
      original_language: "ja",
      original_title:
        "仮面ライダーガヴ　ＧＲＡＤＵＡＴＩＯＮＳ おかしなスクールデイズ",
      overview: "",
      popularity: 12.057,
      poster_path: "/2jjz1q5zBKIuC9lcTJOyAefUJf1.jpg",
      release_date: "2025-03-16",
      title: "仮面ライダーガヴ　ＧＲＡＤＵＡＴＩＯＮＳ おかしなスクールデイズ",
      video: false,
      vote_average: 0,
      vote_count: 0,
    },
    {
      adult: false,
      backdrop_path: "/m6VEymThX62GkUVCBnSykRAS9cG.jpg",
      genre_ids: [10402],
      id: 1286773,
      original_language: "de",
      original_title: "The Metropolitan Opera: Fidelio",
      overview:
        "메트의 새로운 스타 소프라노 리제 다비드센의 레오노레. 정치범으로 지하감옥에 갇힌 남편을 구하는 아내의 미션! 베토벤이 작곡한 유일한 오페라 <피델리오>의 관현악적 매력!",
      popularity: 11.995,
      poster_path: "/zTdZGmVgjFow5MbKbq0NcIlXDtM.jpg",
      release_date: "2025-03-15",
      title: "피델리오",
      video: false,
      vote_average: 7.4,
      vote_count: 7,
    },
    {
      adult: false,
      backdrop_path: "/fGQCss2nAosaRfaa4NXyr0ZfiEB.jpg",
      genre_ids: [10770, 35, 10749],
      id: 1418287,
      original_language: "en",
      original_title: "Royal-ish",
      overview: "",
      popularity: 9.001,
      poster_path: "/eviXuwmjoxSRzAz0sdkkvOEjNgh.jpg",
      release_date: "2025-03-15",
      title: "Royal-ish",
      video: false,
      vote_average: 7,
      vote_count: 1,
    },
    {
      adult: false,
      backdrop_path: "/xrahxwR14YhmrvH8kC4j1jpozpy.jpg",
      genre_ids: [18, 27],
      id: 1315476,
      original_language: "bg",
      original_title: "Paradiso",
      overview: "",
      popularity: 9.596,
      poster_path: "/jN5fvKt25DtWVoPTRaEQgGmmMqd.jpg",
      release_date: "2025-03-15",
      title: "Paradiso",
      video: false,
      vote_average: 5,
      vote_count: 5,
    },
    {
      adult: false,
      backdrop_path: null,
      genre_ids: [],
      id: 1325495,
      original_language: "ja",
      original_title: "逃走",
      overview: "",
      popularity: 8.999,
      poster_path: "/l8v8L2OC95tB4za2oex6wye4TwW.jpg",
      release_date: "2025-03-15",
      title: "逃走",
      video: false,
      vote_average: 7,
      vote_count: 2,
    },
    {
      adult: false,
      backdrop_path: "/pr1tVdPrFUn85fBsA1q5DreDjqd.jpg",
      genre_ids: [27, 10749],
      id: 1340727,
      original_language: "en",
      original_title: "Afterwards",
      overview: "",
      popularity: 8.992,
      poster_path: "/nR5oqvfkWw94vVChRRiZRwEXhCL.jpg",
      release_date: "2025-03-15",
      title: "Afterwards",
      video: false,
      vote_average: 7.5,
      vote_count: 2,
    },
    {
      adult: false,
      backdrop_path: null,
      genre_ids: [10402],
      id: 1359744,
      original_language: "en",
      original_title: "Myself Two Seconds to Cry",
      overview: "",
      popularity: 8.985,
      poster_path: "/cnqztuI8rYP2XkGDvhMUmLbqnNe.jpg",
      release_date: "2025-03-15",
      title: "Myself Two Seconds to Cry",
      video: false,
      vote_average: 6,
      vote_count: 2,
    },
    {
      adult: false,
      backdrop_path: "/n8HIfpC7nsVOrK8dWb8DHl01jQM.jpg",
      genre_ids: [99],
      id: 1368096,
      original_language: "fr",
      original_title: "Vodu Entre deux mondes",
      overview: "",
      popularity: 9.261,
      poster_path: "/pgFFAiInWaxkK3DDceITw3wUPKM.jpg",
      release_date: "2025-03-15",
      title: "Vodu Entre deux mondes",
      video: false,
      vote_average: 7.5,
      vote_count: 3,
    },
  ],
  total_pages: 49234,
  total_results: 984674,
};

const body = document.querySelector("body");
console.log(body);

const $header = new Header().render();
// const $thumbnail = new Thumbnail().render();
// const $movie = new Movie().render();
// console.log($movie);

const $movieListSection = new MovieListSection(
  "인기순",
  movie.results
).render();

const $moreButton = new Button().render();

console.log($movieListSection);
if (body) {
  body.innerHTML = "";
  body.append($header, $movieListSection, $moreButton);
}
