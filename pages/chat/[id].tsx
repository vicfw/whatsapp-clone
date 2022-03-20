import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import React, { FC } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import ChatScreen from '../../components/ChatScreen';
import Sidebar from '../../components/Sidebar/Sidebar';
import { auth, db } from '../../firebase';
import * as Style from '../../styles/chat/style';
import { getRecipientEmail } from '../../utils/getRecipientEmail';

interface ChatPropTypes {
  chat: { id: string; users: [string, string] };
  messages: string;
}

const Chat: FC<ChatPropTypes> = ({ chat, messages }) => {
  const [user] = useAuthState(auth);
  return (
    <Style.Container>
      <Head>
        <title>Chat With {getRecipientEmail(chat.users, user)}</title>
      </Head>
      <Sidebar />
      <Style.ChatContainer>
        <ChatScreen chat={chat} messages={messages} />
      </Style.ChatContainer>
    </Style.Container>
  );
};

export default Chat;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const docRef = doc(db, 'chats', context.query.id as string);
  const messageRef = collection(
    db,
    'chats',
    context.query.id as string,
    'messages'
  );

  const messagesData = await getDocs(messageRef);

  const messages = messagesData.docs.map((doc) => {
    return doc.data();
  });

  const chatData = await getDoc(docRef);

  const chat = {
    id: chatData.id,
    ...chatData.data(),
  };

  return {
    props: { chat, messages: JSON.stringify(messages) },
  };
};
