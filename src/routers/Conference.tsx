import SelectTime from "components/SelectTime";
import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  background: #fff;
  display: flex;
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const Comment = styled.div`
  width: 700px;
  display: flex;
  flex-direction: column;
  position: relative;
  text-align: left;
  margin-left: 88px;
  padding-top: 30px;
`;

const Lable = styled.p`
  color: #d9d9d9;
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin: 0 0 12px 0;
`;

const Title = styled.p`
  color: #000;
  font-family: Inter;
  font-size: 40px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin: 0 0 32px 0;
`;

const Content = styled.p`
  color: #717171;
  font-family: Inter;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin: 0 0 0 0;
`;

const Button = styled.button`
  width: 150px;
  height: 30px;
  flex-shrink: 0;
  border-radius: 5px;
  border: 2px solid #d9d9d9;
  color: #000;
  text-align: center;
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  background: #fff;
  position: absolute;
  top: 33%;
  left: 80%;
`;

const MostOfTime = styled.div`
  width: 850px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-left: 100px;
`;

const MostOfTimeText = styled.p`
  color: #717171;
  text-align: center;
  font-family: Inter;
  font-size: 30px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin: 45px 0 4px 0;
`;

const Time = styled.p`
  color: #000;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin: 15px 0 0 0;
`;

const Responder = styled.div`
  width: 850px;
  height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-left: 100px;
`;

const ResponderText = styled.p`
  color: #717171;
  text-align: center;
  font-family: Inter;
  font-size: 25px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const ResponderName = styled.p`
  color: #000;
  text-align: center;
  font-family: Inter;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin: 15px 0 0 0;
`;

const Conference: React.FC = () => {
  const max_respond_time: Record<number, string[]> = {
    24: ["09 : 00 ~ 10 : 00", "10 : 00 ~ 11 : 00"],
    26: ["19 : 00 ~ 20 : 00"],
  };

  const [responderNames, setResponderNames] = useState<string[]>([
    "이종원",
    "이종원",
    "이종원",
    "이종원",
    "이종원",
  ]);

  const handleCopyClipBoard = async () => {
    try {
      const currentUrl = window.location.href;
      await navigator.clipboard.writeText(currentUrl);
      alert("클립보드에 복사 완료");
    } catch (e) {
      alert("복사 불가능한 url입니다.");
    }
  };

  const formatTime = (time: string) => {
    const [start, end] = time.split("~").map((t) => t.trim());
    const getPeriod = (hour: number) => (hour < 12 ? "오전" : "오후");
    const formatHour = (t: string) => {
      const [hour, minute] = t.split(":").map(Number);
      return `${getPeriod(hour)} ${hour % 12 < 10 ? "0" + (hour % 12) : hour % 12}:${minute.toString().padStart(2, "0")}`;
    };
    return `${formatHour(start)} ~ ${formatHour(end)}`;
  };

  return (
    <Container>
      <Wrap>
        <Comment>
          <Lable>제목</Lable>
          <Title>LCK 회의</Title>
          <Lable>내용</Lable>
          <Content>오늘 피그마는 어쩌구 저쩌구해서 좋았다.</Content>
          <Button onClick={() => handleCopyClipBoard()}>공유하기</Button>
        </Comment>
        <SelectTime />
      </Wrap>
      <Wrap>
        <MostOfTime>
          <MostOfTimeText>가장 많은 시간대</MostOfTimeText>
          {Object.keys(max_respond_time).map((key: any) =>
            max_respond_time[parseInt(key)].map((item, index) => (
              <Time key={`${key}-${index}`}>
                {key} : {formatTime(item)}
              </Time>
            ))
          )}
        </MostOfTime>
        <Responder>
          <ResponderText>응답자</ResponderText>
          {responderNames.map((responderName: string, index: number) => (
            <ResponderName>{responderName}</ResponderName>
          ))}
        </Responder>
      </Wrap>
    </Container>
  );
};

export default Conference;
