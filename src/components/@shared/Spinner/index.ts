/**
 * Spinner 컴포넌트
 *
 * @description
 * 로딩 상태를 시각적으로 표시하기 위한 스피너 컴포넌트입니다.
 * 행성(planet)과 궤도를 도는 위성(satellite)으로 구성되어 있습니다.
 *
 * @param {number} [scale=1] - 스피너 전체를 비율 조정하기 위한 값입니다.
 *   예를 들어, scale이 2이면 스피너 크기가 2배로 렌더링됩니다.
 *   기본값은 1이며, 1배 크기(약 50px x 50px)로 표시됩니다.
 */
const Spinner = (scale: number = 1): string => {
  return /*html*/ `
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
