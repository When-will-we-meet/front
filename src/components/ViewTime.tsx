import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { BASE_URL } from './BASE_URL';

const MostOfTime = styled.div`
  width: 55%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

const MinMax = styled.p`
  color: #717171;
  cursor: pointer;
`;

const Time = styled.p<{ $isSelected: boolean }>`
  color: ${(props) => (props.$isSelected ? '#79DAFD' : '#000')};
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin: 15px 0 0 0;
`;

const ViewTime: React.FC<{
  id: string | null;
  idxT: number;
  handleShowResponder: (index: number) => void;
  setMostTimeResponder: React.Dispatch<React.SetStateAction<unknown[]>>;
  update: boolean;
  input: boolean;
}> = ({
  id,
  idxT,
  handleShowResponder,
  setMostTimeResponder,
  update,
  input,
}) => {
  const [mostRespondTimeCount, setMostRespondTimeCount] = useState<number>(0);
  const [mostFrequentTime, setMostFrequentTime] = useState<string[]>([]);
  const [moreTime, setMoreTime] = useState<boolean>(false);

  useEffect(() => {
    console.log(123);
    const getFetchstatistics = async () => {
      if (!id) return;
      try {
        const response = await axios.get(
          `${BASE_URL}/conferences/${id}/statistics/`,
        );
        setMostTimeResponder(response.data.most_frequent_respondents);
        setMostRespondTimeCount(response.data.total_responses);
        setMostFrequentTime(response.data.most_frequent_time);
      } catch (error) {
        console.log(error);
      }
    };
    getFetchstatistics();
  }, [id, update, input]);
  return (
    <MostOfTime>
      <MostOfTimeText>가장 많은 시간대</MostOfTimeText>
      {mostFrequentTime.length < 4 || moreTime
        ? mostFrequentTime.map((time, index) => {
            const [day, first, middle, last] = time.split(' : ');
            const formattedTime = `${day}일 / ${first}:${middle}:${last} / ${mostRespondTimeCount}명`;
            return (
              <Time
                key={index}
                $isSelected={idxT === index}
                onClick={() => handleShowResponder(index)}
              >
                {formattedTime}
              </Time>
            );
          })
        : mostFrequentTime.slice(0, 3).map((time, index) => {
            const [day, first, middle, last] = time.split(' : ');
            const formattedTime = `${day}일 / ${first}:${middle}:${last} / ${mostRespondTimeCount}명`;
            return (
              <Time
                key={index}
                $isSelected={idxT === index}
                onClick={() => handleShowResponder(index)}
              >
                {formattedTime}
              </Time>
            );
          })}
      {mostFrequentTime.length >= 4 ? (
        !moreTime ? (
          <MinMax onClick={() => setMoreTime(true)}>더 보기</MinMax>
        ) : (
          <MinMax onClick={() => setMoreTime(false)}>간략히 보기</MinMax>
        )
      ) : (
        <></>
      )}
    </MostOfTime>
  );
};

export default ViewTime;
