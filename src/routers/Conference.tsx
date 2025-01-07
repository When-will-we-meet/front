/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useLocation, useParams } from 'react-router-dom';
import UpdateTime from 'components/UpdateTime';
import SelectedTime from 'components/SelectedTime';
import Schedule from 'components/Schedule';
import { BASE_URL } from 'components/BASE_URL';
import Content from 'components/Content';
import ViewTime from 'components/ViewTime';
import Responders from 'components/Responders';

const Container = styled.div`
  background: #fff;
  display: flex;
  padding-left: 50px;
  padding-top: 30px;
`;

const WrapLeft = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
`;

const WrapRight = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 40%;
`;

const ButtonWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 120px;
  gap: 10%;
`;

const BottomButton = styled.button`
  width: 70%;
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

  &:hover {
    background-color: #79dafd;
    color: #fff;
  }
`;

const Conference: React.FC = () => {
  const { id: paramId } = useParams();
  const location = useLocation();
  const conferenceData = location.state;
  const [isOnline, setIsOnline] = useState<boolean>(false);
  const [title, setTitle] = useState<string>('');
  const [content, setContent] = useState<string>('');
  const [input, setInput] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(false);
  const [idxR, setIdxR] = useState<number>(-1);
  const [idxT, setIdxT] = useState<number>(-1);
  const [responderNames, setResponderNames] = useState<string[]>([]);
  const [userSelections, setUserSelections] = useState<any[]>([]);
  const [id, setId] = useState<string | null>(null);
  const [times, setTimes] = useState<number[]>([]);
  const [dates, setDates] = useState<number[]>([]);
  const [totalRespondCount, setTotalRespondCount] = useState<number>(0);
  const [mostTimeResponder, setMostTimeResponder] = useState<any[]>([]);

  useEffect(() => {
    if (conferenceData && conferenceData.data?.id) {
      setId(conferenceData.data.id);
    } else if (paramId) {
      setId(paramId);
    }
  }, []);

  useEffect(() => {
    const getFetch = async () => {
      if (!id) return;
      try {
        const response = await axios.get(`${BASE_URL}/conferences/${id}/`);
        setIsOnline(response.data.is_online);
        setTimes([response.data.start_time, response.data.end_time]);
        setDates(response.data.selected_day);
        setTitle(response.data.title);
        setContent(response.data.description);
        setTotalRespondCount(response.data.responder_count);
      } catch (error) {
        console.error('Error fetching info:', error);
      }
    };
    getFetch();
  }, [id]);

  const handleAppend = (responder_name: string, checked_time: string[]) => {
    const userSelection = {
      conference: Number(id),
      users: null,
      responder_name: responder_name,
      checked_time: checked_time,
    };
    const PostFetch = async () => {
      try {
        const response = await axios.post(
          `${BASE_URL}/conferences/${id}/responses/`,
          userSelection,
        );
        alert(responder_name + ' 추가 완료');
      } catch (error) {
        console.error('Error fetching info:', error);
      }
    };
    PostFetch();
    setUserSelections((prev) => [...prev, userSelection]);
    setResponderNames((prev) => [...prev, responder_name]);
  };

  const handleSave = (
    responder_name: string,
    checked_time: string[],
    responder_id: number,
  ) => {
    const userSelection = {
      conference: Number(id),
      users: null,
      responder_name: responder_name,
      checked_time: checked_time,
    };
    const PutFetch = async () => {
      try {
        const response = await axios.put(
          `${BASE_URL}/conferences/${id}/responses/${responder_id}/`,
          userSelection,
        );
        setUpdate(!update);
        alert(response.data.responder_name + ' 수정 완료');
      } catch (error) {
        console.error('Error fetching info:', error);
      }
    };
    PutFetch();
  };

  const handleShowResponder = (index: number) => {
    setIdxT(index);
  };

  const handleClickResponder = (index: number) => {
    setUpdate(true);
    setIdxR(index);
    setIdxT(-1);
  };

  const handleShowAll = () => {
    setUpdate(false);
    setInput(false);
    setIdxR(-1);
    setIdxT(-1);
  };

  const handleAddResponder = () => {
    if (responderNames.length < totalRespondCount) {
      setInput(!input);
      setIdxR(-1);
      setIdxT(-1);
      setUpdate(false);
    } else {
      alert('응답자를 더 추가할 수 없습니다.');
    }
  };

  return (
    <Container>
      <WrapLeft>
        <Content title={title} content={content} isOnline={isOnline} />
        {input ? (
          <Schedule dates={dates} times={times} onAppend={handleAppend} />
        ) : update ? (
          <UpdateTime
            dates={dates}
            times={times}
            id={id}
            responderId={responderNames[idxR][1]}
            onSave={handleSave}
          />
        ) : (
          <SelectedTime
            dates={dates}
            times={times}
            userSelections={userSelections}
          />
        )}
      </WrapLeft>
      <WrapRight>
        <ViewTime
          id={id}
          idxT={idxT}
          handleShowResponder={handleShowResponder}
          setMostTimeResponder={setMostTimeResponder}
          update={update}
          input={input}
        />
        <Responders
          id={id}
          userSelections={userSelections}
          setUserSelections={setUserSelections}
          setResponderNames={setResponderNames}
          responderNames={responderNames}
          idxT={idxT}
          idxR={idxR}
          handleClickResponder={handleClickResponder}
          mostTimeResponder={mostTimeResponder}
        />
        <ButtonWrap>
          <BottomButton onClick={() => handleShowAll()}>전체보기</BottomButton>
          {input ? (
            <BottomButton onClick={() => setInput(!input)}>완료</BottomButton>
          ) : (
            <BottomButton onClick={() => handleAddResponder()}>
              추가하기
            </BottomButton>
          )}
        </ButtonWrap>
      </WrapRight>
    </Container>
  );
};

export default Conference;
