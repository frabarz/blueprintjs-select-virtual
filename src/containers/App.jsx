import React from "react";
import LevelSelect from "./LevelSelector";
import MeasureSelect from "./MeasureSelector";

class App extends React.Component {
  state = {measures: [], levels: []};

  componentDidMount() {
    fetch("levels.json")
      .then(res => res.json())
      .then(levels => this.setState({levels, level: levels[0]}));
    fetch("measures.json")
      .then(res => res.json())
      .then(measures => this.setState({measures, measure: measures[0]}));
  }

  render() {
    const {measures, levels, measure, level} = this.state;

    return (
      <div>
        <h1>Hello World!</h1>
        {measure && (
          <MeasureSelect
            items={measures}
            onItemSelect={measure => this.setState({measure})}
            selectedItem={measure}
          />
        )}
        <hr />
        {level && (
          <LevelSelect
            items={levels}
            onItemSelect={level => this.setState({level})}
            selectedItem={level}
          />
        )}
      </div>
    );
  }
}

export default App;
