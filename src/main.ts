import Footer from "./components/layout/Footer.ts";
import Header from "./components/layout/Header.ts";
import { $ } from "./utils/dom.ts";


addEventListener("load", () => {
  const app = $("#app");
  
  const header = Header({title:"인사이드 아웃2"});
  if (!header) return;
  const footer = Footer();

  if (app) {
    app.appendChild(header);
    app.appendChild(footer);
  }
});
