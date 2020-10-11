import React from 'react';
import { BiPowerOff } from 'react-icons/bi';
import { FaUsers } from 'react-icons/fa';

import { useAuth } from '../../hooks/auth';

import { Container, Content } from './styles';

const Header: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <Container>
      <Content>
        <nav>
          <FaUsers size={28} />
          <h1>controlUsers</h1>
        </nav>
        <aside>
          <div>
            <button type="button" onClick={signOut}>
              <BiPowerOff size={28} />
            </button>
          </div>
        </aside>
      </Content>
    </Container>
  );
};

export default Header;
