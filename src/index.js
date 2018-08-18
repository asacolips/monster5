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

  calculateRandomDamage(value, die, swing, multiAttack) {
    var dieCount;
    var dieValue;
    var staticValue;
    var staticDamage;
    var dieDamage;
    var dieOutput;
    var staticOutput;
    var separator;
    var attackOutput;
    var totalValue;

    // Divide attacks.
    totalValue = value;
    value = Math.round(value / multiAttack);

    // Calculate static damage.
    dieCount = 0;
    dieDamage = 0;
    dieValue = (parseInt(die, 10) + 1) / 2;
    staticValue = value * (1 - swing);

    // Loop through and determine random damage.
    while (dieDamage < (value - staticValue)) {
      dieCount++;
      dieDamage += dieValue;
      console.log('die(' + dieCount + 'x' + die + '): ' + dieDamage + ', static: ' + staticValue + ', total: ' + value + ', newTotal: ' + (dieDamage + staticValue));
    }

    // Determine the die output string.
    dieOutput = dieCount > 0 ? dieCount + 'd' + die : '';

    // Determine the static output string.
    staticDamage = Math.floor(value - dieDamage);
    staticDamage = (staticDamage > 0) ? staticDamage : 0;
    staticOutput = (staticDamage > 0) ? staticDamage : '';

    // Determine the separator.
    separator = (dieCount > 0 && staticDamage > 0) ? '+' : '';

    // Ensure that we don't have too many attacks.
    while (multiAttack * (staticDamage + dieDamage) > totalValue) {
      multiAttack--;
    }

    attackOutput = multiAttack > 1 ? ' x' + multiAttack : '';

    return '(' + dieOutput + separator + staticOutput + ')' + attackOutput;
  }

  render() {
    const mod = this.calculateMod(this.props.mod);
    const damage = this.calculate(this.props.cr, mod);
    const swing = this.props.swing;
    const die = this.props.die;
    const multiAttack = this.props.multiAttack;
    const dieDamage = this.calculateRandomDamage(damage, die, swing, multiAttack);
    return (
      <div><strong>Damage:</strong> {damage} {dieDamage}</div>
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
    const value = this.props.value;
    const name = this.props.name;
    return (
      <div>
        <label htmlFor={name}>{this.props.label}:</label>
        <select name={name} value={value} onChange={this.handleChange}>
          <option value="smaller">Smaller</option>
          <option value="small">Small</option>
          <option value="">Standard</option>
          <option value="large">Large</option>
          <option value="larger">Larger</option>
        </select>
      </div>
    );
  }
}

class DieSelect extends React.Component {
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
    const value = this.props.value;
    return (
      <div>
        <label htmlFor="die">Damage Die:</label>
        <select name="die" value={value} onChange={this.handleChange}>
          <option value="3">d3</option>
          <option value="4">d4</option>
          <option value="6">d6</option>
          <option value="8">d8</option>
          <option value="10">d10</option>
          <option value="12">d12</option>
          <option value="20">d20</option>
        </select>
      </div>
    );
  }
}

class PercentSlider extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onChangeEvent(e);
  }

  render() {
    const value = this.props.value;
    return (
      <div>
        <label htmlFor="swing">Swing:</label>
        <input type="range" name="swing" min="0" max="1" value={value} onChange={this.handleChange} step="0.1" />
        <span>({value * 100}%)</span>
      </div>
    );
  }
}

class MultiAttackSlider extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onChangeEvent(e);
  }

  render() {
    const value = this.props.value;
    return (
      <div>
        <label htmlFor="multiAttack">Number of Attacks:</label>
        <input type="range" name="multiAttack" min="1" max="10" value={value} onChange={this.handleChange} step="1" />
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
      modSave: '',
      die: 8,
      swing: 0.5,
      multiAttack: 1,
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
    const die = this.state.die;
    const swing = this.state.swing;
    const multiAttack = this.state.multiAttack;

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
          <DieSelect
            value={die}
            onChangeEvent={this.handleChange} />
          <PercentSlider
            value={swing}
            onChangeEvent={this.handleChange} />
          <MultiAttackSlider
            value={multiAttack}
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
          mod={modDamage}
          die={die}
          swing={swing}
          multiAttack={multiAttack} />
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
