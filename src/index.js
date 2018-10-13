import React from 'react'
import ReactDom from 'react-dom'
// import Hello from './components/Hello/index'
import getRouter from './router/router'

if (module.hot) {
  module.hot.accept(() => {
    ReactDom.render(getRouter(), document.getElementById('app'))
  })
}

ReactDom.render(getRouter(), document.getElementById('app'))
