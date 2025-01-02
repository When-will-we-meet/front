import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  height: 80px;
  width: 100%;
  margin: 0;
  border: 1px solid #d9d9d9;
  display: flex;
  justify-content: space-between;
`;

const Logo = styled.p`
  color: #2db6e8;
  text-align: center;
  font-family: Inter;
  font-size: 25px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  margin-left: 50px;
  //  Link 스타일
  a {
    text-decoration: none;
    color: inherit;
  }

  a:visited {
    color: inherit;
  }
`;

const Header: React.FC = () => {
  return (
    <Container>
      <Logo>
        <Link to="/">언제 만나요?</Link>
      </Logo>
    </Container>
  );
};

export default Header;
