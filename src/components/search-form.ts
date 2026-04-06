import searchIconSrc from "../images/search.png";

export function createSearchForm(): HTMLDivElement {
  const wrapper = document.createElement("div");
  wrapper.className = "search-form-wrapper";

  const form = document.createElement("form");
  form.className = "search-form";
  form.action = "/search";
  form.method = "get";

  const input = document.createElement("input");
  input.type = "text";
  input.name = "query";
  input.placeholder = "검색어를 입력하세요";
  input.className = "search-input";

  const button = document.createElement("button");
  button.type = "submit";
  button.className = "search-button";

  const icon = document.createElement("img");
  icon.src = searchIconSrc;
  icon.alt = "검색";

  button.appendChild(icon);
  form.append(input, button);
  wrapper.appendChild(form);

  return wrapper;
}
