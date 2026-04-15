describe('별점 매기기 테스트', () => {
    beforeEach(() => {
        cy.intercept('GET', '**/movie/*', { fixture: 'infoModal.json' });
        cy.intercept('GET', '**/movie/popular**', { fixture: 'popularMovies.json' });
        cy.clearLocalStorage();
        cy.visit('/');
        cy.get('.thumbnail-list li').first().click();
        cy.get('#modalBackground').should('have.class', 'active');
    });

    it('별점 클릭 시 해당 별점 텍스트가 표시된다.', () => {
        cy.get('.star-icon[data-value="2"]').click();
        cy.get('.my-rate-text').should('have.text', '최악이에요 (2/10)');

        cy.get('.star-icon[data-value="4"]').click();
        cy.get('.my-rate-text').should('have.text', '별로예요 (4/10)');

        cy.get('.star-icon[data-value="6"]').click();
        cy.get('.my-rate-text').should('have.text', '보통이에요 (6/10)');

        cy.get('.star-icon[data-value="8"]').click();
        cy.get('.my-rate-text').should('have.text', '재미있어요 (8/10)');

        cy.get('.star-icon[data-value="10"]').click();
        cy.get('.my-rate-text').should('have.text', '명작이에요 (10/10)');
    });

    it('별점 클릭 시 클릭한 별까지 채워진 별로 변경된다.', () => {
        // 클릭 전 빈 별 src 저장
        cy.get('.star-icon[data-value="10"]')
            .invoke('attr', 'src')
            .then((emptySrc) => {
                cy.get('.star-icon[data-value="6"]').click();

                // 클릭한 별까지는 src가 빈 별과 달라야 함
                cy.get('.star-icon[data-value="2"]').invoke('attr', 'src').should('not.equal', emptySrc);
                cy.get('.star-icon[data-value="4"]').invoke('attr', 'src').should('not.equal', emptySrc);
                cy.get('.star-icon[data-value="6"]').invoke('attr', 'src').should('not.equal', emptySrc);

                // 클릭하지 않은 별은 여전히 빈 별이어야 함
                cy.get('.star-icon[data-value="8"]').invoke('attr', 'src').should('equal', emptySrc);
                cy.get('.star-icon[data-value="10"]').invoke('attr', 'src').should('equal', emptySrc);
            });
    });

    it('모달을 닫았다가 다시 열면 이전에 저장한 별점이 복원된다.', () => {
        cy.get('.star-icon[data-value="6"]').click();
        cy.get('.my-rate-text').should('have.text', '보통이에요 (6/10)');

        cy.get('#closeModal').click();
        cy.get('#modalBackground').should('not.have.class', 'active');

        cy.get('.thumbnail-list li').first().click();
        cy.get('#modalBackground').should('have.class', 'active');

        cy.get('.my-rate-text').should('have.text', '보통이에요 (6/10)');
        cy.get('.star-icon[data-value="8"]')
            .invoke('attr', 'src')
            .then((emptySrc) => {
                cy.get('.star-icon[data-value="2"]').invoke('attr', 'src').should('not.equal', emptySrc);
                cy.get('.star-icon[data-value="6"]').invoke('attr', 'src').should('not.equal', emptySrc);
                cy.get('.star-icon[data-value="8"]').invoke('attr', 'src').should('equal', emptySrc);
            });
    });
});
