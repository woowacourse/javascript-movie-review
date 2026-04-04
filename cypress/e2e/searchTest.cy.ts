import {
  createMovie,
  createMoviePage,
  mockPopularMovies,
  mockSearchMovies,
} from "../support/movieApi";

describe("검색 기능을 사용해서 영화 목록을 필터링할 수 있다.", () => {
  beforeEach(() => {
    mockPopularMovies({
      1: createMoviePage("인기 영화", 1),
    });

    cy.visit("http://localhost:5173");
    cy.wait("@getPopularMovies");
  });

  it("검색어를 입력한 뒤 검색 버튼을 누르면 필터링된 영화 목록을 보여준다.", () => {
    mockSearchMovies([
      createMovie(101, "스파이더맨 1"),
      createMovie(102, "스파이더맨 2"),
    ]);

    cy.get(".search-bar").type("스파이더맨");
    cy.get(".search-btn").click();
    cy.wait("@searchMovies");

    cy.get(".thumbnail-list li").should("have.length", 2);
    cy.get(".thumbnail-list li")
      .first()
      .find(".title")
      .should("have.text", "스파이더맨 1");
  });

  it("검색어를 입력한 뒤 엔터키를 누르면 필터링된 영화 목록을 보여준다.", () => {
    mockSearchMovies([
      createMovie(101, "스파이더맨 1"),
      createMovie(102, "스파이더맨 2"),
    ]);

    cy.get(".search-bar").type("스파이더맨{enter}");
    cy.wait("@searchMovies");

    cy.get(".thumbnail-list li").should("have.length", 2);
    cy.get(".thumbnail-list li")
      .first()
      .find(".title")
      .should("have.text", "스파이더맨 1");
  });
  it("검색란에 검색어를 입력해도 결과가 존재하지 않다면 '검색 결과가 없습니다' 텍스트를 띄운다", () => {
    cy.get(".search-bar").type("ㄴㅇ러ㅏㅗㅁ라ㅗ어ㅏ로머ㅏJklhdskldh");
    cy.get(".search-btn").click();
    cy.get(".search-error-text").should("have.text", "검색 결과가 없습니다.");
  });
});
