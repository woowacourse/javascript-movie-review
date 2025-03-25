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

  const resetInput = () => {
    const inputValue = $(selector) as HTMLInputElement;
    if (inputValue) {
      inputValue.value = "";
    }
  };

  return { handleInputChange, resetInput };
};

export default useInputChange;
