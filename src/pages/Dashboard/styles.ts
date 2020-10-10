import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  height: 100%;
  margin: 0px auto;

  h1 {
    margin-top: 28px;
  }

  div {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
`;

export const Search = styled.div`
  margin-top: 34px;
  position: relative;
  top: 0;

  input {
    width: 237px;
    height: 36px;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding-left: 40px;
  }

  svg {
    position: absolute;
    left: 12px;
  }
`;

export const RecordTable = styled.table`
  width: 100%;
  border-spacing: 0 18px;
  border-radius: 4px;

  thead th {
    color: #444;
    text-align: left;
    padding: 12px;
    font-size: 16px;
    font-weight: bold;
  }

  tbody {
    border-radius: 4px;
  }
  tbody tr {
    border: 1px solid red;
    background: #fff;
    height: 57px;
    color: #666;
    font-size: 16px;
  }

  tbody td {
    border: none;
    padding: 12px;

    button {
      height: 28px;
      width: 28px;
      background: transparent;
      border: 2px solid #1282a2;
      border-radius: 4px;
      transition: 0.4s;

      svg {
        align-self: center;
        color: #1282a2;
      }

      &:hover {
        background: #1282a2;
        color: #fff;

        svg {
          color: #fff;
        }
      }
    }

    button + button {
      margin-left: 4px;
    }
  }
`;
