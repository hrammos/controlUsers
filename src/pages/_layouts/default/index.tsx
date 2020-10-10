import React from 'react';

// import Header from '~/components/Header';

import { Wrapper } from './styles';

const DefaultLayout: React.FC = ({ children }) => {
  return (
    <Wrapper>
      <div />
      {children}
    </Wrapper>
  );
};

export default DefaultLayout;
