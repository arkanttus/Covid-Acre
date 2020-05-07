import React from 'react'
import { Grid, Typography, makeStyles, Paper } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
    root: {
        marginTop: 50,
        padding: '20px 30px',
        boxShadow: 'none',
        backgroundColor: 'transparent'
    },
    title: {
        marginBottom: 15,
        color: '#0a183d',
        fontFamily: 'Montserrat, sans-serif',
        [theme.breakpoints.down('xs')]: {
            fontSize: 36
        }
    },
    bio: {
        color: '#6a7080',
        textAlign: 'justify',
        fontFamily: 'Montserrat, sans-serif'
    },
    avatar: {
        width: 190,
        height: 190,
        borderRadius: '50%',
        maxWidth: '100%'
    },
    linkAvatar: {
        textDecoration: 'none',
        color: '#333'
    },
    cardAvatar: {
        marginBottom: 15
    }
}))

function Avatar(props){
    return (
        <Grid item xs={12} md={6} lg={4} className={props.styles.cardAvatar}>
            <a href={props.git} className={props.styles.linkAvatar}>
                <div style={{textAlign: 'center'}}>
                    <img src={props.img} className={props.styles.avatar}/>
                    <Typography variant='h5' component='h5'>
                        {props.name}
                    </Typography>
                </div>
            </a>
        </Grid>
    )
}

export default function About(){
    const classes = useStyles()

    return (
        <Paper className={classes.root}>
            <Grid container>
                <Grid container item xs={12} lg={5}>
                    <Typography variant='h3' component='h3' className={classes.title}> 
                        Sobre nós
                    </Typography>
                </Grid>
                <Grid container item xs={12} lg={7}>
                    <Typography variant='subtitle1' component='h5' className={classes.bio}> 
                        Este site foi desenvolvido por alunos de Sistemas de Informação da Universidade Federal
                        do Acre, em meio à pandemia da COVID-19, com o objetivo de fornecer mais um meio de informação
                        para a população, mantendo-a informada e combatendo a fake news. Os dados são obtidos 
                        diretamente de portais de saúde locais. Além disso, todos os dados salvos poderão ajudar 
                        futuras pesquisas acerca da evolução do COVID-19. Os códigos deste projeto são open source
                        e podem ser obtidos <a href='https://github.com/arkanttus/Covid-Acre'>aqui.</a>
                    </Typography>
                </Grid>

                <Grid item xs={12} style={{marginTop: 50}}>
                    <Typography variant='h3' component='h3' className={classes.title}> 
                        Equipe
                    </Typography>
                </Grid>

                <Avatar name='Ítalo Oliveira' git='https://github.com/arkanttus' 
                        img='images/italo.jpeg' styles={classes}/>
                
                <Avatar name='Bruno Trindade' git='https://github.com/bruunotrindade' 
                        img='images/bruno.jpeg' styles={classes}/>

                <Avatar name='Thalisson Bandeira' git='https://github.com/Tony-Starkus' 
                        img='images/talisson.jpeg' styles={classes}/>
            </Grid>
        </Paper>
    )
}