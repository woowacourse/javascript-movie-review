import "./styles/common.css";

import MovieHeader from "./components/MovieHeader";
import QueryState from "./states/QueryState";

const queryState = new QueryState();
const movieHeader = new MovieHeader({ targetId: "movie-header", queryState });

movieHeader.init();
