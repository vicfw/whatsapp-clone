import { collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../../firebase';

const useApp = () => {
  const [user, loading] = useAuthState(auth);

  useEffect(() => {
    if (user) {
      setDoc(
        doc(db, 'users', user.uid),
        {
          email: user.email,
          lastSeen: serverTimestamp(),
          photoUrl: user.photoURL,
        },
        { merge: true }
      );
    }
  }, [user]);

  return {
    user,
    loading,
  };
};

export default useApp;
