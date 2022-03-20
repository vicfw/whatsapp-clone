import styled from 'styled-components';
import { measureMemory } from 'vm';

export const Container = styled.div``;
export const MessageElement = styled('p')<{ typeOfMessage: string }>`
  width: fit-content;
  padding: 15px;
  border-radius: 8px;
  margin: 10px;
  min-width: 60px;
  padding-bottom: 26px;
  position: relative;
  text-align: right;
  ${({ typeOfMessage }) =>
    typeOfMessage.includes('sender')
      ? ` margin-left: auto;
  background-color: #dcf8c6;`
      : ` background-color: whitesmoke;
  text-align: left;`}
`;
export const Timestamp = styled.div`
  color: gray;
  padding: 10px;
  font-size: 9px;
  position: absolute;
  bottom: 0;
  text-align: right;
  right: 0;
`;
