// PopupCreateWorkshop.jsx
import { useState } from "react";
import PopUpPage from "../map/PopUpPage";
import {
  Container,
  Section,
  Divider,
  Title,
  CrafterSelect,
  CrafterOption,
  Avatar,
  CheckpointList,
  CheckpointInput,
  AddCheckpointButton,
  CreateButton,
  NamePopupContainer,
  NameInput,
} from "./PopupCreateWorkshop.styled";


const PopupCreateWorkshop = ({ onClose, crafters, onCreate }) => {
    const [selectedCrafters, setSelectedCrafters] = useState([]);
    const [checkpoints, setCheckpoints] = useState([""]);
    const [showNamePopup, setShowNamePopup] = useState(false);
    const [workshopName, setWorkshopName] = useState("");

    const toggleCrafter = (email) => {
        setSelectedCrafters((prev) =>
        prev.includes(email)
            ? prev.filter((e) => e !== email)
            : [...prev, email]
        );
    };

    const handleCheckpointChange = (index, value) => {
        const updated = [...checkpoints];
        updated[index] = value;
        setCheckpoints(updated);
    };

    const addCheckpoint = () => setCheckpoints((prev) => [...prev, ""]);

    const handleCreate = () => {
        setShowNamePopup(true);
    };

    const finalizeWorkshop = () => {
        onCreate({ workshopName, selectedCrafters, checkpoints });
        onClose();
    };

    return (
    <PopUpPage onClose={onClose}>
        {!showNamePopup ? (
        <>
            <Container>
            <Section>
                <Title>Select Crafters</Title>
                <CrafterSelect>
                {crafters.map((crafter) => (
                    <CrafterOption
                    key={crafter.email}
                    selected={selectedCrafters.includes(crafter.email)}
                    onClick={() => toggleCrafter(crafter.email)}
                    >
                    <Avatar src={crafter.avatarUrl} alt={crafter.name} />
                    {crafter.name}
                    </CrafterOption>
                ))}
                </CrafterSelect>
            </Section>

            <Divider />

            <Section>
                <Title>Add Checkpoints</Title>
                <CheckpointList>
                {checkpoints.map((cp, index) => (
                    <CheckpointInput
                    key={index}
                    value={cp}
                    onChange={(e) => handleCheckpointChange(index, e.target.value)}
                    placeholder={`Checkpoint ${index + 1}`}
                    />
                ))}
                </CheckpointList>
                <AddCheckpointButton onClick={addCheckpoint}>
                + Add Checkpoint
                </AddCheckpointButton>
            </Section>
            </Container>

            <CreateButton onClick={handleCreate}>Continue</CreateButton>
        </>
        ) : (
        <NamePopupContainer>
            <Title>What do you want to name it?</Title>
            <NameInput
            type="text"
            placeholder="Workshop name"
            value={workshopName}
            onChange={(e) => setWorkshopName(e.target.value)}
            />
            <CreateButton onClick={finalizeWorkshop}>Create Workshop</CreateButton>
        </NamePopupContainer>
        )}
    </PopUpPage>
    );
};

export default PopupCreateWorkshop;
