describe('영화 상세정보 API 테스트', () => {
  const title = '쿵푸팬더 4';
  const movieId = 1011985;

  beforeEach(() => {
    cy.visit('/');

    cy.contains(title).click();
  });

  it(`${title}제목의 영화를 클릭했을 때, 해당 영화에 대한 상세정보가 출력된다.`, () => {
    cy.get('.movie-detail-title').should('have.text', title);
  });

  it(`${title}의 첫번 째 별을 클릭했을 때, 해당 영화 평점이 로컬스토리지에 기록된다.`, () => {
    cy.get('.star').first().click();

    cy.window().then((win) => {
      const value = JSON.parse(win.localStorage.getItem('movieDetails'));

      expect(value[movieId].my_grade).to.equal(2);
    });
  });
});
