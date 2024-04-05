import { BASE_URL, TITLE_TEXT } from '../../src/constant/setting';

describe('인기 영화 페이지 테스트', () => {
  const POPULAR_MOVIES_URL = `${BASE_URL}/movie/popular`;

  beforeEach(() => {
    cy.visit('http://localhost:8080');
    cy.viewport(550, 950);
  });

  it('첫 페이지 로딩시 지금 인기 있는 영화를 확인할 수 있다.', () => {
    cy.get('h2').should('contain', TITLE_TEXT.POPULAR);
  });

  it('한 페이지당 20개의 영화 목록을 확인할 수 있다.', () => {
    cy.get('.item-list').find('li').should('have.length', 20);
  });

  it('가져올 데이터가 있을 때 페이지 하단에 도달시 다음 인기 영화 목록을 확인할 수 있다.', () => {
    cy.get('.item-list').should('be.visible');
    cy.scrollTo('bottom');
    cy.get('.item-list').should('have.length.at.least', 1);
  });

  it('인기 영화 목록 API를 호출하면 한 번에 20개씩 목록에 나열되어야 한다', () => {
    const popularMovieUrl =
      POPULAR_MOVIES_URL +
      '?' +
      new URLSearchParams({
        api_key: Cypress.env('API_KEY'),
        language: 'ko-KR',
        page: '1',
      });
    cy.request('GET', popularMovieUrl).as('popularMovies');
    cy.get('@popularMovies').its('status').should('eq', 200);
    cy.get('@popularMovies').its('body.results').should('have.length', 20);
  });
});
