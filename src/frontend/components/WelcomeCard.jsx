import React from 'react';
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
      <WelcomeButton>{buttonText}</WelcomeButton>
    </WelcomeContainer>
  );
};

export default WelcomeCard;
