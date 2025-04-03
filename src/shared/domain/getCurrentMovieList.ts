import { getMovieList } from "../../features/movie/api/getMovieList";
import { getSearchedPost } from "../../features/search/api/getSearchedPost";
import { showErrorPage } from "../../shared/ui/renderers/showErrorPage";
import errorMessageParser from "../parser/errorMessageParser";

export async function getCurrentMovieList(page: number, query: string | null) {
  try {
    if (query) {
      return await getSearchedPost(query, page);
    }

    return await getMovieList({ page });
  } catch (error) {
    showErrorPage(errorMessageParser(error as Error));
  }
}
