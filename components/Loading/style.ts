import styled, { keyframes } from 'styled-components';

export const Container = styled.div`
  display: grid;
  place-items: center;
  height: 100vh;
  background-color: green;

  img {
    animation: anim 3s infinite;
  }

  @keyframes anim {
    0% {
      opacity: 1;
    }
    25% {
      opacity: 0;
    }
    50% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;
