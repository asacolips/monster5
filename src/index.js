import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Monster Calculation
// http://blogofholding.com/?p=7338

// Define elements for ouput. Each element includes
// a method to calculate the numeric modifier based on
// the size string (e.g. "smaller" = -2), a method to
// calculate the final value, and the output markup.
class HitPoints extends React.Component {
  calculateMod(mod) {
    if (mod === 'smaller') {
      return -0.5;
    }
    else if (mod === 'small') {
      return -0.25;
    }
    else if (mod === 'large') {
      return 0.25;
    }
    else if (mod === 'larger') {
      return 0.5;
    }
    else {
      return 0;
    }
  }

  calculate(value, modifier) {
    if (Number.isNaN(modifier)) {
      modifier = 0;
    }

    const base_hp = 15 * value;

    return Math.round(base_hp + (base_hp * modifier));
  }

  render() {
    const modifier = this.calculateMod(this.props.mod);
    return (
      <div><strong>HP:</strong> {this.calculate(this.props.cr, modifier)}</div>
    )
  }
}

class ArmorClass extends React.Component {
  calculateMod(mod) {
    if (mod === 'smaller') {
      return -2;
    }
    else if (mod === 'small') {
      return -1;
    }
    else if (mod === 'large') {
      return 1;
    }
    else if (mod === 'larger') {
      return 2;
    }
    else {
      return 0;
    }
  }

  calculate(value, modifier) {
    if (Number.isNaN(modifier)) {
      modifier = 0;
    }

    return Math.round(13 + (value / 3)) + modifier;
  }

  render() {
    const modifier = this.calculateMod(this.props.mod);
    return (
      <div><strong>AC:</strong> {this.calculate(this.props.cr, modifier)}</div>
    )
  }
}

class Attack extends React.Component {
  calculateMod(mod) {
    if (mod === 'smaller') {
      return -2;
    }
    else if (mod === 'small') {
      return -1;
    }
    else if (mod === 'large') {
      return 1;
    }
    else if (mod === 'larger') {
      return 2;
    }
    else {
      return 0;
    }
  }

  calculate(value, modifier) {
    return Math.round(4 + (value / 2)) + modifier;
  }

  render() {
    const mod = this.calculateMod(this.props.mod);
    return (
      <div><strong>Attack:</strong> +{this.calculate(this.props.cr, mod)}</div>
    )
  }
}

class Damage extends React.Component {
  calculateMod(mod) {
    if (mod === 'smaller') {
      return -0.5;
    }
    else if (mod === 'small') {
      return -0.25;
    }
    else if (mod === 'large') {
      return 0.25;
    }
    else if (mod === 'larger') {
      return 0.5;
    }
    else {
      return 0;
    }
  }

  calculate(value, modifier) {
    if (Number.isNaN(modifier)) {
      modifier = 0;
    }

    const base_damage = 5 * value;

    return Math.round(base_damage + (base_damage * modifier));
  }

  render() {
    const mod = this.calculateMod(this.props.mod);
    return (
      <div><strong>Damage:</strong> {this.calculate(this.props.cr, mod)}</div>
    )
  }
}

class DifficultyClass extends React.Component {
  calculateMod(mod) {
    if (mod === 'smaller') {
      return -2;
    }
    else if (mod === 'small') {
      return -1;
    }
    else if (mod === 'large') {
      return 1;
    }
    else if (mod === 'larger') {
      return 2;
    }
    else {
      return 0;
    }
  }

  calculate(value, modifier) {
    return Math.round(11 + (value / 2)) + modifier;
  }

  render() {
    const mod = this.calculateMod(this.props.mod);
    return (
      <div><strong>Save DC:</strong> {this.calculate(this.props.cr, mod)}</div>
    )
  }
}

class Save extends React.Component {
  calculateMod(mod) {
    if (mod === 'smaller') {
      return -2;
    }
    else if (mod === 'small') {
      return -1;
    }
    else if (mod === 'large') {
      return 1;
    }
    else if (mod === 'larger') {
      return 2;
    }
    else {
      return 0;
    }
  }

  calculate(value, modifier) {
    return Math.round(3 + (value / 2)) + modifier;
  }

  render() {
    const mod = this.calculateMod(this.props.mod);
    return (
      <div><strong>Save:</strong> +{this.calculate(this.props.cr, mod)}</div>
    )
  }
}

// Main CR input element.
class ChallengeRatingInput extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onChangeEvent(e);
  }

  render() {
    const value = this.props.value;
    const name = this.props.name;
    return (
      <div>
        <legend>Enter CR:</legend>
        <input type="number" name={name} value={value}
          onChange={this.handleChange} />
      </div>
    );
  }
}

// Generic select element with the options relating to size.
class ModifierSelect extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  // Pass the event on change.
  handleChange(e) {
    this.props.onChangeEvent(e);
  }

  // Render select markup.
  render() {
    const value = this.props.value
    const name = this.props.name
    return (
      <div>
        <label>
          {this.props.label}:
          <select name={name} value={value} onChange={this.handleChange}>
            <option value="smaller">Smaller</option>
            <option value="small">Small</option>
            <option value="">Standard</option>
            <option value="large">Large</option>
            <option value="larger">Larger</option>
          </select>
        </label>
      </div>
    );
  }
}

class Monster extends React.Component {
  constructor(props) {
    super(props);
    // Define change handler.
    this.handleChange = this.handleChange.bind(this);
    // Define states.
    this.state = {
      cr: '1',
      mod: '',
      modHp: '',
      modAc: '',
      modAttack: '',
      modDamage: '',
      modDc: '',
      modSave: ''
    };
  }

  // Generic state change handler.
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render() {
    // Map states to constants.
    const cr = this.state.cr;
    const modHp = this.state.modHp;
    const modAc = this.state.modAc;
    const modAttack = this.state.modAttack;
    const modDamage = this.state.modDamage;
    const modDc = this.state.modDc;
    const modSave = this.state.modSave;

    return (
      <div>
        {/* Build inputs to collect values. Each value maps a
        generic prop (e.g. value) to a specific state (e.g. cr). */}
        <fieldset>
          <ChallengeRatingInput
            value={cr}
            name="cr"
            onChangeEvent={this.handleChange} />
          <ModifierSelect
            value={modHp}
            name="modHp"
            label="Modify HP"
            onChangeEvent={this.handleChange} />
          <ModifierSelect
            value={modAc}
            name="modAc"
            label="Modify AC"
            onChangeEvent={this.handleChange} />
          <ModifierSelect
            value={modAttack}
            name="modAttack"
            label="Modify Attack Bonus"
            onChangeEvent={this.handleChange} />
          <ModifierSelect
            value={modDamage}
            name="modDamage"
            label="Modify Damage"
            onChangeEvent={this.handleChange} />
          <ModifierSelect
            value={modDc}
            name="modDc"
            label="Modify Save DC"
            onChangeEvent={this.handleChange} />
          <ModifierSelect
            value={modSave}
            name="modSave"
            label="Modify Saving Throw Bonus"
            onChangeEvent={this.handleChange} />
        </fieldset>
        {/* Build markup to output values. */}
        <HitPoints
          cr={cr}
          mod={modHp} />
        <ArmorClass
          cr={cr}
          mod={modAc} />
        <Attack
          cr={cr}
          mod={modAttack} />
        <Damage
          cr={cr}
          mod={modDamage} />
        <DifficultyClass
          cr={cr}
          mod={modDc} />
        <Save
          cr={cr}
          mod={modSave} />
      </div>
    );
  }
}

ReactDOM.render(
  <Monster />,
  document.getElementById('root')
);
