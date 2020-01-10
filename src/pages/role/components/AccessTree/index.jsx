import React, { PureComponent } from 'react';
import { Tree } from 'antd';

const { TreeNode } = Tree;

/**
 * 访问权限
 */
class AccessTree extends PureComponent {
  renderTreeNodes = data =>
    data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.name} key={item.id} >
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.id} title={`${item.description}--${item.path}`} />;
    });

  render() {
    const { accessPermissions, accessKeys, self } = this.props;
    return <Tree
      checkable
      defaultExpandAll
      onCheck={self.onAccessCheck}
      checkedKeys={accessKeys}

    >
      {this.renderTreeNodes(accessPermissions)}
    </Tree>;
}
}

export default AccessTree;
