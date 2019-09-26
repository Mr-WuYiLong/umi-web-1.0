import React, { PureComponent } from 'react';
import WarpForm from '@/components/WarpForm';
import { Button } from 'antd';
import styles from './index.less';
import formItem from './_item';

class Login extends PureComponent {
  render() {
    return (
      <div className={styles.middle}>
        <WarpForm formItem={formItem}/>
        <Button size="large" type="primary" block>登录</Button>
      </div>

    )
  }
}

export default Login;
