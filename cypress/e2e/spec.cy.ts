import MOCK_PAGE_1 from '../../__test__/mock/page_1.json';
import MOCK_PAGE_2 from '../../__test__/mock/page_2.json';
import MOCK_ERROR from '../../__test__/mock/page_error.json';

describe('영화 리뷰 앱 E2E 테스트', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/movie/popular?*page=1*', {
      statusCode: 200,
      body: MOCK_PAGE_1,
    }).as('getPopularMovies');

    cy.intercept('GET', '**/movie/popular?*page=2*', {
      statusCode: 200,
      body: MOCK_PAGE_2,
    }).as('getNextPopularMovies');
  });

  context('1. 메인 페이지 (인기 영화)', () => {
    it('메인 페이지에 접속하면 인기 영화 20개를 렌더링한다.', () => {
      cy.visit('http://localhost:5175/');
      cy.wait('@getPopularMovies');

      cy.get('.thumbnail-list > li').should('have.length', 20);
    });

    it('더보기 버튼을 누르면 다음 페이지의 영화 20개를 추가로 렌더링한다.', () => {
      cy.visit('http://localhost:5175/');
      cy.wait('@getPopularMovies');

      cy.get('.more-button').click();
      cy.wait('@getNextPopularMovies');

      cy.get('.thumbnail-list > li').should('have.length', 40);
    });
  });

  context('2. 검색 기능', () => {
    it('검색창에 검색어를 입력하고 엔터를 누르면 검색 결과 페이지로 이동한다.', () => {
      const encodedQuery = encodeURIComponent('해리포터');

      cy.intercept('GET', `**/search/movie?*query=${encodedQuery}*`, {
        statusCode: 200,
        body: MOCK_PAGE_1,
      }).as('getSearchMovies');

      cy.visit('http://localhost:5175/');

      cy.get('input[name="q"]').type('해리포터{enter}');
      cy.wait('@getSearchMovies');

      cy.url().should('include', `/search?query=${encodedQuery}`);
      cy.get('.thumbnail-list > li').should('have.length', 20);
    });

    it('검색 결과가 없는 경우 "검색 결과가 없습니다" UI를 띄워준다.', () => {
      const emptyMockData = { page: 1, results: [], total_pages: 0 };

      const encodedEmptyQuery = encodeURIComponent('ㅇㅅㅇ');

      cy.intercept('GET', `**/search/movie?*query=${encodedEmptyQuery}*`, {
        statusCode: 200,
        body: emptyMockData,
      }).as('getEmptyMovies');

      cy.visit('http://localhost:5175/');
      cy.get('input[name="q"]').type('ㅇㅅㅇ{enter}');
      cy.wait('@getEmptyMovies');

      cy.get('.nothing').should('be.visible');
      cy.get('.nothing p').contains('검색 결과가 없습니다.');
    });
  });

  context('3. 예외 처리 (API 에러)', () => {
    it('네트워크 통신에 실패할 경우 에러 메시지를 화면에 표시한다.', () => {
      cy.on('uncaught:exception', (err, runnable) => {
        return false;
      });

      cy.intercept('GET', '**/movie/popular?*', {
        statusCode: 500,
        body: MOCK_ERROR,
      }).as('getApiError');

      cy.visit('http://localhost:5175/');
      cy.wait('@getApiError');
      cy.get('.nothing').should('be.visible');
      cy.get('.nothing p').should('contain', 'TMDB에러입니다');
    });
  });
});
