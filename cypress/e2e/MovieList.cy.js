import { MOVIE_LIST_TYPE } from '../../src/constant/config.ts';
import ERROR_MESSAGE from '../../src/constant/errorMessage.ts';

describe('[MovieList] 영화 목록 화면 테스트', () => {
  beforeEach(() => {
    cy.testAPIWithFixture(MOVIE_LIST_TYPE.popular.type, 'movie-popular.json');
    cy.testAPIWithFixture(MOVIE_LIST_TYPE.search.type, 'movie-single-page.json');
  });
  it('로고를 클릭하면 메인 페이지로 돌아간다', () => {
    cy.visitHome();

    cy.addSearchInput('쿵푸');
    cy.submitSearchInput();

    cy.get('h2').contains('검색 결과').should('exist');

    cy.get('.logo').click();
    cy.contains('지금 인기 있는 영화').should('exist');
    cy.get('.search-box').get('input').should('not.have.value');
  });

  it('화면 최하단으로 스크롤을 내리면 영화 리스트를 더 불러온다.', () => {
    cy.visitHome();
    cy.wait(3000);

    cy.get('ul.item-list > li').then(($content) => {
      const initialContentCount = $content.length;

      cy.scrollTo('bottom');
      cy.wait(3000);

      cy.get('ul.item-list > li').should('have.length.greaterThan', initialContentCount);
    });
  });

  it('더 이상 불러올 영화 목록이 없을 경우, 화면 최하단으로 스크롤을 내려도 영화 데이터 요청이 이루어지지 않는다.', () => {
    cy.testAPIWithFixture(MOVIE_LIST_TYPE.popular.type, 'movie-single-page.json');
    cy.visitHome();
    cy.wait(3000);

    cy.get('ul.item-list > li').then(($content) => {
      const initialContentCount = $content.length;

      cy.scrollTo('bottom');
      cy.wait(3000);

      cy.get('ul.item-list > li').should('have.length', initialContentCount);
    });
  });

  it('키워드로 검색하면 검색 페이지로 전환된다.', () => {
    cy.visitHome();
    cy.addSearchInput('쿵푸');
    cy.submitSearchInput();

    cy.get('h2').contains('쿵푸').should('exist');
  });

  it('키워드와 일치하는 영화가 없으면 검색 결과가 없다고 안내한다.', () => {
    cy.testAPIWithFixture(MOVIE_LIST_TYPE.search.type, 'movie-empty-search-result.json');

    cy.visitHome();
    cy.addSearchInput('쿵푸');
    cy.submitSearchInput();

    cy.get('.empty-result').contains('검색 결과가 없습니다.').should('exist');
  });

  it('검색어를 입력하지 않으면 검색어가 없다고 안내한다.', () => {
    cy.visitHome();
    cy.submitSearchInput();

    cy.get('.toast').contains(ERROR_MESSAGE.SEARCH_KEYWORD_EMPTY).should('exist');
  });
});
