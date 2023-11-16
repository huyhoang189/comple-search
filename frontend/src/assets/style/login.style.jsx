import styled from "styled-components";
export const LoginWrapper = styled("div")`
  .content {
    display: flex;
    align-items: center;
    height: 100%;
    background-color: #001529;
  }

  .login-form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .right-image {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    height: 100%;
  }

  .background-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  @media screen and (max-width: 768px) {
    .login-form,
    .right-image {
      width: 100%;
      height: auto;
    }
  }

  .ant-typography {
    margin-top: 10px;
    margin-bottom: 5px;
    color: white;
  }

  .ant-image {
    margin: auto;
  }

  .ant-upload-wrapper {
    margin: auto;
  }
`;
