import { LocalStorageRatingRepo } from "./../../src/rating/LocalStorageRatingRepo";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

describe("LocalStorageRatingRepo", () => {
  let repo: LocalStorageRatingRepo;

  beforeEach(() => {
    localStorage.clear();
    repo = new LocalStorageRatingRepo();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe("getRating", () => {
    it("저장된 별점이 없으면 null을 반환한다", () => {
      expect(repo.getRating(1)).toBeNull();
    });

    it("저장된 별점을 반환한다", () => {
      repo.saveRating(1, 8);

      expect(repo.getRating(1)).toBe(8);
    });

    it("다른 영화의 별점과 혼용되지 않는다", () => {
      repo.saveRating(1, 8);
      repo.saveRating(2, 4);

      expect(repo.getRating(1)).toBe(8);
      expect(repo.getRating(2)).toBe(4);
    });
  });

  describe("saveRating", () => {
    it("별점을 localStorage에 저장한다", () => {
      repo.saveRating(1, 10);

      expect(localStorage.getItem("movie-ratings")).not.toBeNull();
    });

    it("같은 영화에 별점을 다시 저장하면 덮어쓴다", () => {
      repo.saveRating(1, 6);
      repo.saveRating(1, 10);

      expect(repo.getRating(1)).toBe(10);
    });

    it("인스턴스를 새로 생성해도 저장된 별점이 유지된다", () => {
      repo.saveRating(42, 8);

      const newRepo = new LocalStorageRatingRepo();
      expect(newRepo.getRating(42)).toBe(8);
    });
  });

  describe("localStorage 오류 처리", () => {
    it("localStorage가 깨진 JSON이면 null을 반환한다", () => {
      localStorage.setItem("movie-ratings", "{ invalid json }");

      expect(repo.getRating(1)).toBeNull();
    });
  });
});
