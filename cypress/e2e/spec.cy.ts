describe("The Home Page", () => {
  it("페이지가 정상적으로 로드된다.", () => {
    cy.visit("http://localhost:5173/");
    cy.get("header").should("be.visible");
  });
});

describe("영화 목록 조회, 검색 테스트", () => {
  beforeEach(() => {
    cy.visit("http://localhost:5173");
  });

  it("페이지에 접속하면 인기순으로 20개의 영화목록이 보인다.", () => {
    cy.get("h2.main-title").should("contain", "지금 인기 있는 영화");
    cy.get(".thumbnail-list li").should("have.length", 20);
  });

  it("더보기 버튼을 누르면 20개씩 추가로 영화 목록을 불러온다.", () => {
    cy.get(".thumbnail-list li").should("have.length", 20);
    cy.contains("더 보기").click();
    cy.get(".thumbnail-list li").should("have.length", 40);
  });

  it('검색창에 "해리포터"를 검색하고 검색 아이콘을 클릭하면 검색 결과 목록을 보여준다.', () => {
    cy.get(".search-input").type("해리포터");
    cy.get(".search-icon").click();
    cy.get("h2.main-title").should("contain", '"해리포터" 검색 결과');
    cy.get(".thumbnail-list li").its("length").should("be.gte", 1);
  });

  it("해리포터를 검색했을 때, 마지막 페이지에 도달하면 더보기 버튼이 사라진다.", () => {
    cy.get(".search-input").type("해리포터");
    cy.get(".search-icon").click();

    cy.on("window:alert", (text) => {
      expect(text).to.equal("마지막 페이지입니다.");
    });

    const clickMoreButtonUntilHidden = () => {
      cy.get("button.detail-button").then((btn) => {
        if (btn.is(":visible")) {
          cy.wrap(btn).click();
          clickMoreButtonUntilHidden();
        }
      });
    };

    clickMoreButtonUntilHidden();

    cy.get("button.detail-button").should("be.not.visible");
  });

  it('검색창에 "해뤼풔퉈"를 검색하면 검색 결과가 없다는 화면을 보여준다.', () => {
    cy.get(".search-input").type("해뤼풔퉈");
    cy.get(".search-icon").click();
    cy.get(".empty-content").should("contain", "검색 결과가 없습니다.");
  });
});
