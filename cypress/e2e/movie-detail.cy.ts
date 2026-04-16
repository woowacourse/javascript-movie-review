describe("영화 상세정보 모달 시나리오 테스트", () => {
  const mockPopularMovies = {
    results: Array.from({ length: 20 }, (_, i) => ({
      id: 3000 + i,
      title: `상세 영화 ${i + 1}`,
      poster_path: "/63In39uCc7769Y0667vCInth6Uv.jpg",
      vote_average: 8.2,
    })),
    page: 1,
    total_pages: 1,
  };

  const mockMovieDetail = (id: number, title: string) => ({
    id,
    poster_path: "/63In39uCc7769Y0667vCInth6Uv.jpg",
    title,
    release_date: "2024-01-01",
    genres: [
      { id: 1, name: "애니메이션" },
      { id: 2, name: "드라마" },
    ],
    vote_average: 8.2,
    overview: `${title} 줄거리`,
  });

  const openMovieDetailFromPoster = () => {
    cy.get(".thumbnail-container").first().click();
    cy.wait("@getMovieDetail");
  };

  beforeEach(() => {
    cy.intercept(
      "GET",
      "**/movie/popular?*page=1*",
      mockPopularMovies,
    ).as("getPopular");

    cy.intercept("GET", "**/movie/3000?*", mockMovieDetail(3000, "상세 영화 1")).as(
      "getMovieDetail",
    );

    cy.visit("http://localhost:5173/");
    cy.wait("@getPopular");
  });

  it("1. 자세히 보기 버튼을 누르면 영화 상세정보 모달창이 표시된다.", () => {
    cy.get(".detail").click();
    cy.wait("@getMovieDetail");

    cy.get(".modal").should("have.prop", "open", true);
    cy.get(".modal-movie-title").should("have.text", "상세 영화 1");
    cy.get(".category").should("contain.text", "2024");
    cy.get(".category").should("contain.text", "애니메이션, 드라마");
    cy.get(".overview").should("have.text", "상세 영화 1 줄거리");
  });

  it("2. 영화 포스터 클릭 시 영화 상세정보 모달창이 표시된다.", () => {
    openMovieDetailFromPoster();

    cy.get(".modal").should("have.prop", "open", true);
    cy.get(".modal-poster-image").should("be.visible");
    cy.get(".detail-rate-value").should("have.text", "8.2");
  });

  it("3. ESC 키를 입력하면 모달창을 닫을 수 있다.", () => {
    openMovieDetailFromPoster();

    cy.get("body").type("{esc}");
    cy.get(".modal").should("have.prop", "open", false);
    cy.get("body").should("not.have.class", "modal-open");
  });

  it("4. 모달 외부 화면 클릭으로 모달창을 닫을 수 있다.", () => {
    openMovieDetailFromPoster();

    cy.get(".modal").then(($dialog) => {
      const dialog = $dialog[0].getBoundingClientRect();

      cy.wrap($dialog).trigger("click", {
        clientX: dialog.left - 10,
        clientY: dialog.top - 10,
        force: true,
      });
    });

    cy.get(".modal").should("have.prop", "open", false);
  });

  it("5. 모달 활성화 시 배경화면 스크롤이 비활성화 된다.", () => {
    cy.get("body").should("not.have.class", "modal-open");

    openMovieDetailFromPoster();
    cy.get("body").should("have.class", "modal-open");

    cy.get(".close-modal").click();
    cy.get("body").should("not.have.class", "modal-open");
  });
});
