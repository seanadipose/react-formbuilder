import { ReactElement } from "react";
import SelectDropdown from "./select-dropdown";
import { BaseInputProps } from "../models/forms.model";

const SelectBoxWrapper = (
  props: BaseInputProps = {
    value: "",
    placeholder: "",
    label: "",
    options: [],
  }
): ReactElement => <SelectDropdown {...(props as any)} />;

export { SelectBoxWrapper };
