import { Movie } from "../../types/domain";
import { ITEMS } from "../constants/movie";
import calculatePageNumber from "../domain/calculatePageNumber.ts";

interface FetchMoviesParams {
  apiFetcher: (
    page: number,
    query?: string
  ) => Promise<{ results: Movie[]; totalResults: number }>;
  currentItemCount?: number;
  query?: string;
}

export const selectElement = <T extends Element>(
  selector: string,
  ancestor: Document | HTMLElement = document
): T => {
  const element = ancestor.querySelector<T>(selector);
  if (!element) {
    throw new Error(`selector가 ${selector}인 엘리먼트를 찾을 수 없습니다.`);
  }

  return element;
};

export const selectElementAll = <T extends Element>(
  selector: string,
  ancestor: Document | HTMLElement = document
): NodeListOf<T> => {
  const elements = ancestor.querySelectorAll<T>(selector);
  if (!elements) {
    throw new Error(`selector가 ${selector}인 엘리먼트들을 찾을 수 없습니다.`);
  }

  return elements;
};

export const toggleElementVisibility = (
  selector: string,
  option: "show" | "hidden"
) => {
  const element = selectElement<HTMLElement>(selector);
  if (option === "show") element.classList.remove("hidden");
  if (option === "hidden") element.classList.add("hidden");
};

export const fetchMovies = async ({
  currentItemCount,
  apiFetcher,
  query,
}: FetchMoviesParams) => {
  toggleElementVisibility(".skeleton-list", "show");

  const pageNumber = calculatePageNumber(
    currentItemCount ?? ITEMS.initialCount
  );
  const { results, totalResults } = await apiFetcher(pageNumber, query);
  if (totalResults === 0) {
    toggleElementVisibility(".no-thumbnail", "show");
  }

  toggleElementVisibility(".skeleton-list", "hidden");

  return results;
};
