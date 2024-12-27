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

const Main: React.FC = () => {
  const [isOnline, setIsOnline] = useState<boolean>(true);
  return (
    <Container>
      <OnOff isOnline={isOnline} setIsOnline={setIsOnline} />
      <div>
        <Calender />
        <Settings />
      </div>
    </Container>
  );
};

export default Main;
