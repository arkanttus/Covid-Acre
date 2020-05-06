import React from 'react'
import { makeStyles } from '@material-ui/core';
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Confirmado from '@material-ui/icons/Check';
import Descartado from '@material-ui/icons/Clear';
import Morte from '@material-ui/icons/SentimentVeryDissatisfied';
import Suspeito from '@material-ui/icons/ReportProblem';
import Recuperados from '@material-ui/icons/InsertEmoticon';
import { ListItemIcon, ListItemText, List, ListItem } from "@material-ui/core";


const styles = makeStyles({
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
      }
})

export default function CardAcre(props) {
    const classes = styles()
    const data = props.data ? props.data : null

    return (
        <Card className={classes.root}>
            <CardContent>
                <Typography variant='h5' component='h5'>
                    Acre
                </Typography>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    Visão Geral
                </Typography>
                <Grid container justify='space-between'>
                    <Grid item xs={12} sm={6} md={2} className={classes.customGridItemCard}>
                        <ListItemIcon style={{ minWidth: 32 }}>
                            <Suspeito style={{ color: '#fbc02d' }} />
                        </ListItemIcon>
                        <ListItemText className={classes.customListItemTextCard} primary={`Suspeitos: ${data ? data['Acre'].suspeitos : 0}`} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={2} className={classes.customGridItemCard}>
                        <ListItemIcon style={{ minWidth: 32 }}>
                            <Confirmado style={{ color: '#f44336' }} />
                        </ListItemIcon>
                        <ListItemText className={classes.customListItemTextCard} primary={`Confirmados: ${data ? data['Acre'].confirmados : 0}`} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={2} className={classes.customGridItemCard}>
                        <ListItemIcon style={{ minWidth: 32 }}>
                            <Recuperados style={{ color: '#454545' }} />
                        </ListItemIcon>
                        <ListItemText className={classes.customListItemTextCard} primary={`Recuperados: ${data ? data['Acre'].recuperados : 0}`} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={2} className={classes.customGridItemCard}>
                        <ListItemIcon style={{ minWidth: 32 }}>
                            <Descartado style={{ color: '#4caf50' }} />
                        </ListItemIcon>
                        <ListItemText className={classes.customListItemTextCard} primary={`Descartados: ${data ? data['Acre'].descartados : 0}`} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={2} className={classes.customGridItemCard}>
                        <ListItemIcon style={{ minWidth: 32 }}>
                            <Morte />
                        </ListItemIcon>
                        <ListItemText className={classes.customListItemTextCard} primary={`Mortes: ${data ? data['Acre'].obitos : 0}`} />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}