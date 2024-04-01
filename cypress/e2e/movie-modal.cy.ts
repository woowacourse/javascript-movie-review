const RATING_MESSAGES = {
  0: '별점 미등록',
  2: '최악이에요',
  4: '별로예요',
  6: '보통이에요',
  8: '재밌어요',
  10: '명작이에요',
} as const;

describe('영화 상세 모달 테스트', () => {
  beforeEach(() => {
    cy.interceptPopularMovieAPI();
    cy.interceptMovieDetailAPI();
    cy.visit('/');
    cy.get('.movie-detail-button').eq(5).click();
  });

  it('영화를 클릭하면 모달이 뜬다.', () => {
    cy.get('dialog').should('be.visible');
  });

  it('별을 클릭하면 점수를 매길 수 있다.', () => {
    Array(5)
      .fill(null)
      .forEach((_, index) => {
        cy.get(`button[data-star-id="${index}"]`).click();
        const score = ((index + 1) * 2) as keyof typeof RATING_MESSAGES;
        cy.get('.result-number').should('contain', score);
        cy.get('.result-string').should('contain', RATING_MESSAGES[score]);
      });
  });

  it('닫기 버튼을 누르면 모달이 닫힌다.', () => {
    cy.get('.close-button').click();
    cy.get('dialog').should('not.be.visible');
  });
});
