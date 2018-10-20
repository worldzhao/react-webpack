import React, { Component } from 'react'
import axios from 'axios'
import Hello from 'components/Hello'
import './index.less'
export default class Page1 extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: null
    }
  }
  handleRequest = () => {
    axios.get('/api/user').then(res => this.setState({ data: res.data }))
  }
  render() {
    return (
      <>
        <Hello />
        <div id="demo-test">this is Page1~234</div>
        <button onClick={this.handleRequest}>发送请求</button>
        <h2>{JSON.stringify(this.state.data)}</h2>
      </>
    )
  }
}
