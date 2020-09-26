import React, { useState, useEffect } from "react";
import { API } from "utils/API";
import { Link } from "react-router-dom";
import { ListContainer, Machine } from "./styles";

const MachineList = () => {
  const [machines, setMachines] = useState();

  useEffect(() => {
    API.fetchMachineList().then((response) => {
      setMachines(response.data);
    });
  }, []);

  return (
    <>
      <h1>Machines:</h1>
      <ListContainer>
        {machines && machines.length > 0 ? (
          machines.map((machine) => {
            return (
              <Machine>
                <Link to={`/machine/${machine.agent}`}>{machine.agent}</Link>
              </Machine>
            );
          })
        ) : (
          <p>No machines detected :(</p>
        )}
      </ListContainer>
    </>
  );
};

export default MachineList;
