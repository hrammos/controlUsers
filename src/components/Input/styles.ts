import styled, { css } from 'styled-components';

interface ContainerProps {
  isFocused: boolean;
  isFilled: boolean;
  isErrored: boolean;
}

export const Container = styled.div<ContainerProps>`
  border-radius: 4px;
  padding: 16px;
  width: 100%;
  border: 2px solid #ddd;

  display: flex;
  align-items: center;

  & + div {
    margin-top: 8px;
  }

  ${props =>
    props.isErrored &&
    css`
      border-color: #c40200;
    `}

  ${props =>
    props.isFocused &&
    css`
      color: #1282a2;
      border-color: #1282a2;
    `}

  ${props =>
    props.isFilled &&
    css`
      color: #1282a2;
    `}

  input {
    flex: 1;
    background: transparent;
    border: 0;
    color: #232129;

    &::placeholder {
      color: #232129;
    }
  }

  svg {
    margin-right: 16px;
  }
`;

export const ErrorContainer = styled.div`
  display: flex;

  span {
    color: #c40200;
    margin-bottom: 8px;
    margin-left: 8px;
  }
`;
