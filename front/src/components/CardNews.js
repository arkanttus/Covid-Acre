import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    height: '100%'
  },
  title: {
      lineHeight: 'normal'
  }
});

export default function CardNews(props) {
  const classes = useStyles();
  const {titulo, imagem, url, date} = props

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image={imagem}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography  gutterBottom variant="h6" component="h6" className={classes.title}>
            {titulo}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Por Ac24horas, {date}
          </Typography>
        </CardContent>
      </CardActionArea>
   
    </Card>
  );
}
/*
export default function CardNews(props){
    return (
        <Card className={classes.rootCard}>
            <CardContent style={{ paddingBottom: 0 }}>
            <Grid container>
                <Grid item xs={12}>
                <img src={item.imagem} className={classes.imagem} />
                </Grid>
                <Grid item xs={12}>
                <Typography variant="h5" component="h2">
                {item.titulo}
                </Typography>
                </Grid>
            </Grid>
            </CardContent>
            <CardActions>
            <Typography color="textSecondary" style={{ fontSize: 15 }}>
                Fonte: ac24horas
            </Typography>
            <Button size="small" color="primary" style={{ marginLeft: 'auto' }}>
                <a href={item.url} style={{ textDecoration: 'inherit' }} target="_blank">
                Ler notícia
                </a>
            </Button>
            </CardActions>
        </Card>
    )
}*/