import React from 'react';
import * as Style from './style';
import Logo from '../../public/assets/images/logo.png';
import Image from 'next/image';

const Loading = () => {
  return (
    <Style.Container>
      <Image src={Logo} alt="loading_logo" width={200} height={200} />
    </Style.Container>
  );
};

export default Loading;
