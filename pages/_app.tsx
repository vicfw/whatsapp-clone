import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Login from './login';
import Loading from '../components/Loading';
import 'react-toastify/dist/ReactToastify.css';
import useApp from '../hooks/_app';

function MyApp({ Component, pageProps }: AppProps) {
  const { user, loading } = useApp();

  if (loading) return <Loading />;
  if (!user) return <Login />;

  return <Component {...pageProps} />;
}

export default MyApp;
