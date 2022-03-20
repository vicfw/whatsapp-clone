import {
  addDoc,
  collection,
  doc,
  DocumentData,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
  where,
} from 'firebase/firestore';
import { useRouter } from 'next/router';
import { FC, useEffect, useRef, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { auth, db } from '../../firebase';
import { getRecipientEmail } from '../../utils/getRecipientEmail';
import ScrollToBottom from '../../utils/ScrollToBottom';
import Message from '../../components/Message/Message';

export const useChatScreen = (
  chat: {
    id: string;
    users: [string, string];
  },
  messages: string
) => {
  const [user] = useAuthState(auth);
  const [input, setInput] = useState('');
  const endMassageRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const serverSideProps: DocumentData[] = JSON.parse(messages);

  const recipientEmail = getRecipientEmail(chat.users, user);

  const [recipientSnapshot] = useCollection(
    query(collection(db, 'users'), where('email', '==', recipientEmail))
  );

  const messagesRef = collection(
    db,
    'chats',
    router.query.id as string,
    'messages'
  );
  const q = query(messagesRef, orderBy('timestamp'));
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

  return {
    recipientEmail,
    recipientSnapshot,
    showMessages,
    sendMessage,
    input,
    setInput,
    endMassageRef,
  };
};
