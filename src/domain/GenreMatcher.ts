import { Genre, MovieGenreApi } from "../type/movieType";
import { request } from "../util/apiRequest";
import { movieGenreListUrl } from "./movieUrl";

class GenreMatcher {
  matcher: Genre = {};

  constructor() {
    this.generateGenreMatcher();
  }

  generateGenreMatcher = async () => {
    const url = movieGenreListUrl();
    const genreList = await request(url).then((data) => data.genres);

    genreList.forEach(({ id, name }: MovieGenreApi) => {
      this.matcher[id] = name;
    });
  };

  convert(genreNumberArray: number[]) {
    return genreNumberArray.map((genreNumber) => this.matcher[genreNumber]);
  }
}

export default new GenreMatcher();
