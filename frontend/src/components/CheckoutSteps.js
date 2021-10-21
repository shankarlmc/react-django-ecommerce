import React from "react";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  stepper: {
    padding: theme.spacing(3, 0, 5),
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "center",
  },
}));

function CheckoutSteps({ step1, step2, step3, step4 }) {
  const [activeStep, setActiveStep] = React.useState(0);
  if (step2) {
    setActiveStep[0] = 1;
  }
  if (step3) {
    setActiveStep[0] = 2;
  }
  if (step4) {
    setActiveStep[0] = 3;
  }

  const classes = useStyles();
  return (
    <Stepper
      activeStep={setActiveStep[0]}
      data={activeStep}
      className={classes.stepper}
    >
      {step1 ? (
        <Step key="Sign In">
          <StepLabel>Sign In</StepLabel>
        </Step>
      ) : (
        <Step key="Sign In">
          <StepLabel>Sign In</StepLabel>
        </Step>
      )}
      {step2 ? (
        <Step key="Shipping">
          <StepLabel>Shipping</StepLabel>
        </Step>
      ) : (
        <Step key="Shipping">
          <StepLabel>Shipping</StepLabel>
        </Step>
      )}
      {step3 ? (
        <Step key="Payment">
          <StepLabel>Payment</StepLabel>
        </Step>
      ) : (
        <Step key="Payment">
          <StepLabel>Payment</StepLabel>
        </Step>
      )}
      {step4 ? (
        <Step key="Place Order">
          <StepLabel>Place Order</StepLabel>
        </Step>
      ) : (
        <Step key="Place Order">
          <StepLabel>Place Order</StepLabel>
        </Step>
      )}
    </Stepper>
  );
}

export default CheckoutSteps;
