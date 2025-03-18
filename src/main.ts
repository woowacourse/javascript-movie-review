import Header from "./components/layout/Header.ts";
import { $ } from "./utils/dom.ts";


addEventListener("load", () => {
  const app = $("#app");
  
  const header = Header({title:"인사이드 아웃2"});
  if (!header) return;

  if (app) {
    app.appendChild(header);
  }
});
