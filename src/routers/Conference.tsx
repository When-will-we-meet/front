import React, { useState } from "react";
import styled from "styled-components";

const Container = styled.div`
  background: #fff;
  display: flex;
`;

const Comment = styled.div`
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
  left: 120%;
`;

const Conference: React.FC = () => {
  const handleCopyClipBoard = async () => {
    try {
      const currentUrl = window.location.href;
      await navigator.clipboard.writeText(currentUrl);
      alert("클립보드에 복사 완료");
    } catch (e) {
      alert("복사 불가능한 url입니다.");
    }
  };

  return (
    <Container>
      <div>
        <Comment>
          <Lable>제목</Lable>
          <Title>LCK 회의</Title>
          <Lable>내용</Lable>
          <Content>오늘 피그마는 어쩌구 저쩌구해서 좋았다.</Content>
          <Button onClick={() => handleCopyClipBoard()}>공유하기</Button>
        </Comment>
        <div></div>
      </div>
      <div>
        <div></div>
        <div></div>
      </div>
    </Container>
  );
};

export default Conference;
