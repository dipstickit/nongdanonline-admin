import { useRef, useEffect, useState } from 'react';
import { ProForm, ProFormText } from '@ant-design/pro-components';
import { Button, Card, Row, Col, Typography, message } from 'antd';
import { useLoginMutation } from '../../features/auth/authApi';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login as loginSlice } from '../../features/auth/authSlice';
const { Title } = Typography;

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const emailRef = useRef();
  const errRef = useRef();
  const [email, setEmail] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [login, { isLoading }] = useLoginMutation();

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg('');
  }, [email, pwd]);

  const handleSubmit = async values => {
    try {
      const userData = await login({
        email: values.email,
        password: values.password,
      }).unwrap();

      const { token } = userData.data;
      dispatch(loginSlice({ token }));
      setEmail('');
      setPwd('');
      navigate('/');
      message.success('Login successful!');
    } catch (err) {
      if (!err?.response) {
        setErrMsg('Server is not available');
      } else if (err?.response?.status === 400) {
        setErrMsg('Missing email or password');
      } else if (err?.response?.status === 401) {
        setErrMsg('Invalid email or password');
      } else {
        setErrMsg('Login failed');
      }
      errRef.current?.focus();
    }
  };

  return (
    <Row justify='center' align='middle' style={{ minHeight: '100vh' }}>
      <Col xs={24} sm={16} md={12} lg={8}>
        <Card>
          <Title level={2} style={{ textAlign: 'center' }}>
            Login
          </Title>
          {errMsg && (
            <p
              ref={errRef}
              className='errmsg'
              style={{ color: 'red', textAlign: 'center' }}
            >
              {errMsg}
            </p>
          )}
          <ProForm
            onFinish={handleSubmit}
            submitter={{
              render: () => (
                <Button
                  type='primary'
                  htmlType='submit'
                  loading={isLoading}
                  block
                  style={{ backgroundColor: '#2FB95D' }}
                >
                  Login
                </Button>
              ),
            }}
          >
            <ProFormText
              name='email'
              label='Email'
              placeholder='Please enter your email'
              rules={[{ required: true, message: 'Email is required' }]}
              fieldProps={{
                ref: emailRef,
                value: email,
                onChange: e => setEmail(e.target.value),
              }}
            />
            <ProFormText.Password
              name='password'
              label='Password'
              placeholder='Please enter your password'
              rules={[{ required: true, message: 'Password is required' }]}
              fieldProps={{
                value: pwd,
                onChange: e => setPwd(e.target.value),
              }}
            />
          </ProForm>
        </Card>
      </Col>
    </Row>
  );
};

export default LoginForm;
