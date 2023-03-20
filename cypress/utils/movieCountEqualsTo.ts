const movieCountEqualsTo = (count: number) => {
  cy.get('ul.item-list')
    .children('li.movie-info')
    .should('have.length', count);
};

export default movieCountEqualsTo;
