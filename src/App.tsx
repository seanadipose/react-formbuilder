import { useState, useEffect } from "react";
import axios from "axios";

import { Container, Box, Typography } from "@material-ui/core";

import { formBuilder } from "./modules/forms/forms";
import { FormConfig } from "./core/models/form-config.model";

import "./App.scss";

export type FormsStateType = ReturnType<typeof formBuilder>;

export const App = (): JSX.Element => {
  const [
    formGroupComponent,
    setformGroupComponent,
  ] = useState<FormsStateType>();

  useEffect(() => {
    (async function getData() {
      const result = await axios.get<{ config: FormConfig[] }>(
        "/data/data.json"
      );
      console.log(result);
      setformGroupComponent(
        formBuilder(result.data, { onSubmit, label: "Submit" })
      );
    })();
  }, []);

  const onSubmit = (values: any, actions: any) => {
    console.log(values);
    actions.resetForm();
    return;
  };

  if (!formGroupComponent) {
    return <Typography>...loading</Typography>;
  }

  return (
    <div className="App">
      <Container maxWidth="sm">
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          style={{ minHeight: "300px", border: "1px solid grey" }}
        >
          <Box display="flex" flexDirection="column" width="100%">
            {formGroupComponent}
          </Box>
        </Box>
      </Container>
    </div>
  );
};

export default App;
