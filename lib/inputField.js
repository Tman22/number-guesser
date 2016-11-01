const React = require('react');
import { ActiveButton } from './buttons';


export default class InputField extends React.Component {
  constructor() {
    super();
    this.state = {guess: '', errorMessage: false}
  }

  handleClick() {
    let guess = parseInt(this.state.guess);
    this.clearField();
    if (guess) {
      this.setState({errorMessage: false})
      return this.props.grabNumber(guess);
    }
    this.setState({errorMessage: true})
  }

  clearField() {
    this.setState({guess: ''});
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
