import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { BASE_URL } from "./BASE_URL";

const Container = styled.div`
  background: #fff;
  display: flex;
  margin-top: 40px;
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
  margin-left: 20px;
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
const Cell = styled.div<{ isSelected: boolean }>`
  background-color: ${(props) => (props.isSelected ? "#79DAFD" : "#fff")};
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
  border: ${(props) =>
    props.color === "#79DAFD" ? "2px solid #000" : "1px solid #000"};
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
  cursor: pointer;
`;
const UpdateTime: React.FC<{
  dates: number[];
  times: number[];
  id: string | null;
  responderId: string;
  onSave: (name: string, selectedTimes: string[], responder_id: number) => void;
}> = ({ dates, times, id, responderId, onSave }) => {
  const [name, setName] = useState<string>("");
  const [hours, setHours] = useState<number[]>([]);
  const [currentlySelecting, setCurrentlySelecting] = useState<string[]>([]);

  useEffect(() => {
    const start = times[0];
    const end = times[1];
    const hourArray = Array.from(
      { length: end - start + 1 },
      (_, index) => start + index
    );
    setHours(hourArray);

    const getFetchtatistics = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/conferences/${id}/responses/${responderId}/`
        );
        console.log(response.data);
        setName(response.data.responder_name);
        setCurrentlySelecting(response.data.checked_time);
      } catch (error) {}
    };
    getFetchtatistics();
  }, [times, responderId, id]);

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
      setCurrentlySelecting((prev) =>
        prev.filter((time) => time !== selectedTime)
      );
    } else {
      setCurrentlySelecting((prev) => [...prev, selectedTime]);
    }
  };

  const isTimeSelected = (date: number, hour: number) => {
    const timeRange = getTimeRange(hour);
    return currentlySelecting.includes(`${date} : ${timeRange}`);
  };

  const handleSave = () => {
    if (currentlySelecting.length > 0) {
      onSave(name, currentlySelecting, Number(responderId));
    } else {
      alert("시간대를 선택해주세요.");
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
          <Cell key={date} isSelected={false}>
            {date}
          </Cell>
        ))}
        {hours?.map((hour) => (
          <>
            {dates.map((date) => (
              <Cell
                key={`${date}-${hour}`}
                isSelected={isTimeSelected(date, hour)}
                onClick={() => handleCellClick(date, hour)}
              />
            ))}
          </>
        ))}
      </CellGrid>
      <Wrap>
        <HeadCount>1 ~ 2명</HeadCount>
        <BlockColor color={getBlockColor(2)} />
        <HeadCount>3 ~ 4명</HeadCount>
        <BlockColor color={getBlockColor(4)} />
        <HeadCount>5 ~ 6명</HeadCount>
        <BlockColor color={getBlockColor(6)} />
        <HeadCount>7 ~ 최대 인원수</HeadCount>
        <BlockColor color={getBlockColor(7)} />
        <Button onClick={handleSave}>변경 사항 저장</Button>
      </Wrap>
    </Container>
  );
};

export default UpdateTime;
