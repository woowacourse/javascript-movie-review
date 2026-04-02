describe("search test", () => {
  it("검색어를 입력한 뒤 검색 버튼을 누르면 필터링된 영화 목록을 보여준다.", () => {
    cy.visit("http://localhost:5173");

    cy.get(".thumbnail-list li")
      .first()
      .find("#title")
      .invoke("text")
      .then((defaultTitle) => {
        cy.get(".search-bar").type("스파이더맨");
        cy.get(".search-btn").click();

        cy.get(".thumbnail-list li")
          .first()
          .find("#title")
          .invoke("text")
          .should((searchTitle) => {
            expect(searchTitle.trim()).not.to.equal(defaultTitle.trim());
          });
      });
  });

  it("검색어를 입력한 뒤 엔터키를 누르면 필터링된 영화 목록을 보여준다.", () => {
    cy.visit("http://localhost:5173");

    cy.get(".thumbnail-list li")
      .first()
      .find("#title")
      .invoke("text")
      .then((defaultTitle) => {
        cy.get(".search-bar").type("스파이더맨{enter}");

        cy.get(".thumbnail-list li")
          .first()
          .find("#title")
          .invoke("text")
          .should((searchTitle) => {
            expect(searchTitle.trim()).not.to.equal(defaultTitle.trim());
          });
      });
  });
  it("검색란에 검색어를 입력해도 결과가 존재하지 않다면 '검색 결과가 없습니다' 텍스트를 띄운다", () => {
    cy.visit("http://localhost:5173");
    cy.get(".search-bar").type("ㄴㅇ러ㅏㅗㅁ라ㅗ어ㅏ로머ㅏJklhdskldh");
    cy.get(".search-error-text").should("have.text", "검색 결과가 없습니다.");
  });
});
