import Header from "components/Header";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Conference from "routers/Conference";
import Main from "./routers/Main";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const App: React.FC = () => {
  return (
    <Container>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/conference" element={<Conference />} />
        </Routes>
      </Router>
    </Container>
  );
};

export default App;
