import { Avatar, Icon, Menu, Spin, Modal, Form, Input } from 'antd';
import { FormattedMessage } from 'umi-plugin-react/locale';
import React, { Fragment } from 'react';
import { connect } from 'dva';
// import router from 'umi/router';
import HeaderDropdown from '../HeaderDropdown';
import styles from './index.less';
import AdminLogo from '@/assets/admin.jpg';
import WarpForm from '@/components/WarpForm';
import addItem from './_add';

class AvatarDropdown extends React.Component {
  handleCancel = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'modal/hideModal',
    })
  }


  onMenuClick = event => {
    const { key } = event;
    const { dispatch } = this.props;
    if (key === 'logout') {
      if (dispatch) {
        dispatch({
          type: 'login/logout',
        });
      }

      // return;
    } else if (key === 'password') {
      dispatch({
        type: 'modal/showModal',
        key: 'updatePassword',
      })
    }

    // router.push(`/account/${key}`);
  };

  updatePassword = () => {
    const { dispatch } = this.props;
    this.form.validateFields((errors, values) => {
      if (!errors) {
        dispatch({
          type: 'admin/updatePassword',
          payload: { ...values, username: localStorage.getItem('username') },
        })
      }
    })
  }

  render() {
    const {
      menu,
      global,

    } = this.props;
    const menuHeaderDropdown = (
      <Menu className={styles.menu} selectedKeys={[]} onClick={this.onMenuClick}>
        {menu && (
          <Menu.Item key="center">
            <Icon type="user" />
            <FormattedMessage id="menu.account.center" defaultMessage="account center" />
          </Menu.Item>
        )}
        {menu && (
          <Menu.Item key="settings">
            <Icon type="setting" />
            <FormattedMessage id="menu.account.settings" defaultMessage="account settings" />
          </Menu.Item>
        )}
        {menu && <Menu.Divider />}
        <Menu.Item key="password">
          <Icon type="lock" />
          修改密码
        </Menu.Item>
        <Menu.Item key="logout">
          <Icon type="logout" />
          <FormattedMessage id="menu.account.logout" defaultMessage="logout" />
        </Menu.Item>
      </Menu>
    );
    return <Fragment>
      {localStorage.getItem('username') ? (
      <HeaderDropdown overlay={menuHeaderDropdown}>
        <span className={`${styles.action} ${styles.account}`}>
          <Avatar size="small" className={styles.avatar} src={AdminLogo} alt="avatar" />
          <span className={styles.name}>{localStorage.getItem('username')}</span>
        </span>
      </HeaderDropdown>
      ) : (
      <Spin
        size="small"
        style={{
          marginLeft: 8,
          marginRight: 8,
        }}
      />
    )
      }


      <Modal
        title="修改密码"
        visible={global.modal.modalShow && global.modal.modalShow.updatePassword}
        onCancel={this.handleCancel}
        onOk={this.updatePassword}
        destroyOnClose
        maskClosable={false}
      >
        <WarpForm formItem={addItem} ref={form => { this.form = form }} />
      </Modal>

    </Fragment>
  }
}

export default connect(global => ({
global,

}))(AvatarDropdown);
