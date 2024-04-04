import { MOVIE_API_URL } from '../../src/constants/url';

describe('영화 상세보기 모달 테스트', () => {
  beforeEach(() => {
    cy.intercept({
      method: 'GET',
      url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular*/,
    }).as('getPopularMovies');
    cy.intercept({
      method: 'GET',
      url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/\d/,
    }).as('getDetailMovie');
    cy.intercept({
      method: 'GET',
      url: /^https:\/\/api\.themoviedb\.org\/3\/search\/movie*/,
    }).as('getSearchMovies');
    cy.visit('/');
  });

  it('영화 상세보기 API를 호출하면 해당 영화의 poster_path를 반환해야한다.', () => {
    const movieId = 1011985;
    const params = `/${movieId}?language=ko-KR`;
    const movieDetailUrl = MOVIE_API_URL + params;

    cy.request({
      url: movieDetailUrl,
      method: 'GET',
      headers: {
        Authorization: `Bearer ${Cypress.env('ACCESS_TOKEN')}`,
        accept: 'application/json',
      },
    }).as('detailMovies');

    cy.get('@detailMovies').its('status').should('eq', 200);
    cy.get('@detailMovies').its('body').should('have.a.property', 'poster_path');
  });

  it('해리를 검색하고 해리 포터와 비밀의 방을 클릭하면 해당 영화의 상세 정보를 조회할 수 있다.', () => {
    const movieTitle = '해리 포터와 비밀의 방';
    cy.get('#search-input').type('해리{enter}');

    cy.wait('@getSearchMovies').then(search => {
      if (search.response === undefined) return;
      cy.get('.item-card > .item-title').first().click();
      const movieDetailTitle = cy.get('.detail-modal-container').first().get('#modal-title');
      expect(movieDetailTitle.should('have.text', movieTitle));
    });
  });

  it('상세보기 모달에서 해당 영화의 별점을 매길 수 있는데 첫번째 별을 클릭하면 "2점"을 매기고 "최악이예요" 텍스트를 출력한다.', () => {
    const scoreNumber = 2;
    const scoreText = '최악이예요';
    cy.get('#search-input').type('해리{enter}');

    cy.wait('@getSearchMovies').then(search => {
      if (search.response === undefined) return;
      cy.get('.item-card').first().click();

      cy.wait('@getDetailMovie').then(interception => {
        if (interception.response === undefined) return;
        cy.get('#star-container > img').first().click();
        const score = cy.get('#score-number');
        expect(score.should('have.text', scoreNumber));
        const text = cy.get('#score-text');
        expect(text.should('have.text', scoreText));
      });
    });
  });

  it('별점을 매기면 새로고침해도 별점 데이터를 유지하기 위해 로컬 스토리지에 저장된다.', () => {
    const movieId = 823464;
    const score = 2;

    cy.wait('@getPopularMovies').then(popular => {
      if (popular.response === undefined) return;
      cy.get('.item-card').first().click();

      cy.wait('@getDetailMovie').then(interception => {
        if (interception.response === undefined) return;
        cy.get('#star-container > img').first().click();
        cy.window().then(win => {
          const storageMovie = win.localStorage.getItem('movies');
          expect(storageMovie).to.equal(`[{"id":${movieId},"score":${score}}]`);
        });
      });
    });
  });

  it('상세보기 모달에서 ESC 키를 누르면 모달이 닫힌다.', () => {
    cy.get('.item-card').first().click();
    cy.wait('@getPopularMovies').then(popular => {
      if (popular.response === undefined) return;
      cy.wait('@getDetailMovie').then(interception => {
        if (interception.response === undefined) return;

        cy.get('body').type('{esc}');
        const modal = cy.get('.detail-modal-container');
        expect(modal.should('not.be.visible'));
      });
    });
  });
});
