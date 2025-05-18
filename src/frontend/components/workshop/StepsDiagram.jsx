// WorkshopStepsDnD.jsx
import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  StepContainer,
  StepNode,
  StepLabel,
  ArrowConnector,
  FlowWrapper,
  FlowOuterWrapper,
} from "./StepsDiagram.styled";
import { toast } from "react-toastify";
import { updateCheckpointStatus, updateCheckpointOrder } from "../../api/workshopService";
import { useUser } from "../../context/UserContext";

const SortableStep = ({ cp, index, currentIndex, onClick, length }) => {
  const isDraggable = cp.status !== "finished";

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: cp.name, disabled: !isDraggable });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <React.Fragment>
      <StepContainer ref={setNodeRef} style={style} {...attributes} {...(isDraggable ? listeners : {})}>
        <StepNode
          status={cp.status === "finished" ? cp.status : index === currentIndex ? cp.status : "upcoming"}
          onClick={() => onClick(index)}
        >
          {cp.status === "finished" ? "✔" : index + 1}
        </StepNode>
        <StepLabel>{cp.name}</StepLabel>
      </StepContainer>

      {index < length - 1 && (
        <ArrowConnector className={cp.status === "finished" ? "visible" : "hidden"} />
      )}
    </React.Fragment>
  );
};

const StepsDiargam = ({ checkpoints, setCheckpoints }) => {
  const { user } = useUser();
  const [currentIndex, setCurrentIndex] = useState(
    checkpoints.findIndex((cp) => cp.status === "in progress")
  );

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: { distance: 5 },
    })
  );

  const handleDragEnd = async (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = checkpoints.findIndex((cp) => cp.name === active.id);
    const newIndex = checkpoints.findIndex((cp) => cp.name === over.id);
    const reordered = arrayMove(checkpoints, oldIndex, newIndex);

    setCheckpoints(reordered);

    // persist new order
    try {
      await updateCheckpointOrder(user.email, reordered);
    } catch (err) {
      console.error("❌ Failed to save new checkpoint order", err);
    }
  };

  const handleStepClick = async (index) => {
    const cp = checkpoints[index];
    const updated = [...checkpoints];


    if (cp.status === "in progress") {
      if (index > currentIndex ){
        toast.error("Stay in order, or change the order 😘");
        return;
      }
      try {
        await updateCheckpointStatus(user.email, cp.name, "finished");
        updated[index].status = "finished";
        toast.success("Well done! 😁");
        setCheckpoints(updated);
        setCurrentIndex(checkpoints.findIndex((cp) => cp.status === "in progress"));
      } catch (err) {
        console.error("❌ Failed to update checkpoint status", err);
      }
    } else if (cp.status === "finished") {
      try {
        await updateCheckpointStatus(user.email, cp.name, "in progress");
        updated[index].status = "in progress";
        setCheckpoints(updated);
        setCurrentIndex(checkpoints.findIndex((cp) => cp.status === "in progress"));
      } catch (err) {
        console.error("❌ Failed to update checkpoint status", err);
      }
    }
  };

  

  return (
    <FlowOuterWrapper>
      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={checkpoints.map((cp) => cp.name)}
          strategy={horizontalListSortingStrategy}
        >
          <FlowWrapper>
            {checkpoints.map((cp, index) => (
              <SortableStep
                key={cp.name}
                cp={cp}
                index={index}
                currentIndex={currentIndex}
                onClick={handleStepClick}
                length={checkpoints.length}
              />
            ))}
          </FlowWrapper>
        </SortableContext>
      </DndContext>
    </FlowOuterWrapper>
  );
};

export default StepsDiargam;
