import React from "react";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import clsx from 'clsx'
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
import { Tooltip, Fab, Popover, Button } from "@material-ui/core";
import HelpIcon from '@material-ui/icons/Help';
import About from "../pages/About";


const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    backgroundColor: 'white',
    borderBottom: '1px solid #ddd',
    boxShadow: 'none',
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth
    }
  },
  menuButton: {
    color: '#444',
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
  logo: {
    width: "60px",
    padding: "10px 0"
  },
  title: {
    color: '#333'
  },
  typography: {
    padding: theme.spacing(2),
  },
  help: {
    cursor: 'pointer',
    color: '#555'
  },
  menu: {
    marginRight: 10,
  },
  menuHidden: {
    [theme.breakpoints.down(750)]:{
      display: 'none'
    }
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10
  },
  link: {
    textDecoration: 'none'
  }
}));

function Menu(props){
  return (
    <div 
      className={clsx(props.styles.menu, {
        [props.styles.menuHidden] : props.hidden
      })}
    >
      <Link to={`/`} className={props.styles.link}>
        <Button>Mapa</Button>
      </Link>
      <a href='http://covidappbr.com.br' className={props.styles.link}>
        <Button>CovidApp</Button>
      </a>
      <Link to={`/about`} className={props.styles.link}>
        <Button>Sobre</Button>
      </Link>
    </div>
  )
}

export default function ResponsiveDrawer(props) {
  const { container } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const {cities} = props

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <>
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

          <img src='images/sick.svg' alt='logo' className={classes.logo}/>
          <Typography variant="h6" className={classes.title}>
            COVID-19 Acre
          </Typography>

          <div style={{flexGrow: 1}}></div>
          
          <Menu styles={classes} hidden={true} />

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
              <Menu styles={classes}/>
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
      

    </>
  );
}
