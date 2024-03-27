declare namespace Cypress {
  interface Chainable {
    customVisit(): Chainable<JQuery<HTMLElement>>;
  }
}
