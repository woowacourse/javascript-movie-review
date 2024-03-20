import '../../../templates/reset.css';
import '../../../templates/common.css';
import Header from '../Header/Header';
import BasicFrame from '../BasicFrame/BasicFrame';
import { API_ENDPOINT, API_OPTION } from '../../constants/api/api';
import MovieContainer from '../MovieContainer/MovieContainer';
import uiFeedBackManager from '../../services/UIFeedBackManager';

async function App() {
  Header();
  BasicFrame();
  const data = await uiFeedBackManager.fetchData(API_ENDPOINT.POPULAR(), 'GET', null, API_OPTION.headers);
  MovieContainer(data);
}

export default App;
