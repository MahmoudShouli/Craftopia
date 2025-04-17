// components/UserProfileHeader.jsx

import React from "react";
import { CiSearch } from "react-icons/ci";
import UserAvatar from "./UserAvatar";

import {
  HeaderSection,
  HeaderLeft,
  WelcomeText,
  DateText,
  HeaderRight,
  SearchBarWrapper,
  SearchInput,
  IconWrapper,
  Icon,
} from "../styles/UserProfilePage.styled";

const UserProfileHeader = ({ user, formattedDate }) => {
  return (
    <HeaderSection>
      <HeaderLeft>
        <WelcomeText>Welcome, {user.name}</WelcomeText>
        <DateText>{formattedDate}</DateText>
      </HeaderLeft>

      <HeaderRight>
        <SearchBarWrapper>
          <CiSearch className="icon" />
          <SearchInput type="text" placeholder="Search" />
        </SearchBarWrapper>
        <IconWrapper>
          <Icon>🔔</Icon>
        </IconWrapper>
        <IconWrapper style={{ padding: 0 }}>
          <UserAvatar
            previewUrl={user.avatarUrl}
            uploading={false}
            user={user}
            width={40}
            height={40}
          />
        </IconWrapper>
      </HeaderRight>
    </HeaderSection>
  );
};

export default UserProfileHeader;
