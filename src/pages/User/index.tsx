import React from 'react';

import { Container, Content } from './styles';

const User: React.FC = () => {
  return (
    <Container>
      <h1>User</h1>
      <Content>
        <form action="">
          <input
            id="email"
            name="email"
            type="email"
            placeholder="exemplo@email.com"
          />
        </form>
      </Content>
    </Container>
  );
};

export default User;
