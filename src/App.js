import logo from './logo.svg';
import './App.css';
import { Button } from 'ui-neumorphism'
import { useEffect } from "react";
import { useTimer } from 'react-timer-hook';
import Clocker from "./components/Clocker";

function App() {

  const expiryTimestamp = new Date();
  expiryTimestamp.setSeconds(expiryTimestamp.getSeconds() + 500);

  const {
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    resume,
    restart,
  } = useTimer({ expiryTimestamp, autoStart: true, onExpire: () => console.warn('onExpire called') });
  console.log(hours, minutes, seconds)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <Button onClick={resume} />

        <Clocker
          hours={hours}
          minutes={minutes}
          seconds={seconds}
        />
        <div style={{ fontSize: '100px' }}>
          <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
        </div>
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

export default App;
