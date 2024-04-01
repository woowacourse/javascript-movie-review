export interface changingElementClassProps {
  $targetElement: HTMLElement;
  className: string;
  conditionForClass: {
    /**
     * 클래스가 추가되는 조건
     */
    additionCondition: boolean;
    /**
     * 클래스가 제거되는 조건
     */
    removalCondition: boolean;
  };
}

/**
 * 조건에 따라 해당 element의 클래스를 추가 하거나 제거하는 기능
 */
export const changeElementClass = (props: changingElementClassProps) => {
  const { $targetElement, className, conditionForClass } = props;

  if (conditionForClass.additionCondition) {
    $targetElement.classList.add(className);
    return;
  }

  if (conditionForClass.removalCondition) {
    $targetElement.classList.remove(className);
    return;
  }
};
