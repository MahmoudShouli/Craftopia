/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState, useRef } from "react";
import { useUser } from "../../context/UserContext";
import styledElements from "./Workshop.styled";
import { FiMaximize, FiMinimize} from "react-icons/fi";
import { socket } from "../../../utils/socket";

const Workshop = () => {
  const { user } = useUser();
  const role = user.role;
 
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  return (
    <styledElements.WorkshopCard fullscreen={isFullscreen}>

      <styledElements.FullscreenToggle onClick={() => setIsFullscreen(!isFullscreen)}>
        {isFullscreen ? <FiMinimize /> : <FiMaximize />}
      </styledElements.FullscreenToggle>





    </styledElements.WorkshopCard>
  );
};

export default Workshop;
