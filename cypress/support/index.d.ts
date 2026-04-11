declare namespace Cypress {
  interface Chainable {
    mockPopularMovies(page: number): Chainable<undefined>;
    mockSearchMovies(searchQuery: string, page: number, jsonFile: string): Chainable<undefined>;
    performSearch(searchQuery: string): Chainable<void>;
    verifyMovieItems(allResults: Movies[]): Chainable<void>;
    disappearMoreButton(): Chainable<void>;
  }
}
