import { movieDetailFixture, moviesFixture } from "../../test/fixtures";
import {
  mockMovieDetail,
  mockPopularPage,
  openMovieModal,
} from "../support/movie";

describe("영화 모달 기능 테스트", () => {
  beforeEach(() => {
    mockPopularPage({
      page: 1,
      results: moviesFixture,
      totalPages: 2,
      totalResults: 40,
    });

    mockMovieDetail(moviesFixture[0].id, movieDetailFixture);

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
