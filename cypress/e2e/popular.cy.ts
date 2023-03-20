import interceptFetch from '../utils/interceptFetch';
import movieCountEqualsTo from '../utils/movieCountEqualsTo';

describe('인기 영화 목록 테스트', () => {
  it('사이트 첫 접속시 인기영화 목록 출력', () => {
    interceptFetch('movie-popular-page1.json');
      
    cy.visit('localhost:8080');

    movieCountEqualsTo(20);
  });

  it('더보기 버튼 클릭 시 인기영화 목록 추가', () => {
    interceptFetch('movie-popular-page1.json');

    cy.visit('localhost:8080');

    interceptFetch('movie-popular-page2.json');
    cy.get('section.item-view').children('button').click();

    movieCountEqualsTo(40);
  });
});
