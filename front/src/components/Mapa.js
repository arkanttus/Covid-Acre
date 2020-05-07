import React from "react";
import { withStyles, makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Popover from "@material-ui/core/Popover";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import CardActions from '@material-ui/core/CardActions';
import Confirmado from '@material-ui/icons/Check';
import Descartado from '@material-ui/icons/Clear';
import Morte from '@material-ui/icons/SentimentVeryDissatisfied';
import Suspeito from '@material-ui/icons/ReportProblem';
import Recuperados from '@material-ui/icons/InsertEmoticon';
import { Cities } from "./Cities";
import { ListItemIcon, ListItemText, List, ListItem } from "@material-ui/core";
import api from '../services/api';
import CircularProgress from '@material-ui/core/CircularProgress';
import CardNews from "./CardNews";
import CardAcre from "./CardAcre";
import moment from 'moment'

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
  },
  rootCard: {
    ['&:hover']: {
      backgroundColor: '#f5f5f5'
    }
  },
  imagem: {
    maxWidth: "100%",
  },
  city: {
    cursor: 'pointer'
  },
  mapSubtitle: {
    border: '1px solid red'
  }
};

class Mapa extends React.Component {
  constructor(props, context) {
    super(props, context);
    
    this.state = {
      openedPopoverId: null,
      anchorEl: null,
      noticias: [],
      cities: Cities,
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
    var cities = this.state.cities
    cities.find(({ _id }) => _id === popoverId);

    console.log(event.target);
    if (popoverId === this.state.openedPopoverId) {
      this.handlePopoverClose();
      return;
    }
    this.setState({
      openedPopoverId: popoverId,
      anchorEl: event.target,
      cities
    });
  }

  handlePopoverClose() {
    this.setState({
      openedPopoverId: null,
      anchorEl: null
    });
  }

  /*static getDerivedStateFromProps(nextProps, prevState) {

    var cities = prevState.cities
    if(nextProps.dataCities) {
      
      cities.forEach(function(city, index) {
  
        const data = nextProps.dataCities[city.nome], total = nextProps.dataCities['Acre'].confirmados//, total = data.suspeitos+data.confirmados+data.descartados
        
        if(data) {
          var div = -1
          if (total > 0)
            div = 1 - (data.confirmados)/total
          
          var color = Math.round(div * 196).toString(16)
          if(data.confirmados == 0)
            color = "CC";
          else if(color.length == 1)
            color = "0" + color
          

          city.fill = "#CC" + color + color
        }
      })
    }

    return {
      cities  
    };
  }*/

  render() {
    const { classes } = this.props;
    const { anchorEl, openedPopoverId } = this.state;
    const cities = this.state.cities;
    const data = this.props.dataCities ? this.props.dataCities : null
    const lastUpdate = this.props.lastUpdate ? this.props.lastUpdate : ''
    const news = this.props.dataNews ? this.props.dataNews : []

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
        <g _ngcontent-c18="" className={classes.city} transform="scale(1 -1)">
          {cities.map(m => (
            <g _ngcontent-c18="" vectorEffect="non-scaling-stroke" key={m._id}>
              <g
                _ngcontent-c18=""
                fill={data ? data[m.nome].color : '#ccc'}
                className={m.className}
                codigo={m.codigo}
                nome={m.nome}
                faixa={m.faixa}
              >
                <polygon
                  _ngcontent-c18=""
                  points={m.points}
                  id={m.nome}
                  style={{ strokeWidth: "0.008px", stroke: "#888" }}
                  onClick={e => this.handlePopoverOpen(e, m._id)}
                  //onMouseEnter={(e) => this.handlePopoverOpen(e, m._id)}
                  //onMouseLeave={(e) => this.handlePopoverClose()}
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
                          <Suspeito style={{ color: '#fbc02d' }} />
                        </ListItemIcon>
                        <ListItemText primary={`Suspeitos: ${data ? data[m.nome].suspeitos : 0}`} />
                      </ListItem>
                      <ListItem style={{ padding: 5 }}>
                        <ListItemIcon style={{ minWidth: 32 }}>
                          <Confirmado style={{ color: '#f44336' }} />
                        </ListItemIcon>
                        <ListItemText primary={`Confirmados: ${data ? data[m.nome].confirmados : 0}`} />
                      </ListItem>
                      {/*<ListItem style={{ padding: 5 }}>
                        <ListItemIcon style={{ minWidth: 32 }}>
                          <Recuperados style={{ color: '#454545' }} />
                        </ListItemIcon>
                        <ListItemText primary={`Recuperados: ${data ? data[m.nome].recuperados : 0}`} />
                      </ListItem>*/}
                      <ListItem style={{ padding: 5 }}>
                        <ListItemIcon style={{ minWidth: 32 }}>
                          <Descartado style={{ color: '#4caf50' }} />
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

      <Grid container className={classes.containerRoot}  style={{ marginBottom: 20 }}>
        {/* LEGENDA DO MAPA */}
        <Grid item xs={12} sm={4}>
          <Typography style={{ width: 10, height: 10, border: '1px solid gray', backgroundColor: '#EEE', borderRadius: 2, display: 'inline-block' }}></Typography>
          <label style={{ paddingLeft: 5, fontWeight: "bold" }}>Sem casos</label>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography style={{ width: 10, height: 10, border: '1px solid gray', backgroundColor: 'rgb(255, 255, 87)', borderRadius: 2, display: 'inline-block' }}></Typography>
          <label style={{ paddingLeft: 5, fontWeight: "bold" }}>Casos notificados</label>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Typography style={{ width: 10, height: 10, border: '1px solid gray', backgroundColor: 'rgb(204,0,0)', borderRadius: 2, display: 'inline-block' }}></Typography>
          <label style={{ paddingLeft: 5, fontWeight: "bold" }}>Casos confirmados</label>
        </Grid>
      </Grid>
      
      <Grid container className={classes.containerRoot}>
        

        <Grid item xs={12}>
          {data ? (
            <CardAcre data={data}/>
          ) : (
            <CircularProgress />
          )}
        </Grid>

        <Grid item xs={12}>
          <Typography variant='subtitle2' component='h5'>
            Fontes: Departamento de Vigilância em Saúde da Sesacre. Atualizado em {lastUpdate}
          </Typography>
        </Grid>
        
        <Grid item xs={12} style={{ display: "flex", alignItems: "center" ,padding: "2% 0" }}>
          <hr style={{ flex: 2, height: "fit-content" }}></hr>
          <Typography color="textSecondary" style={{ flex: 1 }} variant="h5">
            NOTÍCIAS 
          </Typography>
          <hr style={{ flex: 2, height: "fit-content" }}></hr>
        </Grid>
        
        
        {/*NOTICIAS*/}
        
          <Grid container spacing={1}>   
            {news.length ? (        
                news.map((item,index) => (
                  <Grid item xs={12} md={4} key={index}>
                    <a href={item.url} style={{ textDecoration: 'none' }} target="_blank">
                      <CardNews titulo={item.titulo} imagem={item.imagem} url={item.url} date={item.date}/>
                    </a>
                  </Grid>
                ))
              ) : (
                <Grid item xs={12}>
                  <CircularProgress />
                </Grid>
              )
            } 
          </Grid>
      </Grid>

      </>
    );
  }
}

export default withStyles(styles)(Mapa);
