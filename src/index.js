import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

// Monster Calculation
// http://blogofholding.com/?p=7338

// CSS by https://codepen.io/retractedhack/pen/gPLpWe

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
      <div className="property-line property-line--hp">
        <h4>Hit Points</h4>
        <p>{this.calculate(this.props.cr, modifier)}</p>
      </div>
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
      <div className="property-line property-line__ac">
        <h4>Armor Class</h4>
        <p>{this.calculate(this.props.cr, modifier)}</p>
      </div>
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
      <div className="property-line property-line--attack">
        <h4>Attack:</h4>
        <p>+{this.calculate(this.props.cr, mod)}</p>
      </div>
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

  calculateRandomDamage(value, die, swing, multiAttack, useMultiTarget, useLimited) {
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
    var resultMain = '';
    var resultMulti = '';
    var resultLimited = '';

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

    resultMain = dieOutput + separator + staticOutput;

    // Add multi-target attack.
    if (useMultiTarget) {
      dieOutput = dieCount > 2 ? Math.round(dieCount / 2) + 'd' + die : '';
      staticOutput = (staticDamage > 2) ? Math.round(staticDamage / 2) : '';
      separator = (dieCount > 2 && staticDamage > 2) ? '+' : '';
      if (multiAttack > 1) {
        multiAttack--;
      }
      if (dieOutput > 2 || staticOutput > 2) {
        resultMulti = <div className="property-line property-line--damage property-line--row">
          <h4>Multi-Target</h4><p>{dieOutput + separator + staticOutput}</p>
        </div>;
      }
    }

    // Add limited-use attack.
    if (useLimited) {
      dieOutput = dieCount > 0 ? (2 * dieCount) + 'd' + die : '';
      staticOutput = (staticDamage > 0) ? (2 * staticDamage) : '';
      separator = (dieCount > 0 && staticDamage > 0) ? '+' : '';
      if (multiAttack > 1) {
        multiAttack--;
      }
      resultLimited = <div className="property-line property-line--damage property-line--row">
        <h4>Limited Use</h4><p>{dieOutput + separator + staticOutput}</p>
      </div>;
    }

    attackOutput = multiAttack > 1 ? ' [' + multiAttack + ' attacks]' : '';

    var result = [];

    result.push(<div className="property-line property-line--damage property-line--row">
      <h4>{multiAttack > 1 ? 'Multiattack Damage' : 'Attack Damage'}</h4><p>{resultMain + attackOutput}</p>
    </div>);

    if (resultMulti) {
      result.push(resultMulti);
    }

    if (resultLimited) {
      result.push(resultLimited);
    }

    return result;
  }

  render() {
    const mod = this.calculateMod(this.props.mod);
    const damage = this.calculate(this.props.cr, mod);
    const swing = this.props.swing;
    const die = this.props.die;
    const multiAttack = this.props.multiAttack;
    const useMultiTarget = this.props.useMultiTarget;
    const useLimited = this.props.useLimited;
    const dieDamage = this.calculateRandomDamage(damage, die, swing, multiAttack, useMultiTarget, useLimited);
    return (
      <div className="property-rows property-rows--damage">
        <div className="property-line property-line--damage">
          <h4>Total Damage</h4>
          <p>{damage}</p>
        </div>
        {dieDamage}
      </div>
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
      <div className="property-line property-line--save-dc">
        <h4>Save DC:</h4>
        <p>{this.calculate(this.props.cr, mod)}</p>
      </div>
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
      <div className="property-line property-line--save">
        <h4>Save Bonus:</h4>
        <p>+{this.calculate(this.props.cr, mod)}</p>
      </div>
    )
  }
}

class TextInput extends React.Component {
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
      <div className="form-item form-item--text form-item--title">
        <label htmlFor={name}>{this.props.label}:</label>
        <input type="text" name={name} value={value} onChange={this.handleChange} />
      </div>
    );
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
      <div className="form-item form-item--text form-item--cr">
        <label htmlFor={name}>CR:</label>
        <input type="number" name={name} value={value} onChange={this.handleChange} />
      </div>
    );
  }
}

