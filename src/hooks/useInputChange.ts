import { $ } from "../utils/domHelper";

const useInputChange = (
  selector: string,
  setSearchInputValue: (value: string) => void
) => {
  const handleInputChange = () => {
    const inputElement = $(selector) as HTMLInputElement;
    const inputValue = inputElement.value;

    if (!inputValue.trim()) return;

    setSearchInputValue(inputValue);
  };

  return { handleInputChange };
};

export default useInputChange;
