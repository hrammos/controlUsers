import React, {
  useCallback,
  useRef,
  useState,
  useEffect,
  useMemo,
} from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import { Form } from '@unform/web';
import axios from 'axios';
import { toast } from 'react-toastify';
import { FormHandles, Scope } from '@unform/core';

import * as Yup from 'yup';

import { BiLeftArrowAlt, BiFingerprint, BiUser } from 'react-icons/bi';
import { GoMail, GoLock, GoSearch, GoLocation } from 'react-icons/go';

import api from '../../services/api';
import getValidationErrors from '../../utils/getValidationErrors';

import {
  Container,
  Content,
  Card,
  CEPContainer,
  StreetContainer,
  CityContainer,
} from './styles';

import Input from '../../components/Input';
import Button from '../../components/Button';

import { User as IUser } from '../../hooks/auth';

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

  const handleSubmit = useCallback(async (data: UserFormData) => {
    try {
      setLoading(true);

      formRef.current?.setErrors({});

      if (!isUpdate) {
        const schema = Yup.object().shape({
          name: Yup.string().required('Nome obrigatório'),
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          cpf: Yup.string().required('CPF obrigatório'),

          old_password: Yup.string(),
          password: Yup.string().when('old_password', {
            is: val => !!val.length,
            then: Yup.string()
              .min(5, 'Senha deve conter mais de 4 caracteres')
              .required('Senha obrigatória'),
            otherwise: Yup.string(),
          }),
          password_confirmation: Yup.string()
            .when('old_password', {
              is: val => !!val.length,
              then: Yup.string().required('Confirmação obrigatória'),
              otherwise: Yup.string(),
            })
            .oneOf([Yup.ref('password'), undefined], 'Confirmação incorreta'),
          address: Yup.object().shape({
            cep: Yup.string().required('CEP obrigatório'),
            street: Yup.string().required('Rua obrigatória'),
            number: Yup.number().required('Número obrigatório'),
            neighborhood: Yup.string().required('Bairro obrigatório'),
            city: Yup.string().required('Cidade obrigatória'),
          }),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        await api.post('/usuarios', data);
      } else {
        await api.put(`/usuarios/${id}`, data);
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
            number: Yup.number().required('Número obrigatório'),
            neighborhood: Yup.string().required('Bairro obrigatório'),
            city: Yup.string().required('Cidade obrigatório'),
          }),
        });

        await schema.validate(data, {
          abortEarly: false,
        });
      }

      setLoading(false);
    } catch (err) {
      if (err instanceof Yup.ValidationError) {
        const errors = getValidationErrors(err);

        formRef.current?.setErrors(errors);

        toast.error('Credênciais inválidas.');
      }

      toast.error('Ocorreu um erro, tente novamente.');
      setLoading(false);
    }
  }, []);

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

      const formattedCep = cep.replace(/(\d{5})(\d{3})/, '$1-$2');

      formRef.current?.setFieldValue('address.cep', formattedCep);
    } else {
      toast.error('CEP inválido.');
    }
  }, []);

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
            initialData={{
              ...user,
              password: '',
            }}
          >
            <Input icon={BiUser} name="name" placeholder="Nome" />
            <Input icon={GoMail} name="email" placeholder="E-mail" />
            <Input icon={BiFingerprint} name="cpf" placeholder="CPF" />
            {isUpdate ? (
              <>
                <Input
                  containerStyle={{ marginTop: 24 }}
                  name="old_password"
                  icon={GoLock}
                  type="password"
                  placeholder="Senha atual"
                />

                <Input
                  name="password"
                  icon={GoLock}
                  type="password"
                  placeholder="Nova senha"
                />

                <Input
                  name="password_confirmation"
                  icon={GoLock}
                  type="password"
                  placeholder="Confirmar senha"
                />
              </>
            ) : (
              <Input
                name="password"
                icon={GoLock}
                type="password"
                placeholder="Senha"
              />
            )}

            <section>
              <h3>
                <GoLocation /> Endereço
              </h3>
              <Scope path="address">
                <CEPContainer>
                  <Input name="cep" placeholder="CEP" />
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
          </Form>
        </Card>
      </Content>
    </Container>
  );
};

export default User;
