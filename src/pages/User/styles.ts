import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  max-width: 1200px;
  height: 100%;
  margin: 0px auto;

  header {
    margin-top: 34px;
    div {
      display: flex;
      align-items: center;

      a {
        color: #1282a2;
        display: flex;
        align-items: center;

        &:hover {
          color: ${shade(0.2, '#1282a2')};
        }
      }

      h1 {
        margin-left: 16px;
      }
    }
  }
`;

export const Content = styled.div`
  header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;

    h1 {
      margin-top: 28px;
    }
  }
`;

export const Card = styled.div`
  margin-top: 40px;
  padding: 30px;
  background: #fff;
  max-width: 100%;
  border-radius: 4px;
  display: flex;
  flex-direction: column;

  section {
    margin-top: 36px;
    border-top: 2px solid #f5f5f5;
    h3 {
      margin-top: 28px;
      margin-bottom: 8px;
      display: flex;
      align-items: center;

      svg {
        margin-right: 16px;
      }
    }

    svg {
      margin-right: 8px;
    }
  }
`;

export const CEPContainer = styled.div`
  display: flex;
  align-items: center;

  div {
    max-width: 565px;
  }

  div + button {
    width: 100px;
    margin-top: 0;
    margin-left: 8px;
    background: transparent;
    border: 2px solid #1282a2;
    border-radius: 4px;
    transition: 0.4s;
    color: #1282a2;

    display: flex;
    align-items: center;
    justify-content: center;

    &:hover {
      border: 2px solid #1282a2;
      background: #1282a2;
      color: #fff;

      svg {
        color: #fff;
      }
    }
  }

  @media (max-width: 1149px) {
    max-width: 100%;
  }
`;

export const StreetContainer = styled.div`
  display: flex;
  align-items: center;

  max-width: 100%;
  margin-top: 8px;

  div + div {
    margin-top: 0px;
    margin-left: 8px;

    @media (max-width: 508px) {
      margin-left: 2px;
    }
  }

  svg {
    margin-right: 8px;
  }

  span {
    background: #c40200;
    color: #fff;

    &::before {
      border-color: #c40200 transparent;
    }
  }

  @media (max-width: 597px) {
    max-width: 50%;

    svg {
      margin-left: -30px;
    }
  }
`;

export const CityContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  max-width: 100%;
  margin-top: 8px;

  div + div {
    margin-top: 0px;
    margin-left: 8px;

    @media (max-width: 508px) {
      margin-left: 2px;
    }
  }

  svg {
    margin-right: 8px;
  }

  span {
    background: #c40200;
    color: #fff;

    &::before {
      border-color: #c40200 transparent;
    }
  }

  @media (max-width: 597px) {
    max-width: 50%;

    svg {
      margin-left: -30px;
    }
  }
`;
