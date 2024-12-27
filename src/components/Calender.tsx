import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 575px;
  width: 899px;
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  margin-top: 83px;
  margin-left: 88px;
`;

const Wrap = styled.div`
  width: 898px;
  height: 86px;
  display: flex;
  justify-content: space-evenly;
  gap: 30px;
  border-bottom: 1px solid #000;
`;

const Text = styled.p`
  color: #000;
  text-align: center;
  font-family: Inter;
  font-size: 25px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const DaysContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  padding: 20px;
  row-gap: 30px;
`;

const DayBox = styled.div`
  width: 120px;
  height: 60px;
  color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: Inter;
  font-size: 25px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
`;

const Calender: React.FC = () => {
  const [currentDate] = useState<Date>(new Date());
  const [selectedDay, setSelectedDay] = useState<number[]>([]);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const today = currentDate.getDate();

  const firstDay = new Date(year, month, today).getDay(); // 오늘의 요일
  const lastDate = new Date(year, month + 1, 0).getDate(); // 이번 달 마지막 날짜
  const nextMonthStart = today > lastDate ? 1 : today; // 다음 달로 넘어갈 경우 조정

  const daysInCurrentMonth = Array.from(
    { length: lastDate - nextMonthStart + 1 },
    (_, i) => nextMonthStart + i
  );

  const totalCells = 35; //7열 * 5행
  const daysAfter = Array.from(
    { length: totalCells - daysInCurrentMonth.length - firstDay },
    (_, i) => i + 1
  );

  const days = Array.from({ length: firstDay }, () => 0)
    .concat(daysInCurrentMonth)
    .concat(daysAfter);

  const dayNames = ["일", "월", "화", "수", "목", "금", "토"];

  function handleDayClick(day: number) {
    if (day === 0) return;
    setSelectedDay((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );

    console.log(selectedDay);
  }

  return (
    <Container>
      <Wrap>
        {dayNames.map((dayName, index) => (
          <Text key={index}>{dayName}</Text>
        ))}
      </Wrap>
      <DaysContainer>
        {days.map((day, index) => (
          <DayBox
            key={index}
            style={{
              color: selectedDay.includes(day) ? "#79DAFD" : "#000",
            }}
            onClick={() => handleDayClick(day)}
          >
            {day > 0 ? day : ""}
          </DayBox>
        ))}
      </DaysContainer>
    </Container>
  );
};

export default Calender;
