import React, {
  useCallback,
  useRef,
  useState,
  useEffect,
  useMemo,
} from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import Lottie from 'react-lottie';
import { BiLeftArrowAlt, BiFingerprint, BiUser } from 'react-icons/bi';
import { GoMail, GoLock, GoSearch, GoLocation } from 'react-icons/go';
import { Form } from '@unform/web';
import { FormHandles, Scope } from '@unform/core';

import axios from 'axios';
import * as Yup from 'yup';

import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';
import animationData from '../../styles/assets/spinner.json';
import { User as IUser } from '../../hooks/auth';
import { CPFMask, CEPMask } from '../../utils/masks';

import Input from '../../components/Input';
import Button from '../../components/Button';

import {
  Container,
  Content,
  Card,
  CEPContainer,
  StreetContainer,
  CityContainer,
} from './styles';

interface IResponseCEP {
  logradouro: string;
  bairro: string;
  localidade: string;
  erro?: boolean;
}

interface UserFormData {
  name: string;
  cpf: string;
  email: string;
  password: string;
  cep: string;
  street: string;
  neighborhood: string;
  city: string;
  number: string;
}

const User: React.FC = () => {
  const [user, setUser] = useState<IUser>({} as IUser);
  const [loading, setLoading] = useState(false);

  const formRef = useRef<FormHandles>(null);
  const history = useHistory();

  const { id } = useParams<{ id: string }>();

  const isUpdate = useMemo(() => !!id, [id]);

  useEffect(() => {
    async function loadUser(): Promise<void> {
      if (isUpdate) {
        setLoading(true);

        const { data } = await api.get<IUser>(`/usuarios/${id}`);

        setUser(data);

        setLoading(false);
      }
    }

    loadUser();
  }, [isUpdate, id]);

  const handleSubmit = useCallback(
    async (data: UserFormData) => {
      setLoading(true);

      formRef.current?.setErrors({});

      try {
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          cpf: Yup.string().required('CPF obrigatório'),
          password: Yup.string()
            .min(5, 'Senha deve conter mais de 4 caracteres')
            .required('Senha obrigatória'),
          address: Yup.object().shape({
            cep: Yup.string().required('CEP obrigatório'),
            street: Yup.string().required('Rua obrigatória'),
            number: Yup.string().required('Número obrigatório'),
            neighborhood: Yup.string().required('Bairro obrigatório'),
            city: Yup.string().required('Cidade obrigatório'),
          }),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        if (!isUpdate) {
          await api.post('/usuarios', data);

          toast.success('Usuário cadastrado com sucesso.');
        } else {
          await api.put(`/usuarios/${id}`, data);

          toast.success('Usuário alterado com sucesso!');
        }

        history.push('/dashboard');
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          toast.error('Foram encontrados erros no formulário!');
        } else {
          toast.error(`${isUpdate ? 'Não foi possível alterar o usuário, tente novamente.' : 'Não foi possível cadastrar o usuário, tente novamente'}`);
        }
      }

      setLoading(false);
    },
    [id, isUpdate, history],
  );

  const handleSearchCEP = useCallback(async () => {
    let cep = formRef.current?.getFieldValue('address.cep');

    cep = cep.replace('-', '');

    if (cep.length === 8) {
      const { data } = await axios.get<IResponseCEP>(
        `https://viacep.com.br/ws/${cep}/json/`,
      );

      if (data.erro) {
        toast.error('CEP inválido.');
      } else {
        formRef.current?.setData({
          address: {
            street: data.logradouro,
            neighborhood: data.bairro,
            city: data.localidade,
          },
        });

        const inputRef = formRef.current?.getFieldRef('address.number');

        inputRef.focus();
      }

      cep = CEPMask(cep);

      formRef.current?.setFieldValue('address.cep', cep);
    } else {
      toast.error('CEP inválido.');
    }
  }, []);

  const handleChangeCPF = useCallback((cpf: string) => {
    formRef.current?.setFieldValue('cpf', CPFMask(cpf));
  }, []);

  const handleChangeCEP = useCallback((cep: string) => {
    formRef.current?.setFieldValue('address.cep', CEPMask(cep));
  }, []);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice',
    },
  };

  return (
    <Container>
      <header>
        <div>
          <Link to="/dashboard">
            <BiLeftArrowAlt size={36} />
          </Link>

          {isUpdate ? <h1>Editar usuário</h1> : <h1>Cadastrar usuário</h1>}
        </div>
      </header>
      <Content>
        <Card>
          <Form
            ref={formRef}
            onSubmit={handleSubmit}
            initialData={user}
          >
            {loading ? (
              <>
                <Lottie options={defaultOptions} height={400} width={400} />
              </>
            ) : (
              <>
                <Input icon={BiUser} name="name" placeholder="Nome" />
                <Input icon={GoMail} name="email" placeholder="E-mail" />
                <Input
                  icon={BiFingerprint}
                  name="cpf"
                  placeholder="CPF"
                  onChange={e => handleChangeCPF(e.target.value)}
                />

                <Input
                  name="password"
                  icon={GoLock}
                  type="password"
                  placeholder="Senha"
                />


                <section>
                  <h3>
                    <GoLocation /> Endereço
                  </h3>
                  <Scope path="address">
                    <CEPContainer>
                      <Input
                        name="cep"
                        placeholder="CEP"
                        maxLength={9}
                        onChange={e => handleChangeCEP(e.target.value)}
                      />
                      <Button onClick={handleSearchCEP}>
                        <GoSearch size={36} />
                      </Button>
                    </CEPContainer>
                    <StreetContainer>
                      <Input name="street" placeholder="Rua" />
                      <Input
                        name="number"
                        placeholder="Número"
                        containerStyle={{ maxWidth: 240 }}
                      />
                    </StreetContainer>

                    <CityContainer>
                      <Input name="neighborhood" placeholder="Bairro" />
                      <Input name="city" placeholder="Cidade" />
                    </CityContainer>
                  </Scope>
                </section>

                <Button loading={loading} type="submit">
                  {isUpdate ? 'Alterar usuário' : 'Criar usuário'}
                </Button>
              </>
            )}
          </Form>
        </Card>
      </Content>
    </Container>
  );
};

export default User;
