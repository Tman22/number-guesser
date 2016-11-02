const React = require('react');
const ReactDOM = require('react-dom');
import { ActiveButton, RangeInput } from './buttons';
import InputField from './inputField';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      randomNumber: this.randomNumber(),
      min: 0,
      max: 100,
      displayMessage: '',
      guess: ''
    }
  }

  submitNumber(guess) {
    let {randomNumber, min, max} = this.state;
    this.setState({guess: guess})
    if (guess > max || guess < min) {
      return   this.setState({displayMessage: `Number must be between ${min} and ${max}`})
    }
    if (guess > randomNumber) {
      return   this.setState({displayMessage: 'Your number is to high!'});
    }
    if (guess < randomNumber) {
      return   this.setState({displayMessage: 'Your number is to low!'});
    }
    this.setState({ min: min -= 10, max: max += 10, randomNumber: this.randomNumber(), displayMessage: 'Your number is correct! Guess Again!' });
  }

  handleRange(e) {
    let {name, value} = e.target;
    value = parseInt(value);
    this.setState({[name]: isNaN(value) ? 0 : value, randomNumber: this.randomNumber()});
  }

  randomNumber() {
    let {min, max} = this.state || {min: 0, max: 100};
    return Math.floor(Math.random() * (max - min)) + min;
  }

  resetGame() {
    this.setState({
      randomNumber: this.randomNumber(),
      guess: '',
      displayMessage: ''
    })
  }

  render() {
    return (
      <section>
      <h2>{this.state.guess}</h2>
      <span>{this.state.displayMessage}</span>
         <InputField grabNumber={this.submitNumber.bind(this)}/>
         <ActiveButton
                  handleClick={this.resetGame.bind(this)}
                  text='Reset Game'
                  disabled={!this.state.guess}/>
         <RangeInput handleRange={this.handleRange.bind(this)} name='max' value={this.state.max}/>
         <RangeInput handleRange={this.handleRange.bind(this)} name='min' value={this.state.min} />
      </section>
    );
  }
}


ReactDOM.render(<App />, document.querySelector('.application'));
