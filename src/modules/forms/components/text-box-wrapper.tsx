import { BaseInputProps } from "../models/forms.model";
import TextInput from "./text-input";

const InputBoxWrapper = (
  props: BaseInputProps = {
    value: "",
    placeholder: "",
    label: "",
    options: [],
  }
) => {
  return <TextInput {...(props as any)} />;
};

export { InputBoxWrapper };
