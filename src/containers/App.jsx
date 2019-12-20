import React from "react";
import levels from "../levels.json";
import measures from "../measures.json";
import LevelSelect from "./LevelSelector";
import MeasureSelect from "./MeasureSelector";
// import List from "react-viewport-list";
import List from "../components/ViewportList";

class App extends React.Component {
  state = {measures, levels, measure: measures[0], level: levels[0]};

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
        {level && (
          <LevelSelect
            items={levels}
            onItemSelect={level => this.setState({level})}
            selectedItem={level}
          />
        )}
        <hr />
        <ul style={{height: 200, width: 300, margin: "auto", overflow: "auto"}}>
          <List listLength={measures.length} itemMinHeight={10}>
            {({innerRef, index, style}) => (
              <li ref={innerRef} key={index} style={style} className="vl-item">
                {measures[index].name}
              </li>
            )}
          </List>
        </ul>
      </div>
    );
  }
}

export default App;
