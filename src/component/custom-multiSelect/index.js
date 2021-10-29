import React, { Component } from "react";
import "./index.css";

export default class CustomMultiSelect extends Component {
  constructor(props) {
    super(props);
    let {options,selectedOptions} = props;
    // let options = JSON.parse(JSON.stringify(props.options));
    options.forEach((option) =>option.selected = selectedOptions.includes(option.value)?true:false);
    this.state = {
      options,
      selectedOptions,
      showOptions: false,
    };
  }

  toogleCheckboxes = () => {
    this.setState(prevState => {
        return {
            showOptions : !prevState.showOptions
        };
    });
  };

  handleCheckboxChange = (e) => {
    let { checked, value } = e.target;
    let {options}= this.state;
    let selectedOptions = [];
    if (checked) {
      if (value === "*") {
          options.forEach(option => option.selected = true)
      } else {
        options.forEach(option => {
            if(option.value === value){
                option.selected = true;
            }
        })
      }
    } else {
      if (value === "*") {
        options.forEach(option => option.selected = false)
        
      } else {
        options[0].selected=false;
        options.forEach(option => {
            if(option.value === value){
                option.selected = false;
            }
        })
      }
    }
    options.forEach(option => {
        if(option.selected && option.value!=='*')
        selectedOptions.push(option.value)
    })
    // console.log(selectedOptions);
    this.props.handleChange(selectedOptions);
    this.setState({
        options,
        selectedOptions
    });
    // console.log(options);
  };

  componentDidMount(){
      document.addEventListener('mousedown',this.handleClick,false)
  }

  componentWillUnmount(){
      document.addEventListener('mousedown',this.handleClick,false)
  }

  handleClick=(e) =>{
      if(this.node && this.node.contains(e.target)){
          return;
      }
      else{
          this.setState({
              showOptions:false
          })
      }
  }

  render() {
      let {options,selectedOptions} = this.state;
    return (
      <div className="multipleSelection"  ref={node => this.node=node}>
        <div className="selectBox" onClick={this.toogleCheckboxes}>
          <select>
            <option>{`${selectedOptions.length?selectedOptions.toString():'Select Options'}`}</option>
          </select>
          <div className="overSelect"></div>
        </div>

        {this.state.showOptions && ( <div className="options">
        <div id="checkBoxes">
      {options.map((option) => {
          return (
            <label htmlFor={option.label} key={option.value} className={`${option.selected?'selected-option':'' }`}>
              <input
                type="checkbox"
                value={option.value}
                checked={option.selected}
                id={option.label}
                onChange={this.handleCheckboxChange.bind(this)}
              />
              {option.label}
            </label>
          );
      })}
    </div>
        </div>
        )}
      </div>
    );
  }
}
