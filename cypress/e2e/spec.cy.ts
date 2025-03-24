/// <reference types="cypress" />
import { ERROR_MESSAGES, MOVIE_COUNT } from "../../src/constants/config.js";
import { Movie } from "../../types/movie.ts";

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
        url: /^https:\/\/api\.themoviedb\.org\/3\/search\/movie\?query=Spiderman*/,
      },
      {
        fixture: "movie-search.json",
      }
    ).as("searchMovies");

    cy.intercept(
      {
        method: "GET",
        url: /^https:\/\/api\.themoviedb\.org\/3\/search\/movie\?query=%20*/,
      },
      { fixture: "movie-search-nothing.json" }
    ).as("searchNoMovies");

    cy.visit("http://localhost:5173");
  });

  it(`영화 목록 API를 호출하면 한 번에 ${MOVIE_COUNT.UNIT}개씩 목록에 나열되어야 한다`, () => {
    cy.wait("@getPopularMovies").then((interception) => {
      const popularMovies = interception.response?.body.results;
      expect(popularMovies.length).to.equal(MOVIE_COUNT.UNIT);

      const popularMovieItems = cy.get("[data-testid='movie-list'] > li");
      expect(popularMovieItems.should("have.length", MOVIE_COUNT.UNIT));
    });
  });

  it(`인기 영화 목록에서 더 보기 버튼을 클릭하면, ${MOVIE_COUNT.UNIT}개씩 추가로 목록에 나열되어야 한다`, () => {
    cy.wait("@getPopularMovies").then(() => {
      cy.get("[data-testid='more-button']").click();

      cy.wait("@getPopularMovies").then((interception) => {
        const popularMovies = interception.response?.body.results;
        expect(popularMovies.length).to.equal(MOVIE_COUNT.UNIT);

        const popularMovieItems = cy.get("[data-testid='movie-list'] > li");
        expect(popularMovieItems.should("have.length", MOVIE_COUNT.UNIT * 2));
      });
    });
  });

  it(`검색어를 입력한 후 폼을 제출하면, 해당 검색어를 포함하는 영화 목록이 나열되어야 한다`, () => {
    cy.get("[data-testid='search-input']").type("Spiderman");
    cy.get("[data-testid='search-form']").submit();

    cy.wait("@searchMovies").then((interception) => {
      const searchMovies = interception.response?.body.results;
      const filteredMovies = searchMovies.filter((movie: Movie) =>
        movie.original_title.includes("Spider-Man")
      );

      const searchMoviesItems = cy.get("[data-testid='movie-list'] > li");
      expect(searchMoviesItems.should("have.length", filteredMovies.length));
    });
  });

  it(`검색어를 입력한 후 폼을 제출하고, 더 보기 버튼을 클릭하면, 해당 검색어를 포함하는 영화 목록에 ${MOVIE_COUNT.UNIT}개씩 추가로 나열되어야 한다`, () => {
    cy.get("[data-testid='search-input']").type("Spiderman");
    cy.get("[data-testid='search-form']").submit();

    cy.wait("@searchMovies").then(() => {
      cy.get("[data-testid='more-button']").click();

      cy.wait("@searchMovies").then((interception) => {
        const searchMovies = interception.response?.body.results;
        const filteredMovies = searchMovies.filter((movie: Movie) =>
          movie.original_title.includes("Spider-Man")
        );

        const searchMoviesItems = cy.get("[data-testid='movie-list'] > li");
        expect(
          searchMoviesItems.should(
            "have.length",
            filteredMovies.length + MOVIE_COUNT.UNIT
          )
        );
      });
    });
  });

  it(`검색어를 입력한 후 폼을 제출하였으나, 검색 결과가 없는 경우 '${ERROR_MESSAGES.NO_RESULT}' 메시지가 나타나야 한다`, () => {
    cy.get("[data-testid='search-input']").type(" ");
    cy.get("[data-testid='search-form']").submit();

    cy.wait("@searchNoMovies").then(() => {
      cy.get("[data-testid='no-result-message']").should("exist");
    });
  });
});
