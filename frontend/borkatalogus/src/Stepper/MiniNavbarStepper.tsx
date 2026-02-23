import React from "react";
import "../Stepper/MiniNavbarStepper..css";

interface MiniNavbarStepperProps {
  currentStep: number; // 1 = Cart, 2 = Checkout, 3 = Done
}

export default function MiniNavbarStepper({ currentStep }: MiniNavbarStepperProps) {
  return (
    <div className="mini-stepper">

      <div className="step-item">
        <div className={`step-circle ${currentStep > 1 ? "complete" : currentStep === 1 ? "active" : ""}`}>
          {currentStep > 1 ? "✓" : "1"}
        </div>
        <span className="step-label">Cart</span>
      </div>

      <div className={`step-line ${currentStep > 1 ? "active" : ""}`}></div>

      <div className="step-item">
        <div className={`step-circle ${currentStep > 2 ? "complete" : currentStep === 2 ? "active" : ""}`}>
          {currentStep > 2 ? "✓" : "2"}
        </div>
        <span className="step-label">Checkout</span>
      </div>

      <div className={`step-line ${currentStep > 2 ? "active" : ""}`}></div>

      <div className="step-item">
        <div className={`step-circle ${currentStep === 3 ? "active" : ""}`}>
          {currentStep === 3 ? "✓" : "3"}
        </div>
        <span className="step-label">Done</span>
      </div>
    </div>
  );
}
