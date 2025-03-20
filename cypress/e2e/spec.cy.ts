/// <reference types="cypress" />

describe("Fixture를 이용한 E2E 테스트", () => {
  beforeEach(() => {
    // 첫 번째 요청 (초기 로딩)
    cy.intercept(
      "GET",
      /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular(\?.*)?$/,
      { fixture: "movie-popular.json" }
    ).as("getPopularMovies");

    cy.intercept(
      "GET",
      /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular\?language=ko-KR&page=2$/,
      { fixture: "movie-popular-page2.json" }
    ).as("getPopularMoviesPage2");

    cy.visit("http://localhost:5173");
  });

  it("영화 목록 API를 호출하면 20개의 영화가 랜더링 되어야 한다.", () => {
    cy.wait("@getPopularMovies").then((interception) => {
      // Fixture가 정상적으로 불러와졌는지 확인
      const popularMovies = interception.response?.body.results;
      expect(popularMovies.length).to.equal(20);
    });

    // 영화 목록이 정상적으로 20개 렌더링 되는지 확인
    cy.get(".thumbnail-list > li").should("have.length", 20);
  });

  it("더보기 버튼 클릭 시 20개의 영화가 추가된다.", () => {
    // 첫 번째 API 응답 기다리기
    cy.wait("@getPopularMovies");
    cy.get(".thumbnail-list > li").should("have.length", 20);

    // 더보기 버튼 클릭
    cy.get(".more-button").should("exist").click();

    // 두 번째 API 응답 기다리기
    cy.wait("@getPopularMoviesPage2");

    // 영화 개수가 40개인지 확인
    cy.get(".thumbnail-list > li").should("have.length", 40);
  });
});
