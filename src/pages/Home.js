import React from "react";
import Mapa from "../components/Mapa";
import { withStyles, makeStyles } from "@material-ui/styles";
import { Grid } from "@material-ui/core";
import Drawer from "../components/Drawer";

const useStyles = makeStyles({
  root: {
    display: "flex"
  }
});

export default function Home() {
  const classes = useStyles();

  return <Drawer />;
}
