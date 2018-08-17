import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Monster Calculation
// http://blogofholding.com/?p=7338



class HitPoints extends React.Component {
  calculate(value) {
    return 15 * value;
  }

  render() {
    return (
      <div><strong>HP:</strong> {this.calculate(this.props.cr)}</div>
    )
  }
}

class ArmorClass extends React.Component {
  calculate(value) {
    return Math.round(13 + (value / 3));
  }

  render() {
    return (
      <div><strong>AC:</strong> {this.calculate(this.props.cr)}</div>
    )
  }
}

class Attack extends React.Component {
  calculate(value) {
    return Math.round(4 + (value / 2));
  }

  render() {
    return (
      <div><strong>Attack:</strong> +{this.calculate(this.props.cr)}</div>
    )
  }
}

class Damage extends React.Component {
  calculate(value) {
    return 5 * value;
  }

  render() {
    return (
      <div><strong>Damage:</strong> {this.calculate(this.props.cr)}</div>
    )
  }
}

class DifficultyClass extends React.Component {
  calculate(value) {
    return Math.round(11 + (value / 2));
  }

  render() {
    return (
      <div><strong>Save DC:</strong> {this.calculate(this.props.cr)}</div>
    )
  }
}

class Save extends React.Component {
  calculate(value) {
    return Math.round(3 + (value / 2));
  }

  render() {
    return (
      <div><strong>Save:</strong> +{this.calculate(this.props.cr)}</div>
    )
  }
}

class ChallengeRatingInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onCrChange(e.target.value);
  }

  render() {
    const cr = this.props.cr;
    return (
      <fieldset>
        <legend>Enter CR:</legend>
        <input type="number" value={cr}
          onChange={this.handleChange} />
      </fieldset>
    );
  }
}

class Monster extends React.Component {
  constructor(props) {
    super(props);
    this.handleCrChange = this.handleCrChange.bind(this);
    this.state = { cr: '1' };
  }

  handleCrChange(cr) {
    this.setState({ cr });
  }

  render() {
    const cr = this.state.cr;

    return (
      <div>
        <ChallengeRatingInput
          scale="c"
          cr={cr}
          onCrChange={this.handleCrChange} />
        <HitPoints
          cr={cr} />
        <ArmorClass
          cr={cr} />
        <Attack
          cr={cr} />
        <Damage
          cr={cr} />
        <DifficultyClass
          cr={cr} />
        <Save
          cr={cr} />
      </div>
    );
  }
}

ReactDOM.render(
  <Monster />,
  document.getElementById('root')
);
