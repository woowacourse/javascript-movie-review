/// <reference types="cypress" />

describe("Fixture을 리용한 목록 목킹 E2E테스트", () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: "GET",
        url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular*/,
      },
      { fixture: "movie-popular-page1.json" }
    ).as("getPopularMoviesPage1");

    cy.visit("http://localhost:5173/");

    cy.intercept(
      {
        method: "GET",
        url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular.*page=2/,
      },
      { fixture: "movie-popular-page2.json" }
    ).as("getPopularMoviesPage2");
  });

  it("영화 데이가 잘 가져와지는지 확인할 수 있다.", () => {
    cy.wait("@getPopularMoviesPage1").then((interception) => {
      if (!interception.response) return;
      const popularMovies = interception.response.body.results;
      expect(popularMovies.length).to.equal(20);
    });
  });

  it("사용자가 영화 목록 20개를 볼 수 있다.", () => {
    cy.wait("@getPopularMoviesPage1").then((interception) => {
      if (!interception.response) return;
      const popularMovies = interception.response.body.results;
      expect(popularMovies.length).to.equal(20);

      const popularMovieItems = cy.get(".thumbnail-list > li");
      expect(popularMovieItems.should("have.length", 20));
    });
  });

  it("사용자가 더 보기를 누르면 다음 목록을 보여준다.", () => {
    cy.wait("@getPopularMoviesPage1");

    cy.get(".show-more").should("exist");
    cy.get(".show-more").click();

    cy.wait("@getPopularMoviesPage2");

    cy.get(".thumbnail-list > li").should("have.length", 40);
  });
});

describe("Fixture을 리용한 검색 목킹 E2E테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173/");
  });

  it("검색어 '미키' 입력 시 20개의 결과를 보여준다.", () => {
    cy.intercept(
      {
        method: "GET",
        pathname: "/3/search/movie",
        query: {
          query: "미키",
        },
      },
      { fixture: "movie-title-miki.json" }
    ).as("getSearchMiki");

    cy.search("미키");

    cy.wait("@getSearchMiki");

    cy.get(".thumbnail-list > li").should("have.length", 20);
  });

  it("검색어를 입력했을 때 목록이 없다면 빈 화면을 보여준다.", () => {
    cy.intercept(
      {
        method: "GET",
        pathname: "/3/search/movie",
        query: {
          query: "없는제목우아아아아아아",
        },
      },
      { fixture: "movie-title-none.json" }
    ).as("getSearchMovieNone");

    cy.search("없는제목우아아아아아아");

    cy.wait("@getSearchMovieNone");

    cy.get(".error").contains("검색 결과가 없습니다.").should("exist");
  });
});
