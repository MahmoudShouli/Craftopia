import React from 'react';
import { PopupOverlay, MapPopupContent, CloseButton } from '../map/MapPopup.styled';  

const PopUpPage = ({ onClose, children }) => {
  return (
    <PopupOverlay>
      <CloseButton onClick={onClose}>Close</CloseButton>
      <MapPopupContent>
        {children}
      </MapPopupContent>
    </PopupOverlay>
  );
};

export default PopUpPage;