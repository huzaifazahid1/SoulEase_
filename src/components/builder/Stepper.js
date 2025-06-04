"use client";

import React from "react";
import { CheckIcon } from "@heroicons/react/24/solid";

const Stepper = ({ steps, activeStep, onStepClick }) => {
  return (
    <div className="w-full py-6 px-4">
      <div className="flex items-center">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            {/* Step circle */}
            <button
              onClick={() => onStepClick(index)}
              className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 shadow-md 
                ${
                  index < activeStep
                    ? "bg-gradient-to-br from-primary to-accent text-white"
                    : index === activeStep
                    ? "bg-gradient-to-br from-primary/20 to-accent/20 border-2 border-primary text-primary"
                    : "bg-gray-100 text-gray-400"
                }
                ${
                  index <= activeStep
                    ? "cursor-pointer hover:scale-110"
                    : "cursor-not-allowed opacity-70"
                }
              `}
              disabled={index > activeStep}
              aria-current={index === activeStep ? "step" : undefined}
            >
              {index < activeStep ? (
                <CheckIcon className="w-6 h-6" />
              ) : (
                <span className="font-medium">{index + 1}</span>
              )}
            </button>

            {/* Step title */}
            <div
              className={`hidden sm:block ml-4 ${
                index === steps.length - 1 ? "mr-0" : "mr-auto"
              }`}
            >
              <span
                className={`text-sm font-bold ${
                  index <= activeStep ? "text-primary" : "text-gray-500"
                }`}
              >
                {step.title}
              </span>
              <p className="text-xs text-gray-500">{step.description}</p>
            </div>

            {/* Connector line */}
            {index < steps.length - 1 && (
              <div
                className={`flex-auto mx-4 h-1 hidden sm:block rounded-full transition-all duration-500 
                ${
                  index < activeStep
                    ? "bg-gradient-to-r from-primary to-accent"
                    : "bg-gray-200"
                }`}
              />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Mobile step titles (visible only on small screens) */}
      <div className="sm:hidden mt-4">
        <p className="text-base font-bold text-primary">
          Step {activeStep + 1}: {steps[activeStep].title}
        </p>
        <p className="text-sm text-gray-500">{steps[activeStep].description}</p>
      </div>
    </div>
  );
};

export default Stepper;
