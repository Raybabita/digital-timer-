// Write your code here
import {Component} from 'react'
import './index.css'

const initialState = {
  isTimerRunning: false,
  timeElapsedInSecond: 0,
  timeElapsedInMinute: 25,
}

class DigitalTimer extends Component {
  state = initialState

  componentWillUnmount() {
    this.clearTimerInterval()
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  onDecreaseTimeLimitInMinutes = () => {
    const {timeElapsedInMinute} = this.state

    if (timeElapsedInMinute > 1) {
      this.setState(preState => ({
        timeElapsedInMinute: preState.timeElapsedInMinute - 1,
      }))
    }
    console.log(timeElapsedInMinute)
  }

  onIncreaseTimeLimitInMinutes = () => {
    const {timeElapsedInMinute} = this.state
    this.setState(preState => ({
      timeElapsedInMinute: preState.timeElapsedInMinute + 1,
    }))
    console.log(timeElapsedInMinute)
  }

  renderTimerLimitController = () => {
    const {timeElapsedInMinute, timeElapsedInSecond} = this.state
    const isButtonDisable = timeElapsedInSecond > 0

    return (
      <div className="timer-limit-controller-container">
        <p className="set-timer-text">Set Timer Limit</p>
        <div className="timer-limit-container">
          <button
            disabled={isButtonDisable}
            onClick={this.onDecreaseTimeLimitInMinutes}
            className="limit-controller-btn"
            type="button"
          >
            -
          </button>
          <div className="timer-label-limit-container">
            <p className="limit-value">{timeElapsedInMinute}</p>
          </div>

          <button
            disabled={isButtonDisable}
            onClick={this.onIncreaseTimeLimitInMinutes}
            className="limit-controller-btn"
            type="button"
          >
            +
          </button>
        </div>
      </div>
    )
  }

  onResetTimer = () => {
    this.setState(initialState)
    this.clearTimerInterval()
  }

  incrementTimeElapsedInSecond = () => {
    const {timeElapsedInMinute, timeElapsedInSecond} = this.state
    const isTimeComplete = timeElapsedInMinute * 60 === timeElapsedInSecond
    console.log(isTimeComplete)
    if (isTimeComplete) {
      this.clearTimerInterval()
      this.setState({isTimerRunning: false})
    } else {
      this.setState(preState => ({
        timeElapsedInSecond: preState.timeElapsedInSecond + 1,
      }))
    }
  }

  onStartOrPause = () => {
    const {
      isTimerRunning,
      timeElapsedInMinute,
      timeElapsedInSecond,
    } = this.state

    const isTimerCompleted = timeElapsedInMinute * 60 === timeElapsedInSecond

    if (isTimerCompleted) {
      this.setState({timeElapsedInSecond: 0})
    }
    if (isTimerRunning) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementTimeElapsedInSecond, 1000)
    }
    this.setState(preState => ({isTimerRunning: !preState.isTimerRunning}))
  }

  renderTimerController = () => {
    const {isTimerRunning} = this.state

    const startOrPauseImageUrl = isTimerRunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'

    const startOrPausedAltText = isTimerRunning ? 'pause icon' : 'play icon'

    return (
      <div className="timer-controller-container">
        <button
          onClick={this.onStartOrPause}
          className="timer-controller-btn"
          type="button"
        >
          <img
            src={startOrPauseImageUrl}
            className="timer-controller-icon"
            alt={startOrPausedAltText}
          />
          <p className="timer-controller-label">
            {isTimerRunning ? 'Pause' : 'Start'}
          </p>
        </button>
        <button
          onClick={this.onResetTimer}
          className="timer-controller-btn"
          type="button"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png"
            className="timer-controller-icon"
            alt="reset icon"
          />
          <p className="timer-controller-label">Reset</p>
        </button>
      </div>
    )
  }

  getElapsedSecondInTimeFormat = () => {
    const {timeElapsedInSecond, timeElapsedInMinute} = this.state

    const totalRemainingSecond = timeElapsedInMinute * 60 - timeElapsedInSecond

    const minutes = Math.floor(totalRemainingSecond / 60)
    const seconds = Math.floor(totalRemainingSecond % 60)

    const stringifiedMinutes = minutes > 9 ? minutes : `0${minutes}`
    const stringifiedSeconds = seconds > 9 ? seconds : `0${seconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {isTimerRunning} = this.state
    const labelText = isTimerRunning ? 'Running' : 'Paused'
    return (
      <div className="app-container">
        <h1 className="heading">Digital timer</h1>
        <div className="digital-timer-container">
          <div className="display-timer-container">
            <div className="elapsed-time-container">
              <h1 className="timer-state">
                {this.getElapsedSecondInTimeFormat()}
              </h1>
              <p className="timer-state">{labelText}</p>
            </div>
          </div>
          <div className="controls-container">
            {this.renderTimerController()}
            {this.renderTimerLimitController()}
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
