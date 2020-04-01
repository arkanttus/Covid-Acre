import React from "react";
import "./styles.css";
import Home from "./pages/Home";
import Routes from './routes';
import ReactGA from 'react-ga';

export default function App() {

  function initializeReactGA() {
    ReactGA.initialize('UA-123791717-1');
    ReactGA.pageview('/');
  }
  initializeReactGA();
  return (
    <div className="App">
      <Routes />
    </div>
  );
}
