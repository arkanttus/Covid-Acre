import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import DraftsIcon from "@material-ui/icons/Drafts";
import SendIcon from "@material-ui/icons/Send";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import StarBorder from "@material-ui/icons/StarBorder";
import Confirmado from '@material-ui/icons/Check';
import Descartado from '@material-ui/icons/Clear';
import Morte from '@material-ui/icons/SentimentVeryDissatisfied';
import Suspeito from '@material-ui/icons/ReportProblem';
import Recuperados from '@material-ui/icons/InsertEmoticon';
import { Cities } from "./Cities";
import Box from '@material-ui/core/Box';
import clsx from "clsx";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: theme.spacing(3),
    cursor: 'default'
  },
  cityIcon: {
    width: 55,
    height: 30
  },
  item: {
    minWidth: 76
  },
  customCard: {
    boxShadow: '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
    margin: 10
  }
}));

const Item = props => {
  const city = props.city;
  const data = props.data
  const classes = useStyles();
  const [openId, setOpenId] = React.useState(null);

  //console.log(data)

  const handleOpen = id => {
    setOpenId(id);
  };

  const handleClick = id => {
    console.log(id);
    console.log(openId);
    if (id === openId) handleClose();
    else handleOpen(id);
  };

  const handleClose = () => {
    setOpenId(null);
  };

  return (
    <>
      <ListItem button onClick={() => handleClick(city._id)}>
        <ListItemIcon className={classes.item}>
          <img src={city.photo} alt={city.nome} className={classes.cityIcon} />
        </ListItemIcon>
        <ListItemText primary={city.nome} />
        {openId === city._id ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openId === city._id} timeout="auto" unmountOnExit className={classes.customCard}>
        <List component="div" disablePadding >
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <Suspeito style={{ color: '#fbc02d' }} />
            </ListItemIcon>
            <ListItemText primary={`Suspeitos: ${data ? data.suspeitos : 0}`} />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <Confirmado style={{ color: '#f44336' }} />
            </ListItemIcon>
            <ListItemText primary={`Confirmados: ${data ? data.confirmados : 0}`} />
          </ListItem>
          {/*<ListItem button className={classes.nested}>
            <ListItemIcon>
              <Recuperados style={{ color: '#454545' }} />
            </ListItemIcon>
            <ListItemText primary={`Recuperados: ${data ? data.recuperados : 0}`} />
          </ListItem>*/}
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <Descartado style={{ color: '#4caf50' }} />
            </ListItemIcon>
            <ListItemText primary={`Descartados: ${data ? data.descartados : 0}`} />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <Morte />
            </ListItemIcon>
            <ListItemText primary={`Mortes: ${data ? data.obitos : 0}`} />
          </ListItem>
        </List>
      </Collapse>
    </>
  );
};

export default function NestedList(props) {
  const classes = useStyles();
  const cities = Cities;
  const dataCities = props.dataCities

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Cidades
        </ListSubheader>
      }
      className={classes.root}
    >
      {cities.map(city => (
        <Item key={city._id} city={city} data={dataCities ? dataCities[city.nome] : null}/>
      ))}
    </List>
  );
}
