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
import Confirmado from '@material-ui/icons/ThumbUp';
import Descartado from '@material-ui/icons/ThumbDown';
import Morte from '@material-ui/icons/SentimentVeryDissatisfied';
import Suspeito from '@material-ui/icons/ReportProblem';
import { Cities } from "./Cities";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: theme.spacing(4)
  },
  cityIcon: {
    width: 55
  },
  item: {
    minWidth: 76
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
      <Collapse in={openId === city._id} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <Suspeito />
            </ListItemIcon>
            <ListItemText primary={`Suspeitos: ${data ? data.suspeitos : 0}`} />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <Confirmado />
            </ListItemIcon>
            <ListItemText primary={`Confirmados: ${data ? data.confirmados : 0}`} />
          </ListItem>
          <ListItem button className={classes.nested}>
            <ListItemIcon>
              <Descartado />
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
