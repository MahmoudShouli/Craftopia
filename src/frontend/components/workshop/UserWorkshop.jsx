/* eslint-disable no-unused-vars */
import { useEffect, useState, useRef} from "react";
import { useUser } from "../../context/UserContext";
import workshopService from "../../api/workshopService";
import messageService from "../../api/messageService";
import styledElements from "./Workshop.styled";
import { FiMaximize, FiMinimize} from "react-icons/fi";
import { FaArrowLeft } from "react-icons/fa";
import { toast } from "react-toastify";
import { socket } from "../../../utils/socket";
import Button from "../button/Button";
import PopupCreateWorkshop from "./PopupCreateWorkshop";
import StepsDiagram from "./StepsDiagram";
import ChatBox from "../chat/ChatBox";


const UserWorkshop = () => {
  // states
  const { user } = useUser();

  const [activeTab, setActiveTab] = useState("chat");

  const [allWorkshops, setAllWorkshops] = useState([]);
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);


  const [chattedWithList, setChattedWithList] = useState([]);
  const [checkpoints, setCheckpoints] = useState();


  // effects
  useEffect(() => {
    const fetchAll = async () => {
      const workshops = await workshopService.getWorkshopsByAdmin(user.email);
      setAllWorkshops(workshops);
    };
    fetchAll();
  }, [user.email]);



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
        setAllWorkshops(prev => [...prev, saved]);
        setSelectedWorkshop(saved);
        setCheckpoints(saved.checkpoints);
        toast.success("Workshop created!");
      } catch (err) {
        console.error("❌ Error creating workshop:", err);
        toast.error("Failed to create workshop.");
      }
  };

  // if (allWorkshops.length > 0 && (!workshop || !workshop.checkpoints)) {
  //   return <styledElements.Spinner />; 
  // }

  
  return (
    <styledElements.WorkshopCard fullscreen={isFullscreen}>

      {selectedWorkshop && (
        <styledElements.BackButton onClick={() => setSelectedWorkshop(null)}>
        <FaArrowLeft />
      </styledElements.BackButton>
      )}
      
      {selectedWorkshop && (
        <styledElements.WorkshopName>
          {selectedWorkshop.name}
        </styledElements.WorkshopName>
      )}

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

      {allWorkshops.length === 0 && (
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

      {allWorkshops.length > 0 && !selectedWorkshop && (
        <styledElements.CenteredWrapper>
          <styledElements.WorkshopGrid>
            {allWorkshops.map((wp) => (
              <styledElements.WorkshopCardItem key={wp._id} onClick={() => {
                setSelectedWorkshop(wp);
                setCheckpoints(wp.checkpoints);
              }}>
                <h3>{wp.name}</h3>
                <p>{wp.checkpoints.length} checkpoint(s)</p>
                <p>{wp.crafters.length} crafter(s)</p>
                <styledElements.StatusLabel finished={wp.checkpoints.every(cp => cp.status === "finished")}>
                  {wp.checkpoints.every(cp => cp.status === "finished") ? "Finished" : "In Progress"}
                </styledElements.StatusLabel>

              </styledElements.WorkshopCardItem>
            ))}
          </styledElements.WorkshopGrid>
          <Button text="Create a workshop" size="large" color="#6a380f" onClick={openPopup} />
        </styledElements.CenteredWrapper>
        
      )}

      {selectedWorkshop && (
        <>
          <styledElements.Navbar>
            <styledElements.NavItem
              active={activeTab === "chat"}
              onClick={() => setActiveTab("chat")}
            >
              Chat
            </styledElements.NavItem>
            <styledElements.NavItem
              active={activeTab === "progress"}
              onClick={() => setActiveTab("progress")}
            >
              Progress
            </styledElements.NavItem>

          </styledElements.Navbar>

          <styledElements.ContentWrapper>
            {activeTab === "chat" && (
              <ChatBox mode="group" workshopInfo={selectedWorkshop} />
            )}

            {activeTab === "progress" && (
              <StepsDiagram
                checkpoints={checkpoints}
                setCheckpoints={setCheckpoints}
              />
            )}
          </styledElements.ContentWrapper>

            

        </>
      )}


    </styledElements.WorkshopCard>
  );
};

export default UserWorkshop;
