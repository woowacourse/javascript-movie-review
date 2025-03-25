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

  it(`서버가 500를 보내면 ${ERROR_MESSAGE.FETCH_ERROR}를 보여준다.`, () => {
    cy.get(".toast-container")
      .should("be.visible")
      .contains(ERROR_MESSAGE.FETCH_ERROR);
  });
});
