import { MovieDetail } from "./pages/movieDetail.ts";
import { Index } from "./pages/index.ts";
import { Search } from "./pages/search.ts";

const Main = {
	init() {
		Index.init();
		Search.init();
		MovieDetail.init();
	}
}

Main.init();
