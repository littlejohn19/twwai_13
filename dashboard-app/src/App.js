import logo from './logo.svg';
import './App.css';

import {LineChart} from "./components/LineChart";
import {Data} from "./components/Data";

function App() {


  return (
      <div className="App">
          <Data></Data>
        <LineChart></LineChart>
      </div>
  );
}

export default App;
