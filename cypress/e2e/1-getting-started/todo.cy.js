describe('영화리뷰 e2e 테스트', () => {
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

  it('검색 후 로고를 킬릭하면 "지금 인기 있는 영화"을 보여주기', () => {
    cy.visit('http://localhost:8080/');

    cy.get('#search-movie-box > label > input').type('해리');
    cy.get('#search-movie-box > label > button').click();
    cy.get('#logo-img').click();
    cy.get('.page-header').contains('지금 인기 있는 영화');
  });

  it('인기목록에서 스크롤하면 20개 영화 추가로 보여주기', () => {
    cy.visit('http://localhost:8080/');

    cy.wait(1000);
    cy.scrollTo(0, 4000);
    cy.get('.item-list').children().should('have.length', 40);
  });

  it('검색화면에서 스크롤하면 20개 영화 추가로 보여주기', () => {
    cy.visit('http://localhost:8080/');

    cy.get('#search-movie-box > label > input').type('해리');
    cy.get('#search-movie-box > label > button').click();

    cy.wait(500);
    cy.scrollTo(0, 4000);
    cy.get('.item-list').children().should('have.length', 40);
  });

  it('검색화면에서 끝까지 스크롤하면 총 46개 영화 보여주기', () => {
    cy.visit('http://localhost:8080/');

    cy.get('#search-movie-box > label > input').type('해리');
    cy.get('#search-movie-box > label > button').click();

    cy.wait(500);
    cy.scrollTo(0, 4000);

    cy.wait(500);
    cy.scrollTo(0, 4000);
    cy.get('.item-list').children().should('have.length', 46);
  });

  it('인기 목록에서 영화 아이템 클릭하면 해당 영화 모달 창 열기', () => {
    cy.visit('http://localhost:8080/');

    cy.get('[data-id=804150]').click();
    cy.get('.modal-movie-info').should('be.visible');
  });

  it('모달창에서 닫기 버튼 누르면 모달창 닫기', () => {
    cy.visit('http://localhost:8080/');

    cy.get('[data-id=804150]').click();
    cy.get('.modal-close').click();
    cy.get('.modal-movie-info').should('not.be.visible');
  });

  it('모달창에서 별점 위에 마우스를 두면 옆 텍스트 변화', () => {
    cy.visit('http://localhost:8080/#$');

    cy.get('[data-id=804150]').click();
    cy.get('#star-index-5').trigger('mouseover');
    cy.get('.modal-movie-score-text').contains('10 명작이에요');
  });

  it('검색하고 모달창에서 닫기 버튼 누르면 모달창 닫기', () => {
    cy.visit('http://localhost:8080/');

    cy.get('#search-movie-box > label > input').type('해리');
    cy.get('#search-movie-box > label > button').click();

    cy.get('[data-id=671]').click();
    cy.get('.modal-close').click();
    cy.get('.modal-movie-info').should('not.be.visible');
  });

  it('검색하고 모달창에서 별점 위에 마우스를 두면 옆 텍스트 변화', () => {
    cy.visit('http://localhost:8080/#$');

    cy.get('#search-movie-box > label > input').type('해리');
    cy.get('#search-movie-box > label > button').click();

    cy.get('[data-id=671]').click();
    cy.get('#star-index-5').trigger('mouseover');
    cy.get('.modal-movie-score-text').contains('10 명작이에요');
  });
});
