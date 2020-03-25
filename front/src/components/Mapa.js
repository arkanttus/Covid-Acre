import React from "react";
import { withStyles, makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Popover from "@material-ui/core/Popover";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Confirmado from '@material-ui/icons/ThumbUp';
import Descartado from '@material-ui/icons/ThumbDown';
import Morte from '@material-ui/icons/SentimentVeryDissatisfied';
import Suspeito from '@material-ui/icons/ReportProblem';
import { Cities } from "./Cities";
import { ListItemIcon, ListItemText, List, ListItem } from "@material-ui/core";

const styles = {
  root: {
    flexGrow: 1,
    marginBottom: 15
  },
  paper: {
    padding: 10,
  },
  popover: {
    pointerEvents: "none"
  },
  mapa: {
    maxHeight: "550px"
  },
  customGridItemCard: {
    ['@media (max-width:600px)']: {
      display: 'flex',
      justifyContent: 'center',
      width: 'inherit'
    },
  },
  customListItemTextCard: {
    ['@media (max-width:600px)']: {
      flex: 'initial'
    }
  },
  containerRoot: {
    ['@media (max-width:600px)']: {
      paddingTop: '5%'
    }
  }

};

class Mapa extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      openedPopoverId: null,
      anchorEl: null,
    };
    this.handlePopoverOpen = this.handlePopoverOpen.bind(this);
    this.handlePopoverClose = this.handlePopoverClose.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    
  }
  
  handleClickOutside(e) {
    if (e.target.tagName === "svg") {
      this.handlePopoverClose();
    }
  }

  handlePopoverOpen(event, popoverId) {
    console.log(event.target);
    if (popoverId === this.state.openedPopoverId) {
      this.handlePopoverClose();
      return;
    }
    this.setState({
      openedPopoverId: popoverId,
      anchorEl: event.target
    });
  }

  handlePopoverClose() {
    this.setState({
      openedPopoverId: null,
      anchorEl: null
    });
  }

  render() {
    const { classes } = this.props;
    const { anchorEl, openedPopoverId } = this.state;
    const cities = Cities;
    const data = this.props.dataCities ? this.props.dataCities : null

    return (
      <>
      <svg
        _ngcontent-c18=""
        xmlnsXlink="http://www.w3.org/1999/xlink"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="-74.35858499999999 6.743615 8.100069999999988 4.7700700000000005"
        onClick={e => this.handleClickOutside(e)}
        className={classes.mapa}
      >
        <g _ngcontent-c18="" className="uf" transform="scale(1 -1)">
          {cities.map(m => (
            <g _ngcontent-c18="" vectorEffect="non-scaling-stroke" key={m._id}>
              <g
                _ngcontent-c18=""
                fill={m.fill}
                className={m.className}
                codigo={m.codigo}
                nome={m.nome}
                faixa={m.faixa}
              >
                <polygon
                  _ngcontent-c18=""
                  points={m.points}
                  id={m.nome}
                  style={{ strokeWidth: "0.00810007px" }}
                  onClick={e => this.handlePopoverOpen(e, m._id)}
                />
              </g>

              <Popover
                className={classes.popover}
                classes={{
                  paper: classes.paper
                }}
                open={openedPopoverId === m._id}
                anchorEl={anchorEl}
                onClose={this.handlePopoverClose}
                anchorOrigin={{
                  vertical: "center",
                  horizontal: "center"
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center"
                }}
                key={m.nome}
                disableRestoreFocus
              >
                <Typography variant='h5' component='h5'>
                  {m.nome}
                  </Typography>
                  <Divider/>
                    <List component="div" disablePadding>
                      <ListItem style={{ padding: 5 }}>
                        <ListItemIcon style={{ minWidth: 32 }}>
                          <Suspeito />
                        </ListItemIcon>
                        <ListItemText primary={`Suspeitos: ${data ? data[m.nome].suspeitos : 0}`} />
                      </ListItem>
                      <ListItem style={{ padding: 5 }}>
                        <ListItemIcon style={{ minWidth: 32 }}>
                          <Confirmado />
                        </ListItemIcon>
                        <ListItemText primary={`Confirmados: ${data ? data[m.nome].confirmados : 0}`} />
                      </ListItem>
                      <ListItem style={{ padding: 5 }}>
                        <ListItemIcon style={{ minWidth: 32 }}>
                          <Descartado />
                        </ListItemIcon>
                        <ListItemText primary={`Descartados: ${data ? data[m.nome].descartados : 0}`} />
                      </ListItem>
                      <ListItem style={{ padding: 5 }}>
                        <ListItemIcon style={{ minWidth: 32 }}>
                          <Morte />
                        </ListItemIcon>
                        <ListItemText primary={`Mortes: ${data ? data[m.nome].obitos : 0}`} />
                      </ListItem>
                    </List>
              </Popover>
            </g>
          ))}
        </g>
      </svg>
      
      <Grid container className={classes.containerRoot}>
        <Grid item xs={12}>
          <Card className={classes.root}>
            <CardContent>
            <Typography variant='h5' component='h5'>
                  Acre
                  </Typography>
              <Typography className={classes.title} color="textSecondary" gutterBottom>
                Visão Geral
              </Typography>
              <Grid container>
                <Grid item xs={12} sm={6} md={3} className={classes.customGridItemCard}>
                  <ListItemIcon style={{ minWidth: 32 }}>
                    <Suspeito />
                  </ListItemIcon>
                  <ListItemText className={classes.customListItemTextCard} primary={`Suspeitos: ${data ? data['Acre'].suspeitos : 0}`} />
                </Grid>
                <Grid item xs={12} sm={6} md={3} className={classes.customGridItemCard}>
                  <ListItemIcon style={{ minWidth: 32 }}>
                    <Confirmado />
                  </ListItemIcon>
                  <ListItemText className={classes.customListItemTextCard} primary={`Confirmados: ${data ? data['Acre'].confirmados : 0}`} />
                </Grid>
                <Grid item xs={12} sm={6} md={3} className={classes.customGridItemCard}>
                  <ListItemIcon style={{ minWidth: 32 }}>
                    <Descartado />
                  </ListItemIcon>
                  <ListItemText className={classes.customListItemTextCard} primary={`Descartados: ${data ? data['Acre'].descartados : 0}`} />
                </Grid>
                <Grid item xs={12} sm={6} md={3} className={classes.customGridItemCard}>
                  <ListItemIcon style={{ minWidth: 32 }}>
                    <Morte />
                  </ListItemIcon>
                  <ListItemText className={classes.customListItemTextCard} primary={`Mortes: ${data ? data['Acre'].obitos : 0}`} />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='subtitle2' component='subtitle2'>
            Fontes: Departamento de Vigilância em Saúde da Sesacre. Atualizado em 24/03/2020 23:30
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant='subtitle2' component='subtitle2'>
            Desenvolvido por alunos de Sistemas de Informação da Universidade Federal do Acre (
              <a href='https://github.com/arkanttus'>Ítalo Oliveira</a>, 
              <a href='https://github.com/bruunotrindade'> Bruno Trindade</a> e 
              <a href='https://github.com/Tony-Starkus'>Thalisson Bandeira</a>
            ). Em construção...
          </Typography>
        </Grid>
      </Grid>

      
      

      </>
    );
  }
}

export default withStyles(styles)(Mapa);
