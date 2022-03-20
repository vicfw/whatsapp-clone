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

const Sidebar = () => {
  const { createChat, value, user, loading } = useSidebar();
  const router = useRouter();
  return (
    <Style.Container>
      <Style.Header>
        <Style.UserAvatar
          src={user?.photoURL ? user.photoURL : 'U'}
          onClick={() => {
            signOut(auth);
            router.push('/');
          }}
        />
        <Style.IconsContainer>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
          <IconButton>
            <ChatIcon />
          </IconButton>
        </Style.IconsContainer>
      </Style.Header>
      <Style.Search>
        <SearchIcon />
        <Style.SearchInput placeholder="Search in massages" />
      </Style.Search>
      <Style.SidebarButton onClick={createChat}>
        Start a new chat
      </Style.SidebarButton>
      {loading ? (
        <CircularProgress color="success" style={{ marginRight: '20px' }} />
      ) : (
        value?.docs.map((chat) => {
          return <Chat key={chat.id} id={chat.id} users={chat.data().users} />;
        })
      )}
    </Style.Container>
  );
};

export default Sidebar;
