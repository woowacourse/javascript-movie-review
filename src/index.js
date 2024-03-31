import './styles/main.css';
import App from './components/App';
import WebController from './controller/WebController';

const app = App();
app.render();

document.addEventListener('DOMContentLoaded', () => {
  WebController.setup();
});
