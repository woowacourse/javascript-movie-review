describe("영화 리뷰 애플리케이션 popular 영화 테스트", () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: "GET",
        url: /^https:\/\/api.themoviedb.org\/3\/movie\/popular*/,
      },
      { fixture: "movie-popular.json" }
    ).as("getPopularMovies");

    cy.visit("localhost:8080");

    cy.wait("@getPopularMovies");
  });

  it("처음 사이트를 방문하면 헤더, 영화 리스트 컨테이너, 더보기 버튼을 렌더링 해야한다.", () => {
    cy.get("header").should("exist");

    cy.get(".item-view").should("exist");
  });

  it("처음 사이트를 방문하면 인기순 영화 데이터 20개가 존재해야 한다.", () => {
    cy.get(".search-title").should("contain", "지금 인기있는 영화");

    cy.get(".item-card:not(.skeleton)").should("have.length", 20);
  });

  it("영화 데이터를 받아오기 전까지 스켈레톤 UI를 렌더링 해야한다.", () => {
    cy.get(".skeleton").should("exist");
  });

  it("하단부로 내리면 누르면 영화 데이터 20개를 추가로 받아서 렌더링 해야 한다.", () => {
    cy.get(".item-card:not(.skeleton)").should("have.length", 20);

    cy.document().then((document) => {
      document.documentElement.scrollTop = document.documentElement.scrollHeight;
    });

    cy.wait(1000);
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

  it("검색 되지 않는 영화를 검색 할 경우 검색 결과가 없다는 메시지가 출력되어야 한다.", () => {
    cy.get(".search-input").type("해리포터10");
    cy.get(".search-box").submit();

    cy.get(".search-title").should("contain", '"해리포터10"에 대한 검색 결과가 없습니다 :(');
  });

  it("영화를 눌렀을 때 모달이 보여야 한다.", () => {
    cy.get(".item-card").first().scrollIntoView().click({ force: true });
    cy.get(".modal-container").should("be.visible");
  });

  it("모달의 우측 상단에 위치한 닫기 버튼을 눌렀을 때 모달이 닫혀야 한다.", () => {
    cy.get(".item-card").first().scrollIntoView().click({ force: true });
    cy.get(".close-button").click();
    cy.get(".modal-container").should("not.be.visible");
  });

  it("모달이 열려있을 때 바깥 영역을 누르면 모달이 닫혀야 한다.", () => {
    cy.get(".item-card").first().scrollIntoView().click({ force: true });
    cy.get("body").click(0, 0);
    cy.get(".modal-container").should("not.be.visible");
  });

  it("모달이 열려있을 때 별점을 등록 가능해야 한다.", () => {
    cy.get(".item-card").first().scrollIntoView().click({ force: true });
    cy.get(".user-rate-container img").first().click();
    cy.get(".score").should("have.text", "2");
    cy.get(".score-comment").should("have.text", "최악이예요");
  });

  it("모달이 열려있을 때 별점을 등록 후 다시 진입 시 남긴 별점이 있어야 한다..", () => {
    cy.get(".item-card").first().scrollIntoView().click({ force: true });
    cy.get(".user-rate-container img").first().click();
    cy.get(".score").should("have.text", "2");
    cy.get(".score-comment").should("have.text", "최악이예요");
    cy.get("body").click(0, 0);
    cy.get(".item-card").first().scrollIntoView().click({ force: true });
    cy.get(".score").should("have.text", "2");
    cy.get(".score-comment").should("have.text", "최악이예요");
  });

  it("등록한 별점과 같은 별점을 누르면 별점 등록이 초기화 되어야 한다.", () => {
    cy.get(".item-card").first().scrollIntoView().click({ force: true });
    cy.get(".user-rate-container img").first().click();
    cy.get(".score").should("have.text", "2");
    cy.get(".score-comment").should("have.text", "최악이예요");
    cy.get(".user-rate-container img").first().click();
    cy.get(".score-comment").should("not.have.text", "최악이예요");
  });

  it("등록한 별점과 다른 별점을 누르면 별점이 바뀌어야 한다.", () => {
    cy.get(".item-card").first().scrollIntoView().click({ force: true });
    cy.get(".user-rate-container img").first().click();
    cy.get(".score").should("have.text", "2");
    cy.get(".score-comment").should("have.text", "최악이예요");
    cy.get(".user-rate-container img").eq(3).click();
    cy.get(".score").should("have.text", "8");
    cy.get(".score-comment").should("have.text", "재미있어요");
  });
});
