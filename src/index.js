import './resources.js';
import MovieHeader from './components/MovieHeader/MovieHeader';
import MovieItems from './components/MovieItems/MovieItems';
// import { AUTHENTICATION_OPTION } from './constants/DTO';
// import authenticateRequest from './domain/DTO/Request/AuthenticationRequest';

const init = () => {
  // authenticateRequest(AUTHENTICATION_OPTION);
  MovieHeader.create();
  MovieItems.create();
};

init();
