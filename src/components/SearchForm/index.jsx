import React, { PureComponent, Fragment } from 'react';
import WarpForm from '@/components/WarpForm';
import { Row, Col, Button, Icon } from 'antd';

class SearchForm extends PureComponent {
  state = {
    expand: false,
  };

  componentDidMount() {
    const { searchItem } = this.props;
    if (searchItem > 4) {
      this.setState({ expand: false })
    }
  }

  handleSearch = () => {
    this.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  };

  handleReset = () => {
    this.form.resetFields();
  };


  toggle = () => {
    const { expand } = this.state;
    this.setState({ expand: !expand });
  };

  render() {
    const { searchItem } = this.props;

    return (
    <Fragment>
        <WarpForm formItem={this.state.expand ? searchItem : searchItem.slice(0, 4)} ref={form => { this.form = form }}>

          <Col xs={24} sm={12} md={{ span: 6 }} lg={{ span: 6 }} style={{ paddingTop: '3px' }}>
              <Button type="primary" onClick={this.handleSearch}>
                搜索
            </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>
                重置
            </Button>
              <a style={{ marginLeft: 8, fontSize: 12, display: searchItem.length <= 4 ? 'none' : 'inline' }} onClick={this.toggle}>
                高级搜索 <Icon type={this.state.expand ? 'up' : 'down'} />
              </a>
            </Col>

        </WarpForm>

    </Fragment>
    )
  }
}

export default SearchForm;
