describe("메인 화면 최초 진입 시나리오 테스트", () => {
  // TMDB API 응답 형식을 생성하는 헬퍼 함수
  const mockMovies = (
    count: number,
    titlePrefix: string,
    page: number,
    totalPages: number,
  ) => ({
    results: Array.from({ length: count }, (_, i) => ({
      id: i + (page - 1) * 20,
      title: `${titlePrefix} ${i + 1}`,
      poster_path: "/63In39uCc7769Y0667vCInth6Uv.jpg",
      vote_average: 8.5,
    })),
    page: page,
    total_pages: totalPages,
  });

  beforeEach(() => {
    // 1페이지 호출 모킹 (20개 응답, 총 2페이지가 있다고 가정)
    cy.intercept(
      "GET",
      "**/movie/popular?*page=1*",
      mockMovies(20, "인기 영화", 1, 2),
    ).as("getPopularP1");

    // 2페이지 호출 모킹 (마지막 페이지)
    cy.intercept(
      "GET",
      "**/movie/popular?*page=2*",
      mockMovies(20, "인기 영화", 2, 2),
    ).as("getPopularP2");

    cy.visit("http://localhost:5173/");
  });

  it("1. 배너에 첫 번째 인기 영화의 정보가 표시된다.", () => {
    cy.wait("@getPopularP1");

    // 리스트의 첫 번째 영화 제목을 가져와서 배너(.title)와 비교
    cy.get(".thumbnail-list li:first-child", { timeout: 10000 })
      .find("strong")
      .invoke("text")
      .then((firstMovieTitle) => {
        cy.get(".title").invoke("text").should("eq", firstMovieTitle);
      });
  });

  it("2. 최초 진입 시 인기 영화 최대 20개가 표시된다.", () => {
    cy.wait("@getPopularP1");

    // 리스트 아이템 개수 확인
    cy.get(".thumbnail-list li").should("have.length", 20);
  });

  it("3. 더 보기 버튼을 누르면 최대 20개가 추가된다.", () => {
    cy.wait("@getPopularP1");

    // 초기 20개 확인 후 버튼 클릭
    cy.get(".thumbnail-list li").should("have.length", 20);
    cy.get(".more-button").click();

    cy.wait("@getPopularP2");

    // 추가되어 총 40개가 되었는지 확인
    cy.get(".thumbnail-list li").should("have.length", 40);
  });

  it("4. 더 이상 보여줄 영화가 없으면 더 보기 버튼이 사라진다.", () => {
    cy.wait("@getPopularP1");

    // 마지막 페이지(2페이지)를 불러오도록 버튼 클릭
    cy.get(".more-button").click();
    cy.wait("@getPopularP2");

    // 소스 코드 로직(nowPage === totalPages)에 따라 버튼이 숨겨져야 함
    cy.get(".more-button").should("not.be.visible");
  });
});
