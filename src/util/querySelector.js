const $ = (selectors, root = document) => root.querySelector(selectors);
const $$ = (selector, root = document) => root.querySelectorAll(selector);

export { $, $$ };
