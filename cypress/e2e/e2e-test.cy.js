describe('영화 e2e 테스트', () => {
  it('로고를 클릭하면 메인 페이지로 돌아간다', () => {
    cy.visit('/');

    cy.get('.search-box').get('input').type('쿵푸');
    cy.get('.search-box').submit();

    cy.get('h2').contains('검색 결과').should('exist');

    cy.get('.logo').click();
    cy.contains('지금 인기있는 영화').should('exist');
    cy.get('.search-box').get('input').should('not.have.value');
  });

  it('스크롤을 제일 아래로 내리면 새로운 영화 목록을 보여준다.', () => {
    cy.visit('/');

    cy.window().scrollTo('bottom');
    cy.get('ul.item-list > li').should('have.length.greaterThan', 20);
  });

  it('더 불러올 영화 목록이 없으면 무한스크롤을 멈춘다.', () => {
    cy.intercept(
      {
        method: 'GET',
        url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular*/,
      },
      { fixture: 'movie-single-page.json' },
    );

    cy.visit('/');

    cy.contains('더 보기').should('have.css', 'visibility', 'hidden');
  });

  it('키워드로 검색하면 검색 페이지로 전환된다.', () => {
    cy.intercept(
      {
        method: 'GET',
        url: /^https:\/\/api\.themoviedb\.org\/3\/search\/movie*/,
      },
      { fixture: 'movie-single-page.json' },
    );

    cy.visit('/');

    cy.get('.search-box').get('input').type('쿵푸');
    cy.get('.search-box').submit();

    cy.get('h2').contains('쿵푸').should('exist');
  });

  it('키워드와 일치하는 영화가 없으면 검색 결과가 없다고 안내한다.', () => {
    cy.intercept(
      {
        method: 'GET',
        url: /^https:\/\/api\.themoviedb\.org\/3\/search\/movie*/,
      },
      { fixture: 'movie-empty-search-result.json' },
    );

    cy.visit('/');

    cy.get('.search-box').get('input').type('쿵푸');
    cy.get('.search-box').submit();

    cy.get('.empty-search-result').contains('검색 결과가 없습니다.').should('exist');
  });

  it('검색어를 입력하지 않으면 검색어가 없다고 안내한다.', () => {
    cy.visit('/');

    cy.get('.search-box').submit();

    cy.get('.toast').contains('검색어를 입력해주세요.').should('exist');
  });
});
