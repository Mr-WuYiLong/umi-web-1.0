import React, { PureComponent } from 'react';
import { Form } from 'antd';

/**
 * 表单组件
 */
@Form.create()
class WarpForm extends PureComponent {
  render() {
    const { getFieldDecorator } = this.props.form;
    const { formItem } = this.props;
    // const formItemLayout = {
    //   labelCol: {
    //     xs: { span: 24 },
    //     sm: { span: 4 },
    //   },
    //   wrapperCol: {
    //     xs: { span: 24 },
    //     sm: { span: 19 },
    //   },
    // };
    return (
      <Form>
        {
          formItem.map(item => (
            <Form.Item key={item.name} >
              {getFieldDecorator(item.name, {
                ...item.extra,
              })(
                item.content,
              )}
            </Form.Item>
            ),
          )
        }
      </Form>
    )
  }
}

export default WarpForm;
