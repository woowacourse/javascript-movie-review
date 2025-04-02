import { getGenres } from "../../api/services/movie";
import { GenresResponse } from "../../api/types/movie/response";
import { handleApiResponse } from "../../api/utils/handlers";

export default class Genres {
  private static instance: Genres;
  private _genres: GenresResponse["genres"] = [];

  static getInstance(): Genres {
    if (!Genres.instance) Genres.instance = new Genres();
    return Genres.instance;
  }

  async setGenres() {
    const genreResponse = await getGenres();

    handleApiResponse<GenresResponse>(genreResponse, {
      onSuccess: (data) => (this._genres = data.genres),
    });
  }

  getGenreNamesByIds(genreIds: number[]): string[] {
    return this._genres
      .filter((genre) => genreIds.includes(genre.id))
      .map((genre) => genre.name);
  }
}
