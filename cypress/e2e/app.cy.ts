describe('Movielist 앱 테스트', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/');
  });

  context('로고를 누르면', () => {
    beforeEach(() => {
      cy.mockPopularMovies(20);
      cy.get('header h1').click();
    });

    it('인기 있는 영화 목록을 화면에 보여준다.', () => {
      cy.get('movie-list-item').should('have.length', 20);
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

    it(`모든 영화 제목은 ${query}를 포함한다.`, () => {
      cy.get('movie-list-item').each((element) => cy.wrap(element).contains(query));
    });
  });

  context('리스트가 20개일 때 더보기 버튼을 누르면', () => {
    beforeEach(() => {
      cy.mockPopularMovies(20);
      cy.get('movie-list-item').should('have.length', 20);
      cy.get('#load-more').click();
    });

    it('40개가 된다.', () => {
      cy.get('movie-list-item').should('have.length', 40);
    });
  });

  context('더보기 버튼을 눌렀을 때 20개 미만의 영화가 추가되면', () => {
    beforeEach(() => {
      cy.mockPopularMovies(10);
      cy.get('#load-more').click();
    });

    it('더보기 버튼이 화면에 보이지 않아야 한다.', () => {
      cy.get('#load-more').should('not.be.visible');
    });
  });
});
