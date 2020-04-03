import React from "react";
import Mapa from "../components/Mapa";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";
import Drawer from "../components/Drawer";
import { Route, Switch } from "react-router-dom";
import api from "../services/api";
import About from "./About";
import Teste from "../components/Teste";

const useStyles = makeStyles( theme => ({
  root: {
    display: "flex",
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
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    paddingTop: 50,
    [theme.breakpoints.up('md')]:{
      paddingTop: 40
    } 
  },
}));

export default function Home() {
  const classes = useStyles();
  const [cities, setCities] = React.useState()
  const [lastUpdate, setLastUpdate] = React.useState()

  const loadCities = async () => {
    try{
      const {data} = await api.get('/all-cities/')
      setCities(data.Cidades)
      setLastUpdate(data.Update)
    }catch(ex){
      console.log(ex)
    }
  }

  React.useEffect(() => {
    loadCities()

    const intervalId = setInterval(loadCities, 300000)

    return () => clearInterval(intervalId)

  }, [setCities])

  return (
    <div className={classes.root}>
      <Drawer cities={cities} />
      <main className={classes.content}> 
        <Switch>
          <Route exact path='/about' component={About} />
          <Route
            
            path="/"
            render={props => (
              <Mapa {...props} dataCities={cities} lastUpdate={lastUpdate}/>
            )}
          />
        </Switch>   
      </main>
    </div>
  );
}
