describe("click poster test", () => {
  it("인기순 영화 페이지에서 두 번째 포스터를 클릭하면 백그라운드에 해당 영화 정보가 띄워진다.", () => {
    cy.visit("http://localhost:5173");
    cy.get(".thumbnail-list li")
      .eq(1)
      .find(".title")
      .invoke("text")
      .then((defaultTitle) => {
        cy.get(".thumbnail-list li").eq(1).click();
        cy.get(".top-rated-movie")
          .find(".title")
          .invoke("text")
          .should((searchTitle) => {
            expect(searchTitle.trim()).to.equal(defaultTitle.trim());
          });
      });
  });
  it("인기순 영화 페이지에서 다섯 번째 포스터를 클릭하면 백그라운드에 해당 영화 정보가 띄워진다.", () => {
    cy.visit("http://localhost:5173");
    cy.get(".thumbnail-list li")
      .eq(6)
      .find(".title")
      .invoke("text")
      .then((defaultTitle) => {
        cy.get(".thumbnail-list li").eq(6).click();
        cy.get(".top-rated-movie")
          .find(".title")
          .invoke("text")
          .should((searchTitle) => {
            expect(searchTitle.trim()).to.equal(defaultTitle.trim());
          });
      });
  });
  it("인기순 영화 페이지에서 열한 번째 포스터를 클릭하면 백그라운드에 해당 영화 정보가 띄워진다.", () => {
    cy.visit("http://localhost:5173");
    cy.get(".thumbnail-list li")
      .eq(12)
      .find(".title")
      .invoke("text")
      .then((defaultTitle) => {
        cy.get(".thumbnail-list li").eq(12).click();
        cy.get(".top-rated-movie")
          .find(".title")
          .invoke("text")
          .should((searchTitle) => {
            expect(searchTitle.trim()).to.equal(defaultTitle.trim());
          });
      });
  });
});
