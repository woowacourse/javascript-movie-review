const apiKey = Cypress.env("TMDB_API_KEY");
const localHostUrl = Cypress.env("LOCAL_HOST_URL");

describe("모달 화면 테스트", () => {
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

  it("사용자가 특정 영화를 클릭하면 해당 영화 상제 정보 페이지가 나타난다.", () => {
    cy.wait("@getPopularMovies").then((interception) => {
      if (!interception.response) {
        throw new Error("No response received from interception");
      }
      const popularMovies = interception.response.body.results;
      expect(popularMovies.length).to.equal(20);

      let popularMovieItems = cy.get("#thumbnail-list > li");
      expect(popularMovieItems.should("have.length", 20));

      popularMovieItems.first().click();
      const modal = cy.get("#modalBackground");
      modal.should("be.visible");
      modal.should("contain", "내 별점");
      modal.should("contain", "줄거리");
      modal.should("contain", "미키 17");
      modal.should(
        "contain",
        "친구 티모와 함께 차린 마카롱 가게가 쫄딱 망해 거액의 빚을 지고 못 갚으면 죽이겠다는 사채업자를 피해 지구를 떠나야 하는 미키. 기술이 없는 그는, 정치인 마셜의 얼음행성 개척단에서 위험한 일을 도맡고, 죽으면 다시 프린트되는 익스펜더블로 지원한다. 4년의 항해와 얼음행성 니플하임에 도착한 뒤에도 늘 미키를 지켜준 여자친구 나샤. 그와 함께, 미키는 반복되는 죽음과 출력의 사이클에도 익숙해진다. 그러나 미키 17이 얼음행성의 생명체인 크리퍼와 만난 후 죽을 위기에서 돌아와 보니 이미 미키 18이 프린트되어 있다. 행성 당 1명만 허용된 익스펜더블이 둘이 된 멀티플 상황. 둘 중 하나는 죽어야 하는 현실 속에 걷잡을 수 없는 사건이 기다리고 있었으니…"
      );
    });
  });
});
