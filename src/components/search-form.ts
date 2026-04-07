import searchIconSrc from "../../templates/images/search.png";
import { ROUTES } from "../route/constants";

export function createSearchForm(): HTMLDivElement {
  const wrapper = document.createElement("div");
  wrapper.className = "search-form-wrapper";

  const form = createForm();
  form.append(createInput(), createButton());
  wrapper.appendChild(form);

  return wrapper;
}

function createForm(): HTMLFormElement {
  const form = document.createElement("form");
  form.className = "search-form";
  form.action = ROUTES.SEARCH;
  form.method = "get";
  return form;
}

function createInput(): HTMLInputElement {
  const input = document.createElement("input");
  input.type = "text";
  input.name = "query";
  input.placeholder = "검색어를 입력하세요";
  input.className = "search-input";
  input.required = true;
  return input;
}

function createButton(): HTMLButtonElement {
  const button = document.createElement("button");
  button.type = "submit";
  button.className = "search-button";
  button.appendChild(createSearchIcon());
  return button;
}

function createSearchIcon(): HTMLImageElement {
  const icon = document.createElement("img");
  icon.src = searchIconSrc;
  icon.alt = "검색";
  return icon;
}
