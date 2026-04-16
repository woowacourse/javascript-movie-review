import { StorageError } from "../../src/errors/DomainErrors";
import { LocalStorageRatingRepo } from "./../../src/rating/LocalStorageRatingRepo";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

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
    it("저장된 별점이 없으면 null을 반환한다", async () => {
      await expect(repo.getRating(1)).resolves.toBeNull();
    });

    it("저장된 별점을 반환한다", async () => {
      await repo.saveRating(1, 8);

      await expect(repo.getRating(1)).resolves.toBe(8);
    });

    it("다른 영화의 별점과 혼용되지 않는다", async () => {
      await repo.saveRating(1, 8);
      await repo.saveRating(2, 4);

      await expect(repo.getRating(1)).resolves.toBe(8);
      await expect(repo.getRating(2)).resolves.toBe(4);
    });
  });

  describe("saveRating", () => {
    it("별점을 localStorage에 저장한다", async () => {
      await repo.saveRating(1, 10);

      expect(localStorage.getItem("movie-ratings")).not.toBeNull();
    });

    it("같은 영화에 별점을 다시 저장하면 덮어쓴다", async () => {
      await repo.saveRating(1, 6);
      await repo.saveRating(1, 10);

      await expect(repo.getRating(1)).resolves.toBe(10);
    });

    it("인스턴스를 새로 생성해도 저장된 별점이 유지된다", async () => {
      await repo.saveRating(42, 8);

      const newRepo = new LocalStorageRatingRepo();
      await expect(newRepo.getRating(42)).resolves.toBe(8);
    });
  });

  describe("localStorage 오류 처리", () => {
    it("localStorage가 깨진 JSON이면 null을 반환한다", async () => {
      localStorage.setItem("movie-ratings", "{ invalid json }");

      await expect(repo.getRating(1)).resolves.toBeNull();
    });

    it("localStorage.setItem이 실패하면 StorageError를 throw한다", async () => {
      const spy = vi
        .spyOn(Storage.prototype, "setItem")
        .mockImplementation(() => {
          throw new Error("QuotaExceededError");
        });

      await expect(repo.saveRating(1, 8)).rejects.toBeInstanceOf(StorageError);

      spy.mockRestore();
    });
  });
});
