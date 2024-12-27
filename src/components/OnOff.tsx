import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
`;

const Flex = styled.div`
  display: flex;
  margin-left: 86px;
  margin-top: 82px;
  gap: 60px;
`;

const Button = styled.button<{ isActive: boolean }>`
  width: 213px;
  height: 84px;
  flex-shrink: 0;
  border-radius: 5px;
  border: 2px solid #d9d9d9;
  background: ${(props) => (props.isActive ? "#79DAFD" : "#FFF")};
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  //Text
  color: ${(props) => (props.isActive ? "#FFF" : "#000")};
  text-align: center;
  font-family: Inter;
  font-size: 25px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;
interface OnOffProps {
  isOnline: boolean;
  setIsOnline: any;
}

const OnOff: React.FC<OnOffProps> = ({ isOnline, setIsOnline }) => {
  function handleButtonTrue() {
    setIsOnline(true);
  }
  function handleButtonFalse() {
    setIsOnline(false);
  }
  return (
    <Container>
      <Flex>
        <Button isActive={isOnline} onClick={() => handleButtonTrue()}>
          온라인
        </Button>
        <Button isActive={!isOnline} onClick={() => handleButtonFalse()}>
          오프라인
        </Button>
      </Flex>
    </Container>
  );
};

export default OnOff;
