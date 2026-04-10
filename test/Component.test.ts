import Component from "../src/component.ts";
import { expect, test, describe } from "vitest";

describe("컴포넌트 테스트", () => {
  test("영화 컴포넌트", () => {
    const movieData = {
      poster_path: "엘사.png",
      title: "겨울왕국",
      vote_average: 8.9,
    };
    const movieComponent = Component.movie(movieData);

    expect(movieComponent).contain(
      'src="https://image.tmdb.org/t/p/original/엘사.png"',
    );
    expect(movieComponent).contain("<strong>겨울왕국</strong>");
    expect(movieComponent).contain("<span>8.9</span>");
    expect(movieComponent).contain('alt="겨울왕국"');
  });

  test("영화 포스터 경로가 존재하지 않을때 기본 이미지를 사용한다", () => {
    const movieData = {
      poster_path: null,
      title: "신세계",
      vote_average: 9.5,
    };
    const movieComponent = Component.movie(movieData);
    expect(movieComponent).contain('src="/src/images/no_image_planet.png"');
  });

  test("movie 스캘레톤", () => {
    const movieSkeletonComponent = Component.movieSkeleton();

    expect(movieSkeletonComponent).contain('<li class="skeleton">');
  });

  test("영화 베너 컴포넌트", () => {
    const movieData = {
      poster_path: "안나.png",
      title: "겨울왕국2",
      vote_average: 8.5,
    };
    const movideBannerComponent = Component.movieBanner(movieData);

    expect(movideBannerComponent).contain(
      `<div class="top-rated-movie" style="background-image: url('https://image.tmdb.org/t/p/original/안나.png')">`,
    );
    expect(movideBannerComponent).contain(
      '<span class="rate-value">8.5</span>',
    );
    expect(movideBannerComponent).contain('<div class="title">겨울왕국2</div>');
  });

  test("영화 자세한 정보 컴포넌트", () => {
    const movieData = {
      poster_path: "장경철.png",
      genre_ids: [1, 2, 3],
      title: "악마를 보았다",
      vote_average: 8.3333,
      overview: "국정원 경호요원 ‘수현(이병헌)’은...",
    };
    const movieDetail = Component.movieDetail(movieData);
    console.log(movieDetail);
    expect(movieDetail).contain('<div class="modal">');
    expect(movieDetail).contain(
      '<img src="https://image.tmdb.org/t/p/original/장경철.png" alt="movie poster"/>',
    );
    expect(movieDetail).contain('<p class="category">1,2,3</p>');
    expect(movieDetail).contain("<h2>악마를 보았다</h2>");
    expect(movieDetail).contain("<span>8.3</span>");
    expect(movieDetail).contain(
      '<p class="detail">국정원 경호요원 ‘수현(이병헌)’은...</p>',
    );
  });
});
