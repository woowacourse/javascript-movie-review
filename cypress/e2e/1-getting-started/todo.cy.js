describe('선호 버튼 클릭 시 선호식당 목록에 추가', () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: 'GET',
        url: /^https:\/\/api.themoviedb.org\/3\/movie\/popular\?[^#]*page=1/,
      },
      { fixture: 'popular_1Page.json' }
    ).as('fetchPopularMoviePage1Data');

    cy.intercept(
      {
        method: 'GET',
        url: /^https:\/\/api.themoviedb.org\/3\/movie\/popular\?[^#]*page=2/,
      },
      { fixture: 'popular_2Page.json' }
    ).as('fetchPopularMoviePage2Data');

    cy.intercept(
      {
        method: 'GET',
        url: /^https:\/\/api.themoviedb.org\/3\/search\/movie\?[^#]*page=1/,
      },
      { fixture: 'search_1Page.json' }
    ).as('fetchSearchMoviePage1Data');

    cy.intercept(
      {
        method: 'GET',
        url: /^https:\/\/api.themoviedb.org\/3\/search\/movie\?[^#]*page=2/,
      },
      { fixture: 'search_2Page.json' }
    ).as('fetchSearchMoviePage2Data');

    cy.intercept(
      {
        method: 'GET',
        url: /^https:\/\/api.themoviedb.org\/3\/search\/movie\?[^#]*page=3/,
      },
      { fixture: 'search_3Page.json' }
    ).as('fetchSearchMoviePage3Data');
  });

  it('최초 페이지 진입 시 20개 영화 보여주기', () => {
    cy.visit('http://localhost:8080/');
    cy.get('.item-list').children().should('have.length', 20);
  });

  it('최초 페이지 진입 시 더보기 버튼 보여주기', () => {
    cy.visit('http://localhost:8080/');
    cy.get('#more-movie-btn').should('be.visible');
  });

  it('더보기 버튼을 클릭 시 20개 영화 추가로 보여주기', () => {
    cy.visit('http://localhost:8080/');
    cy.get('#more-movie-btn').click();
    cy.get('.item-list').children().should('have.length', 40);
  });

  it('"해리"검색시 영화 20개 보여주기', () => {
    cy.visit('http://localhost:8080/');

    cy.get('#search-movie-box > label > input').type('해리');
    cy.get('#search-movie-box > label > button').click();
    cy.get('.item-list').children().should('have.length', 20);
  });

  it('"해리"검색시 영화 제목 \'"해리" 검색 결과\'로  보여주기', () => {
    cy.visit('http://localhost:8080/');

    cy.get('#search-movie-box > label > input').type('해리');
    cy.get('#search-movie-box > label > button').click();
    cy.get('.page-header').contains('"해리" 검색 결과');
  });

  it('검색 후 더보기버튼을 클릭하면 영화 20개 목록 보여주기', () => {
    cy.visit('http://localhost:8080/');

    cy.get('#search-movie-box > label > input').type('해리');
    cy.get('#search-movie-box > label > button').click();
    cy.get('#more-movie-btn').click();
    cy.get('.item-list').children().should('have.length', 40);
  });

  it('검색 후 더보기버튼을 2번 클릭하면 영화 6개 목록 보여주기', () => {
    cy.visit('http://localhost:8080/');

    cy.get('#search-movie-box > label > input').type('해리');
    cy.get('#search-movie-box > label > button').click();
    cy.get('#more-movie-btn').click();
    cy.get('#more-movie-btn').click();
    cy.get('.item-list').children().should('have.length', 46);
  });

  it('검색 후 더보기버튼을 2번 클릭하면 더보기 버튼 감추기', () => {
    cy.visit('http://localhost:8080/');

    cy.get('#search-movie-box > label > input').type('해리');
    cy.get('#search-movie-box > label > button').click();
    cy.get('#more-movie-btn').click();
    cy.get('#more-movie-btn').click();
    cy.get('#more-movie-btn').should('not.be.visible');
  });

  it('검색 후 로고를 킬릭하면 "지금 인기 있는 영화"을 보여주기', () => {
    cy.visit('http://localhost:8080/');

    cy.get('#search-movie-box > label > input').type('해리');
    cy.get('#search-movie-box > label > button').click();
    cy.get('#logo-img').click();
    cy.get('.page-header').contains('지금 인기 있는 영화');
  });

  it('검색 후 더보기버튼을 2번 클릭하고 로고 클릭 시 더보기 버튼 다시 보여주기', () => {
    cy.visit('http://localhost:8080/');

    cy.get('#search-movie-box > label > input').type('해리');
    cy.get('#search-movie-box > label > button').click();
    cy.get('#more-movie-btn').click();
    cy.get('#more-movie-btn').click();
    cy.get('#logo-img').click();
    cy.get('#more-movie-btn').should('be.visible');
  });
});
