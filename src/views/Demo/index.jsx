import React, { Component } from 'react'
import axios from 'axios'
import Hello from 'components/Hello'
import './index.less'
export default class Page1 extends Component {
  render() {
    return (
      <>
        <Hello />
        <div id="demo-test">this is Page1~234</div>
      </>
    )
  }
}
