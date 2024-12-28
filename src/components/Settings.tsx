import React, { useState } from "react";
import styled from "styled-components";
import RightArrow from "../assets/icon_right_arrow.svg";

const Container = styled.div`
  background: #fff;
  display: flex;
  flex-direction: column;
  width: 525px;
  height: 700px;
  align-items: center;
  gap: 35px;
  margin-top: 40px;
`;

const Wrap = styled.div`
  display: flex;
  width: 300px;
  height: 30px;
`;

const MainTitle = styled.p`
  display: flex;
  width: 153px;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  color: #000;
  text-align: center;
  font-family: Inter;
  font-size: 30px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-bottom: -5px;
`;

const SmallTitle = styled.p`
  display: flex;
  width: 104px;
  height: 26px;
  flex-direction: column;
  justify-content: center;
  flex-shrink: 0;
  color: #000;
  text-align: center;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const Select = styled.select`
  width: 140px;
  height: 30px;
  padding-left: 10px;
  flex-shrink: 0;
  border-radius: 5px;
  border: 1px solid #d9d9d9;
  background: #fff;
  margin-left: 46px;
  margin-top: 18px;
`;

const TitleInput = styled.input`
  text-align: left;
  padding-left: 10px;
  width: 210px;
  height: 50px;
  flex-shrink: 0;
  border-radius: 5px;
  border: 1px solid #d9d9d9;
  background: #fff;
  margin-left: 46px;
  margin-top: 15px;
  &::placeholder {
    color: #d9d9d9;
    font-family: Inter;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

const ContentInput = styled.textarea`
  text-align: left;
  padding-top: 10px;
  padding-left: 10px;
  width: 250px;
  height: 120px;
  flex-shrink: 0;
  border-radius: 5px;
  border: 1px solid #d9d9d9;
  background: #fff;
  margin-left: 46px;
  margin-top: 20px;
  resize: none;
  &::placeholder {
    color: #d9d9d9;
    font-family: Inter;
    font-size: 12px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
  }
`;

const Button = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
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
  padding-left: 20px;
  margin-top: 120px;
  margin-left: 60px;
  cursor: pointer;
`;

const Img = styled.img`
  width: 20px;
  height: 40px;
  margin-left: 10px;
`;

interface SettingsProps {
  selectedDay: number[];
  isOnline: boolean;
}

const Settings: React.FC<SettingsProps> = ({ selectedDay, isOnline }) => {
  const [startTime, setStartTime] = useState<number>(6);
  const [exitTime, setExitTime] = useState<number>(6);
  const [responder, setResponder] = useState<number>(2);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const times = [
    "오전 06:00",
    "오전 07:00",
    "오전 08:00",
    "오전 09:00",
    "오전 10:00",
    "오전 11:00",
    "오후 12:00",
    "오후 01:00",
    "오후 02:00",
    "오후 03:00",
    "오후 04:00",
    "오후 05:00",
    "오후 06:00",
    "오후 07:00",
    "오후 08:00",
    "오후 09:00",
    "오후 10:00",
    "오후 11:00",
    "오후 12:00",
  ];

  const responders = [
    "2명",
    "3명",
    "4명",
    "5명",
    "6명",
    "7명",
    "8명",
    "9명",
    "10명",
  ];

  function handleChangeStart(time: number) {
    setStartTime(time);
  }

  function handleChangeExit(time: number) {
    setExitTime(time);
  }

  function handleChangeResponder(index: number) {
    setResponder(index);
  }

  function handleChangeTitle(e: any) {
    setTitle(e.target.value);
  }

  function handleChangeContent(e: any) {
    setContent(e.target.value);
  }

  function handleValidInspection() {
    if (title && responder > 0 && exitTime - startTime > 0) {
      alert(
        "회의가 생성되었습니다 : " +
          title +
          " " +
          responder +
          " " +
          startTime +
          " " +
          exitTime +
          " " +
          content +
          " " +
          selectedDay +
          " " +
          isOnline
      );
    } else {
      alert("잘못되었습니다");
    }
  }
  return (
    <Container>
      <MainTitle>설정</MainTitle>
      <Wrap>
        <SmallTitle>시작 시간 *</SmallTitle>
        <Select
          name="시작 시간"
          onChange={(e) => handleChangeStart(parseInt(e.target.value))}
        >
          {times.map((time, index) => (
            <option value={index + 6} key={index}>
              {time}
            </option>
          ))}
        </Select>
      </Wrap>
      <Wrap>
        <SmallTitle>종료 시간 *</SmallTitle>
        <Select
          name="시작 시간"
          onChange={(e) => handleChangeExit(parseInt(e.target.value))}
        >
          {times.map((time, index) => (
            <option value={index + 6} key={index}>
              {time}
            </option>
          ))}
        </Select>
      </Wrap>
      <Wrap>
        <SmallTitle>응답자 수 *</SmallTitle>
        <Select
          name="응답자 수"
          onChange={(e) => handleChangeResponder(parseInt(e.target.value))}
        >
          {responders.map((responder, index) => (
            <option value={index + 2} key={index}>
              {responder}
            </option>
          ))}
        </Select>
      </Wrap>
      <Wrap>
        <SmallTitle>제목 *</SmallTitle>
        <TitleInput
          type="text"
          placeholder="문구를 입력해주세요."
          onChange={(e) => handleChangeTitle(e)}
        />
      </Wrap>
      <Wrap>
        <SmallTitle>내용</SmallTitle>
        <ContentInput
          placeholder="내용을 입력해주세요."
          onChange={(e) => handleChangeContent(e)}
        />
      </Wrap>
      <Wrap>
        <Button onClick={() => handleValidInspection()}>
          회의 생성 <Img src={RightArrow} />
        </Button>
      </Wrap>
    </Container>
  );
};

export default Settings;
