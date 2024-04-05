import { infiniteScroll } from "../../src/utility/infiniteScroll";

const BASE_URL = "https://api.themoviedb.org/3";
const POPULAR_MOVIES_URL = `${BASE_URL}/movie/popular`;

describe("실제 api를 호출하는 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080");
  });

  it("영화 목록 API를 호출하면 한 번에 20개씩 목록에 나열되어야 한다", () => {
    const popularMovieUrl =
      POPULAR_MOVIES_URL +
      "?" +
      new URLSearchParams({
        api_key: Cypress.env("API_KEY"),
        language: "ko-KR",
        page: "1",
      });

    cy.request("GET", popularMovieUrl).as("popularMovies");

    cy.get("@popularMovies").its("status").should("eq", 200);
    cy.get("@popularMovies").its("body.results").should("have.length", 20);
  });

  it("검색 결과가 존재하지 않을 때 '해당 키워드에 해당하는 영화가 없습니다.' 문구를 띄운다.", () => {
    // when
    cy.get('.search-box input[type="text"]').clear().type(" ");
    cy.get(".search-box .search-button").click();

    // then
    cy.get(".error-message").should(
      "have.text",
      "해당 키워드에 해당하는 영화가 없습니다."
    );
  });
});

describe("인터셉터를 사용하는 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080");
  });

  it("페이지 하단으로 스크롤을 옮기면 다음 영화 리스트 20개를 렌더링한다.", () => {
    // given
    cy.intercept(POPULAR_MOVIES_URL, {
      fixture: "movie-popular-lists.json",
    });

    // when
    cy.window().scrollTo("bottom");

    // then
    cy.get(".item-list li").should("have.length", 40);
  });
});
