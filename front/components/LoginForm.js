import React, { useCallback, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import Link from 'next/link';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';

import useInput from '../hooks/useInput';
import { loginRequestAction } from '../reducers/user';

const ButtonWrapper = styled.div`
  margin-top: 10px;
`;

const FormWrapper = styled(Form)`
  margin-top: 35px;
  padding: 10px;
`;

const LoginForm = () => {
  const dispatch = useDispatch();
  const { logInLoading, logInError } = useSelector((state) => state.user);
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  useEffect(() => {
    if (logInError) {
      alert(logInError);
    }
  }, [logInError]);

  const onSubmitForm = useCallback(() => {
    console.log(email, password);
    dispatch(loginRequestAction({ email, password }));
  }, [email, password]);

  return (
    <FormWrapper onFinish={onSubmitForm}>
      <div>
        <br />
        <Input name="user-email" type="email" value={email} onChange={onChangeEmail} placeholder="E-mail" required />
      </div>
      <ButtonWrapper>
        <Input
          name="user-password"
          type="password"
          value={password}
          onChange={onChangePassword}
          placeholder="Password"
          required
        />
      </ButtonWrapper>
      <ButtonWrapper>
        <Link href="/signup"><a><Button shape="round" type="primary" block>가입하기</Button></a></Link>
      </ButtonWrapper>
      <ButtonWrapper>
        <Button shape="round" htmlType="submit" loading={logInLoading} block>로그인</Button>
      </ButtonWrapper>
    </FormWrapper>
  );
};

export default LoginForm;
