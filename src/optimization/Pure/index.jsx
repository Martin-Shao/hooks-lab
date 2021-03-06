import React, { Component } from 'react'

import PrimitiveList from './PrimitiveList'

export default class ParentRc extends Component {

  state = {
    count: 10,
    dark: false
  }

  handleCountChange = () => this.setState({ count: this.state.count + 1 })

  render() {
    const { count, dark } = this.state
    const theme = {
      backgroundColor: dark ? '#333' : '#FFF',
      color: dark ? '#FFF' : '#333'
    }
    console.info('%cParentRc is rendering...', 'color: #e96a25')
    return (
      <div style={theme}>
        <button onClick={() => this.setState(({ dark: preDark }) => ({ dark: !preDark }))}>Toggle theme</button>
        <button onClick={this.handleCountChange}>Add Count</button>
        <PrimitiveList value={count} />
      </div>
    )
  }
}
