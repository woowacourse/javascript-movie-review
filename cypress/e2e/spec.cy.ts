import { Movie, MovieResponse } from "../../src/types";

beforeEach(() => {
  cy.viewport(1500, 1000);

  cy.intercept(
    {
      method: "GET",
      url: /^(?=.*https:\/\/api.themoviedb.org\/3\/movie\/popular)(?=.*page=1)/,
    },
    { fixture: "movie-popular-page1.json" }
  ).as("getPopularMoviesPage1");

  cy.intercept(
    {
      method: "GET",
      url: /^(?=.*https:\/\/api.themoviedb.org\/3\/movie\/popular)(?=.*page=2)/,
    },
    { fixture: "movie-popular-page2.json" }
  ).as("getPopularMoviesPage2");

  cy.intercept(
    {
      method: "GET",
      url: /^(?=.*https:\/\/api.themoviedb.org\/3\/search\/movie)(?=.*query=%EB%B6%84%EB%85%B8%EC%9D%98)/,
    },
    { fixture: "movie-search.json" }
  ).as("getSearchMovies");

  cy.visit("http://localhost:8085/");
});

describe("영화 리뷰 웹 테스트", () => {
  it("처음 접속시 인기영화 정보가 렌더링 된다. (초기 화면이 렌더링 된다.)", () => {
    cy.wait("@getPopularMoviesPage1").then((interception) => {
      const movieItems = interception.response?.body.results;

      movieItems.forEach((item: Movie) => {
        cy.contains(item.title).should("be.visible");
      });
    });
  });

  it("더보기 버튼 클릭시 다음 페이지 정보가 렌더링 된다.", () => {
    cy.get(".btn").click();

    cy.wait("@getPopularMoviesPage2").then((interception) => {
      const movieItems = interception.response?.body.results;

      movieItems.forEach((item: Movie) => {
        cy.contains(item.title).should("be.visible");
      });
    });
  });

  it("검색어 입력시 검색 결과가 렌더링 된다.", () => {
    cy.get("input").type("분노의");
    cy.get("form").submit();

    cy.wait("@getSearchMovies").then((interception) => {
      const movieItems = interception.response?.body.results;

      movieItems.forEach((item: Movie) => {
        cy.contains(item.title).should("be.visible");
      });
    });
  });

  it("로고 클릭시 인기영화 정보가 렌더링 된다. (초기 화면이 렌더링 된다.)", () => {
    cy.get(".logo").click();

    cy.wait("@getPopularMoviesPage1").then((interception) => {
      const movieItems = interception.response?.body.results;

      movieItems.forEach((item: Movie) => {
        cy.contains(item.title).should("be.visible");
      });
    });
  });
});
