import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  background: #fff;
  display: flex;
  margin-top: 40px;
`;

const Wrap = styled.div`
  width: 15%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 20px;
  position: relative;
`;

const TimeTable = styled.div`
  width: 10%;
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  margin-top: 91px;
  text-align: right;
`;

const Time = styled.p`
  color: #000;
  font-family: Inter;
  font-size: 15px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin: 0 0 22px 0;
  width: 80px;
`;

const CellGrid = styled.div<{ columns: number }>`
  display: grid;
  grid-template-columns: repeat(${(props) => props.columns}, 1fr);
  grid-auto-rows: 40px;
  margin-top: 59px;
  margin-left: 10px;
  overflow-x: auto;
`;

const Cell = styled.div<{ isSelected: boolean }>`
  background-color: ${(props) => (props.isSelected ? "#79DAFD" : "#fff")};
  display: flex;
  border: 1px solid #ddd;
  justify-content: center;
  align-items: center;
  width: 147px;
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
    props.color === "#79DAFD" ? "2px solid #000" : "1px solid #D9D9D9"};
  background: ${(props) => props.color};
`;

const SelectTime: React.FC<{
  dates: number[];
  times: number[];
  userSelections: { responder_name: string; checked_time: string[] }[];
}> = ({ dates, times, userSelections }) => {
  const [hours, setHours] = useState<number[]>([]);
  const [aggregatedSelections, setAggregatedSelections] = useState<
    { date: number; hour: number; count: number }[]
  >([]);

  useEffect(() => {
    const start = times[0];
    const end = times[1];
    const hourArray = Array.from(
      { length: end - start + 1 },
      (_, index) => start + index
    );
    setHours(hourArray);

    const aggregated: { date: number; hour: number; count: number }[] = [];
    userSelections.forEach((responder_name) => {
      responder_name.checked_time.forEach((time) => {
        const [dateStr, timeRange] = time.split(" : ");
        const date = parseInt(dateStr.trim());
        const [startHour] = timeRange
          .split("~")[0]
          .trim()
          .replace("오전", "")
          .replace("오후", "")
          .split(":")
          .map((v) => parseInt(v));

        const hour =
          timeRange.includes("오후") && startHour !== 12
            ? startHour + 12
            : startHour;

        const existingEntry = aggregated.find(
          (entry) => entry.date === date && entry.hour === hour
        );

        if (existingEntry) {
          existingEntry.count += 1;
        } else {
          aggregated.push({ date, hour, count: 1 });
        }
      });
    });

    setAggregatedSelections(aggregated);
  }, [times, userSelections]);

  const formatHour = (hour: number): string => {
    const period = hour < 12 ? "오전" : "오후";
    const formattedHour = hour % 12 === 0 ? 12 : hour % 12;
    return `${period} ${formattedHour} : 00`;
  };

  const getBlockColor = (count: number): string => {
    if (count <= 2) return "rgba(121, 218, 253, 0.10)";
    if (count <= 4) return "rgba(121, 218, 253, 0.30)";
    if (count <= 6) return "rgba(121, 218, 253, 0.70)";
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
        {hours?.slice(0, hours.length - 1).map((hour) =>
          dates.map((date) => {
            const entry = aggregatedSelections.find(
              (selection) => selection.date === date && selection.hour === hour
            );

            return (
              <Cell
                key={`${date}-${hour}`}
                isSelected={!!entry}
                style={{
                  backgroundColor: entry ? getBlockColor(entry.count) : "#fff",
                  border:
                    entry?.count !== undefined && entry?.count >= 7
                      ? "2px solid #000"
                      : "1px solid #ddd",
                }}
              ></Cell>
            );
          })
        )}
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
      </Wrap>
    </Container>
  );
};

export default SelectTime;
