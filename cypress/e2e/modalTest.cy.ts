import { createMovieDetail, mockMovieDetails } from "../support/modalApi";
import { createMoviePage, mockPopularMovies } from "../support/movieApi";

describe("세부정보 모달 & 별점 기능 흐름", () => {
  beforeEach(() => {
    mockPopularMovies({
      1: createMoviePage("인기 영화", 1),
    });

    mockMovieDetails({
      5: createMovieDetail(5, "인기 영화 5"),
    });

    cy.visit("http://localhost:5173");
    cy.wait("@getPopularMovies");
  });

  it("영화 포스터 또는 제목을 클릭하면 세부 정보 모달을 띄울 수 있고, 별점을 매길 수 있다.", () => {
    cy.get(".thumbnail-list li").eq(4).find(".thumbnail").click();
    cy.wait("@getMovieDetail");

    cy.get(".modal-background").should("have.class", "active");
    cy.get(".movie-detail h2").should("have.text", "인기 영화 5");
    cy.get(".detail").should("contain.text", "인기 영화 5 줄거리");

    cy.get(".rate-description").should("have.text", "별점 평가 전");

    cy.get('.star-container .star[value="4"]').click();

    cy.get(".rate-description").should("have.text", "재미있어요");
    cy.get(".rate-percentage").should("have.text", "(8/10)");
  });

  it("닫기 버튼 또는 ESC키를 눌러 모달을 닫을 수 있고, 새로고침해도 사용자가 매긴 별점이 유지된다.", () => {
    cy.get(".thumbnail-list li").eq(4).find(".thumbnail").click();
    cy.wait("@getMovieDetail");

    cy.get('.star-container .star[value="4"]').click();

    cy.get(".close-modal").click();
    cy.get(".modal-background").should("not.have.class", "active");

    cy.get(".thumbnail-list li").eq(4).find(".thumbnail").click();
    cy.wait("@getMovieDetail");

    cy.get(".rate-description").should("have.text", "재미있어요");
    cy.get(".rate-percentage").should("have.text", "(8/10)");

    cy.get("body").type("{esc}");
    cy.get(".modal-background").should("not.have.class", "active");
  });
  it("모달을 띄울 시 영화 상세 정보 요청이 실패하면 상세 정보 에러 메시지를 보여준다.", () => {
    mockPopularMovies({
      1: createMoviePage("인기 영화", 1),
    });

    cy.intercept("GET", /\/movie\/\d+\?/, {
      statusCode: 500,
      body: {},
    }).as("getMovieDetail");

    cy.visit("http://localhost:5173");
    cy.wait("@getPopularMovies");

    cy.get(".thumbnail-list li").first().find(".thumbnail").click();
    cy.wait("@getMovieDetail");

    cy.get(".error-text").should(
      "contain.text",
      "영화 상세 정보를 불러오지 못했습니다.",
    );

    cy.get(".modal-background").should("not.have.class", "active");
  });
});
