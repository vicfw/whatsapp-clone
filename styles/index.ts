import styled from 'styled-components';
export const Container = styled.div`
  flex: 1;
  height: 100vh;
  background-image: url('/assets/images/background1.jpg');
  justify-content: center;
  align-items: center;
`;

export const Header = styled.div`
  position: sticky;
  background-color: #fff;
  z-index: 100;
  top: 0;
  display: flex;
  padding: 11px;
  height: 80px;
  align-items: center;
  border-bottom: 1px solid whitesmoke;
`;

export const HeaderInformation = styled.div`
  margin-left: 15px;
  flex: 1;
  > h3 {
    margin-bottom: 3px;
  }
  > p {
    font-size: 14[x];
    color: gray;
  }
`;

export const HeaderIcon = styled.div``;
