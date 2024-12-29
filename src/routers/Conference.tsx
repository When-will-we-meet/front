import SelectedTime from "components/SelectedTime";
import Schedule from "components/Schedule";
import { BASE_URL } from "components/BASE_URL";
import axios from "axios";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

const Container = styled.div`
  background: #fff;
  display: flex;
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonWrap = styled.div`
  display: flex;
  margin-top: 253px;
  margin-left: 177px;
  gap: 85px;
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
  width: 600px;
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
  width: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-left: 100px;
  margin-top: 90px;
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
  font-weight: 700;
  line-height: normal;
  margin: 15px 0 0 0;
`;

const BottomButton = styled.button`
  width: 178px;
  height: 58px;
  flex-shrink: 0;
  border-radius: 5px;
  border: 2px solid #d9d9d9;
  background: #fff;
  color: #000;
  text-align: center;
  font-family: Inter;
  font-size: 25px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  cursor: pointer;
`;

const Conference: React.FC = () => {
  const location = useLocation();
  const conferenceData = location.state;
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [input, setInput] = useState<boolean>(false);
  const [responderNames, setResponderNames] = useState<string[]>([]);
  const [userSelections, setUserSelections] = useState<any[]>([]);
  const [times, setTimes] = useState<number[]>([]);
  const [dates, setDates] = useState<number[]>([]);
  const max_respond_time: Record<number, string[]> = {
    24: ["09 : 00 ~ 10 : 00", "10 : 00 ~ 11 : 00"],
    26: ["19 : 00 ~ 20 : 00"],
  };
  useEffect(() => {
    const getFetch = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/conferences/${conferenceData.data.id}/`
        );
        console.log(response.data);
        setTimes([response.data.start_time, response.data.end_time]);
        setDates(response.data.selected_day);
        setTitle(response.data.title);
        setContent(response.data.description);
      } catch (error) {
        console.error("Error fetching menu info:", error);
      }
    };
    getFetch();
    const initialSelections = [
      {
        name: "이종원",
        selectedTimes: [
          "1 : 오전 9:00 ~ 오전 10:00",
          "2 : 오후 2:00 ~ 오후 3:00",
        ],
      },
      {
        name: "이종오",
        selectedTimes: [
          "1 : 오전 9:00 ~ 오전 10:00",
          "2 : 오후 7:00 ~ 오후 8:00",
        ],
      },
      {
        name: "이종순",
        selectedTimes: [
          "1 : 오전 9:00 ~ 오전 10:00",
          "2 : 오후 7:00 ~ 오후 8:00",
        ],
      },
    ];
    setUserSelections(initialSelections);
    setResponderNames(initialSelections.map((user) => user.name));
  }, [conferenceData.data.id]);

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

  const handleInput = () => {
    setInput(!input);
  };

  const handleSave = (name: string, selectedTimes: string[]) => {
    const userSelection = {
      name,
      selectedTimes,
    };
    setUserSelections((prev) => [...prev, userSelection]);

    setResponderNames((prev) => [...prev, name]);
  };

  return (
    <Container>
      <Wrap>
        <Comment>
          <Lable>제목</Lable>
          <Title>{title}</Title>
          <Lable>내용</Lable>
          <Content>{content}</Content>
          <Button onClick={() => handleCopyClipBoard()}>공유하기</Button>
        </Comment>
        {input ? (
          <Schedule dates={dates} times={times} onSave={handleSave} />
        ) : (
          <SelectedTime
            dates={dates}
            times={times}
            userSelections={userSelections}
          />
        )}
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
        <ButtonWrap>
          <BottomButton>수정하기</BottomButton>
          {input ? (
            <BottomButton onClick={() => handleInput()}>완료</BottomButton>
          ) : (
            <BottomButton onClick={() => handleInput()}>추가하기</BottomButton>
          )}
        </ButtonWrap>
      </Wrap>
    </Container>
  );
};

export default Conference;
