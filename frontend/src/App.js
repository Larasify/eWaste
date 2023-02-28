import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
async function getBotResponse() {
  const jsondata = {"message": "hello"};
  const options = {
      method: 'POST',
      credentials: "same-origin",
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(jsondata)
  };
  const response = await fetch('/apiposttest', options);
  const responsedata = await response.json();
  console.log(responsedata);
}
getBotResponse();

export default App;
