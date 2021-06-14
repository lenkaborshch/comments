import {applyMiddleware, combineReducers, createStore} from 'redux'
import {
    commentsReducer,
    setComments,
    toggleIsFetching,
    setCommentsByPage
} from './commentsReducer'
import thunkMiddleware from 'redux-thunk'

export type ActionsTypes =
    ReturnType<typeof setComments>
    | ReturnType<typeof setCommentsByPage>
    | ReturnType<typeof toggleIsFetching>


const rootReducer = combineReducers({
    commentsData: commentsReducer
})

type RootReducerType = typeof rootReducer
export type AppStateType = ReturnType<RootReducerType>

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware))

//@ts-ignore
window.store = store