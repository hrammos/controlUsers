import styled from 'styled-components';

export const Container = styled.div`
  background: linear-gradient(to right, #1e3c72, #2a5298);
  padding: 0 30px;
  color: #fff;

  nav {
    display: flex;
    align-items: center;

    svg + h1 {
      margin-left: 8px;
    }
  }

  @media (max-width: 1264px) {
    padding: 0 15px;
  }

  @media (max-width: 1225px) {
    padding: 0 0;
  }
`;

export const Content = styled.div`
  height: 64px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  aside {
    div {
      text-align: center;
      margin-top: 2px;

      button {
        border: 0;
        background: none;
        margin-top: 5px;
        color: #fff;
      }
    }
  }
`;
