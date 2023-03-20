const renderComponents = (...func) => {
  func.forEach((component) => {
    component.render();
  });
};

export default renderComponents;
