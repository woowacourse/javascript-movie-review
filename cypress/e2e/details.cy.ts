const localHostUrl = Cypress.env("LOCAL_HOST_URL");
describe("details 테스트", () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: "GET",
        url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular*/,
      },
      { fixture: "movie-popular.json" }
    ).as("getPopularMovies");

    cy.visit(localHostUrl);
  });

  it("첫번째 보이는 영화를 클릭하면 정확한 디테일이 떠야한다.", () => {
    cy.get("#696506").click();

    // 이미지 확인
    cy.get("#details-image")
      .should("have.attr", "src")
      .and("include", "/7KghOYtsxFquUuw4THbARsSEo6g.jpg");

    // 제목 확인
    cy.get("#details-title").should("contain", "미키 17");

    cy.get("#details-category")
      .should("contain", "SF")
      .and("contain", "코미디")
      .and("contain", "모험")
      .and("contain", "2025");

    // 평점 확인
    cy.get("#details-rate").should("contain", "7.0");

    // 설명 확인
    cy.get("#details-description").should(
      "contain",
      "친구 티모와 함께 차린 마카롱 가게가 쫄딱 망해 거액의 빚을 지고 못 갚으면 죽이겠다는 사채업자를 피해 지구를 떠나야 하는 미키. 기술이 없는 그는, 정치인 마셜의 얼음행성 개척단에서 위험한 일을 도맡고, 죽으면 다시 프린트되는 익스펜더블로 지원한다. 4년의 항해와 얼음행성 니플하임에 도착한 뒤에도 늘 미키를 지켜준 여자친구 나샤. 그와 함께, 미키는 반복되는 죽음과 출력의 사이클에도 익숙해진다. 그러나 미키 17이 얼음행성의 생명체인 크리퍼와 만난 후 죽을 위기에서 돌아와 보니 이미 미키 18이 프린트되어 있다. 행성 당 1명만 허용된 익스펜더블이 둘이 된 멀티플 상황. 둘 중 하나는 죽어야 하는 현실 속에 걷잡을 수 없는 사건이 기다리고 있었으니…"
    );

    // 별점 영역 존재 확인
    cy.get("#star-rating-details").should("exist");
    cy.get("#star-rating-numbers").should("exist");
  });

  it("헤더에 보이는 영화를 클릭하면 정확한 디테일이 떠야 한다.", () => {
    cy.get("#hero-details-button").click();

    // 이미지 확인
    cy.get("#details-image")
      .should("have.attr", "src")
      .and("include", "/7KghOYtsxFquUuw4THbARsSEo6g.jpg");

    // 제목 확인
    cy.get("#details-title").should("contain", "미키 17");

    // 평점 확인
    cy.get("#details-rate").should("contain", "7.0");

    // 설명 확인
    cy.get("#details-description").should(
      "contain",
      "친구 티모와 함께 차린 마카롱 가게가 쫄딱 망해 거액의 빚을 지고 못 갚으면 죽이겠다는 사채업자를 피해 지구를 떠나야 하는 미키. 기술이 없는 그는, 정치인 마셜의 얼음행성 개척단에서 위험한 일을 도맡고, 죽으면 다시 프린트되는 익스펜더블로 지원한다. 4년의 항해와 얼음행성 니플하임에 도착한 뒤에도 늘 미키를 지켜준 여자친구 나샤. 그와 함께, 미키는 반복되는 죽음과 출력의 사이클에도 익숙해진다. 그러나 미키 17이 얼음행성의 생명체인 크리퍼와 만난 후 죽을 위기에서 돌아와 보니 이미 미키 18이 프린트되어 있다. 행성 당 1명만 허용된 익스펜더블이 둘이 된 멀티플 상황. 둘 중 하나는 죽어야 하는 현실 속에 걷잡을 수 없는 사건이 기다리고 있었으니…"
    );

    // 별점 영역 존재 확인
    cy.get("#star-rating-details").should("exist");
    cy.get("#star-rating-numbers").should("exist");
  });
  it("모달을 열고 닫을수 있어야 한다.", () => {
    cy.get("#hero-details-button").click();
    cy.get("#modal-dialog").click("topLeft");
    cy.get("#696506").click();
    cy.get("#closeModal").click();
  });
});
