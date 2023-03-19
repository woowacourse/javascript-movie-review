describe('Movie-Review e2e Test', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080');
  });

  it('처음 홈페이지에 들어갔을 때 영화 리스트가 잘 보여야 한다.', () => {
    cy.intercept(
      {
        method: 'GET',
        url: /^https:\/\/api.themoviedb.org\/3\/movie\/popular*/,
      },
      { fixture: 'movie-popular.json' },
    ).as('moviePopular');

    cy.wait('@moviePopular').then((interception) => {
      cy.get('.item-title').first().should('have.text', '장화신은 고양이: 끝내주는 모험');
    });
  });

  it('검색했을 경우 검색 결과가 화면에 보여야 한다.', () => {
    cy.get('input').type('아이언맨');
    cy.get('.search-button').click();
    cy.get('.item-title').first().should('contain', '아이언맨');
  });

  it('마지막 페이지인 경우 더보기 버튼이 화면에 출력되지 않아야 한다.', () => {
    cy.intercept(
      {
        method: 'GET',
        url: /^https:\/\/api.themoviedb.org\/3\/movie\/popular*/,
      },
      { fixture: 'movie-popular.json' },
    ).as('moviePopular');

    cy.wait('@moviePopular').then(() => {
      cy.get('.btn').click();
      cy.get('.btn').should('have.class', 'button-close');
    });
  });

  it('API 요청 후 로딩시 skeleton이 화면에 보여야 한다.', () => {
    cy.get('input').type('아이언맨');
    cy.get('.search-button').click();
    cy.get('.item-card').children().first().should('have.class', 'skeleton');
  });

  it('더 보기 버튼을 눌렀을 때 다음 목록이 로딩되어야 한다.', () => {
    cy.intercept(
      {
        method: 'GET',
        url: /^https:\/\/api.themoviedb.org\/3\/movie\/popular*/,
      },
      { fixture: 'movie-popular.json' },
    ).as('moviePopular');

    cy.wait('@moviePopular').then(() => {
      cy.get('.btn').click();
      cy.get('.item-list').children().should('have.length', 40);
    });
  });
});
