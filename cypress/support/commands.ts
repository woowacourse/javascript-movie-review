/// <reference types="cypress" />

Cypress.Commands.add('visitMainPage', () => {
  cy.visit('http://localhost:8080/');
});

Cypress.Commands.add('fetchData', (apiUrl) => {
  cy.request(apiUrl).then((response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.have.property('results');
    expect(response.body.results).to.be.an('array').that.is.not.empty;

    cy.get('li').should('be.visible');

    response.body.results.forEach((movie) => {
      cy.get('.item-list').within(() => {
        cy.get('.item-title').should('contain', movie.title);
        cy.get('.item-score').should('be.visible');
        cy.get('.item-thumbnail').should('have.attr', 'src');
      });
    });
  });
});

declare namespace Cypress {
  interface Chainable {
    visitMainPage(): Chainable<Element>;
    fetchData(apiUrl: string): Chainable<Element>;
  }
}
