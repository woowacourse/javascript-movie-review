/// <reference types="cypress" />

describe('검색 영화 목록 테스트', () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: 'GET',
        url: /^https:\/\/api\.themoviedb\.org\/3\/search\/movie\?.*/
      },
      { fixture: 'movie-search.json' }
    ).as('getSearchMovies');

    cy.visit('http://localhost:5173');

    cy.get('input[name="keyword"]').type('짱구');
    cy.get('form').submit();
  });

  it('사용자의 검색 결과에 따른 영화 목록이 렌더링 되어야한다', () => {
    cy.wait('@getSearchMovies').then((interception) => {
      const searchMovies = interception?.response?.body.results;
      expect(searchMovies.length).to.equal(20);

      const searchMovieItems = cy.get('.thumbnail-list > li');
      expect(searchMovieItems.should('have.length', 20));
    });
  });

  it('사용자의 검색 결과에 따른 영화 제목이 올바르게 표시되어야 한다.', () => {
    cy.wait('@getSearchMovies');

    cy.get('.thumbnail-list > li').first().contains('Jang-gu and Daengchili');
    cy.get('.thumbnail-list > li').eq(1).contains('맹구 짱구 스트리트 화이어 2');
  });

  it('"사용자의 검색 결과에 따른 목록에 "더보기" 버튼을 클릭하면 추가 영화가 로드되어야 한다.', () => {
    cy.wait('@getSearchMovies');

    cy.get('.thumbnail-list > li').should('have.length', 20);

    cy.get('#moreButton').click();

    cy.get('.thumbnail-list > li').should('have.length', 40);
  });
});

describe('검색을 한 뒤 검색 결과가 없을 경우 사용자에게 보여주는 메시지 확인', () => {
  beforeEach(() => {
    cy.intercept({
      method: 'GET',
      url: /^https:\/\/api\.themoviedb\.org\/3\/search\/movie\?.*/
    }).as('getSearchMovies');

    cy.visit('http://localhost:5173');
  });

  it('사용자의 검색 결과에 따른 영화 제목이 올바르게 표시되어야 한다.', () => {
    cy.get('input[name="keyword"]').type('ㅇㄹㅇㄹㄴㅇㄹ');
    cy.get('form').submit();

    cy.get('.no-result').children().contains('검색 결과가 없습니다.');
  });
});
