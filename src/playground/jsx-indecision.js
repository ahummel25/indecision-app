let appRoot = document.getElementById('app');

const app = {
  title: 'Indecision App',
  subtitle: 'A React App',
  options: []
}

const onFormSubmit = (event) => {
  event.preventDefault();

  const option = event.target.elements.option.value;
  console.log(option);

  if (option) {
    app.options.push(option);
    event.target.elements.option.value = '';
    renderDom();
  }
};

const removeAllOptions = () => {
   app.options = [];
   renderDom();
};

const listOptions = () => {
  return app.options.map((option) => <li key={option}>{option}</li>)
};

const makeDecision = () => {
  const randomNumber = Math.floor(Math.random() * app.options.length);
  const option = app.options[randomNumber];
  alert(option);
};

const numbers = [1, 2, 3];

const renderDom = () => {
  const template = (
    <div>
      <h1>{app.title}</h1>
      <p>{app.options.length > 0 ? 'Here are your options' : 'No Options'}</p>
      <button disabled={app.options.length === 0} onClick={makeDecision}>What should I do?</button>
      <br />
      <br />
        <button onClick={removeAllOptions}>Remove all</button>
      <ol>
        {
          app.options.map((option) => <li key={option}>{option}</li>)
        }
      </ol>
      <form onSubmit={onFormSubmit}>
        <input type="text" name="option"/>
        <br />
        <br />
        <button>Submit</button>
      </form>
    </div>
  );

  ReactDOM.render(template, appRoot);
}

renderDom();