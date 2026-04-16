import { MovieDetail } from "./pages/movieDetail.ts";
import { Index } from "./pages/index.ts";
import { Search } from "./pages/search.ts";
import { Storage } from "./storage.ts";

const Main = {
	init() {
		const storage = new Storage();
		Index.init();
		Search.init();
		MovieDetail.init(storage);
	},
}

Main.init();
