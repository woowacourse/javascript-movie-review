import { useState } from "../utils/Core";

export type UseBooleanReturn = ReturnType<typeof useBoolean>;

const useBoolean = (
  initialValue: boolean
): [boolean, () => void, () => void] => {
  const [value, setValue] = useState(initialValue);

  const setTrue = () => {
    setValue(true);
  };

  const setFalse = () => {
    setValue(false);
  };

  return [value, setTrue, setFalse];
};

export default useBoolean;
