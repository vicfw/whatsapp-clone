import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../firebase';
import { toast } from 'react-toastify';

export const useLogin = () => {
  const signIn = async () => {
    try {
      await signInWithPopup(auth, provider);
    } catch (e) {
      console.log(e);

      toast('Something went wrong!');
    }
  };

  return {
    signIn,
  };
};

export default useLogin;
