import React, { useCallback, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { useHistory } from 'react-router-dom';
import { GoMail, GoLock } from 'react-icons/go';
import { FaUsers } from 'react-icons/fa';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { useAuth } from '../../hooks/auth';
import getValidationErrors from '../../utils/getValidationErrors';

import Input from '../../components/Input';
import Button from '../../components/Button';

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
      setLoading(true);

      try {
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
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);

          formRef.current?.setErrors(errors);

          toast.error('Credênciais inválidas.');
        } else {
          toast.error('Ocorreu um erro, tente novamente.');
        }
      }

      setLoading(false);
    },
    [signIn, history],
  );

  return (
    <Container>
      <Content>
        <div>
          <FaUsers size={28} />
          <h1>controlUsers</h1>
        </div>

        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input icon={GoMail} name="email" placeholder="E-mail" />
          <Input
            icon={GoLock}
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
