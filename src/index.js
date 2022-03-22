import React, { StrictMode } from "react";
import ReactDOM from "react-dom";

function Boil(props) {
  if (props.c >= 100) {
    return <p>Boil</p>;
  }
  return <p>Not boil</p>;
}

const scaleNames = {
  c: "Celsius",
  f: "Fahrenheit"
};

function toCel(f) {
  return ((f - 32) * 5) / 9;
}

function toFah(c) {
  return (c * 9) / 5 + 32;
}

function tryConvert(temp, convert) {
  const input = parseFloat(temp);
  if (Number.isNaN(input)) {
    return "";
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

class TemperatureInput extends React.Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    // this.setState({ temperature: e.target.value });
    this.props.onTemperatureChange(e.target.value);
  }

  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;

    return (
      <fieldset>
        <legend>Enter temperature in {scaleNames[scale]}:</legend>
        <input value={temperature} onChange={this.handleChange} />
      </fieldset>
    );
  }
}

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleCelChange = this.handleCelChange.bind(this);
    this.handleFahChange = this.handleFahChange.bind(this);
    this.state = { temperature: "", scale: "c" };
  }

  handleCelChange(temperature) {
    this.setState({ scale: "c", temperature });
  }

  handleFahChange(temperature) {
    this.setState({ scale: "f", temperature });
  }

  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const cel = scale === "f" ? tryConvert(temperature, toCel) : temperature;
    const fah = scale === "c" ? tryConvert(temperature, toFah) : temperature;

    return (
      <div>
        <TemperatureInput
          scale="c"
          temperature={cel}
          onTemperatureChange={this.handleCelChange}
        />
        <TemperatureInput
          scale="f"
          temperature={fah}
          onTemperatureChange={this.handleFahChange}
        />
        <Boil c={parseFloat(cel)} />
      </div>
    );
  }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<Calculator />, rootElement);
