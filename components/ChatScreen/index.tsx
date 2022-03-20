import { Avatar, IconButton } from '@mui/material';
import { useRouter } from 'next/router';
import React, { FC, useEffect, useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../firebase';
import * as Style from './style';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { useCollection, useDocument } from 'react-firebase-hooks/firestore';
import {
  addDoc,
  collection,
  doc,
  DocumentData,
  getDocs,
  orderBy,
  query,
  QueryDocumentSnapshot,
  serverTimestamp,
  setDoc,
  where,
} from 'firebase/firestore';
import Message from '../Message/Message';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';
import { getRecipientEmail } from '../../utils/getRecipientEmail';
import ReactTimeAgo from 'react-time-ago';
import en from 'javascript-time-ago/locale/en.json';
import TimeAgo from 'javascript-time-ago';
import ScrollToBottom from '../../utils/ScrollToBottom';

interface ChatScreenPropTypes {
  chat: { id: string; users: [string, string] };
  messages: string;
}

const ChatScreen: FC<ChatScreenPropTypes> = ({ chat, messages }) => {
  const [user] = useAuthState(auth);
  const [input, setInput] = useState('');
  const router = useRouter();
  TimeAgo.addDefaultLocale(en);
  const endMassageRef = useRef<HTMLDivElement>(null);

  const serverSideProps: DocumentData[] = JSON.parse(messages);

  const recipientEmail = getRecipientEmail(chat.users, user);

  const [recipientSnapshot] = useCollection(
    query(collection(db, 'users'), where('email', '==', recipientEmail))
  );

  const ref = collection(db, 'chats', router.query.id as string, 'messages');
  const q = query(ref, orderBy('timestamp'));
  const [messagesSnapShot] = useCollection(q);

  useEffect(() => {
    if (endMassageRef.current && messages.length) {
      ScrollToBottom(endMassageRef.current);
    }
  }, [messagesSnapShot]);

  const showMessages = () => {
    if (messagesSnapShot) {
      return messagesSnapShot.docs.map((_message) => {
        const { message, user, timestamp } = _message.data()!;

        return (
          <Message
            key={message.id}
            message={message}
            user={user}
            timestamp={timestamp}
          />
        );
      });
    } else {
      serverSideProps.map((dt) => {
        return (
          <Message
            key={dt.id}
            message={dt.message}
            user={dt.user}
            timestamp={dt.timestamp}
          />
        );
      });
    }
  };

  const sendMessage = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();

    await setDoc(
      doc(db, 'users', user?.uid! as string),
      {
        lastSeen: serverTimestamp(),
      },
      { merge: true }
    );

    await addDoc(
      collection(db, 'chats', router.query.id as string, 'messages'),
      {
        timestamp: serverTimestamp(),
        message: input,
        user: user?.email,
        photoUrl: user?.photoURL,
      }
    );

    setInput('');
    ScrollToBottom(endMassageRef.current!);
  };

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
