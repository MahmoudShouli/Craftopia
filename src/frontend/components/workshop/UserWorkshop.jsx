/* eslint-disable no-unused-vars */
import { useEffect, useState, useRef } from "react";
import { useUser } from "../../context/UserContext";
import workshopService from "../../api/workshopService";
import styledElements from "./Workshop.styled";
import { FiMaximize, FiMinimize} from "react-icons/fi";
import { socket } from "../../../utils/socket";
import Button from "../button/Button";

const UserWorkshop = () => {
  const { user } = useUser();
  const [hasAnyWP, setHasAnyWP] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

   useEffect(() => {
    const checkAdminStatus = async () => {
      const hasWorkshop = await workshopService.isAdminOfAnyWorkshop(user.email);
      setHasAnyWP(hasWorkshop);
    };
    checkAdminStatus();
  }, [user.email]);
  
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
          <Button text="Create a workshop" size="large" color="#6a380f" />
        </div>
      )}




    </styledElements.WorkshopCard>
  );
};

export default UserWorkshop;
