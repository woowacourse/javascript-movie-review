import { MOVIE_LIST_TYPE } from '../../src/constant/config.ts';

describe('영화 e2e 테스트', () => {
  it('로고를 클릭하면 메인 페이지로 돌아간다', () => {
    cy.visitHome();

    cy.addSearchInput('쿵푸');
    cy.submitSearchInput();

    cy.get('h2').contains('검색 결과').should('exist');

    cy.get('.logo').click();
    cy.contains('지금 인기 있는 영화').should('exist');
    cy.get('.search-box').get('input').should('not.have.value');
  });

  it('더보기를 누르면 영화 리스트를 더 불러온다.', () => {
    cy.visitHome();

    cy.contains('더 보기').click();
    cy.get('ul.item-list > li').should('have.length.greaterThan', 20);
  });

  it('더 불러올 영화 목록이 없으면 더 보기 버튼을 띄우지 않는다.', () => {
    cy.testAPIWithFixture(MOVIE_LIST_TYPE.popular.type, 'movie-single-page.json');

    cy.visitHome();

    cy.contains('더 보기').should('have.css', 'visibility', 'hidden');
  });

  it('키워드로 검색하면 검색 페이지로 전환된다.', () => {
    cy.testAPIWithFixture(MOVIE_LIST_TYPE.search.type, 'movie-single-page.json');

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

    cy.get('.empty-search-result').contains('검색 결과가 없습니다.').should('exist');
  });

  it('검색어를 입력하지 않으면 검색어가 없다고 안내한다.', () => {
    cy.visitHome();
    cy.submitSearchInput();

    cy.get('.toast').contains('검색어를 입력해주세요.').should('exist');
  });
});
