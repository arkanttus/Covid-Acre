import React from "react";
import clsx from 'clsx'
import "./styles.css";
import Home from "./pages/Home";
import Routes from './routes';
import ReactGA from 'react-ga';
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles( theme => ({
  root: {
    "& ::-webkit-scrollbar": {
      width: "5px"
    },

    "& ::-webkit-scrollbar-track": {
      background: "#f1f1f1",
      borderRadius: "8px"
    },

    "& ::-webkit-scrollbar-thumb": {
      background: "#888",
      borderRadius: "8px"
    },

    "& ::-webkit-scrollbar-thumb:hover": {
      background: "#555"
    }
  },
}));

export default function App() {
  const classes = useStyles()

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
