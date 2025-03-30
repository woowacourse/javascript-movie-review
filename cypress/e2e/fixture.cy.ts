import { ITEMS } from "../../src/constants/movie.ts";

/// <reference types="cypress" />

describe("Fixture를 이용한 테스트", () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: "GET",
        url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular*/,
      },
      { fixture: "movie-popular.json" }
    ).as("getPopularMovies");

    cy.intercept(
      {
        method: "GET",
        url: /^https:\/\/api\.themoviedb\.org\/3\/search\/movie\?.*page=1.*/,
      },
      { fixture: "movie-search-first.json" }
    ).as("getFirstSearchedMovies");

    cy.intercept(
      {
        method: "GET",
        url: /^https:\/\/api\.themoviedb\.org\/3\/search\/movie\?.*page=2.*/,
      },
      { fixture: "movie-search-second.json" }
    ).as("getSecondSearchedMovies");

    cy.intercept(
      {
        method: "GET",
        url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/\d+\?.*/,
      },
      { fixture: "movie-details.json" }
    ).as("getMovieDetails");

    cy.visit("http://localhost:5173");
  });

  it(`영화 목록 API를 호출하면 한 번에 ${ITEMS.perPage}개씩 목록에 나열되어야 한다`, () => {
    cy.wait("@getPopularMovies").then((interception) => {
      // interception으로 fixture가 잘 불러와졌는지 확인하는 코드 샘플
      const popularMovies = interception.response?.body.results;
      expect(popularMovies.length).to.equal(ITEMS.perPage);

      // 제대로 렌더링이 되었는지 테스트하는 코드 샘플
      const popularMovieItems = cy.get(".thumbnail-list > li");
      expect(popularMovieItems.should("have.length", ITEMS.perPage));
    });
  });

  it("영화 검색 API를 호출하면 검색 결과가 보인다.", () => {
    cy.get("#search").click();

    cy.wait("@getFirstSearchedMovies").then((interception) => {
      const searchedMovies = interception.response?.body.results;
      expect(searchedMovies.length).to.equal(ITEMS.perPage);
    });

    expect(cy.get(".thumbnail-list > li").should("have.length", ITEMS.perPage));

    cy.get(".thumbnail-list > li").last().scrollIntoView();

    cy.wait("@getSecondSearchedMovies").then((interception) => {
      expect(interception.response?.body.results.length).to.equal(15);
    });

    expect(cy.get(".thumbnail-list > li").should("have.length", 35));
  });

  it("영화 아이템을 클릭하면 영화 상세정보 데이터를 받아온다.", () => {
    cy.wait("@getPopularMovies");

    cy.get(".thumbnail-list > li").first().click();
    cy.wait("@getMovieDetails").then((interception) => {
      const movie = interception.response?.body;
      expect(movie).to.include.all.keys(
        "genres",
        "id",
        "overview",
        "poster_path",
        "release_date",
        "title",
        "vote_average"
      );
    });

    cy.get(".modal-image img")
      .should("exist")
      .and("have.attr", "alt", "미키 17");
    cy.get(".modal-description h2").should("exist").contains("미키 17");
    cy.get(".category").should("exist").contains("SF, 코미디, 모험");
    cy.get(".detail").should("exist").contains("미키");
  });
});
