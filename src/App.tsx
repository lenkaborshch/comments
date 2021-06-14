import React, {useEffect} from 'react'
import Comments from './components/Comments'
import {useDispatch} from 'react-redux'
import {getComments} from './store/commentsReducer'
import AddCommentForm from './components/AddCommentForm'
import {Box} from '@material-ui/core'
import {createStyles, makeStyles} from '@material-ui/core/styles'
import BasicPagination from './components/Pagination'

const useStyles = makeStyles(() =>
    createStyles({
        container: {
            display: 'flex',
            flexDirection: 'column',
            maxWidth: '700px',
            margin: ' 0 auto 100px auto'
        }
    })
)

function App() {
    const classes = useStyles()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getComments())
    }, [dispatch])

    return (
        <Box className={classes.container}>
            <AddCommentForm/>
            <BasicPagination/>
            <Comments/>
        </Box>
    )
}

export default App
