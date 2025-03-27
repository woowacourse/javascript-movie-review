/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * 검색 입력창에 값을 입력하고 검색을 실행합니다.
       * @param title 검색어 문자열
       */
      search(title: string): Chainable<void>;
    }
  }
}

Cypress.Commands.add("search", (title: string) => {
  cy.get(".top-rated-search-input").should("exist").click();
  cy.get(".top-rated-search-input").type(title);
  cy.get(".top-rated-search-button").should("exist").click();
});
