import React, {ChangeEvent, useEffect} from 'react'
import {makeStyles, createStyles} from '@material-ui/core/styles'
import Pagination from '@material-ui/lab/Pagination'
import {useDispatch, useSelector} from 'react-redux'

import {AppStateType} from '../store/store'
import {CommentsReducerType, getCommentsByPage} from '../store/commentsReducer'

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            '& > *': {
                marginTop: theme.spacing(2),
            },
        },
        pagination: {
            '& > .MuiPagination-ul': {
                justifyContent: 'center'
            }
        }
    })
)

const BasicPagination = () => {
    const classes = useStyles()
    const dispatch = useDispatch()
    const {last_page, current_page} = useSelector<AppStateType, CommentsReducerType>(state => state.commentsData)

    const changePage = (_e: ChangeEvent<unknown>, page: number) => {
        dispatch(getCommentsByPage(page))
    }

    return (
        <div className={classes.root}>
            {!!last_page &&
            <Pagination className={classes.pagination} page={current_page} count={last_page}
                        onChange={changePage}/>}
        </div>
    )
}

export default BasicPagination