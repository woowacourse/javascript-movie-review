import { MAX_MOVIES_PER_PAGE } from '../../src/constants';

const mockPopularMovies = (movieCount: number) => {
  cy.intercept(
    {
      method: 'GET',
      url: /^https:\/\/api.themoviedb.org\/3\/movie\/popular*/,
    },
    { fixture: `movies${movieCount}.json` }
  ).as('getPopularMovies');
};

describe('Movielist 앱 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/');
  });

  context('로고를 누르면', () => {
    beforeEach(() => {
      mockPopularMovies(MAX_MOVIES_PER_PAGE);
      cy.get('header h1').click();
    });

    it('인기 있는 영화 목록을 화면에 보여준다.', () => {
      cy.get('movie-list-item').should('have.length', MAX_MOVIES_PER_PAGE);
    });
  });

  const query = '고양이';
  context(`${query}를 검색하면`, () => {
    beforeEach(() => {
      cy.get('#search-input').type(query);
      cy.get('.search-box').submit();
    });

    it(`리스트 제목은 ${query}를 포함한다.`, () => {
      cy.get('#movie-list-title').contains(query);
    });
  });

  context(`리스트가 ${MAX_MOVIES_PER_PAGE}개일 때 더보기 버튼을 누르면`, () => {
    beforeEach(() => {
      mockPopularMovies(MAX_MOVIES_PER_PAGE);
      cy.get('movie-list-item').should('have.length', MAX_MOVIES_PER_PAGE);
      cy.get('#load-more').click();
    });

    it(`${MAX_MOVIES_PER_PAGE * 2}개가 된다.`, () => {
      cy.get('movie-list-item').should('have.length', MAX_MOVIES_PER_PAGE * 2);
    });
  });

  context(`더보기 버튼을 눌렀을 때 ${MAX_MOVIES_PER_PAGE}개 미만의 영화가 추가되면`, () => {
    beforeEach(() => {
      mockPopularMovies(10);
      cy.get('#load-more').click();
    });

    it('더보기 버튼이 화면에 보이지 않아야 한다.', () => {
      cy.get('#load-more').should('not.be.visible');
    });
  });
});
