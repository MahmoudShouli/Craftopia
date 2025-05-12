import React from "react";
import styled from "styled-components";

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalWrapper = styled.div`
  background: #fff;
  padding: 2rem;
  border-radius: 12px;
  max-width: 400px;
  width: 100%;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
`;

const Modal = ({ children, onClose }) => {
  return (
    <Backdrop onClick={onClose}>
      <ModalWrapper onClick={(e) => e.stopPropagation()}>
        {children}
      </ModalWrapper>
    </Backdrop>
  );
};

export default Modal;