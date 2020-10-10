import React, { useCallback, useRef, useState } from 'react';
import { FiMail, FiLock } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import { toast } from 'react-toastify';
import * as Yup from 'yup';

import { useAuth } from '../../hooks/auth';

import Input from '../../components/Input';
import Button from '../../components/Button';

import getValidationErrors from '../../utils/getValidationErrors';

import { Container, Content } from './styles';

interface SignInFormData {
  email: string;
  password: string;
}

const SignIn: React.FC = () => {
  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();

  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
      try {
        setLoading(true);

        formRef.current?.setErrors({});

        const schema = Yup.object().shape({
          email: Yup.string()
            .required('E-mail obrigatório')
            .email('Digite um e-mail válido'),
          password: Yup.string()
            .min(5, 'Senha deve conter mais de 4 caracteres')
            .required('Senha obrigatória'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const { email, password } = data;

        await signIn({
          email,
          password,
        });

        history.push('/dashboard');

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
    },
    [signIn, history],
  );
  return (
    <Container>
      <Content>
        <h1>controlUsers</h1>

        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input icon={FiMail} name="email" placeholder="E-mail" />
          <Input
            icon={FiLock}
            name="password"
            type="password"
            placeholder="Senha"
          />

          <Button type="submit">{loading ? 'Carregando..' : 'Entrar'}</Button>
        </Form>
      </Content>
    </Container>
  );
};

export default SignIn;
