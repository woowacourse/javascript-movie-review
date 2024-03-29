/// <reference types="cypress" />

Cypress.Commands.add('visitMainPage', () => {
  cy.visit('http://localhost:8080/');
});

Cypress.Commands.add('scrollBottom', () => {
  cy.get('.scroll-observer-target').scrollIntoView();
});

Cypress.Commands.add('clickFirstMovieCard', () => {
  cy.get('.movie-list-container').within(() => {
    cy.get('.movie-list').find('li').first().click();
  });
});
interface checkUserScoreParams {
  score: number;
  numberOfFilled: number;
  text: string;
}
Cypress.Commands.add('checkUserScore', (props: checkUserScoreParams) => {
  //점수
  cy.get('.score-number').should('have.text', props.score);
  // 문구
  cy.get('.score-text').should('have.text', props.text);
  // 별
  cy.get('.button-score.filled').should('have.length', props.numberOfFilled);
});

interface LocalStorageUserScore {
  id: number;
  score: number;
}

Cypress.Commands.add('setLocalStorage', (item: LocalStorageUserScore) => {
  window.localStorage.setItem('user_score', JSON.stringify([item]));
});

declare namespace Cypress {
  interface Chainable {
    visitMainPage(): Cypress.Chainable<void>;
    scrollBottom(): Cypress.Chainable<void>;
    clickFirstMovieCard(): Cypress.Chainable<void>;
    checkUserScore(props: checkUserScoreParams): Cypress.Chainable<void>;
    setLocalStorage(props: LocalStorageUserScore): Cypress.Chainable<void>;
  }
}
