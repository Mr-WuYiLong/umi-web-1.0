import { Alert } from 'antd';
import React, { Component } from 'react';
import { connect } from 'dva';
import LoginComponents from './components/Login';
import styles from './style.less';

const { Tab, UserName, Password, Submit } = LoginComponents;

@connect(({ login, loading }) => ({
  userLogin: login,
  submitting: loading.effects['login/login'],
}))
class Login extends Component {
  loginForm = undefined;

  state = {
    type: 'account',
  };

  handleSubmit = (err, values) => {
    const { type } = this.state;

    if (!err) {
      const { dispatch } = this.props;
      dispatch({
        type: 'login/login',
        payload: { ...values, type },
      });
    }
  };

  onTabChange = type => {
    this.setState({
      type,
    });
  };

  renderMessage = content => (
    <Alert
      style={{
        marginBottom: 24,
      }}
      message={content}
      type="error"
      showIcon
    />
  );

  render() {
    const { userLogin, submitting } = this.props;
    const { status, type: loginType } = userLogin;
    const { type } = this.state;
    return (
      <div className={styles.main}>
        <LoginComponents
          defaultActiveKey={type}
          onTabChange={this.onTabChange}
          onSubmit={this.handleSubmit}
          onCreate={form => {
            this.loginForm = form;
          }}
        >
          <Tab
            key="account"
            tab="账号密码登录"
          >
            {status === 'error' &&
              loginType === 'account' &&
              !submitting &&
              this.renderMessage(
                '账号密码错误',
              )}
            <UserName
              name="userName"
              placeholder="admin"
              rules={[
                {
                  required: true,
                  message: '用户名不能为空',
                },
              ]}
            />
            <Password
              name="password"
              placeholder="password"
              rules={[
                {
                  required: true,
                  message: '密码不能为空',
                },
              ]}
              onPressEnter={e => {
                e.preventDefault();
                if (this.loginForm) {
                  this.loginForm.validateFields(this.handleSubmit);
                }
              }}
            />
          </Tab>
          <Submit loading={submitting}>
           <span>登录</span>
          </Submit>

        </LoginComponents>
      </div>
    );
  }
}

export default Login;
