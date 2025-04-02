const ProgressIndicator = (scale: number = 1): string => {
  return /*html*/ `
    <div class="spinner-container">
      <div class="orbit-spinner" style="scale: ${scale}">
        <div class="planet"></div>
        <div class="orbit">
          <div class="satellite satellite-1"></div>
          <div class="satellite satellite-2"></div>
        </div>
      </div>
    </div>
  `;
};

export default ProgressIndicator;
