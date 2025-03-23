/// <reference types="cypress" />

describe("메인 화면 테스트", () => {
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

  it("영화 목록 API를 호출하면 한 번에 20개씩 목록에 나열되어야 한다", () => {
    cy.wait("@getPopularMovies").then((interception) => {
      const popularMovies = interception.response?.body.results;
      cy.wrap(popularMovies).should("have.length", 20);

      const popularMovieItems = cy.get(".thumbnail-list > li");
      expect(popularMovies.length).to.equal(20);
    });
  });

  it("더보기 클릭시 다음 페이지의 영화 20개 가져와서 보여준다.", () => {
    cy.get(".load-more").click();

    cy.wait("@getPopularMovies").then((interception) => {
      const popularMovies = interception.response?.body.results;
      cy.wrap(popularMovies).should("have.length", 20);

      const popularMovieItems = cy.get(".thumbnail-list > li");
      expect(popularMovieItems.should("have.length", 40));
    });
  });

  it("헤더에 인기순 첫번째 영화의 포스터, 제목, 별점을 보여준다.", () => {
    cy.wait("@getPopularMovies").then((interception) => {
      const popularMovies = interception.response?.body.results;
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
        url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular*/,
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
