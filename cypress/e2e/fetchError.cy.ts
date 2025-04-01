///  <reference types="cypress" />
import { ERROR_MESSAGE } from "../../src/domain/constants/errorMessage";
import { TmdbApiFetchFailResponse } from "../../src/domain/apis/tmdbApi";

describe("Fetch 에러 테스트", () => {
  it("페이지 로드 시 fetch 요청 실패 (401 유효하지 않은 API 키)", () => {
    const tmdbErrorCode = 7;
    const errorMessage = ERROR_MESSAGE[tmdbErrorCode];

    cy.intercept(
      "GET",
      "https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1",
      {
        statusCode: 401,
        body: {
          status_code: tmdbErrorCode,
          status_message: errorMessage,
          success: false,
        },
      }
    ).as("getPopularMoviesError");

    cy.visit("localhost:5173");

    cy.wait("@getPopularMoviesError").then((interception) => {
      cy.get(".error-container").should("contain", errorMessage);
    });
  });

  it("페이지 로드 시 fetch 요청 실패 (404 찾을 수 없음)", () => {
    const tmdbErrorCode = 34;
    const errorMessage = ERROR_MESSAGE[tmdbErrorCode];

    cy.intercept(
      "GET",
      "https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1",
      {
        statusCode: 404,
        body: {
          status_code: tmdbErrorCode,
          status_message: errorMessage,
          success: false,
        } as TmdbApiFetchFailResponse,
      }
    ).as("getPopularMoviesNotFoundError");

    cy.visit("localhost:5173");

    cy.wait("@getPopularMoviesNotFoundError").then((interception) => {
      cy.get(".error-container").should("contain", errorMessage);
    });
  });

  it("페이지 로드 시 fetch 요청 실패 (500 Internal Server Error)", () => {
    const tmdbErrorCode = 11;
    const errorMessage = ERROR_MESSAGE[tmdbErrorCode];

    cy.intercept(
      "GET",
      "https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=1",
      {
        statusCode: 500,
        body: {
          status_code: tmdbErrorCode,
          status_message: errorMessage,
          success: false,
        } as TmdbApiFetchFailResponse,
      }
    ).as("getPopularMoviesServerError");

    cy.visit("localhost:5173");

    cy.wait("@getPopularMoviesServerError").then((interception) => {
      cy.get(".error-container").should("contain", errorMessage);
    });
  });
});
