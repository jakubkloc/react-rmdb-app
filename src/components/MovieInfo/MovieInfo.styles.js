import styled from "styled-components";
import { IMAGE_BASE_URL, BACKDROP_SIZE } from "../../config";

export const Wrapper = styled.div`
  background: ${({ backdrop }) =>
    backdrop ? `url(${IMAGE_BASE_URL}${BACKDROP_SIZE}${backdrop})` : "#000"};
  background-size: cover;
  background-position: center;
  padding: 40px 20px;
  animation: animateMovieInfo 1s;

  @keyframes animateMovieInfo {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
`;

export const Content = styled.div`
  display: flex;
  max-width: var(--maxWidth);
  margin: 0 auto;
  background: rgba(0, 0, 0, 0.7);
  border-radius: 20px;
  .spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-top-color: #3498db;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    animation: spin 1s ease-in-out infinite;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
  @media screen and (max-width: 768px) {
    display: block;
    max-height: none;
  }
`;

export const Text = styled.div`
  width: 100%;
  padding: 20px 40px;
  color: var(--white);
  overflow: hidden;
  display: flex;
  flex-direction: column;

  .container {
    display: flex;
    gap: 20px;
    margin-top: auto;
    margin-bottom: auto;
  }
  .left-container {
    display: flex;
    flex-direction: column;
  }

  .ratings {
    display: flex;
    justify-content: space-evenly;
  }

  .right-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .rate-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    flex-basis: 50%;
    gap: 10px;
  }
  .rate-container > h3 {
    text-align: center;
  }

  .ratebar-container {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    flex-basis: 50%;
    margin: auto;
    gap: 10px;
  }

  .director > h3 {
    margin-bottom: 10px;
  }

  .director > p {
    margin: 0;
  }

  h3 {
    margin: 0;
  }
  .score {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 45px;
    height: 45px;
    background: #fff;
    color: #000;
    font-weight: 800;
    border-radius: 50%;
    margin: 0;
  }

  @media screen and (max-width: 460px) {
    .container {
      flex-direction: column;
    }
    .rate-container {
      flex-basis: 25%;
    }

    .director {
      text-align: center;
    }
    .ratings {
      justify-content: space-between;
    }
  }

  h1 {
    @media screen and (max-width: 768px) {
      font-size: var(--fontBig);
    }
  }
`;
