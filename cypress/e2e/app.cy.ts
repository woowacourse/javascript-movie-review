/// <reference types="cypress" />

describe('E2E 테스트', () => {
  beforeEach(() => {
    [...Array(4)]
      .map((_, index) => index + 1)
      .forEach((page) => {
        cy.intercept(
          {
            method: 'GET',
            url: /^https:\/\/api.themoviedb.org\/3\/movie\/popular/,
            query: { page: `${page}` },
          },
          { fixture: `api/popular/page-${page}.json` },
        );
      });

    [...Array(3)]
      .map((_, index) => index + 1)
      .forEach((page) => {
        cy.intercept(
          {
            method: 'GET',
            url: /^https:\/\/api.themoviedb.org\/3\/search\/movie/,
            query: { page: `${page}`, query: '코난' },
          },
          { fixture: `api/search/코난/page-${page}.json` },
        );
      });

    cy.intercept(
      {
        method: 'GET',
        url: /^https:\/\/api.themoviedb.org\/3\/search\/movie/,
        query: { query: '솔로스타' },
      },
      { fixture: 'api/search/솔로스타/page-1.json' },
    );

    cy.visit('/');
  });

  it('접속했을 때 스켈레톤을 보여준 뒤 영화 목록을 보여준다. 스크롤을 내리면 새로운 영화들이 더 표시된다.', () => {
    cy.get('.skeleton').should('be.visible');
    cy.get('.item-list').within(() => {
      cy.get('.item-title').first().contains('슬픈 고양이: 끝내주는 모험').should('be.visible');
    });

    cy.scrollTo('bottom');
    cy.scrollTo('bottom');

    cy.get('.item-list').within(() => {
      cy.get('li:visible').last().find('.item-title').contains('아발론').should('be.visible');
    });
  });

  it('"코난"으로 검색했을 때 영화 목록을 표시해야 한다. 마지막 페이지까지 확인할 수 있어야 한다.', () => {
    cy.get('input[placeholder="검색"]').type('코난{enter}');

    cy.get('.item-view').within(() => {
      cy.get('li:visible').first().find('.item-title').contains('코난: 블랙의 시대');

      cy.scrollTo('bottom');
      cy.scrollTo('bottom');
      cy.scrollTo('bottom');

      cy.get('li:visible').last().contains('명탐정 코난 용가리 고메라 vs 가면 사나이');
      cy.get('button').contains('더 보기').should('not.be.visible');
    });
  });

  it('"솔로스타"로 검색했을 때 결과가 없다고 나와야 한다.', () => {
    cy.get('input[placeholder="검색"]').type('솔로스타{enter}');

    cy.get('.item-view').within(() => {
      cy.get('li:visible').should('have.length', 0);

      cy.contains('없습니다');
    });
  });

  it('서버에서 500에러가 발생하였을 때 오류 메세지와 함께 toast 메시지를 띄워야 한다.', () => {
    cy.intercept(
      {
        method: 'GET',
        url: /^https:\/\/api.themoviedb.org\/3\/movie\/popular/,
      },
      {
        statusCode: 500,
        body: {
          status_code: 34,
          status_message: 'The resource you requested could not be found.',
        },
      },
    );

    cy.scrollTo('bottom');

    cy.get('.toast').contains('The resource you requested could not be found');
  });
});
