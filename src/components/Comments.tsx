import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Button} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'

import {CommentsReducerType, getComments} from '../store/commentsReducer'
import {AppStateType} from '../store/store'
import Preloader from './Preloader'
import Comment from './Comment'


const useStyles = makeStyles(() => ({
    container: {
        margin: '20px 0 0 0',
        display: 'flex',
        flexDirection: 'column',
        padding: '0 20px'
    }
}))

const Comments = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const commentsData = useSelector<AppStateType, CommentsReducerType>(state => state.commentsData)
    const {isFetching, isFetchingByPage, comments, next_page_url} = commentsData
    const showMoreComments = () => {
        //@ts-ignore
        dispatch(getComments(commentsData.next_page_url))
    }

    return (
        <div className={classes.container}>
            <div>
                {isFetchingByPage
                    ? <Preloader/>
                    : comments.map(comment => <Comment key={`${comment.text}-${comment.name}-${comment.created_at}`}
                                                       name={comment.name}
                                                       text={comment.text} date={comment.created_at}/>)}
            </div>

            {!!next_page_url && (
                <Button type="submit" onClick={showMoreComments}
                        variant="contained" color="primary">Show more</Button>
            )}
            {isFetching && <Preloader/>}
        </div>
    )
}

export default Comments
