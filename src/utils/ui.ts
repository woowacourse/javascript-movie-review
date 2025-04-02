import { Movie } from "../../types/domain";

interface FetchMoviesParams {
  apiFetcher: (
    pageNumber: number,
    query?: string
  ) => Promise<{ results: Movie[]; totalResults: number }>;
  pageNumber: number;
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
  pageNumber,
  apiFetcher,
  query,
}: FetchMoviesParams) => {
  toggleElementVisibility(".skeleton-list", "show");

  const { results, totalResults } = await apiFetcher(pageNumber, query);
  if (totalResults === 0) {
    toggleElementVisibility(".no-thumbnail", "show");
  }

  toggleElementVisibility(".skeleton-list", "hidden");

  return results;
};
