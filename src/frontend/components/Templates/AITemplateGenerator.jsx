import React, { useState } from "react";
import styled from "styled-components";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { ImSpinner2 } from "react-icons/im";
import CraftDropdown from "../craftdropdown/CraftDropdown";
import { CraftValues } from "../../constants/craftsEnum";
import { generateFromDescription } from "../../api/aiService";
import { toast } from "react-toastify";
import axios from "axios";
import messageService from "../../api/messageService";
import notificationService from "../../api/notificationService";
import { useUser } from "../../context/UserContext";
import UserAvatar from "../useravatar/UserAvatar"; // ✅ Make sure this path is correct
import { socket } from "../../../utils/socket";

// Styled Components
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  width: 900px;
  max-width: 90%;
  padding: 1.5rem;
  background-color: white;
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
`;

const FieldWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.label`
  font-weight: 600;
  margin-bottom: 6px;
  text-align: center;
  color: #3b1d0f;
`;

const Textarea = styled.textarea`
  width: 400px;
  padding: 0.75rem;
  height: 180px;
  border-radius: 8px;
  border: 1px solid #6a380f;
  resize: vertical;
  font-size: 0.95rem;
  text-align: center;
`;

const SliderWrapper = styled.div`
  width: 400px;
  margin: 0 auto;
`;

const Button = styled.button`
  padding: 12px 20px;
  background-color: #6a380f;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
  font-size: 1rem;
  transition: 0.2s ease;
  align-self: center;

  &:hover {
    background-color: #5a2f0c;
  }
`;

const ImagePreview = styled.img`
  max-width: 100%;
  max-height: 300px;
  border-radius: 10px;
  margin-top: 1rem;
  border: 1px solid #ccc;
`;

const ActionRow = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1rem;
`;

const Spinner = styled(ImSpinner2)`
  font-size: 1.6rem;
  animation: spin 1s linear infinite;

  @keyframes spin {
    0% { transform: rotate(0); }
    100% { transform: rotate(360deg); }
  }
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0; left: 0; right: 0; bottom: 0;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

const ModalContent = styled.div`
  background: white;
  padding: 24px;
  border-radius: 12px;
  width: 400px;
  max-height: 80vh;
  overflow-y: auto;
`;

const CrafterCard = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 12px 16px;
  border: 1px solid #ccc;
  border-radius: 12px;
  margin-bottom: 1rem;
`;

const CrafterInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const Name = styled.span`
  font-weight: 600;
  color: #333;
`;

const SendButton = styled.button`
  background-color: #6a380f;
  color: white;
  border: none;
  padding: 8px 14px;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;

  &:hover {
    background-color: #5a2f0c;
  }
`;

const BASE_URL = process.env.REACT_APP_API_BASE_URL;

const AITemplateGenerator = () => {
  const { user } = useUser();
  const [craftType, setCraftType] = useState("");
  const [description, setDescription] = useState("");
  const [priceRange, setPriceRange] = useState([10, 100]);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const [showCrafterModal, setShowCrafterModal] = useState(false);
  const [matchingCrafters, setMatchingCrafters] = useState([]);

  const handleGenerate = async () => {
    if (!craftType || !description) {
      return toast.error("Please select a craft and enter a description.");
    }

    try {
      setLoading(true);
      setGeneratedImage(null);

      const imageUrl = await generateFromDescription(description);
      setGeneratedImage(imageUrl);
    } catch (err) {
      console.error("❌ Failed to generate image", err);
      toast.error("Failed to generate image from AI.");
    } finally {
      setLoading(false);
    }
  };

  const handleSendToChat = async () => {
    if (!generatedImage) return;

    try {
      const res = await axios.get(`${BASE_URL}/user/crafters-by-craft`, {
        params: { craft: craftType },
      });

      if (res.data.length === 0) return toast.info("No crafters found for this craft.");
      setMatchingCrafters(res.data);
      setShowCrafterModal(true);
    } catch (err) {
      toast.error("Failed to load crafters.");
      console.error(err);
    }
  };

  

const handleCrafterSelect = async (crafterEmail) => {
    const sender = user.email;
    const receiver = crafterEmail;

    try {
      // Upload OpenAI image URL via backend
      const uploadResponse = await axios.post(
        `${BASE_URL}/messages/upload-image-from-url`,
        { imageUrl: generatedImage }
      );

      const uploadedImageUrl = uploadResponse.data.url;

      // Send the image as a first message
      const imageMessage = await messageService.sendMessage({
        sender,
        receiver,
        content: uploadedImageUrl,
      });
      socket.emit("send_message", imageMessage);

      // Send the text message as second
      const textContent = `Hello! I'm interested in this template above 👆\nCan you make it with this price range: $${priceRange[0]} - $${priceRange[1]}?`;
      const textMessage = await messageService.sendMessage({
        sender,
        receiver,
        content: textContent,
      });
      socket.emit("send_message", textMessage);

      // Send a notification
      const notification = {
        text: `${user.name} sent you a message.`,
        linkTo: "Chatting",
        email: receiver,
      };
      await notificationService.createNotification(notification);
      socket.emit("notification", {
        to: receiver,
        notification,
      });

      toast.success("Message and image sent to crafter!");
      setShowCrafterModal(false);
    } catch (err) {
      console.error("❌ Failed to send message:", err);
      toast.error("Failed to send message.");
    }
  };



  return (
    <Container>
      <FieldWrapper>
        <Label>Craft Type</Label>
        <CraftDropdown
          crafts={CraftValues}
          selectedCraft={craftType}
          onSelectCraft={setCraftType}
        />
      </FieldWrapper>

      <FieldWrapper>
        <Label>Template Description</Label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Describe your desired template..."
        />
      </FieldWrapper>

      <FieldWrapper>
        <Label>Price Range (${priceRange[0]} - ${priceRange[1]})</Label>
        <SliderWrapper>
          <Slider
            range
            min={10}
            max={1000}
            step={10}
            value={priceRange}
            onChange={(range) => setPriceRange(range)}
          />
        </SliderWrapper>
      </FieldWrapper>

      {!generatedImage && (
        <Button onClick={handleGenerate} disabled={loading}>
          {loading ? <Spinner /> : "Generate with AI"}
        </Button>
      )}

      {generatedImage && (
        <>
          <ImagePreview src={generatedImage} alt="Generated Template" />
          <ActionRow>
            <Button onClick={handleGenerate}>Regenerate</Button>
            <Button onClick={handleSendToChat}>Send to Crafter Chat</Button>
          </ActionRow>
        </>
      )}

      {showCrafterModal && (
        <ModalOverlay>
          <ModalContent>
            <h3 style={{ textAlign: "center", color: "#6a380f" }}>Select a Crafter</h3>
            {matchingCrafters.map((crafter) => (
              <CrafterCard key={crafter.email}>
                <CrafterInfo>
                  <UserAvatar
                    previewUrl={crafter.avatarUrl} // if you have avatarUrl in DB
                    user={crafter}
                    width={80}
                    height={80}
                    />
                  <Name>{crafter.name}</Name>
                </CrafterInfo>
                <SendButton onClick={() => handleCrafterSelect(crafter.email)}>
                  Send
                </SendButton>
              </CrafterCard>
            ))}
            <Button onClick={() => setShowCrafterModal(false)} style={{ marginTop: "1rem" }}>
              Cancel
            </Button>
          </ModalContent>
        </ModalOverlay>
      )}
    </Container>
  );
};

export default AITemplateGenerator;
