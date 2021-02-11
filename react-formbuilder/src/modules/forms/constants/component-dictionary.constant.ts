import { ComponentDictionaryType } from "../../../core/models/form-config.model";
import { SelectBoxWrapper } from "../components/select-box-wrapper";
import { InputBoxWrapper } from "../components/text-box-wrapper";

export const componentDictionary: ComponentDictionaryType = {
  text: InputBoxWrapper,
  dropdown: SelectBoxWrapper,
};
