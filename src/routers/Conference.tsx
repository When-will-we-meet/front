import SelectedTime from "components/SelectedTime";
import Schedule from "components/Schedule";
import { BASE_URL } from "components/BASE_URL";
import axios from "axios";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useLocation, useParams } from "react-router-dom";
import UpdateTime from "components/UpdateTime";

const Container = styled.div`
  background: #fff;
  display: flex;
  padding-left: 50px;
  padding-top: 30px;
`;

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const ButtonWrap = styled.div`
  display: flex;
  margin-top: 120px;
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
  padding-left: 25px;
`;

const Lable = styled.p`
  color: #d9d9d9;
  font-family: Inter;
  font-size: 15px;
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
  left: 100%;
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

const InfoText = styled.p`
  color: #717171;
  text-align: center;
  font-family: Inter;
  font-size: 18px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-top: 5px;
`;

const ResponderName = styled.p<{ isSelected: boolean }>`
  color: ${(props) => (props.isSelected ? "#79DAFD" : "#000")};
  text-align: center;
  font-family: Inter;
  font-size: 20px;
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
  const { id: paramId } = useParams();
  const location = useLocation();
  const conferenceData = location.state;
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [input, setInput] = useState<boolean>(false);
  const [update, setUpdate] = useState<boolean>(false);
  const [idx, setIdx] = useState<number>(-1);
  const [responderNames, setResponderNames] = useState<string[]>([]);
  const [userSelections, setUserSelections] = useState<any[]>([]);
  const [id, setId] = useState<string | null>(null);
  const [times, setTimes] = useState<number[]>([]);
  const [dates, setDates] = useState<number[]>([]);
  const [totalRespondCount, setTotalRespondCount] = useState<number>(0);
  const [mostFrequentTime, setMostFrequentTime] = useState<any[]>([]);
  const [moreTime, setMoreTime] = useState<boolean>(false);
  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  useEffect(() => {
    if (conferenceData && conferenceData.data?.id) {
      setId(conferenceData.data.id);
    } else if (paramId) {
      setId(paramId);
    }
  }, [conferenceData, paramId]);

  useEffect(() => {
    const getFetch = async () => {
      if (!id) return;
      try {
        const response = await axios.get(`${BASE_URL}/conferences/${id}/`);
        setTimes([response.data.start_time, response.data.end_time]);
        setDates(response.data.selected_day);
        setTitle(response.data.title);
        setContent(response.data.description);
        setTotalRespondCount(response.data.responder_count);
      } catch (error) {
        console.error("Error fetching info:", error);
      }
    };
    getFetch();
  }, [id]);

  useEffect(() => {
    const getFetchRespond = async () => {
      if (!id) return;
      try {
        const response = await axios.get(
          `${BASE_URL}/conferences/${id}/responses/`
        );
        const responderNames = response.data.map((user: any) => [
          user.responder_name,
          user.id,
        ]);
        setUserSelections(response.data);
        setResponderNames(responderNames);
      } catch (error) {
        console.error("Error fetching info:", error);
      }
    };
    getFetchRespond();
  }, [id, update, responderNames]);

  useEffect(() => {
    const getFetchtatistics = async () => {
      try {
        await delay(500);
        const response = await axios.get(
          `${BASE_URL}/conferences/${id}/statistics/`
        );
        console.log(response.data.total_responses);
        setTotalRespondCount(response.data.total_responses);
        setMostFrequentTime(response.data.most_frequent_time);
      } catch (error) {}
    };
    getFetchtatistics();
  }, [id]);

  const handleCopyClipBoard = async () => {
    try {
      const currentUrl = window.location.href;
      await navigator.clipboard.writeText(currentUrl);
      alert("클립보드에 복사 완료");
    } catch (e) {
      alert("복사 불가능한 url입니다.");
    }
  };

  const handleSave = (
    responder_name: string,
    checked_time: string[],
    responder_id: number
  ) => {
    if (responder_id === -1) {
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
            userSelection
          );
        } catch (error) {
          console.error("Error fetching info:", error);
        }
      };
      PostFetch();
      setUserSelections((prev) => [...prev, userSelection]);
      setResponderNames((prev) => [...prev, responder_name]);
    } else {
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
            userSelection
          );
        } catch (error) {
          console.error("Error fetching info:", error);
        }
      };
      PutFetch();
    }
  };

  const handleClickResponder = (index: number) => {
    setUpdate(true);
    setIdx(index);
  };

  const handleShowAll = () => {
    setUpdate(false);
    setIdx(-1);
  };

  const handleAddResponder = () => {
    setInput(!input);
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
        ) : update ? (
          <UpdateTime
            dates={dates}
            times={times}
            id={id}
            responderId={responderNames[idx][1]}
            onSave={handleSave}
          />
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
          {mostFrequentTime.length < 4 || moreTime
            ? mostFrequentTime.map((time, index) => {
                const [day, first, middle, last] = time.split(" : ");
                const formattedTime = `${day}일 / ${first}:${middle}:${last} / ${totalRespondCount}명`;
                return <Time key={index}>{formattedTime}</Time>;
              })
            : mostFrequentTime.slice(0, 3).map((time, index) => {
                const [day, first, middle, last] = time.split(" : ");
                const formattedTime = `${day}일 / ${first}:${middle}:${last} / ${totalRespondCount}명`;
                return <Time key={index}>{formattedTime}</Time>;
              })}
          {mostFrequentTime.length >= 4 && !moreTime && (
            <p onClick={() => setMoreTime(true)}>더 보기</p>
          )}
        </MostOfTime>
        <Responder>
          <ResponderText>응답자</ResponderText>
          {responderNames.length > 0 ? (
            <InfoText>#수정을 원하시면 이름을 선택해주세요.</InfoText>
          ) : (
            <></>
          )}
          {responderNames.map((responderName: string, index: number) => (
            <ResponderName
              key={index}
              onClick={() => handleClickResponder(index)}
              isSelected={idx === index}
            >
              {responderName[0]}
            </ResponderName>
          ))}
        </Responder>
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
      </Wrap>
    </Container>
  );
};

export default Conference;
