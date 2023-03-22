import { App } from "../components/AppComponent";

const navigate = (url: string) => {
  window.history.replaceState(null, "", url);
  App();
};

export default navigate;
