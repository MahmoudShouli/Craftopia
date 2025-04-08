import React from 'react';
import { Link } from "react-router-dom";
import {
  WelcomeContainer,
  WelcomeHeading,
  WelcomeSubtext,
  WelcomeButton
} from '../styles/WelcomeCard.styled'

const WelcomeCard = ({ mainText, subText, buttonText }) => {
  return (
    <WelcomeContainer>
      <WelcomeHeading>{mainText}</WelcomeHeading>
      <WelcomeSubtext>{subText}</WelcomeSubtext>
      <Link to='/signup'>
        <WelcomeButton>{buttonText}</WelcomeButton>
      </Link>
    </WelcomeContainer>
  );
};

export default WelcomeCard;
