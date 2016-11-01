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
      displayMessage: ''
    }
  }

  submitNumber(guess) {
    let {randomNumber, min, max} = this.state;
    if (guess > max || guess < min) {
      return this.displayMessage(`Number must be between ${min} and ${max}`)
    }
    if (guess > randomNumber) {
      return this.displayMessage('Your number is to high!');
    }
    if (guess < randomNumber) {
      return this.displayMessage('Your number is to low!');
    }
    this.displayMessage('Your number is correct! Guess Again!');
    this.setState({ min: min -= 10, max: max += 10 });
    this.resetGame();
  }

  resetGame() {
    this.setState({
      randomNumber: this.randomNumber()
    });
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

  displayMessage(text) {
    this.setState({displayMessage: text});
  }

  render() {
    return (
      <section>
      {this.state.guess}
      <span>{this.state.displayMessage}</span>
         <InputField grabNumber={this.submitNumber.bind(this)}/>
         <ActiveButton handleClick={this.resetGame.bind(this)} text='Reset Game'/>
         <RangeInput handleRange={this.handleRange.bind(this)} name='max' value={this.state.max}/>
         <RangeInput handleRange={this.handleRange.bind(this)} name='min' value={this.state.min} />
      </section>
    );
  }
}


ReactDOM.render(<App />, document.querySelector('.application'));
