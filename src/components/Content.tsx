import React from 'react';
import styled from 'styled-components';

const Comment = styled.div`
  width: 70%;
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

const Contents = styled.p`
  color: #717171;
  font-family: Inter;
  font-size: 24px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin: 0 0 0 0;
`;

const Button = styled.button`
  width: 25%;
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
  right: 0%;

  cursor: pointer;

  &:hover {
    background-color: #79dafd;
    color: #fff;
  }
`;

const OnOff = styled.div`
  width: 100px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  color: #000;
  top: 125%;
  left: 0.5%;
`;

const Content: React.FC<{
  title: string;
  content: string;
  isOnline: boolean;
}> = ({ title, content, isOnline }) => {
  const handleCopyClipBoard = async () => {
    try {
      const currentUrl = window.location.href;
      await navigator.clipboard.writeText(currentUrl);
      alert('클립보드에 복사 완료');
    } catch (e) {
      alert('복사 불가능한 url입니다.');
    }
  };

  return (
    <Comment>
      <Lable>제목</Lable>
      <Title>{title}</Title>
      <Lable>내용</Lable>
      <Contents>{content}</Contents>
      <Button onClick={() => handleCopyClipBoard()}>공유하기</Button>
      <OnOff>{isOnline ? '온라인' : '오프라인'}</OnOff>
    </Comment>
  );
};

export default Content;
