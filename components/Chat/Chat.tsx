import { collection, query, where } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { auth, db } from '../../firebase';
import { getRecipientEmail } from '../../utils/getRecipientEmail';
import * as Style from './style';
import * as Type from './types';

const Chat: FC<Type.ChatProps> = ({ id, users }) => {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const recipientEmail = getRecipientEmail(users, user);
  const q = query(
    collection(db, 'users'),
    where('email', '==', recipientEmail)
  );

  const [value, loading] = useCollection(q);

  const recipient = value?.docs[0]?.data();

  const enterChat = () => {
    router.push(`/chat/${id}`);
  };

  return (
    <Style.Container onClick={enterChat}>
      {recipient ? (
        <Style.UserAvatar src={recipient.photoUrl} />
      ) : (
        <Style.UserAvatar>{recipientEmail[0]}</Style.UserAvatar>
      )}
      <p>{recipientEmail}</p>
    </Style.Container>
  );
};

export default Chat;
