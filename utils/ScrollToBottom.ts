import { Ref } from 'react';

const ScrollToBottom = (el: HTMLElement) => {
  el.scrollIntoView({
    behavior: 'smooth',
    block: 'start',
  });
};

export default ScrollToBottom;
