import React, { PureComponent } from 'react';
import { Modal } from 'antd';
import { connect } from 'dva';
import WarpForm from '@/components/WarpForm';

class ModalForm extends PureComponent {
  render() {
    const { modalItem, visible } = this.props;
    return (
      <Modal
        title="新增权限"
        visible={visible}
        onOk={this.handleOk}
        onCancel={this.handleCancel}
        destroyOnClose
        maskClosable={false}
      >

        <WarpForm formItem={modalItem} ref={form => { this.form = form }} />

      </Modal>
    )
  }
}

export default ModalForm;
