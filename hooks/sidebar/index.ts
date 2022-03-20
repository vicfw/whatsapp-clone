import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../firebase';
import { useCollection } from 'react-firebase-hooks/firestore';

const useSidebar = () => {
  const [user] = useAuthState(auth);
  const q = query(
    collection(db, 'chats'),
    where('users', 'array-contains', user && user?.email)
  );
  const [value, loading] = useCollection(q);

  const createChat = async () => {
    const input = prompt(
      'Please enter an email address fro the user you wish to chat'
    );

    if (
      !input ||
      !input.includes('@') ||
      input === user!.email ||
      (await chatAlreadyExists(input))
    )
      return alert('Please enter a valid email!');

    await setDoc(doc(db, 'chats', user?.uid as string), {
      users: [user?.email, input],
    });
  };

  const chatAlreadyExists = async (recipientEmail: string) => {
    if (!recipientEmail.length) return;

    let isExist: number = 0;
    const doc = await getDocs(collection(db, 'chats'));
    doc.forEach((user) => {
      const result = user
        .data()
        .users.filter((user: string) => user === recipientEmail);

      if (result.length > 0) {
        isExist++;
      }
    });
    return isExist;
  };

  return {
    createChat,
    value,
    user,
    loading,
  };
};

export default useSidebar;
