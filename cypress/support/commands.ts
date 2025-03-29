declare global {
  namespace Cypress {
    interface Chainable {
      search(title: string): Chainable<void>;
      waitLoading(): Chainable<void>;
      scrollBottom(): Chainable<void>;
    }
  }
}

Cypress.Commands.add('search', (title: string) => {
  cy.waitLoading();
  cy.get('#top-rated-search-input').type(`${title}`);
  cy.get('.top-rated-search-button').click();
});
Cypress.Commands.add('waitLoading', () => {
  cy.get('.picture').should('not.exist');
  cy.wait(100);
});
Cypress.Commands.add('scrollBottom', () => {
  cy.get('#movie-more').scrollIntoView({ duration: 10 });
  cy.waitLoading();
});

Cypress.on('uncaught:exception', () => {
  return false;
});
