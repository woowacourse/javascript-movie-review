import { ERROR_MESSAGE } from "../../src/setting/ErrorMessage.ts";

const localHostUrl = Cypress.env("LOCAL_HOST_URL");

describe("fallback 테스트", () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: "GET",
        url: /^https:\/\/api\.themoviedb\.org\/3\/search\/movie*/,
      },
      (req) => {
        if (req.query.page === "1" && req.query.query === "짱구") {
          req.reply({ fixture: "jjanggu-search1.json" });
        } else if (req.query.page === "2" && req.query.query === "짱구") {
          req.reply({ fixture: "jjanggu-search2.json" });
        } else {
          req.reply({ fixture: "empty-search.json" });
        }
      }
    );
    cy.visit(localHostUrl);
  });

  it("없는 영화를 입력한 경우 fallback화면이 보인다.", () => {
    const searchValue = "없는 영화";
    cy.get(".search-bar").type(`${searchValue}{enter}`);

    cy.get("#fallback").should("be.visible").contains("검색 결과가 없습니다.");
    cy.get(".toast-container")
      .should("be.visible")
      .contains(ERROR_MESSAGE.NO_DATA);
  });
});
