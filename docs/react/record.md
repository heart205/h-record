# react 清单

## componentWillUpdate

该钩子会传入两个参数 一个是``preState`, 一个是`nextState`而且需要返回一个 bool 值 如果需要更新 state 来更新组件 则需要更新的是 nextState 上的 state 的值 不然会陷入死循环

```js
		componentWillUpdate(preState, nextState) {
      if (!this.state.isOnceUpdate && this.props.data.saleType) {
        if (this.props.type == "edit") {
          // 请求获取订单类型接口
          const saleType = this.props.data.saleType;
          nextState.isOnceUpdate = true;
          this.formatFileUpload(this.props.data.fileUploadList,nextState);
          this.getOrderTypes({ code: saleType });
        } else if (this.props.type == "detail") {
          nextState.isFileUploadVisible = this.props.data.isShowFileUpload;
          this.formatFileUpload(this.props.data.fileUploadList, nextState);
          nextState.isOnceUpdate = true;
        }
      }
    }
    return true;
  }
```
