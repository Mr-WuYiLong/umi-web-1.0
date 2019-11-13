import React, { PureComponent, useCallback } from 'react';
import WarpForm from '@/components/WarpForm';
import { Button } from 'antd';
import { connect } from 'dva'
import styles from './index.less';
import formItem from './_item';

/**
 * 登录组件
 */
@connect(({ login, loading }) => ({
    login,
    loading: loading.effects['login/login'],
}))
class Login extends PureComponent {
  // 挂载
  componentDidMount() {
    // enter键盘操作
    onkeydown = e => {
      if (e.keyCode === 13) {
        this.handleLogin()
      }
    }
  }

  // 登录
  handleLogin = () => {
    const { dispatch } = this.props;
    this.form.props.form.validateFields((errors, values) => {
      if (!errors) {
        dispatch({
          type: 'login/login',
          payload: values,
        })
      }
    })
  }

  render() {
    const { loading } = this.props;
    return (
      <div className={styles.middle}>
        <WarpForm formItem={formItem} wrappedComponentRef={form => { this.form = form }}/>
        <Button loading={loading} size="large" type="primary" block onClick={this.handleLogin}>登录</Button>
      </div>
    )
  }
}

export default Login;
