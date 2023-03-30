import interceptFetch from '../utils/interceptFetch';
import movieCountEqualsTo from '../utils/movieCountEqualsTo';

describe('인기 영화 목록 테스트', () => {
  it('사이트 첫 접속시 인기영화 목록 출력', () => {
    interceptFetch('movie-popular-page1.json');
      
    cy.visit('localhost:8080');

    movieCountEqualsTo(20);
  });

  it('스크롤 시 자동으로 인기영화 목록 추가', () => {
    interceptFetch('movie-popular-page1.json');

    cy.visit('localhost:8080');

    interceptFetch('movie-popular-page2.json');

    cy.scrollTo('bottom', { duration: 500 });

    movieCountEqualsTo(40);
  });
});
