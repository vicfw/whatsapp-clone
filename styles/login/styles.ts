import styled from 'styled-components';

export const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  background-color: whitesmoke;
`;

export const LoginContainer = styled.div`
  display: flex;
  padding: 100px;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0px 0px 6px 1px #ccc;

  .logo {
    width: 150px;
    height: 150px;
    margin-bottom: 50px;
    display: grid;
    place-items: center;
  }
`;
