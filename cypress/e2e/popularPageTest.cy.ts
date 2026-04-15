import { createMoviePage, mockPopularMovies } from "../support/movieApi";

describe("인기순 영화 페이지 흐름", () => {
  beforeEach(() => {
    mockPopularMovies({
      1: createMoviePage("인기 영화", 1),
      2: createMoviePage("인기 영화", 2),
    });

    cy.visit("http://localhost:5173");
    cy.wait("@getPopularMovies");
  });

  it("페이지 진입 시 인기순 영화 목록이 표시되고, 첫 번째 영화가 배경에 표시된다.", () => {
    cy.get(".thumbnail-list li").should("have.length", 20);
    cy.get(".thumbnail-list li")
      .first()
      .find(".title")
      .should("have.text", "인기 영화 1");

    cy.get(".top-rated-movie .title").should("have.text", "인기 영화 1");
  });

  it("다른 포스터를 클릭하면 해당 영화로 배경이 갱신된다.", () => {
    cy.get(".thumbnail-list li").eq(4).click();

    cy.get(".top-rated-movie .title").should("have.text", "인기 영화 5");
  });

  it("페이지 하단까지 스크롤하면 다음 페이지 영화가 기존 목록 뒤에 추가된다.", () => {
    cy.get(".thumbnail-list li").should("have.length", 20);

    cy.scrollTo("bottom");
    cy.wait("@getPopularMovies");

    cy.get(".thumbnail-list li").should("have.length", 40);
    cy.get(".thumbnail-list li")
      .eq(20)
      .find(".title")
      .should("have.text", "인기 영화 21");
  });

  it("초기 영화 목록 로딩에 실패하면 에러 메시지를 보여준다.", () => {
    cy.intercept("GET", "**/movie/popular**", {
      statusCode: 500,
      body: {},
    }).as("getPopularMovies");

    cy.visit("http://localhost:5173");
    cy.wait("@getPopularMovies");

    cy.get(".error-text").should(
      "contain.text",
      "초기 화면을 불러오지 못했습니다.",
    );
  });
});
