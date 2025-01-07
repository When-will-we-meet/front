/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { BASE_URL } from './BASE_URL';

const Responder = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 30px;
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

const ResponderName = styled.p<{ $isSelected: boolean }>`
  color: ${(props) => (props.$isSelected ? '#79DAFD' : '#000')};
  text-align: center;
  font-family: Inter;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: normal;
  margin: 15px 0 0 0;
`;

const Responders: React.FC<{
  id: string | null;
  userSelections: unknown[];
  setUserSelections: React.Dispatch<React.SetStateAction<unknown[]>>;
  setResponderNames: React.Dispatch<React.SetStateAction<string[]>>;
  responderNames: string[];
  idxT: number;
  idxR: number;
  handleClickResponder: (index: number) => void;
  mostTimeResponder: string[][];
}> = ({
  id,
  userSelections,
  setUserSelections,
  setResponderNames,
  responderNames,
  idxT,
  idxR,
  handleClickResponder,
  mostTimeResponder,
}) => {
  useEffect(() => {
    const getFetchRespond = async () => {
      if (!id) return;
      try {
        const response = await axios.get(
          `${BASE_URL}/conferences/${id}/responses/`,
        );
        const responderNames = response.data.map((user: any) => [
          user.responder_name,
          user.id,
        ]);
        setUserSelections(response.data);
        setResponderNames(responderNames);
      } catch (error) {
        console.error('Error fetching info:', error);
      }
    };
    getFetchRespond();
  }, [id, userSelections]);
  return (
    <Responder>
      <ResponderText>응답자</ResponderText>
      {responderNames.length > 0 ? (
        <InfoText>#수정을 원하시면 이름을 선택해주세요.</InfoText>
      ) : (
        <></>
      )}
      {idxT !== -1
        ? mostTimeResponder[idxT].map(
            (responderName: string, index: number) => (
              <ResponderName key={index} $isSelected={false}>
                {responderName}
              </ResponderName>
            ),
          )
        : responderNames.map((responderName: string, index: number) => (
            <ResponderName
              key={index}
              onClick={() => handleClickResponder(index)}
              $isSelected={idxR === index}
            >
              {responderName[0]}
            </ResponderName>
          ))}
    </Responder>
  );
};

export default Responders;
