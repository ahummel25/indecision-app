import React from 'react';
import AddOption from './AddOption';
import { Options } from './Options';
import { Action } from './Action';
import { Header } from './Header';
import OptionModal from './OptionModal';

class IndecisionApp extends React.Component {
    constructor(props) {
      super(props);
      this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
      this.handleDeleteOption = this.handleDeleteOption.bind(this);
      this.handlePick = this.handlePick.bind(this);
      this.handleAddOption = this.handleAddOption.bind(this);
      this.clearSelectedOption = this.clearSelectedOption.bind(this);
      this.state = {
        options: [],
        selectedOption: undefined
      };
    }
  
    componentDidMount() {
      try {
        const json = localStorage.getItem('options');
        const options = JSON.parse(json);
        
        if (options) {
           this.setState(() => ({ options }));
        }
      } catch (e) {
        //Do nothing
      }
    }
  
    componentDidUpdate(prevProps, prevState) {
      if (prevState.options.length !== this.state.options.length) {
        const json = JSON.stringify(this.state.options);
        localStorage.setItem('options', json);  
      }
    }
  
    componentWillUnmount() {
      console.log('Component will unmount');
    }
  
    handleDeleteOptions() {
      this.setState(() => ({ options: [] }));
    }
  
    handleDeleteOption(removeOption) {
      this.setState((prevState) => ({ options: prevState.options.filter(option => option !== removeOption) }))
    }

    clearSelectedOption() {
      this.setState(() => ({ selectedOption: undefined }));
    }
  
    handlePick() {
      const randomNumber = Math.floor(Math.random() * this.state.options.length);
      const option = this.state.options[randomNumber];
      this.setState(() => ({ selectedOption: option }));
    }
  
    handleAddOption(option) {
     if(!option) {
       return 'Enter valid option';
     } else if (this.state.options.indexOf(option) > -1) {
       return `${option} already exists` ;
     }
  
      this.setState((prevState) => ({ options: prevState.options.concat([option]) }));
    }
  
    render() {
      const title = 'Indecision';
      return (
        <div>
          <Header title={title}/>
          <div className="container">
            <Action 
              hasOptions={this.state.options.length > 0}
              handlePick={this.handlePick}
            />
            <div className="widget">
              <Options 
                options={this.state.options}
                handleDeleteOptions={this.handleDeleteOptions}
                handleDeleteOption={this.handleDeleteOption}
              />
              <AddOption handleAddOption={this.handleAddOption}/>
            </div>
            <OptionModal 
              selectedOption={this.state.selectedOption}
              clearSelectedOption={this.clearSelectedOption}
            />
          </div>
        </div>
      )
    }
  }

export default IndecisionApp;