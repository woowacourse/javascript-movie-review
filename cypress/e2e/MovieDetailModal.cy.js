import { MOVIE_LIST_TYPE, CONFIG } from '../../src/constant/config.ts';
import IN_APP_MESSAGE from '../../src/constant/inAppMessage.ts';
import movieData from '../fixtures/movie-sample.json';

describe('[MovieDetailModal] 영화 상세 정보 모달 테스트', () => {
  beforeEach(() => {
    cy.testAPIWithFixture(MOVIE_LIST_TYPE.popular.type, 'movie-single-page.json');
    cy.testAPIWithSingleMovie('763215', 'movie-sample.json');
    cy.visitHome();
  });

  it('영화를 선택하면 해당 영화에 대한 상세 정보 모달을 오픈한다.', () => {
    cy.wait(3000);
    const item = cy.get('ul.item-list > li').first();

    item.should('not.have.class', 'skeleton');
    item.click();
    cy.wait(1000);

    cy.get('#movie-detail-modal').should('have.attr', 'open');
  });

  it('상세 정보 모달에는 영화 제목, 포스터, 장르 목록, 평균 별점, 줄거리, 사용자 별점 정보가 포함된다.', () => {
    cy.clickFirstMovieItem();

    cy.get('.movie-detail-container .title').should('have.text', movieData.title);
    cy.get('.movie-detail-container .poster-image').should(($element) => {
      expect($element.attr('src')).includes(movieData.poster_path);
    });
    cy.get('.movie-detail-container .movie-info').contains(movieData.genres.map((genre) => genre.name).join(', '));
    cy.get('.movie-detail-container .average-score').should('have.text', movieData.vote_average.toFixed(1));
    cy.get('.movie-detail-container .movie-overview').should('have.text', movieData.overview);
    cy.get('.movie-detail-container .user-score-container').should('be.visible');
  });

  it('사용자 별점 정보를 누르면 별점 저장 토스트가 노출되어야 한다.', () => {
    cy.clickFirstMovieItem();
    const scoreNumbers = Object.keys(CONFIG.userScore).map((score) => parseInt(score));
    const randomScoreNumber = scoreNumbers[Math.floor(Math.random() * scoreNumbers.length)];

    cy.get('.star-icons').trigger('mouseover');

    const starElement = cy.get(`#user-score-${randomScoreNumber}`);
    cy.wait(500);
    starElement.click();
    cy.wait(500);
    cy.get('.toast').contains(IN_APP_MESSAGE.updateUserScore).should('exist');
  });

  it('상세 정보 모달은 우측 상단의 닫기 버튼을 눌러 닫을 수 있어야 한다.', () => {
    cy.clickFirstMovieItem();
    cy.get('#movie-detail-close-button').click();
    cy.get('#movie-detail-modal').should('not.have.attr', 'open');
  });

  it('상세 정보 모달은 배경의 backdrop 영역을 눌러 닫을 수 있어야 한다.', () => {
    cy.clickFirstMovieItem();
    cy.get('#movie-detail-modal').click({ force: true });
    cy.get('#movie-detail-modal').should('not.have.attr', 'open');
  });
});
