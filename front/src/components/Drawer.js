import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Mapa from "./Mapa";
import ListCities from "./ListCities";
import api from '../services/api'
import { Tooltip, Fab, Popover } from "@material-ui/core";
import HelpIcon from '@material-ui/icons/Help';


const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
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
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    }
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    paddingTop: 50,
    [theme.breakpoints.up('md')]:{
      paddingTop: 40
    }
  },
  logo: {
    width: "60px",
    padding: "10px 0"
  },
  title: {
    flexGrow: 1
  },
  typography: {
    padding: theme.spacing(2),
  },
  help: {
    cursor: 'pointer'
  }
}));

export default function ResponsiveDrawer(props) {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [cities, setCities] = React.useState()
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const loadCities = async () => {
    try{
      const {data} = await api.get('/all-cities/')
      setCities(data)
    }catch(ex){
      console.log(ex)
    }
  }

  React.useEffect(() => {
    loadCities()

    const intervalId = setInterval(loadCities, 300000)

    return () => clearInterval(intervalId)

  }, [setCities])

  

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };



  return (
    <div className={classes.root}>
    <BrowserRouter>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap className={classes.title}>
            COVID-19 Acre
          </Typography>
          <Tooltip title="Clique em uma cidade no mapa ou no menu lateral" aria-label="Help">
              <HelpIcon onClick={handleClick} fontSize='large' className={classes.help}/>
          </Tooltip>
          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
          >
            <Typography className={classes.typography}>Clique em uma cidade no mapa ou no menu lateral</Typography>
          </Popover>
        </Toolbar>
      </AppBar>
      >
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper
            }}
            ModalProps={{
              keepMounted: true // Better open performance on mobile.
            }}
          >
            <div>
      
      <Divider />
      <ListCities dataCities={cities}/>
      </div>
          </Drawer>
        </Hidden>

        <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper
              }}
              variant="permanent"
              open
            >
              <div>
                
                <Divider />
                <ListCities dataCities={cities}/>
              </div>
            </Drawer>
        </Hidden>
      </nav>
      <main className={classes.content}>
        
          <Switch>
            <Route
              path="/"
              render={props => (
                <Mapa {...props} dataCities={cities}/>
              )}
            />
          </Switch>
        
        
      </main>
    </BrowserRouter>
    </div>
  );
}
