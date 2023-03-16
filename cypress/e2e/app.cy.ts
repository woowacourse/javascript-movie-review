describe("영화 리뷰 애플리케이션 e2e 테스트", () => {
  beforeEach(() => {
    cy.visit("localhost:8080");
  });

  it("처음 사이트를 방문하면 헤더, 영화 리스트 컨테이너, 더보기 버튼을 렌더링 해야한다.", () => {
    cy.get("header").should("exist");

    cy.get(".item-view").should("exist");

    cy.get(".more").should("exist");
  });

  it("처음 사이트를 방문하면 인기순 영화 데이터 20개가 존재해야 한다.", () => {
    cy.get(".search-title").should("contain", "지금 인기있는 영화");

    cy.get(".item-card:not(.skeleton)").should("have.length", 20);
  });

  it("영화 데이터를 받아오기 전까지 스켈레톤 UI를 렌더링 해야한다.", () => {
    cy.get(".skeleton").should("exist");
  });

  it("더보기 버튼을 누르면 영화 데이터 20개를 추가로 받아서 렌더링 해야 한다.", () => {
    cy.get(".more").click();

    cy.get(".item-card:not(.skeleton)").should("have.length", 40);
  });

  it("검색창에 '해리포터'를 검색하면 해리포터 시리즈 영화 8개가 존재해야 한다.", () => {
    cy.get(".search-input").type("해리포터");
    cy.get(".search-box").submit();

    cy.get(".item-card:not(.skeleton)").should("have.length", 8);
  });

  it("검색창에 '해리포터'를 검색하면 상단에 '해리포터 검색결과' 문구가 존재해야 한다.", () => {
    cy.get(".search-input").type("해리포터");
    cy.get(".search-box").submit();

    cy.get(".search-title").should("contain", '"해리포터" 검색결과');
  });

  it("더이상 로드 할 컨텐츠가 없으면 더보기 버튼이 숨겨져야 한다.", () => {
    cy.get(".search-input").type("해리포터");
    cy.get(".search-box").submit();

    cy.get(".more").should("not.be.visible");
  });
});
