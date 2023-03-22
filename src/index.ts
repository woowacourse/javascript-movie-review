import '../css/reset.css';
import '../css/common.css';
import { initProxy } from './domains/proxy';
import { pageRender } from './pages/pageRender';

const App = {
  state: {
    query: { value: '', isSearch: false },
    moreButton: { isClick: false, currentPage: 1, isSearch: false },
  },

  init() {
    initProxy(this.state);
    pageRender.renderHeader();
    pageRender.renderMainContents();
  },
};

const app = App;
app.init();
