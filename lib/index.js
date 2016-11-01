const React = require('react');
const ReactDOM = require('react-dom');

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      guess: null,
      randomNumber: this.randomNumber(),
      min: 0,
      max: 100,
      displayMessage: ''
    }
  }

  submitNumber(guess) {
    let {randomNumber, min, max} = this.state;
    this.setState({guess: guess});
    if (guess > randomNumber) {
      return this.displayMessage('Your number is to high!');
    }
    if (guess < randomNumber) {
      return this.displayMessage('Your number is to low!');
    }
    this.displayMessage('Your number is correct! Guess Again!');
    this.setState({min: min -= 10, max: max += 10})
    this.resetGame();
  }

  resetGame() {
    this.setState({
      guess: null,
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

const RangeInput = ({name, handleRange, value}) => {
  return (
    <input type='number' value={value} onChange={(e)=>handleRange(e)} name={name}/>
  );
}

class InputField extends React.Component {
  constructor() {
    super();
    this.state = {guess: '', errorMessage: false}
  }

  handleClick() {
    let guess = parseInt(this.state.guess);
    if (guess) {
      this.props.grabNumber(guess);
      return this.clearField();
    }
    this.setState({errorMessage: true})
  }

  clearField() {
    this.setState({guess: '', errorMessage: false});
  }

  render() {
    let errorMessage;
    if (this.state.errorMessage) {
      errorMessage = <span>Must submit a number</span>
    }
    return (
      <section>
        {errorMessage}
        <input type='text'
               value={this.state.guess}
               onChange={(e)=>{this.setState({guess: e.target.value})}}
        />
        <ActiveButton handleClick={this.handleClick.bind(this)} text='Submit'/>
        <ActiveButton handleClick={this.clearField.bind(this)} text='Clear'/>
      </section>
    );
  }
}

const ActiveButton = ({handleClick, text}) => {
  return (
    <button onClick={() => handleClick() } >{text}</button>
  );
}

ReactDOM.render(<App />, document.querySelector('.application'));
