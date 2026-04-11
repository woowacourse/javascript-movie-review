Cypress.Commands.add('mockPopularMovies', (page: number) => {
  cy.intercept(
    { 
      method: "GET", 
      url: "**/movie/popular*", 
      query: {
        language: 'ko-KR', 
        page: String(page) 
      } 
    },
    { fixture: `popularMoviePage${page}.json` }
  ).as(`getPopularMoviesPage${page}`);
});

Cypress.Commands.add("mockSearchMovies", (searchQuery: string, page: number, jsonFile: string) => {
  cy.intercept(
    {
      method: "GET", 
      url: "**/search/movie*",
      query: {
        query: searchQuery,
        page: String(page)
      }
    }, {
    fixture: jsonFile
  }).as(`searchMovies${page}`);
});

Cypress.Commands.add("performSearch", (searchQuery: string) => {
  cy.get(".search-input").clear().type(searchQuery);
  cy.get(".search-button").click();
});

Cypress.Commands.add("verifyMovieItems", (allResults: Movies[]) => {
  cy.get(".skeleton-card").should("not.exist")
  cy.get(".thumbnail").should("have.length", allResults.length);
  cy.get(".thumbnail").each(($el, index) => {
    cy.wrap($el)
      .should("have.attr", "src")
      .and("include", allResults[index].poster_path);
  });
  cy.get(".item-title").each(($el, index) => {
    cy.wrap($el).should("contain", allResults[index].title);
  });
  cy.get(".item-rate").each(($el, index) => {
    cy.wrap($el).should(
      "contain",
      String(allResults[index].vote_average),
    );
  });
})

Cypress.Commands.add("disappearMoreButton", () => {
  cy.wait("@searchMovies")
    .its("response.body")
    .then((data) => {
      expect(data.page).to.equal(data.total_pages)
      cy.get(".thumbnail-add-button").should("not.be.visible");
  })
})
