import { BASE_URL } from '../../src/constant/setting';

describe('검색 페이지 테스트', () => {
  const POPULAR_MOVIES_URL = `${BASE_URL}/movie/popular`;

  beforeEach(() => {
    cy.visit('http://localhost:8080');
    cy.viewport(550, 950);
  });

  it('입력한 검색어가 포함된 검색 결과를 확인할 수 있다.', () => {
    cy.get('.search-input').type('짱구');
    cy.get('.search-box').submit();
    cy.get('.item-list li').each(($li) => {
      cy.wrap($li).find('.item-title').should('contain', '짱구');
    });
  });

  it('검색 영화 목록 API를 호출하면 한 번에 20개씩 목록에 나열되어야 한다', () => {
    const searchMovieUrl =
      POPULAR_MOVIES_URL +
      '?' +
      new URLSearchParams({
        api_key: Cypress.env('API_KEY'),
        language: 'ko-KR',
        page: '1',
      });
    cy.request('GET', searchMovieUrl).as('searchMovies');
    cy.get('@searchMovies').its('status').should('eq', 200);
    cy.get('@searchMovies').its('body.results').should('have.length', 20);
  });

  it("검색 결과가 존재하지 않을 때 '해당 키워드에 해당하는 영화가 없습니다.' 문구를 띄운다.", () => {
    cy.get('.search-input').clear().type(' ');
    cy.get('.search-box').submit();
    cy.get('.error-message').should(
      'have.text',
      '해당 키워드로 작품을 찾을 수 없습니다. 다른 키워드를 입력해주세요.',
    );
  });
});
