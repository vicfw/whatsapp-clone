import styled from 'styled-components';
import { Avatar, Button, Input } from '@mui/material';

export const Wrapper = styled('div')<{ isOpen: boolean }>`
  /* .show {
    display: block;
  } */
`;

export const Container = styled('div')<{ isOpen: boolean }>`
  flex: 0.45;
  border-right: 1px solid whitesmoke;
  height: 100vh;
  width: ${({ isOpen }) => (isOpen ? '300px' : '0px')};
  overflow-y: scroll;
  position: relative;
  left: ${({ isOpen }) => (isOpen ? '0px' : '-300px')};
  transition: all 400ms cubic-bezier(0.68, 0.64, 0, 1.33);
  ::-webkit-scrollbar {
    display: none;
  }
  scrollbar-width: 0;
`;

export const Header = styled.div`
  display: flex;
  position: sticky;
  top: 0;
  background-color: #fff;
  z-index: 1;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  height: 80px;
  border-bottom: 1px solid whitesmoke;
`;

export const UserAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;

export const IconsContainer = styled.div``;

export const Search = styled.div`
  display: flex;
  align-items: center;
  padding: 20px;
  border-radius: 2px;
`;

export const SearchInput = styled('input')`
  outline: none;
  border: none;
  flex: 1;
`;

export const SidebarButton = styled(Button)`
  width: 100%;
  &&& {
    border-top: 1px solid whitesmoke;
    border-bottom: 1px solid whitesmoke;
  }
`;
