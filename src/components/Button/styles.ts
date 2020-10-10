import styled from 'styled-components';

export const Container = styled.button`
  background: #001f54;
  color: #fff;
  height: 56px;
  border-radius: 4px;
  padding: 0 16px;
  border: 0;
  width: 100%;
  font-weight: 500;
  margin-top: 16px;
  transition: 0.4s;
  font-weight: 700;
  border: 2px solid transparent;

  &:hover {
    border: 2px solid #001f54;
    background: transparent;
    color: #001f54;
  }
`;
