describe('popular movie test', () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: 'GET',
        url: /^https:\/\/api.themoviedb.org\/3\/movie\/popular*/,
      },
      { fixture: 'movie-popular.json' }
    ).as('moviePopular');
    cy.visit('http://localhost:8080');
  });

  it('페이지 접속 시 20개의 스켈레톤이 발생한다.', () => {
    cy.wait('@moviePopular').then(interception => {
      cy.get('.item-thumbnail.skeleton').should('have.length', 20);
    });
  });

  it('페이지 접속 시 20개의 아이템이 로딩된다.', () => {
    cy.wait('@moviePopular').then(interception => {
      cy.get('.movie-list .item-card').should('have.length', 20);
    });
  });

  it('로고 클릭 시 20개의 스켈레톤이 발생한다.', () => {
    cy.get('.header h1').click();

    cy.wait('@moviePopular').then(interception => {
      cy.get('.item-thumbnail.skeleton').should('have.length', 20);
    });
  });

  it('로고 클릭 시 20개의 아이템이 로딩된다.', () => {
    cy.get('.header h1').click();

    cy.wait('@moviePopular').then(interception => {
      cy.get('.movie-list .item-card').should('have.length', 20);
    });
  });

  it('더보기 버튼 클릭 시 20개의 스켈레톤이 발생한다.', () => {
    cy.get('.btn').click();

    cy.wait('@moviePopular').then(interception => {
      cy.get('.item-thumbnail.skeleton').should('have.length', 20);
    });
  });

  it('더보기 버튼 클릭 시 40개의 아이템이 로딩된다..', () => {
    cy.get('.btn').click();

    cy.wait('@moviePopular').then(interception => {
      cy.get('.movie-list .item-card').should('have.length', 40);
    });
  });
});
