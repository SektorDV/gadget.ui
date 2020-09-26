import styled from "styled-components";

export const MachineId = styled.h1``;
export const ServicesList = styled.li`
  list-style: none;
  width: 50%;
  margin: 0 auto;
`;
export const Service = styled.div`
  display: grid;
  grid-template: 1fr / 1fr 1fr 1fr;
  margin-bottom: 1rem;
`;
export const ServiceName = styled.p``;
export const ServiceStatus = styled.p`
  color: ${({ status }) => (status === "Running" ? "darkgreen" : "red")};
`;
export const ServiceButton = styled.button``;
