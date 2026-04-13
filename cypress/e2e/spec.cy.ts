import MOCK_PAGE_1 from '../../__test__/mock/page_1.json';
import MOCK_PAGE_2 from '../../__test__/mock/page_2.json';
import MOCK_ITEM_1 from '../../__test__/mock/item_1.json';
import MOCK_ERROR from '../../__test__/mock/page_error.json';

describe('e2e 테스트', () => {
  beforeEach(() => {
    cy.intercept('GET', '**/movie/popular?*page=1*', {
      statusCode: 200,
      body: MOCK_PAGE_1,
    }).as('getPopularMoviePage1');

    cy.intercept('GET', '**/movie/popular?*page=2*', {
      statusCode: 200,
      body: MOCK_PAGE_2,
    }).as('getPopularMoviePage2');

    cy.intercept('GET', '**/movie/[0-9]*', {
      statusCode: 200,
      body: MOCK_ITEM_1,
    }).as('getMovieDetail');
  });

  context('사용자는 접속하여 홈페이지에서 영화 리스트를 볼 수 있다', () => {
    it('메인 페이지의 소개 문구 확인', () => {
      cy.visit('http://localhost:5173/');
      cy.wait('@getPopularMoviePage1');

      cy.get('.top-rated-movie .title').should('have.text', MOCK_PAGE_1.results[0].title);
      cy.get('section h2').should('have.text', '지금 인기있는 영화');
      cy.get('.thumbnail-list > li').should('have.length', 20);
    });

    it('스크롤을 내리면 다음 페이지의 영화 20개를 추가로 렌더링한다.', () => {
      cy.visit('http://localhost:5173/');
      cy.wait('@getPopularMoviePage1');

      cy.scrollTo('bottom');
      cy.wait('@getPopularMoviePage2');

      cy.get('.thumbnail-list > li').should('have.length', 40);
    });

    it('영화 리스트 중 하나 클릭했다가 취소하고 나온다 ESC도 가능해야한다', () => {
      cy.visit('http://localhost:5173/');
      cy.wait('@getPopularMoviePage1');

      cy.get('ul li:first-child').click();
      cy.get('.modal').should('be.visible');

      cy.get('.close-modal').click();
      cy.get('.modal').should('not.be.visible');

      cy.get('body').type('{esc}');
      cy.get('.modal').should('not.be.visible');
    });
  });

  context('모달', () => {
    it('사용자는 모달을 열고 평점을 6점준다. 별점은 로컬 스토리지에 저장된다', () => {
      cy.visit('http://localhost:5173/');
      cy.wait('@getPopularMoviePage1');

      cy.get('ul li:first-child').click();
      cy.get('.modal').should('be.visible');

      cy.get('.modal-description h2').should('contain', MOCK_ITEM_1.title);
      cy.get('.rate span').should('contain', MOCK_ITEM_1.vote_average.toFixed(1));
      cy.get('.star-container .submit-star-button').eq(2).click();

      cy.get('.star-container .submit-star-button').each(($el, index) => {
        const img = $el.find('img');
        if (index <= 2) {
          cy.wrap(img).should('have.attr', 'alt', 'star_filled');
        } else {
          cy.wrap(img).should('have.attr', 'alt', 'star_empty');
        }
      });
    });
  });

  context('검색 기능', () => {
    it('검색창에 검색어를 입력하고 엔터를 누르면 검색 결과 페이지로 이동한다.', () => {
      const encodedQuery = encodeURIComponent('해리포터');

      cy.intercept('GET', `**/search/movie?*query=${encodedQuery}*`, {
        statusCode: 200,
        body: MOCK_PAGE_1,
      }).as('getSearchMovies');

      cy.visit('http://localhost:5173/');

      cy.get('input[name="q"]').type('해리포터{enter}');
      cy.wait('@getSearchMovies');

      cy.url().should('include', `/search?query=${encodedQuery}`);
      cy.get('.thumbnail-list li').should('have.length', 20);
    });

    it('검색 결과가 없는 경우 "검색 결과가 없습니다" UI를 띄워준다.', () => {
      const emptyMockData = { page: 1, results: [], total_pages: 0 };

      const encodedEmptyQuery = encodeURIComponent('궤뚫쉟헽');

      cy.intercept('GET', `**/search/movie?*query=${encodedEmptyQuery}*`, {
        statusCode: 200,
        body: emptyMockData,
      }).as('getEmptyMovies');

      cy.visit('http://localhost:5173/');
      cy.get('input[name="q"]').type('궤뚫쉟헽{enter}');
      cy.wait('@getEmptyMovies');

      cy.get('.nothing').should('be.visible');
      cy.get('.nothing p').contains('검색 결과가 없습니다.');
    });
  });

  context('API 에러', () => {
    it('에러가 발생 시 에러 컴포넌트를 불러옴', () => {
      cy.intercept('GET', '**/movie/popular?*', {
        statusCode: 500,
        body: MOCK_ERROR,
      }).as('getApiError');

      cy.visit('http://localhost:5173/');
      cy.wait('@getApiError');
      cy.get('.nothing').should('be.visible');
      cy.get('.nothing p').should('contain', '에러');
    });
  });
});
