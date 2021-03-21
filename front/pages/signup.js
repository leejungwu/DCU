import React, { useCallback, useState, useEffect } from 'react';
import { Button, Checkbox, Form, Input } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link'
import Head from 'next/head';
import Router from 'next/router';
import axios from 'axios';
import { END } from 'redux-saga';

import { LOAD_MY_INFO_REQUEST, SIGN_UP_REQUEST } from '../reducers/user';
import useInput from '../hooks/useInput';
import AppLayout from '../components/AppLayout';
import wrapper from '../store/configureStore';

const layout = {
  labelCol: {
    span: 5,
  },
  wrapperCol: {
    span: 16,
  },
};

const Signup = () => {
  const [passwordCheck, setPasswordCheck] = useState('');
  const [term, setTerm] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [termError, setTermError] = useState(false);

  const [email, onChangeEmail] = useInput('');
  const [nick, onChangeNick] = useInput('');
  const [password, onChangePassword] = useInput('');
  const dispatch = useDispatch();
  const { me, signUpDone, signUpError, signUpLoading } = useSelector((state) => state.user);

  useEffect(() => {
    if (me && me.id) {
      Router.replace('/');
    }
  }, [me && me.id]);

  useEffect(() => {
    if (signUpDone) {
      Router.replace('/');
    }
  }, [signUpDone]);

  useEffect(() => {
    if (signUpError) {
      alert(signUpError);
    }
  }, [signUpError]);

  const onSubmit = useCallback(() => {
    if (password !== passwordCheck) {
      return setPasswordError(true);
    }
    if (!term) {
      return setTermError(true);
    }
    return dispatch({
      type: SIGN_UP_REQUEST,
      data: {
        email,
        password,
        nickname: nick,
      },
    });
  }, [email, nick, password, passwordCheck, term]);

  const onChangePasswordCheck = useCallback((e) => {
    setPasswordError(e.target.value !== password);
    setPasswordCheck(e.target.value);
  }, [password]);

  const onChangeTerm = useCallback((e) => {
    setTermError(false);
    setTerm(e.target.checked);
  }, []);

  return (
    <AppLayout>
      <Head>
        <title>회원가입 | NodeBird</title>
      </Head>
      <Form onFinish={onSubmit} style={{ padding: 10 }} {...layout}>
        <Form.Item
        label="E-mail"
        name="E-mail"
        >
          <Input name="user-email" value={email} required onChange={onChangeEmail} />
        </Form.Item>

        <Form.Item
        label="Nickname"
        name="Nickname"
        >
          <Input name="user-nick" value={nick} required onChange={onChangeNick} />
        </Form.Item>

        <Form.Item
        label="password"
        name="password"
        >
          <Input name="user-password" value={password} required onChange={onChangePassword} />
        </Form.Item>
        
        <Form.Item
        label="password-check"
        name="password-check"
        >
          <Input name="user-check" value={passwordCheck} required onChange={onChangePasswordCheck} />
          {passwordError && <div style={{ color: 'red' }}>비밀번호가 일치하지 않습니다.</div>}
          <div>비밀번호는 랜덤 솔트 sha512 방식으로 암호화되어 운영자도 알 수 없습니다. </div>
          <br/>
          <div>
            <Checkbox name="user-term" checked={term} onChange={onChangeTerm}><Link href="/terms.html"><a>약관</a></Link>에 동의합니다.</Checkbox>
            {termError && <div style={{ color: 'red' }}>약관에 동의하셔야 합니다.</div>}
          </div>
          <div style={{ marginTop: 10, }}>
            <Button type="primary" htmlType="submit" loading={signUpLoading}>가입하기</Button>
          </div>
        </Form.Item>
        
      </Form>
    </AppLayout>
  );
};

export const getServerSideProps = wrapper.getServerSideProps(async (context) => {
  console.log('getServerSideProps start');
  console.log(context.req.headers);
  const cookie = context.req ? context.req.headers.cookie : '';
  axios.defaults.headers.Cookie = '';
  if (context.req && cookie) {
    axios.defaults.headers.Cookie = cookie;
  }
  context.store.dispatch({
    type: LOAD_MY_INFO_REQUEST,
  });
  context.store.dispatch(END);
  console.log('getServerSideProps end');
  await context.store.sagaTask.toPromise();
});

export default Signup;
