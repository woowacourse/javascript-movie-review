import APIHandler from "../ApIHandler";

class DetailMovieService {
  static async getMovieDetails(movieId: number) {
    const movieDetails = await APIHandler.get(
      `/movie/${movieId}?language=ko-KR`
    );
    return movieDetails;
  }
}

export default DetailMovieService;
