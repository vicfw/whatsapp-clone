import { Avatar, IconButton } from '@mui/material';
import React, { FC } from 'react';
import * as Style from './style';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';
import ReactTimeAgo from 'react-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import TimeAgo from 'javascript-time-ago';
import { useChatScreen } from '../../hooks/chatScreen';
import { ChatScreenPropTypes } from './type';

const ChatScreen: FC<ChatScreenPropTypes> = ({ chat, messages }) => {
  const {
    recipientEmail,
    recipientSnapshot,
    showMessages,
    sendMessage,
    input,
    setInput,
    endMassageRef,
  } = useChatScreen(chat, messages);

  TimeAgo.addDefaultLocale(en);

  return (
    <Style.Container>
      <Style.Header>
        {recipientEmail ? (
          <Avatar src={recipientSnapshot?.docs[0].data().photoUrl} />
        ) : (
          <Avatar src={recipientEmail} />
        )}
        <Style.HeaderInformation>
          <h3>{recipientEmail}</h3>
          {recipientSnapshot?.docs[0]?.data()?.lastSeen ? (
            <p>
              Last active :{' '}
              <ReactTimeAgo
                date={recipientSnapshot?.docs[0]?.data()?.lastSeen.toDate()}
                locale="en-US"
              />
            </p>
          ) : (
            <p>Unavailable</p>
          )}
        </Style.HeaderInformation>
        <Style.HeaderIcon>
          <IconButton>
            <MoreVertIcon />
          </IconButton>
          <IconButton>
            <AttachFileIcon />
          </IconButton>
        </Style.HeaderIcon>
      </Style.Header>
      <Style.MessageContainer>
        {showMessages()}
        <Style.EndOfMessage ref={endMassageRef} />
      </Style.MessageContainer>
      <Style.InputContainer>
        <InsertEmoticonIcon />
        <Style.Input value={input} onChange={(e) => setInput(e.target.value)} />
        <button hidden disabled={!input} type="submit" onClick={sendMessage}>
          Send Message
        </button>
        <MicIcon />
      </Style.InputContainer>
    </Style.Container>
  );
};

export default ChatScreen;
