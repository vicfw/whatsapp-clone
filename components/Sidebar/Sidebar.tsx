import MoreVertIcon from '@mui/icons-material/More';
import ChatIcon from '@mui/icons-material/Chat';
import { CircularProgress, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import useSidebar from '../../hooks/sidebar';
import * as Style from './style';
import Chat from '../Chat/Chat';
import { Router, useRouter } from 'next/router';
import { useContext } from 'react';
import { SidebarContext } from '../../context';
import ClearIcon from '@mui/icons-material/Clear';

const Sidebar = () => {
  const { createChat, value, user, loading } = useSidebar();
  const router = useRouter();
  const { showSidebar, setShowSidebar } = useContext(SidebarContext);
  return (
    <Style.Wrapper isOpen={showSidebar}>
      <Style.Container isOpen={showSidebar}>
        <Style.Header>
          <Style.UserAvatar
            src={user?.photoURL ? user.photoURL : 'U'}
            onClick={() => {
              signOut(auth);
              router.push('/');
            }}
          />
          <Style.IconsContainer>
            <IconButton onClick={() => setShowSidebar(false)}>
              <ClearIcon />
            </IconButton>
          </Style.IconsContainer>
        </Style.Header>

        <Style.SidebarButton onClick={createChat}>
          Start a new chat
        </Style.SidebarButton>
        {loading ? (
          <CircularProgress color="success" style={{ marginRight: '20px' }} />
        ) : (
          value?.docs.map((chat) => {
            return (
              <Chat key={chat.id} id={chat.id} users={chat.data().users} />
            );
          })
        )}
      </Style.Container>
    </Style.Wrapper>
  );
};

export default Sidebar;
