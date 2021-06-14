import {ActionsTypes, AppStateType} from './store'
import {API, baseURL, CommentsDataType, CommentsType} from '../api/api'
import {ThunkAction, ThunkDispatch} from 'redux-thunk'

const SET_COMMENTS = 'SET_COMMENTS'
const SET_COMMENTS_BY_PAGE = 'SET_COMMENTS_BY_PAGE'
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING'

const initialState = {
    comments: [] as Array<CommentsType>,
    current_page: 1,
    last_page: 0,
    next_page_url: '' as string | null,
    prev_page_url: '' as string | null,
    isFetching: false,
    isFetchingByPage: false
}

export type CommentsReducerType = typeof initialState


export const commentsReducer = (state: CommentsReducerType = initialState, action: ActionsTypes): CommentsReducerType => {
    switch (action.type) {
        case SET_COMMENTS: {
            return {
                ...state,
                comments: [...state.comments, ...action.data.data],
                next_page_url: action.data.next_page_url,
                last_page: action.data.last_page
            }
        }
        case SET_COMMENTS_BY_PAGE: {
            return {
                ...state,
                comments: action.data.data,
                next_page_url: action.data.next_page_url,
                last_page: action.data.last_page,
                current_page: action.data.current_page
            }
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching, isFetchingByPage: action.byPage}
        }
        default: {
            return state
        }
    }
}

export const setComments = (data: CommentsDataType): SetCommentsActionType => ({type: SET_COMMENTS, data})
export const setCommentsByPage = (data: CommentsDataType): SetCommentsByTypeActionType => ({
    type: SET_COMMENTS_BY_PAGE,
    data
})
export const toggleIsFetching = (isFetching: boolean, byPage: boolean): toggleIsFetchingActionType => ({
    type: TOGGLE_IS_FETCHING,
    isFetching,
    byPage
})

export const getComments = (url: string = baseURL): ThunkType => {
    return async (dispatch: ThunkDispatch<AppStateType, unknown, ActionsTypes>) => {
        try {
            dispatch(toggleIsFetching(true, false))
            const data = await API.getCommentsByUrl(url)
            dispatch(setComments(data))
        } catch (e) {
            console.log(e)
        } finally {
            dispatch(toggleIsFetching(false, false))
        }
    }
}

export const getCommentsByPage = (page: number): ThunkType => {
    return async (dispatch: ThunkDispatch<AppStateType, unknown, ActionsTypes>) => {
        try {
            dispatch(toggleIsFetching(false, true))
            const data = await API.getCommentsByPage(page)
            dispatch(setCommentsByPage(data))
        } catch (e) {
            console.log(e)
        } finally {
            dispatch(toggleIsFetching(false, false))
        }
    }
}

type SetCommentsActionType = {
    type: typeof SET_COMMENTS
    data: CommentsDataType
}
type SetCommentsByTypeActionType = {
    type: typeof SET_COMMENTS_BY_PAGE
    data: CommentsDataType
}

type toggleIsFetchingActionType = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
    byPage: boolean
}

export type ThunkType = ThunkAction<void, AppStateType, unknown, ActionsTypes>