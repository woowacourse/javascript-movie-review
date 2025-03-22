/// <reference types="cypress" />

import { Movie } from "../../types/domain";

describe("비동기 API 테스트", () => {
  it("영화 목록 API를 호출하면 한 번에 20개씩 목록에 나열되어야 한다.", () => {
    cy.visit("localhost:5173");

    const popularMovieUrl = `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1&api_key=${Cypress.env(
      "TMDB_KEY"
    )}`;
    const options = {
      headers: {
        accept: "application/json",
      },
    };

    cy.request({
      method: "GET",
      url: popularMovieUrl,
      ...options,
    }).as("popularMovies");

    cy.get("@popularMovies").its("status").should("eq", 200);
    cy.get("@popularMovies").its("body.results").should("have.length", 20);
  });

  it("영화 검색 API를 사용하면 검색된 결과를 받아온다.", () => {
    cy.visit("localhost:5173");

    const searchMovieUrl = `https://api.themoviedb.org/3/search/movie?query=해리포터&language=ko-KR`;
    const options = {
      headers: {
        Authorization: `Bearer ${Cypress.env("TMDB_TOKEN")}`,
        accept: "application/json",
      },
    };

    cy.request({
      method: "GET",
      url: searchMovieUrl,
      ...options,
    }).as("searchMovies");

    cy.get("@searchMovies").its("status").should("eq", 200);
    cy.get("@searchMovies").its("body.results").should("have.length", 9);
    cy.get("@searchMovies")
      .its("body.results")
      .then((results) => {
        expect(
          results.some((movie: Movie) => movie.title.includes("해리 포터"))
        ).to.be.true;
      });
  });
});
