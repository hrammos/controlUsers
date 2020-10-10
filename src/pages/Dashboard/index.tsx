import React, { useEffect, useState, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';

import { BiPencil, BiSearch, BiTrash } from 'react-icons/bi';

import Button from '../../components/Button';

import { Container, Search, RecordTable } from './styles';

import api from '../../services/api';

import { User } from '../../hooks/auth';

interface FoodsParams {
  name_like: string;
}

const Dashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchValue, setSearchValue] = useState('');

  const history = useHistory();

  useEffect(() => {
    async function loadUsers(): Promise<void> {
      const params = {} as FoodsParams;
      if (searchValue) {
        params.name_like = searchValue;
      }

      const { data } = await api.get<User[]>(`/usuarios`, { params });

      setUsers(data);
    }

    loadUsers();
  }, [searchValue]);

  const handleNavigate = useCallback(
    (id: number) => {
      history.push(`/user/${id}`);
    },
    [history],
  );

  return (
    <Container>
      <header>
        <h1>Gerenciando usuários</h1>
        <div>
          <Search>
            <BiSearch size={20} color="#999" />
            <input
              onChange={e => setSearchValue(e.target.value)}
              type="text"
              placeholder="Pesquisar por nome"
            />
          </Search>
          <Link to="/user">
            <Button>Cadastrar usuário</Button>
          </Link>
        </div>
      </header>

      <RecordTable>
        <thead>
          <tr>
            <th>Nome</th>
            <th>CPF</th>
            <th>Email</th>
            <th>Cidade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.cpf}</td>
              <td>{user.email}</td>
              <td>{user.address.city}</td>
              <td>
                <button type="button" onClick={() => handleNavigate(user.id)}>
                  <BiPencil />
                </button>
                <button type="button">
                  <BiTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </RecordTable>

      {/* {users.length === 0 && !loading ? (<h1>Nenhum registro</h1>) : ''} */}
    </Container>
  );
};

export default Dashboard;
