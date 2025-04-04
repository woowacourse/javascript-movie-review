/// <reference types="cypress" />

import TEST_URL from "./constants";

describe("메인 화면 테스트", () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: "GET",
        url: TEST_URL.POPULAR,
      },
      { fixture: "movie-popular.json" }
    ).as("getPopularMovies");

    cy.visit("http://localhost:5173");
  });

  it("영화 목록 API를 호출하면 한 번에 20개씩 목록에 나열되어야 한다", () => {
    cy.wait("@getPopularMovies").then((interception) => {
      const popularMovies = interception.response.body.results;
      cy.wrap(popularMovies).should("have.length", 20);

      expect(popularMovies.length).to.equal(20);
    });
  });

  it("현재 영화 리스트 아래로 스크롤시 추가로 20개의 영화를 보여준다.(무한 스크롤)", () => {
    cy.wait("@getPopularMovies").then((interception) => {
      const popularMovies = interception.response.body.results;
      cy.wrap(popularMovies).should("have.length", 20);

      cy.scrollTo("bottom");

      const popularMovieItems = cy.get(".thumbnail-list > li");
      expect(popularMovieItems.should("have.length", 40));
    });
  });

  it("헤더에 인기순 첫번째 영화의 포스터, 제목, 별점을 보여준다.", () => {
    cy.wait("@getPopularMovies").then((interception) => {
      const popularMovies = interception.response.body.results;
      const topMovie = popularMovies[0];

      cy.get(".overlay-img")
        .invoke("attr", "src")
        .should("eq", `https://image.tmdb.org/t/p/w500${topMovie.poster_path}`);

      cy.get(".title").invoke("text").should("eq", topMovie.title);

      cy.get(".rate-value")
        .invoke("text")
        .should("eq", topMovie.vote_average.toFixed(1));
    });
  });
});

describe("오류 테스트", () => {
  it("메인 화면 -", () => {
    cy.intercept(
      {
        method: "GET",
        url: TEST_URL.POPULAR,
      },
      {
        statusCode: 500, // 오류 상태 코드
        body: "Internal Server Error", // 오류 메시지
      }
    );

    cy.visit("http://localhost:5173");

    // 오류 메시지가 표시되는지 확인
    cy.get(".no-result h2")
      .invoke("text")
      .should("eq", "영화 목록을 가져오지 못했습니다.");
  });
});
