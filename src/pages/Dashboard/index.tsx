import React, { useEffect, useState, useCallback } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Lottie from 'react-lottie';
import { BiPencil, BiSearch, BiTrash } from 'react-icons/bi';

import { toast } from 'react-toastify';
import api from '../../services/api';
import { User } from '../../hooks/auth';
import animationData from '../../styles/assets/spinner.json';

import Button from '../../components/Button';

import { Container, Search, RecordTable } from './styles';

interface UserParams {
  name_like: string;
}

const Dashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);

  const history = useHistory();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  useEffect(() => {
    async function loadUsers(): Promise<void> {
      setLoading(true);
      const params = {} as UserParams;

      if (searchValue) {
        params.name_like = searchValue;
      }

      const { data } = await api.get<User[]>(`/usuarios`, { params });

      setUsers(data);
      setLoading(false);
    }

    loadUsers();
  }, [searchValue]);

  const handleNavigate = useCallback(
    (id: number) => {
      history.push(`/user/${id}`);
    },
    [history],
  );

  const handleDeleteUser = useCallback(
    async (id: number): Promise<void> => {
      setLoading(true);
      try {
        await api.delete(`/usuarios/${id}`);

        const updattedUsers = users.filter(user => user.id !== id);

        setUsers(updattedUsers);

        toast.success('Usuário deletado com sucesso.');
      } catch (err) {
        toast.error('Ocorreu um erro, tente novamente.');
      }
      setLoading(false);
    },
    [users],
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
            <Button>Adicionar usuário</Button>
          </Link>
        </div>
      </header>

      {loading ? (
        <>
          <Lottie
            style={{ marginTop: 60 }}
            options={defaultOptions}
            height={400}
            width={400}
          />
        </>
      ) : (
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
                  <button
                    type="button"
                    onClick={() => handleDeleteUser(user.id)}
                  >
                    <BiTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>

          {users.length === 0 && searchValue !== '' && (
            <h2>Nenhum registro para esta pesquisa</h2>
          )}
        </RecordTable>
      )}
    </Container>
  );
};

export default Dashboard;
