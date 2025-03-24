import { ITEMS } from "../../src/constants/movie.ts";

describe("영화 목록 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it(`맨 처음 상위 영화 ${ITEMS.perPage}개가 표시된다.`, () => {
    cy.get("ul.thumbnail-list li").should("have.length", ITEMS.perPage);
  });

  it(`더보기 버튼을 누르면 다음 페이지 ${ITEMS.perPage}개가 추가로 표시된다.`, () => {
    cy.get("main section button.primary").click();
    cy.get("ul.thumbnail-list li").should("have.length", 40);
  });
});
