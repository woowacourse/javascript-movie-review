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
export {};

declare global {
  namespace Cypress {
    interface Chainable {
      search(title: string): Chainable<void>;
      clickMovieById(movieId: number): Chainable<void>;
      clickDetailButton(): Chainable<void>;
      closeModal(): Chainable<void>;
      verifyModalClosed(): Chainable<void>;
      verifyMovieListLength(count: number): Chainable<void>;
      setupMovieListTest(options: SetupOptions): Chainable<void>;
      selectRating(rating: ratingType): Chainable<void>;
      verifyRatingDescription(rating: ratingType): Chainable<void>;
    }
  }
}

interface SetupOptions {
  fixture?: string;
  wait?: boolean;
}

const ratingDescriptions = {
  0: "별점을 선택해주세요",
  2: "최악이에요",
  4: "별로예요",
  6: "보통이에요",
  8: "재미있어요",
  10: "명작이에요",
} as const;

export type ratingType = keyof typeof ratingDescriptions;

Cypress.Commands.add("setupMovieListTest", (options: SetupOptions = {}) => {
  const { fixture, wait } = options;

  if (fixture !== null && fixture !== undefined) {
    cy.intercept("GET", "https://api.themoviedb.org/3/movie/popular**", {
      statusCode: 200,
      fixture: fixture,
    }).as("getMovies");
  } else {
    cy.intercept("GET", "https://api.themoviedb.org/3/movie/popular**").as(
      "getMovies"
    );
  }

  cy.visit("http://localhost:5173/");
  if (wait) cy.wait("@getMovies");
});

Cypress.Commands.add("verifyMovieListLength", (count: number) => {
  cy.get(".thumbnail-list > li").should("have.length", count);
});

Cypress.Commands.add("search", (title: string) => {
  cy.get(".top-rated-search-input").should("be.visible").as("searchInput");

  cy.get("@searchInput").click();
  cy.get("@searchInput").type(title);

  cy.get(".top-rated-search-button").should("be.visible").as("searchButton");
  cy.get("@searchButton").click();
});

Cypress.Commands.add("clickMovieById", (movieId: number) => {
  cy.get(`.item[data-movie-id="${movieId}"]`).first().click();
});

Cypress.Commands.add("clickDetailButton", () => {
  cy.get(`.primary.detail`).click();
});

Cypress.Commands.add("closeModal", () => {
  cy.get(".modal-background").should("have.class", "active");
  cy.get(".close-modal").click();
});

Cypress.Commands.add("verifyModalClosed", () => {
  cy.get(".modal-background").should("not.have.class", "active");
});

Cypress.Commands.add("selectRating", (rating: ratingType) => {
  cy.get(`.modal-rate-star .star[data-value="${rating}"]`).click();
  cy.wait(300);
});

Cypress.Commands.add("verifyRatingDescription", (rating: ratingType) => {
  cy.get(".modal-rate-description").should(
    "contain",
    ratingDescriptions[rating]
  );
  cy.get(".modal-rate-scale").should("contain", `(${rating}/10)`);
});
