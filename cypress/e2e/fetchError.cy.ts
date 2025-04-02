///  <reference types="cypress" />
import { ERROR_MESSAGE } from "../../src/domain/constants/errorMessage";
import { TmdbApiFetchFailResponse } from "../../src/domain/apis/tmdbApi";

describe("Fetch 에러 테스트", () => {
  it("페이지 로드 시 fetch 요청 실패 (404 찾을 수 없음)", () => {
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

describe("네트워크 연결 끊김 테스트", () => {
  beforeEach(() => {
    cy.visit("localhost:5173");
    cy.get(".thumbnail-list").find(".thumbnail").should("have.length", 20);
  });

  it("사용자가 페이지 하단으로 스크롤해서 영화 목록 API를 호출하는 도중에 네트워크 연결이 끊기면 오류 메시지를 표시한다", () => {
    cy.intercept(
      "GET",
      "https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=2",
      {
        forceNetworkError: true,
      }
    ).as("loadMoreMoviesError");

    cy.scrollTo("bottom");

    cy.wait("@loadMoreMoviesError").then(() => {
      cy.get(".error-container").should("contain", "네트워크 에러입니다.");
    });
  });
});
