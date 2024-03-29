import { LOCAL_STORAGE_KEY } from '../../src/constants';
import { getMovieInfoURL, getPopularURL } from '../utils/createURL';

describe('내 별점 테스트', () => {
  const MOVIE_ID = 763215;
  const MOVIE_INFO_URL = getMovieInfoURL(MOVIE_ID);

  beforeEach(() => {});
  //로컬 스토리지에 등록된 별점이 있는 경우

  // 로컬 스토리지에 등록된 별점이 없는 경우
  context(
    '로컬 스토리지에 영화에 대한 별점 등록 여부에 따른 초기 별점 UI 테스트',
    () => {
      context(
        '로컬 스토리지에 해당 영화에 대한 별점 데이터가 있는 경우, 별점에 따른 UI(채워진 별, 점수, 문구)가 구성된다.',
        () => {
          const testCases = [
            {
              item: { id: MOVIE_ID, score: 0 },
              numberOfFilled: 0,
              text: '별점을 남겨주세요.',
            },
            {
              item: { id: MOVIE_ID, score: 2 },
              numberOfFilled: 1,
              text: '최악이에요.',
            },
            {
              item: { id: MOVIE_ID, score: 4 },
              numberOfFilled: 2,
              text: '별로에요.',
            },
            {
              item: { id: MOVIE_ID, score: 6 },
              numberOfFilled: 3,
              text: '보통이에요',
            },
            {
              item: { id: MOVIE_ID, score: 8 },
              numberOfFilled: 4,
              text: '재미있어어요.',
            },
            {
              item: { id: MOVIE_ID, score: 10 },
              numberOfFilled: 5,
              text: '명작이에요.',
            },
          ];

          testCases.forEach((testCase) => {
            it(`저장된 별점이 ${testCase.item.score} 인 경우, 채워진 별은  ${testCase.numberOfFilled}개이며 점수는 ${testCase.item.score}이며 "${testCase.text}" 문구가 화면에 존재한다.`, () => {
              const { item } = testCase;
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

              cy.setLocalStorage(item);

              cy.visitMainPage();

              cy.wait('@getPopularMovies').then(() => {
                cy.clickFirstMovieCard();
                cy.wait('@getMovieInfo').then(() => {
                  cy.checkUserScore({
                    score: item.score,
                    numberOfFilled: testCase.numberOfFilled,
                    text: testCase.text,
                  });
                });
              });

              window.localStorage.clear();
            });
          });
        },
      );
    },
  );

  context('별점을 바꾸는 기능에 대한 테스트', () => {
    it('n번째 별 버튼 클릭 시, 별점이 n*2가 된다.', () => {
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
        cy.clickFirstMovieCard();
        cy.wait('@getMovieInfo').then(() => {
          const STAR_NUMBER = 2;

          cy.get('.button-score').eq(STAR_NUMBER).click();

          cy.get('.button-score.filled').should('have.length', STAR_NUMBER + 1);
        });
      });
    });

    it('별점 초기화 버튼을 클릭 시, 별점은 0이 된다.', () => {
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

      const LOCAL_STORAGE_ITEM = {
        item: { id: MOVIE_ID, score: 4 },
        numberOfFilled: 2,
        text: '별로에요.',
      };
      cy.setLocalStorage(LOCAL_STORAGE_ITEM);
      cy.visitMainPage();

      cy.wait('@getPopularMovies').then(() => {
        cy.clickFirstMovieCard();
        cy.wait('@getMovieInfo').then(() => {
          const STAR_NUMBER = 2;

          cy.get('.button-reset-score').click();

          cy.get('.button-score.filled').should('have.length', 0);
        });
      });
    });
  });
});
