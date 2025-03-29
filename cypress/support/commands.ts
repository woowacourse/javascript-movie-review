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
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(email: string, password: string): Chainable<void>
//       drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }

import { RATE_MESSAGE } from '../../src/constants/systemMessage';

Cypress.Commands.add('openDetailModal', () => {
  cy.get('.item').first().click();
  cy.get('.modal-open').should('exist');
});

Cypress.Commands.add('rateMovie', () => {
  const SELECTED_STAR = 1;
  cy.get('.myrate__icon').first().click();
  cy.get('.myrate__score').contains(SELECTED_STAR);
  cy.get('.myrate__message').contains(RATE_MESSAGE[SELECTED_STAR]);
});

Cypress.Commands.add('scrollToLoadMovies', () => {
  cy.scrollTo('bottom');

  cy.get('.skeleton').should('not.exist');

  cy.get('.item').should('have.length', 40);
});

Cypress.Commands.add('closeDetailModalByESC', () => {
  cy.openDetailModal();
  cy.get('body').type('{esc}');
  cy.get('.modal-open').should('not.exist');
});

Cypress.Commands.add('closeModalByBackdrop', () => {
  cy.openDetailModal();
  cy.get('.main-page > .modal-background').click('topLeft');
  cy.get('.modal-open').should('not.exist');
});

Cypress.Commands.add('closeDetailModalByIcon', () => {
  cy.openDetailModal();
  cy.get('.main-page .close-modal').first().click();
  cy.get('.modal-open').should('not.exist');
});
