import { getMovieInfoURL, getPopularURL } from '../utils/createURL';

describe('영화 상세 정보 모달 테스트', () => {
  it('영화 카드를 클릭하면, 영화 상세 정보 모달이 화면에 나타난다.', () => {
    const MOVIE_INFO_URL = getMovieInfoURL(763215);

    cy.intercept(
      {
        method: 'GET',
        url: getPopularURL(1),
      },
      { fixture: 'movie-popular-page1.json' },
    ).as('getPopularMovies');

    cy.intercept(
      {
        method: 'GET',
        url: MOVIE_INFO_URL,
      },
      { fixture: 'movie-info.json' },
    ).as('getMovieInfo');

    cy.visitMainPage();

    cy.wait('@getPopularMovies').then(() => {
      // 초기 :화면에 영화 상세 정보 모달이 안보임
      cy.get('.modal-movie-info').should('not.exist');
      cy.clickFirstMovieCard();
      cy.wait('@getMovieInfo').then(() => {
        // 모달 열림
        cy.get('.modal-movie-info').should('exist');
        // 열린 모달에서 영화 상세 정보가 들어 있는지 확인
        cy.get('.modal-movie-info__inner__header').within(() => {
          cy.get('.movie-title').should('contain.text', '댐즐');
        });
        cy.get('.modal-movie-info__inner__contents').within(() => {
          cy.get('.movie-thumbnail').should(
            'have.attr',
            'src',
            'https://image.tmdb.org/t/p/w500/1Ku5QqFIsn9UQaD72hdlJVeIC57.jpg',
          );
          cy.get('.modal-movie-info__genre').should('contain.text', '액션');
          cy.get('.modal-movie-info__description__overview').should(
            'contain.text',
            '매력적인 왕자와 결혼하게',
          );
        });
      });
    });
  });

  context('모달창 닫기테스트', () => {
    const MOVIE_INFO_URL = getMovieInfoURL(763215);
    beforeEach(() => {
      cy.intercept(
        {
          method: 'GET',
          url: getPopularURL(1),
        },
        { fixture: 'movie-popular-page1.json' },
      ).as('getPopularMovies');

      cy.intercept(
        {
          method: 'GET',
          url: MOVIE_INFO_URL,
        },
        { fixture: 'movie-info.json' },
      ).as('getMovieInfo');

      cy.visitMainPage();
    });

    it('모달의 닫기 벼튼을 클릭하면 영화 상세 정보 모달이 닫힌다.', () => {
      cy.wait('@getPopularMovies').then(() => {
        cy.clickFirstMovieCard();
        cy.wait('@getMovieInfo').then(() => {
          //모달 열림
          cy.get('.modal-movie-info').should('exist');
          cy.get('.button-close-modal').click();
          //모달 닫힘
          cy.get('.modal-movie-info').should('not.exist');
        });
      });
    });
    it('모달의 배경화면을 클릭하면 영화 상세 정보 모달이 닫힌다.', () => {
      cy.wait('@getPopularMovies').then(() => {
        cy.clickFirstMovieCard();
        cy.wait('@getMovieInfo').then(() => {
          //모달 열림
          cy.get('.modal-movie-info').should('exist');
          cy.get('.modal-background').click({ force: true });
          //모달 닫힘
          cy.get('.modal-movie-info').should('not.exist');
        });
      });
    });
    it('"ESC" 키를 누르면 영화 상세 정보 모달이 닫힌다.', () => {
      cy.wait('@getPopularMovies').then(() => {
        cy.clickFirstMovieCard();
        cy.wait('@getMovieInfo').then(() => {
          //모달 열림
          cy.get('.modal-movie-info').should('exist');
          cy.get('body').click({ force: true }).type('{esc}');
          //모달 닫힘
          cy.get('.modal-movie-info').should('not.exist');
        });
      });
    });
  });

  context('없는 영화 정보가 있을 경우에 대한 테스트', () => {
    const MOVIE_INFO_URL = getMovieInfoURL(863274);
    beforeEach(() => {
      cy.intercept(
        {
          method: 'GET',
          url: getPopularURL(1),
        },
        { fixture: 'movie-list-none-img-overview.json' },
      ).as('getPopularMovies');

      cy.intercept(
        {
          method: 'GET',
          url: MOVIE_INFO_URL,
        },
        { fixture: 'movie-info-none-img-overview.json' },
      ).as('getMovieInfo');

      cy.visitMainPage();
    });

    it('데이터에 영화 이미지가 없는 경우, 영화 포스터 대신 "none-img" 사진을 보여준다', () => {
      cy.wait('@getPopularMovies').then(() => {
        cy.clickFirstMovieCard();
        cy.wait('@getMovieInfo').then(() => {
          cy.get('.none-img').should('be.visible');
        });
      });
    });

    it('데이터에 영화 설명글이 없는 경우, "영화에 대한 설명이 없습니다." 문구를 대신 보여준다', () => {
      cy.wait('@getPopularMovies').then(() => {
        cy.clickFirstMovieCard();
        cy.wait('@getMovieInfo').then(() => {
          cy.get('.modal-movie-info__description__overview').should(
            'contain.text',
            '영화에 대한 설명이 없습니다.🫥',
          );
        });
      });
    });
  });
});
