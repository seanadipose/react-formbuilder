import { ReactElement } from "react";
import SelectDropdown from "../../modules/forms/components/select-dropdown";
import TextInput from "../../modules/forms/components/text-input";
import { BaseInputProps } from "../../modules/forms/models/forms.model";

export type ConfigFormFieldType = "text" | "dropdown";

export type FormInputFactoryType = (
  props: BaseInputProps
) => ReactElement<typeof SelectDropdown | typeof TextInput>;

export type ComponentDictionaryType = Record<
  ConfigFormFieldType,
  FormInputFactoryType
>;

export interface FormFields {
  name: string;
  label: string;
  type: ConfigFormFieldType;
  options?: string[] | undefined;
}

export interface FormConfig {
  title: string;
  fields: FormFields[];
}
