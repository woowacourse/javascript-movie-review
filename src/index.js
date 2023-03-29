import './styles/index.css';
import './components/index';

if (window.localStorage.getItem('myScore') === null) {
  window.localStorage.setItem('myScore', [JSON.stringify([])]);
}