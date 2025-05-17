import React from 'react';
import { PopupOverlay, CloseButton, OtherPopupContent } from '../map/MapPopup.styled';  

const PopUpPage = ({ onClose, children}) => {
  return (
    <PopupOverlay>
      <CloseButton onClick={onClose}>Close</CloseButton>
      <OtherPopupContent>
        {children}
      </OtherPopupContent>
    </PopupOverlay>
  );
};

export default PopUpPage;