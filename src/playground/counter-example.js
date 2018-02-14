class Counter extends React.Component {
   constructor(props) {
     super(props);
     this.addOne = this.addOne.bind(this);
     this.removeOne = this.removeOne.bind(this);
     this.reset = this.reset.bind(this);
     this.state = {
       count: 0
     };
   }

   componentDidMount() {
    const count = parseInt(localStorage.getItem('count'), 10);
      
    if (count) {
       this.setState(() => ({ count }));
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.count !== this.state.count) {
      localStorage.setItem('count', this.state.count);  
    }
  }

  addOne() {
    this.setState((prevState) => {
      return {
        count: prevState.count + 1
      };
    });
  }

  removeOne() {
    this.setState((prevState) => {
      return {
        count: prevState.count - 1
      };
    });
  }

  reset() {
    this.setState(() => {
      return {
        count: 0
      };
    });
  }

  render() {
    return (
      <div ref="myRef">
        <h1>Count: {this.state.count}</h1>
        <button onClick={this.addOne}>+1</button>
        <button onClick={this.removeOne}>-1</button>
        <button onClick={this.reset}>Reset</button>
      </div>
    )
  }
}

ReactDOM.render(<Counter />, document.getElementById('app'));

// console.log('Running!');

// let count = 0;

// const incrementCounter = () => {
//   count++;
//   renderCounterApp();
// }

// const decrementCounter = () => {
//   count--;
//   renderCounterApp(); 
// }

// const reset = () => {
//   count = 0;
//   renderCounterApp();
// }

// const appRoot = document.getElementById('app');

// const renderCounterApp = () => {
//     const template = (
//         <div>
//           <h1>Count: {count}</h1>
//           <button onClick={incrementCounter}>+1</button>
//           <button onClick={decrementCounter}>-1</button>
//           <button onClick={reset}>Reset</button>
//         </div>
//     );
//   ReactDOM.render(template, appRoot);
// };

// renderCounterApp();