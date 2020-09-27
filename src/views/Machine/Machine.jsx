import React, { useState, useEffect } from "react";
import { API } from "utils/API";
import {
  MachineId,
  ServicesList,
  Service,
  ServiceName,
  ServiceStatus,
  ServiceButton,
} from "./styles";
import { useParams } from "react-router-dom";
import { SIGNALR_URL } from "config";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";

const Machine = () => {
  const [services, setServices] = useState();
  const [isButtonActive, setButtonActive] = useState(false);
  const [hubConnection, setHubConnection] = useState(null);
  const { machineId } = useParams();

  useEffect(() => {
    API.fetchServicesList({ machineId }).then((response) =>
      setServices(response.data)
    );
  }, [machineId]);

  useEffect(() => {
    const connection = new HubConnectionBuilder()
      .withUrl(SIGNALR_URL)
      .configureLogging(LogLevel.Critical)
      .withAutomaticReconnect()
      .build();

    setHubConnection(connection);
  }, []);

  useEffect(() => {
    if (hubConnection !== null && services) {
      hubConnection.on("ServiceStatusChanged", (response) => {
        updateService(response.name, response.status);
      });
      const start = async () => {
        if (hubConnection.state === "Disconnected")
          try {
            await hubConnection.start();
          } catch (err) {
            console.log(err);
            setTimeout(() => start(), 5000);
          }
      };

      start().then(() => {
        hubConnection.invoke("RegisterDashboard", {}).then(() => {
          setButtonActive(true);
        });
      });
    }
  }, [hubConnection, services]);

  const updateService = (name, status) => {
    const buffer = services;
    const serviceIndex = buffer.findIndex((service) => service.name === name);
    buffer[serviceIndex] = { name, status };
    setServices([...buffer]);
  };

  const startService = (ServiceName) => {
    if (hubConnection !== null && hubConnection.state === "Connected") {
      hubConnection.invoke("StartService", {
        AgentId: machineId,
        ServiceName,
      });
    }
  };

  const stopService = (ServiceName) => {
    if (hubConnection !== null && hubConnection.state === "Connected") {
      hubConnection.invoke("StopService", {
        AgentId: machineId,
        ServiceName,
      });
    }
  };

  return (
    <>
      <MachineId>{machineId}</MachineId>
      <ServicesList>
        {services &&
          services.map((service, index) => {
            return (
              <Service key={service.name + index}>
                <ServiceName>{service.name}</ServiceName>
                <ServiceStatus status={service.status}>
                  {service.status}
                </ServiceStatus>
                {service.status === "Running" ? (
                  <ServiceButton
                    disabled={!isButtonActive}
                    onClick={() => stopService(service.name)}
                  >
                    Stop
                  </ServiceButton>
                ) : (
                  <ServiceButton
                    disabled={!isButtonActive}
                    onClick={() => startService(service.name)}
                  >
                    Start
                  </ServiceButton>
                )}
              </Service>
            );
          })}
      </ServicesList>
    </>
  );
};

export default Machine;
