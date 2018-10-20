import React, { Component } from 'react'
import axios from 'axios'
import Hello from 'components/Hello'
import './index.less'
export default class Page1 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      mockData: null,
      proxyData: null
    }
  }

  handleMockRequest = () => {
    axios.get('/api/user').then(res => this.setState({ mockData: res.data }))
  }

  handleProxyRequest = () => {
    axios
      .get('/api/xiandu/categories')
      .then(res => this.setState({ proxyData: res.data }))
  }

  render() {
    return (
      <>
        <Hello />
        <div id="demo-test">this is Page1~234</div>
        <button onClick={this.handleMockRequest}>发送获取Mock数据的请求</button>
        <h4>{JSON.stringify(this.state.mockData)}</h4>
        <button onClick={this.handleProxyRequest}>
          发送获取代理数据的请求
        </button>
        <h4>{JSON.stringify(this.state.proxyData)}</h4>
      </>
    )
  }
}
