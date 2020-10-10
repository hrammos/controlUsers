import { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100%;
  }

  body {
    -webkit-font-smoothing: antialiased;
    background: linear-gradient(to right, rgb(83, 105, 118), rgb(41, 46, 73));
    /* color: #f4f4f4; */
    -webkit-font-smoothing: antialiased;
  }

  ::-webkit-scrollbar {
    width: 0.65rem;
    height: 0.65rem;
  }

  ::-webkit-scrollbar-track {
    background: transparent;

  }

  ::-webkit-scrollbar-thumb {
    background: #000a;
    border-radius: 0.35rem;
  }

  @media (max-width: 600px) {
    ::-webkit-scrollbar {
      width: 0.55rem;
      height: 0.55rem;
    }
  }

  body, input, button {
    font-size: 16px;
    font-family: 'Open Sans', sans-serif;
  }

  *:focus {
    outline: 0;
  }

  a {
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  button {
    cursor: pointer;
  }
`;
