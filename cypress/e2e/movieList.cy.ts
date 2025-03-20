describe("영화 리스트(초기 화면) 테스트", () => {
  beforeEach(() => {
    cy.intercept(
      {
        method: "GET",
        url: /^https:\/\/api\.themoviedb\.org\/3\/movie\/popular*/,
      },
      (req) => {
        req.continue((res) => {
          res.setDelay(1000); // 1초 지연
          res.send({ fixture: "popularMovieData.json" });
        });
      }
    ).as("getPopularMovieList");

    cy.visit("http://localhost:5173/");
  });

  it("인기있는 영화 목록 렌더링 및 더보기 버튼 테스트", () => {
    // 스켈레톤 UI 렌더링
    expect(cy.get(".skeleton-list").should("exist"));

    // 데이터 요청
    cy.wait("@getPopularMovieList").then((interception) => {
      const popularMovieList = interception.response?.body.results;
      expect(popularMovieList.length).to.equal(20);

      // 스켈레톤 UI 제거
      expect(cy.get(".skeleton-list").should("not.exist"));

      // 초기 렌더링
      expect(cy.get(".item").should("have.length", 20));
    });

    // 더보기 버튼 클릭
    cy.get(".more-button").click();

    // 스켈레톤 UI 렌더링
    expect(cy.get(".skeleton-list").should("exist"));

    // 데이터 요청
    cy.wait("@getPopularMovieList").then((interception) => {
      const popularMovieList = interception.response?.body.results;
      expect(popularMovieList.length).to.equal(20);

      // 스켈레톤 UI 제거
      expect(cy.get(".skeleton-list").should("not.exist"));

      // 추가 렌더링(20 -> 40)
      expect(cy.get(".item").should("have.length", 40));
    });
  });
});
