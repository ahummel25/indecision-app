class IndecisionApp extends React.Component {
  constructor(props) {
    super(props);
    this.handleDeleteOptions = this.handleDeleteOptions.bind(this);
    this.handleDeleteOption = this.handleDeleteOption.bind(this);
    this.handlePick = this.handlePick.bind(this);
    this.handleAddOption = this.handleAddOption.bind(this);
    this.state = {
      options: []
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

  handlePick() {
    const randomNumber = Math.floor(Math.random() * this.state.options.length);
    const option = this.state.options[randomNumber];
    alert(option);
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
        <Action 
          hasOptions={this.state.options.length > 0}
          handlePick={this.handlePick}
        />
        <Options 
          options={this.state.options}
          handleDeleteOptions={this.handleDeleteOptions}
          handleDeleteOption={this.handleDeleteOption}
        />
        <AddOption handleAddOption={this.handleAddOption}/>
      </div>
    )
  }
}

const Header = (props) => {
  return (
   <div>
     <h1>{props.title}</h1>
   </div>
  )
};

Header.defaultProps = {
  title: 'Some default'
};

const Action = (props) => {
  return (
    <div>
      <button 
        disabled={!props.hasOptions} 
        onClick={props.handlePick}>
        What should I do?
      </button>
    </div>
  )
};

const Options = (props) => {
  return (
    <div>
    <br/>
    <button onClick={props.handleDeleteOptions}>Remove All Options</button>
    {props.options.length === 0 && <p>Please add an option to get started.</p>}
      {
        props.options.map((option) => 
        <Option 
          key={option} 
          option={option}
          handleDeleteOption={props.handleDeleteOption}
        />
      )
      }
    </div>
  )
}

const Option = (props) => {
  return (
    <div>
      {props.option}
      <button onClick={() => props.handleDeleteOption(props.option)}>Remove</button>
    </div>
  )
}

class AddOption extends React.Component {
  constructor(props) {
    super(props);
    this.addOption = this.addOption.bind(this);
    this.state = {
      error: undefined
    };
  }
  addOption(event) {
    event.preventDefault();
    const option = event.target.elements.option.value.trim();
    const error = this.props.handleAddOption(option);
    this.setState(() => ({ error }));

    if (!error) {
       event.target.elements.option.value = '';
    }
  }

  render() {
    return (
      <div>
       {this.state.error && (
         <p>{this.state.error}</p>
       )}
        <form onSubmit={this.addOption}>
          <input type="text" name="option"/>
          <br/>
          <br/>
          <button>Submit</button>
        </form>
      </div>
    )
  }
}

// const User = (props) => {
//   return (
//     <div>
//       <p>Name: {props.name}</p>
//       <p>Age: </p>
//     </div>
//   )
// };

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));
