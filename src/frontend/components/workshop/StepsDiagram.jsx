// WorkshopSteps.jsx
import React, { useState } from "react";
import {
  StepContainer,
  StepNode,
  ArrowConnector,
  StepLabel,
  FlowWrapper,
  FlowOuterWrapper
} from "./StepsDiagram.styled";

const WorkshopSteps = ({ checkpoints, onAdvanceStep }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleStepClick = (index) => {
    if (index === currentIndex) {
      onAdvanceStep(index);
      setCurrentIndex((prev) => prev + 1);
    }
  };

  return (
    <FlowOuterWrapper>
        <FlowWrapper>
        {checkpoints.map((cp, index) => (
            <React.Fragment key={cp.name}>
            <StepContainer>
                <StepNode
                status={
                    index < currentIndex
                    ? "finished"
                    : index === currentIndex
                    ? "in progress"
                    : "upcoming"
                }
                onClick={() => handleStepClick(index)}
                >
                {index < currentIndex ? "✔" : index + 1}
                </StepNode>
                <StepLabel>{cp.name}</StepLabel>
            </StepContainer>

            {index < checkpoints.length - 1 && (
                <ArrowConnector
                className={index < currentIndex ? "visible" : "hidden"}
                />
            )}
            </React.Fragment>
        ))}
        </FlowWrapper>
    </FlowOuterWrapper>
  );
};

export default WorkshopSteps;
