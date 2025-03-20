/// <reference types="cypress" />

describe("Fixture를 이용한 E2E 테스트", () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: "GET",
        url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular*/,
      },
      { fixture: "movie-popular.json" }
    ).as("getPopularMovies");

    cy.visit("http://localhost:5173");
  });

  it("영화 목록 API를 호출하면 20개의 영화가 랜더링 되야한다.", () => {
    cy.wait("@getPopularMovies").then((interception) => {
      // interception으로 fixture가 잘 불러와졌는지 확인하는 코드 샘플
      const popularMovies = interception.response?.body.results;
      expect(popularMovies.length).to.equal(20);

      // 20개의 영화가 랜더링 되었는지 확인
      const popularMovieItems = cy.get(".thumbnail-list > li");
      expect(popularMovieItems.should("have.length", 20));
    });
  });
});
