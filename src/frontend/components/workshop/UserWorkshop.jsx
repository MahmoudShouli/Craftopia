/* eslint-disable no-unused-vars */
import { useEffect, useState} from "react";
import { useUser } from "../../context/UserContext";
import workshopService from "../../api/workshopService";
import messageService from "../../api/messageService";
import styledElements from "./Workshop.styled";
import { FiMaximize, FiMinimize} from "react-icons/fi";
import { socket } from "../../../utils/socket";
import Button from "../button/Button";
import PopupCreateWorkshop from "./PopupCreateWorkshop";


const UserWorkshop = () => {
  // states
  const { user } = useUser();

  const [hasAnyWP, setHasAnyWP] = useState(false);
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

  // functions
  const openPopup = async () => {
    const list = await messageService.getContacts(user.email);
    setChattedWithList(list);
    setIsPopupOpen(true);
  };


  const handleCreateWorkshop = ({ workshopName, selectedCrafters, checkpoints }) => {
    const workshop = {
      name: workshopName,
      admin: user.email,
      crafters: selectedCrafters,
      checkpoints: checkpoints.map(cp => ({ name: cp })),
    }

    
    console.log("✅ Final Workshop Object:", workshop);
  };

  
  return (
    <styledElements.WorkshopCard fullscreen={isFullscreen}>

      <styledElements.FullscreenToggle onClick={() => setIsFullscreen(!isFullscreen)}>
        {isFullscreen ? <FiMinimize /> : <FiMaximize />}
      </styledElements.FullscreenToggle>


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

       {isPopupOpen && (
        <PopupCreateWorkshop
          onClose={() => setIsPopupOpen(false)}
          crafters={chattedWithList}
          onCreate={handleCreateWorkshop}
        />
      )}

    </styledElements.WorkshopCard>
  );
};

export default UserWorkshop;
