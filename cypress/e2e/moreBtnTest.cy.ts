describe('infinite scroll test', () => {
    beforeEach(() => {
        cy.intercept('GET', '**/movie/popular**', { fixture: 'popularMovies.json' })
    })

    it('스크롤을 내리면 추가 영화 목록을 불러온다.', () => {
        cy.visit('https://javascript-movie-review-dvlk.vercel.app/')

        cy.get('.thumbnail-list li').should('have.length', 20)

        cy.get('.thumbnail-list li').last().scrollIntoView()

        cy.get('.thumbnail-list li').should('have.length', 40)

        cy.get('.thumbnail-list li').last().scrollIntoView()

        cy.get('.thumbnail-list li').should('have.length', 60)

        cy.get('.thumbnail-list li').last().scrollIntoView()

        cy.get('.thumbnail-list li').should('have.length', 80)

        cy.get('.thumbnail-list li').last().scrollIntoView()

        cy.get('.thumbnail-list li').should('have.length', 100)

        cy.get('.thumbnail-list li').last().scrollIntoView()

        cy.get('.thumbnail-list li').should('have.length', 120)

        cy.get('.thumbnail-list li').last().scrollIntoView()

        cy.get('.thumbnail-list li').should('have.length', 140)

        cy.get('.thumbnail-list li').last().scrollIntoView()

        cy.get('.thumbnail-list li').should('have.length', 160)

        cy.get('.thumbnail-list li').last().scrollIntoView()

        cy.get('.thumbnail-list li').should('have.length', 180)

        cy.get('.thumbnail-list li').last().scrollIntoView()

        cy.get('.thumbnail-list li').should('have.length', 200)
    })
})

// describe('more btn test', () => {
//     beforeEach(() => {
//         cy.intercept('GET', '**/movie/popular**', { fixture: 'popularMovies.json' })
//         cy.intercept('GET', '**/search/movie**', { fixture: 'searchMovies.json' })
//     })
//     it('페이지 접속 후 더보기 버튼을 1번 누르면 영화 개수가 40개가 된다.', () => {
//         cy.visit('https://javascript-movie-review-dvlk.vercel.app/')

//         cy.get('.item').should('have.length', 20)

//         cy.get('.display-more-btn').click()

//         cy.get('.item').should('have.length', 40)
//     })
//     it('페이지 접속 후 더보기 버튼을 10번 누르면 영화 개수가 220개가 된다.', () => {
//         cy.visit('https://javascript-movie-review-dvlk.vercel.app/')
//         cy.get('.item').should('have.length', 20)
//         for (let i = 0; i < 10; i++) {
//             cy.get('.display-more-btn').click()
//         }
//         cy.get('.item').should('have.length', 220)
//     })
// })
