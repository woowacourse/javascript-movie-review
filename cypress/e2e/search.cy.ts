import { ERROR_MESSAGE } from '../../src/constants/errorMessage';

describe('검색결과가 없을 경우 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
    cy.get('.searchbar__input').type('ㅎㅎ');
    cy.get('.searchbar__icon').click();
  });

  it('검색 결과가 없는 검색어를 입력하면, 검색 결과 없음 메시지를 띄워줘야 한다.', () => {
    cy.get('body').contains(ERROR_MESSAGE.NO_RESULT);
  });

  it('검색 결과가 없는 검색어를 입력하면, 작품이 렌더링 되지 않는다.', () => {
    cy.get('.item').should('have.length', 0);
  });
});

describe('검색 결과가 있는 경우 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173');
  });

  it('검색어를 입력하면, 그에 맞는 결과를 보여줘야 한다.', () => {
    cy.get('.searchbar__input').type('미키');
    cy.get('.searchbar__icon').click();

    cy.get('.item').should('have.length.at.least', 1);
    cy.get('.item').first().contains('미키');
  });

  it('[무한스크롤] 검색어를 입력하고, 하단까지 스크롤 할 경우 20개의 아이템을 더 띄워줘야 한다.', () => {
    cy.get('.searchbar__input').type('aa');
    cy.get('.searchbar__icon').click();

    cy.scrollToLoadMovies();
  });

  it('[상세모달] 메인화면에서 Movie Item을 클릭할 경우 상세 모달이 띄워진다', () => {
    cy.viewport(1280, 3000);

    cy.openDetailModal();
  });

  it('[상세모달] esc를 누를 경우 모달이 꺼진다', () => {
    cy.closeDetailModalByESC();
  });

  it('[상세모달] X 아이콘을 누를 경우 모달이 꺼진다', () => {
    cy.closeDetailModalByIcon();
  });

  it('[상세모달] 모달 배경을 누를 경우 모달이 꺼진다', () => {
    cy.viewport(1280, 3000);

    cy.closeModalByBackdrop();
  });

  it('[별점 기록] 상세 모달창에서 별점을 기록할 경우, 해당 점수와 점수에 따른 멘트가 렌더링된다', () => {
    cy.openDetailModal();
    cy.rateMovie();
  });
});
