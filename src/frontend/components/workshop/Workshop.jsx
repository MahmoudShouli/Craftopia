/* eslint-disable no-unused-vars */
import { useEffect, useState, useRef} from "react";
import { useUser } from "../../context/UserContext";
import workshopService from "../../api/workshopService";
import messageService from "../../api/messageService";
import { getUserByEmail } from "../../api/userService";
import notificationService from "../../api/notificationService";
import styledElements from "./Workshop.styled";
import { FiMaximize, FiMinimize} from "react-icons/fi";
import { FaArrowLeft } from "react-icons/fa";
import { toast } from "react-toastify";
import Button from "../button/Button";
import PopupCreateWorkshop from "./PopupCreateWorkshop";
import StepsDiagram from "./StepsDiagram";
import ChatBox from "../chat/ChatBox";
import InvitePopup from "./InvitePopup";
import { socket } from "../../../utils/socket";



const Workshop = () => {
  // states
  const { user } = useUser();

  const [activeTab, setActiveTab] = useState("chat");

  const [allWorkshops, setAllWorkshops] = useState([]);
  const [selectedWorkshop, setSelectedWorkshop] = useState(null);
  const [tempWorkshop, setTempWorkshop] = useState(null);

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [invitePopup, setInvitePopup] = useState(false);
  const [admin, setAdmin] = useState([]);

  const [chattedWithList, setChattedWithList] = useState([]);
  const [members, setMembers] = useState([]);
  const [checkpoints, setCheckpoints] = useState();

  const colorMap = {
    "finished": "#47d877",
    "in progress": "#ced398",
    "invited": "#c48787",
    "joined": "#77aa7a"
  }

  // effects
  useEffect(() => {
    const fetchAll = async () => {
      let workshops = null;
      if (user.role == "customer")
        workshops = await workshopService.getWorkshopsByAdmin(user.email);
      else if (user.role == "crafter")
        workshops = await workshopService.getWorkshopsByCrafter(user.email);
      setAllWorkshops(workshops);
    };
    fetchAll();
  }, [user]);



  // functions
  const openPopup = async (choice) => {
    if (choice == "main"){
      const list = await messageService.getContacts(user.email);
      setChattedWithList(list);
      setIsPopupOpen(true);
    }
    else if (choice == "invite"){
      setInvitePopup(true);
    }
    
  };

  const handleCardClick = async (wp) => {

    if (user.role == "customer" || wp.crafters.find(c => c.email === user.email).status === "joined") {
      setSelectedWorkshop(wp);
      setCheckpoints(await workshopService.getCheckpointsByWorkshopId(wp._id));

      const crafterData = await Promise.all(
        wp.crafters.map(async (crafter) => {
          const data = await getUserByEmail(crafter.email);
          return data;
        })
      );
      setMembers(crafterData);

      const adminEmail = wp.admin;
      const admin = await getUserByEmail(adminEmail);
      setAdmin(admin);
      

      return;
    }
  
    setTempWorkshop(wp);
    openPopup("invite")

  };

  const handleInviteAnswer = async (option) => {
    if (option === "reject"){
      await workshopService.removeCrafterFromWorkshop(tempWorkshop._id, user.email);
      setAllWorkshops(allWorkshops.filter(wp => wp._id !== tempWorkshop._id));
      setTempWorkshop(null);
    }
    else if (option === "accept"){
      await workshopService.updateCrafterStatus(tempWorkshop._id, user.email, "joined");

      const updated = await workshopService.getWorkshopsByCrafter(user.email);
      setAllWorkshops(updated);
      setTempWorkshop(null);
    }
  }

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

        for (const crafterEmail of selectedCrafters){
          const notification = {
            text: `${user.name} invited you to join ${workshopName}.`,
            linkTo: "Workshop", // or `/messages?with=${user.email}`
            email: crafterEmail, // send email instead of _id
          };
          await notificationService.createNotification(notification);
          socket.emit("notification", {
            to: crafterEmail,
            notification
          });
        }
        

      } catch (err) {
        toast.error(err);
      }
  };

  
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

      {invitePopup && (
        <InvitePopup
          onClose={() => setInvitePopup(false)}
          onChoose={(option => handleInviteAnswer(option))}
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
          {user.role === "customer" && (
            <Button text="Create a workshop" size="large" color="#6a380f" onClick={() => openPopup("main")} />
          )}
        </div>
      )}

      {allWorkshops.length > 0 && !selectedWorkshop && user.role === "customer" && (
        <styledElements.CenteredWrapper>
          <styledElements.WorkshopGrid>
            {allWorkshops.map((wp) => (
              <styledElements.WorkshopCardItem key={wp._id} onClick={() => {
                handleCardClick(wp);
              }}>
                <h3>{wp.name}</h3>
                <p>{wp.checkpoints.length} checkpoints</p>
                <p>{wp.crafters.length} crafters</p>
                <styledElements.StatusLabel color={wp.checkpoints.every(cp => cp.status === "finished") ? colorMap["finished"] : colorMap["in progress"]}>
                  {wp.checkpoints.every(cp => cp.status === "finished") ? "Finished" : "In Progress"}
                </styledElements.StatusLabel>

              </styledElements.WorkshopCardItem>
            ))}
          </styledElements.WorkshopGrid>
          {user.role === "customer" && (
            <Button text="Create a workshop" size="large" color="#6a380f" onClick={() => openPopup("main")} />
          )}
          
        </styledElements.CenteredWrapper>
        
      )}

      {allWorkshops.length > 0 && !selectedWorkshop && user.role === "crafter" && (
        <styledElements.CenteredWrapper>
          <styledElements.WorkshopGrid>
            {allWorkshops.map((wp) => (
              <styledElements.WorkshopCardItem key={wp._id} onClick={() => {
                handleCardClick(wp);
              }}>
                <h3>{wp.name}</h3>
                {wp.crafters.find(c => c.email === user.email).status === "joined" && (
                  <>
                    <p>{wp.checkpoints.length} checkpoints</p>
                    <p>{wp.crafters.length} crafters</p>
                    <styledElements.StatusLabel color={wp.checkpoints.every(cp => cp.status === "finished") ? colorMap["finished"] : colorMap["in progress"]}>
                      {wp.checkpoints.every(cp => cp.status === "finished") ? "Finished" : "In Progress"}
                    </styledElements.StatusLabel>
                  </>
                )}
                
                {wp.crafters.find(c => c.email === user.email).status === "invited" && (
                  <>
                    <styledElements.StatusLabel color={colorMap["invited"]}>
                      Invited
                    </styledElements.StatusLabel>
                  </>
                )}
  

              </styledElements.WorkshopCardItem>
            ))}
          </styledElements.WorkshopGrid>
          {user.role === "customer" && (
            <Button text="Create a workshop" size="large" color="#6a380f" onClick={() => openPopup("main")} />
          )}
          
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
            <styledElements.NavItem
              active={activeTab === "members"}
              onClick={() => setActiveTab("members")}
            >
              Members
            </styledElements.NavItem>
          </styledElements.Navbar>

          <styledElements.ContentWrapper>
            {activeTab === "chat" && (
              <ChatBox mode="group" workshopInfo={selectedWorkshop} members={members} />
            )}

            {activeTab === "progress" && (
              <StepsDiagram
                checkpoints={checkpoints}
                setCheckpoints={setCheckpoints}
              />
            )}

            {activeTab === "members" && (
              <styledElements.MembersWrapper>
                <styledElements.MembersContainer>
                  <styledElements.MemberCard>
                    <styledElements.Avatar
                        src={admin.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(admin.name)}`}
                        alt={admin.name}
                      />
                      <styledElements.MemberInfo>
                        <styledElements.MemberName>{admin.name}</styledElements.MemberName>
                        <styledElements.MemberCraft>admin</styledElements.MemberCraft>
                      </styledElements.MemberInfo>
                  </styledElements.MemberCard>
                  {members.map((member, index) => (
                    <styledElements.MemberCard key={index}>
                      <styledElements.Avatar
                        src={member.avatarUrl || `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}`}
                        alt={member.name}
                      />
                      <styledElements.MemberInfo>
                        <styledElements.MemberName>{member.name}</styledElements.MemberName>
                        <styledElements.MemberCraft>{member.craft}</styledElements.MemberCraft>
                      </styledElements.MemberInfo>
                    </styledElements.MemberCard>
                  ))}
                </styledElements.MembersContainer>
              </styledElements.MembersWrapper>
            )}

          </styledElements.ContentWrapper>
        </>
      )}



    </styledElements.WorkshopCard>
  );
};

export default Workshop;
