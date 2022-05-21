# react 清单

## componentWillUpdate

> ⚠️ 这个生命周期函数 将在 react 17.x 废弃

该钩子会传入两个参数 一个是``nextProps`, 一个是`nextState`而且需要返回一个 bool 值 如果需要更新 state 来更新组件 则需要更新的是 nextState 上的 state 的值 不然会陷入死循环

```js
  componentWillUpdate(nextProps, nextState) {
    try {
      if (!this.state.isOnceUpdate && nextProps.data.saleType) {
        // DONE: 新增和编辑调用的接口 订单类型接口根据销售类型的字段获取
        if (nextProps.type == "edit") {
          //TODO: Action 和 setFieldsValue 都是 异步更新
          // 请求获取订单类型接口
          const saleType = nextProps.data.saleType;
          nextState.isOnceUpdate = true;
          this.formatFileUpload(nextProps.data.fileUploadList, nextState);
          this.getOrderTypes({ code: saleType });
        } else if (nextProps.type == "detail") {
          nextState.isFileUploadVisible = nextProps.data.isShowFileUpload;
          this.formatFileUpload(nextProps.data.fileUploadList, nextState);
          nextState.isOnceUpdate = true;
        }
      }
    } catch (e) {
      console.log(e);
    }
    return true;
  }
```

## getSnapshotBeforeUpdate

此生命周期方法的任何返回值将作为参数传递给 componentDidUpdate()

如果没有声明 componentDidUpdate() 则会报错

```js
import React, { Component } from 'react'

export default class TestComponentHooks extends Component {
  constructor() {
    super()
    this.state = {
      count: 0,
    }
  }
  // 测试生命周期钩子接收的参数
  // prevProps 上一次的props this.state
  // prevState 上一次的state this.state 是当前的state
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('getSnapshotBeforeUpdate', prevProps, this.props)
    console.log('getSnapshotBeforeUpdate', prevState, this.state)
    if (this.state.count < 50) {
      return {
        count: this.state.count + 1,
      }
    }
    return null
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('componentDidUpdate', prevProps, prevState, snapshot)
    if (snapshot) {
      this.setState(snapshot)
    }
  }
  render() {
    return <div>test component hooks</div>
  }
}
```

> [react getSnapshotBeforeUpdate](https://zh-hans.reactjs.org/docs/react-component.html#getsnapshotbeforeupdate)

## react 15 - 16 更新

> [组件生命周期](https://www.cnblogs.com/cc-freiheit/p/10009608.html)
