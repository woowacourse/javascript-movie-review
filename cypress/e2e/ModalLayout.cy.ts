/// <reference types="cypress" />

describe('Fixture를 이용한 테스트', () => {
  beforeEach(() => {
    // https://docs.cypress.io/api/commands/intercept
    cy.intercept(
      {
        method: 'GET',
        url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular*/,
      },
      { fixture: 'movie-popular.json' }
    ).as('getPopularMovies')

    cy.visit('https://dev-dino22.github.io/javascript-movie-review/')
  })

  it('item 을 클릭하면 해당하는 데이터를 출력하는 상세 모달이 펼쳐진다.', () => {
    cy.wait('@getPopularMovies').then((interception) => {
      cy.get('.thumbnail-list li').first().click()
      cy.get('#movieTitle').contains('미키 17')
      cy.get('.rating-number').contains('7')
    })
  })

  it('별점을 등록할 수 있고 모달을 끄고 새로고침해도 등록한 별점은 유지된다.', () => {
    cy.wait('@getPopularMovies').then((interception) => {
      cy.get('.thumbnail-list li').first().click()
      cy.get('.my-rating-section #starsContainer #starBox .star').first().click()
      cy.get('.my-rating-section #starsContainer #ratingText').contains('최악이예요')
      cy.get('#dialogID #closeModal').click()
      cy.reload()
      cy.get('.thumbnail-list li').first().click()
      cy.get('.my-rating-section #starsContainer #ratingText').contains('최악이예요')
    })
  })
})
