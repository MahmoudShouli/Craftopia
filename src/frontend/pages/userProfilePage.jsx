import React, { useState } from "react";
import styled from "styled-components";
import { useUser } from "../context/UserContext";
import Dashboard from "../components/Dashboard";

const UserProfilePage = () => {
  const { user } = useUser();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(user?.name || "");
  const [newPassword, setNewPassword] = useState("");

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSave = () => {
    console.log("Saving:", editedName, newPassword);
    setIsEditing(false);
  };

  const formattedDate = new Date().toLocaleDateString("en-GB", {
    weekday: "short",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <PageWrapper>
      <Dashboard />

      <ProfileContainer>
        {/* Top Header */}
        <HeaderSection>
          <HeaderLeft>
            <WelcomeText>Welcome, {user?.name}</WelcomeText>
            <DateText>{formattedDate}</DateText>
          </HeaderLeft>

          <HeaderRight>
            <SearchInput placeholder="Search" />
            <Icon>🔔</Icon>
            <Icon>👤</Icon>
          </HeaderRight>
        </HeaderSection>

        {/* User Profile Card */}
        <UserCard>
          <UserHeader>
            <Avatar>{user?.name?.[0]?.toUpperCase()}</Avatar>
            <UserDetails>
              <Name>{user?.name}</Name>
              <Email>{user?.email}</Email>
            </UserDetails>
            {!isEditing ? (
              <EditButton onClick={handleEditToggle}>Edit</EditButton>
            ) : (
              <SaveButton onClick={handleSave}>Save</SaveButton>
            )}
          </UserHeader>

          <FormGrid>
            <Field>
              <Label>Full Name</Label>
              <Input
                type="text"
                value={editedName}
                onChange={(e) => setEditedName(e.target.value)}
                disabled={!isEditing}
              />
            </Field>

            <Field>
              <Label>Password</Label>
              <Input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                disabled={!isEditing}
              />
            </Field>

            {user?.role === "crafter" && (
              <Field>
                <Label>Craft</Label>
                <Input type="text" value={user?.craft} disabled />
              </Field>
            )}
          </FormGrid>
        </UserCard>
      </ProfileContainer>
    </PageWrapper>
  );
};

export default UserProfilePage;

const PageWrapper = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: #f5f6fa;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

const ProfileContainer = styled.div`
  flex: 1;
  padding: 3rem;
`;

/* Header Section */
const HeaderSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.5rem;
`;

const HeaderLeft = styled.div``;

const WelcomeText = styled.div`
  font-size: 1.8rem;
  font-weight: 600;
`;

const DateText = styled.div`
  font-size: 0.95rem;
  color: #6a380f;
`;

const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const SearchInput = styled.input`
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 0.95rem;
`;

const Icon = styled.div`
  font-size: 1.4rem;
  cursor: pointer;
`;

/* Profile Card */
const UserCard = styled.div`
  background-color: white;
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
`;

const UserHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
`;

const Avatar = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: #d2b48c;
  font-size: 2rem;
  font-weight: bold;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const UserDetails = styled.div`
  flex: 1;
  margin-left: 1rem;
`;

const Name = styled.div`
  font-size: 1.4rem;
  font-weight: 600;
`;

const Email = styled.div`
  font-size: 0.95rem;
  color: #888;
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 1.5rem;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #6a380f;
`;

const Input = styled.input`
  padding: 0.7rem 1rem;
  border: 2px solid #6a380f;
  border-radius: 8px;
  font-size: 1rem;
  background-color: ${({ disabled }) => (disabled ? "#f5f5f5" : "white")};
`;

const EditButton = styled.button`
  background-color: #444;
  color: white;
  padding: 0.7rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
`;

const SaveButton = styled.button`
  background-color: #6a380f;
  color: white;
  padding: 0.7rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
`;
