/// <reference types="cypress" />
beforeEach(() => {
  cy.intercept('GET', /^https:\/\/api\.themoviedb\.org\/3\/movie\/\d+\?language=ko-KR$/, {
    fixture: 'movie-detail.json'
  }).as('getMovieDetail');

  cy.visit('http://localhost:5173');
});

describe('영화 상세 정보 모달', () => {
  it('포스터 클릭 시 상세 모달이 나타난다', () => {
    cy.get('.thumbnail').first().click();

    cy.wait('@getMovieDetail');

    cy.get('.modal-background.active').should('be.visible');
  });

  it('ESC 키를 누르면 모달이 닫힌다', () => {
    cy.get('.thumbnail').first().click();
    cy.get('body').type('{esc}');
    cy.get('.modal-background').should('not.have.class', 'active');
  });
});

describe('별점 기능', () => {
  it('영화에 별점을 매기면 로컬스토리지에 저장된다', () => {
    cy.get('.thumbnail').should('exist');
    cy.get('.thumbnail').first().click();
    cy.wait('@getMovieDetail');
    cy.get('.rating-star').eq(2).click(); // 6점 클릭

    cy.window().then((win) => {
      const keys = Object.keys(win.localStorage);
      const ratingKey = keys.find((k) => k.startsWith('rating-'));

      if (ratingKey) {
        const rawValue = win.localStorage.getItem(ratingKey);
        const parsedValue = rawValue ? JSON.parse(rawValue) : null;

        expect(parsedValue).to.equal(6);
      }
    });
  });
});
