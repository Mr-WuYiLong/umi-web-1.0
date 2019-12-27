import React, { PureComponent } from 'react';
import { Form, Row, Col } from 'antd';
/**
 * 表单组件
 */
@Form.create()
class WarpForm extends PureComponent {
  render() {
    const { form, formItem, children, type } = this.props;

    const { getFieldDecorator } = form;
    // const formItemLayout = {
    //   labelCol: {
    //     // xs: { span: 4 },
    //     // sm: { span: 4 },
    //     // md: { span: 4 },
    //   },
    //   wrapperCol: {
    //     xs: { span: 24 },
    //     sm: { span: 4 },
    //     md: { span: 4 },
    //   },
    // };

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
    };

    return (
      <Form >
        {type === 'search' ?
          <Row gutter={24} >

          {formItem.map(item => (
            <Col key={item.name} xs={24} sm={12} md={{ span: 5 }} lg={{ span: 5 }} >
              <Form.Item label={item.label} >
                {getFieldDecorator(item.name, {
                  ...item.extra,
                })(
                  item.content,
                )}
              </Form.Item>
            </Col>
          ),
          )}
        {children}
          </Row>
          : formItem.map(item => (
            <Form.Item {...formItemLayout} key={item.name} label={item.label}>
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


// eslint-disable-next-line no-lone-blocks
{ /* <Row gutter={24} >

  {formItem.map(item => (
    <Col key={item.name} xs={24} sm={12} md={{ span: 5 }} lg={{ span: 5 }} >
      <Form.Item label={item.label} >
        {getFieldDecorator(item.name, {
          ...item.extra,
        })(
          item.content,
        )}
      </Form.Item>
    </Col>
  ),
  )}
  {children}


</Row> */ }
