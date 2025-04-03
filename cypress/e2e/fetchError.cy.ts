///  <reference types="cypress" />
import { ERROR_MESSAGE } from "../../src/domain/constants/errorMessage";
import { TmdbApiFetchFailResponse } from "../../src/domain/apis/tmdbApi";

describe("Fetch 에러 테스트", () => {
  it("사용자가 웹사이트에 처음 접속했을 때 API 키 오류로 인기 영화 목록을 불러오지 못하고 '유효하지 않은 API 키: 유효한 키가 부여되어야 합니다.' 에러 메시지를 확인한다", () => {
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

  it("사용자가 존재하지 않는 영화 ID로 상세 정보를 보려고 시도했을 때 404에러가 발생하고 에러 메시지를 확인한다", () => {
    const tmdbErrorCode = 34;
    const errorMessage = ERROR_MESSAGE[tmdbErrorCode];

    cy.visit("localhost:5173");

    cy.get(".thumbnail-list")
      .find("li")
      .first()
      .invoke("attr", "id")
      .then((movieId) => {
        const invalidUrl = `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`;
        cy.intercept("GET", invalidUrl, {
          statusCode: 404,
          body: {
            status_code: tmdbErrorCode,
            status_message: errorMessage,
            success: false,
          },
        }).as("getMovieDetailError");

        cy.get(".thumbnail-list").find(".thumbnail").first().click();

        cy.wait("@getMovieDetailError").then((interception) => {
          cy.get(".error-container").should("contain", errorMessage);
        });
      });
  });

  it("사용자가 페이지 로드 시 서버에 의한 페이지 로드 실패시 '네트워크 에러입니다.'를 에러 메시지를 확인한다", () => {
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
