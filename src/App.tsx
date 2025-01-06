import Header from 'components/Header';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Conference from 'routers/Conference';
import Main from './routers/Main';
import styled from 'styled-components';

const Container = styled.div`
  width: 100vw;
  height: 100vh;
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
          <Route
            path="/conference/:id/:title/:content"
            element={<Conference />}
          />
        </Routes>
      </Router>
    </Container>
  );
};

export default App;
