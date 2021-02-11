import React from "react";
import { useFormikContext } from "formik";

import { Button } from "@material-ui/core";
import { ButtonProps } from "@material-ui/core/Button";

interface SubmitButtonProps extends ButtonProps {
  color?: "primary" | "default" | "secondary";
  requireDirty?: boolean;
  disabled?: boolean;
}

const SubmitButton: React.FC<SubmitButtonProps> = ({
  children,
  color = "primary",
  requireDirty = false,
  disabled = false,
  ...rest
}): React.ReactElement => {
  const { dirty, isValid } = useFormikContext();

  const disableButton = (requireDirty && !dirty) || !isValid || disabled;

  return (
    <Button
      color={color}
      variant="contained"
      type="submit"
      disabled={disableButton}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default SubmitButton;
