import { movieDetailFixture, moviesFixture } from "../../test/fixtures";

describe("영화 모달 기능 테스트", () => {
  const openMovieModal = () => {
    cy.get("#movie-list li").first().click();
    cy.wait("@getMovieDetail");
    cy.get("#modal-background").should("have.class", "active");
  };

  beforeEach(() => {
    cy.intercept("GET", "**/movie/popular?page=1&language=ko-KR", {
      statusCode: 200,
      body: {
        page: 1,
        results: [...moviesFixture],
        total_pages: 2,
        total_results: 40,
      },
    }).as("getPopularPage1");

    cy.intercept("GET", "**/movie/640146?language=ko-KR", {
      statusCode: 200,
      body: movieDetailFixture,
    }).as("getMovieDetail");

    cy.visit("localhost:5173");
    cy.wait("@getPopularPage1");
  });

  it("영화 목록을 클릭하면 모달이 뜨고 닫기 버튼으로 닫을 수 있다", () => {
    openMovieModal();

    cy.get("#close-modal").click();
    cy.get("#modal-background").should("not.have.class", "active");
  });

  it("ESC 버튼을 누르면 모달이 닫힌다", () => {
    openMovieModal();

    cy.get("body").type("{esc}");
    cy.get("#modal-background").should("not.have.class", "active");
  });

  it("모달창이 아닌 부분을 클릭하면 모달이 닫힌다", () => {
    openMovieModal();

    cy.get("#modal-background").click("topLeft");
    cy.get("#modal-background").should("not.have.class", "active");
  });

  it("모달창이 뜨면 배경 스크롤이 적용되지 않는다", () => {
    openMovieModal();

    cy.get("body").should("have.class", "modal-open");
  });
});
