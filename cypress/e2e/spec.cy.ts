import type { Movie } from "./../../src/types/type";
/** e2e 오류 테스트
더보기 버튼이 없을 때
포스터 없을 때
검색어 없을 때

api 주소를 이상하게 해서 한다
요청 시간을 길게 준다 */

/**
 * 더보기 버튼을 누르면 다음의 영화 목록을 불러 올 수 있다.
 * 페이지 끝에 도달한 경우에는 더보기 버튼을 화면에 출력하지 않는다.
 *  영화 목록 아이템에 대한 Skeleton UI를 구현한다.

* 검색를 포함하고 있는 영화를 검색할 수 있다.
  - 엔터키를 눌러 검색할 수 있다.
  - 검색 버튼을 클릭하여 검색할 수 있다.
 */

describe("정상 작동 기능 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:8080/");
    cy.viewport(1400, 850);
  });

  it("영화 목록을 인기 순으로 1페이지를 불러 올 수 있다", () => {
    const apiKey = Cypress.env("CYPRESS_API_KEY");

    cy.request(
      "GET",
      `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=ko-KR&page=1`
    ).as("moviePopular");

    cy.get("@moviePopular").its("status").should("eq", 200);
    cy.get("@moviePopular").its("body.results").should("have.length", 20);
  });
});
