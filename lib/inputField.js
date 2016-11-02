const React = require('react');
import { ActiveButton } from './buttons';


export default class InputField extends React.Component {
  constructor() {
    super();
    this.state = {guess: ''}
  }

  handleClick() {
    let guess = parseInt(this.state.guess);
    this.clearField();
    return this.props.grabNumber(guess);
  }

  clearField() {
    this.setState({guess: ''});
  }

  render() {
    return (
      <section>
        <input type='number'
               value={this.state.guess}
               onChange={(e)=>{this.setState({guess: e.target.value})}}
        />
        <ActiveButton disabled={!this.state.guess} handleClick={this.handleClick.bind(this)} text='Submit'/>
        <ActiveButton disabled={!this.state.guess} handleClick={this.clearField.bind(this)} text='Clear'/>
      </section>
    );
  }
}
