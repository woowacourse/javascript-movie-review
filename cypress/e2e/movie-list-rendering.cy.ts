import { moviesFixture } from "../../test/fixtures";
import { mockPopularPage } from "../support/movie";

describe("영화 목록 조회 기능 테스트", () => {
  beforeEach(() => {
    mockPopularPage({
      page: 1,
      results: moviesFixture,
      totalPages: 2,
      totalResults: 40,
    });

    mockPopularPage({
      page: 2,
      results: moviesFixture,
      totalPages: 2,
      totalResults: 40,
    });

    cy.visit("localhost:5173");
    cy.wait("@getPopularPage1");
  });

  it("프로그램을 시작하면 20개의 영화 목록이 렌더링 된다.", () => {
    cy.get("#movie-list li").should("have.length", 20);
  });

  it("리스트 아래 sentinel이 보이면 영화 목록이 추가로 생성되어 렌더링 된다.", () => {
    cy.get(".scroll-sentinel").scrollIntoView();
    cy.wait("@getPopularPage2");

    cy.get("#movie-list li").should("have.length", 40);
  });

  it("마지막 페이지까지 렌더링되면 추가 요청이 발생하지 않는다.", () => {
    cy.get(".scroll-sentinel").scrollIntoView();
    cy.wait("@getPopularPage2");

    cy.get(".scroll-sentinel").scrollIntoView();
    cy.get("#movie-list li").should("have.length", 40);
  });
});
