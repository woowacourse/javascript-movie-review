import {
  createMoviePage,
  mockPopularMovies,
  mockSearchMoviePages,
} from "../support/movieApi";

describe("영화 검색 결과 페이지 흐름", () => {
  beforeEach(() => {
    mockPopularMovies({
      1: createMoviePage("인기 영화", 1),
    });

    cy.visit("http://localhost:5173");
    cy.wait("@getPopularMovies");
  });

  it("검색어를 입력하고 검색을 실행하면 필터링된 영화 목록을 표시한다.", () => {
    mockSearchMoviePages({
      1: createMoviePage("스파이더맨", 1),
    });

    cy.get(".search-bar").type("스파이더맨");
    cy.get(".search-btn").click();
    cy.wait("@searchMovies");

    cy.get(".thumbnail-list li").should("have.length", 20);
    cy.get(".thumbnail-list li")
      .first()
      .find(".title")
      .should("have.text", "스파이더맨 1");
  });

  it("검색 결과가 없으면 '검색 결과가 없습니다' 메시지를 표시한다.", () => {
    mockSearchMoviePages({
      1: [],
    });

    cy.get(".search-bar").type("ㄴㅇ러ㅏㅗㅁ라ㅗ어ㅏ로머ㅏJklhdskldh");
    cy.get(".search-btn").click();
    cy.wait("@searchMovies");

    cy.get(".error-text").should("have.text", "검색 결과가 없습니다.");
  });

  it("검색 결과 화면에서 더 보기 버튼을 누르면 다음 페이지 영화가 기존 목록 뒤에 추가된다.", () => {
    mockSearchMoviePages({
      1: createMoviePage("스파이더맨", 1),
      2: createMoviePage("스파이더맨", 2),
    });

    cy.get(".search-bar").type("스파이더맨");
    cy.get(".search-btn").click();
    cy.wait("@searchMovies");

    cy.get(".thumbnail-list li").should("have.length", 20);

    cy.get(".display-more-btn").click();
    cy.wait("@searchMovies");

    cy.get(".thumbnail-list li").should("have.length", 40);
    cy.get(".thumbnail-list li")
      .eq(20)
      .find(".title")
      .should("have.text", "스파이더맨 21");
  });
});
