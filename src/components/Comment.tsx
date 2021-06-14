import React from 'react'
import {Avatar, Grid, Paper} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import {dateFormatter} from '../utils/dateFormatter'

const useStyles = makeStyles((theme) => ({
    card: {
        background: '#fdf9f4',
        padding: '40px 20px',
        margin: '0 0 30px 0'
    },
    large: {
        width: theme.spacing(7),
        height: theme.spacing(7),
    },
    text: {
        textAlign: 'left',
        wordBreak: 'break-all',
        fontSize: '18px',
        margin: '5px 0'
    },
    date: {
        textAlign: 'left',
        color: 'gray'
    },
    userName: {
        margin: 0,
        textAlign: 'left'
    }
}))

type CommentPropsType = {
    name: string
    text: string
    date: string
}

const Comment: React.FC<CommentPropsType> = ({name, text, date}) => {
    const classes = useStyles()
    return (
        <Paper className={classes.card}>
            <Grid container wrap="nowrap" spacing={2}>
                <Grid item>
                    <Avatar alt={name} src="https://picsum.photos/60"
                            className={classes.large}/>
                </Grid>
                <Grid>
                    <h2 className={classes.userName}>{name}</h2>
                    <p className={classes.text}>
                        {text}
                    </p>
                    {date && <p className={classes.date}>
                        {dateFormatter(date)}
                    </p>}
                </Grid>
            </Grid>
        </Paper>
    )
}

export default Comment
