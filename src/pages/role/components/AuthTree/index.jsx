import React, { PureComponent } from 'react';
import { Tree } from 'antd';

const { TreeNode } = Tree;

/**
 * 菜单权限
 */
class AuthTree extends PureComponent {
  renderTreeNodes = data =>
    data.map(item => {
      if (item.children) {
        return (
          <TreeNode title={item.name} key={item.code} >
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode key={item.code} title={item.name} />;
    });

  render() {
    const { menuPermissions, roleKeys, self } = this.props;
    // console.log(roleKeys)
    return <Tree
      checkable
      defaultExpandAll
      onCheck={self.onMenuCheck}
      checkedKeys={roleKeys}

    >
      {this.renderTreeNodes(menuPermissions)}
    </Tree>;
}
}

export default AuthTree;
