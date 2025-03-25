import { ERROR_MESSAGE } from "../../src/setting/ErrorMessage";
const localHostUrl = Cypress.env("LOCAL_HOST_URL");

describe("fallback 테스트", () => {
  it(`서버가 500를 보내면 ${ERROR_MESSAGE.FETCH_ERROR}를 보여준다.`, () => {
    cy.intercept(
      {
        method: "GET",
        url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular(\?.*)?$/,
      },
      {
        statusCode: 500,
        body: {
          status_message: "Internal Server Error",
          status_code: 500,
        },
      }
    );
    cy.visit(localHostUrl);
    cy.get(".toast-container")
      .should("be.visible")
      .contains(ERROR_MESSAGE.FETCH_ERROR);
  });

  it(`서버가 500를 보내면 ${ERROR_MESSAGE.FETCH_ERROR}를 보여준다.`, () => {
    cy.intercept(
      {
        method: "GET",
        url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular(\?.*)?$/,
      },
      { fixture: "movie-popular.json" }
    );
    cy.intercept(
      {
        method: "GET",
        url: /\/3\/movie\/\d+/,
      },
      {
        statusCode: 500,
        body: {
          status_message: "Internal Server Error",
          status_code: 500,
        },
      }
    ).as("getMovieDetail");
    cy.visit(localHostUrl);
    cy.get("#696506").click();
    cy.get(".toast-container")
      .should("be.visible")
      .contains(ERROR_MESSAGE.FETCH_ERROR);
  });
});
