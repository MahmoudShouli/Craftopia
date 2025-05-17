/* eslint-disable no-unused-vars */
import { useEffect, useState} from "react";
import { useUser } from "../../context/UserContext";
import workshopService from "../../api/workshopService";
import messageService from "../../api/messageService";
import styledElements from "./Workshop.styled";
import { FiMaximize, FiMinimize} from "react-icons/fi";
import { toast } from "react-toastify";
import { socket } from "../../../utils/socket";
import Button from "../button/Button";
import PopupCreateWorkshop from "./PopupCreateWorkshop";
import StepsDiagram from "./StepsDiagram";


const UserWorkshop = () => {
  // states
  const { user } = useUser();

  const [hasAnyWP, setHasAnyWP] = useState(false);
  const [workshop, setWorkshop] = useState();

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [chattedWithList, setChattedWithList] = useState([]);


  // effects
  useEffect(() => {
    const checkAdminStatus = async () => {
      const hasWorkshop = await workshopService.isAdminOfAnyWorkshop(user.email);
      setHasAnyWP(hasWorkshop);
    };
    checkAdminStatus();
  }, [user.email]);

  useEffect(() => {
    const fetchWorkshop = async () => {
      if (hasAnyWP) {
        const data = await workshopService.getWorkshopByAdmin(user.email);
        setWorkshop(data);
      }
    };

    fetchWorkshop();
  }, [hasAnyWP, user.email]);


  // functions
  const openPopup = async () => {
    const list = await messageService.getContacts(user.email);
    setChattedWithList(list);
    setIsPopupOpen(true);
  };


  const handleCreateWorkshop = async ({ workshopName, selectedCrafters, checkpoints }) => {
      const workshop = {
        name: workshopName,
        admin: user.email,
        crafters: selectedCrafters.map(c => ({email: c})),
        checkpoints: checkpoints.map(cp => ({ name: cp})),
      };

      try {
        const saved = await workshopService.createWorkshop(workshop);
        console.log("✅ Workshop created:", saved);
        toast.success("Workshop created!");
      } catch (err) {
        console.error("❌ Error creating workshop:", err);
        toast.error("Failed to create workshop.");
      }
  };

  if (!workshop || !workshop.checkpoints) {
    return <styledElements.Spinner />; 
  }

  
  return (
    <styledElements.WorkshopCard fullscreen={isFullscreen}>

      <styledElements.FullscreenToggle onClick={() => setIsFullscreen(!isFullscreen)}>
        {isFullscreen ? <FiMinimize /> : <FiMaximize />}
      </styledElements.FullscreenToggle>

      {isPopupOpen && (
        <PopupCreateWorkshop
          onClose={() => setIsPopupOpen(false)}
          crafters={chattedWithList}
          onCreate={handleCreateWorkshop}
        />
      )}

      {!hasAnyWP && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
            width: "100%",
            textAlign: "center",
          }}
        >
          <h2 style={{ marginBottom: "1rem" }}>You have no current workshops yet.</h2>
          <Button text="Create a workshop" size="large" color="#6a380f" onClick={openPopup} />
        </div>
      )}

      {hasAnyWP &&  (
        <StepsDiagram
          checkpoints={workshop.checkpoints}
          onAdvanceStep={(index) => {
            // Optional: update backend with new status
            console.log("Advance checkpoint:", index);
          }}
        />
      )}
      

    </styledElements.WorkshopCard>
  );
};

export default UserWorkshop;
