import { ReactNode } from "react";
import {
  ConfigFormFieldType,
  FormConfig,
  FormFields,
} from "../../core/models/form-config.model";
import { Typography } from "@material-ui/core";
import { Formik, Form } from "formik";
import SubmitButton from "./components/submit-button";

import { componentDictionary } from "./constants/component-dictionary.constant";

import * as R from "remeda";

const formFieldNameKey: keyof FormFields = "name";

interface FormWrapperProps {
  onSubmit: (values: any, actions: any) => void;
  label: string;
}

const labelToId = (text: string) => text.replace(/([A-Za-z])/g, "$1");

const makeFormPair = (id: string) => ({
  [id]: id !== "country" ? undefined : "",
});

const makeFormPairs = (labels: string[]) =>
  labels.map((l) => makeFormPair(labelToId(l)));

const makeFormGroup = (formPairs: ReturnType<typeof makeFormPairs>) =>
  formPairs.reduce((acc, cur) => ({ ...acc, ...cur }), {});

const getFormComponents = (type: ConfigFormFieldType) => {
  return componentDictionary[type];
};

const pickNameFromFields = (field: FormFields) => {
  const keys = R.merge(field, { key: R.pipe(field, R.prop(formFieldNameKey)) });

  return keys;
};

const mapFormFieldsToKey = (formField: FormFields[]) =>
  R.map(formField, (field) => field?.name);

function makeFormFieldComponents(config: FormConfig[]) {
  const makeTitleComponent = (title: string) => (
    <Typography variant="h3"> {title} </Typography>
  );

  const makeFieldComponents = (formFields: FormFields[]) =>
    R.pipe(
      formFields,
      (fieldTuple) => R.flatMap(fieldTuple, (fieldArray) => fieldArray),
      R.map(pickNameFromFields),
      R.map((field: FormFields) => [getFormComponents(field.type)(field)])
    );

  return R.map(config, (formConfig) => [
    makeTitleComponent(formConfig.title),
    makeFieldComponents(formConfig.fields),
  ]);
}

function makeFormGroupObject(config: FormConfig[]) {
  return R.pipe(
    config,
    R.map((formConfig) => formConfig?.fields || []),
    (fieldsTuple) => R.flatMap(fieldsTuple, (input) => input),
    (formFields) => mapFormFieldsToKey(formFields),
    (keys) => makeFormPairs(keys),
    (fields) => makeFormGroup(fields)
  );
}
function formsFactory(data: { config: FormConfig[] }) {
  const { config } = data;

  return {
    formGroup: makeFormGroupObject(config),
    formComponents: makeFormFieldComponents(config),
  };
}

function formBuilder(data: { config: FormConfig[] }, props: FormWrapperProps) {
  const { formComponents, formGroup } = formsFactory(data);

  const { onSubmit, label } = props;
  return (
    <Formik onSubmit={onSubmit} initialValues={formGroup}>
      {({ handleSubmit }): ReactNode => (
        <>
          <Form className={"form-wrapper"} onSubmit={handleSubmit} noValidate>
            {formComponents}
            <SubmitButton>{label}</SubmitButton>
          </Form>
        </>
      )}
    </Formik>
  );
}

export { formBuilder };
