import { Component } from 'react'

class Resizable extends Component {

  state = {
    size: [window.innerWidth, window.innerHeight]
  };

  onResize = () => {
    this.setState({
      size: [window.innerWidth, window.innerHeight]
    })
  }

  componentDidMount() {
    window.addEventListener('resize', this.onResize)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.onResize)
  }
  
  render() {
    return this.props.render(this.state.size)
  }
}

export default Resizable;