class SizeSelect extends React.Component {
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
      <div className="form-item form-item--select form-item--mod">
        <label htmlFor="size">Size:</label>
        <select name="size" value={value} onChange={this.handleChange}>
          <option value="Tiny">Tiny</option>
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
          <option value="Huge">Huge</option>
          <option value="Gargantuan">Gargantuan</option>
        </select>
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
      <div className="form-item form-item--select form-item--half form-item--mod">
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

class CheckboxInput extends React.Component {
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
      <div className={"form-item form-item--checkbox form-item--half form-item--" + name}>
        <input type="checkbox" name={name} checked={value} onChange={this.handleChange}/>
        <label htmlFor={name}>{this.props.label}</label>
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
      <div className="form-item form-item--select form-item--die">
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
      <div className="form-item form-item--range form-item--swing">
        <label htmlFor="swing">% Random:</label>
        <input type="range" name="swing" min="0" max="1" value={value} onChange={this.handleChange} step="0.1" />
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
      <div className="form-item form-item--range form-item--multiattack">
        <label htmlFor="multiAttack"># Attacks:</label>
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
      title: 'Dangerous Foe!',
      cr: '10',
      size: 'Medium',
      type: 'monstrosity',
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
      useMultiTarget: false,
      useLimited: false
    };
  }

  // Generic state change handler.
  handleChange(event) {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    this.setState({ [event.target.name]: value });
  }

  render() {
    // Map states to constants.
    const title = this.state.title;
    const cr = this.state.cr;
    const size = this.state.size;
    const type = this.state.type;
    const modHp = this.state.modHp;
    const modAc = this.state.modAc;
    const modAttack = this.state.modAttack;
    const modDamage = this.state.modDamage;
    const modDc = this.state.modDc;
    const modSave = this.state.modSave;
    const die = this.state.die;
    const swing = this.state.swing;
    const multiAttack = this.state.multiAttack;
    const useMultiTarget = this.state.useMultiTarget;
    const useLimited = this.state.useLimited;

    return (
      <div className="monster">
        {/* Build inputs to collect values. Each value maps a
        generic prop (e.g. value) to a specific state (e.g. cr). */}
        <form className="monster__form">
          <fieldset className="monster__fieldset monster__fieldset--settings">
            <TextInput
              value={title}
              name="title"
              label="Name"
              onChangeEvent={this.handleChange} />
            <ChallengeRatingInput
              value={cr}
              name="cr"
              onChangeEvent={this.handleChange} />
            <SizeSelect
              value={size}
              onChangeEvent={this.handleChange} />
            <TextInput
              value={type}
              name="type"
              label="Type"
              onChangeEvent={this.handleChange} />
          </fieldset>
          <fieldset className="monster__fieldset monster__fieldset--modifiers">
            <div><h3>Modifiers</h3></div>
            <ModifierSelect
              value={modHp}
              name="modHp"
              label="HP"
              onChangeEvent={this.handleChange} />
            <ModifierSelect
              value={modAc}
              name="modAc"
              label="AC"
              onChangeEvent={this.handleChange} />
            <ModifierSelect
              value={modAttack}
              name="modAttack"
              label="Attack"
              onChangeEvent={this.handleChange} />
            <ModifierSelect
              value={modDamage}
              name="modDamage"
              label="Damage"
              onChangeEvent={this.handleChange} />
            <ModifierSelect
              value={modDc}
              name="modDc"
              label="Save DC"
              onChangeEvent={this.handleChange} />
            <ModifierSelect
              value={modSave}
              name="modSave"
              label="Save Bonus"
              onChangeEvent={this.handleChange} />
          </fieldset>
          <fieldset className="monster__fieldset monster__fieldset--attacks">
            <div><h3>Damage</h3></div>
            <DieSelect
              value={die}
              onChangeEvent={this.handleChange} />
            <PercentSlider
              value={swing}
              onChangeEvent={this.handleChange} />
            <MultiAttackSlider
              value={multiAttack}
              onChangeEvent={this.handleChange} />
            <CheckboxInput
              value={useMultiTarget}
              name="useMultiTarget"
              label="Include multi-target"
              onChangeEvent={this.handleChange} />
            <CheckboxInput
              value={useLimited}
              name="useLimited"
              label="Include limited use"
              onChangeEvent={this.handleChange} />
          </fieldset>
        </form>
        {/* Build markup to output values. */}
        <div className="stat-block">
          <hr className="orange-border" />
          <div className="creature-heading">
            <h1>{title}</h1>
            <h2>{size} {type}</h2>
          </div>
          <svg height="5" width="100%" class="tapered-rule">
            <polyline points="0,0 400,2.5 0,5"></polyline>
          </svg>
          <div className="top-stats">
            <ArmorClass
              cr={cr}
              mod={modAc} />
            <HitPoints
              cr={cr}
              mod={modHp} />
          </div>
          <svg height="5" width="100%" class="tapered-rule">
            <polyline points="0,0 400,2.5 0,5"></polyline>
          </svg>
          <div className="bottom-stats">
            <DifficultyClass
              cr={cr}
              mod={modDc} />
            <Save
              cr={cr}
              mod={modSave} />
            <div className="property-line property-line--cr">
              <h4>Challenge</h4>
              <p>{cr}</p>
            </div>
          </div>
          <svg height="5" width="100%" class="tapered-rule">
            <polyline points="0,0 400,2.5 0,5"></polyline>
          </svg>
          <div className="actions">
            <Attack
              cr={cr}
              mod={modAttack} />
            <Damage
              cr={cr}
              mod={modDamage}
              die={die}
              swing={swing}
              multiAttack={multiAttack}
              useMultiTarget={useMultiTarget}
              useLimited={useLimited} />
          </div>
          <hr className="orange-border bottom" />
        </div>
        <div className="footer">
          <em>Derived from <a href="http://blogofholding.com/?p=7338" target="_blank" rel="noopener noreferrer">5e MM on a business card.</a></em>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <Monster />,
  document.getElementById('root')
);
