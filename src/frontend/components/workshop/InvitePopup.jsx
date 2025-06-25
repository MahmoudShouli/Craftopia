import PopUpPage from "../map/PopUpPage";
import {
  CreateButton,
  InvitePopupContainer,
} from "./PopupCreateWorkshop.styled";

const InvitePopup = ({ onClose, onChoose }) => {
    
    const handleClick = (answer) => {
        onChoose(answer);
        onClose();
    };

    return (
    <PopUpPage onClose={onClose}>
        <InvitePopupContainer>
            <CreateButton onClick={() => handleClick("accept")}>Accept</CreateButton>
            <CreateButton onClick={() => handleClick("reject")}>Reject</CreateButton>
        </InvitePopupContainer>
      
    </PopUpPage>
    );
};

export default InvitePopup;