import './resources.js';
import MovieHeader from './components/MovieHeader/MovieHeader';
import ItemView from './components/ItemView/ItemView';
// import { AUTHENTICATION_OPTION } from './constants/DTO';
// import authenticateRequest from './domain/DTO/Request/AuthenticationRequest';

const init = () => {
  // authenticateRequest(AUTHENTICATION_OPTION);
  MovieHeader.create();
  const item = new ItemView();
};

init();
