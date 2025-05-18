// WorkshopSteps.jsx
import React from "react";
import {
  StepContainer,
  StepNode,
  ArrowConnector,
  StepLabel,
  FlowWrapper,
  FlowOuterWrapper
} from "./StepsDiagram.styled";
import { updateCheckpointStatus } from "../../api/workshopService";
import { useUser } from "../../context/UserContext";

const WorkshopSteps = ({ checkpoints, setCheckpoints }) => {
  const { user } = useUser();

  const handleStepClick = async (index) => {
    const cp = checkpoints[index];
    if (cp.status === "in progress") {
        try {
        await updateCheckpointStatus(user.email, cp.name, "finished");

        // Update local state to reflect the change
        const updated = [...checkpoints];
        updated[index].status = "finished";
        setCheckpoints(updated); // passed in via props or lifted state
        } catch (err) {
        console.error("❌ Failed to update checkpoint status", err);
        }
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
                    cp.status
                }
                onClick={() => handleStepClick(index)}
                >
                {cp.status === "finished" ? "✔" : index + 1}
                </StepNode>
                <StepLabel>{cp.name}</StepLabel>
            </StepContainer>

            {index < checkpoints.length - 1 && (
                <ArrowConnector
                className={cp.status === "finished" ? "visible" : "hidden"}
                />
            )}
            </React.Fragment>
        ))}
        </FlowWrapper>
    </FlowOuterWrapper>
  );
};

export default WorkshopSteps;
