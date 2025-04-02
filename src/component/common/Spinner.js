const Spinner = (scale) => {
    return `
    <div class="orbit-spinner" style="scale: ${scale}">
        <div class="planet"></div>
        <div class="orbit">
          <div class="satellite satellite-1"></div>
          <div class="satellite satellite-2"></div>
        </div>
      </div>
    `;
  };
  
  export default Spinner;