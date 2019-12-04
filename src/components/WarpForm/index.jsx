import React, { PureComponent } from 'react';
import { Form, Row, Col, Button } from 'antd';
/**
 * 表单组件
 */
@Form.create()
class WarpForm extends PureComponent {
  render() {
    const { form, formItem, children } = this.props;
    // console.log(formItem)
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
    return (
      <Form >
        <Row gutter={24} >

          {formItem.map(item => (
            <Col key={item.name} xs={24} sm={12} md={{ span: 5 }} lg={{ span: 5 }} >
              <Form.Item label={item.label}>
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
            {/* <Form.Item >
              <Button type="primary" onClick={this.handleSearch}>
                搜索
            </Button>
            </Form.Item> */}


          </Row>

      </Form>
    )
  }
}

export default WarpForm;
