declare namespace Cypress {
  interface Chainable {
    openDetailModal(): Chainable<JQuery<HTMLElement>>;
    rateMovie(): Chainable<JQuery<HTMLElement>>;
    scrollToLoadMovies(): Chainable<JQuery<HTMLElement>>;
    closeDetailModalByESC(): Chainable<JQuery<HTMLElement>>;
    closeModalByBackdrop(): Chainable<JQuery<HTMLElement>>;
    closeDetailModalByIcon(): Chainable<JQuery<HTMLElement>>;
  }
}
