import OnOff from "components/OnOff";
import React, { useState } from "react";
import Calender from "components/Calender";
import Settings from "components/Settings";
import styled from "styled-components";

const Container = styled.div`
  background: #fff;
  display: flex;
  flex-direction: column;
`;

const Wrap = styled.div`
  display: flex;
`;

const Main: React.FC = () => {
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [selectedDay, setSelectedDay] = useState<number[]>([]);
  return (
    <Container>
      <OnOff isOnline={isOnline} setIsOnline={setIsOnline} />
      <Wrap>
        <Calender selectedDay={selectedDay} setSelectedDay={setSelectedDay} />
        <Settings selectedDay={selectedDay} isOnline={isOnline} />
      </Wrap>
    </Container>
  );
};

export default Main;
