import { MOVIE_DETAIL_FIXTURE } from "./fixtures";

describe("모달", () => {
  beforeEach(() => {
    cy.intercept("GET", "**/movie/popular**", (req) => {
      req.reply({
        results: Array.from({ length: 20 }, (_, i) => ({
          id: i + 1,
          title: `영화 ${i + 1}`,
          poster_path: null,
          vote_average: 7.0,
        })),
        page: 1,
        total_pages: 5,
      });
    }).as("popularMovies");

    cy.intercept("GET", "**/movie/1**", (req) => {
      req.reply(MOVIE_DETAIL_FIXTURE);
    }).as("movieDetail");

    cy.visit("/");
    cy.wait("@popularMovies");
  });

  it("영화 카드 클릭 시 모달이 열린다", () => {
    cy.get(".item").first().click();
    cy.get("dialog.modal").should("be.visible");
  });

  it("모달에 영화 정보가 표시된다", () => {
    cy.get(".item").first().click();
    cy.wait("@movieDetail");
    cy.get("dialog.modal").within(() => {
      cy.get("h2").should("contain.text", "인터스텔라");
      cy.get(".overview").should("contain.text", "우주를 탐험하는 이야기");
      cy.get(".rate-value").should("contain.text", "8.6");
      cy.get(".category").should("contain.text", "2014");
    });
  });

  it("닫기 버튼 클릭 시 모달이 닫힌다", () => {
    cy.get(".item").first().click();
    cy.get("dialog.modal").should("be.visible");
    cy.get("dialog.modal .close-modal").click({ force: true });
    cy.get("dialog.modal").should("not.be.visible");
  });

  it("backdrop 클릭 시 모달이 닫힌다", () => {
    cy.get(".item").first().click();
    cy.get("dialog.modal").should("be.visible");
    cy.get("dialog.modal").click("topLeft", { force: true });
    cy.get("dialog.modal").should("not.be.visible");
  });

  it("API 실패 시 에러 메시지가 표시된다", () => {
    cy.intercept("GET", "**/movie/1**", { forceNetworkError: true }).as(
      "movieDetailError",
    );
    cy.get(".item").first().click();
    cy.wait("@movieDetailError");
    cy.get("dialog.modal").within(() => {
      cy.get("h2").should("contain.text", "오류가 발생했습니다");
    });
  });

  it("로딩 중 스켈레톤이 표시된다", () => {
    cy.intercept("GET", "**/movie/1**", (req) => {
      req.on("response", (res) => {
        res.setDelay(500);
      });
      req.reply(MOVIE_DETAIL_FIXTURE);
    }).as("slowMovieDetail");

    cy.get(".item").first().click();
    cy.get("dialog.modal .skeleton-box").should("exist");
    cy.wait("@slowMovieDetail");
    cy.get("dialog.modal .skeleton-box").should("not.exist");
  });
});
