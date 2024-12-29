import React, { useState, useEffect } from "react";
import styled from "styled-components";

const Container = styled.div`
  background: #fff;
  display: flex;
`;

const Wrap = styled.div`
  width: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
  position: relative;
`;

const TimeTable = styled.div`
  width: 80px;
  display: flex;
  flex-direction: column;
  margin-left: 28px;
  margin-top: 90px;
  text-align: right;
`;

const Time = styled.p`
  color: #000;
  font-family: Inter;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin: 0 0 25px 0;
`;

const CellGrid = styled.div<{ columns: number }>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.columns}, 1fr);
  grid-auto-rows: 40px;
  margin-top: 59px;
  margin-left: 10px;
`;

const Cell = styled.div<{ isSelected: boolean; isBeingSelected: boolean }>`
  background-color: ${(props) => (props.isBeingSelected ? "#79DAFD" : "#fff")};
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #ddd;
  cursor: pointer;
  width: 147px;
  &:hover {
    background-color: #e0f7ff;
  }
`;

const HeadCount = styled.p`
  color: #000;
  text-align: center;
  font-family: Inter;
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const BlockColor = styled.div<{ color: string }>`
  width: 92px;
  height: 12px;
  border: 1px solid #ddd;
  background: ${(props) => props.color};
`;

const Button = styled.button`
  width: 150px;
  height: 30px;
  border-radius: 5px;
  border: 2px solid #d9d9d9;
  color: #000;
  background: #fff;
  position: absolute;
  bottom: 9.5%;
  left: 100%;
  cursor: pointer;
`;

const InputWrap = styled.div`
  display: flex;
`;

const Input = styled.input`
  position: absolute;
  width: 100px;
  border-radius: 5px;
  border: 1px solid #d9d9d9;
  padding-left: 10px;
  bottom: 10%;
  left: 0%;
`;

const Schedule: React.FC<{
  dates: number[];
  times: number[];
  onSave: (name: string, selectedTimes: string[]) => void;
}> = ({ dates, times, onSave }) => {
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  const [name, setName] = useState<string>("");
  const [hours, setHours] = useState<number[]>();
  const [currentlySelecting, setCurrentlySelecting] = useState<string[]>([]);

  useEffect(() => {
    const start = times[0];
    const end = times[1];
    const hourArray = Array.from(
      { length: end - start + 1 },
      (_, index) => start + index
    );
    setHours(hourArray);
  }, [times]);

  const formatHour = (hour: number): string => {
    const period = hour < 12 ? "오전" : "오후";
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${period} ${formattedHour} : 00`;
  };

  const getTimeRange = (hour: number): string => {
    const startHour = hour;
    const endHour = hour + 1;
    return `${formatHour(startHour)} ~ ${formatHour(endHour)}`;
  };

  const handleCellClick = (date: number, hour: number) => {
    const timeRange = getTimeRange(hour);
    const selectedTime = `${date} : ${timeRange}`;

    if (currentlySelecting.includes(selectedTime)) {
      setCurrentlySelecting(
        currentlySelecting.filter((time) => time !== selectedTime)
      );
    } else {
      setCurrentlySelecting([...currentlySelecting, selectedTime]);
    }
  };

  const isTimeSelected = (date: number, hour: number) => {
    const timeRange = getTimeRange(hour);
    return selectedTimes.includes(`${date} : ${timeRange}`);
  };

  const isTimeBeingSelected = (date: number, hour: number) => {
    const timeRange = getTimeRange(hour);
    return currentlySelecting.includes(`${date} : ${timeRange}`);
  };

  const handleSave = () => {
    if (name && currentlySelecting.length > 0) {
      setSelectedTimes([...selectedTimes, ...currentlySelecting]);
      setCurrentlySelecting([]);
      onSave(name, currentlySelecting);
    } else {
      alert("이름을 입력하고 시간대를 선택해주세요.");
    }
  };

  const getBlockColor = (headCount: number) => {
    if (headCount <= 2) return "rgba(121, 218, 253, 0.10)";
    if (headCount <= 4) return "rgba(121, 218, 253, 0.30)";
    if (headCount <= 6) return "rgba(121, 218, 253, 0.70)";
    return "#79DAFD";
  };

  return (
    <Container>
      <TimeTable>
        {hours?.map((hour) => <Time key={hour}>{formatHour(hour)}</Time>)}
      </TimeTable>
      <CellGrid columns={dates.length}>
        {dates.map((date) => (
          <Cell key={date} isSelected={false} isBeingSelected={false}>
            {date}
          </Cell>
        ))}
        {hours?.map((hour) => (
          <>
            {dates.map((date) => (
              <Cell
                key={`${date}-${hour}`}
                isSelected={isTimeSelected(date, hour)}
                isBeingSelected={isTimeBeingSelected(date, hour)}
                onClick={() => handleCellClick(date, hour)}
              />
            ))}
          </>
        ))}
      </CellGrid>
      <Wrap>
        <HeadCount>1 ~ 2명</HeadCount>
        <BlockColor color={getBlockColor(2)}></BlockColor>
        <HeadCount>3 ~ 4명</HeadCount>
        <BlockColor color={getBlockColor(4)}></BlockColor>
        <HeadCount>5 ~ 6명</HeadCount>
        <BlockColor color={getBlockColor(6)}></BlockColor>
        <HeadCount>7 ~ 최대 인원수</HeadCount>
        <BlockColor color={getBlockColor(7)}></BlockColor>
        <InputWrap>
          <div>
            <Input
              type="text"
              placeholder="이름을 입력하세요"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <Button onClick={handleSave}>시간대 추가</Button>
        </InputWrap>
      </Wrap>
    </Container>
  );
};

export default Schedule;
