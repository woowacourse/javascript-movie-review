/// <reference types="cypress" />
import { MOVIE_COUNT, SCORE_MESSAGES } from "../../src/constants/config";

describe("Fixture를 이용한 인기 영화 목록 테스트", () => {
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
        url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/696506*/,
      },
      { fixture: "movie-detail.json" }
    ).as("getMovieDetail");

    cy.visit("http://localhost:5173");
  });

  it(`인기 영화 목록 API를 호출하면 한 번에 ${MOVIE_COUNT.UNIT}개씩 목록에 나열되어야 한다`, () => {
    cy.wait("@getPopularMovies").then((interception) => {
      const popularMovies = interception.response?.body.results;
      expect(popularMovies.length).to.equal(MOVIE_COUNT.UNIT);

      const popularMovieItems = cy.get("[data-testid='movie-list'] > li");
      expect(popularMovieItems.should("have.length", MOVIE_COUNT.UNIT));
    });
  });

  it(`인기 영화 목록에서 최하단으로 스크롤 하면, ${MOVIE_COUNT.UNIT}개씩 추가로 목록에 나열되어야 한다`, () => {
    cy.wait("@getPopularMovies").then(() => {
      cy.scrollTo("bottom");

      cy.wait("@getPopularMovies").then((interception) => {
        const popularMovies = interception.response?.body.results;
        expect(popularMovies.length).to.equal(MOVIE_COUNT.UNIT);

        const popularMovieItems = cy.get("[data-testid='movie-list'] > li");
        expect(popularMovieItems.should("have.length", MOVIE_COUNT.UNIT * 2));
      });
    });
  });

  for (let i = 1; i < 6; i++) {
    it(`Banner 컴포넌트 내의 자세히 보기 버튼 클릭 시 모달이 열리고, ${i}번째 별점을 클릭하면 ${
      SCORE_MESSAGES[i * 2]
    }가 표시되어야 한다.`, () => {
      cy.get("[data-testid='banner-detail-button']").click();

      cy.wait("@getMovieDetail").then(() => {
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
  }

  for (let i = 1; i < 6; i++) {
    it(`영화 목록의 아이템을 클릭 시 모달이 열리고, ${i}번째 별점을 클릭하면 ${
      SCORE_MESSAGES[i * 2]
    }가 표시되어야 한다.`, () => {
      cy.get("[data-testid='movie-list'] > li").first().click();

      cy.wait("@getMovieDetail").then(() => {
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
  }
});
