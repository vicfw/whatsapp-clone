import Head from 'next/head';
import Image from 'next/image';
import React from 'react';
import * as Style from '../styles/login/styles';
import Logo from '../public/assets/images/logo.png';
import { Button } from '@mui/material';
import useLogin from '../hooks/login';
import { ToastContainer, toast } from 'react-toastify';

const Login = () => {
  const { signIn } = useLogin();

  return (
    <Style.Container>
      <Head>
        <title>Login</title>
      </Head>
      <Style.LoginContainer>
        <div className="logo">
          <Image
            src={Logo}
            width={500}
            height={500}
            alt="logo"
            placeholder="blur"
          />
        </div>
        <Button onClick={signIn} color="success" variant="contained">
          Sign in with Google
        </Button>
      </Style.LoginContainer>
      <ToastContainer />
    </Style.Container>
  );
};

export default Login;
