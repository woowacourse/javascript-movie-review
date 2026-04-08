const render = (callback: () => void) => {
  addEventListener("load", () => {
    const app = document.querySelector("#app");
    if (!app) return;
    callback();
  });
};

export default render;
