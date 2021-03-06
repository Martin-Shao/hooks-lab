import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose, lifecycle } from 'recompose'

import WeatherInfo from './WeatherInfo'

import { fetch } from '../../store/actions/weather';

function WeatherFetch({ temperature, windSpeed }) {
  return (
    <WeatherInfo temperature={temperature} windSpeed={windSpeed} />
  )
}

function mapStateToProps(state) {
  console.info(state)
  return {
    temperature: state.weather.temperature,
    windSpeed: state.weather.windSpeed
  };
}



WeatherFetch.propTypes = {
  windSpeed: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  temperature: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
}

export default compose(
  connect(mapStateToProps, { fetch }),
  lifecycle({
    componentDidMount() {
      this.props.fetch();
    }
  })
)(WeatherFetch)

