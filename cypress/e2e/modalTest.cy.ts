describe('search test', () => {
    beforeEach(() => {
        cy.intercept('GET', '**/movie/*', { fixture: 'infoModal.json' })
        cy.intercept('GET', '**/movie/popular**', { fixture: 'popularMovies.json' })
        cy.intercept('GET', '**/search/movie**', { fixture: 'searchMovies.json' })
    })

    it('인기순 영화 페이지에서 두 번째 포스터를 클릭하면 영화 상세정보 모달이 띄워진다.', () => {
        cy.visit('https://javascript-movie-review-dvlk-a6xn5spuo-yun-cics-projects.vercel.app/')
        cy.get('.thumbnail-list li')
            .eq(1)
            .find('#title')
            .invoke('text')
            .then((listTitle) => {
                cy.get('.thumbnail-list li').eq(1).click()
                cy.get('#modalBackground').should('have.class', 'active')
                cy.get('#modalTitle')
                    .invoke('text')
                    .should((modalTitle) => {
                        expect(modalTitle.trim()).to.equal(listTitle.trim())
                    })
            })
    })

    it('검색 결과에서 포스터를 클릭하면 모달이 열린다.', () => {
        cy.visit('https://javascript-movie-review-dvlk-a6xn5spuo-yun-cics-projects.vercel.app/')
        cy.get('.search-bar').type('스파이더맨')
        cy.get('.search-btn').click()
        cy.get('.thumbnail-list li').first().click()
        cy.get('#modalBackground').should('have.class', 'active')
        cy.get('#modalTitle').should('not.be.empty')
    })
})
