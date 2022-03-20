import { collection, doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useContext, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { SidebarContext } from '../../context';
import { auth, db } from '../../firebase';
import useMediaQuery from '../../utils/useMediaQuery';

const useApp = () => {
  const [user, loading] = useAuthState(auth);
  const { setShowSidebar } = useContext(SidebarContext);
  const isMobile = useMediaQuery('(max-width:800px)');

  useEffect(() => {
    if (isMobile) {
      setShowSidebar(false);
    }
  }, [isMobile]);

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
