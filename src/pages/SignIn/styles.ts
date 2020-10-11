import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 360px;
  background: #fff;
  box-shadow: 0px 0px 10px #0003;
  border-radius: 4px;
  opacity: 1;
  text-align: center;
  padding: 60px 0px;
`;

export const Content = styled.div`
  div {
    display: flex;
    align-items: center;
    justify-content: center;

    svg + h1 {
      margin-left: 8px;
    }
  }

  form {
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    padding: 0 30px;
    margin-top: 40px;
  }
`;
