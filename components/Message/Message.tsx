import { Timestamp } from 'firebase/firestore';
import React, { FC } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../firebase';
import * as Style from './style';
import moment from 'moment';

interface MessagePropTypes {
  message: string;
  user: string;
  timestamp: Timestamp;
}

const Message: FC<MessagePropTypes> = ({ message, user, timestamp }) => {
  const [userLoggedIn] = useAuthState(auth);

  const typeOfMessage = user === userLoggedIn?.email ? 'sender' : 'receiver';

  return (
    <Style.Container>
      <Style.MessageElement typeOfMessage={typeOfMessage}>
        {message}
        <Style.Timestamp>
          {timestamp ? moment(timestamp.toDate()).format('LT') : '...'}
        </Style.Timestamp>
      </Style.MessageElement>
    </Style.Container>
  );
};

export default Message;
