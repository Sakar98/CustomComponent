import "./App.css";
import React, { Component } from "react";
import { colourOptions } from "./component/custom-multiSelect/data";
import CustomMultiSelect from "./component/custom-multiSelect/index";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: colourOptions,
      selectedOptions:  [ "blue", "red", "green" ],
    };
  }

  handleSelectChange=(selectedOptions)=>{
    console.log(selectedOptions);
    this.setState({
      selectedOptions,
    });
  }


  render() {
    let { selectedOptions,options } = this.state;
    return (
      <div className="App">
        <div className="component">
          <CustomMultiSelect
            options={options}
            selectedOptions={selectedOptions}
            handleChange={this.handleSelectChange}
          />
          <div className="multiSelect">
            <ul>
              {selectedOptions && selectedOptions.map((option,i) => {
                return(
                  <li style={{color:option}} key={i}><h1>This is {option} {i}</h1></li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
