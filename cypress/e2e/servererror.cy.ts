import { ERROR_MESSAGE } from "../../src/setting/ErrorMessage";
const localHostUrl = Cypress.env("LOCAL_HOST_URL");

describe("fallback 테스트", () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: "GET",
        url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular*/,
      },
      (req) => {
        req.reply({
          statusCode: 500,
          body: { error: "Internal Server Error" },
        });
      }
    );
    cy.visit(localHostUrl);
  });

  it("사용자가 홈화면에 접속하면 영화 추천과 20개의 영화 리스트를 본다.", () => {
    cy.get(".toast-container")
      .should("be.visible")
      .contains(ERROR_MESSAGE.FETCH_ERROR);
  });
});
