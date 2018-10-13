import React, { Component } from 'react'

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0
    }
  }

  handleClick = () => {
    this.setState({
      count: this.state.count + 1
    })
  }
  render() {
    return (
      <div>
        this is home~<br />
        当前计数：{this.state.count}
        <br />
        <button onClick={() => this.handleClick()}>自增1</button>
      </div>
    )
  }
}
