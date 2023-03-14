import { Movies } from "../src/domain/Movies";
import { Movie } from "../src/types";

const movieList: Movie[] = [
  {
    adult: false,
    backdrop_path: "/jr8tSoJGj33XLgFBy6lmZhpGQNu.jpg",
    genre_ids: [16, 12, 35, 10751],
    id: 315162,
    original_language: "en",
    original_title: "Puss in Boots: The Last Wish",
    overview:
      "아홉 개의 목숨 중 단 하나의 목숨만 남은 장화신은 고양이.  마지막 남은 목숨을 지키기 위해 히어로의 삶 대신 반려묘의 삶을 선택한 그에게 찾아온 마지막 기회, 바로 소원을 들어주는 소원별이 있는 곳을 알려주는 지도!  잃어버린 목숨을 되찾고 다시 히어로가 되기를 꿈꾸는 장화신은 고양이는 뜻밖에 동료가 된 앙숙 파트너 '키티 말랑손', 그저 친구들과 함께라면 모든 게 행복한 강아지 '페로'와 함께 소원별을 찾기 위해 길을 떠난다.  그리고 소원별을 노리는 또 다른 빌런들과 마주치게 되는데…",
    popularity: 2531.473,
    poster_path: "/rKgvctIuPXyuqOzCQ16VGdnHxKx.jpg",
    release_date: "2022-12-07",
    title: "장화신은 고양이: 끝내주는 모험",
    video: false,
    vote_average: 8.4,
    vote_count: 4541,
  },
  {
    adult: false,
    backdrop_path: "/22z44LPkMyf5nyyXvv8qQLsbom.jpg",
    genre_ids: [27, 9648, 53],
    id: 631842,
    original_language: "en",
    original_title: "Knock at the Cabin",
    overview:
      "휴가를 떠난 한 가족은 별장에 무단침입한 낯선 방문자들과 대치하게 된다. ‘레너드’(데이브 바티스타)와 낯선 방문자들은 세상의 종말을 막으러 왔다며, 가족 중 한 명을 희생시켜야만 인류의 멸망을 막을 수 있다는 잔혹한 선택을 하게 하는데… 가족을 살리면 인류가 멸망하고, 인류를 살리면 가족이 죽는다!",
    popularity: 2101.02,
    poster_path: "/mCDSOfcVJfMkGUNrNpXWFO7oNBY.jpg",
    release_date: "2023-02-01",
    title: "똑똑똑",
    video: false,
    vote_average: 6.5,
    vote_count: 983,
  },
];

const addedMovie: Movie[] = [
  {
    adult: false,
    backdrop_path: "/xDMIl84Qo5Tsu62c9DGWhmPI67A.jpg",
    genre_ids: [28, 12, 878],
    id: 505642,
    original_language: "en",
    original_title: "Black Panther: Wakanda Forever",
    overview:
      "국왕이자 블랙 팬서인 티찰라의 죽음 이후 수많은 강대국으로부터 위협을 받게 된 와칸다. 라몬다, 슈리 그리고 나키아, 오코예, 음바쿠는 각자 사명감을 갖고 와칸다를 지키기 위해 외로운 싸움을 이어간다. 한편, 비브라늄의 패권을 둘러싼 미스터리한 음모와 함께 깊은 해저에서 모습을 드러낸 최강의 적 네이머와 탈로칸의 전사들은 와칸다를 향해 무차별 공격을 퍼붓기 시작하는데…",
    popularity: 2286.347,
    poster_path: "/3PCRWLeqp5y20k6XVzcamZR3BWF.jpg",
    release_date: "2022-11-09",
    title: "블랙 팬서: 와칸다 포에버",
    video: false,
    vote_average: 7.3,
    vote_count: 4057,
  },
];

const searchMovieList: Movie[] = [
  {
    adult: false,
    backdrop_path: "/pxJbfnMIQQxCrdeLD0zQnWr6ouL.jpg",
    genre_ids: [28, 35, 53],
    id: 1077280,
    original_language: "en",
    original_title: "Die Hart",
    overview:
      "가상의 케빈 하트가 액션 영화 배우가 되기 위해 노력하는 과정을 따라가 보세요. 그는 론 윌콕스가 운영하는 학교에 다니며 업계에서 가장 탐내는 액션 스타가 되기 위한 방법을 배우려고 노력합니다.",
    popularity: 2030.241,
    poster_path: "/1EnBjTJ5utgT1OXYBZ8YwByRCzP.jpg",
    release_date: "2023-02-22",
    title: "다이 하트: 더 무비",
    video: false,
    vote_average: 6.3,
    vote_count: 171,
  },
];

describe("도메인 테스트", () => {
  const movies = new Movies(movieList);

  test("영화 리스트 가져오기 기능 테스트", () => {
    const list = movies.getList();

    expect(list).toEqual(movieList);
  });

  test("영화 리스트 추가 기능 테스트", () => {
    movies.add(addedMovie);

    const list = movies.getList();

    expect(list[list.length - 1].id).toBe(505642);
  });

  test("영화 리스트 리셋 기능 테스트", () => {
    movies.reset(searchMovieList);

    const list = movies.getList();

    expect(list[list.length - 1].id).toBe(1077280);
  });
});
