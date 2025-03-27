/// <reference types="cypress" />
import {
  ERROR_MESSAGES,
  MOVIE_COUNT,
  SCORE_MESSAGES,
} from "../../src/constants/config";
import { Movie } from "../../types/movieList";

describe("Fixture를 이용한 검색 영화 목록 테스트", () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: "GET",
        url: /^https:\/\/api\.themoviedb\.org\/3\/search\/movie\?query=Spiderman*/,
      },
      { fixture: "movie-search.json" }
    ).as("searchMovies");

    cy.intercept(
      {
        method: "GET",
        url: /^https:\/\/api\.themoviedb\.org\/3\/search\/movie\?query=%E3%85%8E%E3%85%87%E3%85%8E%E3%85%87*/,
      },
      { fixture: "movie-search-nothing.json" }
    ).as("searchNoMovies");

    cy.intercept(
      {
        method: "GET",
        url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/696506*/,
      },
      { fixture: "movie-detail.json" }
    ).as("getMovieDetail");

    cy.intercept(
      {
        method: "GET",
        url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/696506*/,
      },
      { fixture: "movie-detail.json" }
    ).as("getMovieDetail");

    cy.intercept(
      {
        method: "GET",
        url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/557*/,
      },
      { fixture: "movie-searched-detail.json" }
    ).as("getSearchedMovieDetail");

    cy.visit("http://localhost:5173");
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

  it(`검색어를 입력한 후 폼을 제출하고, 최하단으로 스크롤 하면, 해당 검색어를 포함하는 영화 목록에 ${MOVIE_COUNT.UNIT}개씩 추가로 나열되어야 한다`, () => {
    cy.get("[data-testid='search-input']").type("Spiderman");
    cy.get("[data-testid='search-form']").submit();

    cy.wait("@searchMovies").then(() => {
      cy.scrollTo("bottom");

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
    cy.get("[data-testid='search-input']").type("ㅎㅇㅎㅇ");
    cy.get("[data-testid='search-form']").submit();

    cy.wait("@searchNoMovies").then(() => {
      cy.get("[data-testid='no-result-message']").should("exist");
    });
  });

  for (let i = 1; i < 6; i++) {
    it(`검색어를 입력한 후 폼을 제출하고, 영화 목록의 아이템을 클릭 시 모달이 열리고, ${i}번째 별점을 클릭하면 ${
      SCORE_MESSAGES[i * 2]
    }가 표시되어야 한다.`, () => {
      cy.get("[data-testid='search-input']").type("Spiderman");
      cy.get("[data-testid='search-form']").submit();

      cy.wait("@searchMovies").then(() => {
        cy.get("[data-testid='movie-list'] > li").first().click();

        cy.wait("@getSearchedMovieDetail").then(() => {
          cy.get("[data-testid='modal']").should("exist");

          cy.get("[data-testid='rating']").within(() => {
            cy.get(`[data-testid='star${i * 2}']`).click();
            cy.get("[data-testid='score-message']").should(
              "have.text",
              `${SCORE_MESSAGES[i * 2]}`
            );
          });
        });
      });
    });
  }
});
