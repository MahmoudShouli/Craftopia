import React, { useEffect, useState } from "react";
import styled from "styled-components";
import workshopService from "../../api/workshopService";
import { getUserByEmail } from "../../api/userService";
import UserAvatar from "../useravatar/UserAvatar";
import { FaUsers } from "react-icons/fa";

const Wrapper = styled.div`
  padding: 2rem;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 20px;
`;

const Card = styled.div`
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
  padding: 1.5rem;
  transition: 0.3s ease;
  &:hover {
    transform: translateY(-4px);
  }
`;

const Title = styled.h3`
  font-size: 1.3rem;
  margin-bottom: 0.5rem;
  color: #333;
`;

const Info = styled.p`
  font-size: 0.95rem;
  margin: 0.3rem 0;
  color: #666;
`;

const AvatarRow = styled.div`
  display: flex;
  gap: 0.4rem;
  margin-top: 1rem;
  align-items: center;
`;

const Badge = styled.span`
  padding: 0.3rem 0.6rem;
  border-radius: 8px;
  font-size: 0.8rem;
  color: white;
  background-color: ${({ status }) =>
    status === "Finished" ? "#47d877" : "#e09f1d"};
`;

const WorkshopList = () => {
  const [workshops, setWorkshops] = useState([]);

  useEffect(() => {
    const fetchWorkshops = async () => {
      const result = await workshopService.getWorkshopsByAdmin(
        "admin@example.com"
      );
      setWorkshops(result);
    };
    fetchWorkshops();
  }, []);

  const getStatus = (checkpoints) =>
    checkpoints.every((cp) => cp.status === "finished")
      ? "Finished"
      : "In Progress";

  return (
    <Wrapper>
      <h2>All Workshops</h2>
      <Grid>
        {workshops.map((workshop) => (
          <Card key={workshop._id}>
            <Title>{workshop.name}</Title>
            <Info>{workshop.checkpoints.length} checkpoints</Info>
            <Info>{workshop.crafters.length} crafters</Info>
            <Badge status={getStatus(workshop.checkpoints)}>
              {getStatus(workshop.checkpoints)}
            </Badge>
            <AvatarRow>
              <FaUsers size={16} color="#666" />
              {workshop.crafters.slice(0, 5).map((c) => (
                <UserAvatar key={c.email} email={c.email} size="30px" />
              ))}
            </AvatarRow>
          </Card>
        ))}
      </Grid>
    </Wrapper>
  );
};

export default WorkshopList;
